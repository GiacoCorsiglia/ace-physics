import { isSet, isVisible, needsHelp, useFields } from "@/state";
import { QuantumMouse } from "common/tutorials";
import {
  Continue,
  Help,
  HelpButton,
  Prose,
  Reminder,
  Section,
} from "components";
import {
  Choice,
  Select,
  SelectChoices,
  TextArea,
  Toggle,
} from "components/inputs";
import { Content } from "components/layout";
import M from "components/M";
import { ContinueToNextPart, Part } from "tutorials/shared";

export default function MoreMeasurement() {
  const f = useFields(QuantumMouse);
  const {
    moreMeasurementsIntroCommit,

    moodStartCommit,
    moodStartState,
    moodStartAmbiguity,
    moodStartHelp,

    smallEyeProb,
    smallEyeProbExplain,
    smallEyeProbCommit,
    smallEyeProbHelp,

    smallEyeProbChallengeVisible,
    smallEyeProbChallengeCommit,

    finalMood,
    finalMoodCommit,

    surpriseResults,
    surpriseResultCommit,

    thinkingDeeperAgreement,
    thinkingDeeperExplain,
    thinkingDeeperCommit,
  } = f;

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
              <Prose>
                By “ambiguity,” we mean how certain or uncertain are we about
                the state. Your answer may be different for different operators.
              </Prose>
            </Help>
          )}

          {/* Ben added for the ambiguity above. Check to see if it makes sense. I also added some language because of the conversation yesterday */}
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
          {needsHelp(f.smallEyeProbHelp) && (
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
            <HelpButton help={smallEyeProbHelp} />
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
            isVisible(smallEyeProbChallengeVisible) &&
              smallEyeProbChallengeCommit,
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

          <TextArea
            field={finalMood}
            label={
              <Prose>
                Now, you measure mood once again. What do you get (with what
                probabilities)?
              </Prose>
            }
          />

          <Toggle
            field={f.finalMoodCanBeHappy}
            choices={finalMoodCanBeHappyChoices}
            label={
              <Prose>
                True or false: at this point, it’s possible to get a result of{" "}
                <M t="+1" /> for the mouse’s mood.
              </Prose>
            }
          />

          {needsHelp(f.finalMoodHelp) && (
            <Help>
              <Prose>
                Recall the equation for probability looks like:
                <M
                  display
                  t="|\braket{\text{something}}{\text{something else}}|^2"
                />
                Think about what state you‘re starting with at this point in the
                “chain.” The answer might surprise you!
              </Prose>
            </Help>
          )}

          <Continue
            commit={finalMoodCommit}
            allowed={isSet(finalMood) && isSet(f.finalMoodCanBeHappy)}
            label="Let’s check in"
            onClick={() => {
              if (f.finalMoodCanBeHappy.value?.selected !== "possible") {
                f.finalMoodOtherStudentsVisible.set(true);
              }
            }}
          >
            <HelpButton help={f.finalMoodHelp} />
          </Continue>
        </Section>

        <Section commits={[f.finalMoodCommit, f.finalMoodOtherStudentsVisible]}>
          <Prose>
            Above, you said that, after measuring <M t="\hat{S}" />, it would
            still be impossible to obtain a result of <M t="+1" /> for a
            measurement of “mood.” Let’s think about this some more.
          </Prose>

          <Choice
            field={f.finalMoodOtherStudents}
            choices={finalMoodOtherStudentsChoices}
            allowOther={false}
            label={
              <Prose>
                Consider two other students’ ideas. With whom do you agree more?
              </Prose>
            }
          />

          <Continue
            commit={f.finalMoodOtherStudentsCommit}
            allowed={isSet(f.finalMoodOtherStudents)}
            onClick={() => {
              if (
                f.finalMoodOtherStudents.value?.selected === "classical student"
              ) {
                f.finalMoodCorrectionVisible.set(true);
              }
            }}
          />
        </Section>

        <Section
          commits={[
            f.finalMoodOtherStudentsCommit,
            f.finalMoodCorrectionVisible,
          ]}
        >
          <Help>
            <Prose>
              <p>Actually, Student B is more on the right track.</p>

              <p>
                Measuring the mouse’s eye size destroys the information about
                it’s mood. After measuring eye size, we can no longer be certain
                that the mouse is “unhappy.” Eye size and mood are examples of
                “incompatible” quantum observables.
              </p>

              <p>It’s understandable if you find this unexpected!</p>
            </Prose>
          </Help>

          <Continue commit={f.finalMoodCorrectionCommit} />
        </Section>

        <Section
          commits={[
            f.finalMoodCommit,
            isVisible(f.finalMoodOtherStudentsVisible) &&
              f.finalMoodOtherStudentsCommit,
            isVisible(f.finalMoodCorrectionVisible) &&
              f.finalMoodCorrectionCommit,
          ]}
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

        <Section commits={[f.surpriseResultCommit]}>
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

          {needsHelp(f.thinkingDeeperHelp) && (
            <Help>
              <Prose>
                Consider the difference between a mixture and a superposition
                (check your notes or textbook). Which are we dealing with here?
              </Prose>
            </Help>
          )}

          <Continue
            commit={thinkingDeeperCommit}
            allowed={
              isSet(thinkingDeeperAgreement) && isSet(thinkingDeeperExplain)
            }
          >
            <HelpButton help={f.thinkingDeeperHelp} />
          </Continue>
        </Section>

        <Section commits={[f.thinkingDeeperCommit]}>
          <ContinueToNextPart commit={f.moreMeasurementsFinalCommit} />
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
  { value: "uncertain", label: "We can’t be certain." },
];

const smallEyeProbChoices: SelectChoices<QuantumMouse["smallEyeProb"]> = [
  { value: "0", label: <M t="0" /> },
  { value: "1/root5", label: <M t="1/\sqrt{5}" /> },
  { value: "1/5", label: <M t="1/5" /> },
  { value: "2/root5", label: <M t="2/ \sqrt{5}" /> },
  { value: "4/5", label: <M t="4/5" /> },
];

const finalMoodCanBeHappyChoices: SelectChoices<
  QuantumMouse["finalMoodCanBeHappy"]
> = [
  { value: "possible", label: "True, it is possible" },
  { value: "impossible", label: "False, it isn’t possible" },
];

const finalMoodOtherStudentsChoices: SelectChoices<
  QuantumMouse["finalMoodOtherStudents"]
> = [
  {
    value: "classical student",
    label: (
      <Prose noMargin>
        <strong>Student A:</strong>
        <br />
        <em>
          Before we measured eye size, we already knew the mouse was unhappy
          (because we got the <M t="-1" /> eigenvalue). Why would measuring its
          eye size affect the mouse’s mood? Even after we measure eye size, we
          know the mouse will still be unhappy!
        </em>
      </Prose>
    ),
  },
  {
    value: "quantum student",
    label: (
      <Prose noMargin>
        <strong>Student B:</strong>
        <br />
        <em>
          At first, we do know that the mouse is unhappy. But then we measure
          the mouse’s eye size. After we make that measurement, we now know it’s
          eye size for sure. But we can no longer be certain about the mood! Eye
          size and mood are incompatible.
        </em>
      </Prose>
    ),
  },
];
