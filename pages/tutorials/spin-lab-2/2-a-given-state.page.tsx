import {
  Button,
  Callout,
  Decimal,
  Justify,
  LabelsLeft,
  M,
  Prose,
  TextBox,
} from "@/components";
import { page } from "@/tutorial";
import { PencilIcon } from "@primer/octicons-react";
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

          <LabelsLeft>
            <Decimal
              model={m.psi1ProbUpZ}
              label={<M t="P(S_z = + \frac{\hbar}{2}) =" />}
            />
            <Decimal
              model={m.psi1ProbDownZ}
              label={<M t="P(S_z = - \frac{\hbar}{2}) =" />}
            />
          </LabelsLeft>

          <Callout color="blue">
            <PencilIcon /> &nbsp; Don’t be afraid to break out some scrap paper!
          </Callout>
        </>
      ),
    }),

    section({
      name: "experimentForPsi1Z",
      body: (m) => (
        <>
          <Prose>Start up the Stern-Gerlach sim:</Prose>

          <Justify center>
            <Button link="https://tinyurl.com/spin3220" color="blue">
              Open the sim
            </Button>
          </Justify>

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

          <LabelsLeft>
            <Decimal
              model={m.psi1ProbUpX}
              label={<M t="P(S_x = + \frac{\hbar}{2}) =" />}
            />
            <Decimal
              model={m.psi1ProbDownX}
              label={<M t="P(S_x = - \frac{\hbar}{2}) =" />}
            />
          </LabelsLeft>

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

          <LabelsLeft>
            <Decimal
              model={m.psi1ProbUpY}
              label={<M t="P(S_y = + \frac{\hbar}{2}) =" />}
            />
            <Decimal
              model={m.psi1ProbDownY}
              label={<M t="P(S_y = - \frac{\hbar}{2}) =" />}
            />
          </LabelsLeft>

          <Prose>
            <strong>
              Then check with the sim—
              <em>but only after you’ve made your prediction!</em>
            </strong>
          </Prose>

          <Callout color="blue">
            <PencilIcon /> &nbsp; You’ll definitely want scrap paper for this
            one.
          </Callout>
        </>
      ),
    }),

    section({
      name: "reflectPsi1",
      body: (m) => (
        <TextBox
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
