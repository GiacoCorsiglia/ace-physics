import { Dropdown, M, Table } from "@/components";
import { ChoicesConfig } from "@/components/controls/choice-helpers";
import { Html, range } from "@/helpers/client";
import { isSet } from "@/reactivity";
import { ChooseOneField } from "@/schema/fields";
import { ResponseModels, Responses, Schema, State } from "./setup";

// TODO: Remove this.
const makeChoice = <T,>(selected: T) => ({ selected });

const removeGreyedColumns = <T,>(
  fullColumn: readonly T[] | undefined
): readonly T[] | undefined => {
  if (fullColumn !== undefined) {
    return [
      fullColumn[1],
      fullColumn[3],
      fullColumn[4],
      fullColumn[6],
      fullColumn[7],
      fullColumn[8],
      fullColumn[11],
    ];
  }
};

// TODO: use makeTable.
const tableWithEveGiven = {
  didEveApplyH: ["Y", "N", "N", "Y", "Y", "Y", "Y", "N", "N", "Y", "N", "Y"],
  bitEveWithRandom: [
    <em>1</em>,
    <em>1</em>,
    0,
    <em>1</em>,
    1,
    0,
    <em>1</em>,
    <em>0</em>,
    1,
    <em>1</em>,
    <em>1</em>,
    0,
  ],
};
const tableWithEveAnswers: Responses["tableWithEve"] = {
  bitEve: (
    [
      "random",
      "random",
      "0",
      "random",
      "1",
      "0",
      "random",
      "random",
      "1",
      "random",
      "random",
      "0",
    ] as const
  ).map(makeChoice),
  stateEve: (
    [
      "|->",
      "|1>",
      "|0>",
      "|->",
      "|->",
      "|+>",
      "|->",
      "|0>",
      "|1>",
      "|->",
      "|1>",
      "|+>",
    ] as const
  ).map(makeChoice),
  bitBob: (
    [
      "random",
      "random",
      "random",
      "random",
      "1",
      "random",
      "random",
      "random",
      "1",
      "1",
      "1",
      "0",
    ] as const
  ).map(makeChoice),
};

const hide = (element: any) => <em style={{ opacity: 0.5 }}>{element}</em>;

type TableName = "tableWithoutEve" | "tableWithEve";
type TableSchema<T extends TableName = TableName> =
  Schema["properties"]["responses"]["properties"][T];

interface GivenRow<K extends string = string> {
  key: K;
  label: Html;
  values: readonly Html[];
}

interface FieldRow<
  T extends TableSchema = TableSchema,
  M extends keyof T["properties"] = keyof T["properties"]
> {
  model: M;
  label: Html;
  choices: ChoicesConfig<RowChoices<T, M>>;
  /**
   * The actual answers, used for answer checking.
   */
  answers: readonly RowChoices<T, M>[number][];
  /**
   * Values to show when rendering a non-editable version of this row.  If not
   * specified, it will just render the answers.
   */
  values?: readonly Html[];
}

// I don't understand why this conditional is necessary but it is.
type RowChoices<
  T extends TableSchema,
  M extends keyof T["properties"]
> = T["properties"][M] extends { elements: ChooseOneField<infer Cs, any> }
  ? Cs
  : never;

type TableRow<T extends TableSchema> = GivenRow | FieldRow<T>;

const makeTable = <
  T extends TableName,
  Rs extends readonly TableRow<TableSchema<T>>[]
