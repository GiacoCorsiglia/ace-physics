import {
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
import styles from "./styles.module.scss";

export default page(setup, ({ section, hint }) => ({
  name: "aMischiefOfMice",
  label: "A Mischief of Mice",
  answers: "checked-some",
  sections: [
    section({
      name: "aMischiefOfMiceIntro",
      body: (
        <>
          <Reminder>
            <Prose>
              Small-eyed mice: &nbsp;{" "}
              <M t="\hat{S}\ket{\smalleye} = 1 \unit{mm} \ket{\smalleye}" />{" "}
              <br />
              Wide-eyed mice: &nbsp;{" "}
              <M t="\hat{S}\ket{\wideye} = 2 \unit{mm} \ket{\wideye}" /> <br />
              Happy mice: &nbsp; <M t="\hat{M}\ket{\smiley}=\ket{\smiley}" />
              <br />
              Sad mice: &nbsp; <M t="\hat{M}\ket{\frownie}= -\ket{\frownie}" />
              <M
                display
                t="
                \hat{M} \doteq \begin{pmatrix} 1 & 0 \\ 0 & -1 \end{pmatrix}
                \and
                \hat{S} \doteq \frac{1}{5} \begin{pmatrix} 6 & 2 \\ 2 & 9 \end{pmatrix} \unit{mm}
                "
              />
            </Prose>
          </Reminder>

          <Prose>
            Suppose you have a mischief (i.e., an ensemble) of “wide-eyed” mice,
            meaning they are all in the state:
            <M
              display
              t="\ket{\wideye} = \frac{1}{\sqrt{5}} \ket{\smiley} + \frac{2}{\sqrt{5}} \ket{\frownie}"
            />
          </Prose>
        </>
      ),
    }),

    section({
      name: "expValUncertaintyS",
      body: (m) => (
        <>
          <Prose>
            For this collection of mice, what is <M t="\expval{\hat{S}}" />?
            What is <M t="\Delta\hat{S}" />?
          </Prose>

          <div className={styles.unitsGrid}>
            <Decimal model={m.expValS} label={<M t="\expval{\hat{S}} = " />} />

            <Dropdown
              model={m.expValSUnits}
              placeholder="Units"
              choices={[
                ["none", "Dimensionless"],
                ["mm", "mm"],
                ["eV", "eV"],
              ]}
            />

            <Decimal
              model={m.uncertaintyS}
              label={<M t="\Delta\hat{S} = " />}
            />

            <Dropdown
              model={m.uncertaintySUnits}
              placeholder="Units"
              choices={[
                ["none", "Dimensionless"],
                ["mm", "mm"],
                ["eV", "eV"],
              ]}
            />
          </div>

          <Prose>
            Do you need to do any nasty matrix algebra, or can you figure this
            out intuitively?
          </Prose>
        </>
      ),
      hints: [
        hint({
          name: "expValUncertaintyS",
          label: "I need a hint",
          body: (
            <Prose>
              The <M t="\hat{S}" /> operator refers to <strong>eye size</strong>
              , and 100% of the mice in this collection are “wide-eyed mice”.
            </Prose>
          ),
        }),
      ],
    }),

    section({
      name: "signExpValM",
      body: (m) => (
        <>
          <Prose>
            Soon, we’ll ask you to compute <M t="\expval{\hat{M}}" /> and{" "}
            <M t="\Delta\hat{M}" />. But first–before you calculate–let’s think
            qualitatively, so we can later check the <em>reasonableness</em> of
            our computed answers.
          </Prose>

          <Toggle
            model={m.signExpValM}
            label={
              <Prose>
                What SIGN do you expect to get for <M t="\expval{\hat{M}}" />?
                (Remember, the collection of mice is 100% wide-eyed.)
              </Prose>
            }
            choices={[
              [
                "positive",
                <>
                  <M t="\expval{\hat{M}}" /> will be positive
                  <M t="(+)" />
                </>,
              ],
              [
                "negative",
                <>
                  <M t="\expval{\hat{M}}" /> will be negative
                  <M t="(-)" />
                </>,
              ],
              [
                "zero",
                <>
                  <M t="\expval{\hat{M}} = 0" />
                </>,
              ],
            ]}
          />

          <TextBox model={m.signExpValMExplain} label={<Prose>Why?</Prose>} />
        </>
      ),
      guidance: {
        nextMessage: () => "encouragement",
        messages: {
          encouragement: {
            body: (
              <Guidance.HeadsUp>
                We haven’t checked your answer yet! You’ll check for yourself
                soon.
              </Guidance.HeadsUp>
            ),
            onContinue: "nextSection",
          },
        },
      },
    }),

    section({
      name: "extremaMagnitudeExpValM",
      body: (m, { responses }) => (
        <>
          <Prose>
            <p>
              For the next two questions, think about a collection of mice that
              all start in the same state—but you don't know what that state is.
            </p>

            <p>
              No matter what state you start with, what is the{" "}
              <strong>smallest</strong> <em>magnitude</em> you might ever get
              for <M t="\expval{\hat{M}}" />? How about the{" "}
              <strong>biggest</strong> magnitude it could ever be?
            </p>
          </Prose>

          <LabelsLeft>
            <Decimal
              model={m.smallestMagnitudeExpValM}
              label={
                <>
                  <b>Smallest</b> possible <i>magnitude</i> for{" "}
                  <M t="\expval{\hat{M}}" />:
                </>
              }
            />

            <Decimal
              model={m.largestMagnitudeExpValM}
              label={
                <>
                  <b>Biggest</b> possible <i>magnitude</i> for{" "}
                  <M t="\expval{\hat{M}}" />:
                </>
              }
            />
          </LabelsLeft>

          {((responses?.smallestMagnitudeExpValM &&
            responses?.smallestMagnitudeExpValM < 0) ||
            (responses?.largestMagnitudeExpValM &&
              responses?.largestMagnitudeExpValM < 0)) && (
            <Guidance.Hint>
              We’re asking about <em>magnitude</em> (i.e., absolute value), so
              your answers shouldn’t be negative.
            </Guidance.Hint>
          )}
        </>
      ),
      continue: {
        allowed({ responses }, allowed) {
          return (
            allowed &&
            !!responses?.smallestMagnitudeExpValM &&
            responses?.smallestMagnitudeExpValM >= 0 &&
            !!responses?.largestMagnitudeExpValM &&
            responses?.largestMagnitudeExpValM >= 0
          );
        },
      },
    }),

    section({
      name: "extremaUncertaintyM",
      body: (m) => (
        <>
          <Prose>
            No matter what state you start with, what is the{" "}
            <strong>smallest</strong> <em>value</em> you might ever get for{" "}
            <M t="\Delta\hat{M}" />? How about the <strong>biggest</strong>{" "}
            value it could ever be? (No calculations needed, just a rough idea)
          </Prose>

          <LabelsLeft>
            <Decimal
              model={m.smallestUncertaintyM}
              label={
                <>
                  <b>Smallest</b> possible <i>value</i> for{" "}
                  <M t="\Delta\hat{M}" />:
                </>
              }
            />

            <Decimal
              model={m.largestUncertaintyM}
              label={
                <>
                  <b>Biggest</b> possible <i>value</i> for{" "}
                  <M t="\Delta\hat{M}" />:
                </>
              }
            />
          </LabelsLeft>
        </>
      ),
    }),

    section({
      name: "expValUncertaintyM",
      body: (m) => (
        <>
          <Prose>
            <p>
              For this question, return to thinking about the collection of mice
              from the top of the page, all of which are in the wide-eyed state.
            </p>

            <p>
              Go ahead and{" "}
              <strong>
                compute <M t="\expval{\hat{M}}" /> and <M t="\Delta\hat{M}" />
              </strong>
              .
            </p>
          </Prose>

          <LabelsLeft>
            <Decimal model={m.expValM} label={<M t="\expval{\hat{M}} =" />} />

            <Decimal model={m.uncertaintyM} label={<M t="\Delta\hat{M} =" />} />
          </LabelsLeft>

          <Prose>
            Check—are your answers within the bounds and expectations above?
          </Prose>
        </>
      ),
      guidance: {
        nextMessage({
          signExpValM,
          smallestMagnitudeExpValM,
          largestMagnitudeExpValM,
          expValM,
        }) {
          // We're only checking expectation value.
          const signPredictionCorrect = signExpValM?.selected === "negative";
          const boundsCorrect =
            smallestMagnitudeExpValM === 0 && largestMagnitudeExpValM === 1;
          const expValCorrect = approxEquals(expValM, -0.2);

          if (expValCorrect) {
            if (signPredictionCorrect && boundsCorrect) {
              return "allCorrect";
            } else if (!signPredictionCorrect) {
              return "expValCorrectSignPredictionIncorrect";
            } else {
              // (!boundsCorrect)
              return "expValCorrectBoundsIncorrect";
            }
          } else {
            if (signPredictionCorrect && boundsCorrect) {
              return "expValIncorrectPredictionsCorrect";
            }

            return "expValSomePredictionsIncorrect";
          }
        },
        messages: {
          expValCorrectSignPredictionIncorrect: {
            body: (
              <Guidance.Disagree>
                We agree with your value for <M t="\hat{M}" />, but it doesn’t
                match the sign you expected it to be.
              </Guidance.Disagree>
            ),
            onContinue: "nextMessage",
          },
          expValCorrectBoundsIncorrect: {
            body: (
              <Guidance.Disagree>
                We agree with your value for <M t="\hat{M}" />, but its
                magnitude does not fall in the range you expected.
              </Guidance.Disagree>
            ),
            onContinue: "nextMessage",
          },
          expValIncorrectPredictionsCorrect: {
            body: (
              <Guidance.Disagree>
                We disagree with the value you calculated for <M t="\hat{M}" />{" "}
                (but we agree with the predictions you made above for the sign
                and magnitude of <M t="\hat{M}" />
                ).
              </Guidance.Disagree>
            ),
            onContinue: "nextMessage",
          },
          expValSomePredictionsIncorrect: {
            body: (
              <Guidance.Disagree>
                We disagree with the value you calculated for <M t="\hat{M}" />{" "}
                and also with some of the predictions you made above.
              </Guidance.Disagree>
            ),
            onContinue: "nextMessage",
          },
          allCorrect: {
            body: <Guidance.Agree>We agree! Nice work.</Guidance.Agree>,
            onContinue: "nextSection",
          },
        },
      },
    }),
  ],
}));
