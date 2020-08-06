import React from "react";
import { QuantumMouse } from "src/common/tutorials";
import { Continue, Prose, Reminder, Section } from "src/components";
import { Choice, Select, SelectChoices, TextArea } from "src/components/inputs";
import { Content } from "src/components/layout";
import M from "src/components/M";
import { useFields } from "src/state";
import { Part } from "src/tutorials/shared";

export default function MoreMeasurement() {
  const {
    moodStartCommit,
    smallEyeProbCommit,
    finalMoodCommit,
    surpriseResultCommit,
    thinkingDeeperCommit,
    moodStartAmbiguity,
    moodStartState,
    smallEyeProb,
    smallEyeProbExplain,
    finalMood,
    thinkingDeeper,
    surpriseResults,
  } = useFields(QuantumMouse);

  return (
    <Part label="More Measurements">
      <Content>
        <Section first>
          <Reminder>
            <Prose>
              <p>
                Small-eyed mice: &nbsp;{" "}
                <M t="\hat{S}\ket{\cdot} = 1 \ket{\cdot}" /> <br />
                Wide-eyed mice: &nbsp; <M t="\hat{S}\ket{*} = 2 \ket{*}" />{" "}
                <br />
                Happy mice: &nbsp; <M t="\hat{M}\ket{😸}=\ket{😸}" /> <br />
                Sad mice: &nbsp; <M t="\hat{M}\ket{😿}= -\ket{😿}" />
              </p>
              <M
                display
                t="\ket{\cdot} = \frac{2}{\sqrt{5}} \ket{😸} - \frac{1}{\sqrt{5}} \ket{😿}"
              />

              <M
                display
                t="\ket{*} = \frac{1}{\sqrt{5}} \ket{😸} + \frac{2}{\sqrt{5}} \ket{😿}"
              />
            </Prose>
          </Reminder>
          <Prose>
            <p>
              Suppose I gave you a quantum mouse. You measure <M t="\hat{M}" />{" "}
              and find the eigenvalue <M t="-1" />.
            </p>
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
                {" "}
                Is there any ambiguity about the state at this point?
              </Prose>
            }
          />
          {/*hint that discusses what we mean by ambiguity*/}

          <Continue commit={moodStartCommit} label="Move on" />
        </Section>

        <Section commits={[moodStartCommit]}>
          <Select
            field={smallEyeProb}
            choices={smallEyeProbChoices}
            label={
              <Prose>
                {" "}
                What is the probability that a subsequent measurement of{" "}
                <M t="\hat{S}" /> will yield a result of <M t="1" />
                mm, i.e., "small-eyed"? (
                <em>Work it out from the postulates of quantum mechanics!</em>)
              </Prose>
            }
          />
          {/*Hint would suggest that the postulates
          give a formula for probability and possible suggest drawing out the SG
          system. DEFINITELY hint at the flipping of the innerproduct as a subtle question and subsequent directly asking about it*/}
          <TextArea
            field={smallEyeProbExplain}
            label={<Prose>Explain your thoughts:</Prose>}
          />
          <Continue commit={smallEyeProbCommit} label="Move on" />
        </Section>

        <Section commits={[moodStartCommit, smallEyeProbCommit]}>
          <Prose>
            {" "}
            <p>
              Consider again the measurement and outcome “chain” given in the
              parts above:
            </p>
            <p>
              You first measured <M t="\hat{M}" />, and you happened to get{" "}
              <M t="-1" /> (This was an unhappy mouse).
            </p>
            <p>
              Then you measured <M t=" \hat{S}" /> and you happened to get{" "}
              <M t="1" /> mm.
            </p>
          </Prose>
          {/*I feel like I want this one to be openended/textbox. Or we need to
          make the optons: only one value vs multiple values*/}
          <TextArea
            field={finalMood}
            label={
              <Prose>
                Now, you measure mood once again. What do you get (with what
                probabilities?
              </Prose>
            }
          />
          <Continue commit={finalMoodCommit} label="Move on" />
        </Section>

        <Section
          commits={[moodStartCommit, smallEyeProbCommit, finalMoodCommit]}
        >
          <TextArea
            field={surpriseResults}
            label={
              <Prose>
                <p>
                  Think a bit about this chain of events – is there anything at
                  all curious or surprising about it (from a classical
                  perspective?)
                </p>
              </Prose>
            }
          />

          <Continue commit={surpriseResultCommit} label="Move on" />
        </Section>

        <Section
          commits={[
            moodStartCommit,
            smallEyeProbCommit,
            finalMoodCommit,
            surpriseResultCommit,
          ]}
        >
          <TextArea
            field={thinkingDeeper}
            label={
              <Prose>
                <p>Thinking deeper:</p>
                <p>
                  If I give you a quantum mouse whose eye-size has been
                  measured. Is it fair to say: “That mouse is either happy or
                  sad. It is definitely one or the other, I just don’t know
                  which, yet.”{" "}
                </p>
              </Prose>
            }
          />
          {/*I think this question should include some detailed
          thought from our end and may include a sentence or so from an expert
          perspective*/}

          <Continue commit={thinkingDeeperCommit} label="Move on" />
        </Section>
      </Content>
    </Part>
  );
}

const moodStartStateChoices: SelectChoices<QuantumMouse["moodStartState"]> = [
  { value: "small", label: <M t="\ket{\cdot}" /> },
  { value: "large", label: <M t="\ket{*}" /> },
  { value: "happy", label: <M t="\ket{😸}" /> },
  { value: "sad", label: <M t="\ket{😿}" /> },
  { value: "ambiguous", label: "It’s ambigous! We can’t be certain." },
];

const smallEyeProbChoices: SelectChoices<QuantumMouse["smallEyeProb"]> = [
  { value: "0", label: <M t="0" /> },
  { value: "1/root5", label: <M t="1/\sqrt{5}" /> },
  { value: "1/5", label: <M t="1/5" /> },
  { value: "2/root5", label: <M t="2/ \sqrt{5}" /> },
  { value: "4/5", label: <M t="4/5" /> },
];
