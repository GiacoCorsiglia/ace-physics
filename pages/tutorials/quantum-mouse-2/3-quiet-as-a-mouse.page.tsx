import {
  Decimal,
  LabelsLeft,
  M,
  Matrix,
  Prose,
  Reminder,
  TextBox,
  TextLine,
  Toggle,
} from "@/components";
import { Html } from "@/helpers/client";
import { page } from "@/tutorial";
import setup from "./setup";
import styles from "./styles.module.scss";

export default page(setup, ({ section }) => ({
  name: "quietAsAMouse",
  label: "Quiet as a Mouse",
  answers: "none",
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
            (for noisy mice), or 10 dB (for quiet mice).
          </p>

          <p>
            Assume <M t="\hat{N}" />
            ’s eigenvectors are <em>complete and orthonormal</em>.
          </p>
        </Prose>
      ),
    }),

    section({
      name: "representationNStates",
      body: (m) => (
        <>
          <Prose>
            <p>
              After observing many mice, you conclude that{" "}
              <strong>all happy mice are noisy</strong> (and vice versa), and
              likewise, <strong>all sad mice are quiet</strong> (and vice
              versa).
            </p>

            <p>
              Invent your own “ket” notation for (normalized) noise eigenstates,
              represent them in the mood basis.
            </p>
          </Prose>

          <div className={styles.basisGrid}>
            <p className={styles.basisGridLabel}>Noisy ket:</p>
            <KetLabel>
              <TextLine model={m.notationNoisyState} maxWidth />
            </KetLabel>
            <M t="=" />
            <TextLine
              model={m.noisyStateHappinessBasis}
              placeholder="Mood basis representation"
            />

            <p className={styles.basisGridLabel}>Quiet ket:</p>
            <KetLabel>
              <TextLine model={m.notationQuietState} maxWidth />
            </KetLabel>
            <M t="=" />
            <TextLine
              model={m.quietStateHappinessBasis}
              placeholder="Mood basis representation"
            />
          </div>

          <Prose justify="center" size="small">
            <span className="text-faded">You can copy-paste these:</span>
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
            Also write the representation of the N operator (again, in the mood
            basis).
          </Prose>

          <Matrix
            labelTex="\hat{N}"
            matrix={Matrix.modelToMatrix(m.representationNOperator, (c) => (
              <Decimal model={c} />
            ))}
          />

          <Reminder>
            In the mood basis, we represent the “happy” ket as{" "}
            <M
              display
              t="\ket{\smiley} \dot{=} \begin{pmatrix}1 \\ 0\end{pmatrix}"
            />
          </Reminder>
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
            model={m.simultaneousEigenstatesNS}
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

          <TextBox
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

          <LabelsLeft>
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
          </LabelsLeft>
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

          <TextBox
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
    <div className={styles.ketLabel}>
      <M t="\Large|" />
      {children}
      <M t="\Large\rangle" />
    </div>
  );
}
