import React, { useCallback } from "react";
import { EnergyAndPosition } from "src/common/tutorials";
import { Continue, Prose, Section } from "src/components";
import { TextArea } from "src/components/inputs";
import { Content } from "src/components/layout";
import M from "src/components/M";
import { Axes, Curve, Plot, Tick } from "src/components/plots";
import { Part, sectionComponents } from "../shared";

export default function PositionRepresentationB() {
  return (
    <Part label="Position Representation of B">
      <Content>{sections}</Content>
    </Part>
  );
}
const sections = sectionComponents(EnergyAndPosition, [
  (f) => (
    <Section first>
      <Prose>
        The position representation (or wave function) of the state
        <M t="\ket{\psi_B}" /> from back on page 2 is given here:
      </Prose>

      <Plot
        width={360}
        height={320}
        scale={[360 / (Math.PI + 0.3), 320 / 3.2]}
        origin={[0.1, "center"]}
      >
        <Axes xLabel="x" yLabel="\psi_A(x)" />

        <Tick x={Math.PI} length={20} />

        <Curve
          f={useCallback(
            (x: number) =>
              (1 / Math.sqrt(2)) * Math.sin(x) -
              (1 / Math.sqrt(3)) * Math.sin(2 * x) +
              (1 / Math.sqrt(6)) * Math.sin(4 * x),
            []
          )}
          from={0}
          to={Math.PI}
        />
      </Plot>

      <Continue commit={f.intro4Commit} label="Looks good" />
    </Section>
  ),

  (f) => (
    <Section commits={f.intro4Commit}>
      <TextArea
        field={f.probabilityDensity}
        label={
          <Prose>
            a) Very roughly (in the lower figure), sketch the probability
            density associated with <M t="\psi_B(x)" />.
          </Prose>
        }
      />
      <Continue commit={f.probabilityDensityCommit} />
    </Section>
  ),
  /* As before, we might want to just give it to them. Have them click a button to plot the probability*/

  (f) => (
    <Section commits={f.probabilityDensityCommit}>
      <TextArea
        field={f.mostLikelyLocation}
        label={
          <Prose>
            b) In the lower figure, indicate where a particle described by{" "}
            <M t="\psi_B(x)" /> would be MOST likely to be found if you measured
            its position.
          </Prose>
        }
      />
      <TextArea
        field={f.leastLikelyLocation}
        label={<Prose>where it is LEAST likely to be found.</Prose>}
      />
      <Continue commit={f.LikelyLocationCommit} />
    </Section>
  ),
  /*Same set up from the previous problem */
  (f) => (
    <Section commits={f.LikelyLocationCommit}>
      <TextArea
        field={f.compare2PsiA}
        label={
          <Prose>
            Compare your answers with those you got for <M t="\psi_A(x)" />,
            what is different now?
          </Prose>
        }
      />
      <Continue commit={f.compare2PsiACommit} />
    </Section>
  ),
  /* Explain. Or choices, it’s the same as psi A or it’s different than psiA*/
  (f) => (
    <Section commits={f.compare2PsiACommit}>
      <TextArea
        field={f.EVLocationChoice}
        label={
          <Prose>
            c) Do you think the expectation value of position for state{" "}
            <M t="\psi_B(x)" /> will be at the center, left of center, or right
            of center?
          </Prose>
        }
      />
      <TextArea field={f.EVLocationExplain} label={<Prose>Why?</Prose>} />
      <Continue commit={f.EVLocationCommit} />
    </Section>
  ),
  /*Choices with explain */
  (f) => (
    <Section commits={f.EVLocationCommit}>
      <TextArea
        field={f.sameOrDif}
        label={
          <Prose>
            d) At the bottom of page 2 we asked you if the second particle (in
            state <M t="\ket{\psi_B}" />) was in the SAME state as{" "}
            <M t="\ket{\psi_A}" />, or if was it in a DIFFERENT state. Is your
            answer modified in any way at this point?
          </Prose>
        }
      />
      <Continue commit={f.sameOrDifCommit} />
    </Section>
  ),
  /* Explain. I was thinking about putting is some choice but I don’t think it is needed since they previously thought about it*/
]);
