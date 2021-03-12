import { Info, Prose } from "@/design";
import { cx } from "@/helpers/frontend";
import { Decimal, FieldGroup, TextArea } from "@/inputs";
import inputStyles from "@/inputs/inputs.module.scss";
import M from "@/math";
import { page } from "@/tutorial";
import { LinkExternalIcon, PencilIcon } from "@primer/octicons-react";
import setup from "./setup";

export default page(setup, ({ section, hint }) => ({
  name: "aGivenState",
  label: "A Given State",
  sections: [
    section({
      name: "aGivenStateIntro",
      body: (
        <Prose>
          <p>
            Suppose we give you a particle in the state:
            <M
              t="\ket{\psi_1} = \frac{1 + 0i}{\sqrt{2}} \ket{+} + \frac{0 + i}{\sqrt{2}} \ket{-}"
              display
            />
          </p>

          <p>
            Postulate #4 of QM says: If you have a system in state{" "}
            <M t="\ket{\psi}" /> and you measure spin, then:
            <M
              t="\text{Probability}(\text{measuring } S_z = \pm \frac{\hbar}{2}) = |\braket{\pm|\psi}|^2"
              display
            />
          </p>
        </Prose>
      ),
      continue: { label: "Got it" },
    }),

    section({
      name: "predictionForPsi1Z",
      body: (m) => (
        <>
          <Prose>
            <p>
              Suppose you run particles in the above state
              <M t="\ket{\psi_1}" /> through a single S-G oriented in the
              Z-direction.
            </p>

            <p>
              Predict/calculate the probabilities for measuring spin-up and
              -down along the Z-direction:
            </p>
          </Prose>

          <FieldGroup grid className="margin-top-1">
            <Decimal
              model={m.psi1ProbUpZ}
              label={<M t="P(S_z = + \frac{\hbar}{2}) =" />}
            />
            <Decimal
              model={m.psi1ProbDownZ}
              label={<M t="P(S_z = - \frac{\hbar}{2}) =" />}
            />
          </FieldGroup>

          <Info>
            <Prose>
              <PencilIcon /> &nbsp; Don’t be afraid to break out some scrap
              paper!
            </Prose>
          </Info>
        </>
      ),
    }),

    section({
      name: "experimentForPsi1Z",
      body: (m) => (
        <>
          <Prose>Start up the Stern-Gerlach sim:</Prose>

          <div className="text-center margin-top">
            <a
              className={cx(inputStyles.secondary, inputStyles.iconLast)}
              href="https://tinyurl.com/spin3220"
              target="_blank"
              rel="noreferrer noopener"
            >
              Open the sim
              <LinkExternalIcon />
            </a>
          </div>

          <Prose>
            <p>
              On the oven, choose state <strong>1</strong> (just below the
              “Start” button). This is the state <M t="\ket{\psi_1}" /> given
              above.
            </p>

            <p>
              <strong>Confirm your predictions experimentally!</strong> Resolve
              any inconsistencies, if there are any.
            </p>
          </Prose>
        </>
      ),
      continue: { label: "I tested my prediction" },
    }),

    section({
      name: "predictionForPsi1X",
      body: (m) => (
        <>
          <Prose>
            <p>
              Repeat the process, now assuming your S-G is in the{" "}
              <strong>X-direction</strong>. (You’re still starting with{" "}
              <M t="\ket{\psi_1}" />
              .)
            </p>

            <p>
              <strong>Without the sim, predict/calculate</strong> the
              probabilities for measuring spin-up and -down along the
              X-direction:
            </p>
          </Prose>

          <FieldGroup grid className="margin-top-1">
            <Decimal
              model={m.psi1ProbUpX}
              label={<M t="P(S_x = + \frac{\hbar}{2}) =" />}
            />
            <Decimal
              model={m.psi1ProbDownX}
              label={<M t="P(S_x = - \frac{\hbar}{2}) =" />}
            />
          </FieldGroup>

          <Prose>
            <p>
              <strong>
                Then check with the sim—
                <em>but only after you’ve made your prediction!</em>
              </strong>
            </p>
          </Prose>
        </>
      ),
    }),

    section({
      name: "predictionForPsi1Y",
      body: (m) => (
        <>
          <Prose>
            <p>
              Finally, assume your S-G is in the <strong>Y-direction</strong>.
            </p>

            <p>
              <strong>Without the sim, predict/calculate</strong> the
              probabilities for measuring spin-up and -down along the
              Y-direction:
            </p>
          </Prose>

          <FieldGroup grid className="margin-top-1">
            <Decimal
              model={m.psi1ProbUpY}
              label={<M t="P(S_y = + \frac{\hbar}{2}) =" />}
            />
            <Decimal
              model={m.psi1ProbDownY}
              label={<M t="P(S_y = - \frac{\hbar}{2}) =" />}
            />
          </FieldGroup>

          <Prose>
            <p>
              <strong>
                Then check with the sim—
                <em>but only after you’ve made your prediction!</em>
              </strong>
            </p>
          </Prose>

          <Info>
            <Prose>
              <PencilIcon /> &nbsp; You’ll definitely want scrap paper for this
              one.
            </Prose>
          </Info>
        </>
      ),
    }),

    section({
      name: "reflectPsi1",
      body: (m) => (
        <TextArea
          model={m.reflectPsi1}
          label={
            <Prose>
              Do the results make sense to you; did anything seem surprising?
            </Prose>
          }
        />
      ),
    }),
  ],
}));
