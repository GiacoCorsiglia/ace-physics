import { ArrowUpIcon } from "@primer/octicons-react";
import React from "react";
import { VectorsToFunctions } from "src/common/tutorials";
import { Continue, Help, Prose, Section, Vocabulary } from "src/components";
import {
  Button,
  Choice,
  FieldGroup,
  Text,
  TextArea,
} from "src/components/inputs";
import { choices } from "src/components/inputs/Select";
import { Content } from "src/components/layout";
import M from "src/components/M";
import {
  Axes,
  DragHandle,
  Grid,
  Indicator,
  Plot,
  Tick,
  WithPlot,
} from "src/components/plots";
import { isSet } from "src/state";
import { ContinueToNextPart, Part, sectionComponents } from "../shared";

export default function Position() {
  return (
    <Part label="A Continuous Variable">
      <Content>{sections}</Content>
    </Part>
  );
}

const sections = sectionComponents(VectorsToFunctions, [
  (f) => (
    <Section first>
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

      <Continue commit={f.positionIntroCommit} label="Sounds good" />
    </Section>
  ),

  (f) => (
    <Section commits={f.positionIntroCommit}>
      <Prose>
        <p>Let’s create a diagram like we did on the previous page.</p>

        <p>
          First, we’ll just plot the integer values of <M t="x" />. (We could
          think of this diagram as representing an experiment where we only have
          9 sensors for measuring the position, i.e., sensors at
          <M t="x=-4, -3, \ldots, 4" />
          .)
        </p>

        <p>
          This plot should look like your diagram from the previous page—except
          we’ve gotten rid of the rectangles to make things less busy.
        </p>
      </Prose>

      <Diagram phase="integer" />

      <Choice
        field={f.originalPositionPlotSufficient}
        label={
          <Prose>
            Above, we said that position is a continuous variable. Is this plot
            sufficient to describe the probability amplitude for all possible
            values of <M t="x" />?
          </Prose>
        }
        choices={choices(f.originalPositionPlotSufficient, {
          yes: (
            <>
              Yes, it’s sufficient. The plot shows the probability amplitudes
              for all the possible values of
              <M t="x" />.
            </>
          ),
          no: (
            <>
              No, it’s insufficient. There are other possible values of
              <M t="x" /> that the plot doesn’t show the probability amplitude
              for.
            </>
          ),
        })}
        allowOther={false}
      />

      {f.originalPositionPlotSufficient.value?.selected === "yes" && (
        <Help>
          <Prose>
            We disagree! For example, this plot doesn’t show you the probability
            amplitude for <M t="x=1.5" />, but that’s definitely an allowed
            value of position.
          </Prose>
        </Help>
      )}

      {f.originalPositionPlotSufficient.value?.selected === "no" && (
        <>
          <Help>
            <Prose>
              We agree! Let’s try to address this problem by adding more points
              to the plot.
            </Prose>
          </Help>

          <Continue
            commit={f.originalPositionPlotCommit}
            label="Add more points to the plot"
          />
        </>
      )}
    </Section>
  ),

  (f) => (
    <Section commits={f.originalPositionPlotCommit}>
      <Prose>
        Below, we’ve added points at <strong>every half-integer value</strong>{" "}
        of <M t="x" /> (in addition to the integer values of <M t="x" />, which
        were already there).
      </Prose>

      <Diagram phase="half-integer" />

      <Prose>In this updated diagram…</Prose>

      <Text
        field={f.halfIntegerPossibleMeasurements}
        label={
          <Prose>
            …how many different possible measurements are represented?
          </Prose>
        }
        maxWidth
      />

      <Text
        field={f.halfIntegerColumnElements}
        label={
          <Prose>
            …how many elements would be in a column vector for this state?
          </Prose>
        }
        maxWidth
      />

      <Text
        field={f.halfIntegerBasisStates}
        label={<Prose>…how many different basis states are represented?</Prose>}
        maxWidth
      />

      <Continue
        commit={f.halfIntegerCommit}
        allowed={
          isSet(f.halfIntegerPossibleMeasurements) &&
          isSet(f.halfIntegerColumnElements) &&
          isSet(f.halfIntegerBasisStates)
        }
      />
    </Section>
  ),

  (f) => (
    <Section commits={f.halfIntegerCommit}>
      <Prose>
        Using <strong>Dirac notation</strong>, how would you represent the
        probability amplitude for the particle at position <M t="x = 2.5" />?
      </Prose>

      <FieldGroup grid className="margin-top-1">
        <Text
          field={f.halfIntegerDiracNotation}
          label={<M t="{\color{purple} ??} =" />}
          maxWidth
        />
      </FieldGroup>

      <Diagram phase="half-integer" xiPoint={2.5} xiPointLabel="" />

      <Continue
        commit={f.halfIntegerDiracNotationCommit}
        allowed={isSet(f.halfIntegerDiracNotation)}
      />
    </Section>
  ),

  (f) => (
    <Section commits={f.halfIntegerDiracNotationCommit}>
      <Prose>Here’s the same diagram as in the previous question:</Prose>

      <Diagram
        phase={
          f.smooth.value
            ? "smooth"
            : f.addMorePoints.value
            ? "quarter-integer"
            : "half-integer"
        }
      />

      <Prose>
        We still haven’t covered all the possible values of <M t="x" />. Let’s
        fix that.
      </Prose>

      <div className="text-center margin-top-1">
        <Button
          onClick={() => f.addMorePoints.set(true)}
          kind="secondary"
          disabled={f.addMorePoints.value}
        >
          Add even more points <ArrowUpIcon />
        </Button>
      </div>

      {f.addMorePoints.value && (
        <>
          <Prose>That’s getting a little busy, don’t you think?</Prose>

          <div className="text-center margin-top-1">
            <Button
              onClick={() => f.smooth.set(true)}
              kind="secondary"
              disabled={f.smooth.value}
            >
              Replace the points with a continuous curve <ArrowUpIcon />
            </Button>
          </div>
        </>
      )}

      {f.smooth.value && (
        <>
          <Prose>
            <p>
              <strong>Nice, we updated the diagram for you.</strong>
            </p>

            <p>
              In the latest version of the diagram, with the continuous curve…
            </p>
          </Prose>

          <Text
            field={f.smoothPossibleMeasurements}
            label={
              <Prose>
                …how many different possible measurements are represented?
              </Prose>
            }
            maxWidth
          />

          <Text
            field={f.smoothBasisStates}
            label={
              <Prose>…how many different basis states are represented?</Prose>
            }
            maxWidth
          />

          <Continue
            commit={f.smoothingCommit}
            allowed={
              isSet(f.smoothPossibleMeasurements) && isSet(f.smoothBasisStates)
            }
          />
        </>
      )}
    </Section>
  ),

  (f) => (
    <Section commits={f.smoothingCommit}>
      <Prose>
        Using <strong>Dirac notation</strong>, how would you represent the
        probability amplitude for the particle at position <M t="x = x_i" />?
      </Prose>

      <FieldGroup grid className="margin-top-1">
        <Text
          field={f.xiLabel}
          label={<M t="{\color{purple} ??} =" />}
          maxWidth
        />
      </FieldGroup>

      <Diagram phase="smooth" xiPoint={1.5} />

      <Continue commit={f.xiLabelCommit} allowed={isSet(f.xiLabel)} />
    </Section>
  ),

  (f) => (
    <Section /* TODO: commits={} */>
      <Choice
        field={f.xProb0or3}
        choices={choices(f.xProb0or3, {
          "near 0": (
            <>
              Measuring <M t="x" /> to be near <M t="0" />
            </>
          ),
          "near 3": (
            <>
              Measuring <M t="x" /> to be near <M t="3" />
            </>
          ),
        })}
        label={
          <Prose>
            Which is <strong>more likely</strong>, measuring <M t="x" /> to be
            near <M t="0" /> or near <M t="3" />?
          </Prose>
        }
      />

      <TextArea
        field={f.xProb0or3Explain}
        label={<Prose>How can you tell?</Prose>}
      />

      <Continue
        commit={f.xProb0or3Commit}
        allowed={isSet(f.xProb0or3) && isSet(f.xProb0or3Explain)}
      />
    </Section>
  ),

  (f) => (
    <Section commits={f.xProb0or3Commit}>
      <Choice
        field={f.xProbPositiveNegative}
        choices={choices(f.xProbPositiveNegative, {
          positive: (
            <>
              Measuring <M t="x" /> to be positive
            </>
          ),
          negative: (
            <>
              Measuring <M t="x" /> to be negative
            </>
          ),
        })}
        label={
          <Prose>
            Which is <strong>more likely</strong>, measuring <M t="x" /> to be
            positive or negative?
          </Prose>
        }
      />

      <TextArea
        field={f.xProbPositiveNegativeExplain}
        label={<Prose>How can you tell?</Prose>}
      />

      <Continue
        commit={f.xProbPositiveNegativeCommit}
        allowed={
          isSet(f.xProbPositiveNegative) &&
          isSet(f.xProbPositiveNegativeExplain)
        }
      />
    </Section>
  ),

  (f) => (
    <Section commits={f.xProbPositiveNegativeCommit}>
      <Prose>
        In QM, people write the function <M t="\psi(x)" /> instead of{" "}
        <M t="\braket{x|\psi}" />. This is called the{" "}
        <Vocabulary>wave function</Vocabulary>. The diagram you created on this
        page can be labeled with <M t="\psi(x)" /> on the vertical axis, like
        this:
      </Prose>

      <Diagram phase="smooth" axisLabel="\psi(x)" />

      <Continue commit={f.waveFunctionCommit} label="OK, cool" />
    </Section>
  ),

  (f) => (
    <Section commits={f.waveFunctionCommit}>
      <TextArea
        field={f.psiXasColumn}
        label={
          <Prose>
            Could you still write <M t="\ket{\psi}" /> as a column vector? If
            so, how many elements would it have? What advantages does the{" "}
            <M t="\psi(x)" /> notation have over column vectors?
          </Prose>
        }
      />

      <Continue commit={f.psiXasColumnCommit} allowed={isSet(f.psiXasColumn)} />
    </Section>
  ),

  (f) => (
    <Section commits={f.psiXasColumnCommit}>
      <ContinueToNextPart commit={f.positionFinalCommit} />
    </Section>
  ),
]);

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
          <React.Fragment key={x}>
            <Tick x={x} label={needsLabel ? x : undefined} />

            <DragHandle
              direction="y"
              snap={1}
              xDefault={x}
              yDefault={height}
              disabled
            />
          </React.Fragment>
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
