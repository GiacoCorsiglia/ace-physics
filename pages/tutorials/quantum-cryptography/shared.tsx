import { Dropdown, M, Table } from "@/components";
import { ChoicesConfig } from "@/components/controls/choice-helpers";
import { Html } from "@/helpers/client";
import { ChooseOneField } from "@/schema/fields";
import { ResponseModels, Responses, Schema } from "./setup";

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

const tableWithoutEveGiven = {
  initialState: [0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0],
  didAliceApplyH: ["N", "Y", "N", "N", "Y", "Y", "N", "Y", "N", "N", "Y", "Y"],
  didBobApplyH: ["Y", "Y", "Y", "N", "Y", "N", "N", "Y", "N", "Y", "N", "Y"],
  bitBobWithRandom: [
    <em>1</em>,
    0,
    <em>1</em>,
    1,
    1,
    <em>1</em>,
    0,
    1,
    1,
    <em>1</em>,
    <em>1</em>,
    0,
  ],
  finalPrivateKey: ["-", 0, "-", 1, 1, "-", 0, 1, 1, "-", "-", 0],
};

export const tableWithoutEveAnswers = {
  stateAlice: (
    [
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
    ] as const
  ).map(makeChoice),
  bitBob: (
    [
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
    ] as const
  ).map(makeChoice),
  keepOrDiscard: (
    [
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
    ] as const
  ).map(makeChoice),
} satisfies Responses["tableWithoutEve"];

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

type TableWithoutEveEditableRow = keyof typeof tableWithoutEveAnswers;
type TableWithoutEveRow =
  | TableWithoutEveEditableRow
  | keyof typeof tableWithoutEveGiven;

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
  answers: readonly RowChoices<T, M>[number][];
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
  name: T,
  makeRows: (fns: {
    givenRow: <K extends string>(
      key: K,
      options: Omit<GivenRow<K>, "key">
    ) => GivenRow<K>;
    fieldRow: <M extends keyof TableSchema<T>["properties"]>(
      model: M,
      options: Omit<FieldRow<TableSchema<T>, M>, "model">
    ) => FieldRow<TableSchema<T>, M>;
  }) => Rs
) => {
  const rows = makeRows({
    givenRow: (key, options) => ({ ...options, key }),
    fieldRow: (model, options) => ({ ...options, model }),
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

    return (
      <Table className="text-small">
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
                  return <td key={i}>{choicesMap[answer]}</td>;
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

  return { Component };
};

const tablaeWithoutEveGiven = {
  initialState: [0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0],
  didAliceApplyH: ["N", "Y", "N", "N", "Y", "Y", "N", "Y", "N", "N", "Y", "Y"],
  didBobApplyH: ["Y", "Y", "Y", "N", "Y", "N", "N", "Y", "N", "Y", "N", "Y"],
  bitBobWithRandom: [
    <em>1</em>,
    0,
    <em>1</em>,
    1,
    1,
    <em>1</em>,
    0,
    1,
    1,
    <em>1</em>,
    <em>1</em>,
    0,
  ],
  finalPrivateKey: ["-", 0, "-", 1, 1, "-", 0, 1, 1, "-", "-", 0],
};

export const tableWithoutEve = makeTable(
  "tableWithoutEve",
  ({ givenRow, fieldRow }) => [
    givenRow("initialState", {
      label: "Initial state",
      values: [0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0],
    }),

    givenRow("didAliceApplyH", {
      label: "Did Alice apply H?",
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
      label: "Did Bob Apply H?",
      values: ["Y", "Y", "Y", "N", "Y", "N", "N", "Y", "N", "Y", "N", "Y"],
    }),

    givenRow("bitBobWithRandom", {
      label: "Bit",
      values: [
        <em>1</em>,
        0,
        <em>1</em>,
        1,
        1,
        <em>1</em>,
        0,
        1,
        1,
        <em>1</em>,
        <em>1</em>,
        0,
      ],
    }),

    givenRow("finalPrivateKey", {
      label: "Key",
      values: ["-", 0, "-", 1, 1, "-", 0, 1, 1, "-", "-", 0],
    }),
  ]
);
