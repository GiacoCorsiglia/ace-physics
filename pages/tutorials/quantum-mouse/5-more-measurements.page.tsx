import { Help, Prose, Reminder } from "@/design";
import { ChooseOne, Select, TextArea, Toggle } from "@/inputs";
import M from "@/math/M";
import { page } from "@/tutorial";
import React from "react";
import setup from "./setup";

export default page(setup, ({ section, sequence, hint }) => ({
  name: "more-measurements",
  label: "More Measurements",
  answers: "checked-some",
  sections: [
    section({
      name: "moreMeasurementsIntro",
      body: (
        <>
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
        </>
      ),
      continue: {
        label: (
          <>
            Measure <M t="\hat{M}" />{" "}
          </>
        ),
      },
    }),

    section({
      name: "moodStart",
      body: (m) => (
        <>
          <Prose>
            You find the eigenvalue <M t="-1" />.
          </Prose>

          <ChooseOne
            model={m.moodStartState}
            choices={[
              ["small", <M t="\ket{\smalleye}" />],
              ["large", <M t="\ket{\wideye}" />],
              ["happy", <M t="\ket{\smiley}" />],
              ["sad", <M t="\ket{\frownie}" />],
              ["uncertain", "We can’t be certain."],
            ]}
            label={
              <Prose>
                What state describes the mouse after this measurement?
              </Prose>
            }
          />

          <TextArea
            model={m.moodStartAmbiguity}
            label={
              <Prose>
                Is there any ambiguity about the state at this point? Explain.
              </Prose>
            }
          />
        </>
      ),
      hints: [
        hint({
          name: "moodStart",
          label: "Ambiguity?",
          body: (
            <Prose>
              By “ambiguity,” we mean how certain or uncertain are we about the
              state.
            </Prose>
          ),
        }),
      ],
    }),

    section({
      name: "smallEyeProb",
      body: (m) => (
        <>
          <Select
            model={m.smallEyeProb}
            choices={[
              ["0", <M t="0" />],
              ["1/root5", <M t="1/\sqrt{5}" />],
              ["1/5", <M t="1/5" />],
              ["2/root5", <M t="2/ \sqrt{5}" />],
              ["4/5", <M t="4/5" />],
            ]}
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
            model={m.smallEyeProbExplain}
            label={<Prose>Explain your thoughts:</Prose>}
          />
        </>
      ),
      hints: [
        hint({
          name: "smallEyeProb",
          body: (
            <Prose>
              There’s a formula you can find to calculate this probability.
              You’ll need to know the state the mouse is in at the start of the
              measurement, and the state that corresponds with{" "}
              <M t="\hat{S} = 1" />. It looks like:
              <M t="|\braket{\text{something}|\text{something else}}|^2" />
            </Prose>
          ),
        }),
      ],
    }),

    section({
      name: "smallEyeProbChallenge",
      when: (r) => r.smallEyeProb?.selected === "1/5",
      body: (
        <Prose>
          <strong>Something to think about:</strong> what happens if you reverse
          the inner product you used in the formula from the previous question?
          (That is, if you switch the bra and the ket in the “braket.”)
        </Prose>
      ),
    }),

    section({
      name: "finalMood",
      body: (m) => (
        <>
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
            model={m.finalMood}
            label={
              <Prose>
                Now, you measure mood once again. What do you get (with what
                probabilities)?
              </Prose>
            }
          />

          <Toggle
            model={m.finalMoodCanBeHappy}
            choices={[
              ["possible", "True, it is possible"],
              ["impossible", "False, it isn’t possible"],
            ]}
            label={
              <Prose>
                True or false: at this point, it’s possible to get a result of{" "}
                <M t="+1" /> for the mouse’s mood.
              </Prose>
            }
          />
        </>
      ),
      hints: [
        hint({
          name: "finalMood",
          body: (
            <Prose>
              Recall the equation for probability looks like:
              <M
                display
                t="|\braket{\text{something}|\text{something else}}|^2"
              />
              Think about what state you‘re starting with at this point in the
              “chain.” The answer might surprise you!
            </Prose>
          ),
        }),
      ],
      continue: { label: "Let’s check in" },
    }),

    sequence({
      when: (r) => r.finalMoodCanBeHappy?.selected !== "possible",
      sections: [
        section({
          name: "finalMoodOtherStudents",
          body: (m) => (
            <>
              <Prose>
                Above, you said that, after measuring <M t="\hat{S}" />, it
                would still be impossible to obtain a result of <M t="+1" /> for
                a measurement of “mood.” Let’s think about this some more.
              </Prose>

              <ChooseOne
                model={m.finalMoodOtherStudents}
                choices={[
                  [
                    "classical student",
                    <Prose noMargin>
                      <strong>Student A:</strong>
                      <br />
                      <em>
                        Before we measured eye size, we already knew the mouse
                        was unhappy (because we got the <M t="-1" />{" "}
                        eigenvalue). Why would measuring its eye size affect the
                        mouse’s mood? Even after we measure eye size, we know
                        the mouse will still be unhappy!
                      </em>
                    </Prose>,
                  ],
                  [
                    "quantum student",
                    <Prose noMargin>
                      <strong>Student B:</strong>
                      <br />
                      <em>
                        At first, we do know that the mouse is unhappy. But then
                        we measure the mouse’s eye size. After we make that
                        measurement, we now know it’s eye size for sure. But we
                        can no longer be certain about the mood! Eye size and
                        mood are incompatible.
                      </em>
                    </Prose>,
                  ],
                ]}
                allowOther={false}
                label={
                  <Prose>
                    Consider two other students’ ideas. With whom do you agree
                    more?
                  </Prose>
                }
              />
            </>
          ),
        }),

        section({
          name: "finalMoodCorrection",
          when: (r) =>
            r.finalMoodOtherStudents?.selected === "classical student",
          body: (m) => (
            <Help>
              <Prose>
                <p>Student B is more on the right track.</p>

                <p>
                  Measuring the mouse’s eye size destroys the information about
                  its mood. After measuring eye size, we can no longer be
                  certain that the mouse is “unhappy.” Eye size and mood are
                  examples of “incompatible” quantum observables.
                </p>

                <p>It’s understandable if you find this unexpected!</p>
              </Prose>
            </Help>
          ),
        }),
      ],
    }),

    section({
      name: "surpriseResults",
      body: (m) => (
        <TextArea
          model={m.surpriseResults}
          label={
            <Prose>
              <p>
                Think a bit about this chain of events—is there anything at all
                curious or surprising about it (from a classical perspective)?
              </p>
            </Prose>
          }
        />
      ),
    }),

    section({
      name: "thinkingDeeper",
      body: (m) => (
        <>
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
            model={m.thinkingDeeperAgreement}
            choices={[
              ["agree", "I agree"],
              ["disagree", "I disagree"],
            ]}
            label={<Prose>Do you agree with your friend’s statement?</Prose>}
          />

          <TextArea
            model={m.thinkingDeeperExplain}
            label={<Prose>Why or why not?</Prose>}
          />
        </>
      ),
      hints: [
        hint({
          name: "thinkingDeeper",
          body: (
            <Prose>
              Consider the difference between a mixture and a superposition
              (check your notes or textbook). Which are we dealing with here?
            </Prose>
          ),
        }),
      ],
    }),
  ],
}));
