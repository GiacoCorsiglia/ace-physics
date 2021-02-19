import { Prose } from "@/design";
import { TextArea, Toggle } from "@/inputs";
import M from "@/math";
import { page } from "@/tutorial";
import { hint } from "@/tutorial/config";
import Link from "next/link";
import React from "react";
import MouseBigEye from "../quantum-mouse/svgs/mouse-big-eye.svg";
import MouseSmallEye from "../quantum-mouse/svgs/mouse-small-eye.svg";
import setup from "./setup";

export default page(setup, ({ section }) => ({
  name: "measurementAndCommutation",
  label: "Measurement & Commutation",
  answersChecked: "none",
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
            Observable #1 was <strong>“eye size,”</strong> the corresponding
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
            Observable #2 was <strong>“quantum mood,”</strong> with associated
            Hermitian operatory
            <M t="\hat{M}" />, for which we had eigenstates satisfying
            <M
              display
              t="\hat{M}\ket{\smiley} = \ket{\smiley} \and \hat{M}\ket{\frownie} = -\ket{\frownie}"
            />
          </p>

          <p>These eigenstates were related in the following ways.</p>

          <p>
            For the “small-eyed state,”
            <M
              display
              t="
                \ket{\smalleye}
                = \frac{2}{\sqrt{5}} \ket{\smiley} - \frac{1}{\sqrt{5}} \ket{\frownie}
                \doteq \frac{1}{\sqrt{5}} \begin{pmatrix} 2 \\ -1 \end{pmatrix}
              "
            />
            where the column vector is written in the “happy basis.” (We
            interpreted this as something like “Small eyed (sleepy?) mice are
            mostly content.)
          </p>
          <p>
            For the “big-eyed state,” which is orthonormal to
            <M t="\ket{\smalleye}" />
            ,
            <M
              display
              t="\ket{\wideye} = \frac{1}{\sqrt{5}} \ket{\smiley} + \frac{2}{\sqrt{5}} \ket{\frownie}"
            />
            (Which we interpreted as “wide-eyed (caffeinated?) quantum-mice are
            rather stressed”)
          </p>

          <p>
            Finally, we found the representations of the two operators (all in
            the “happy basis”):
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

          <TextArea
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
    }),

    section({
      name: "mAndSCompatibility",
      body: (m) => (
        <>
          <Toggle
            model={m.mAndSCommute}
            label={
              <Prose>
                Do <M t="\hat{M}" /> and <M t="\hat{S}" /> commute? (Check on
                scrap paper!)
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
                  No, (<M t="\hat{M}\hat{S} \neq \hat{S}\hat{M}" />)
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

          <TextArea
            model={m.mAndSCommuteAffectsChainedMeasurements}
            label={
              <Prose>
                How is this all related to your answers to part A above?
              </Prose>
            }
          />
        </>
      ),
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
            <TextArea
              model={m.canKnowEyeSizeHappinessSimultaneousExplain}
              label={<Prose>Explain how to create such a state.</Prose>}
            />
          )}

          {responses?.canKnowEyeSizeHappinessSimultaneous?.selected ===
            "no" && (
            <TextArea
              model={
                m.canKnowEyeSizeHappinessSimultaneousExplain /* ignore-repeated-model */
              }
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
      <MouseSmallEye />
      <M t="\large\rangle" />
    </>
  );
}

function BigEyeMouseKet() {
  return (
    <>
      <M t="\large|" />
      <MouseBigEye />
      <M t="\large\rangle" />
    </>
  );
}
