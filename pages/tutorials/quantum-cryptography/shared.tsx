import { Table } from "@/components";
import { range } from "@/helpers/server";
import { Responses } from "./setup";

const makeChoice = <T,>(selected: T) => ({ selected });

const removeGreyedColumns = <T,>(fullColumn: readonly T[] | undefined): readonly T[] | undefined => {
  if (fullColumn !== undefined)
  return [
    fullColumn[1],
    fullColumn[3],
    fullColumn[4],
    fullColumn[6],
    fullColumn[7],
    fullColumn[8],
    fullColumn[11]
  ]
}
const tableWithoutEveGiven = {
  initialState: [0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0],
  didAliceApplyH: ["N", "Y", "N", "N", "Y", "Y", "N", "Y", "N", "N", "Y", "Y"],
  didBobApplyH: ["Y", "Y", "Y", "N", "Y", "N", "N", "Y", "N", "Y", "N", "Y"],
  bitBobWithRandom: [<em>1</em>, 0, <em>1</em>, 1, 1, <em>1</em>, 0, 1, 1, <em>1</em>, <em>1</em>, 0],
  finalPrivateKey: ["-", 0, "-", 1, 1, "-", 0, 1, 1, "-", "-", 0]
};
const tableWithoutEveAnswers: Responses["tableWithoutEve"] = {
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
    ["random",
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
      false,
      true,
      false,
      true,
      true,
      false,
      true,
      true,
      true,
      false,
      false,
      true
    ]
  ),
};
const tableWithEveGiven = {
  didEveApplyH: ["Y", "N", "N", "Y", "Y", "Y", "Y", "N", "N", "Y", "N", "Y"],
  bitEveWithRandom: [<em>1</em>, <em>1</em>, 0, <em>1</em>, 1, 0, <em>1</em>, <em>0</em>, 1, <em>1</em>, <em>1</em>, 0]
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
      "0"
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
      "0"
    ] as const
  ).map(makeChoice)
}
export const TableWithoutEveField = ({}: {}) => {
  return (
    <Table>
      <tr>
        <th>Initial state</th>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>1</td>
      </tr>

      <tr>
        <th>Did Alice Apply H?</th>
        <td>N</td>
        <td>Y</td>
        <td>N</td>
        <td>N</td>
      </tr>

      <tr>
        <th>Alice sends…</th>

        {range(4).map((i) => (
          <td key={i}>
            {/* <Dropdown
              //
              model={m.tableWithoutEve.properties.stateAlice.elements[i]}
              choices={[
                ["|0>", <M t="\ket{0}" />],
                ["|1>", <M t="\ket{1}" />],
                ["|+>", <M t="\ket{+}" />],
                ["|->", <M t="\ket{-}" />],
              ]}
            /> */}
          </td>
        ))}
      </tr>
    </Table>
  );
};
