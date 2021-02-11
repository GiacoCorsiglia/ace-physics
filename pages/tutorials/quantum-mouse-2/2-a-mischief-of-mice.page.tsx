import { Prose, Reminder } from "@/design";
import { Decimal, FieldGroup, TextArea, Toggle } from "@/inputs";
import M from "@/math";
import { page } from "@/tutorial";
import React from "react";
import setup from "./setup";

export default page(setup, ({ section }) => ({
  name: "aMischiefOfMice",
  label: "A Mischief of Mice",
  answersChecked: "none",
  sections: [
    section({
      name: "aMischiefOfMiceIntro",
      body: (
        <>
          <Reminder>
            <M
              display
              t="
                \hat{M} \doteq \begin{pmatrix} 1 & 0 \\ 0 & -1 \end{pmatrix}
                \and
                \hat{S} \doteq \frac{1}{5} \begin{pmatrix} 6 & 2 \\ 2 & 9 \end{pmatrix} \unit{mm}
              "
            />
          </Reminder>

          <Prose>
            Suppose you have a mischief (i.e an ensemble) of “big eyed” mice,
            all in the state:
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

          <FieldGroup grid className="margin-top-1">
            <Decimal model={m.expValS} label={<M t="\expval{\hat{S}} = " />} />

            <Decimal
              model={m.uncertaintyS}
              label={<M t="\Delta\hat{S} = " />}
            />
          </FieldGroup>

          <Prose>
            (Do you need to do any nasty matrix algebra, or can you figure this
            out intuitively?)
          </Prose>
        </>
      ),
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

          <TextArea model={m.signExpValMExplain} label={<Prose>Why?</Prose>} />
        </>
      ),
    }),

    section({
      name: "extremaMagnitudeExpValM",
      body: (m) => (
        <>
          <Prose>
            What is the <em>smallest</em> <strong>magnitude</strong> you might
            ever get for <M t="\expval{\hat{M}}" /> (no matter what state you
            start with)? How about the <em>biggest</em>{" "}
            <strong>magnitude</strong> it could ever be?
          </Prose>

          <FieldGroup grid className="margin-top-1">
            <Decimal
              model={m.smallestMagnitudeExpValM}
              label={
                <>
                  <i>Smallest</i> <b>magnitude</b> for{" "}
                  <M t="\expval{\hat{M}}" />:
                </>
              }
            />

            <Decimal
              model={m.largestMagnitudeExpValM}
              label={
                <>
                  <i>Biggest</i> <b>magnitude</b> for <M t="\expval{\hat{M}}" />
                  :
                </>
              }
            />
          </FieldGroup>
        </>
      ),
    }),

    section({
      name: "extremaUncertaintyM",
      body: (m) => (
        <>
          <Prose>
            What is the <em>smallest</em> value you might ever get for{" "}
            <M t="\Delta\hat{M}" /> no matter what state you start with? How
            about the <em>biggest</em> it could ever be? (No calculations
            needed, just a rough idea)
          </Prose>

          <FieldGroup grid className="margin-top-1">
            <Decimal
              model={m.smallestUncertaintyM}
              label={
                <>
                  <i>Smallest</i> value for <M t="\Delta\hat{M}" />:
                </>
              }
            />

            <Decimal
              model={m.largestUncertaintyM}
              label={
                <>
                  <i>Biggest</i> value for <M t="\Delta\hat{M}" />:
                </>
              }
            />
          </FieldGroup>
        </>
      ),
    }),

    section({
      name: "expValUncertaintyM",
      body: (m) => (
        <>
          <Prose>
            Now, go ahead and{" "}
            <strong>
              compute
              <M t="\expval{\hat{M}}" />
              and <M t="\Delta\hat{M}" />
            </strong>
            . (And of course check—are your answers within the bounds and
            expectations above?)
          </Prose>

          <FieldGroup grid className="margin-top-1">
            <Decimal model={m.expValM} label={<M t="\expval{\hat{M}} =" />} />

            <Decimal model={m.uncertaintyM} label={<M t="\Delta\hat{M} =" />} />
          </FieldGroup>
        </>
      ),
    }),
  ],
}));
