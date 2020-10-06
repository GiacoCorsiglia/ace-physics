import React from "react";
import { EPR } from "src/common/tutorials";
import {
  AnswerVisibility,
  Continue,
  Prose,
  RevealAnswersSection,
  Section,
} from "src/components";
import { Choice } from "src/components/inputs";
import { choices } from "src/components/inputs/Select";
import { Content } from "src/components/layout";
import M from "src/components/M";
import { isSet, useFields } from "src/state";
import { ContinueToNextPart, Part, sectionComponents } from "../shared";

export default function InvestigatingCorrelation() {
  const f = useFields(EPR);

  return (
    <Part label="Investigating Correlation">
      <AnswerVisibility field={f.correlationAnswers}>
        <Content>
          {sections}

          <RevealAnswersSection
            commits={f.generalCommit}
            field={f.correlationAnswers}
          />

          <Section commits={f.correlationAnswers.properties.commit}>
            <ContinueToNextPart commit={f.correlationFinalCommit} />
          </Section>
        </Content>
      </AnswerVisibility>
    </Part>
  );
}

const sections = sectionComponents(EPR, [
  (f) => (
    <Section first>
      <Prose>
        <p>Here are some definitions for this page:</p>

        <ul>
          <li>“Measures a 0” means “spin down“</li>
          <li>“Measuring a 1” means “spin up”</li>
          <li>“SG” means “Stern-Gerlach device“</li>
        </ul>

        <p>
          As before, we have two observers and an entangled initial state—the
          same “anti-correlated Bell state” from the previous page. Using our
          new definitions, we can write the state like this:
          <M
            display
            t="\ket{\psi} = \frac{1}{\sqrt{2}}\bigl(\ket{1}_A\ket{0}_B - \ket{0}_A\ket{1}_B\bigr)"
          />
        </p>

        <p>
          Assume Alice and Bob (the two observers) always choose either X or Z
          SG orientations to measure.
        </p>
      </Prose>

      <Continue commit={f.correlationIntroCommit} label="Got it" />
    </Section>
  ),

  (f) => {
    const aliceSGChoices = choices(f.bX1A0, {
      X: "Alice must have an X oriented SG",
      Z: "Alice must have a Z oriented SG",
      either: "Alice can have either an X or Z oriented SG",
      none: "None of the above has to be true",
    });

    return (
      <>
        <Section commits={f.correlationIntroCommit}>
          <Choice
            field={f.bX1A0}
            label={
              <Prose>
                Bob uses an SG oriented along the X axis and measures a 1. If
                Alice measures a 0, which of the following is true?
              </Prose>
            }
            choices={aliceSGChoices}
            answer="either"
            explanation="No way to know with certainty from a single outcome."
          />

          <Continue commit={f.bX1A0Commit} allowed={isSet(f.bX1A0)} />
        </Section>

        <Section commits={f.bX1A0Commit}>
          <Choice
            field={f.bX1A1}
            label={
              <Prose>
                Bob uses an SG oriented along the X axis and measures a 1. If
                Alice measures a 1, which of the following is true?
              </Prose>
            }
            choices={aliceSGChoices}
            answer="Z"
            explanation="If it was X, she would HAVE to have measured 0, but she did not."
          />

          <Continue commit={f.bX1A1Commit} allowed={isSet(f.bX1A1)} />
        </Section>
      </>
    );
  },

  (f) => (
    <Section commits={f.bX1A1Commit}>
      <Choice
        field={f.aZ0B1Prob}
        label={
          <Prose>
            <p>
              If Alice uses a SG oriented along the Z axis and measures a 0,
              what is the likelihood that Bob measures a 1?
            </p>

            <p>
              Hint: Bob <em>randomly</em> (with 50/50 odds) orients his SG
              either along the X or Z axis.
            </p>
          </Prose>
        }
        choices={choices(f.aZ0B1Prob)}
        answer="75% certainty"
        explanation={
          <p>
            If Bob measures Z, the likelihood is 100%, but if he measures X,
            it’s 50%. Since the measurement he chooses is random, and thus each
            occurs half the time, the overall likelihood is
            <M t="100\% * ½ + 50\% * ½ = 75\%" />.
          </p>
        }
      />

      <Continue commit={f.aZ0B1ProbCommit} allowed={isSet(f.aZ0B1Prob)} />
    </Section>
  ),

  (f) => (
    <Section commits={f.aZ0B1ProbCommit}>
      <Choice
        field={f.aZ1B1Prob}
        label={
          <Prose>
            <p>
              If Alice uses a SG oriented along the Z axis and measures a 1,
              what is the likelihood that Bob measures a 1?
            </p>

            <p>
              Hint: Recall that Bob randomly orients his SG either along the X
              or Z axis.
            </p>
          </Prose>
        }
        choices={choices(f.aZ1B1Prob)}
        answer="25% certainty"
        explanation={
          <p>
            If Bob measures Z, the likelihood is 0%. If he measures X, it’s 50%.
            The overall likelihood is
            <M t="0\% * ½ + 50\% * ½ = 25\%" />.
          </p>
        }
      />

      <Continue commit={f.aZ1B1ProbCommit} allowed={isSet(f.aZ1B1Prob)} />
    </Section>
  ),

  (f) => {
    const bobMeasurementChoices = choices(f.aZbZ, {
      "0": "If Alice measures a 1, Bob MUST measure a 0",
      "1": "If Alice measures a 0, Bob MUST measure a 1",
      either: "If Alice measures a 1, Bob may measure either a 0 or a 1",
    });

    return (
      <>
        <Section commits={f.aZ1B1ProbCommit}>
          <Choice
            field={f.aZbZ}
            label={
              <Prose>
                If Bob and Alice both use SGs oriented along the Z axis, choose
                ALL statements that are true. (There may be more than one.)
              </Prose>
            }
            choices={bobMeasurementChoices}
            answer={["0", "1"]}
            explanation="Both are true.  They must measure opposites."
          />

          <Continue commit={f.aZbZCommit} allowed={isSet(f.aZbZ)} />
        </Section>

        <Section commits={f.aZbZCommit}>
          <Choice
            field={f.aZbX}
            label={
              <Prose>
                Bob uses an SG oriented along the X axis an Alice us an SG
                oriented along the Z axis. Choose ALL statements that are true.
                (There may be more than one.)
              </Prose>
            }
            choices={bobMeasurementChoices}
            answer={["either"]}
          />

          <Continue commit={f.aZbXCommit} allowed={isSet(f.aZbX)} />
        </Section>
      </>
    );
  },

  (f) => (
    <Section commits={f.aZbXCommit}>
      <Choice
        field={f.general}
        label={
          <Prose>
            Choose ALL statements that are <em>in general</em> correct.
          </Prose>
        }
        choices={choices(f.general, {
          "Bob 1":
            "If Bob measures a 1, he can always infer the result of Alice’s measurement",
          "Bob 0":
            "If Bob measures a 0, he can always infer the result of Alice’s measurement",
          "same direction":
            "If Alice and Bob both have their SGs oriented in the same direction and they know this, Bob should be able to infer the result of Alice's measurement",
        })}
        answer={["same direction"]}
        explanation={
          <p>
            This is the only option that is true <em>in general</em>.
          </p>
        }
      />

      <Continue commit={f.generalCommit} allowed={isSet(f.general)} />
    </Section>
  ),
]);
