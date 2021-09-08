import {
  Button,
  ChooseOne,
  Guidance,
  Justify,
  LabelsLeft,
  M,
  Prose,
  TextBox,
  TextLine,
  Vocabulary,
} from "@/components";
import {
  Axes,
  DragHandle,
  Grid,
  Indicator,
  Plot,
  Tick,
  WithPlot,
} from "@/plots";
import { useModel } from "@/reactivity";
import { page } from "@/tutorial";
import { ArrowUpIcon } from "@primer/octicons-react";
import { Fragment } from "react";
import setup from "./setup";

export default page(setup, ({ section }) => ({
  name: "aContinuousVariable",
  label: "A Continuous Variable",
  answers: "none",
  sections: [
    section({
      name: "aContinuousVariableIntro",
      body: (
        <Prose>
          <p>
            Instead of “many discrete spin values,” we sometimes measure a
            continuous variable, e.g. position (<M t="x" prespace={false} />
            ). Suppose that:
          </p>

          <M
            display
            t="
          \braket{x|\psi} =
          \begin{cases}
            16 - x^2 & -4 < x < 4 \\
            0 &\text{elsewhere}
          \end{cases}
          "
          />
        </Prose>
      ),
      continue: { label: "Sounds good" },
    }),

    section({
      name: "originalPositionPlot",
      body: (m) => (
        <>
          <Prose>
            <p>Let’s create a diagram like we did on the previous page.</p>

            <p>
              First, we’ll just plot the integer values of <M t="x" />. (We
              could think of this diagram as representing an experiment where we
              only have 9 sensors for measuring the position, i.e., sensors at
              <M t="x=-4, -3, \ldots, 4" />
              .)
            </p>

            <p>
              This plot should look like your diagram from the previous
              page—except we’ve gotten rid of the rectangles to make things less
              busy.
            </p>
          </Prose>

          <Diagram phase="integer" />
        </>
      ),
      continue: { label: "Looks good" },
    }),

    section({
      name: "addPoints",
      body: (m, { responses }) => (
        <>
          <ChooseOne
            model={m.originalPositionPlotSufficient}
            label={
              <Prose>
                Above, we said that position is a continuous variable. Is this
                plot sufficient to describe the probability amplitude for all
                possible values of <M t="x" />?
              </Prose>
            }
            choices={[
              [
                "yes",
                <>
                  Yes, it’s sufficient. The plot shows the probability
                  amplitudes for all the possible values of
                  <M t="x" />.
                </>,
              ],
              [
                "no",
                <>
                  No, it’s insufficient. There are other possible values of
                  <M t="x" /> that the plot doesn’t show the probability
                  amplitude for.
                </>,
              ],
            ]}
          />

          {responses?.originalPositionPlotSufficient?.selected === "yes" && (
            <Guidance.Disagree>
              We disagree! For example, this plot doesn’t show you the
              probability amplitude for <M t="x=1.5" />, but that’s definitely
              an allowed value of position.
            </Guidance.Disagree>
          )}

          {responses?.originalPositionPlotSufficient?.selected === "no" && (
            <Guidance.Agree>
              We agree! Let’s try to address this problem by adding more points
              to the plot.
            </Guidance.Agree>
          )}
        </>
      ),
      continue: {
        label: "Add more points to the plot",
        visible: ({ responses }) =>
          responses?.originalPositionPlotSufficient?.selected === "no",
      },
    }),

    section({
      name: "halfInteger",
      body: (m) => (
        <>
          <Prose>
            Below, we’ve added points at{" "}
            <strong>every half-integer value</strong> of <M t="x" /> (in
            addition to the integer values of <M t="x" />, which were already
            there).
          </Prose>

          <Diagram phase="half-integer" />

          <Prose>In this updated diagram…</Prose>

          <TextLine
            model={m.halfIntegerPossibleMeasurements}
            label={
              <Prose>
                …how many different possible measurements are represented?
              </Prose>
            }
            maxWidth
          />

          <TextLine
            model={m.halfIntegerColumnElements}
            label={
              <Prose>
                …how many elements would be in a column vector for this state?
              </Prose>
            }
            maxWidth
          />

          <TextLine
            model={m.halfIntegerBasisStates}
            label={
              <Prose>…how many different basis states are represented?</Prose>
            }
            maxWidth
          />
        </>
      ),
    }),

    section({
      name: "halfIntegerDiracNotation",
      body: (m) => (
        <>
          <Prose>
            Using <strong>Dirac notation</strong>, how would you represent the
            probability amplitude for the particle at position <M t="x = 2.5" />
            ?
          </Prose>

          <LabelsLeft>
            <TextLine
              model={m.halfIntegerDiracNotation}
              label={<M t="{\color{purple} ??} =" />}
              maxWidth
            />
          </LabelsLeft>

          <Diagram phase="half-integer" xiPoint={2.5} xiPointLabel="" />
        </>
      ),
    }),

    section({
      name: "smoothing",
      body: (m) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [smooth, setSmooth] = useModel(m.smooth);
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [addMorePoints, setAddMorePoints] = useModel(m.addMorePoints);

        return (
          <>
            <Prose>Here’s the same diagram as in the previous question:</Prose>

            <Diagram
              phase={
                smooth
                  ? "smooth"
                  : addMorePoints
                  ? "quarter-integer"
                  : "half-integer"
              }
            />

            <Prose>
              We still haven’t covered all the possible values of <M t="x" />.
              Let’s fix that.
            </Prose>

            <Justify center>
              <Button
                onClick={() => setAddMorePoints(true)}
                color="blue"
                disabled={addMorePoints}
              >
                Add even more points <ArrowUpIcon />
              </Button>
            </Justify>

            {addMorePoints && (
              <>
                <Prose>That’s getting a little busy, don’t you think?</Prose>

                <Justify center>
                  <Button
                    onClick={() => setSmooth(true)}
                    color="blue"
                    disabled={smooth}
                  >
                    Replace the points with a continuous curve <ArrowUpIcon />
                  </Button>
                </Justify>
              </>
            )}

            {smooth && (
              <>
                <Prose>
                  <p>
                    <strong>Nice, we updated the diagram for you.</strong>
                  </p>

                  <p>
                    In the latest version of the diagram, with the continuous
                    curve…
                  </p>
                </Prose>

                <TextLine
                  model={m.smoothPossibleMeasurements}
                  label={
                    <Prose>
                      …how many different possible measurements are represented?
                    </Prose>
                  }
                  maxWidth
                />

                <TextLine
                  model={m.smoothBasisStates}
                  label={
                    <Prose>
                      …how many different basis states are represented?
                    </Prose>
                  }
                  maxWidth
                />
              </>
            )}
          </>
        );
      },
      continue: {
        allowed: ({ responses }, allowed) => allowed && !!responses?.smooth,
      },
    }),

    section({
      name: "xiLabel",
      body: (m) => (
        <>
          <Prose>
            Using <strong>Dirac notation</strong>, how would you label the
            probability amplitude for the particle at an arbitrary position{" "}
            <M t="x_i" />?
          </Prose>

          <LabelsLeft>
            <TextLine
              model={m.xiLabel}
              label={<M t="{\color{purple} ??} =" />}
              maxWidth
            />
          </LabelsLeft>

          <Diagram phase="smooth" xiPoint={1.5} />
        </>
      ),
    }),

    section({
      name: "xProb0or3",
      body: (m) => (
        <>
          <ChooseOne
            model={m.xProb0or3}
            choices={[
              [
                "near 0",
                <>
                  Measuring <M t="x" /> to be near <M t="0" />
                </>,
              ],
              [
                "near 3",
                <>
                  Measuring <M t="x" /> to be near <M t="3" />
                </>,
              ],
            ]}
            label={
              <Prose>
                Which is <strong>more likely</strong>, measuring <M t="x" /> to
                be near <M t="0" /> or near <M t="3" />?
              </Prose>
            }
          />

          <TextBox
            model={m.xProb0or3Explain}
            label={<Prose>How can you tell?</Prose>}
          />
        </>
      ),
    }),

    section({
      name: "xProbPositiveNegative",
      body: (m) => (
        <>
          <ChooseOne
            model={m.xProbPositiveNegative}
            choices={[
              [
                "positive",
                <>
                  Measuring <M t="x" /> to be positive
                </>,
              ],
              [
                "negative",
                <>
                  Measuring <M t="x" /> to be negative
                </>,
              ],
            ]}
            label={
              <Prose>
                Which is <strong>more likely</strong>, measuring <M t="x" /> to
                be positive or negative?
              </Prose>
            }
          />

          <TextBox
            model={m.xProbPositiveNegativeExplain}
            label={<Prose>How can you tell?</Prose>}
          />
        </>
      ),
    }),

    section({
      name: "waveFunction",
      body: () => (
        <>
          <Prose>
            In QM, people write the function <M t="\psi(x)" /> instead of{" "}
            <M t="\braket{x|\psi}" />. This is called the{" "}
            <Vocabulary>wave function</Vocabulary>. The diagram you created on
            this page can be labeled with <M t="\psi(x)" /> on the vertical
            axis, like this:
          </Prose>

          <Diagram phase="smooth" axisLabel="\psi(x)" />
        </>
      ),
      continue: { label: "OK, cool" },
    }),

    section({
      name: "psiXasColumn",
      body: (m) => (
        <TextBox
          model={m.psiXasColumn}
          label={
            <Prose>
              Could you still write <M t="\ket{\psi}" /> as a column vector? If
              so, how many elements would it have? What advantages does the{" "}
              <M t="\psi(x)" /> notation have over column vectors?
            </Prose>
          }
        />
      ),
    }),
  ],
}));