>(
  tableName: T,
  makeRows: (fns: {
    givenRow: <K extends string>(
      key: K,
      options: Omit<GivenRow<K>, "key">
    ) => GivenRow<K>;
    fieldRow: <M extends keyof TableSchema<T>["properties"]>(
      model: M,
      options: Omit<FieldRow<TableSchema<T>, M>, "model">
    ) => FieldRow<TableSchema<T>, M>;
  }) => Rs,
  greyColFn?: {
    rowKey1: string;
    /**
     * @isColGrey Predicate that returns true if the column should be hidden later on.
     */
    isColGrey: (val1: any, val2?: any) => boolean;
    rowKey2?: string;
  }
) => {
  const rows = makeRows({
    givenRow: (key, options) => ({ ...options, key }),
    fieldRow: (model, options) => ({ ...options, model }),
  });

  // We assume all rows have the same number of columns, so we just read this off the first row.
  const columnsCount =
    "answers" in rows[0] ? rows[0].answers.length : rows[0].values.length;
  // Enforce that all other rows have the same number of columns.
  for (const row of rows) {
    const cols = "answers" in row ? row.answers.length : row.values.length;
    if (cols !== columnsCount) {
      throw new Error(
        `Expected ${columnsCount} columns in row "${
          ("key" in row ? row.key : row.model) as any
        }"`
      );
    }
  }
  const nonGreyedCols: number[] = [];
  const rowsToCheck = [
    rows.find((v) =>
      "key" in v ? v.key === greyColFn?.rowKey1 : v.model === greyColFn?.rowKey1
    ),
    rows.find((v) =>
      "key" in v ? v.key === greyColFn?.rowKey2 : v.model === greyColFn?.rowKey2
    ),
  ];
  const rowValues = rowsToCheck.map((row) =>
    row ? ("key" in row ? row.values : row.answers) : undefined
  );
  range(columnsCount).forEach((c) => {
    greyColFn?.isColGrey(
      rowValues[0] ? rowValues[0][c] : null,
      rowValues[1] ? rowValues[1][c] : null
    )
      ? null
      : nonGreyedCols.push(c);
  });

  // This extra type is necessary to force it to be distributive.
  type GetGivenRowKey<T> = T extends GivenRow<infer K> ? K : never;
  type GivenRowKey = GetGivenRowKey<Rs[number]>;

  type FieldRowKey = keyof TableSchema<T>["properties"];

  type RowKey = GivenRowKey | FieldRowKey;

  const Component = ({
    rows: rowKeys,
    model,
    columns: columnIndices,
    editing,
    excludeGreyedColumns,
  }: {
    model: ResponseModels[T];
    /**
     * Select specific rows to show.
     */
    rows: readonly RowKey[];
    /**
     * Select specific columns to render by passing indices.
     */
    columns?: number[];
    /**
     * Specify which column(s) can be edited.
     */
    editing?: FieldRowKey | readonly FieldRowKey[];
    /**
     * Automatically remove columns from the table where Alice and Bob's H-gate
     * choice doesn't agree. NOT WORKING YET, use
     */
    excludeGreyedColumns?: boolean;
  }) => {
    // Ensure `editing` is an array if it's set.
    const editingArray = editing
      ? Array.isArray(editing)
        ? editing
        : [editing]
      : undefined;

    const mapColumns = <T,>(
      array: readonly T[],
      fn: (item: T, index: number) => Html = (item, index) => (
        <td key={index}>{item as any}</td>
      )
    ) =>
      columnIndices
        ? columnIndices.map((columnIndex) =>
            fn(array[columnIndex], columnIndex)
          )
        : array.map(fn);

    const numberOfActiveColumns = columnIndices?.length ?? columnsCount;

    return (
      <Table
        className="text-small"
        columns={
          // Set column widths explicitly when editing so the things don't jump
          // around.  These are fr units, so setting everything to `1` means
          // every column is the same width.  We make the header column a bit
          // wider though.
          editing
            ? [1.3, ...range(numberOfActiveColumns).map(() => 1)]
            : undefined
        }
      >
        {rows.map((row) => {
          const key: any = "key" in row ? row.key : row.model;
          if (!rowKeys.includes(key)) {
            return null;
          }

          // It's a GivenRow.
          if ("key" in row) {
            return (
              <tr key={key}>
                <th>{row.label}</th>

                {mapColumns(row.values)}
              </tr>
            );
          }

          // It's a FieldRow.
          const isEditing = editingArray
            ? editingArray.includes(row.model)
            : false;

          const choicesMap = Object.fromEntries(row.choices);

          return (
            <tr key={key}>
              <th>{row.label}</th>

              {mapColumns(row.answers, (answer, i) => {
                if (!isEditing) {
                  const value = row.values ? row.values[i] : choicesMap[answer];
                  return <td key={i}>{value}</td>;
                }

                return (
                  <td key={i}>
                    <Dropdown
                      model={(model as any).properties[row.model].elements[i]}
                      choices={row.choices}
                      answer={answer}
                    />
                  </td>
                );
              })}
            </tr>
          );
        })}
      </Table>
    );
  };

  const isComplete = (
    state: State,
    models: ResponseModels,
    row: FieldRowKey,
    columns: number[] = range(columnsCount)
  ) =>
    columns.every((column) =>
      isSet(
        (models[tableName].properties as any)[row].elements[column],
        (state.responses?.[tableName] as any)?.[row]?.[column]
      )
    );

  const isCorrect = (
    responses: Responses,
    row: FieldRowKey,
    columns: number[] = range(columnsCount)
  ) =>
    columns.every(
      (column) =>
        (responses?.[tableName] as any)?.[row]?.[column]?.selected ===
        rows.find(
          (r): r is FieldRow<any, any> => "model" in r && r.model === row
        )?.answers[column]
    );

  return { rows, Component, isComplete, isCorrect, nonGreyedCols };
};

