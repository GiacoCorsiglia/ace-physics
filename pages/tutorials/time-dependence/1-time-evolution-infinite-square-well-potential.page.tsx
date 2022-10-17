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

export default page(setup, ({ section }) => ({
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
            ["psi2^2", <Psi2Squared />],
          ]}
        />
      ),
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
            To type <M t="\psi_1(x)" />, copy-paste this: ψ1(x)
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
              Choose the expression that gives the time evolution of the ground
              state.
            </Prose>
          }
          choices={[
            ["none", "The ground state does not evolve with time."],
            ["-E_1", <M t="\psi_1(x,t) = e^{-iE_1t/\hbar}\psi_1(x)" />],
            ["+E_1", <M t="\psi_1(x,t) = e^{+iE_1t/\hbar}\psi_1(x)" />],
            ["-E_n", <M t="\psi_1(x,t) = e^{-iE_nt/\hbar}\psi_1(x)" />],
            ["+E_n", <M t="\psi_1(x,t) = e^{+Et/\hbar}\psi_1(x)" />],
          ]}
        />
      ),
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
              t="\frac{E_1 t}{\hbar} = 0,\ \pi/2,\ \pi,\ \text{and}\ 3\pi/2"
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
      name: "probDensPlot",
      body: (m, state) => (
        <>
          <Prose>
            <p>
              Your plot should be a circle in the complex plane, like below.
            </p>
          </Prose>

          <Plot width={300} height={300} scale={65}>
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
              t="\color{green} \psi(x,t)"
              x={-1.5 / Math.sqrt(2)}
              y={1.5 / Math.sqrt(2)}
              anchor="bottomRight"
            />
          </Plot>

          <hr />

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
    }),

    section({
      name: "difTimePlot",
      body: (m, { responses }) => (
        <>
          <Prose>
            Using <M t="e^{ix} = \cos x + i \sin x" /> or otherwise, determine
            <M t="e^{-i3\pi/2}" />.
          </Prose>

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
        nextMessage() {
          return "answer";
        },
        messages: {
          answer: {
            body: (
              <Guidance.HeadsUp>
                This software can’t interpret what you’ve written, but we
                suggest <M t="x" /> for the horizontal axis label, and
                <M t="\operatorname{Im} \psi" /> (the imaginary part of
                <M t="\psi" />) for the vertical axis label.
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

          <Prose faded>
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
const Psi2 = memo(() => (
  <EnergyEigenstate f={(x) => Math.sin((2 * x * Math.PI) / L)} />
));
const Psi2Squared = memo(() => (
  <EnergyEigenstate f={(x) => Math.sin((2 * x * Math.PI) / L) ** 2} />
));
