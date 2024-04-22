import { Guidance, Image, M, Prose, TextBox, Toggle } from "@/components";
import { page, repeatedModel } from "@/tutorial";
import { hint } from "@/tutorial/config";
import Link from "next/link";
import mouseBigEyeSvg from "../quantum-mouse/svgs/mouse-big-eye.svg";
import mouseSmallEyeSvg from "../quantum-mouse/svgs/mouse-small-eye.svg";
import setup from "./setup";

export default page(setup, ({ section }) => ({
  name: "measurementAndCommutation",
  label: "Measurement & Commutation",
  answers: "checked-some",
  sections: [
    section({
      name: "measurementAndCommutationIntro",
      body: (
        <Prose>
          <p>
            Let’s return to our{" "}
            <Link href="/tutorials/quantum-mouse">“quantum mouse”</Link>. Here’s
            a reminder of what we discovered in that tutorial.
          </p>

          <p>
            Observable #1 was <strong>“eye size”</strong>, the corresponding
            Hermitian Operator was <M t="\hat{S}" />, where
          </p>

          <p className="text-center">
            <M t="\hat{S}" />
            <SmallEyeMouseKet />
            <M t="=\ 1" />
            <SmallEyeMouseKet />
            &nbsp;&nbsp;but&nbsp;&nbsp;
            <M t="\hat{S}" />
            <BigEyeMouseKet />
            <M t="=\ 2" />
            <BigEyeMouseKet />
          </p>

          <p>
            We simplified this notationally as
            <M
              display
              t="\hat{S}\ket{\smalleye} = 1\unit{mm} \ket{\smalleye} \and \hat{S}\ket{\wideye} = 2\unit{mm} \ket{\wideye}"
            />
          </p>

          <p>
            Observable #2 was <strong>“quantum mood”</strong>, with associated
            Hermitian operator
            <M t="\hat{M}" />, for which we had eigenstates satisfying
            <M
              display
              t="\hat{M}\ket{\smiley} = \ket{\smiley} \and \hat{M}\ket{\frownie} = -\ket{\frownie}"
            />
          </p>

          <p>These eigenstates were related in the following ways.</p>

          <p>
            For the “small-eyed state”,
            <M
              display
              t="
                \ket{\smalleye}
                = \frac{2}{\sqrt{5}} \ket{\smiley} - \frac{1}{\sqrt{5}} \ket{\frownie}
                \doteq \frac{1}{\sqrt{5}} \begin{pmatrix} 2 \\ -1 \end{pmatrix}
              "
            />
            where the column vector is written in the “mood basis”. (We
            interpreted this as something like “Small eyed (sleepy?) mice are
            mostly content.”)
          </p>
          <p>
            For the “big-eyed state”, which is orthonormal to
            <M t="\ket{\smalleye}" />
            ,
            <M
              display
              t="\ket{\wideye} = \frac{1}{\sqrt{5}} \ket{\smiley} + \frac{2}{\sqrt{5}} \ket{\frownie}"
            />
            (Which we interpreted as “wide-eyed (caffeinated?) quantum-mice are
            rather stressed”.)
          </p>

          <p>
            Finally, we found the representations of the two operators (all in
            the “mood basis”):
            <M
              display
              t="
                \hat{M} \doteq \begin{pmatrix} 1 & 0 \\ 0 & -1 \end{pmatrix}
                \and
                \hat{S} \doteq \frac{1}{5} \begin{pmatrix} 6 & 2 \\ 2 & 9 \end{pmatrix} \unit{mm}
              "
            />
          </p>
        </Prose>
      ),
      continue: { label: "Thanks for the summary!" },
    }),

    section({
      name: "eyeSizeMeasAffectsHappinessPredict",
      body: (m) => (
        <>
          <Toggle
            model={m.eyeSizeMeasAffectsHappinessPredict}
            label={
              <Prose>
                Can measuring <M t="\hat{S}" /> (“size of the eyes”) on a mouse
                ever affect your ability to predict a future measurement of
                happiness on that mouse?
              </Prose>
            }
            choices={[
              ["yes", "Yes"],
              ["no", "No"],
            ]}
          />

          <TextBox
            model={m.eyeSizeMeasAffectsHappinessPredictExplain}
            label={<Prose>Explain:</Prose>}
          />
        </>
      ),
      hints: [
        hint({
          name: "eyeSizeMeasAffectsHappinessPredict",
          body: (
            <Prose>
              You thought about this in the first quantum mouse tutorial. If you
              can’t recall, start with a definitely happy mouse, measure{" "}
              <M t="\hat{S}" />, assume some particular result, then see what a
              new happiness measurement gives
            </Prose>
          ),
        }),
      ],
      guidance: {
        nextMessage(r, { hints }) {
          if (r.eyeSizeMeasAffectsHappinessPredict?.selected === "yes") {
            return "correct";
          }

          if (
            hints?.eyeSizeMeasAffectsHappinessPredict?.status === "revealed"
          ) {
            return "incorrectStrong";
          }

          return "incorrectHint";
        },
        messages: {
          incorrectHint: {
            body: (
              <Guidance.Disagree>
                You thought about this in the first quantum mouse tutorial. If
                you can’t recall, start with a definitely happy mouse, measure{" "}
                <M t="\hat{S}" />, assume some particular result, then see what
                a new happiness measurement gives
              </Guidance.Disagree>
            ),
            onContinue: "nextMessage",
          },
          incorrectStrong: {
            body: (
              <Guidance.Disagree>
                <p>
                  Suppose you start with a “happy” mouse, in the state{" "}
                  <M t="\ket{\smiley}" />. You know for certain that, if you
                  measure this mouse’s mood, you will get “happy” 100% of the
                  time.
                </p>

                <p>
                  Suppose you measure the mouse’s eye size. After this
                  measurement, the mouse will either be in the small-eyed state,{" "}
                  <M t="\ket{\smalleye}" />, or the wide-eyed state,{" "}
                  <M t="\ket{\wideye}" />.
                </p>

                <p>
                  If you measure the mouse’s mood now, after the eye size
                  measurement, you might get happy, but you also might get sad.
                  You can no longer say which for sure.
                </p>
              </Guidance.Disagree>
            ),
            onContinue: "nextMessage",
          },
          correct: {
            body: <Guidance.Agree>We agree!</Guidance.Agree>,
            onContinue: "nextSection",
          },
        },
      },
    }),

    section({
      name: "mAndSCompatibility",
      body: (m) => (
        <>
          <Toggle
            model={m.mAndSCommute}
            label={
              <Prose>
                Do <M t="\hat{M}" /> and <M t="\hat{S}" /> commute?
              </Prose>
            }
            choices={[
              [
                "yes",
                <>
                  Yes, <M t="\hat{M}\hat{S} = \hat{S}\hat{M}" />
                </>,
              ],
              [
                "no",
                <>
                  No, <M t="\hat{M}\hat{S} \neq \hat{S}\hat{M}" />
                </>,
              ],
            ]}
          />

          <Toggle
            model={m.mAndSSimultaneousEigenvectors}
            label={
              <Prose>
                Are there any quantum mouse states which are simultaneously
                eigenvectors of <M t="\hat{M}" /> and <M t="\hat{S}" />?
              </Prose>
            }
            choices={[
              ["yes", "Yes"],
              ["no", "No"],
            ]}
          />

          <TextBox
            model={m.mAndSCommuteAffectsChainedMeasurements}
            label={
              <Prose>
                How is this all related to your answers to part A above?
              </Prose>
            }
          />
        </>
      ),
      guidance: {
        nextMessage(r) {
          if (r.mAndSCommute?.selected === "yes") {
            return "commutationIncorrect";
          }
          return null;
        },
        messages: {
          commutationIncorrect: {
            body: (
              <Guidance.Disagree>
                Check the commutation of <M t="\hat{M}" /> and <M t="\hat{S}" />{" "}
                on scrap paper!
              </Guidance.Disagree>
            ),
            onContinue: "nextMessage",
          },
          simultaneousEigenvectorsIncorrect: {
            body: (
              <Guidance.Disagree>
                Operators that don’t commute do not share eigenvectors.
              </Guidance.Disagree>
            ),
            onContinue: "nextMessage",
          },
        },
      },
    }),

    section({
      name: "canKnowEyeSizeHappinessSimultaneous",
      body: (m, { responses }) => (
        <>
          <Toggle
            model={m.canKnowEyeSizeHappinessSimultaneous}
            label={
              <Prose>
                Could you ever have a mouse state for which you simultaneously
                knew the value of happiness exactly, <em>and</em> the value of
                eye size exactly?
              </Prose>
            }
            choices={[
              ["yes", "Yes"],
              ["no", "No"],
            ]}
          />

          {responses?.canKnowEyeSizeHappinessSimultaneous?.selected ===
            "yes" && (
            <TextBox
              model={m.canKnowEyeSizeHappinessSimultaneousExplain}
              label={<Prose>Explain how to create such a state.</Prose>}
            />
          )}

          {responses?.canKnowEyeSizeHappinessSimultaneous?.selected ===
            "no" && (
            <TextBox
              model={repeatedModel(
                m.canKnowEyeSizeHappinessSimultaneousExplain,
              )}
              label={<Prose>Explain why not.</Prose>}
            />
          )}
        </>
      ),
    }),
  ],
}));

function SmallEyeMouseKet() {
  return (
    <>
      <M t="\large|" />
      <Image src={mouseSmallEyeSvg} inline alt="Mouse with small eyes" />
      <M t="\large\rangle" />
    </>
  );
}

function BigEyeMouseKet() {
  return (
    <>
      <M t="\large|" />
      <Image src={mouseBigEyeSvg} inline alt="Mouse with wide eyes" />
      <M t="\large\rangle" />
    </>
  );
}
