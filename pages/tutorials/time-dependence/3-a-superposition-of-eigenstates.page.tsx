import {
  Callout,
  ControlGroup,
  Decimal,
  Dropdown,
  Guidance,
  Image,
  M,
  Prose,
  Reminder,
  Table,
  TextBox,
  Toggle,
} from "@/components";
import { approxEquals, cx, deepEqual, Html } from "@/helpers/client";
import { isSet } from "@/reactivity";
import { page } from "@/tutorial";
import styles from "./3-a-superposition-of-eigenstates.page.module.scss";
import aSuperpositionOfEigenstatesIntroImg from "./assets/a-superposition-of-eigenstates-intro.png";
import tableGraph1 from "./assets/table-graph-1.png";
import tableGraph2 from "./assets/table-graph-2.png";
import tableGraph3 from "./assets/table-graph-3.png";
import xSliderHalfLImg from "./assets/x-slider-half-l.png";
import setup, { ResponseModels, Responses } from "./setup";

export default page(setup, ({ section, oneOf, hint }) => ({
  name: "aSuperpositionOfEigenstates",
  label: "A Superposition of Eigenstates",
  answers: "checked-some",
  sections: [
    section({
      name: "aSuperpositionOfEigenstatesIntro",
      body: (
        <Prose>
          Set up the sim to consider the state
          <M t="\psi_A = \frac{1}{\sqrt{2}} (\psi_1 + \psi_2)" />. Also, move
          the slider to select the point <M t="x_0 = 0.25L" />. It should look
          something like this:
          <Image
            src={aSuperpositionOfEigenstatesIntroImg}
            alt="Screenshot of sim setup."
          />
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

          <Callout color="yellow">
            You can use the slider in the sim’s “Main Controls” to fix{" "}
            <M t="x = L/2" />:
            <Image
              src={xSliderHalfLImg}
              alt="Screenshot of sim setup."
              maxWidth="300px"
            />
          </Callout>
        </>
      ),
    }),

    section({
      name: "tableTime0",
      body: (m) => (
        <>
          <Prose>
            <p>
              The following table describes the state
              <M t="\psi_A = \frac{1}{\sqrt{2}} ( \psi_1 + \psi_2 )" /> at time
              <M t="t = 0" />.
            </p>

            <p>
              <M t="\Delta" /> is the phase difference (rotation angle) between
              <M t="\psi_1" /> and <M t="\psi_2" />:
              <M
                display
                t="\Delta \equiv (\text{phase of } \psi_2) -  (\text{phase of } \psi_1)"
              />
              If you rotate <M t="\psi_1" /> by <M t="\Delta" />{" "}
              <em>counterclockwise</em>, you should get to <M t="\psi_2" />.
            </p>
          </Prose>

          <TimeEvolutionTable>
            <TimeEvolutionTableRow
              time="t = 0.000 h/E_1"
              delta={<M t="0" />}
              probAmp={<M t="\frac{1}{\sqrt{2}}(\psi_1 + \psi_2)" />}
              probDens={
                <M t="\frac{1}{2}(\psi_1^2 + \psi_2^2 + 2\psi_1\psi_2)" />
              }
              graphProbDens={<Image alt="" src={tableGraph1} />}
            />
          </TimeEvolutionTable>

          <TextBox
            model={m.explainProbDensAtTime0}
            label={
              <Prose>
                Reset the sim to <M t="t = 0" /> and confirm that the Sketch of
                <M t="|\psi_A|^2" /> is correct for this time. Why is the
                probability density larger on the left and smaller on the right
                at this time?
              </Prose>
            }
          />
        </>
      ),

      hints: [
        hint({
          name: "explainProbDensAtTime0",
          body: (
            <Prose>
              To think about <M t="|\psi_A|^2" />, first imagine a sketch of{" "}
              <M t="\psi_A" /> itself. How do <M t="\psi_1" /> and{" "}
              <M t="\psi_2" /> superpose at this time?
            </Prose>
          ),
        }),
      ],
    }),

    section({
      name: "tableTime25",
      body: (m) => (
        <>
          <Prose>
            <p>
              Complete the table for <M t="t = 0.25 h/E_1" />.
            </p>

            <p>
              Note that the <M t="\psi_n" /> are real, so{" "}
              <M t="\psi_n^*(x) = \psi_n(x)" />.
            </p>
          </Prose>

          <TimeEvolutionTable>
            <EditableTimeEvolutionTableRow
              time="t = 0.250 h/E_1"
              models={m}
              row="t025"
            />
          </TimeEvolutionTable>

          <Reminder>
            <M
              display
              t="\Delta \equiv (\text{phase of } \psi_2) -  (\text{phase of } \psi_1)"
            />
          </Reminder>
        </>
      ),
      continue: {
        allowed: (s, _, m) =>
          isSet(m.table.properties.t025, s.responses?.table?.t025),
      },
      hints: [
        [
          hint({
            name: "table025PsiA1",
            label: "Hmm…",
            body: (
              <Prose>
                Starting with
                <M
                  display
                  t="\psi_A(x) = \frac{1}{\sqrt{2}}(\psi_1(x) + \psi_2(x))"
                />
                add the appropriate phase factors (<M t="e^{-E_nt/\hbar}" />) to
                find <M t="\psi_A(x, t)" />.
              </Prose>
            ),
          }),
          hint({
            name: "table025PsiA2",
            label: "Another hint",
            body: (
              <Prose>
                Adding the phase factors gives
                <M
                  display
                  t="\psi_A(x, t) = \frac{1}{\sqrt{2}}
                  \left(
                    e^{-E_1t/\hbar} \psi_1(x)
                    +
                    e^{-E_2t/\hbar} \psi_2(x)
                  \right)"
                />
                where <M t="E_2 = 4 E_1" /> for the infinite square well.
              </Prose>
            ),
          }),
          hint({
            name: "table025PsiA3",
            label: "One more hint",
            body: (
              <Prose>
                <p>
                  To evaluate <M t="e^{-E_1t/\hbar}" /> at{" "}
                  <M t="t= 0.25 h/E_1" />
                  , recall <M t="\hbar = h/2\pi" />.
                </p>

                <p>Work this out on scrap paper!</p>
              </Prose>
            ),
          }),
          hint({
            name: "table025Delta",
            label: (
              <>
                What about <M t="\Delta" />?
              </>
            ),
            body: (
              <Prose>
                One way to find <M t="\Delta" /> is to find the angle between{" "}
                <M t="\psi_1" /> (blue line) and <M t="\psi_2" /> (red line) in
                the upper right graph in the sim.
              </Prose>
            ),
          }),
        ],
      ],
      guidance: {
        nextMessage(r) {
          const row = r.table?.t025;
          const correctRow = correctTable.t025;

          if (!deepEqual(row?.equationProbAmp, correctRow?.equationProbAmp)) {
            return "prob amp incorrect";
          } else if (
            !deepEqual(row?.equationProbDens, correctRow?.equationProbDens)
          ) {
            return "prob dens incorrect";
          } else if (
            !deepEqual(row?.graphProbDens, correctRow?.graphProbDens)
          ) {
            return "graph incorrect";
          } else if (
            !deepEqual(row?.phaseDifference, correctRow?.phaseDifference)
          ) {
            return "phase difference incorrect";
          } else {
            return "correct";
          }
        },
        messages: {
          "prob amp incorrect": {
            body: (
              <Guidance.Disagree>
                <p>
                  We disagree with your Equation for <M t="\psi_A" />. Double
                  check your phase factors (<M t="e^{-E_nt/\hbar}" />
                  )—which energy levels should you be using for <M t="\psi_1" />{" "}
                  and <M t="\psi_2" />?
                </p>

                <p>Click the “Hmm…” button for a little hint!</p>
              </Guidance.Disagree>
            ),
            onContinue: "nextMessage",
          },
          "prob dens incorrect": {
            body: (
              <Guidance.Disagree>
                Check your algebra for <M t="|\psi_A|^2" />. Watch your{" "}
                <M t="i" />
                ’s and minus signs!
              </Guidance.Disagree>
            ),
            onContinue: "nextMessage",
          },
          "graph incorrect": {
            body: (
              <Guidance.Disagree>
                Heads up—the graph of <M t="|\psi_A|^2" /> doesn’t look like
                that. You can use the sim to see what the (lower left) graph
                looks like at this time!
              </Guidance.Disagree>
            ),
            onContinue: "nextMessage",
          },
          "phase difference incorrect": {
            body: (
              <Guidance.Disagree>
                We disagree with your selection for <M t="\Delta" />. Consider
                both <M t="\psi_1" /> (blue line in the sim) and{" "}
                <M t="\psi_2" /> (red line in the sim) in the complex plane
                (upper right graph in the sim). If you rotate <M t="\psi_1" />{" "}
                <em>counterclockwise</em> by <M t="\Delta" />, you should get to{" "}
                <M t="\psi_2" />.
              </Guidance.Disagree>
            ),
            onContinue: "nextMessage",
          },
          correct: {
            body: (
              <Guidance.Agree>
                Nice! Your table looks good to us.
              </Guidance.Agree>
            ),
            onContinue: "nextSection",
          },
        },
      },
    }),

    section({
      name: "tableTime50",
      body: (m) => (
        <>
          <Prose>
            Now complete the table for <M t="t = 0.5 h/E_1" />.
          </Prose>

          <TimeEvolutionTable>
            <EditableTimeEvolutionTableRow
              time="t = 0.500 h/E_1"
              models={m}
              row="t050"
            />
          </TimeEvolutionTable>
        </>
      ),
      continue: {
        allowed: (s, _, m) =>
          isSet(m.table.properties.t050, s.responses?.table?.t050),
      },
    }),

    section({
      name: "completeTable",
      enumerate: false,
      body: () => (
        <>
          <Prose>
            <p>Here is the complete table for four different times.</p>

            <p>
              Use it to check your table for <M t="t=0.5 h/E_1" />.
            </p>

            <p>
              Then, consider all 4 times and see if you notice any patterns.
            </p>
          </Prose>

          <TimeEvolutionTable>
            <TimeEvolutionTableRow
              time="t = 0.000 h/E_1"
              delta={<M t="0" />}
              probAmp={<M t="\frac{1}{\sqrt{2}}(\psi_1 + \psi_2)" />}
              probDens={
                <M t="\frac{1}{2}(\psi_1^2 + \psi_2^2 + 2\psi_1\psi_2)" />
              }
              graphProbDens={<Image alt="" src={tableGraph1} />}
            />

            <TimeEvolutionTableRow
              time="t = 0.250 h/E_1"
              delta={<M t="\pi / 2" />}
              probAmp={<M t="\frac{1}{\sqrt{2}}(-i\psi_1 + \psi_2)" />}
              probDens={<M t="\frac{1}{2}(\psi_1^2 + \psi_2^2)" />}
              graphProbDens={<Image alt="" src={tableGraph2} />}
            />

            <TimeEvolutionTableRow
              time="t = 0.500 h/E_1"
              delta={<M t="\pi" />}
              probAmp={<M t="\frac{1}{\sqrt{2}}(-\psi_1 + \psi_2)" />}
              probDens={
                <M t="\frac{1}{2}(\psi_1^2 + \psi_2^2 - 2\psi_1\psi_2)" />
              }
              graphProbDens={<Image alt="" src={tableGraph3} />}
            />

            <TimeEvolutionTableRow
              time="t = 0.750 h/E_1"
              delta={<M t="- \pi / 2" />}
              probAmp={<M t="\frac{1}{\sqrt{2}}(i\psi_1 + \psi_2)" />}
              probDens={<M t="\frac{1}{2}(\psi_1^2 + \psi_2^2)" />}
              graphProbDens={<Image alt="" src={tableGraph2} />}
            />
          </TimeEvolutionTable>
        </>
      ),
      continue: {
        label: "Looks good",
      },
    }),

    section({
      name: "table",
      isLegacy: true,
      body: (m) => (
        <>
          <Prose>
            <p>
              Use the simulation for state
              <M t="\psi_A = \frac{1}{\sqrt{2}} ( \psi_1 + \psi_2 )" /> to fill
              out the table below.Note that the <M t="\psi_n" /> are real, so{" "}
              <M t="\psi_n^*(x) = \psi_n(x)" />.
            </p>

            <p>
              <M t="\Delta" /> is the phase difference (rotation angle) between
              <M t="\psi_1" /> and <M t="\psi_2" />:
              <M
                display
                t="\Delta \equiv (\text{phase of } \psi_2) -  (\text{phase of } \psi_1)"
              />
              If you rotate <M t="\psi_1" /> by <M t="\Delta" />{" "}
              <em>counterclockwise</em>, you should get to <M t="\psi_2" />.
            </p>
          </Prose>

          <TimeEvolutionTable>
            {(["t000", "t025", "t050", "t075"] as const).map((row) => (
              <EditableTimeEvolutionTableRow
                key={row}
                models={m}
                row={row}
                time={`t = 0.${row.substring(2)}0\\ h / E_1`}
              />
            ))}
          </TimeEvolutionTable>
        </>
      ),
    }),

    section({
      name: "tableGuidance",
      isLegacy: true,
      enumerate: false,
      body: (_, { responses }) => {
        const table = responses?.table || {};

        const times = ["t000", "t025", "t050", "t075"] as const;
        const corrects = times.map((t) => deepEqual(table[t], correctTable[t]));

        if (corrects.every(Boolean)) {
          return <Guidance.Agree>We agree with your table!</Guidance.Agree>;
        }

        const correctWithoutDelta = times
          .map((t) =>
            deepEqual(
              { ...table[t], phaseDifference: undefined },
              { ...correctTable[t], phaseDifference: undefined },
            ),
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
              Notice that in the table, the Sketch of <M t="|\psi_A|^2" /> is
              sometimes symmetric about the center of the well (about{" "}
              <M t="x = L/2" />
              ), but sometimes it’s asymmetric. Let’s think about the pattern
              here.
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
                  Using the “Equation for <M t="|\psi_A|^2" />” column in the
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
      guidance: {
        nextMessage: (r) =>
          approxEquals(r.periodOfProbDens, 1 / 3)
            ? "periodOfProbDensCorrect"
            : "periodOfProbDensIncorrect",
        messages: {
          periodOfProbDensCorrect: {
            body: (
              <Guidance.Agree>
                We agree! <M t="T_A = \frac{1}{3} \times \frac{h}{E_1}" />.
              </Guidance.Agree>
            ),
            onContinue: "nextSection",
          },
          periodOfProbDensIncorrect: {
            body: (
              <Guidance.Disagree>
                Heads up: we got a different value for <M t="T_A" />.
              </Guidance.Disagree>
            ),
            onContinue: "nextMessage",
          },
        },
      },
    }),

    oneOf({
      isLegacy: true,
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

const TimeEvolutionTable = ({ children }: { children?: Html }) => {
  return (
    <Table
      className={cx(styles.table, "text-small text-left")}
      columns={[25, 30, 29, 16]}
    >
      <thead className="text-center">
        <tr>
          <td>
            Equation for <M t="\psi_A" />
          </td>

          <td>
            Equation for <M t="|\psi_A|^2" />
          </td>

          <td>
            Sketch of <M t="|\psi_A|^2" />
          </td>

          <td>
            <M t="\Delta" />
          </td>
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </Table>
  );
};

const TimeEvolutionTableRow = ({
  time,
  delta,
  probAmp,
  probDens,
  graphProbDens,
}: {
  time: string;
  delta: Html;
  probAmp: Html;
  probDens: Html;
  graphProbDens: Html;
}) => {
  return (
    <>
      <tr>
        <th
          colSpan={4}
          className={cx(styles.timeHeader, "text-left text-smaller text-faded")}
        >
          At time <M t={time} />:
        </th>
      </tr>

      <tr>
        <td>{probAmp}</td>

        <td>{probDens}</td>

        <td>{graphProbDens}</td>

        <td>{delta}</td>
      </tr>
    </>
  );
};

const EditableTimeEvolutionTableRow = ({
  time,
  models,
  row,
}: {
  time: string;
  models: ResponseModels;
  row: keyof ResponseModels["table"]["properties"];
}) => {
  const rowProperties = models.table.properties[row].properties;

  const phaseChoices = [
    ["pi/2", <M t="\pi/2" />],
    ["pi", <M t="\pi" />],
    ["0", <M t="0" />],
    ["-pi/2", <M t="-\pi/2" />],
    ["other", "Other"],
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
    <TimeEvolutionTableRow
      time={time}
      delta={
        <Dropdown
          model={rowProperties.phaseDifference}
          choices={phaseChoices}
        />
      }
      probAmp={
        <Dropdown
          model={rowProperties.equationProbAmp}
          choices={equationProbAmpChoices}
        />
      }
      probDens={
        <Dropdown
          model={rowProperties.equationProbDens}
          choices={equationProbDensChoices}
        />
      }
      graphProbDens={
        <Dropdown model={rowProperties.graphProbDens} choices={graphChoices} />
      }
    />
  );
};

const correctTable: NonNullable<Responses["table"]> = {
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
