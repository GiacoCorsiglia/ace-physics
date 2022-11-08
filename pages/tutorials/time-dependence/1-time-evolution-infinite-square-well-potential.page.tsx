import {
  BooleanToggle,
  Callout,
  ChooseOne,
  Guidance,
  LabelsLeft,
  M,
  Prose,
  TextBox,
  TextLine,
  Vertical,
} from "@/components";
import { Axes, Curve, Label, Plot, Tick, WithPlot } from "@/plots";
import { page } from "@/tutorial";
import { PencilIcon } from "@primer/octicons-react";
import { memo } from "react";
import setup from "./setup";

export default page(setup, ({ section, hint }) => ({
  name: "timeEvolutionInfiniteSquareWellPotential",
  label: "Time Evolution in the Infinite Square Well Potential",
  answers: "checked-some",
  sections: [
    section({
      name: "timeEvolutionInfiniteSquareWellPotentialIntro",
      body: (
        <Prose>
          <p>
            A particle is in an infinite square well with potential energy
            <M t="V(x) = 0" /> for <M t="0~<~x~<~L" /> (and <M t="\infty" />{" "}
            elsewhere.)
          </p>

          <p>
            The <M t="\psi_n(x)" /> are the spatial parts of the energy
            eigenfunctions with energy values <M t="E_n" />, such that
            <M t="E_n = n^2 E_1" />.
          </p>

          <p>
            Consider a particle in the ground state at time <M t="t=0" /> given
            by <M t="\psi_1(x)" />.
          </p>
        </Prose>
      ),
    }),

    section({
      name: "groundStateGraph",
      body: (m) => (
        <ChooseOne
          label={
            <Prose>
              Which graph represents the ground state energy eigenfunction,{" "}
              <M t="\psi_1(x)" />, at time <M t="t=0" />?
            </Prose>
          }
          model={m.groundStateGraph}
          choices={[
            ["psi2", <Psi2 />],
            ["psi1", <Psi1 />],
            ["psi1^2", <Psi1Squared />],
            ["psi2^2", <Psi2Squared />],
          ]}
        />
      ),
      hints: [
        hint({
          name: "groundStateGraph",
          label: "Remind me",
          body: (
            <Prose>
              The energy eigenstates for an infinite square well ranging from{" "}
              <M t="x = 0" /> to <M t="x = L" /> look like
              <M
                display
                t="\psi_n(x) = \sqrt{\frac{2}{L}} \sin\left( \frac{n \pi x}{L} \right)"
              />
            </Prose>
          ),
        }),
      ],
      guidance: {
        nextMessage(r) {
          if (r.groundStateGraph?.selected === "psi1") {
            return "correct";
          } else if (r.groundStateGraph?.selected === "psi1^2") {
            return "sin^2";
          } else {
            return "nodes";
          }
        },
        messages: {
          correct: {
            body: (
              <Guidance.Agree>
                <p>Agreed!</p>

                <p>
                  You correctly chose the graph for <M t="\sin(x)" />. The
                  other, similar looking option instead shows{" "}
                  <M t="\sin^2(x)" />. We’re plotting probability density{" "}
                  <em>amplitude</em> here, so no squaring necessary.
                </p>
              </Guidance.Agree>
            ),
            onContinue: "nextSection",
          },
          "sin^2": {
            body: (
              <Guidance.Disagree>
                Heads up—do you mean to plot <M t="\sin(x)" /> or{" "}
                <M t="\sin^2(x)" />? How are those two graphs different?{" "}
                <em>Hint: imagine extending the graph beyond one period.</em>
              </Guidance.Disagree>
            ),
            onContinue: "nextMessage",
          },
          nodes: {
            body: (
              <Guidance.Disagree>
                Careful—how many nodes should the ground state have? A node is a
                point where the function hits the horizontal axis.
              </Guidance.Disagree>
            ),
            onContinue: "nextMessage",
          },
        },
      },
    }),

    section({
      name: "groundStateSketch",
      isLegacy: true,
      body: (m) => (
        <>
          <Prose>
            <p>
              Sketch the ground state energy eigenfunction <M t="\psi_1(x)" />{" "}
              at time <M t="t=0" />.
            </p>

            <p>
              <em>If you’re working with others in Zoom:</em>{" "}
              <strong>
                Share your screen and use Zoom’s annotation feature.
              </strong>
            </p>

            <p>
              <em>Otherwise:</em> <strong>Sketch on paper.</strong>
            </p>
          </Prose>

          <Plot width={560} height={400} origin={[0.2, "center"]}>
            <Axes yLabel="\psi_1(x, t=0)" xLabel="x" />
          </Plot>

          <Prose>
            Finally, draw a vertical line on your graph to indicate the value of{" "}
            <M t="\psi_1(x)" />
            at the point <M t="x = L/2" />.
          </Prose>
        </>
      ),
    }),

    section({
      name: "timeEvolvedGroundState",
      body: (m) => (
        <>
          <Prose>
            Write an expression for the time evolution of the energy
            eigenfunction <M t="\psi_1(x,t)" /> in terms of <M t="\psi_1(x)" />.
          </Prose>

          <LabelsLeft>
            <TextLine
              model={m.timeEvolvedGroundState}
              label={<M t="\psi_1(x,t) =" />}
            />
          </LabelsLeft>

          <Prose faded>
            <p>Don’t worry about formatting.</p>

            <p>
              To type <M t="\psi_1(x)" /> or <M t="\hbar" />, copy-paste from
              here: <span style={{ marginLeft: "1rem" }}>ψ1(x)</span>
              <span style={{ marginLeft: "1rem" }}>ħ</span>
            </p>
          </Prose>
        </>
      ),
    }),

    section({
      name: "timeEvolvedGroundStateChoice",
      body: (m) => (
        <ChooseOne
          model={m.groundStateTimeDependence}
          label={
            <Prose>
              Choose the expression that best matches the answer you just typed
              in.
            </Prose>
          }
          choices={[
            [
              "no time dependence",
              "The ground state does not evolve with time.",
            ],
            ["+E_1", <M t="\psi_1(x,t) = e^{+iE_1t/\hbar}\psi_1(x)" />],
            ["-E_1", <M t="\psi_1(x,t) = e^{-iE_1t/\hbar}\psi_1(x)" />],
            ["+E_n", <M t="\psi_1(x,t) = e^{+iE_nt/\hbar}\psi_1(x)" />],
            ["-E_n", <M t="\psi_1(x,t) = e^{-iE_nt/\hbar}\psi_1(x)" />],
            ["none", "None of these answers match mine."],
          ]}
        />
      ),
      guidance: {
        nextMessage(r) {
          const choice = r.groundStateTimeDependence?.selected;
          switch (choice) {
            case "+E_n":
            case "-E_n":
              return "E_n";
            case "+E_1":
            case "-E_1":
            case "no time dependence":
            case "none":
              return choice;
            case undefined:
              return "none";
          }
        },
        messages: {
          "no time dependence": {
            body: (
              <Guidance.Disagree>
                <p>Consider these three statements:</p>

                <blockquote>
                  <strong>Student A:</strong> The ground state wave function
                  does not evolve with time in any way. The{" "}
                  <M t="\psi_1(x,t)" /> function doesn’t need a <M t="t" /> in
                  it.
                </blockquote>

                <blockquote>
                  <strong>Student B:</strong> The time-evolved ground state wave
                  function has a complex exponential term out front, but this is
                  just a global phase, so we can safely ignore it.
                </blockquote>

                <blockquote>
                  <strong>Student C:</strong> The complex exponential will
                  disappear when we square the wave function to find the
                  probability density <M t="|\psi_1(x, t)|^2" />, but we still
                  need to keep track of it when writing the wave function
                  itself.
                </blockquote>

                <p>Decide who you agree with and check in again.</p>
              </Guidance.Disagree>
            ),
            onContinue: "nextMessage",
          },
          E_n: {
            body: (
              <Guidance.Disagree>
                Which energy level corresponds with the ground state?
              </Guidance.Disagree>
            ),
            onContinue: "nextMessage",
          },
          "+E_1": {
            body: (
              <Guidance.Disagree>Double check your signs.</Guidance.Disagree>
            ),
            onContinue: "nextMessage",
          },
          "-E_1": {
            body: <Guidance.Agree>Looks good to us!</Guidance.Agree>,
            onContinue: "nextSection",
          },
          none: {
            body: (
              <Guidance.HeadsUp>
                We think one of our provided answers correctly expresses the
                time evolution for the ground state.
              </Guidance.HeadsUp>
            ),
            onContinue: "nextMessage",
          },
        },
      },
    }),

    section({
      name: "timeEvolutionDescription",
      body: (m) => (
        <>
          <Prose>
            <p>
              Consider <M t="\psi_1" /> at the point <M t="x = L/2" />. Plot the
              time evolution of <M t="\psi_1(x=L/2,t)" /> on a graph of the
              complex plane.
            </p>
          </Prose>

          <Callout
            color="blue"
            iconLeft={<PencilIcon size="medium" />}
            iconAlignment="top"
          >
            <Vertical>
              <Prose>
                <p>Draw your plot on scrap paper.</p>

                <p>Start with real and imaginary axes, like this:</p>
              </Prose>

              <Plot width={200} height={200}>
                <Axes yLabel="\text{Im}" xLabel="\text{Re}" />
              </Plot>
            </Vertical>
          </Callout>

          <Callout color="yellow" title="Hint">
            On your paper, try plotting the values of
            <M t="e^{-i E_1 t /\hbar}" /> when
            <M
              display
              t="t = 0,\
              \frac{\pi\hbar}{2E_1},\
              \pi \frac{\hbar}{E_1},\
              \text{and}\ \frac{3\pi\hbar}{2E_1}"
            />
            then interpolate between them.
          </Callout>

          <TextBox
            model={m.timeEvolutionDescription}
            label={<Prose>Describe this time evolution in words:</Prose>}
          />
        </>
      ),
    }),

    section({
      name: "rotationDirection",
      body: (m) => (
        <>
          <Prose>
            <p>
              Your plot should be a circle in the complex plane, like below.
            </p>
          </Prose>

          <Plot width={200} height={200} scale={45}>
            <Axes yLabel="\text{Im}" xLabel="\text{Re}" />

            <WithPlot>
              {(plot) => (
                <>
                  <circle
                    cx={0}
                    cy={0}
                    r={plot.x(1.5)}
                    fill="none"
                    stroke="green"
                    strokeWidth={2}
                  />
                  <circle cx={plot.x(1.5)} cy={0} r={4} fill="green" />
                  <circle cx={0} cy={plot.y(1.5)} r={4} fill="green" />
                  <circle cx={plot.x(-1.5)} cy={0} r={4} fill="green" />
                  <circle cx={0} cy={plot.y(-1.5)} r={4} fill="green" />
                </>
              )}
            </WithPlot>

            <Label
              t="\color{green} \psi_1(x,t)"
              x={-0.8 / Math.sqrt(2)}
              y={1.5 / Math.sqrt(2)}
              anchor="bottomRight"
            />
          </Plot>

          <Prose>
            The phase factor <M t="e^{-i E_1 t /\hbar}" /> means that
            <M t="\psi_1(x, t)" /> rotates in the complex plane over time, but
            its magnitude remains constant.
          </Prose>

          <ChooseOne
            model={m.rotationDirection}
            label={
              <Prose>
                Which direction does <M t="\psi_1(x, t)" /> rotate?
              </Prose>
            }
            choices={[
              [
                "clockwise",
                <Vertical>
                  <Prose>
                    <M t="\psi_1(x, t)" /> rotates <strong>clockwise</strong> in
                    the complex plane:
                  </Prose>

                  <RotatingPsi1 direction={1} />
                </Vertical>,
              ],
              [
                "counterclockwise",
                <Vertical>
                  <Prose>
                    <M t="\psi_1(x, t)" /> rotates{" "}
                    <strong>counterclockwise</strong> in the complex plane:
                  </Prose>

                  <RotatingPsi1 direction={-1} />
                </Vertical>,
              ],
            ]}
          />
        </>
      ),
      hints: [
        hint({
          name: "rotationDirection",
          body: (
            <>
              What does <M t="e^{-i E_1 t /\hbar}" /> evaluate to when
              <M t="E_1 t/\hbar = \pi/2" />?
            </>
          ),
        }),
      ],
      guidance: {
        nextMessage(r) {
          return "delayedFeedback";
        },
        messages: {
          delayedFeedback: {
            body: (
              <Guidance.HeadsUp>
                We haven’t checked your answer: you’ll have the opportunity to
                double check this for yourself on the next page!
              </Guidance.HeadsUp>
            ),
            onContinue: "nextSection",
          },
        },
      },
    }),

    section({
      name: "probDensPlot",
      body: (m, state) => (
        <>
          <Prose>
            Now consider the probability density <M t="|\psi_1(x, t)|^2" /> at
            the same point, <M t="x = L/2" />.
          </Prose>

          {/* Legacy field. */}
          {!!state.responses?.probDensRelationshipToProbAmp && (
            <TextBox
              model={m.probDensRelationshipToProbAmp}
              label={
                <Prose>
                  How is this value related to the value of <M t="\psi_1" />?
                </Prose>
              }
            />
          )}

          <BooleanToggle
            model={m.probDensDependsOnTime}
            label={
              <Prose>
                True or false: The probability density changes with time.
              </Prose>
            }
            yes="True"
            no="False"
          />
        </>
      ),
      hints: [
        hint({
          name: "probDensPlot",
          body: (
            <Prose>
              Recall that <M t="\psi_1" /> is an energy eigenstate.
            </Prose>
          ),
        }),
      ],
      guidance: {
        nextMessage(r) {
          if (r.probDensDependsOnTime === false) {
            return "false";
          } else {
            return "true";
          }
        },
        messages: {
          true: {
            body: (
              <Guidance.Disagree>
                Double check your answer using the expression for{" "}
                <M t="\psi_1(x,t)" /> we found above:
                <M
                  display
                  t="|\psi_1(x,t)|^2 = |e^{-iE_1t/\hbar}\psi_1(x)|^2"
                />
              </Guidance.Disagree>
            ),
            onContinue: "nextMessage",
          },
          false: {
            body: (
              <Guidance.Agree>
                <p>
                  Agreed! The probability density of an energy eigenstate does
                  not change with time. That’s why we call them “stationary
                  states”.
                </p>

                <p>
                  The time evolution of a single energy eigenstate is a global
                  phase (complex exponential factor) that disappears when
                  calculating the probability density <M t="|\psi_1(x, t)|^2" />
                  , it's important to keep track of that global phase when you
                  might have superpose this state with another energy
                  eigenstate. The rest of the tutorial explore this further.
                </p>
              </Guidance.Agree>
            ),
            onContinue: "nextSection",
          },
        },
      },
    }),

    section({
      name: "difTimePlot",
      body: (m, { responses }) => (
        <>
          <Prose>
            Using <M t="e^{ix} = \cos x + i \sin x" /> or another method,
            determine
            <M t="e^{-i3\pi/2}" />.
          </Prose>

          <Callout color="blue" iconLeft={<PencilIcon size="medium" />}>
            Do this on scrap paper.
          </Callout>

          <LabelsLeft>
            <TextLine model={m.exp3PiOver2} label={<M t="e^{-i3\pi/2} = " />} />
          </LabelsLeft>

          <Prose>
            Here’s a sketch of the energy eigenfunction
            <M t="\psi_1(x,t)" /> for the time where
            <M t="E_1 t/\hbar = 3\pi/2" />. Notice that the axes are unlabeled.
          </Prose>

          <Plot width={380} height={250} origin={[0.3, 2]} scale={[65, 80]}>
            <Axes
              xLabel={
                responses?.difTimePlotAxisX
                  ? `\\text{${responses?.difTimePlotAxisX.replace(
                      /\\|\$/g,
                      ""
                    )}}`
                  : undefined
              }
              yLabel={
                responses?.difTimePlotAxisY
                  ? `\\text{${responses?.difTimePlotAxisY
                      .replace(/\\|\$/g, "")
                      .replace(/\bpsi\b/, "$\\psi$")}}`
                  : undefined
              }
            />

            <Curve f={(x) => Math.sin((Math.PI * x) / L)} from={0} to={L} />

            <Tick x={0} label="0" />
            <Tick x={L / 2} label="L/2" />
            <Tick x={L} label="L" />
          </Plot>

          <Prose>How should the axes be labeled?</Prose>

          <LabelsLeft>
            <TextLine
              model={m.difTimePlotAxisX}
              label="Horizontal axis label:"
            />
            <TextLine model={m.difTimePlotAxisY} label="Vertical axis label:" />
          </LabelsLeft>
        </>
      ),
      guidance: {
        nextMessage(r, s) {
          const exp3PiOver2 = r.exp3PiOver2?.trim() || "";
          if (!/^\+?\s*i$/i.test(exp3PiOver2)) {
            // Because this feedback is imperfect, we never show this message twice.
            const alreadyPresented =
              s.sections?.difTimePlot?.revealedMessages?.includes(
                "exp(-i 3pi/ 2) feedback"
              );
            if (!alreadyPresented) {
              return "exp(-i 3pi/ 2) feedback";
            }
          }

          return "answer";
        },
        messages: {
          "exp(-i 3pi/ 2) feedback": {
            body: (
              <Guidance.Disagree>
                <p>
                  Double-check your answer, we got
                  <M display t="e^{-i3\pi/2} = +i" />
                  If you got something different, update your answer and
                  reconsider your axis labels before checking in again.
                </p>

                <p>
                  Note: it’s possible that your answer is equivalent to{" "}
                  <M t="+i" /> but this software isn’t clever enough to realize!
                  If so, just click ahead to check in on your axis labels.
                </p>
              </Guidance.Disagree>
            ),
            onContinue: "nextMessage",
          },
          answer: {
            body: (
              <Guidance.HeadsUp>
                This software can’t interpret what you’ve written, but we
                suggest <M t="x" /> for the horizontal axis label, and
                <M t="\operatorname{Im} \psi_1" /> (the imaginary part of
                <M t="\psi_1" />) for the vertical axis label.
              </Guidance.HeadsUp>
            ),
            onContinue: "nextSection",
          },
        },
      },
    }),

    section({
      name: "wholeFunctionTimeDependencePlot",
      body: (m) => (
        <>
          <TextBox
            model={m.wholeFunctionTimeDependencePlot}
            label={
              <Prose>
                <p>
                  Earlier, you plotted the time evolution for a single value of
                  <M t="x" /> of the eigenfunction <M t="\psi_1(x,t)" />. How
                  might you plot the time evolution for the{" "}
                  <em>entire function</em> using a three-dimensional
                  representation?
                </p>

                <p>
                  Just give yourself a minute to think about this—then please
                  move on!
                </p>
              </Prose>
            }
            minRows={3}
          />

          <Callout color="blue" iconLeft={<PencilIcon size="medium" />}>
            Break out some scrap paper to test your ideas!
          </Callout>

          <Prose>
            On the next page, we’ll explore one such representation.
          </Prose>
        </>
      ),
    }),
  ],
}));

