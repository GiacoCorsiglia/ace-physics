import React from "react";
import { QuantumBasis } from "src/common/tutorials";
import { Continue, Prose, Section, Vocabulary } from "src/components";
import { Choice, Select, TextArea } from "src/components/inputs";
import { Column, Columns, Content, Flex } from "src/components/layout";
import M from "src/components/M";
import { Axes, Bar, Plot, Tick, WithPlot } from "src/components/plots";
import { Field, isSet, useFields } from "src/state";
import { ContinueToNextPart, Part } from "src/tutorials/shared";

export default function ProbabilityProjection() {
  const f = useFields(QuantumBasis);

  return (
    <Part label="Probability and Projection">
      <Content>
        <Section first>
          <Prose>
            Consider the state:
            <M
              display
              t="\ket{\psi_A} = \frac{3}{5}\ket{+} - \frac{4}{5}\ket{-} \doteq \frac{1}{5} \begin{pmatrix} 3 \\ -4 \end{pmatrix}"
            />
            The coefficients <M t="\frac{3}{5}" /> and <M t="-\frac{4}{5}" />{" "}
            are examples of what we call{" "}
            <Vocabulary>probability amplitudes</Vocabulary>.
          </Prose>

          <Continue
            commit={f.probabilityProjectionIntroCommit}
            label="Got it"
          />
        </Section>

        <Section commits={f.probabilityProjectionIntroCommit}>
          <Choice
            field={f.meaningOfCoefficients}
            choices={meaningOfCoefficientsChoices}
            label={
              <Prose>
                What do the coefficients <M t="\frac{3}{5}" /> and{" "}
                <M t="-\frac{4}{5}" /> tell you?
                <br /> Check ALL that apply.
              </Prose>
            }
          />

          <Continue
            commit={f.meaningOfCoefficientsCommit}
            allowed={isSet(f.meaningOfCoefficients)}
          />
        </Section>
        {/* </Content> */}

        {/* <Content columns> */}
        <Section commits={f.meaningOfCoefficientsCommit}>
          {/* <Content> */}
          <Prose>Let's create two histograms to represent this state.</Prose>
          {/* </Content> */}

          <Columns>
            <Column>
              <Prose>
                First, complete the histogram below to show{" "}
                <Vocabulary>probability amplitudes</Vocabulary> for each
                possible outcome, <M t="\pm \hbar/2" />, in the <em>z</em>
                -direction.
              </Prose>

              <Histogram pm={f.probabilityAmplitude.value || emptyPm} />

              <HistogramHeightControl pm={f.probabilityAmplitude.properties} />
            </Column>

            <Column>
              <Prose>
                Now, complete the histogram below to show the corresponding{" "}
                <Vocabulary>probabilities</Vocabulary> for each possible
                outcome, <M t="\pm \hbar/2" />, in the <em>z</em>-direction.
              </Prose>

              <Histogram pm={f.probability.value || emptyPm} />

              <HistogramHeightControl pm={f.probability.properties} />
            </Column>
          </Columns>

          {/* <Content> */}
          <Continue
            commit={f.histogramHeightCommit}
            allowed={
              isSet(f.probability.properties.plusHeight) &&
              isSet(f.probability.properties.minusHeight) &&
              isSet(f.probabilityAmplitude.properties.plusHeight) &&
              isSet(f.probabilityAmplitude.properties.minusHeight)
            }
          />
          {/* </Content> */}
        </Section>

        <Section commits={f.histogramHeightCommit}>
          <Prose>
            On the same histograms, which are repeated below, label each bar
            with Dirac notation for either probability or probability amplitude.
          </Prose>

          <Columns>
            <Column>
              <Prose>
                <Vocabulary>Probability amplitudes</Vocabulary>
              </Prose>

              <Histogram pm={f.probabilityAmplitude.value || emptyPm} />

              <HistogramLabelControl pm={f.probabilityAmplitude.properties} />
            </Column>

            <Column>
              <Prose>
                <Vocabulary>Probabilities</Vocabulary>
              </Prose>

              <Histogram pm={f.probability.value || emptyPm} />

              <HistogramLabelControl pm={f.probability.properties} />
            </Column>
          </Columns>

          <Prose>
            Your labels should correspond with the <em>height</em> of each bar.
          </Prose>

          <Continue
            commit={f.histogramLabelCommit}
            allowed={
              isSet(f.probability.properties.plusLabel) &&
              isSet(f.probability.properties.minusLabel) &&
              isSet(f.probabilityAmplitude.properties.plusLabel) &&
              isSet(f.probabilityAmplitude.properties.minusLabel)
            }
          />
        </Section>

        <Section commits={f.histogramLabelCommit}>
          <TextArea
            field={f.relationshipProbAmp}
            label={
              <Prose>
                What is the relationship between the{" "}
                <Vocabulary>probability</Vocabulary> and the{" "}
                <Vocabulary>probability amplitude?</Vocabulary>
              </Prose>
            }
          />

          <Continue
            commit={f.relationshipProbAmpCommit}
            allowed={isSet(f.relationshipProbAmp)}
          />
        </Section>

        <Section commits={f.relationshipProbAmpCommit}>
          <ContinueToNextPart commit={f.probabilityProjectionFinalCommit} />
        </Section>
      </Content>
    </Part>
  );
}

