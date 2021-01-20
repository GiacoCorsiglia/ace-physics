import { Prose } from "@/design";
import { Decimal, FieldGroup, Select, TextArea, Toggle } from "@/inputs";
import M from "@/math";
import { page } from "@/tutorial";
import setup from "./setup";

export default page(setup, ({ section }) => ({
  name: "anotherUnknownState",
  label: "Determining an Unknown State",
  sections: [
    section({
      name: "anotherUnknownStateIntro",
      body: (
        <>
          <Prose>
            <p>
              Again, refresh the tab with the sim, or{" "}
              <a
                href="https://tinyurl.com/spin3220"
                target="_blank"
                rel="noreferrer noopener"
              >
                open a new sim
              </a>{" "}
              to start from scratch.
            </p>

            <p>
              Now choose <strong>Unknown 1</strong> (click the “1” under the
              “Start” button.) Then, hit <strong>Reset</strong>.
            </p>

            {/* They should start from scratch here. */}

            <p>
              Important: make sure you selected <strong>Unknown 1</strong>, NOT
              Unknown 2! (The reverse from the previous page!)
            </p>

            <p>
              This causes the atoms to leave the source in a different quantum
              state, which we call <M t="\ket{\phi}" />.
            </p>
          </Prose>
        </>
      ),
      continue: { label: "Another mystery, I see how it is" },
    }),

    section({
      name: "anotherUnknownStateStrategy",
      body: (m) => (
        <TextArea
          model={m.anotherUnknownStateStrategy}
          label={
            <Prose>
              We’re going to ask you to figure out what <M t="\ket{\phi}" /> is.
              What’s your strategy?
            </Prose>
          }
        />
      ),
    }),

    section({
      name: "unknown1Table",
      body: (m) => {
        const upRow = m.unknown1Table.properties.up.properties;
        const downRow = m.unknown1Table.properties.down.properties;

        return (
          <>
            <Prose>
              One good strategy is to make all possible measurements using x, y,
              and z-oriented S-Gs. Here’s a table for you to record your
              results.
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

    // Add feedback for probability table.  Check 100% correctness.  Also
    // special case for .25 vs .5 (probability table not amplitude table).

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

    //  We haven't tried to analyze your text, but here's what we would say:
    // |Phi> is definitely spin up in Y, but you can always multiply any quantum state by an "overall phase," like -1.  So our solution is unambiguous, up to an (irrelevant) overall phase.

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
                coming out of the source is “random”?
              </Prose>
            }
            choices={[
              ["yes", "Yes, it is “random”"],
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
              ["yes", "Yes, it seems “undetermined”"],
              ["no", "No. It is determined (up to overall phase)"],
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
              ["yes", "Yes"],
              ["no", "No"],
            ]}
          />

          <TextArea
            model={m.unknown1RandomnessExplain}
            label={<Prose>Discuss why/why not for all three questions!</Prose>}
          />
        </>
      ),
    }),

    // Check all three answers (if any wrong: we suggest you talk to an instructor).
    // if all right: We agree with your answers, haven't checked discussion
  ],
}));
