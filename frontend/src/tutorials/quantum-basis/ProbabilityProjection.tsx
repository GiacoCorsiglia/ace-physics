import React from "react";
import { QuantumBasis } from "src/common/tutorials";
import { Continue, Prose, Section, Vocabulary } from "src/components";
import { Choice } from "src/components/inputs";
import { Content } from "src/components/layout";
import M from "src/components/M";
import { isSet, useFields } from "src/state";
import { Part } from "src/tutorials/shared";

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

        <Section commits={f.meaningOfCoefficientsCommit}>
          <Prose>Plot…</Prose>
        </Section>
      </Content>
    </Part>
  );
}

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
