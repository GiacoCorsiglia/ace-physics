import { Continue, Prose, Reminder, Section } from "@/design";
import { Content } from "@/design/layout";
import { TextArea, Toggle } from "@/inputs";
import { choices } from "@/inputs/Select";
import M from "@/math";
import { Axes, Curve, Plot, Tick } from "@/plots";
import { isSet } from "@/state";
import { EnergyAndPosition } from "common/tutorials";
import { ContinueToNextPart, Part, sectionComponents } from "tutorials/shared";

export default function PositionRepresentationB() {
  return (
    <Part
      label={
        <>
          Representing <M t="\ket{\psi_B}" /> in the Position Basis
        </>
      }
    >
      <Content>{sections}</Content>
    </Part>
  );
}

const psiB = (x: number) =>
  (1 / Math.sqrt(3)) * Math.sin(x) -
  (1 / Math.sqrt(2)) * Math.sin(2 * x) +
  (1 / Math.sqrt(6)) * Math.sin(4 * x);

const sections = sectionComponents(EnergyAndPosition, [
  (f) => (
    <Section first>
      <Reminder>
        <M
          display
          t="
          \ket{\psi_B}
          = \frac{\sqrt{2}}{\sqrt{6}} \ket{E_1}
          - \frac{\sqrt{3}}{\sqrt{6}} \ket{E_2}
          + \frac{1}{\sqrt{6}} \ket{E_4}
          "
        />
      </Reminder>

      <Prose>
        The position representation (or wave function) of the state
        <M t="\ket{\psi_B}" /> from page 2 is given here:
      </Prose>

      <Plot
        width={360}
        height={320}
        scale={[360 / (Math.PI + 0.3), 320 / 3.2]}
        origin={[0.1, "center"]}
      >
        <Axes xLabel="x" yLabel="\psi_B(x)" />

        <Tick x={Math.PI} length={20} />

        <Curve f={psiB} from={0} to={Math.PI} />
      </Plot>

      <Continue commit={f.part4IntroCommit} label="Looks good" />
    </Section>
  ),

  (f) => (
    <Section commits={f.part4IntroCommit}>
      <Prose>
        Use Zoom’s “annotate” feature to very roughly sketch the probability
        density associated with <M t="\psi_B(x)" />. (Someone in your group
        should share their screen again.)
      </Prose>

      <Plot
        width={360}
        height={320}
        scale={[360 / (Math.PI + 0.3), 320 / 5]}
        origin={[0.1, "center"]}
      >
        <Axes xLabel="x" yLabel="|\psi_B(x)|^2,\,{\color{#999} \psi_B(x)}" />

        <Tick x={Math.PI} length={20} />

        <Curve f={psiB} stroke={"#ddd"} from={0} to={Math.PI} dotted />
      </Plot>

      <Prose>
        <p>
          <strong>Indicate on your graph</strong> where a particle described by{" "}
          <M t="\psi_B(x)" /> would be MOST likely to be found if you measured
          its position, and where it is LEAST likely to be found.
        </p>

        <p>
          <strong>Take a screenshot</strong> of your graph before you move on.
        </p>
      </Prose>

      <Continue
        commit={f.probDensBCommit}
        label="Someone in my group took a screenshot"
      />
    </Section>
  ),

  (f) => (
    <Section commits={f.probDensBCommit}>
      <TextArea
        model={f.compareGraphs}
        label={
          <Prose>
            Compare your graph, and the positions where the particle is most and
            least likely to be found, with what you got for <M t="\psi_A(x)" />.
            (I.e., compare your two screenshots). What is different now?
          </Prose>
        }
      />

      <Continue
        commit={f.compareGraphsCommit}
        allowed={isSet(f.compareGraphs)}
      />
    </Section>
  ),

  (f) => (
    <Section commits={f.compareGraphsCommit}>
      <Toggle
        model={f.psiBExpVal}
        label={
          <Prose>
            Where do you think the expectation value of position for state{" "}
            <M t="\psi_B(x)" /> will be?
          </Prose>
        }
        choices={choices(f.psiBExpVal, {
          left: "Left of center",
          center: "At the center",
          right: "Right of center",
        })}
      />

      <TextArea model={f.psiBExpValExplain} label={<Prose>Why?</Prose>} />

      <Continue
        commit={f.psiBExpValCommit}
        allowed={isSet(f.psiBExpVal) && isSet(f.psiBExpValExplain)}
      />
    </Section>
  ),

  (f) => (
    <Section commits={f.psiBExpValCommit}>
      <TextArea
        model={f.psiBDifferentFromPsiAReflect}
        label={
          <Prose>
            Previously, we asked you if the second particle (in state{" "}
            <M t="\ket{\psi_B}" />) was in the SAME state as{" "}
            <M t="\ket{\psi_A}" />, or if was it in a DIFFERENT state. Is your
            answer modified in any way at this point?
          </Prose>
        }
      />

      <Continue
        commit={f.psiBDifferentFromPsiAReflectCommit}
        allowed={isSet(f.psiBDifferentFromPsiAReflect)}
      />
    </Section>
  ),

  (f) => (
    <Section commits={f.psiBDifferentFromPsiAReflectCommit}>
      <ContinueToNextPart commit={f.part4FinalCommit} />
    </Section>
  ),
]);
