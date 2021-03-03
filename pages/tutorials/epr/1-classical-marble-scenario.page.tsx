import { Answer, Prose } from "@/design";
import { Column, Columns } from "@/design/layout";
import { TextArea } from "@/inputs";
import { page } from "@/tutorial";
import React from "react";
import setup from "./setup";

export default page(setup, ({ section }) => ({
  name: "classicalMarbleScenario",
  label: "Classical Marble Scenario",
  answers: "provided",
  sections: [
    section({
      name: "marblesIntro",
      body: (
        <Prose>
          <p>Consider the following scenario:</p>

          <ul>
            <li>
              <strong>Red</strong> and <strong>blue</strong> marbles always come
              in pairs:
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
      ),
      continue: { label: "Got it" },
    }),

    section({
      name: "compareToEPR",
      body: (m) => (
        <>
          <Prose>
            Compare and contrast this scenario with that from the{" "}
            <em>Einstein–Podolsky–Rosen (EPR) experiment</em>.
          </Prose>

          <Columns>
            <Column>
              <TextArea
                model={m.sameAsEPR}
                minRows={4}
                label={
                  <Prose>
                    How is this marble scenario <strong>the same</strong> as the
                    EPR experiment?
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
                model={m.differentFromEPR}
                minRows={4}
                label={
                  <Prose>
                    How is this marble scenario <strong>different</strong> from
                    the EPR experiment?
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

          <Prose>
            <em>
              Don’t spend too long on this, just your first impressions. ONE
              important “same” and one “different” is fine!
            </em>
          </Prose>
        </>
      ),
    }),
  ],
}));
