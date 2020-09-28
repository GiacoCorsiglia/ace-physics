import React from "react";
import { QuantumMouse } from "src/common/tutorials";
import { Continue, Prose, Section } from "src/components";
import {
  Decimal,
  DisableInputs,
  FieldGroup,
  Text,
  TextArea,
} from "src/components/inputs";
import { Content } from "src/components/layout";
import M from "src/components/M";
import Matrix from "src/components/Matrix";
import { isSet, useFields } from "src/state";
import { PretestReminderSection, PretestSpiel } from "src/tutorials/pretests";
import { Part, useNextPartLink } from "src/tutorials/shared";

export default function Pretest() {
  const { pretest, introCommit } = useFields(QuantumMouse);

  const {
    operatorLabel,
    eigenstateLabel,
    eigenvalueLabel,
    A0_0,
    A0_1,
    A1_0,
    A1_1,
    measureA,
    afterMeasureA,
  } = pretest.properties;

  const firstPartLink = useNextPartLink();

  return (
    <Part label="Before You Start">
      <Content>
        <DisableInputs when={introCommit.value === true}>
          <Section first>
            <PretestSpiel />

            <Prose>
              Consider the following two equations:
              <M
                display
                t="
                \begin{aligned}
                  \hat{A}\ket{a_1} &= 5 \text{eV}\ket{a_1} \\
                  \hat{A}\ket{a_2} &= -4 \text{eV}\ket{a_2}
                \end{aligned}
                "
              />
            </Prose>
          </Section>

          <Section noScroll>
            <Prose>
              Label every component of the expression{" "}
              <M t="\hat{A}\ket{a_1} = 5\ket{a_1}" />, with the appropriate
              quantum mechanical terms.
            </Prose>

            <FieldGroup grid className="margin-top">
              <Text
                field={operatorLabel}
                placeholder="Your label"
                label={
                  <>
                    <M t="\hat{A}" />
                    &nbsp;&nbsp;&nbsp;—
                  </>
                }
              />
              <Text
                field={eigenstateLabel}
                placeholder="Your label"
                label={
                  <>
                    <M t="\ket{a_1}" />
                    &nbsp;&nbsp;&nbsp;—
                  </>
                }
              />
              <Text
                field={eigenvalueLabel}
                placeholder="Your label"
                label={
                  <>
                    <M t="5" />
                    &nbsp;&nbsp;&nbsp;—
                  </>
                }
              />
            </FieldGroup>
          </Section>

          <PretestReminderSection />

          <Section noScroll>
            <Prose>
              Express <M t="\hat{A}" /> in matrix notation for the two-state
              system (in the orthonormal <M t="\ket{a_1}" />,
              <M t="\ket{a_2}" /> basis).
            </Prose>

            {/* Freeform! */}
            <Matrix
              className="margin-top"
              labelTex="\hat{A}"
              matrix={[
                [<Decimal field={A0_0} />, <Decimal field={A0_1} />],
                [<Decimal field={A1_0} />, <Decimal field={A1_1} />],
              ]}
            />
          </Section>

          <Section noScroll>
            <Prose>
              <p>
                Now consider the following expressions:
                <M
                  display
                  t="
                  \begin{aligned}
                    \ket{b_1} &= \frac{1}{\sqrt{3}}\ket{a_1} + \frac{\sqrt{2}}{\sqrt{3}}\ket{a_2} \\
                    \ket{b_2} &= \frac{\sqrt{2}}{\sqrt{3}}\ket{a_1} - \frac{1}{\sqrt{3}}\ket{a_2}
                  \end{aligned}
                  "
                />
                where <M t="\hat{B}\ket{b_1} = 2 \text{eV}\ket{b_1}" /> and
                <M t="\hat{B}\ket{b_2} = 7 \text{eV}\ket{b_2}" />.
              </p>

              <p>
                Starting with a particle in the state{" "}
                <M t="\ket{\psi} = \ket{b_1}" />…
              </p>
            </Prose>
          </Section>

          <Section noScroll>
            <TextArea
              field={measureA}
              label={
                <Prose>
                  …if you measure <M t="\hat{A}" />, what value(s) could you
                  obtain, with what probabilities?
                </Prose>
              }
            />
          </Section>

          <Section noScroll>
            {/* Multiple choice b1/b2/a1/a2/|a1>/... */}
            {/* Briefly comment on your answer */}
            <TextArea
              field={afterMeasureA}
              label={
                <Prose>
                  <strong>After the measurement</strong> of <M t="\hat{A}" />{" "}
                  above, you then measure <M t="\hat{B}" />. What value(s) could
                  you obtain?
                </Prose>
              }
            />
          </Section>
        </DisableInputs>

        <Section noScroll>
          <Continue
            link={firstPartLink!}
            allowed={isSet(pretest)}
            label="Submit and move on"
          />
        </Section>
      </Content>
    </Part>
  );
}