export const tableWithoutEve = makeTable(
  "tableWithoutEve",
  ({ givenRow, fieldRow }) => [
    givenRow("qubitNumber", {
      label: <u>Qubit #</u>,
      values: [
        <u>1</u>,
        <u>2</u>,
        <u>3</u>,
        <u>4</u>,
        <u>5</u>,
        <u>6</u>,
        <u>7</u>,
        <u>8</u>,
        <u>9</u>,
        <u>10</u>,
        <u>11</u>,
        <u>12</u>,
      ],
    }),
    givenRow("initialState", {
      label: "Alice's bit",
      values: [0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0],
    }),

    givenRow("didAliceApplyH", {
      label: <>Did Alice apply&nbsp;H?</>,
      values: ["N", "Y", "N", "N", "Y", "Y", "N", "Y", "N", "N", "Y", "Y"],
    }),

    fieldRow("stateAlice", {
      label: "Alice sends…",
      choices: [
        ["|0>", <M t="\ket{0}" />],
        ["|1>", <M t="\ket{1}" />],
        ["|+>", <M t="\ket{+}" />],
        ["|->", <M t="\ket{-}" />],
        ["other", "other"],
      ],
      answers: [
        "|0>",
        "|+>",
        "|0>",
        "|1>",
        "|->",
        "|+>",
        "|0>",
        "|->",
        "|1>",
        "|1>",
        "|+>",
        "|+>",
      ],
    }),

    givenRow("didBobApplyH", {
      label: <>Did Bob apply&nbsp;H?</>,
      values: ["Y", "Y", "Y", "N", "Y", "N", "N", "Y", "N", "Y", "N", "Y"],
    }),

    fieldRow("bitBob", {
      label: "Bob’s bit",
      choices: [
        ["0", "0"],
        ["1", "1"],
        ["random", "R"],
      ],
      // These are the answers (used for answer checking).
      answers: [
        "random",
        "0",
        "random",
        "1",
        "1",
        "random",
        "0",
        "1",
        "1",
        "random",
        "random",
        "0",
      ],
      // These are the values we show when showing the complete table.  Note
      // that we have selected a specific bit for each of the "random" cases.
      values: [
        hide(1),
        0,
        hide(1),
        1,
        1,
        hide(1),
        0,
        1,
        1,
        hide(1),
        hide(0),
        0,
      ],
    }),

    givenRow("bitBobBeforeNature", {
      label: "Bob's bit",
      values: ["R", "0", "R", "1", "1", "R", "0", "1", "1", "R", "R", "0"],
    }),

    fieldRow("keepOrDiscard", {
      label: "Keep or discard",
      choices: [
        ["keep", "K"],
        ["discard", "D"],
      ],
      answers: [
        "discard",
        "keep",
        "discard",
        "keep",
        "keep",
        "discard",
        "keep",
        "keep",
        "keep",
        "discard",
        "discard",
        "keep",
      ],
    }),

    givenRow("finalPrivateKey", {
      label: "Key",
      values: ["-", 0, "-", 1, 1, "-", 0, 1, 1, "-", "-", 0],
    }),
  ],
  {
    rowKey1: "didAliceApplyH",
    isColGrey: (val1, val2) => val1 !== val2,
    rowKey2: "didBobApplyH",
  }
);

