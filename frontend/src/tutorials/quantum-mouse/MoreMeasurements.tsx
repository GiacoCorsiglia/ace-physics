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
  Select,
  SelectChoices,
  TextArea,
  Toggle,
} from "src/components/inputs";
import { Content } from "src/components/layout";
import M from "src/components/M";
import { isSet, needsHelp, useFields } from "src/state";
import { Part } from "src/tutorials/shared";

export default function MoreMeasurement() {
  const {
    moreMeasurementsIntroCommit,

    moodStartCommit,
    moodStartState,
    moodStartAmbiguity,
    moodStartHelp,

    smallEyeProb,
    smallEyeProbExplain,
    smallEyeProbCommit,
    smallEyePropHelp,

    smallEyeProbChallengeVisible,
    smallEyeProbChallengeCommit,

    finalMood,
    finalMoodCommit,

    surpriseResults,
    surpriseResultCommit,

    thinkingDeeperAgreement,
    thinkingDeeperExplain,
    thinkingDeeperCommit,
  } = useFields(QuantumMouse);

  return (
    <Part label="More Measurements">
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
            </Prose>
          </Reminder>

          <Prose>
            <p>
              Suppose I gave you a quantum mouse. Obviously, you decide to keep
              it as a pet! You want to know how it’s feeling, so you measure{" "}
              <M t="\hat{M}" />…
            </p>
          </Prose>

          <Continue
            commit={moreMeasurementsIntroCommit}
            label={
              <>
                Measure <M t="\hat{M}" />
              </>
            }
          />
        </Section>

        <Section commits={[moreMeasurementsIntroCommit]}>
          <Prose>
            You find the eigenvalue <M t="-1" />.
          </Prose>

          <Choice
            field={moodStartState}
            choices={moodStartStateChoices}
            label={
              <Prose>
                What state describes the mouse after this measurement?
              </Prose>
            }
          />

          <TextArea
            field={moodStartAmbiguity}
            label={
              <Prose>
                Is there any ambiguity about the state at this point? Explain.
              </Prose>
            }
          />

          {needsHelp(moodStartHelp) && (
            <Help>
              <Prose>By “ambiguity,” we mean … TODO</Prose>
            </Help>
          )}

          <Continue
            commit={moodStartCommit}
            allowed={isSet(moodStartState) && isSet(moodStartAmbiguity)}
          >
            <HelpButton help={moodStartHelp}>Ambiguity?</HelpButton>
          </Continue>
        </Section>

        <Section commits={[moodStartCommit]}>
          <Select
            field={smallEyeProb}
            choices={smallEyeProbChoices}
            label={
              <Prose>
                What is the probability that a subsequent measurement of{" "}
                <M t="\hat{S}" /> will yield a result of <M t="1" />
                mm, i.e., "small-eyed"? (
                <em>
                  Work it out on scrap paper from the postulates of quantum
                  mechanics!
                </em>
                )
              </Prose>
            }
          />

          <TextArea
            field={smallEyeProbExplain}
            label={<Prose>Explain your thoughts:</Prose>}
          />

          {/*Hint would suggest that the postulates
          give a formula for probability and possible suggest drawing out the SG
          system. DEFINITELY hint at the flipping of the innerproduct as a subtle question and subsequent directly asking about it*/}
          {needsHelp(smallEyePropHelp) && (
            <Help>
              <Prose>
                There’s a formula you can find to calculate this probability.
                You’ll need to know the state the mouse is in at the start of
                the measurement, and the state that corresponds with{" "}
                <M t="\hat{S} = 1" />. It looks like:
                <M t="|\braket{\text{something}}{\text{something else}}|^2" />
              </Prose>
            </Help>
          )}

          <Continue
            commit={smallEyeProbCommit}
            onClick={() => {
              if (smallEyeProb.value?.selected === "1/5") {
                smallEyeProbChallengeVisible.set(true);
              }
            }}
            allowed={isSet(smallEyeProb) && isSet(smallEyeProbExplain)}
          >
            <HelpButton help={smallEyePropHelp} />
          </Continue>
        </Section>

        <Section commits={[smallEyeProbCommit, smallEyeProbChallengeVisible]}>
          <Prose>
            <strong>Something to think about:</strong> what happens if you
            reverse the inner product you used in the formula from the previous
            question? (That is, if you switch the bra and the ket in the
            “braket.”)
          </Prose>

          <Continue commit={smallEyeProbChallengeCommit}></Continue>
        </Section>

        <Section
          commits={[
            smallEyeProbCommit,
            smallEyeProbChallengeVisible.value && smallEyeProbChallengeCommit,
          ]}
        >
          <Prose>
            <p>
              Consider the measurement and outcome “chain” given in the parts
              above:
            </p>

            <ol>
              <li>
                You measured <M t="\hat{M}" />, and you happened to get{" "}
                <M t="-1" />. (This was an unhappy mouse).
              </li>

              <li>
                Then you measured <M t=" \hat{S}" /> and you happened to get{" "}
                <M t="1\text{mm}" />.
              </li>
            </ol>
          </Prose>
          {/*I feel like I want this one to be openended/textbox. Or we need to
          make the optons: only one value vs multiple values*/}
          <TextArea
            field={finalMood}
            label={
              <Prose>
                Now, you measure mood once again. What do you get (with what
                probabilities)?
              </Prose>
            }
          />
          <Continue commit={finalMoodCommit} allowed={isSet(finalMood)} />
        </Section>

        <Section
          commits={[moodStartCommit, smallEyeProbCommit, finalMoodCommit]}
        >
          <TextArea
            field={surpriseResults}
            label={
              <Prose>
                <p>
                  Think a bit about this chain of events—is there anything at
                  all curious or surprising about it (from a classical
                  perspective)?
                </p>
              </Prose>
            }
          />

          <Continue
            commit={surpriseResultCommit}
            allowed={isSet(surpriseResults)}
          />
        </Section>

        <Section
          commits={[
            moodStartCommit,
            smallEyeProbCommit,
            finalMoodCommit,
            surpriseResultCommit,
          ]}
        >
          <Prose>
            <p>
              <strong>Thinking deeper:</strong>
            </p>

            <p>
              Your friend gives you a quantum mouse whose eye-size has been
              measured. Your friend says:
            </p>

            <blockquote>
              “That mouse is either happy or sad. It is definitely one or the
              other, I just don’t know which, yet.”
            </blockquote>
          </Prose>

          <Toggle
            field={thinkingDeeperAgreement}
            yes="I agree"
            no="I disagree"
            label={<Prose>Do you agree with your friend’s statement?</Prose>}
          />

          <TextArea
            field={thinkingDeeperExplain}
            label={<Prose>Why or why not?</Prose>}
          />

          {/*I think this question should include some detailed
          thought from our end and may include a sentence or so from an expert
          perspective*/}

          <Continue
            commit={thinkingDeeperCommit}
            allowed={
              isSet(thinkingDeeperAgreement) && isSet(thinkingDeeperExplain)
            }
          />
        </Section>
      </Content>
    </Part>
  );
}

const moodStartStateChoices: SelectChoices<QuantumMouse["moodStartState"]> = [
  { value: "small", label: <M t="\ket{\smalleye}" /> },
  { value: "large", label: <M t="\ket{\wideye}" /> },
  { value: "happy", label: <M t="\ket{\smiley}" /> },
  { value: "sad", label: <M t="\ket{\frownie}" /> },
  { value: "ambiguous", label: "It’s ambiguous! We can’t be certain." },
];

const smallEyeProbChoices: SelectChoices<QuantumMouse["smallEyeProb"]> = [
  { value: "0", label: <M t="0" /> },
  { value: "1/root5", label: <M t="1/\sqrt{5}" /> },
  { value: "1/5", label: <M t="1/5" /> },
  { value: "2/root5", label: <M t="2/ \sqrt{5}" /> },
  { value: "4/5", label: <M t="4/5" /> },
];
