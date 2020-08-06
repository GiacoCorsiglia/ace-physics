import React from "react";
import { QuantumMouse } from "src/common/tutorials";
import {
  Continue,
  Help,
  HelpButton,
  Prose,
  Reminder,
  Section,
} from "src/components";
import {
  Decimal,
  FieldGroup,
  SelectChoices,
  TextArea,
  Toggle,
} from "src/components/inputs";
import { Content } from "src/components/layout";
import M from "src/components/M";
import { isSet, needsHelp, useFields } from "src/state";
import { Part } from "src/tutorials/shared";

export default function Superpositions() {
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
  } = useFields(QuantumMouse);

  return (
    <Part label="Superpositions">
      <Content>
        <Section first>
          <Reminder>
            <Prose>
              Small-eyed mice: &nbsp;{" "}
              <M t="\hat{S}\ket{\cdot} = 1 \ket{\cdot}" /> <br />
              Wide-eyed mice: &nbsp; <M t="\hat{S}\ket{*} = 2 \ket{*}" /> <br />
              Happy mice: &nbsp; <M t="\hat{M}\ket{😸}=\ket{😸}" /> <br />
              Sad mice: &nbsp; <M t="\hat{M}\ket{😿}= -\ket{😿}" />
            </Prose>
          </Reminder>

          <Prose>
            Suppose I now tell you:
            <M
              display
              t="\ket{*} = \frac{1}{\sqrt{5}} \ket{😸} + \frac{2}{\sqrt{5}} \ket{😿}"
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
                <M t="\ket{*}" prespace={false} />) how they felt, which would
                you <em>probably</em> expect them to say: <em>happy</em> or{" "}
                <em>sad</em>?
              </Prose>
            </Help>
          )}

          <Continue
            commit={whyWideStressedCommit}
            allowed={isSet(whyWideStressed) && whyWideStressed.value.length > 5}
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
              <M t="\ket{\cdot} = a \ket{😸} + b \ket{😿}" />.
            </p>
          </Prose>

          <FieldGroup grid className="margin-top">
            <Decimal label={<M t="a =" />} field={smallEyeA} />

            <Decimal label={<M t="b =" />} field={smallEyeA} />
          </FieldGroup>

          <Prose>(You can type them in as decimals.)</Prose>

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

          <Continue commit={abUniqueCommit} allowed={isSet(abUnique)}>
            <HelpButton help={abUniqueHelp} />
          </Continue>
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