export const tableWithEve = makeTable(
  "tableWithEve",
  ({ givenRow, fieldRow }) => [
    givenRow("qubitNumber", {
      label: <u>Qubit #</u>,
      values: [
        <u>1</u>,
        <u>2</u>,
        <u>3</u>,
        <u>4</u>,
        <u>5</u>,
        <u>6</u>,
        <u>7</u>,
        <u>8</u>,
        <u>9</u>,
        <u>10</u>,
        <u>11</u>,
        <u>12</u>,
      ],
    }),
    givenRow("initialState", {
      label: "Alice's bit",
      values: [0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0],
    }),

    givenRow("didAliceApplyH", {
      label: <>Did Alice apply&nbsp;H?</>,
      values: ["N", "Y", "N", "N", "Y", "Y", "N", "Y", "N", "N", "Y", "Y"],
    }),
    /** TODO: make all of these 'math' kets instead of fake kets, for consistency. */
    givenRow("stateAlice", {
      label: "Alice sends…",
      values: [
        "|0>",
        "|+>",
        "|0>",
        "|1>",
        "|->",
        "|+>",
        "|0>",
        "|->",
        "|1>",
        "|1>",
        "|+>",
        "|+>",
      ],
    }),

    givenRow("didEveApplyH", {
      label: <>Did Eve apply H?</>,
      values: ["Y", "N", "N", "Y", "Y", "Y", "Y", "N", "N", "Y", "N", "Y"],
    }),

    fieldRow("bitEve", {
      label: "Eve's bit",
      choices: [
        ["0", "0"],
        ["1", "1"],
        ["random", "R"],
      ],
      answers: [
        "random",
        "random",
        "0",
        "random",
        "1",
        "0",
        "random",
        "random",
        "1",
        "random",
        "random",
        "0",
      ],
      values: [
        hide(1),
        hide(1),
        0,
        hide(1),
        1,
        0,
        hide(1),
        hide(0),
        1,
        hide(1),
        hide(0),
        0,
      ],
    }),

    givenRow("bitEveBeforeNature", {
      label: "Eve's bit",
      values: ["R", "R", "0", "R", "1", "0", "R", "R", "1", "R", "R", "0"],
    }),

    fieldRow("stateEve", {
      label: "Eve sends…",
      choices: [
        ["|0>", <M t="\ket{0}" />],
        ["|1>", <M t="\ket{1}" />],
        ["|+>", <M t="\ket{+}" />],
        ["|->", <M t="\ket{-}" />],
        ["other", "other"],
      ],
      answers: [
        "|->",
        "|1>",
        "|0>",
        "|->",
        "|->",
        "|+>",
        "|->",
        "|0>",
        "|1>",
        "|->",
        "|1>",
        "|+>",
      ],
    }),

    givenRow("didBobApplyH", {
      label: <>Did Bob apply&nbsp;H?</>,
      values: ["Y", "Y", "Y", "N", "Y", "N", "N", "Y", "N", "Y", "N", "Y"],
    }),

    fieldRow("bitBob", {
      label: "Bob’s bit",
      choices: [
        ["0", "0"],
        ["1", "1"],
        ["random", "R"],
      ],
      // These are the answers (used for answer checking).
      answers: [
        "random",
        "random",
        "random",
        "random",
        "1",
        "random",
        "random",
        "random",
        "1",
        "1",
        "1",
        "0",
      ],
      // These are the values we show when showing the complete table.  Note
      // that we have selected a specific bit for each of the "random" cases.
      values: [
        hide(1),
        hide(0),
        hide(1),
        hide(1),
        1,
        hide(0),
        hide(1),
        hide(0),
        1,
        1,
        1,
        0,
      ],
    }),
    givenRow("bitBobBeforeNature", {
      label: "Bob's bit",
      values: ["R", "R", "R", "R", "1", "R", "R", "R", "1", "1", "1", "0"],
    }),
  ],

  {
    rowKey1: "didAliceApplyH",
    isColGrey: (val1, val2) => val1 !== val2,
    rowKey2: "didBobApplyH",
  }
);
