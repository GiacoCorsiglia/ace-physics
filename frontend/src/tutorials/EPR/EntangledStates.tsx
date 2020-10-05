import React from "react";
import { EPR } from "src/common/tutorials";
import {
  Answer,
  AnswerVisibility,
  Continue,
  Prose,
  RevealAnswersSection,
  Section,
} from "src/components";
import { Choice, TextArea } from "src/components/inputs";
import { choices } from "src/components/inputs/Select";
import { Content } from "src/components/layout";
import M from "src/components/M";
import { isSet, useFields } from "src/state";
import { ContinueToNextPart, Part } from "../shared";
import { ReactComponent as Diagram } from "./svgs/entangled-states.svg";

export default function EntangledStates() {
  const f = useFields(EPR);

  return (
    <Part label="Entangled States">
      <AnswerVisibility field={f.entangledAnswers}>
        <Content>
          <Section first>
            <Diagram className="svg-img" />

            <Prose>
              <p>
                Suppose we have two entangled spin-½ particles (A and B)
                described in the <em>Z</em>-basis by the state:
                <M
                  display
                  t="
                \ket{\psi} = \frac{1}{\sqrt{2}}
                \bigl( \ket{\uparrow_A}\ket{\downarrow_B} - \ket{\downarrow_A}\ket{\uparrow_B} \bigr)
                "
                />
              </p>

              <p>
                It can be shown that this entangled state is equivalent to:
                <M
                  display
                  t="
                \ket{\psi} = \frac{1}{\sqrt{2}}
                \bigl( \ket{\uparrow_A}_X\ket{\downarrow_B}_X - \ket{\downarrow_A}_X\ket{\uparrow_B}_X \bigr)
                "
                />
              </p>

              <p>
                <em>
                  This can be done given the usual relations
                  <M t="\ket{\uparrow_A}_Z = \frac{1}{\sqrt{2}} ( \ket{\uparrow_A}_X + \ket{\downarrow_A}_X )" />
                  , and{" "}
                  <M t="\ket{\downarrow_A}_Z = \frac{1}{\sqrt{2}} ( \ket{\uparrow_A}_X - \ket{\downarrow_A}_X )" />
                  .
                </em>
              </p>
            </Prose>

            <Continue commit={f.entangledIntroCommit} label="Got it" />
          </Section>

          <Section commits={f.entangledIntroCommit}>
            <Prose>
              Particle A’s <em>Z</em>-spin is measured and yields{" "}
              <M t="+\hbar/2" />. That is, the spin state of A is found to be{" "}
              <M t="\ket{\uparrow_A}_Z" />.
            </Prose>

            <Choice
              field={f.bStateAfterMeasureA}
              label={
                <Prose>
                  Which of the following is a good prediction for particle B’s
                  spin state after Particle A’s measurement?
                </Prose>
              }
              choices={choices(f.bStateAfterMeasureA, {
                "|up_B>X": <M t="\ket{\uparrow_B}_X" />,
                "|down_B>X": <M t="\ket{\downarrow_B}_X" />,
                "|up_B>Z": <M t="\ket{\uparrow_B}_Z" />,
                "|down_B>Z": <M t="\ket{\downarrow_B}_Z" />,
                "cannot predict":
                  "We cannot predict Particle B’s spin state from the knowledge of particle A’s spin state, even if the chosen basis is the same.",
              })}
              answer="|down_B>Z"
              explanation="Because we collapsed the state to this."
            />

            <TextArea
              field={f.bStateAfterMeasureAExplain}
              label={<Prose>Discuss how you made this prediction:</Prose>}
            />

            <Continue
              commit={f.bStateAfterMeasureACommit}
              allowed={
                isSet(f.bStateAfterMeasureA) &&
                isSet(f.bStateAfterMeasureAExplain)
              }
            />
          </Section>

          <Section commits={f.bStateAfterMeasureACommit}>
            <Prose>
              Particle A’s <em>Z</em>-spin is measured and yields spin up.
            </Prose>

            <Choice
              field={f.bUpLikelihood}
              label={
                <Prose>
                  What is the likelihood of finding particle B’s spin state in
                  the X-basis as <M t="\ket{\uparrow_B}_X" />? (In other words,
                  what is the probability that a measurement of <em>X</em>-spin
                  for particle B yields “up”?)
                </Prose>
              }
              choices={choices(f.bUpLikelihood)}
              answer="50%"
              explanation="Because B is in the z-down state, which yields 50% chance of X up."
            />

            <TextArea
              field={f.bUpLikelihoodExplain}
              label={<Prose>Discuss how you found this likelihood:</Prose>}
            />

            <Continue
              commit={f.bUpLikelihoodCommit}
              allowed={isSet(f.bUpLikelihood) && isSet(f.bUpLikelihoodExplain)}
            />
          </Section>

          <Section commits={f.bUpLikelihoodCommit}>
            <Prose>
              <M t="N=1000" /> of these entangled pairs are sent out. Each pair
              constitutes an “event.”
            </Prose>

            <TextArea
              field={f.howOftenAliceBobSpinUp}
              label={
                <Prose>
                  If Alice and Bob both measure <M t="S_z" />, how often does
                  Alice measure spin up? How about Bob?
                </Prose>
              }
            />

            <Answer>
              <Prose>500 each (on average)</Prose>
            </Answer>

            <Continue
              commit={f.howOftenAliceBobSpinUpCommit}
              allowed={isSet(f.howOftenAliceBobSpinUp)}
            />
          </Section>

          <Section commits={f.howOftenAliceBobSpinUpCommit}>
            <TextArea
              field={f.howOftenAliceBobSame}
              label={
                <Prose>
                  How often do Alice and Bob both measure the SAME result (up or
                  down) for a given event?
                </Prose>
              }
            />

            <Answer>
              <Prose>Never</Prose>
            </Answer>

            <Continue
              commit={f.howOftenAliceBobSameCommit}
              allowed={isSet(f.howOftenAliceBobSame)}
            />
          </Section>

          <Section commits={f.howOftenAliceBobSameCommit}>
            <TextArea
              field={f.howOftenAliceSzBobSxSame}
              label={
                <Prose>
                  If Alice measures <M t="S_z" /> and Bob measures <M t="S_x" />
                  , how often do Alice and Bob both measure the SAME result (up
                  or down) for a given event?
                </Prose>
              }
            />

            <Answer>
              <Prose>500 times (half)</Prose>
            </Answer>

            <Continue
              commit={f.howOftenAliceSzBobSxSameCommit}
              allowed={isSet(f.howOftenAliceSzBobSxSame)}
            />
          </Section>

          <Section commits={f.howOftenAliceSzBobSxSameCommit}>
            <TextArea
              field={f.causality}
              label={
                <Prose>
                  In any scenario above, are Alice’s measurements “causing”
                  Bob’s? That is, can she send him a message instantly, using
                  these spins? (If so—is special relativity violated here? If
                  not—why not?)
                </Prose>
              }
            />

            <Answer>
              <Prose>No they are not; no she cannot.</Prose>
            </Answer>

            <Continue commit={f.causalityCommit} allowed={isSet(f.causality)} />
          </Section>

          <RevealAnswersSection
            commits={f.causalityCommit}
            field={f.entangledAnswers}
          />

          <Section commits={f.entangledAnswers.properties.commit}>
            <ContinueToNextPart commit={f.entangledFinalCommit} />
          </Section>
        </Content>
      </AnswerVisibility>
    </Part>
  );
}
