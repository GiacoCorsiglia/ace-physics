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
  Choice,
  Decimal,
  FieldGroup,
  Select,
  SelectChoices,
  TextArea,
  Toggle,
} from "src/components/inputs";
import { Content } from "src/components/layout";
import M from "src/components/M";
import { isSet, isVisible, needsHelp, useFields } from "src/state";
import { ContinueToNextPart, Part } from "src/tutorials/shared";
import { approxEquals } from "src/util";

export default function MeasuringEyeSize() {
  const f = useFields(QuantumMouse);

  const {
    measuringEyeSizeIntroCommit,
    collapsed1mmState,
    collapsed1mmStateCommit,
    collapsed1mmStateHelp,
    collapsed1mmStateHelp2,
    remeasure1mmResults,
    remeasure1mmState,
    remeasure1mmCommit,
    remeasure1mmHelp1,
    remeasure1mmHelp2,
    measureUnhappyProbability,
    measureUnhappyProbabilityHelp,
    measureUnhappyProbabilityExplain,
    measureUnhappyProbabilityCommit,
    smallEyedEmotion,
    smallEyedEmotionHelp,
    smallEyedEmotionCommit,
  } = f;

  return (
    <Part label="Measuring Eye Size">
      <Content>
        <Section first>
          <Reminder>
            <Prose>
              <p>
                Small-eyed mice: &nbsp;{" "}
                <M t="\hat{S}\ket{\smalleye} = 1 \ket{\smalleye}" /> <br />
                Wide-eyed mice: &nbsp;{" "}
                <M t="\hat{S}\ket{\wideye} = 2 \ket{\wideye}" /> <br />
                Happy mice: &nbsp; <M t="\hat{M}\ket{\smiley}=\ket{\smiley}" />
                <br />
                Sad mice: &nbsp;{" "}
                <M t="\hat{M}\ket{\frownie}= -\ket{\frownie}" />
              </p>

              <M
                display
                t="\ket{\smalleye} = \frac{2}{\sqrt{5}} \ket{\smiley} - \frac{1}{\sqrt{5}} \ket{\frownie}"
              />

              <M
                display
                t="\ket{\wideye} = \frac{1}{\sqrt{5}} \ket{\smiley} + \frac{2}{\sqrt{5}} \ket{\frownie}"
              />

              <p>
                Above is our answer for <M t="\ket{\smalleye}" /> in the “mood”
                basis. Yours might differ by a “global phase,” like by an
                overall minus sign.
              </p>
            </Prose>
          </Reminder>

          <Prose>
            Let’s see some consequences of the above assumptions! In this
            curious world,{" "}
            <strong>
              suppose I give you a mouse and you measure <M t="\hat{S}" /> and
              get eigenvalue <M t="1\text{mm}" />.
            </strong>
          </Prose>

          <Continue
            commit={measuringEyeSizeIntroCommit}
            label="Let’s explore!"
          />
        </Section>

        <Section commits={[measuringEyeSizeIntroCommit]}>
          <Choice
            field={collapsed1mmState}
            choices={collapsed1mmStateChoices}
            label={
              <Prose>
                What quantum state is the mouse in now,{" "}
                <em>after the measurement?</em>
              </Prose>
            }
          ></Choice>

          {needsHelp(collapsed1mmStateHelp) && (
            <Help>
              <Prose>
                Does it matter that you don’t know what state the mouse was in{" "}
                <em>before</em> the measurement?
              </Prose>
            </Help>
          )}

          {needsHelp(collapsed1mmStateHelp2) && (
            <Help>
              <Prose>
                Is there one state that you <em>know</em> describes a mouse with{" "}
                <M t="1\text{mm}" /> eyes 100% of the time?
              </Prose>
            </Help>
          )}

          <Continue
            commit={collapsed1mmStateCommit}
            allowed={isSet(collapsed1mmState)}
          >
            <HelpButton help={collapsed1mmStateHelp} />
            {needsHelp(collapsed1mmStateHelp) && (
              <HelpButton help={collapsed1mmStateHelp2}>
                A little more help?
              </HelpButton>
            )}
          </Continue>
        </Section>

        <Section
          commits={[measuringEyeSizeIntroCommit, collapsed1mmStateCommit]}
        >
          <TextArea
            field={remeasure1mmResults}
            label={
              <Prose>
                If you now re-measure <M t="\hat{S}" /> on this state, what
                result(s) can you get, with what probabilities?
              </Prose>
            }
          />

          <Select
            field={remeasure1mmState}
            choices={remeasure1mmStateChoices}
            label={
              <Prose>
                After this second measurement of <M t="\hat{S}" />, what state
                will you be in?
              </Prose>
            }
          />

          {/* For when they don't */}
          {needsHelp(remeasure1mmHelp1) && (
            <Help>
              <Prose>Take another look at the previous question.</Prose>
            </Help>
          )}

          {/* For when they have the previous question right(ish) */}
          {needsHelp(remeasure1mmHelp2) && (
            <Help>
              <Prose>
                Is there a difference between the scenario in this question and
                the previous one?
              </Prose>
            </Help>
          )}

          <Continue
            commit={remeasure1mmCommit}
            allowed={isSet(remeasure1mmResults) && isSet(remeasure1mmState)}
          >
            {isSet(collapsed1mmState) &&
              collapsed1mmState.value.selected !== "1mm" &&
              collapsed1mmState.value.selected !== "2mm" && (
                <HelpButton help={remeasure1mmHelp1} />
              )}

            {isSet(collapsed1mmState) &&
              (collapsed1mmState.value?.selected === "1mm" ||
                collapsed1mmState.value?.selected === "2mm") && (
                <HelpButton help={remeasure1mmHelp2} />
              )}
          </Continue>
        </Section>

        <Section
          commits={[
            measuringEyeSizeIntroCommit,
            collapsed1mmStateCommit,
            remeasure1mmCommit,
          ]}
        >
          <Prose>
            After you make the measurements you made above, what is the
            probability that a subsequent measurement of <M t="\hat{M}" /> will
            yield a result of <M t="-1" /> (the eigenvalue corresponding with
            “unhappy”)?
          </Prose>

          <FieldGroup grid className="margin-top">
            <Decimal
              field={measureUnhappyProbability}
              label="Probability:"
              placeholder="As a decimal"
            />

            <TextArea
              field={measureUnhappyProbabilityExplain}
              label="Explain:"
            />
          </FieldGroup>

          {needsHelp(measureUnhappyProbabilityHelp) && (
            <Help>
              <Prose>
                Think about what state the mouse is in when you measure measure{" "}
                <M t="\hat{M}" />. How can you write that state in terms of the
                eigenvectors of <M t="\hat{M}" />.{" "}
                <em>(Hint: see the reminder at the top of this page.) </em>
              </Prose>
            </Help>
          )}

          <Continue
            commit={measureUnhappyProbabilityCommit}
            allowed={isSet(measureUnhappyProbability)}
          >
            <HelpButton help={measureUnhappyProbabilityHelp} />
          </Continue>
        </Section>

        <Section
          commits={[
            measuringEyeSizeIntroCommit,
            collapsed1mmStateCommit,
            remeasure1mmCommit,
            measureUnhappyProbabilityCommit,
          ]}
        >
          <TextArea
            field={smallEyedEmotion}
            label={
              <Prose>
                We said before that “wide-eyed mice are rather stressed.” In
                this same spirit, how might you describe small-eyed mice?
              </Prose>
            }
          />

          {needsHelp(smallEyedEmotionHelp) && (
            <Help>
              <Prose>
                If you know (from above) that
                <M
                  display
                  t="\ket{\smalleye} = \frac{2}{\sqrt{5}} \ket{\smiley} - \frac{1}{\sqrt{5}} \ket{\frownie}"
                />
                what can you say about the likelihood that a small-eyed mouse
                will be happy? Or sad?
              </Prose>
            </Help>
          )}

          <Continue
            commit={smallEyedEmotionCommit}
            allowed={isSet(smallEyedEmotion)}
            label="Let’s check in"
            onClick={() => {
              if (f.collapsed1mmState.value?.selected !== "1mm") {
                f.collapsed1mmStateIncorrectVisible.set(true);
              }

              // We perform this check again below!
              if (
                f.collapsed1mmState.value?.selected !==
                f.remeasure1mmState.value?.selected
              ) {
                f.collapsedRemeasuredInconsistentVisible.set(true);
              }

              if (
                approxEquals(
                  f.measureUnhappyProbability.value,
                  1 / Math.sqrt(5)
                )
              ) {
                f.probabilityNotSquaredVisible.set(true);
              } else if (f.measureUnhappyProbability.value! < 0) {
                f.probabilityNegativeVisible.set(true);
              }
            }}
          >
            <HelpButton help={smallEyedEmotionHelp} />
          </Continue>
        </Section>

        <Section
          commits={[
            f.smallEyedEmotionCommit,
            f.collapsed1mmStateIncorrectVisible,
          ]}
        >
          <Help>
            <Prose>
              You may want to take another look the first question on this page.
            </Prose>
          </Help>

          <Continue
            commit={f.collapsed1mmStateIncorrectCommit}
            onClick={() => {
              // We perform this check above too!
              f.collapsedRemeasuredInconsistentVisible.set(
                f.collapsed1mmState.value?.selected !==
                  f.remeasure1mmState.value?.selected
              );
            }}
          />
        </Section>

        <Section
          commits={[
            f.smallEyedEmotionCommit,
            isVisible(f.collapsed1mmStateIncorrectVisible) &&
              f.collapsed1mmStateIncorrectCommit,
            f.collapsedRemeasuredInconsistentVisible,
          ]}
        >
          <Toggle
            field={f.collapsedRemeasuredEffect}
            choices={collapsedRemeasuredEffectChoices}
            label={
              <Prose>
                Do repeated measurements of the same observable affect the
                state? That is, if you measure <M t="\hat{M}" />, and then
                measure <M t="\hat{M}" /> again (without doing anything to the
                state in between), can you get a different result the second
                time?
              </Prose>
            }
          />

          <Prose>
            Make sure your answers to the first two questions on this page are
            consistent with your answer here!
          </Prose>

          <Continue
            commit={f.collapsedRemeasuredInconsistentCommit}
            allowed={isSet(f.collapsedRemeasuredEffect)}
          />
        </Section>

        <Section
          commits={[
            f.smallEyedEmotionCommit,
            isVisible(f.collapsed1mmStateIncorrectVisible) &&
              f.collapsed1mmStateIncorrectCommit,
            isVisible(f.collapsedRemeasuredInconsistentVisible) &&
              f.collapsedRemeasuredInconsistentCommit,
            f.probabilityNotSquaredVisible,
          ]}
        >
          <Help>
            <Prose>
              Don’t forget to square your result for the probability!
            </Prose>
          </Help>

          <Continue commit={f.probabilityNotSquaredCommit} />
        </Section>

        <Section
          commits={[
            f.smallEyedEmotionCommit,
            isVisible(f.collapsed1mmStateIncorrectVisible) &&
              f.collapsed1mmStateIncorrectCommit,
            isVisible(f.collapsedRemeasuredInconsistentVisible) &&
              f.collapsedRemeasuredInconsistentCommit,
            f.probabilityNegativeVisible,
          ]}
        >
          <Help>
            <Prose>Probability can’t be negative!</Prose>
          </Help>

          <Continue commit={f.probabilityNegativeCommit} />
        </Section>

        <Section
          commits={[
            f.smallEyedEmotionCommit,
            isVisible(f.collapsed1mmStateIncorrectVisible) &&
              f.collapsed1mmStateIncorrectCommit,
            isVisible(f.collapsedRemeasuredInconsistentVisible) &&
              f.collapsedRemeasuredInconsistentCommit,
            isVisible(f.probabilityNotSquaredVisible) &&
              f.probabilityNotSquaredCommit,
            isVisible(f.probabilityNegativeVisible) &&
              f.probabilityNegativeCommit,
          ]}
        >
          <ContinueToNextPart commit={f.measuringEyeSizeFinalCommit} />
        </Section>
      </Content>
    </Part>
  );
}

const collapsed1mmStateChoices: SelectChoices<
  QuantumMouse["collapsed1mmState"]
> = [
  { value: "1mm", label: <M t="\ket{\smalleye}" /> },
  { value: "2mm", label: <M t="\ket{\wideye}" /> },
  { value: "happy", label: <M t="\ket{\smiley}" /> },
  { value: "sad", label: <M t="\ket{\frownie}" /> },
  { value: "ambiguous", label: "It’s ambigous! We can’t be certain." },
];

const remeasure1mmStateChoices: SelectChoices<
  QuantumMouse["remeasure1mmState"]
> = [
  { value: "1mm", label: <M t="\ket{\smalleye}" /> },
  { value: "2mm", label: <M t="\ket{\wideye}" /> },
  { value: "happy", label: <M t="\ket{\smiley}" /> },
  { value: "sad", label: <M t="\ket{\frownie}" /> },
];

const collapsedRemeasuredEffectChoices: SelectChoices<
  QuantumMouse["collapsedRemeasuredEffect"]
> = [
  { value: "has effect", label: "Yes, it has an effect" },
  { value: "no effect", label: "No, you’ll definitely get the same result" },
];
