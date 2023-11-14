import { Table } from "@/components";
import { range } from "@/helpers/server";
import { Responses } from "./setup";

const makeChoice = <T,>(selected: T) => ({ selected });

const tableWithoutEveGiven = {
  initialState: [0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0],
  didAliceApplyH: ["N", "Y", "N", "N", "Y", "Y", "N", "Y", "N", "N", "Y", "Y"],
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
};

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
