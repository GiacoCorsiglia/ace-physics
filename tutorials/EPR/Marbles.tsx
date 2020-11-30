import { EPR } from "common/tutorials";
import {
  Answer,
  AnswerVisibility,
  Continue,
  Prose,
  RevealAnswersSection,
  Section,
} from "components";
import { TextArea } from "components/inputs";
import { Column, Columns, Content } from "components/layout";
import { isSet, useFields } from "services/state";
import { ContinueToNextPart, Part } from "tutorials/shared";

export default function Marbles() {
  const f = useFields(EPR);

  return (
    <Part label="Classical Marble Scenario">
      <AnswerVisibility field={f.marbleAnswers}>
        <Content>
          <Section first>
            <Prose>
              <p>Consider the following scenario:</p>

              <ul>
                <li>
                  <strong>Red</strong> and <strong>blue</strong> marbles always
                  come in pairs:
                  <ul>
                    <li>
                      1 <strong style={{ color: "red" }}>red</strong>
                    </li>
                    <li>
                      1 <strong style={{ color: "blue" }}>blue</strong>
                    </li>
                  </ul>
                </li>

                <li>
                  Each marble is placed in a box.
                  <ul>
                    <li>
                      One box is sent{" "}
                      <strong>
                        <em>left</em>
                      </strong>
                      .
                    </li>

                    <li>
                      One is sent{" "}
                      <strong>
                        <em>right</em>
                      </strong>
                      .
                    </li>
                  </ul>
                </li>

                <li>
                  To determine which direction each marble is sent, a coin is
                  flipped.
                  <ul>
                    <li>
                      Heads: <strong>red</strong> goes{" "}
                      <strong>
                        <em>left</em>
                      </strong>
                      .
                    </li>

                    <li>
                      Tails: <strong>red</strong> goes{" "}
                      <strong>
                        <em>right</em>
                      </strong>
                      .
                    </li>

                    <li>
                      Vice-versa for <strong>blue</strong>.
                    </li>
                  </ul>
                </li>
              </ul>
            </Prose>

            <Continue commit={f.marbleIntroCommit} label="Got it" />
          </Section>
        </Content>

        <Section commits={f.marbleIntroCommit}>
          <Content>
            <Prose>
              Compare and contrast this scenario with that from the{" "}
              <em>Einstein–Podolsky–Rosen (EPR) experiment</em>.
            </Prose>
          </Content>

          <Content columns>
            <Columns>
              <Column>
                <TextArea
                  field={f.sameAsEPR}
                  minRows={4}
                  label={
                    <Prose>
                      How is this marble scenario <strong>the same</strong> as
                      the EPR experiment?
                    </Prose>
                  }
                />

                <Answer>
                  <Prose>
                    <p>Similarities include:</p>

                    <ul>
                      <li>Random sequences. You don’t know till you look.</li>
                      <li>The results are 100% anticorrelated</li>
                    </ul>
                  </Prose>
                </Answer>
              </Column>

              <Column>
                <TextArea
                  field={f.differentFromEPR}
                  minRows={4}
                  label={
                    <Prose>
                      How is this marble scenario <strong>different</strong>{" "}
                      from the EPR experiment?
                    </Prose>
                  }
                />

                <Answer>
                  <Prose>
                    <p>Differences include:</p>
                    <ul>
                      <li>
                        The marble “knows” before I do (there is a hidden
                        variable!)
                      </li>
                      <li>
                        There is no orthogonal measurement that would “mess up”
                        color
                      </li>
                      <li>
                        There is no “spooky action at a distance” needed to
                        explain the anti-correlation.
                      </li>
                    </ul>
                  </Prose>
                </Answer>
              </Column>
            </Columns>
          </Content>

          <Content>
            <Prose>
              <em>
                Don’t spend too long on this, just your first impressions. ONE
                important “same” and one “different” is fine!
              </em>
            </Prose>

            <Continue
              commit={f.compareToEPRCommit}
              allowed={isSet(f.sameAsEPR) && isSet(f.differentFromEPR)}
            />
          </Content>
        </Section>

        <Content>
          <RevealAnswersSection
            commits={f.compareToEPRCommit}
            field={f.marbleAnswers}
          />

          <Section commits={f.marbleAnswers.properties.commit} noLabel>
            <ContinueToNextPart commit={f.marbleFinalCommit} />
          </Section>
        </Content>
      </AnswerVisibility>
    </Part>
  );
}
