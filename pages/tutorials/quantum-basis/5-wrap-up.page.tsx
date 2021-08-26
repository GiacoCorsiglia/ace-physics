import { M, Prose, TextBox, Toggle } from "@/components";
import { page } from "@/tutorial";
import Car from "./assets/car.svg";
import setup from "./setup";
import styles from "./styles.module.scss";

export default page(setup, ({ section }) => ({
  name: "wrapUp",
  label: "Wrap Up",
  answers: "none",
  sections: [
    section({
      name: "wrapUpIntro",
      body: (
        <>
          <Prose>
            Let’s think about what we've learned about the meaning and
            usefulness of changing basis.
          </Prose>

          <M t="" />

          <Prose>
            Consider a problem from classical mechanics involving a car driving
            down a hill.
          </Prose>

          <Car className={styles.carFigure} />
        </>
      ),
    }),

    section({
      name: "positionCoord",
      body: (m) => (
        <>
          <Toggle
            model={m.positionCoord}
            label={
              <Prose>
                Which coordinate system would you use to track the car’s
                position along the hill?
              </Prose>
            }
            choices={coordChoices}
          />

          <TextBox
            model={m.positionCoordExplain}
            label={<Prose>Justify your choice:</Prose>}
          />
        </>
      ),
    }),

    section({
      name: "potentialEnergyCoord",
      body: (m) => (
        <>
          <Toggle
            model={m.potentialEnergyCoord}
            label={
              <Prose>
                Now consider this: Which coordinate system would you use to
                easily measure the gravitational potential energy of the car?
              </Prose>
            }
            choices={coordChoices}
          />

          <TextBox
            model={m.potentialEnergyCoordExplain}
            label={<Prose>Justify your choice:</Prose>}
          />
        </>
      ),
    }),

    section({
      name: "coordEffect",
      body: (m) => (
        <>
          <Toggle
            model={m.coordEffect}
            label={
              <Prose>
                For the previous two questions, did the choice of coordinate
                system affect the physical scenario of the car?
              </Prose>
            }
            choices={[
              ["has effect", "Yes, it changed the physics."],
              ["no effect", "No, the physics was the same."],
            ]}
          />

          <TextBox
            model={m.coordEffectExplain}
            label={<Prose>Tell us what you‘re thinking:</Prose>}
          />
        </>
      ),
    }),

    section({
      name: "xBasisRewrite",
      body: (m) => (
        <>
          <Prose>
            Now, let’s think about changing basis in quantum mechanics.
          </Prose>

          <TextBox
            model={m.xBasisRewriteReason}
            label={
              <Prose>
                For example, given a spin-½ particle (e.g., electron) in a state{" "}
                <M t="\ket{\psi}" /> initially written in the <em>z</em>-basis,
                why might you choose to rewrite it in the <em>x</em>-basis?
              </Prose>
            }
          />

          <TextBox
            model={m.xBasisRewriteNewInfo}
            label={
              <Prose>
                What new information would the rewritten state reveal?
              </Prose>
            }
          />
        </>
      ),
    }),

    section({
      name: "basisChoice",
      body: (m) => (
        <>
          <Prose>
            Consider:
            <M
              display
              t="
              \ket{\psi}
              = \underbrace{\frac{1}{5\sqrt{2}}\ket{+}_x +\frac{7}{5\sqrt{2}}\ket{-}_x}_{A}
              = \underbrace{\frac{3}{5}\ket{+}-\frac{4}{5}\ket{-}}_{B}
              "
            />
          </Prose>

          <Toggle
            model={m.basisChoiceMeasureZ}
            label={
              <Prose>
                If you were interested in predicting the outcome of a
                measurement along the <em>z</em>-direction, which representation
                of the state (which basis) would be preferred?
              </Prose>
            }
            choices={basisChoices}
          />

          <Toggle
            model={m.basisChoiceMeasureX}
            label={
              <Prose>
                What about an outcome of a measurement along the <em>x</em>
                -direction?
              </Prose>
            }
            choices={basisChoices}
          />

          <TextBox
            model={m.basisChoiceExplain}
            label={<Prose>Explain your choices:</Prose>}
          />
        </>
      ),
    }),

    section({
      name: "effectOfCoB",
      body: (m) => (
        <>
          <Toggle
            model={m.effectOfCoB}
            label={
              <Prose>
                Does changing the basis representation change the physical state
                of the particle?
              </Prose>
            }
            choices={[
              ["has effect", "Yup!"],
              ["no effect", "Nope!"],
            ]}
          />

          <TextBox
            model={m.effectOfCoBExplain}
            label={<Prose>If yes, how so? If not, why not?</Prose>}
          />
        </>
      ),
    }),

    section({
      name: "whyCoB",
      body: (m) => (
        <TextBox
          model={m.whyCoB}
          label={
            <Prose>
              Why might you want to write a state in a different basis?
            </Prose>
          }
        />
      ),
    }),
  ],
}));

const coordChoices = [
  ["standard", "Horizontal and vertical axes"],
  ["rotated", "A set of rotated axes"],
] as const;

const basisChoices = [
  ["x-basis", "(A) The middle part of the equation"],
  ["z-basis", "(B) The right part"],
] as const;
