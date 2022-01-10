import {
  ControlGroup,
  Decimal,
  Dropdown,
  Guidance,
  Image,
  M,
  Prose,
  Table,
  TextBox,
  Toggle,
} from "@/components";
import { approxEquals, deepEqual } from "@/helpers/frontend";
import { page } from "@/tutorial";
import { Fragment } from "react";
import tableGraph1 from "./assets/table-graph-1.png";
import tableGraph2 from "./assets/table-graph-2.png";
import tableGraph3 from "./assets/table-graph-3.png";
import setup, { Responses } from "./setup";

export default page(setup, ({ section, oneOf }) => ({
  name: "aSuperpositionOfEigenstates",
  label: "A Superposition of Eigenstates",
  answers: "checked-some",
  sections: [
    section({
      name: "aSuperpositionOfEigenstatesIntro",
      body: (
        <Prose>
          Set up the sim to consider the state
          <M t="\psi_A = \frac{1}{\sqrt{2}} (\psi_1 + \psi_2)" />. Use the{" "}
          <em>stop</em> and <em>step</em> controls as needed.
        </Prose>
      ),
    }),

    section({
      name: "meaningOfRedLineInSim",
      body: (m) => (
        <>
          <TextBox
            model={m.meaningOfRedLineInSim}
            label={
              <Prose>
                What does the red line in the top right wave function graph
                depict?
              </Prose>
            }
          />
        </>
      ),
    }),

    section({
      name: "explainTimeDependenceOfProbDens",
      body: (m) => (
        <>
          <TextBox
            model={m.explainTimeDependenceOfProbDens}
            label={
              <Prose>
                <p>
                  Using the top right graph, explain why the{" "}
                  <M t="|\psi_A|^2" /> probability density graph changes with
                  time.
                </p>

                <p>
                  <em>
                    The probability density graph appears in the lower left when
                    you check the corresponding box in the “Main Controls”
                    panel.
                  </em>
                </p>
              </Prose>
            }
          />
        </>
      ),
    }),

    section({
      name: "behaviorOfProbDensAtMidpoint",
      body: (m) => (
        <>
          <TextBox
            model={m.behaviorOfProbDensAtMidpoint}
            label={
              <Prose>
                What happens to the <M t="|\psi_A|^2" /> probability density
                graph at the point <M t="x=L/2" /> as time goes by? How can you
                explain this behavior?
              </Prose>
            }
          />

          <Prose faded>
            You can set the slider to fix <M t="x=L/2" /> in the sim
          </Prose>
        </>
      ),
    }),

    section({
      name: "table",
      body: (m) => {
        const table = m.table.properties;
        const phaseChoices = [
          ["pi/2", <M t="\pi/2" />],
          ["pi", <M t="\pi" />],
          ["0", <M t="0" />],
          ["-pi/2", <M t="-\pi/2" />],
        ] as const;

        const equationProbAmpChoices = [
          ["iψ1 + ψ2", <M t="\frac{1}{\sqrt{2}}(i\psi_1 + \psi_2)" />],
          ["ψ1 + ψ2", <M t="\frac{1}{\sqrt{2}}(\psi_1 + \psi_2)" />],
          ["-ψ1 + ψ2", <M t="\frac{1}{\sqrt{2}}(-\psi_1 + \psi_2)" />],
          ["-iψ1 + ψ2", <M t="\frac{1}{\sqrt{2}}(-i\psi_1 + \psi_2)" />],
        ] as const;

        const equationProbDensChoices = [
          [
            "ψ1^2 + ψ2^2 + ψ1ψ2",
            <M t="\frac{1}{2}(\psi_1^2 + \psi_2^2 + 2\psi_1\psi_2)" />,
          ],
          [
            "ψ1^2 + ψ2^2 - ψ1ψ2",
            <M t="\frac{1}{2}(\psi_1^2 + \psi_2^2 - 2\psi_1\psi_2)" />,
          ],
          ["ψ1^2 + ψ2^2", <M t="\frac{1}{2}(\psi_1^2 + \psi_2^2)" />],
        ] as const;

        const graphChoices = [
          ["t025", <Image alt="" src={tableGraph2} />],
          ["t050", <Image alt="" src={tableGraph3} />],
          ["t000", <Image alt="" src={tableGraph1} />],
        ] as const;

        return (
          <>
            <Prose>
              <p>
                Use the simulation for state
                <M t="\psi_A = \frac{1}{\sqrt{2}} ( \psi_1 + \psi_2 )" /> to
                fill out the table below. Note that the <M t="\psi_n" /> are
                real, so <M t="\psi_n^*(x) = \psi_n(x)" />.
              </p>

              <p>
                <M t="\Delta" /> is the phase difference (rotation angle)
                between
                <M t="\psi_1" /> and <M t="\psi_2" />:
                <M
                  display
                  t="\Delta \equiv (\text{phase of } \psi_2) -  (\text{phase of } \psi_1)"
                />
                If you rotate <M t="\psi_1" /> by <M t="\Delta" />{" "}
                <em>counterclockwise</em>, you should get to <M t="\psi_2" />.
              </p>
            </Prose>

            <Table className="text-small text-left" columns={[16, 25, 29, 30]}>
              <thead
                className="text-center"
                style={{ background: "hsl(0, 0%, 90%)" }}
              >
                <tr>
                  <th>
                    <M t="\Delta" />
                  </th>

                  <th>
                    Equation for <M t="\psi_A" />
                  </th>

                  <th>
                    Equation for <M t="|\psi_A|^2" />
                  </th>

                  <th>
                    Sketch of <M t="|\psi_A|^2" />
                  </th>
                </tr>
              </thead>

              <tbody>
                {(["t000", "t025", "t050", "t075"] as const).map((row) => (
                  <Fragment key={row}>
                    <tr style={{ background: "hsl(0, 0%, 95%)" }}>
                      <th
                        colSpan={4}
                        style={{
                          padding: "0.25rem 0.5rem",
                          fontWeight: "normal",
                        }}
                        className="text-left text-smaller text-faded"
                      >
                        At time <M t={`t = 0.${row.substring(2)}0\\ h / E_1`} />
                        :
                      </th>
                    </tr>

                    <tr>
                      <td>
                        <Dropdown
                          model={table[row].properties.phaseDifference}
                          choices={phaseChoices}
                        />
                      </td>

                      <td>
                        <Dropdown
                          model={table[row].properties.equationProbAmp}
                          choices={equationProbAmpChoices}
                        />
                      </td>

                      <td>
                        <Dropdown
                          model={table[row].properties.equationProbDens}
                          choices={equationProbDensChoices}
                        />
                      </td>

                      <td>
                        <Dropdown
                          model={table[row].properties.graphProbDens}
                          choices={graphChoices}
                        />
                      </td>
                    </tr>
                  </Fragment>
                ))}
              </tbody>
            </Table>
          </>
        );
      },
    }),

    section({
      name: "tableGuidance",
      enumerate: false,
      body: (_, { responses }) => {
        const table = responses?.table || {};
        const correctTable: Responses["table"] = {
          t000: {
            phaseDifference: { selected: "0" },
            equationProbAmp: { selected: "ψ1 + ψ2" },
            equationProbDens: { selected: "ψ1^2 + ψ2^2 + ψ1ψ2" },
            graphProbDens: { selected: "t000" },
          },
          t025: {
            phaseDifference: { selected: "pi/2" },
            equationProbAmp: { selected: "-iψ1 + ψ2" },
            graphProbDens: { selected: "t025" },
            equationProbDens: { selected: "ψ1^2 + ψ2^2" },
          },
          t050: {
            phaseDifference: { selected: "pi" },
            equationProbAmp: { selected: "-ψ1 + ψ2" },
            equationProbDens: { selected: "ψ1^2 + ψ2^2 - ψ1ψ2" },
            graphProbDens: { selected: "t050" },
          },
          t075: {
            phaseDifference: { selected: "-pi/2" },
            equationProbAmp: { selected: "iψ1 + ψ2" },
            graphProbDens: { selected: "t025" },
            equationProbDens: { selected: "ψ1^2 + ψ2^2" },
          },
        };

        const times = ["t000", "t025", "t050", "t075"] as const;
        const corrects = times.map((t) => deepEqual(table[t], correctTable[t]));

        if (corrects.every(Boolean)) {
          return <Guidance.Agree>We agree with your table!</Guidance.Agree>;
        }

        const correctWithoutDelta = times
          .map((t) =>
            deepEqual(
              { ...table[t], phaseDifference: undefined },
              { ...correctTable[t], phaseDifference: undefined }
            )
          )
          .every(Boolean);

        if (correctWithoutDelta) {
          return (
            <Guidance.Disagree>
              <p>
                You’re nearly there, but at least one of your values for{" "}
                <M t="\Delta" /> is off.
              </p>

              <p>
                This message will update when you change your answers above.
              </p>
            </Guidance.Disagree>
          );
        }

        return (
          <Guidance.Disagree>
            <p>
              Heads up–you have at least one mistake in the row for each of
              these times:
            </p>

            <ul>
              {corrects
                .map((correct, i) => {
                  if (correct) {
                    return null;
                  }
                  const t = times[i];
                  return (
                    <li key={t}>
                      <M t={`t = 0.${t.substring(2)}0\\ h / E_1`} />
                    </li>
                  );
                })
                .filter(Boolean)}
            </ul>

            <p>This message will update when you change your answers above.</p>
          </Guidance.Disagree>
        );
      },
    }),

    section({
      name: "symmetry",
      body: (m) => {
        const cs = [
          [
            "symmetric",
            <>
              <M t="|\psi_A|^2" /> <b>is</b> symmetric about <M t="x = L/2" />
            </>,
          ],
          [
            "asymmetric",
            <>
              <M t="|\psi_A|^2" /> is <b>not</b> symmetric in this case
            </>,
          ],
        ] as const;

        return (
          <>
            <Prose>
              For the next few questions, we’re going to generalize your results
              from the table.
            </Prose>

            <Prose>
              What can you say about the symmetry of the function{" "}
              <M t="|\psi_A|^2" /> with respect to <M t="L/2" /> for the
              following two instances?
            </Prose>

            <Toggle
              model={m.samePlaneSymmetry}
              label={
                <Prose>
                  When <M t="\psi_1" /> and <M t="\psi_2" /> are in{" "}
                  <strong>the same plane</strong> (0 or 180 degrees out of
                  phase):
                </Prose>
              }
              choices={cs}
            />

            <Toggle
              model={m.perpPlaneSymmetry}
              label={
                <Prose>
                  When <M t="\psi_1" /> and <M t="\psi_2" /> are in{" "}
                  <strong>perpendicular planes</strong> (90 or 270 degrees out
                  of phase):
                </Prose>
              }
              choices={cs}
            />
          </>
        );
      },
    }),

    section({
      name: "explainSymmetryWhenPerp",
      body: (m) => (
        <>
          <TextBox
            model={m.explainSymmetryWhenPerp}
            label={
              <Prose>
                <p>
                  When <M t="\psi_1" /> and <M t="\psi_2" /> are in
                  perpendicular planes, the probability density{" "}
                  <M t="|\psi_A|^2" /> is symmetric with respect to{" "}
                  <M t="L/2" />. (This is the answer to the previous question!)
                </p>

                <p>
                  Using the “Equation for <M t="|\psi_A|^2" />” column in your
                  table, explain how this symmetry arises in the probability
                  density even though <M t="\psi_2" /> is antisymmetric.
                </p>
              </Prose>
            }
          />
        </>
      ),
    }),

    section({
      name: "periodOfProbDens",
      body: (m) => (
        <>
          <Prose>
            Using the time display, step controls, and the bottom graph, find
            the period <M t="T_A" /> of the probability density{" "}
            <M t="|\psi_A|^2" /> (not the wave function!) in terms of{" "}
            <M t="h/E_1" />.
          </Prose>

          <ControlGroup>
            <Decimal model={m.periodOfProbDens} label={<M t="T_A = " />} />
            <M t="\times \frac{h}{E_1}" />
          </ControlGroup>

          <Prose>
            <em>
              To think about: Is the period of the probability density the same
              as the period of either of the individual eigenfunctions? If not,
              can you see mathematically as well as physically where the
              discrepancy arises from?
            </em>
          </Prose>
        </>
      ),
    }),

    oneOf({
      which: (r) =>
        approxEquals(r.periodOfProbDens, 1 / 3)
          ? "periodOfProbDensCorrect"
          : "periodOfProbDensIncorrect",
      sections: {
        periodOfProbDensCorrect: section({
          name: "periodOfProbDensCorrect",
          body: (
            <Guidance.Agree>
              We agree! <M t="T_A = \frac{1}{3} \times \frac{h}{E_1}" />.
            </Guidance.Agree>
          ),
        }),
        periodOfProbDensIncorrect: section({
          name: "periodOfProbDensIncorrect",
          body: (
            <Guidance.Disagree>
              Heads up: we got a different value for <M t="T_A" />.
            </Guidance.Disagree>
          ),
        }),
      },
    }),
  ],
}));
