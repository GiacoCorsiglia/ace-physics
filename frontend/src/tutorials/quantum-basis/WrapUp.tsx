import React from "react";
import { QuantumBasis } from "src/common/tutorials";
import { Continue, Prose, Section } from "src/components";
import { TextArea, Toggle } from "src/components/inputs";
import { Content } from "src/components/layout";
import M from "src/components/M";
import { useFields } from "src/state";
import { Part } from "src/tutorials/shared";
export default function WrapUp() {
  const f = useFields(QuantumBasis);
  const {
    positionCoord,
    positionCoordExplain,
    positionCoordCommit,

    potentialEnergyCoord,
    potentialEnergyCoordExplain,
    potentialEnergyCoordCommit,

    coordChoiceEffect,
    coordChoiceEffectExplain,
    coordChoiceCommit,

    xBaseRewrite,
    xBasisRewriteNewInfo,
    xBaseRewriteCommit,

    repX,
    repZ,
    repExplain,
    repCommit,

    CoBEfect,
    CoBEffectExplain,
    whyCoB,
    whyCoBCommit,
  } = f;

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

          {/*Making everything a text area for easy right now!*/}

          <TextArea
            field={positionCoord}
            label={
              <Prose>
                Which coordinate system would you use to track the postion along
                the hill?
              </Prose>
            }
          />

          <TextArea
            field={positionCoordExplain}
            label={<Prose>Justify you choice.</Prose>}
          />

          <Continue commit={positionCoordCommit} />
        </Section>

        <Section commits={[positionCoordCommit]}>
          <TextArea
            field={potentialEnergyCoord}
            label={
              <Prose>
                Now consider this: Which coordinate system would you use to
                easily measure the gravitational potential energy of the car?
              </Prose>
            }
          />
          <TextArea
            field={potentialEnergyCoordExplain}
            label={<Prose>Justify you choice.</Prose>}
          />
          <Continue commit={potentialEnergyCoordCommit} />
        </Section>
        <Section commits={[positionCoordCommit, potentialEnergyCoordCommit]}>
          <Toggle
            field={coordChoiceEffect}
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
            field={coordChoiceEffectExplain}
            label={<Prose>Tell us what your thinking.</Prose>}
          />
          <Continue commit={coordChoiceCommit} />
        </Section>
        <Section
          commits={[
            positionCoordCommit,
            potentialEnergyCoordCommit,
            coordChoiceCommit,
          ]}
        >
          <Prose>
            Now, let's think about changing basis in quantum mechanics.{" "}
          </Prose>
          <TextArea
            field={xBaseRewrite}
            label={
              <Prose>
                For example, given a spin-1/2 particle (e.g., electron) in a
                state <M t="\ket{\psi}" /> initially written in the z-basis, why
                might you choose to rewrite it in the x-basis?
              </Prose>
            }
          />
          <TextArea
            field={xBasisRewriteNewInfo}
            label={
              <Prose>
                What new information would the rewritten state reveal?
              </Prose>
            }
          />
          <Continue commit={xBaseRewriteCommit} />
        </Section>

        <Section
          commits={[
            potentialEnergyCoordCommit,
            positionCoordCommit,
            coordChoiceCommit,
            xBaseRewriteCommit,
          ]}
        >
          <Prose>
            Consider{" "}
            <M t="\ket{\psi}=\frac{1}{5\sqrt{2}}\ket{+}_x +\frac{7}{5\sqrt{2}}\ket{-}_x =\frac{3}{5}\ket{+}-\frac{4}{5}\ket{-}" />
            .
          </Prose>
          <Toggle
            field={repZ}
            label={
              <Prose>
                If you were interest in predicting the outcome of a measurement
                along the z-direction, which representation of the state (which
                basis) would be preferred
              </Prose>
            }
            yes="The middle part"
            no="The right part"
          />
          <Toggle
            field={repX}
            label={
              <Prose>
                What about an outcome of a measurement along the x-direction?
              </Prose>
            }
            yes="The middle part"
            no="The right part"
          />
          <TextArea field={repExplain} label={<Prose>Explain.</Prose>} />
          <Continue commit={repCommit} />
        </Section>

        <Section
          commits={[
            positionCoordCommit,
            potentialEnergyCoordCommit,
            coordChoiceCommit,
            xBaseRewriteCommit,
            repCommit,
          ]}
        >
          <Toggle
            field={CoBEfect}
            label={
              <Prose>
                Does changing the basis representation change the physical state
                of the particle?
              </Prose>
            }
            yes="Yup!"
            no="Nope!"
          />

          <TextArea field={CoBEffectExplain} label={<Prose>How so?</Prose>} />
          <TextArea
            field={whyCoB}
            label={
              <Prose>
                Why might you want to write a state in a different basis?
              </Prose>
            }
          />
          <Continue commit={whyCoBCommit} />
        </Section>
      </Content>
    </Part>
  );
}
