import { Continue, Prose, Section } from "@/design";
import { Content } from "@/design/layout";
import { TextArea, Toggle } from "@/inputs";
import M from "@/math";
import { isSet, useFields } from "@/state";
import { QuantumBasis } from "common/tutorials";
import { ContinueToNextPart, Part } from "tutorials/shared";
import Car from "./car.svg";

export default function WrapUp() {
  const f = useFields(QuantumBasis);

  return (
    <Part label="Wrapping up">
      <Content>
        <Section first>
          <Prose>
            Let’s think about what we've learned about the meaning and
            usefulness of changing basis.
          </Prose>

          <Prose>
            Consider a problem from classical mechanics involving a car driving
            down a hill.
          </Prose>

          <Car
            style={{
              display: "block",
              margin: "1rem auto 0",
              width: "100%",
              maxWidth: "266px",
              height: "auto",
              border: "1px solid #b3b3b3",
              borderRadius: "3px",
            }}
          />

          <Continue commit={f.wrapUpIntroCommit} />
        </Section>

        <Section commits={f.wrapUpIntroCommit}>
          <Toggle
            field={f.positionCoord}
            label={
              <Prose>
                Which coordinate system would you use to track the car’s
                position along the hill?
              </Prose>
            }
            choices={coordChoices}
          />

          <TextArea
            field={f.positionCoordExplain}
            label={<Prose>Justify your choice:</Prose>}
          />

          <Continue
            commit={f.positionCoordCommit}
            allowed={isSet(f.positionCoord) && isSet(f.positionCoordExplain)}
          />
        </Section>

        <Section commits={f.positionCoordCommit}>
          <Toggle
            field={f.potentialEnergyCoord}
            label={
              <Prose>
                Now consider this: Which coordinate system would you use to
                easily measure the gravitational potential energy of the car?
              </Prose>
            }
            choices={coordChoices}
          />

          <TextArea
            field={f.potentialEnergyCoordExplain}
            label={<Prose>Justify your choice:</Prose>}
          />

          <Continue
            commit={f.potentialEnergyCoordCommit}
            allowed={
              isSet(f.potentialEnergyCoord) &&
              isSet(f.potentialEnergyCoordExplain)
            }
          />
        </Section>

        <Section commits={f.potentialEnergyCoordCommit}>
          <Toggle
            field={f.coordEffect}
            label={
              <Prose>
                For the previous two questions, did the choice of coordinate
                system affect the physical scenario of the car?
              </Prose>
            }
            choices={coordEffectChoices}
          />

          <TextArea
            field={f.coordEffectExplain}
            label={<Prose>Tell us what you‘re thinking:</Prose>}
          />

          <Continue
            commit={f.coordEffectCommit}
            allowed={isSet(f.coordEffect) && isSet(f.coordEffectExplain)}
          />
        </Section>

        <Section commits={f.coordEffectCommit}>
          <Prose>
            Now, let’s think about changing basis in quantum mechanics.
          </Prose>

          <TextArea
            field={f.xBasisRewriteReason}
            label={
              <Prose>
                For example, given a spin-½ particle (e.g., electron) in a state{" "}
                <M t="\ket{\psi}" /> initially written in the <em>z</em>-basis,
                why might you choose to rewrite it in the <em>x</em>-basis?
              </Prose>
            }
          />

          <TextArea
            field={f.xBasisRewriteNewInfo}
            label={
              <Prose>
                What new information would the rewritten state reveal?
              </Prose>
            }
          />

          <Continue
            commit={f.xBaseRewriteCommit}
            allowed={
              isSet(f.xBasisRewriteReason) && isSet(f.xBasisRewriteNewInfo)
            }
          />
        </Section>

        <Section commits={f.xBaseRewriteCommit}>
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
            field={f.basisChoiceMeasureZ}
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
            field={f.basisChoiceMeasureX}
            label={
              <Prose>
                What about an outcome of a measurement along the <em>x</em>
                -direction?
              </Prose>
            }
            choices={basisChoices}
          />

          <TextArea
            field={f.basisChoiceExplain}
            label={<Prose>Explain your choices:</Prose>}
          />

          <Continue
            commit={f.basisChoiceCommit}
            allowed={
              isSet(f.basisChoiceMeasureZ) &&
              isSet(f.basisChoiceMeasureX) &&
              isSet(f.basisChoiceExplain)
            }
          />
        </Section>

        <Section commits={f.basisChoiceCommit}>
          <Toggle
            field={f.effectOfCoB}
            label={
              <Prose>
                Does changing the basis representation change the physical state
                of the particle?
              </Prose>
            }
            choices={effectOfCoBChoices}
          />

          <TextArea
            field={f.effectOfCoBExplain}
            label={<Prose>If yes, how so? If not, why not?</Prose>}
          />

          <Continue
            commit={f.effectOfCoBCommit}
            allowed={isSet(f.effectOfCoB) && isSet(f.effectOfCoBExplain)}
          />
        </Section>

        <Section commits={f.effectOfCoBCommit}>
          <TextArea
            field={f.whyCoB}
            label={
              <Prose>
                Why might you want to write a state in a different basis?
              </Prose>
            }
          />

          <Continue commit={f.whyCoBCommit} allowed={isSet(f.whyCoB)} />
        </Section>

        <Section commits={f.whyCoBCommit}>
          <ContinueToNextPart commit={f.wrapUpFinalCommit} />
        </Section>
      </Content>
    </Part>
  );
}

const coordChoices = [
  { value: "standard", label: "Horizontal and vertical axes" },
  { value: "rotated", label: "A set of rotated axes" },
] as const;

const coordEffectChoices = [
  { value: "has effect", label: "Yes, it changed the physics." },
  { value: "no effect", label: "No, the physics was the same." },
] as const;

const basisChoices = [
  { value: "x-basis", label: "(A) The middle part of the equation" },
  { value: "z-basis", label: "(B) The right part" },
] as const;

const effectOfCoBChoices = [
  { value: "has effect", label: "Yup!" },
  { value: "no effect", label: "Nope!" },
] as const;
