import React from "react";
import { QuantumBasis } from "src/common/tutorials";
import { Continue, Prose, Section } from "src/components";
import { TextArea, Toggle } from "src/components/inputs";
import { Content } from "src/components/layout";
import M from "src/components/M";
import { isSet, useFields } from "src/state";
import { ContinueToNextPart, Part } from "src/tutorials/shared";
import { ReactComponent as Car } from "./car.svg";

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
            yes="Horizontal and Vertical axes"
            no="A set of rotated axes"
          />

          <TextArea
            field={f.positionCoordExplain}
            label={<Prose>Justify your choice.</Prose>}
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
            yes="Horizontal and Vertical axes"
            no="A set of rotated axes"
          />

          <TextArea
            field={f.potentialEnergyCoordExplain}
            label={<Prose>Justify you choice.</Prose>}
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
            field={f.coordChoiceEffect}
            label={
              <Prose>
                For the previous two questions, did the choice of coordinate
                system affect the physical scenario of the car?
              </Prose>
            }
            yes="Yes, it changed the physics."
            no="No, the physics was the same."
          />

          <TextArea
            field={f.coordChoiceEffectExplain}
            label={<Prose>Tell us what your thinking.</Prose>}
          />

          <Continue
            commit={f.coordChoiceCommit}
            allowed={
              isSet(f.coordChoiceEffect) && isSet(f.coordChoiceEffectExplain)
            }
          />
        </Section>

        <Section commits={f.coordChoiceCommit}>
          <Prose>
            Now, let's think about changing basis in quantum mechanics.{" "}
          </Prose>

          <TextArea
            field={f.xBasisRewriteReason}
            label={
              <Prose>
                For example, given a spin-1/2 particle (e.g., electron) in a
                state <M t="\ket{\psi}" /> initially written in the z-basis, why
                might you choose to rewrite it in the x-basis?
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
            Consider{" "}
            <M t="\ket{\psi}=\frac{1}{5\sqrt{2}}\ket{+}_x +\frac{7}{5\sqrt{2}}\ket{-}_x =\frac{3}{5}\ket{+}-\frac{4}{5}\ket{-}" />
            .
          </Prose>

          <Toggle
            field={f.basisChoiceMeasureZ}
            label={
              <Prose>
                If you were interest in predicting the outcome of a measurement
                along the z-direction, which representation of the state (which
                basis) would be preferred
              </Prose>
            }
            yes="The middle part of the equation"
            no="The right part"
          />

          <Toggle
            field={f.basisChoiceMeasureX}
            label={
              <Prose>
                What about an outcome of a measurement along the x-direction?
              </Prose>
            }
            yes="The middle part of the equation"
            no="The right part"
          />

          <TextArea
            field={f.basisChoiceExplain}
            label={<Prose>Explain your choices.</Prose>}
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
            yes="Yup!"
            no="Nope!"
          />

          <TextArea
            field={f.effectOfCoBExplain}
            label={<Prose>How so?</Prose>}
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
