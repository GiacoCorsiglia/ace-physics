import { Prose } from "@/design";
import { Html } from "@/helpers/frontend";
import { Decimal, FieldGroup, Text, TextArea, Toggle } from "@/inputs";
import M, { Matrix, modelToMatrix } from "@/math";
import { page } from "@/tutorial";
import { css } from "linaria";
import React from "react";
import setup from "./setup";

export default page(setup, ({ section }) => ({
  name: "quietAsAMouse",
  label: "Quiet as a Mouse",
  answersChecked: "none",
  sections: [
    section({
      name: "quietAsAMouseIntro",
      body: (
        <Prose>
          <p>
            Consider yet another operator, <M t="\hat{N}" />, which measures the
            volume of noise the mouse is making.
          </p>

          <p>
            Measuring <M t="\hat{N}" /> gives only two possible results, 50 dB
            (for noisy mice), or 10 dB (quiet).
          </p>

          <p>
            Assume <M t="\hat{N}" />
            ’s eigenvectors are <em>complete and orthonormal</em>.
          </p>

          <p>
            After observing many mice, you conclude that all happy mice are
            noisy (and vice versa), and likewise, all sad mice are quiet (and
            vice versa).
          </p>
        </Prose>
      ),
    }),

    section({
      name: "representationNStates",
      body: (m) => (
        <>
          <Prose>
            Invent your own “ket” notation for (normalized) noise eigenstates,
            represent them (in the happy basis)
          </Prose>

          <div
            className={css`
              display: grid;
              margin-top: 1rem;
              grid-template-columns: auto auto auto 1fr;
              grid-gap: 1rem;
              align-items: center;
            `}
          >
            <p>Noisy ket:</p>
            <KetLabel>
              <Text model={m.notationNoisyState} maxWidth />
            </KetLabel>
            <M t="=" />
            <Text
              model={m.noisyStateHappinessBasis}
              placeholder="Happiness basis representation"
            />

            <p>Quiet ket:</p>
            <KetLabel>
              <Text model={m.notationQuietState} maxWidth />
            </KetLabel>
            <M t="=" />
            <Text
              model={m.quietStateHappinessBasis}
              placeholder="Happiness basis representation"
            />
          </div>

          <Prose className="text-center">
            <span className="text-small opacity-faded">
              You can copy-paste these:
            </span>
            <span
              role="img"
              aria-label="happy face"
              style={{ display: "inline-block", marginLeft: "1rem" }}
            >
              😁
            </span>
            <span
              role="img"
              aria-label="sad face"
              style={{ display: "inline-block", marginLeft: "1rem" }}
            >
              😭
            </span>
          </Prose>
        </>
      ),
    }),

    section({
      name: "representationNOperator",
      body: (m) => (
        <>
          <Prose>
            Also write the representation of the N operator (again, in the happy
            basis).
          </Prose>

          <Matrix
            className="margin-top-1"
            labelTex="\hat{N}"
            matrix={modelToMatrix(m.representationNOperator, (c) => (
              <Decimal model={c} />
            ))}
          />
        </>
      ),
    }),

    section({
      name: "doNAndMCommute",
      body: (m) => (
        <>
          <Toggle
            model={m.doNAndMCommute}
            label={
              <Prose>
                Do <M t="\hat{N}" /> and <M t="\hat{M}" /> commute?
              </Prose>
            }
            choices={[
              ["yes", "Yes, they commute"],
              ["no", "No, they don’t"],
            ]}
          />

          <Prose>
            You can intuit this, but use your representation from part B to{" "}
            <strong>check on scrap paper</strong>!
          </Prose>
        </>
      ),
    }),

    section({
      name: "simultaneousEigenstatesNMS",
      body: (m) => (
        <>
          <Toggle
            model={m.simultaneousEigenstatesNM}
            label={
              <Prose>
                Is there a set of simultaneous eigenstates for <M t="\hat{N}" />{" "}
                and <M t="\hat{M}" />?
              </Prose>
            }
            choices={[
              ["yes", "Yes"],
              ["no", "No"],
            ]}
          />

          <Toggle
            model={m.simultaneousEigenstatesNM}
            label={
              <Prose>
                For <M t="\hat{N}" />
                and <M t="\hat{S}" />?
              </Prose>
            }
            choices={[
              ["yes", "Yes"],
              ["no", "No"],
            ]}
          />

          <TextArea
            model={m.simultaneousEigenstatesNMSExplain}
            label={<Prose>Why/why not (for both questions)?</Prose>}
          />
        </>
      ),
    }),

    section({
      name: "quietMiceExpValUncertaintyNM",
      body: (m) => (
        <>
          <Prose>
            If I gave you a collection of <strong>quiet mice</strong>, what do
            you expect for the following quantities?
          </Prose>

          <FieldGroup grid className="margin-top-1">
            <Decimal
              model={m.quietMiceExpValN}
              label={<M t="\expval{\hat{N}} =" />}
            />
            <Decimal
              model={m.quietMiceUncertaintyN}
              label={<M t="\Delta\hat{N} =" />}
            />
            <Decimal
              model={m.quietMiceExpValM}
              label={<M t="\expval{\hat{M}} =" />}
            />
            <Decimal
              model={m.quietMiceUncertaintyM}
              label={<M t="\Delta\hat{M} =" />}
            />
          </FieldGroup>
        </>
      ),
    }),

    section({
      name: "quietMiceCanUncertaintySBeZero",
      body: (m) => (
        <>
          <Toggle
            model={m.quietMiceCanUncertaintySBeZero}
            label={
              <Prose>
                For this collection of quiet mice—without computing—can{" "}
                <M t="\Delta\hat{S}" /> be zero?
              </Prose>
            }
            choices={[
              ["yes", "Yes"],
              ["no", "No"],
            ]}
          />

          <TextArea
            model={m.quietMiceCanUncertaintySBeZeroExplain}
            label={<Prose>Why/why not?</Prose>}
          />
        </>
      ),
    }),
  ],
}));

function KetLabel({ children }: { children: Html }) {
  return (
    <div
      className={css`
        display: flex;
        align-items: center;

        & > * + * {
          margin-left: 0.3rem;
        }
      `}
    >
      <M t="\Large|" />
      {children}
      <M t="\Large\rangle" />
    </div>
  );
}
