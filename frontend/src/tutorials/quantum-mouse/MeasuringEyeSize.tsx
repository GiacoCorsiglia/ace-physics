import React from "react";
import { QuantumMouse } from "src/common/tutorials";
import { Continue, HelpButton, Prose, Reminder, Section } from "src/components";
import {
  Choice,
  Decimal,
  FieldGroup,
  Select,
  SelectChoices,
  TextArea,
} from "src/components/inputs";
import { Content } from "src/components/layout";
import M from "src/components/M";
import { isSet, needsHelp, useField } from "src/state";
import { Part } from "src/tutorials/shared";

export default function MeasuringEyeSize() {
  const measuringEyeSizeIntroCommit = useField(
    QuantumMouse,
    "measuringEyeSizeIntroCommit"
  );
  const collapsed1mmState = useField(QuantumMouse, "collapsed1mmState");
  const collapsed1mmStateCommit = useField(
    QuantumMouse,
    "collapsed1mmStateCommit"
  );
  const collapsed1mmStateHelp = useField(QuantumMouse, "collapsed1mmStateHelp");
  const collapsed1mmStateHelp2 = useField(
    QuantumMouse,
    "collapsed1mmStateHelp2"
  );
  const remeasure1mmResults = useField(QuantumMouse, "remeasure1mmResults");
  const remeasure1mmState = useField(QuantumMouse, "remeasure1mmState");
  const remeasure1mmCommit = useField(QuantumMouse, "remeasure1mmCommit");
  const remeasure1mmHelp = useField(QuantumMouse, "remeasure1mmHelp");

  const measureUnhappyProbability = useField(
    QuantumMouse,
    "measureUnhappyProbability"
  );
  const measureUnhappyProbabilityHelp = useField(
    QuantumMouse,
    "measureUnhappyProbabilityHelp"
  );
  const measureUnhappyProbabilityExplain = useField(
    QuantumMouse,
    "measureUnhappyProbabilityExplain"
  );
  const measureUnhappyProbabilityCommit = useField(
    QuantumMouse,
    "measureUnhappyProbabilityCommit"
  );

  const smallEyedEmotion = useField(QuantumMouse, "smallEyedEmotion");
  const smallEyedEmotionHelp = useField(QuantumMouse, "smallEyedEmotionHelp");
  const smallEyedEmotionCommit = useField(
    QuantumMouse,
    "smallEyedEmotionCommit"
  );

  return (
    <Part label="Measuring Eye Size">
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

              <p>(THIS IS THE ANSWER TO THE PREVIOUS PART:)</p>

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
            <Prose>
              Does it matter that you don't know what state the mouse was in{" "}
              <em>before</em> the measurement?
            </Prose>
          )}

          {needsHelp(collapsed1mmStateHelp2) && (
            <Prose>
              Is there one state that you <em>know</em> describes a mouse with{" "}
              <M t="1\text{mm}" /> eyes 100% of the time?
            </Prose>
          )}

          <Continue
            commit={collapsed1mmStateCommit}
            label="Move on"
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

          <Continue
            commit={remeasure1mmCommit}
            label="Move on"
            allowed={isSet(remeasure1mmResults) && isSet(remeasure1mmState)}
          >
            <HelpButton help={remeasure1mmHelp} />
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
            yield a result of <M t="-1" />, i.e., “unhappy”?
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
            <Prose>
              Think about what state the mouse is in when you measure measure{" "}
              <M t="\hat{M}" />. How can you write that state in terms of the
              eigenvectors of <M t="\hat{M}" />.{" "}
              <em>(Hint: see the reminder at the top of this page.) </em>
            </Prose>
          )}

          <Continue commit={measureUnhappyProbabilityCommit} label="Move on">
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

          <Continue commit={smallEyedEmotionCommit} label="Move on">
            <HelpButton help={smallEyedEmotionHelp} />
          </Continue>
        </Section>
      </Content>
    </Part>
  );
}

const collapsed1mmStateChoices: SelectChoices<
  QuantumMouse["collapsed1mmState"]
> = [
  { value: "1mm", label: <M t="\ket{\cdot}" /> },
  { value: "2mm", label: <M t="\ket{*}" /> },
  { value: "happy", label: <M t="\ket{😸}" /> },
  { value: "sad", label: <M t="\ket{😿}" /> },
  { value: "ambiguous", label: "It’s ambigous! We can’t be certain." },
];

const remeasure1mmStateChoices: SelectChoices<
  QuantumMouse["remeasure1mmState"]
> = [
  { value: "1mm", label: <M t="\ket{\cdot}" /> },
  { value: "2mm", label: <M t="\ket{*}" /> },
  { value: "happy", label: <M t="\ket{😸}" /> },
  { value: "sad", label: <M t="\ket{😿}" /> },
];