const emptyPm = {};
const minusColor = "#e2f9db";
const plusColor = "#ecdbf9";

function asNumber(height: string | undefined) {
  if (!height) {
    return undefined;
  }
  const [num, denom] = height.split("/");
  return parseInt(num) / parseInt(denom);
}

function Histogram({ pm }: { pm: NonNullable<QuantumBasis["probability"]> }) {
  const minusHeight = asNumber(pm.minusHeight?.selected);
  const plusHeight = asNumber(pm.plusHeight?.selected);

  return (
    <Plot>
      <Axes />

      <Tick
        x={-0.75}
        label="-\hbar / 2"
        labelPosition={minusHeight && minusHeight < 0 ? "above" : "below"}
        color="darkgreen"
      />

      <Tick
        x={0.75}
        label="+\hbar / 2"
        labelPosition={plusHeight && plusHeight < 0 ? "above" : "below"}
        color="darkviolet"
      />

      <WithPlot>
        {({ width, height }) => (
          <line
            x1={-width / 4}
            y1={29}
            x2={-width / 4}
            y2={height / 2}
            stroke="#9be585"
            strokeWidth={2}
            strokeDasharray="4"
          />
        )}
      </WithPlot>

      <WithPlot>
        {({ width, height }) => (
          <line
            x1={width / 4}
            y1={29}
            x2={width / 4}
            y2={height / 2}
            stroke="#cc90f9"
            strokeWidth={2}
            strokeDasharray="4"
          />
        )}
      </WithPlot>

      {minusHeight && <Bar x={-0.75} height={minusHeight} fill={minusColor} />}

      {plusHeight && <Bar x={0.75} height={plusHeight} fill={plusColor} />}
    </Plot>
  );
}

const minusSelectStyles = {
  control: (styles: any) => ({
    ...styles,
    borderColor: "green",
    "&:hover": {
      borderColor: "darkgreen",
    },
  }),
};

const plusSelectStyles = {
  control: (styles: any) => ({
    ...styles,
    borderColor: "violet",
    "&:hover": {
      borderColor: "darkviolet",
    },
  }),
};

function HistogramHeightControl({
  pm,
}: {
  pm: {
    minusHeight: Field<
      typeof QuantumBasis["properties"]["probability"]["properties"]["minusHeight"]
    >;
    plusHeight: Field<
      typeof QuantumBasis["properties"]["probability"]["properties"]["plusHeight"]
    >;
  };
}) {
  return (
    <Flex className="margin-top-1">
      <Select
        field={pm.minusHeight}
        choices={heightChoices}
        allowOther={false}
        placeholder="Height…"
        styles={minusSelectStyles}
      />

      <Select
        field={pm.plusHeight}
        choices={heightChoices}
        allowOther={false}
        placeholder="Height…"
        styles={plusSelectStyles}
      />
    </Flex>
  );
}

function HistogramLabelControl({
  pm,
}: {
  pm: {
    minusLabel: Field<
      typeof QuantumBasis["properties"]["probability"]["properties"]["minusLabel"]
    >;
    plusLabel: Field<
      typeof QuantumBasis["properties"]["probability"]["properties"]["plusLabel"]
    >;
  };
}) {
  return (
    <Flex className="margin-top-1">
      <Select
        field={pm.minusLabel}
        choices={labelChoices}
        allowOther={false}
        placeholder="Label…"
        styles={minusSelectStyles}
      />

      <Select
        field={pm.plusLabel}
        choices={labelChoices}
        allowOther={false}
        placeholder="Label…"
        styles={plusSelectStyles}
      />
    </Flex>
  );
}

const heightChoices = [
  { value: "3/5", label: <M t="3/5" /> },
  { value: "-3/5", label: <M t="-3/5" /> },
  { value: "4/5", label: <M t="4/5" /> },
  { value: "-4/5", label: <M t="-4/5" /> },
  { value: "9/25", label: <M t="9/25" /> },
  { value: "-9/25", label: <M t="-9/25" /> },
  { value: "16/25", label: <M t="16/25" /> },
  { value: "-16/25", label: <M t="-16/25" /> },
] as const;

const labelChoices = [
  { value: "|->", label: <M t="\ket{-}" /> },
  { value: "|+>", label: <M t="\ket{+}" /> },
  { value: "<-|psi_A>", label: <M t="\braket{-}{\psi_A}" /> },
  { value: "<+|psi_A>", label: <M t="\braket{+}{\psi_A}" /> },
  { value: "|<-|psi_A>|^2", label: <M t="|\braket{-}{\psi_A}|^2" /> },
  { value: "|<+|psi_A>|^2", label: <M t="|\braket{+}{\psi_A}|^2" /> },
] as const;

const meaningOfCoefficientsChoices = [
  { value: "normalized", label: "They tell you that the state is normalized." },
  {
    value: "measurement-outcomes",
    label: (
      <>
        They are the possible outcomes for measurements of spin along the{" "}
        <i>z</i>
        -direction.
      </>
    ),
  },
  {
    value: "probabilities-direct",
    label: (
      <>
        They are the probabilities for spin measurements along the <i>z</i>
        -direction.
      </>
    ),
  },
  {
    value: "probabilities-squared",
    label: (
      <>
        They give you the probabilities for spin measurements along the <i>z</i>
        -direction (once you square them).
      </>
    ),
  },
] as const;
