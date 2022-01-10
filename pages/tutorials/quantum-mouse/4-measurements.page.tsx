import {
  ChooseOne,
  Decimal,
  Dropdown,
  Guidance,
  LabelsLeft,
  M,
  Prose,
  Reminder,
  TextBox,
  Toggle,
} from "@/components";
import { approxEquals } from "@/helpers/client";
import { page } from "@/tutorial";
import setup from "./setup";

export default page(setup, ({ section, oneOf, hint }) => ({
  name: "measurements",
  label: "Measurements",
  answers: "checked-some",
  sections: [
    section({
      name: "measurementsIntro",
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
        </>
      ),
      continue: { label: "Let’s explore!" },
    }),

    section({
      name: "collapsed1mmState",
      body: (m) => (
        <ChooseOne
          model={m.collapsed1mmState}
          choices={[
            ["1mm", <M t="\ket{\smalleye}" />],
            ["2mm", <M t="\ket{\wideye}" />],
            ["happy", <M t="\ket{\smiley}" />],
            ["sad", <M t="\ket{\frownie}" />],
            ["ambiguous", "It’s ambigous! We can’t be certain."],
          ]}
          label={
            <Prose>
              What quantum state is the mouse in now,{" "}
              <em>after the measurement?</em>
            </Prose>
          }
        />
      ),
      hints: [
        [
          hint({
            name: "collapsed1mmState",
            body: (
              <Prose>
                Does it matter that you don’t know what state the mouse was in{" "}
                <em>before</em> the measurement?
              </Prose>
            ),
          }),
          hint({
            name: "collapsed1mmState2",
            body: (
              <Prose>
                Is there one state that you <em>know</em> describes a mouse with{" "}
                <M t="1\text{mm}" /> eyes 100% of the time?
              </Prose>
            ),
            label: "A little more help?",
          }),
        ],
      ],
    }),

    section({
      name: "remeasure1mm",
      body: (m) => (
        <>
          <TextBox
            model={m.remeasure1mmResults}
            label={
              <Prose>
                If you now re-measure <M t="\hat{S}" /> on this state, what
                result(s) can you get, with what probabilities?
              </Prose>
            }
          />

          <Dropdown
            model={m.remeasure1mmState}
            choices={[
              ["1mm", <M t="\ket{\smalleye}" />],
              ["2mm", <M t="\ket{\wideye}" />],
              ["happy", <M t="\ket{\smiley}" />],
              ["sad", <M t="\ket{\frownie}" />],
            ]}
            label={
              <Prose>
                After this second measurement of <M t="\hat{S}" />, what state
                will you be in?
              </Prose>
            }
          />
        </>
      ),
      hints: [
        hint({
          name: "remeasure1mm",
          when: (r) =>
            r.collapsed1mmState?.selected !== "1mm" &&
            r.collapsed1mmState?.selected !== "2mm",
          body: <Prose>Take another look at the previous question.</Prose>,
        }),
        hint({
          name: "remeasure1mm2",
          when: (r) =>
            r.collapsed1mmState?.selected === "1mm" ||
            r.collapsed1mmState?.selected === "2mm",
          body: (
            <Prose>
              Is there a difference between the scenario in this question and
              the previous one?
            </Prose>
          ),
        }),
      ],
    }),

    section({
      name: "measureUnhappyProbability",
      body: (m) => (
        <>
          <Prose>
            After you make the measurements you made above, what is the
            probability that a subsequent measurement of <M t="\hat{M}" /> will
            yield a result of <M t="-1" /> (the eigenvalue corresponding with
            “unhappy”)?
          </Prose>

          <LabelsLeft>
            <Decimal model={m.measureUnhappyProbability} label="Probability:" />

            <TextBox
              model={m.measureUnhappyProbabilityExplain}
              label="Explain:"
            />
          </LabelsLeft>
        </>
      ),
      hints: [
        hint({
          name: "measureUnhappyProbability",
          body: (
            <Prose>
              Think about what state the mouse is in when you measure measure{" "}
              <M t="\hat{M}" />. How can you write that state in terms of the
              eigenvectors of <M t="\hat{M}" />.{" "}
              <em>(Hint: see the reminder at the top of this page.) </em>
            </Prose>
          ),
        }),
      ],
    }),

    section({
      name: "smallEyedEmotion",
      body: (m) => (
        <TextBox
          model={m.smallEyedEmotion}
          label={
            <Prose>
              We said before that “wide-eyed mice are rather stressed.” In this
              same spirit, how might you describe small-eyed mice?
            </Prose>
          }
        />
      ),
      hints: [
        hint({
          name: "smallEyedEmotion",
          body: (
            <Prose>
              If you know (from above) that
              <M
                display
                t="\ket{\smalleye} = \frac{2}{\sqrt{5}} \ket{\smiley} - \frac{1}{\sqrt{5}} \ket{\frownie}"
              />
              what can you say about the likelihood that a small-eyed mouse will
              be happy? Or sad?
            </Prose>
          ),
        }),
      ],
      continue: { label: "Let’s check in" },
    }),

    oneOf({
      which: (r) => {
        if (r.collapsed1mmState?.selected !== "1mm") {
          return "incorrect";
        } else if (
          r.collapsed1mmState?.selected !== r.remeasure1mmState?.selected
        ) {
          return "inconsistent";
        }
        return null;
      },
      sections: {
        incorrect: section({
          name: "collapsed1mmStateIncorrect",
          body: (
            <Guidance.Disagree>
              You may want to take another look the first question on this page.
            </Guidance.Disagree>
          ),
        }),
        inconsistent: section({
          name: "collapsedRemeasuredInconsistent",
          body: (m) => (
            <>
              <Toggle
                model={m.collapsedRemeasuredEffect}
                choices={[
                  ["has effect", "Yes, it has an effect"],
                  ["no effect", "No, you’ll definitely get the same result"],
                ]}
                label={
                  <Prose>
                    Do repeated measurements of the same observable affect the
                    state? That is, if you measure <M t="\hat{M}" />, and then
                    measure <M t="\hat{M}" /> again (without doing anything to
                    the state in between), can you get a different result the
                    second time?
                  </Prose>
                }
              />

              <Prose>
                Make sure your answers to the first two questions on this page
                are consistent with your answer here!
              </Prose>
            </>
          ),
        }),
      },
    }),

    oneOf({
      which: (r) => {
        if (approxEquals(r.measureUnhappyProbability, 1 / Math.sqrt(5))) {
          return "probabilityNotSquared";
        } else if (r.measureUnhappyProbability! < 0) {
          return "probabilityNegative";
        }
        return null;
      },
      sections: {
        probabilityNotSquared: section({
          name: "probabilityNotSquared",
          body: (
            <Guidance.HeadsUp>
              Don’t forget to square your result for the probability!
            </Guidance.HeadsUp>
          ),
        }),
        probabilityNegative: section({
          name: "probabilityNegative",
          body: (
            <Guidance.Disagree>
              Probability can’t be negative!
            </Guidance.Disagree>
          ),
        }),
      },
    }),
  ],
}));
