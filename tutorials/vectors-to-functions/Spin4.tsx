import { Continue, Help, HelpButton, Prose, Section } from "@/design";
import { Content } from "@/design/layout";
import { Decimal, FieldGroup, Text, TextArea, Toggle } from "@/inputs";
import Select, { choices } from "@/inputs/Select";
import M from "@/math";
import VariableLengthColumn from "@/math/VariableLengthColumn";
import { Axes, Bar, DragHandle, Grid, Indicator, Plot, Tick } from "@/plots";
import { Field, isSet, needsHelp } from "@/state";
import { range } from "@/util";
import { VectorsToFunctions } from "common/tutorials";
import { Fragment } from "react";
import { ContinueToNextPart, Part, sectionComponents } from "tutorials/shared";
import styles from "./styles.module.scss";

export default function Spin4() {
  return (
    <Part label="A Spin-4 Particle">
      <Content>{sections}</Content>
    </Part>
  );
}

const sections = sectionComponents(VectorsToFunctions, [
  (f) => (
    <Section first>
      <Prose>
        <p>Consider a spin-4 particle.</p>

        <p>
          The eigenstates of <M t="S_z" /> are written as{" "}
          <M t="\ket{4}\!,\ \ket{3}\!,\ \dots,\ \ket{-3}\!,\ \ket{-4}" />
        </p>
      </Prose>

      <Continue commit={f.spin4IntroCommit} label="Ok, got it" />
    </Section>
  ),

  (f) => (
    <Section commits={f.spin4IntroCommit}>
      <Prose>
        Suppose the spin-4 particle is in the state <M t="\ket{\psi_D}" />,
        which satisfies the following relationships:
        <M
          display
          t="\braket{4|\psi_D} = 0,\ \braket{3|\psi_D} = 7,\ \braket{n|\psi_D} = (16 - n^2)"
        />
        Write <M t="\ket{\psi_D}" /> as a column vector with numbers. (Don’t
        worry about normalization yet.)
      </Prose>

      <VariableLengthColumn
        className="margin-top-1"
        field={f.spin4Column}
        inputEl={<Decimal field={f.spin4Column.elements[0]} />}
        labelTex="\ket{\psi_D}"
      />

      <Continue commit={f.spin4ColumCommit} allowed={isSet(f.spin4Column)} />
    </Section>
  ),

  (f) => (
    <Section commits={f.spin4ColumCommit}>
      <Prose>
        <p>
          Create a diagram for the probability amplitude of{" "}
          <M t="\ket{\psi_D}" />. You can click and drag on the black dots to
          move the bars up and down.
        </p>

        <p>
          Notice that we’ve labeled the horizontal axis <M t="n" />.
        </p>
      </Prose>

      <Histogram field={f.spin4BarHeights} phase="editing" />

      <div className={styles.histogramLabels}>
        {range(9).map((i) => (
          <div className={styles.histogramLabel} key={i}>
            {f.spin4BarHeights.elements[i].value}
          </div>
        ))}
      </div>

      {needsHelp(f.spin4HistogramTechDifficultiesHelp) && (
        <Help>
          <Prose>
            <p>
              Are you having technical difficulties dragging the bars up and
              down in the graph? Sorry about that! You can now move on without
              finishing the graph. Please make note of this issue on the
              feedback page at the end of the tutorial.
            </p>

            <p>
              If you‘re not having tech difficulties, please finish the graph
              before moving on though!
            </p>
          </Prose>
        </Help>
      )}

      <Continue
        commit={f.spin4HistogramCommit}
        allowed={
          isSet(f.spin4BarHeights) ||
          needsHelp(f.spin4HistogramTechDifficultiesHelp)
        }
      >
        <HelpButton help={f.spin4HistogramTechDifficultiesHelp}>
          Technical difficulties?
        </HelpButton>
      </Continue>
    </Section>
  ),

  (f) => (
    <Section commits={f.spin4HistogramCommit}>
      <Prose>
        Label these three points using Dirac notation (meaning, use clearly
        labeled bras and kets). You can type bras and kets using the{" "}
        <strong>&lt;</strong>, <strong>&gt;</strong>, and <strong>|</strong>{" "}
        keys, and just type the word “psi”.
      </Prose>

      <div className={styles.diracLabels}>
        <Text
          className={styles.diracLabelInput}
          field={f.minus3Dirac}
          placeholder=""
        />
        <Text
          className={styles.diracLabelInput}
          field={f.minus1Dirac}
          placeholder=""
        />
        <Text
          className={styles.diracLabelInput}
          field={f.plus4Dirac}
          placeholder=""
        />
      </div>

      <Histogram field={f.spin4BarHeights} phase={"labeling"} />

      <Continue
        commit={f.diracLabelsCommit}
        allowed={
          isSet(f.minus3Dirac) && isSet(f.minus1Dirac) && isSet(f.plus4Dirac)
        }
      />
    </Section>
  ),

  (f) => {
    const cs = choices(f.minus3DiracSelect, {
      "<-4|psi>": <M t="\braket{-4|\psi_D}" />,
      "<-3|psi>": <M t="\braket{-3|\psi_D}" />,
      "<-2|psi>": <M t="\braket{-2|\psi_D}" />,
      "<-1|psi>": <M t="\braket{-1|\psi_D}" />,
      "<0|psi>": <M t="\braket{0|\psi_D}" />,
      "<1|psi>": <M t="\braket{1|\psi_D}" />,
      "<2|psi>": <M t="\braket{2|\psi_D}" />,
      "<3|psi>": <M t="\braket{3|\psi_D}" />,
      "<4|psi>": <M t="\braket{4|\psi_D}" />,
    });

    const s = {
      dropdownIndicator: (styles: any) => ({
        ...styles,
        paddingLeft: "3px",
        paddingRight: "3px",
      }),
    };

    return (
      <Section commits={f.diracLabelsCommit}>
        <Prose>
          Select labels for the same three points; choose the labels that most
          closely match the dirac notation expressions you typed in above.
        </Prose>

        <div className={styles.diracLabels}>
          <Select
            className={styles.diracLabelSelect}
            field={f.minus3DiracSelect}
            choices={cs}
            placeholder=""
            allowOther={false}
            isClearable={false}
            styles={s}
          />
          <Select
            className={styles.diracLabelSelect}
            field={f.minus1DiracSelect}
            choices={cs}
            placeholder=""
            allowOther={false}
            isClearable={false}
            styles={s}
          />
          <Select
            className={styles.diracLabelSelect}
            field={f.plus4DiracSelect}
            choices={cs}
            placeholder=""
            allowOther={false}
            isClearable={false}
            styles={s}
          />
        </div>

        <Histogram field={f.spin4BarHeights} phase={"labeling"} />

        <Continue
          commit={f.diracLabelSelectsCommit}
          allowed={
            isSet(f.minus3DiracSelect) &&
            isSet(f.minus1DiracSelect) &&
            isSet(f.plus4DiracSelect)
          }
        />
      </Section>
    );
  },
  (f) => (
    <Section commits={f.diracLabelSelectsCommit}>
      <TextArea
        field={f.spin4Normalization}
        label={
          <Prose>
            <p>
              Do you see that <M t="\ket{\psi}_D" /> is NOT normalized?
            </p>
            <p>
              Without going through all the details, how would you go about
              normalizing it?
            </p>
          </Prose>
        }
      />

      <Continue
        commit={f.spin4NormalizationCommit}
        allowed={isSet(f.spin4Normalization)}
      />
    </Section>
  ),
  (f) => (
    <Section commits={f.spin4NormalizationCommit}>
      <Prose>Which option is MORE likely?</Prose>

      <FieldGroup grid className="margin-top-1">
        <Toggle
          field={f.spin4ProbAsymmetric}
          choices={choices(f.spin4ProbAsymmetric, {
            "0": <M t="0" />,
            "2hbar": <M t="+2 \hbar" />,
            equal: "Equally likely",
          })}
          label={
            <>
              Measuring <M t="S_z" /> to be…
            </>
          }
        />
        <Toggle
          field={f.spin4ProbSymmetric}
          choices={choices(f.spin4ProbSymmetric, {
            "-2hbar": <M t="-2 \hbar" />,
            "2hbar": <M t="+2 \hbar" />,
            equal: "Equally likely",
          })}
          label={
            <>
              Measuring <M t="S_z" /> to be…
            </>
          }
        />
        <Toggle
          field={f.spin4ProbPositiveNegative}
          choices={choices(f.spin4ProbPositiveNegative, {
            positive: "Positive",
            negative: "Negative",
            equal: "Equally likely",
          })}
          label={
            <>
              Measuring <M t="S_z" /> to be…
            </>
          }
        />
      </FieldGroup>

      <Continue
        commit={f.spin4ProbCommit}
        allowed={
          isSet(f.spin4ProbAsymmetric) &&
          isSet(f.spin4ProbSymmetric) &&
          isSet(f.spin4ProbPositiveNegative)
        }
      />
    </Section>
  ),
  (f) => (
    <Section commits={f.spin4ProbCommit}>
      <ContinueToNextPart commit={f.spin4FinalCommit} />
    </Section>
  ),
]);

const Histogram = ({
  field: tupleField,
  phase,
  barCount = 9,
}: {
  field: Field<typeof VectorsToFunctions["properties"]["spin4BarHeights"]>;
  phase: "editing" | "labeling";
  /** @deprecated */
  barCount?: 9;
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
        <Fragment key={i}>
          {phase === "editing" && <Indicator x={x} />}

          {phase === "labeling" && (i === 1 || i === 3 || i === 8) && (
            <Indicator x={x} from={height} to="top" />
          )}

          <Tick x={x} label={isCenter ? undefined : x} />

          <Bar x={x} height={height} width={0.6} />

          <DragHandle
            direction="y"
            snap={1}
            xDefault={x}
            yDefault={defaultHeight}
            yField={field}
            disabled={phase !== "editing"}
          />
        </Fragment>
      );
    })}

    <Tick y={16} label={16} labelPosition="left" />

    <Axes xLabel="n" yLabel="\text{Probability Amplitude}" />
  </Plot>
);