const Diagram = ({
  phase,
  xiPoint,
  xiPointLabel = "x_i",
  axisLabel = "\\text{Probability Amplitude}",
}: {
  phase?: "integer" | "half-integer" | "quarter-integer" | "smooth";
  xiPoint?: number;
  xiPointLabel?: string;
  axisLabel?: string;
}) => (
  <Plot
    width={560}
    scale={[Math.ceil(560 / 9), 15]}
    height={(16 + 2 + 2) * 15}
    origin={["center", 16 + 2]}
    padding={25}
  >
    <Grid axis="y" />

    {phase !== "smooth" &&
      Array.from(
        (function* () {
          const step =
            phase === "integer"
              ? 1
              : phase === "half-integer"
              ? 0.5
              : phase === "quarter-integer"
              ? 0.25
              : phase === "smooth"
              ? 0.5
              : 0.5;
          for (let x = -4; x <= 4; x += step) {
            yield x;
          }
        })()
      ).map((x) => {
        const height = 16 - x ** 2;

        const needsLabel = x !== 0 && Number.isInteger(x);

        return (
          <Fragment key={x}>
            <Tick x={x} label={needsLabel ? x : undefined} />

            <DragHandle
              direction="y"
              snap={1}
              xDefault={x}
              yDefault={height}
              disabled
            />
          </Fragment>
        );
      })}

    {phase === "smooth" && (
      <>
        <Tick x={4} label={4} />
        <Tick x={-4} label={-4} />
      </>
    )}

    {phase === "smooth" && (
      <WithPlot>
        {(plot) => {
          const f = (x: number) => 16 - x ** 2;

          const curve: string[] = [];
          curve.push(`${plot.leftEdge},0`);
          curve.push(`${plot.x(-4)},0`);

          for (let x = -4.0; x <= 4.0; x += 0.1) {
            curve.push(`${plot.x(x)},${plot.y(f(x))}`);
          }

          curve.push(`${plot.x(4)},0`);
          curve.push(`${plot.rightEdge},0`);

          return (
            <polyline points={curve.join(" ")} fill="none" stroke="black" />
          );
        }}
      </WithPlot>
    )}

    {xiPoint !== undefined && (
      <>
        {xiPointLabel && <Tick x={xiPoint} label={xiPointLabel} />}
        <Indicator x={xiPoint} from={0} to={16 - xiPoint ** 2} />

        <Tick y={16 - xiPoint ** 2} label="??" color="purple" />
        <Indicator
          y={16 - xiPoint ** 2}
          from={0}
          to={xiPoint}
          color="#bb8ebb"
        />

        <DragHandle
          direction="y"
          snap={1}
          xDefault={xiPoint}
          yDefault={16 - xiPoint ** 2}
          disabled
        />
      </>
    )}

    <Tick y={16} label={16} labelPosition="left" />

    <Axes xLabel="x" yLabel={axisLabel} />
  </Plot>
);
