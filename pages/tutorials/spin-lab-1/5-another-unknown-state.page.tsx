import { Prose } from "@/design";
import { Decimal, FieldGroup, Select, TextArea, Toggle } from "@/inputs";
import M from "@/math";
import { page } from "@/tutorial";
import React from "react";
import setup from "./setup";

export default page(setup, ({ section }) => ({
  name: "determiningAnUnknownState",
  label: "Determining an Unknown State",
  sections: [
    section({
      name: "determiningAnUnknownStateIntro",
      body: (
        <>
          <Prose>
            <p>
              Back in the HTML sim, now choose <strong>Unknown 1</strong> (click
              the 1 under the start button.) Then, hit <strong>Reset</strong>
            </p>

            <p>
              Important: make sure you selected <strong>Unknown 1</strong>, NOT
              Unknown 2! (The reverse from the previous page!)
            </p>

            <p>
              This causes the atoms to leave the gun in a different quantum
              state, which we call <M t="\ket{\phi}" />.
            </p>
          </Prose>
        </>
      ),
      continue: { label: "Another mystery, I see how it is" },
    }),

    section({
      name: "unknown1Table",
      body: (m) => {
        const upRow = m.unknown1Table.properties.up.properties;
        const downRow = m.unknown1Table.properties.down.properties;

        return (
          <>
            <Prose>
              Fill in this probability table for <M t="\ket{\phi}" />, making
              all possible measurements using x, y, and z-oriented S-Gs.
            </Prose>

            <table className="table">
              <thead>
                <tr>
                  <td>
                    Probability Table for <M t="\ket{\phi}" />
                  </td>
                  <td colSpan={3}>Axis</td>
                </tr>

                <tr>
                  <td>Result</td>
                  <td>X</td>
                  <td>Y</td>
                  <td>Z</td>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <th>
                    Spin up <M t="\uparrow" />
                  </th>
                  <td>
                    <Decimal model={upRow.x} />
                  </td>
                  <td>
                    <Decimal model={upRow.y} />
                  </td>
                  <td>
                    <Decimal model={upRow.z} />
                  </td>
                </tr>

                <tr>
                  <th>
                    Spin down <M t="\downarrow" />
                  </th>
                  <td>
                    <Decimal model={downRow.x} />
                  </td>
                  <td>
                    <Decimal model={downRow.y} />
                  </td>
                  <td>
                    <Decimal model={downRow.z} />
                  </td>
                </tr>
              </tbody>
            </table>
          </>
        );
      },
    }),

    section({
      name: "unknown1Ket",
      body: (m) => (
        <>
          <Prose>
            What is <M t="\ket{\phi}" />?
          </Prose>

          <FieldGroup grid className="margin-top-1">
            <Select
              model={m.unknown1Ket}
              label={<M t="\ket{\phi} = " />}
              choices={[
                ["+z", <M t="\ket{+}" />],
                ["-z", <M t="\ket{-}" />],
                ["+x", <M t="\ket{+}_x" />],
                ["-x", <M t="\ket{-}_x" />],
                ["+y", <M t="\ket{+}_y" />],
                ["-y", <M t="\ket{-}_y" />],
              ]}
              allowOther={false}
            />
          </FieldGroup>
        </>
      ),
    }),

    section({
      name: "unknown1Measurements",
      body: (m) => (
        <TextArea
          model={m.unknown1Measurements}
          label={
            <Prose>
              What measurements did you make to conclude your answer to part B
              above? (Why?)
            </Prose>
          }
        />
      ),
    }),

    section({
      name: "unknown1Ambiguity",
      body: (m) => (
        <TextArea
          model={m.unknown1Ambiguity}
          label={
            <Prose>Is there any ambiguity in your solution? Explain.</Prose>
          }
        />
      ),
    }),

    section({
      name: "unknown1Randomness",
      body: (m) => (
        <>
          <Toggle
            model={m.unknown1TotallyRandom}
            label={
              <Prose>
                Given everything you have learned on this page, would you say it
                is fair to say that this page’s state <M t="\ket{\phi}" />{" "}
                coming out of the gun is “totally random in every way”?
              </Prose>
            }
            choices={[
              ["yes", "Yes, it is “totally random in every way”"],
              ["no", "No, it isn’t"],
            ]}
          />

          <Toggle
            model={m.unknown1Undetermined}
            label={
              <Prose>
                Would you be comfortable calling the state <M t="\ket{\phi}" />{" "}
                “undetermined”?
              </Prose>
            }
            choices={[
              ["yes", "Yes, it seems “undetermined” to me"],
              ["no", "No, I wouldn't be comfortable"],
            ]}
          />

          <Toggle
            model={m.unknown1FromThermalSource}
            label={
              <Prose>
                Do you think the state <M t="\ket{\phi}" /> might be produced by
                a random/thermal source?
              </Prose>
            }
            choices={[
              ["yes", "Yes, I do"],
              ["no", "No, I don’t"],
            ]}
          />

          <TextArea
            model={m.unknown1RandomnessExplain}
            label={<Prose>Discuss why/why not for all three questions!</Prose>}
          />
        </>
      ),
    }),
  ],
}));
