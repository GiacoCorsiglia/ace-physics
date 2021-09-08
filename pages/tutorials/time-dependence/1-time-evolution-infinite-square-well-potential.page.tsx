import { LabelsLeft, M, Prose, TextBox, TextLine } from "@/components";
import { Axes, Label, Plot, WithPlot } from "@/plots";
import { page } from "@/tutorial";
import setup from "./setup";

export default page(setup, ({ section }) => ({
  name: "timeEvolutionInfiniteSquareWellPotential",
  label: "Time Evolution in the Infinite Square Well Potential",
  answers: "none",
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
            <M t="E_n = n^2 E_1" />. Consider a particle in the ground state at
            time t=0 given by <M t="\psi_1(x)" />.
          </p>
        </Prose>
      ),
    }),

    section({
      name: "groundStateSketch",
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
      name: "timeEvolutionDescription",
      body: (m) => (
        <>
          <Prose>
            <p>
              Consider <M t="\psi_1" /> at the point <M t="x = L/2" />. Plot the
              time evolution of <M t="\psi_1(x=L/2,t)" /> on a graph of the
              complex plane. (Use Zoom annotations/scrap paper again.)
            </p>

            <p>
              <em>
                Hint: Try plotting the values of
                <M t="e^{-i E_1 t /\hbar}" /> for{" "}
                <M t="E_1 t/ ħ = 0,\pi/2,\pi,3\pi/2" /> on the graph and
                interpolate between them.
              </em>
            </p>
          </Prose>

          <Plot width={400} height={400}>
            <Axes yLabel="\text{Im}" xLabel="\text{Re}" />
          </Plot>

          <Prose>
            <strong>Take a screenshot of your graph when you’re done.</strong>
          </Prose>

          <TextBox
            model={m.timeEvolutionDescription}
            label={<Prose>Describe this time evolution in words:</Prose>}
          />
        </>
      ),
    }),

    section({
      name: "probDensPlot",
      body: (m) => (
        <>
          <Prose>
            <p>
              Your plot should be a circle in the complex plane, like below.
            </p>

            <p>
              Now consider the probability density <M t="|\psi_1(x)|^2" /> at
              the point <M t="x = L/2" />.{" "}
              <strong>Plot the value of the probability density</strong> on
              these same axes for the same times,
              <M t="E_1 t/ ħ = 0,\pi/2,\pi,3\pi/2" prespace={false} />:
            </p>
          </Prose>

          <Plot width={400} height={400}>
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

          <TextBox
            model={m.probDensRelationshipToProbAmp}
            label={
              <Prose>
                How is this value related to the value of <M t="\psi_1" />?
              </Prose>
            }
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
            <p>
              Sketch the energy eigenfunction
              <M t="\psi_1(x,t)" /> for the time where
              <M t="E_1 t/\hbar = 3\pi/2" />.
            </p>

            <p>How should the axes be labeled?</p>
          </Prose>

          <LabelsLeft>
            <TextLine
              model={m.difTimePlotAxisX}
              label="Horizontal axis label:"
            />
            <TextLine model={m.difTimePlotAxisY} label="Vertical axis label:" />
          </LabelsLeft>

          <Prose>
            Now complete the sketch using Zoom annotation or on scrap paper.
          </Prose>

          <Plot width={560} height={400} origin={[0.2, "center"]}>
            <Axes
              xLabel={
                responses?.difTimePlotAxisX
                  ? `\\text{${responses?.difTimePlotAxisX.replace(/\\/g, "")}}`
                  : undefined
              }
              yLabel={
                responses?.difTimePlotAxisY
                  ? `\\text{${responses?.difTimePlotAxisY.replace(/\\/g, "")}}`
                  : undefined
              }
            />
          </Plot>
        </>
      ),
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
                  would you plot the time evolution for the entire function
                  using a three-dimensional representation?
                </p>

                <p>
                  Just give yourself a minute to think about this—then please
                  move on!
                </p>
              </Prose>
            }
          />

          <Prose faded>
            On the next page, we’ll explore one such representation.
          </Prose>
        </>
      ),
    }),
  ],
}));
