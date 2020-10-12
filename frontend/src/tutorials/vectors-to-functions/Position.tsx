import React from "react";
import { VectorsToFunctions } from "src/common/tutorials";
import { Continue, Prose, Section, Vocabulary } from "src/components";
import { Choice, TextArea } from "src/components/inputs";
import { choices } from "src/components/inputs/Select";
import { Content } from "src/components/layout";
import M from "src/components/M";
import {
  Axes,
  Bar,
  DragHandle,
  Grid,
  Indicator,
  Plot,
  Tick,
} from "src/components/plots";
import { Field, isSet } from "src/state";
import { range } from "src/util";
import { ContinueToNextPart, Part, sectionComponents } from "../shared";
import styles from "./styles.module.scss";

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
        <p>
          Let’s create a diagram like we did on the previous page. We’ll start
          with the integer values of <M t="x" />, then fill in the rest.
        </p>

        <p>
          You can click and drag on the black dots to move them up and down.
        </p>

        <p>
          Notice that the horizontal axis is now labeled <M t="x" />.
        </p>
      </Prose>

      <Histogram field={f.positionHeights} phase="editing" barCount={9} />

      <div className={styles.histogramLabels}>
        {range(9).map((i) => (
          <div className={styles.histogramLabel} key={i}>
            {f.positionHeights.elements[i].value}
          </div>
        ))}
      </div>

      <Continue
        commit={f.positionHeightsCommit}
        allowed={isSet(f.positionHeights)}
      />
    </Section>
  ),
  (f) => (
    <Section commits={f.positionHeightsCommit}>
      <Prose>TODO…</Prose>
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
        <Vocabulary>wave function</Vocabulary>. The diagram you created at the
        top of this page can be labeled with <M t="\psi(x)" /> on the vertical
        axis, like this:
      </Prose>

      <Prose>TODO…</Prose>

      <Continue commit={f.waveFunctionCommit} label="Cool" />
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

const Histogram = ({
  field: tupleField,
  phase,
  barCount = 9,
  bars = false,
}: {
  field: Field<typeof VectorsToFunctions["properties"]["positionHeights"]>;
  phase: "editing" | "labeling";
  /** @deprecated */
  barCount?: 9;
  bars?: boolean;
}) => (
  <Plot
    width={560}
    scale={[Math.ceil(560 / (barCount || 9)), 15]}
    height={(16 + 2 + 2) * 15}
    origin={["center", 16 + 2]}
    padding={25}
  >
    <Grid axis="y" />

    {range(barCount).map((i) => {
      const defaultHeight = 4;
      // Only odd number counts have a center
      const isCenter = barCount % 2 === 1 && i === Math.floor(barCount / 2);
      const x = i - (barCount - 1) / 2;
      const field = tupleField.elements[i];

      const height = field.value !== undefined ? field.value : defaultHeight;

      return (
        <React.Fragment key={i}>
          {phase === "editing" && <Indicator x={x} />}

          {phase === "labeling" && (i === 1 || i === 3 || i === 8) && (
            <Indicator x={x} from={height} to="top" />
          )}

          <Tick x={x} label={isCenter ? undefined : x} />

          {bars && <Bar x={x} height={height} width={0.6} />}

          <DragHandle
            direction="y"
            snap={1}
            xDefault={x}
            yDefault={defaultHeight}
            yField={field}
            disabled={phase !== "editing"}
          />
        </React.Fragment>
      );
    })}

    <Tick y={16} label={16} labelPosition="left" />

    <Axes xLabel="x" yLabel="\text{Probability Amplitude}" />
  </Plot>
);