const L = 4;

const EnergyEigenstate = ({
  f,
  isOffset = false,
}: {
  f: (x: number) => number;
  isOffset?: boolean;
}) => (
  <Plot
    origin={[isOffset ? "center" : 0.5, "center"]}
    scale={50}
    width={250}
    height={150}
  >
    <Axes xLabel="x" />
    <Curve
      f={(x) => f(x + (isOffset ? L / 2 : 0))}
      from={isOffset ? -L / 2 : 0}
      to={isOffset ? L / 2 : L}
    />
    <Tick x={0} label="0" />
    <Tick x={L / 2} label="L/2" />
    {isOffset ? <Tick x={-L / 2} label="-L/2" /> : <Tick x={L} label="L" />}
  </Plot>
);

const Psi1 = memo(() => (
  <EnergyEigenstate f={(x) => Math.sin((x * Math.PI) / L)} />
));
const Psi1Squared = memo(() => (
  <EnergyEigenstate f={(x) => Math.sin((x * Math.PI) / L) ** 2} />
));
const Psi2 = memo(() => (
  <EnergyEigenstate f={(x) => Math.sin((2 * x * Math.PI) / L)} />
));
const Psi2Squared = memo(() => (
  <EnergyEigenstate f={(x) => Math.sin((2 * x * Math.PI) / L) ** 2} />
));

// direction === 1  => clockwise
// direction === -1 => counterclockwise
const RotatingPsi1 = ({ direction }: { direction: 1 | -1 }) => (
  <Plot width={200} height={200} scale={45} justifySelf="left">
    <Axes yLabel="\text{Im}" xLabel="\text{Re}" />

    <WithPlot>
      {(plot) => (
        <>
          <line
            x1={0}
            y1={0}
            x2={plot.x(1.5)}
            y2={0}
            stroke="green"
            strokeWidth={4}
          >
            <animateTransform
              attributeName="transform"
              attributeType="XML"
              type="rotate"
              from="0 0 0"
              to={`${direction * 360} 0 0`}
              dur="30s"
              repeatCount="indefinite"
            />
          </line>

          <circle
            cx={0}
            cy={0}
            r={plot.x(1.5)}
            fill="none"
            stroke="lightgrey"
            strokeWidth={1}
          />
        </>
      )}
    </WithPlot>
  </Plot>
);
