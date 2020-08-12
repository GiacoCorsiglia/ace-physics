import React from "react";
import { QuantumMouse } from "src/common/tutorials";
import {
  Continue,
  ContinueToNextPart,
  Help,
  HelpButton,
  Prose,
  Reminder,
  Section,
} from "src/components";
import {
  Choice,
  Decimal,
  FieldGroup,
  SelectChoices,
  TextArea,
  Toggle,
} from "src/components/inputs";
import { Content } from "src/components/layout";
import M from "src/components/M";
import { isSet, isVisible, needsHelp, useFields } from "src/state";
import { Part } from "src/tutorials/shared";
import { approxEquals, norm } from "src/util";

export default function Superpositions() {
  const f = useFields(QuantumMouse);

  const {
    superpositionsIntroCommit,
    whyWideStressed,
    whyWideStressedHelp,
    whyWideStressedCommit,
    smallEyeA,
    smallEyeB,
    smallEyeBasisChangeHelp,
    smallEyeBasisChangeCommit,
    abUnique,
    abUniqueHelp,
    abUniqueCommit,
  } = f;

  return (
    <Part label="Superpositions">
      <Content>
        <Section first>
          <Reminder>
            <Prose>
              Small-eyed mice: &nbsp;{" "}
              <M t="\hat{S}\ket{\smalleye} = 1 \ket{\smalleye}" /> <br />
              Wide-eyed mice: &nbsp;{" "}
              <M t="\hat{S}\ket{\wideye} = 2 \ket{\wideye}" /> <br />
              Happy mice: &nbsp; <M t="\hat{M}\ket{\smiley}=\ket{\smiley}" />
              <br />
              Sad mice: &nbsp; <M t="\hat{M}\ket{\frownie}= -\ket{\frownie}" />
            </Prose>
          </Reminder>

          <Prose>
            Suppose I now tell you:
            <M
              display
              t="\ket{\wideye} = \frac{1}{\sqrt{5}} \ket{\smiley} + \frac{2}{\sqrt{5}} \ket{\frownie}"
            />
          </Prose>

          <Continue commit={superpositionsIntroCommit} label="Got it" />
        </Section>

        <Section commits={[superpositionsIntroCommit]}>
          <TextArea
            label={
              <Prose>
                This suggests that wide-eyed mice are rather <em>stressed</em>.
                Briefly, why might I say that?
              </Prose>
            }
            field={whyWideStressed}
          />

          {needsHelp(whyWideStressedHelp) && (
            <Help>
              <Prose>
                Look at the equation above. If you asked a wide-eyed mouse (
                <M t="\ket{\wideye}" prespace={false} />) how they felt, which
                would you <em>probably</em> expect them to say: <em>happy</em>{" "}
                or <em>sad</em>?
              </Prose>
            </Help>
          )}

          <Continue
            commit={whyWideStressedCommit}
            allowed={isSet(whyWideStressed)}
          >
            <HelpButton help={whyWideStressedHelp} />
          </Continue>
        </Section>

        <Section commits={[superpositionsIntroCommit, whyWideStressedCommit]}>
          <Prose>
            <p>
              Use <em>orthonormality</em> and <em>completeness</em> to expand
              the <M t="S = 1 \text{mm}" /> eigenstate in the “mood basis.”
            </p>

            <p>
              That is, we’re asking you to find the numbers <M t="a" /> and{" "}
              <M t="b" /> so that{" "}
              <M t="\ket{\smalleye} = a \ket{\smiley} + b \ket{\frownie}" />.
            </p>
          </Prose>

          <FieldGroup grid className="margin-top">
            <Decimal label={<M t="a =" />} field={smallEyeA} />

            <Decimal label={<M t="b =" />} field={smallEyeB} />
          </FieldGroup>

          <Prose>(You can type them in as decimals.)</Prose>

          {needsHelp(smallEyeBasisChangeHelp) && (
            <Help>
              <Prose>
                <p>
                  <em>Orthonormality</em> and <em>completeness</em> tell you
                  that:
                  <M display t="\braket{\smalleye}{\smalleye} = 1" />
                  and
                  <M display t="\braket{\wideye}{\smalleye} = 0" />
                </p>
              </Prose>
            </Help>
          )}

          <Continue
            commit={smallEyeBasisChangeCommit}
            allowed={isSet(smallEyeA) && isSet(smallEyeB)}
          >
            <HelpButton help={smallEyeBasisChangeHelp} />
          </Continue>
        </Section>

        <Section
          commits={[
            superpositionsIntroCommit,
            whyWideStressedCommit,
            smallEyeBasisChangeCommit,
          ]}
        >
          <Toggle
            field={abUnique}
            choices={abUniqueChoices}
            label={
              <Prose>
                Is your answer for <M t="a" /> and <M t="b" /> unique?
              </Prose>
            }
          />

          <Prose>If not, does it matter?</Prose>

          {needsHelp(abUniqueHelp) && (
            <Help>
              <Prose>
                When we say <strong>unique</strong>, we’re asking whether the{" "}
                <M t="a" /> and <M t="b" /> you found are the only possible
                solution.
              </Prose>
            </Help>
          )}

          <Continue
            commit={abUniqueCommit}
            allowed={isSet(abUnique)}
            label="Let’s check in"
            onClick={() => {
              const a = 2 / Math.sqrt(5);
              const b = -1 / Math.sqrt(5);

              const isNormalized = approxEquals(
                norm(smallEyeA.value, smallEyeB.value),
                1
              );

              const rightRatio = approxEquals(
                a / b,
                (smallEyeA.value || NaN) / (smallEyeB.value || NaN)
              );

              if (isNormalized && rightRatio) {
                // a & b are correct!
                f.abAlternativeVisible.set(true);
              } else if (!isNormalized && rightRatio) {
                // a & b are not normalized.
                f.abNotNormalizedVisible.set(true);
              } else {
                // Something else is wrong.
                f.abIncorrectVisible.set(true);
              }
            }}
          >
            <HelpButton help={abUniqueHelp} />
          </Continue>
        </Section>

        <Section commits={[f.abUniqueCommit, f.abAlternativeVisible]}>
          <Choice
            field={f.abAlternative}
            choices={abAlternativeChoices}
            label={
              <Prose>
                Looks like you got:
                <M
                  display
                  t={`a = ${
                    f.smallEyeA.value! > 0 ? "+" : "-"
                  } \\frac{2}{\\sqrt{5}} \\text{ and } b = ${
                    f.smallEyeB.value! > 0 ? "+" : "-"
                  } \\frac{1}{\\sqrt{5}}`}
                />
                Are any of these options valid answers too? Check ALL that
                apply.
              </Prose>
            }
          />

          <Continue
            commit={f.abAlternativeCommit}
            allowed={isSet(f.abAlternative)}
          />
        </Section>

        <Section commits={[f.abUniqueCommit, f.abNotNormalizedVisible]}>
          <Help>
            <Prose>
              The state <M t="\ket{\smalleye}" /> is <em>normalized</em>, so
              your coefficients should satisfy
              <M display t="|a|^2 + |b|^2 = 1" />
              You may want to check up on that before moving on.
            </Prose>
          </Help>

          <Continue commit={f.abNotNormalizedCommit} />
        </Section>

        <Section commits={[f.abUniqueCommit, f.abIncorrectVisible]}>
          <Help>
            <Prose>
              You might want to check up on your coefficients <M t="a" /> and{" "}
              <M t="b" /> before moving on. You can double check the following
              relations:
              <M
                display
                t="\braket{\smalleye}{\smalleye} = |a|^2 + |b|^2 = 1"
              />
              and
              <M
                display
                t="\braket{\wideye}{\smalleye} = \left(\frac{1}{\sqrt{5}} \bra{\smiley} + \frac{2}{\sqrt{5}} \bra{\frownie}\right) \left(a \ket{\smiley} + b \ket{\frownie}\right) = 0"
              />
            </Prose>
          </Help>

          <Continue commit={f.abIncorrectCommit} />
        </Section>

        <Section
          commits={[
            f.abUniqueCommit,
            isVisible(f.abAlternativeVisible) && f.abAlternativeCommit,
            isVisible(f.abNotNormalizedVisible) && f.abNotNormalizedCommit,
            isVisible(f.abIncorrectVisible) && f.abIncorrectCommit,
          ]}
        >
          <ContinueToNextPart
            commit={f.superpositionsFinalCommit}
            link="../measuring-eye-size"
          />
        </Section>
      </Content>
    </Part>
  );
}

const abUniqueChoices: SelectChoices<QuantumMouse["abUnique"]> = [
  { value: "unique", label: "They’re unique" },
  {
    value: "not unique",
    label: (
      <>
        They’re <strong className="prose">not</strong> unique
      </>
    ),
  },
];

const abAlternativeChoices: SelectChoices<QuantumMouse["abAlternative"]> = [
  {
    value: "negative",
    label: (
      <M display t="\ket{\smalleye} = -a \ket{\smiley} -b \ket{\frownie}" />
    ),
  },
  {
    value: "i",
    label: (
      <M display t="\ket{\smalleye} = ai \ket{\smiley} + bi \ket{\frownie}" />
    ),
  },
  {
    value: "exp",
    label: (
      <M
        display
        t="\ket{\smalleye} = a \e^{i\pi/4} \ket{\smiley} + b \e^{i\pi/4} \ket{\frownie}"
      />
    ),
  },
  {
    value: "none",
    label: "NONE of the above",
  },
];
