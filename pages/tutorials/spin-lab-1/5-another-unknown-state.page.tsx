import { Help, Info, Prose } from "@/design";
import { deepEqual } from "@/helpers";
import { Decimal, FieldGroup, Select, TextArea, Toggle } from "@/inputs";
import M from "@/math";
import { page } from "@/tutorial";
import setup from "./setup";

export default page(setup, ({ section, sequence, oneOf }) => ({
  name: "anotherUnknownState",
  label: "Determining an Unknown State",
  answersChecked: "some",
  sections: [
    section({
      name: "anotherUnknownStateIntro",
      body: (
        <>
          <Prose>
            <p>
              Again,{" "}
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

    section({
      name: "unknown1TableFeedback",
      enumerate: false,
      body: (_, { responses }) =>
        deepEqual(correctUnknown1Table, responses?.unknown1Table) ? (
          <Help>
            <Prose>Nice, your table looks great.</Prose>
          </Help>
        ) : (
          <Info>
            <Prose>
              <p>
                Heads up, there’s at least one mistake in your table. This
                message will update when it’s 100% correct.
              </p>

              {Object.values(responses?.unknown1Table || {})
                .flatMap((o) => Object.values(o || {}))
                .some((v) => (v === undefined ? false : v > 1)) && (
                <p>
                  We noticed at least one of the numbers in your table is
                  greater than 1. To be clear: we’re asking for probabilities,
                  not percentages and not raw totals from the sim.
                </p>
              )}
            </Prose>
          </Info>
        ),
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

    sequence({
      when: (r) => r.unknown1Ket?.selected !== "+y",
      sections: [
        section({
          name: "unknown1KetClarified",
          body: (m) => (
            <>
              <Prose>
                We’ve added some clarifying descriptions in the dropdown
                below—we suggest you give this question another go.
              </Prose>

              <FieldGroup grid className="margin-top-1">
                <Select
                  model={m.unknown1KetClarified}
                  label={<M t="\ket{\phi} = " />}
                  choices={[
                    [
                      "+z",
                      <>
                        <M t="\ket{+}" /> (Spin up along <M t="Z" />)
                      </>,
                    ],
                    [
                      "-z",
                      <>
                        <M t="\ket{-}" /> (Spin down along <M t="Z" />)
                      </>,
                    ],
                    [
                      "+x",
                      <>
                        <M t="\ket{+}_x" /> (Spin up along <M t="X" />)
                      </>,
                    ],
                    [
                      "-x",
                      <>
                        <M t="\ket{-}_x" /> (Spin down along <M t="X" />)
                      </>,
                    ],
                    [
                      "+y",
                      <>
                        <M t="\ket{+}_y" /> (Spin up along <M t="Y" />)
                      </>,
                    ],
                    [
                      "-y",
                      <>
                        <M t="\ket{-}_y" /> (Spin down along <M t="Y" />)
                      </>,
                    ],
                  ]}
                  allowOther={false}
                />
              </FieldGroup>
            </>
          ),
        }),

        section({
          name: "unknown1KetFeedback",
          body: (_, { responses }) =>
            responses?.unknown1KetClarified?.selected === "+y" ? (
              <Help>
                <Prose>
                  Nice! We agree, <M t="\ket{\phi} = \ket{+}_y" /> because it
                  will exit the “up” port of a Y-oriented Stern-Gerlach
                  apparatus 100% of the time.
                </Prose>
              </Help>
            ) : (
              <Info>
                <Prose>
                  If all particles are 100% certain to exit just one particular
                  port of, say, a Y-oriented Stern-Gerlach apparatus, what can
                  we say (for sure!) about the entering state? Maybe try a
                  different response above?
                </Prose>
              </Info>
            ),
        }),
      ],
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
      name: "unknown1AmbiguityFeedback",
      body: (
        <Help>
          <Prose>
            <p>
              We haven't tried to analyze your text, but here's what we would
              say:
            </p>

            <p>
              <M t="\ket{\phi}" /> is statistically very likely to be spin up
              along <M t="Y" />, but you can always multiply any quantum state
              by an “overall phase,” like <M t="-1" />. So our solution is
              unambiguous, up to an (irrelevant) overall phase.
            </p>
          </Prose>
        </Help>
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

    oneOf({
      which: (r) =>
        r.unknown1TotallyRandom?.selected === "no" &&
        r.unknown1Undetermined?.selected === "no" &&
        r.unknown1FromThermalSource?.selected === "no"
          ? "unknown1RandomnessCorrect"
          : "unknown1RandomnessIncorrect",
      sections: {
        unknown1RandomnessCorrect: section({
          name: "unknown1RandomnessCorrect",
          body: (
            <Help>
              <Prose>
                We agree with your answers, although we haven't checked your
                explanation.
              </Prose>
            </Help>
          ),
        }),
        unknown1RandomnessIncorrect: section({
          name: "unknown1RandomnessIncorrect",
          body: (
            <Info>
              <Prose>
                We disagree with at least one of your answers; we suggest you
                talk to an instructor.
              </Prose>
            </Info>
          ),
        }),
      },
    }),
  ],
}));

const correctUnknown1Table = {
  up: { x: 0.5, y: 1, z: 0.5 },
  down: { x: 0.5, y: 0, z: 0.5 },
};
