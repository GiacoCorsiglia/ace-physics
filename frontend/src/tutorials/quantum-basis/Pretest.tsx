import React from "react";
import { QuantumBasis } from "src/common/tutorials";
import { Continue, Prose, Section } from "src/components";
import {
  Choice,
  DisableInputs,
  FieldGroup,
  TextArea,
  Toggle,
} from "src/components/inputs";
import { Content } from "src/components/layout";
import M from "src/components/M";
import { isSet, useFields } from "src/state";
import { PretestReminderSection, PretestSpiel } from "src/tutorials/pretests";
import { Part } from "src/tutorials/shared";

export default function Pretest() {
  const {
    pretest,
    pretestCommit,
    probabilityProjectionIntroCommit,
    definingBasisIntroCommit,
    changingBasisIntroCommit,
    relatingBasesIntroCommit,
  } = useFields(QuantumBasis);
  const f = pretest.properties;

  return (
    <Part label="Before You Start">
      <Content>
        <DisableInputs
          when={
            pretestCommit.value === true ||
            definingBasisIntroCommit.value === true ||
            probabilityProjectionIntroCommit.value === true ||
            changingBasisIntroCommit.value === true ||
            relatingBasesIntroCommit.value === true
          }
        >
          <Section first>
            <PretestSpiel />

            <Prose>
              Consider a spin-½ electron prepared in the state:
              <M
                display
                t="\ket{\psi} = \frac{1}{\sqrt{3}} \ket{+} + \frac{\sqrt{2}}{\sqrt{3}}\ket{-}"
              />
            </Prose>
          </Section>

          <Section noScroll>
            <TextArea
              field={f.meaningOfCoefficients}
              label={
                <Prose>
                  What do the coefficients in this expression (the{" "}
                  <M t="\frac{1}{\sqrt{3}}" /> and{" "}
                  <M t="\frac{\sqrt{2}}{\sqrt{3}}" />) tell you about the state?
                </Prose>
              }
            />
          </Section>

          <PretestReminderSection />

          <Section noScroll>
            <Choice
              field={f.coBExpression}
              choices={coBExpressionChoices}
              label={
                <Prose>
                  <p>
                    Which expression correctly converts <M t="\ket{\psi}" />{" "}
                    into the <i>x</i>-basis?
                  </p>

                  <p>
                    <M t="\ket{+}_x" /> and <M t="\ket{-}_x" /> refer to the
                    spin-up and spin-down states along the <i>x</i>-direction.
                  </p>

                  <p>Check ALL that apply.</p>
                </Prose>
              }
            />
          </Section>

          <Section noScroll>
            <Prose>
              <p>
                Recall{" "}
                <M t="\ket{\psi} = \frac{1}{\sqrt{3}} \ket{+} + \frac{\sqrt{2}}{\sqrt{3}}\ket{-}" />
                .
              </p>{" "}
              <p>Consider the following statements and choose true or false.</p>
            </Prose>

            <FieldGroup className="margin-top" grid="labelsRight">
              <Toggle
                field={f.changedProbabilities}
                label={
                  <>
                    By writing the state <M t="\ket{\psi}" /> in the <i>x</i>
                    -basis, we’ve changed the probabilities for measuring along
                    the <i>z</i>-direction.
                  </>
                }
                yes="True"
                no="False"
              />

              <Toggle
                field={f.cantKnowBothProbabilities}
                label={
                  <>
                    We can‘t know the probabilities for measurements along both
                    the <i>z</i>-direction and the <i>x</i>-direction at the
                    same time.
                  </>
                }
                yes="True"
                no="False"
              />

              <Toggle
                field={f.createdNewState}
                label={
                  <>
                    By representing the state <M t="\ket{\psi}" /> in the{" "}
                    <i>x</i>-basis, we’ve created a new quantum state.
                  </>
                }
                yes="True"
                no="False"
              />
            </FieldGroup>
          </Section>
        </DisableInputs>

        <Section noScroll>
          <Continue
            commit={pretestCommit}
            link="../defining-basis"
            allowed={isSet(pretest)}
            label="Submit and move on"
          />
        </Section>
      </Content>
    </Part>
  );
}

const coBExpressionChoices = [
  {
    value: "x-subscripts",
    label: (
      <M t="\frac{1}{\sqrt{3}} \ \ket{+}_x + \frac{\sqrt{2}}{\sqrt{3}} \ \ket{-}_x" />
    ),
  },
  {
    value: "projection (correct)",
    label: (
      <M t="{}_x \braket{+}{\psi} \ \ket{+}_x + {}_x \braket{-}{\psi} \ \ket{-}_x" />
    ),
  },
  {
    value: "probability coefficients",
    label: (
      <M t="\Big| {}_x \braket{+}{\psi} \Big|^2 \ket{+}_x + \Big| {}_x \braket{-}{\psi} \Big|^2 \ket{-}_x" />
    ),
  },
  {
    value: "x<+|+> coefficients",
    label: (
      <M t="{}_x \braket{+}{+} \ \ket{+}_x + {}_x \braket{-}{-} \ \ket{-}_x" />
    ),
  },
  {
    value: "just inner products",
    label: (
      <M t="\frac{1}{\sqrt{3}} \ {}_x \braket{+}{+} + \frac{\sqrt{2}}{\sqrt{3}} \ {}_x \braket{-}{-}" />
    ),
  },
] as const;
