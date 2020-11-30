import { EnergyAndPosition } from "common/tutorials";
import { Continue, Prose, Reminder, Section, Vocabulary } from "components";
import { TextArea, Toggle } from "components/inputs";
import { choices } from "components/inputs/Select";
import { Content } from "components/layout";
import M from "components/M";
import { Axes, Curve, Plot, Tick } from "components/plots";
import { isSet } from "services/state";
import { ContinueToNextPart, Part, sectionComponents } from "tutorials/shared";

export default function PositionRepresentationA() {
  return (
    <Part
      label={
        <>
          Representing <M t="\ket{\psi_A}" /> in the Position Basis
        </>
      }
    >
      <Content>{sections}</Content>
    </Part>
  );
}

const psiA = (x: number) =>
  (1 / Math.sqrt(3)) * Math.sin(x) +
  (1 / Math.sqrt(2)) * Math.sin(2 * x) +
  (1 / Math.sqrt(6)) * Math.sin(4 * x);

const sections = sectionComponents(EnergyAndPosition, [
  (f) => (
    <Section first>
      <Reminder>
        <M
          display
          t="
          \ket{\psi_A}
          = \frac{\sqrt{2}}{\sqrt{6}} \ket{E_1}
          + \frac{\sqrt{3}}{\sqrt{6}} \ket{E_2}
          + \frac{1}{\sqrt{6}} \ket{E_4}
          "
        />
      </Reminder>

      <Prose>
        A <em>different representation</em> of our original starting state
        <M t="\ket{\psi_A}" /> is given here. This is called the “position
        representation” or the “wave function representation.”
      </Prose>

      <Plot
        width={360}
        height={320}
        scale={[360 / (Math.PI + 0.3), 320 / 3.2]}
        origin={[0.1, "center"]}
      >
        <Axes xLabel="x" yLabel="\psi_A(x)" />

        <Tick x={Math.PI} length={20} />

        <Curve f={psiA} from={0} to={Math.PI} />
      </Plot>

      <Continue commit={f.part3IntroCommit} label="Looks good" />
    </Section>
  ),

  (f) => (
    <Section commits={f.part3IntroCommit}>
      <TextArea
        field={f.infoFromGraph}
        label={
          <Prose>
            What information can you infer about this state from the graph?
          </Prose>
        }
      />

      <Continue
        commit={f.infoFromGraphCommit}
        allowed={isSet(f.infoFromGraph)}
      />
    </Section>
  ),

  /*Graph is just a picture. Explain box. Hint asks them to think about the the
  axes and what they can possible measure */

  (f) => (
    <Section commits={f.infoFromGraphCommit}>
      <Prose>
        <p>
          Given any wave function <M t="\psi(x)" />, we define the{" "}
          <Vocabulary>probability density</Vocabulary> to be
          <M t="|\psi(x)|^2" />.
        </p>

        <p>
          Someone in your group should share their screen. Then,{" "}
          <strong>
            use Zoom’s “annotate” feature to very roughly sketch the probability
            density associated with <M t="\psi_A(x)" />
          </strong>
          .
        </p>
      </Prose>

      <Plot
        width={360}
        height={320}
        scale={[360 / (Math.PI + 0.3), 320 / 5]}
        origin={[0.1, "center"]}
      >
        <Axes xLabel="x" yLabel="|\psi_A(x)|^2,\,{\color{#999} \psi_A(x)}" />

        <Tick x={Math.PI} length={20} />

        <Curve f={psiA} stroke={"#ddd"} from={0} to={Math.PI} dotted />
      </Plot>

      <Prose>
        <p>
          <strong>Indicate on your graph</strong> where a particle described by{" "}
          <M t="\psi_A(x)" /> would be MOST likely to be found if you measured
          its position, and where it is LEAST likely to be found.
        </p>

        <p>
          <strong>Take a screenshot</strong> of your graph before you move on.
        </p>
      </Prose>

      <Continue
        commit={f.probDensACommit}
        label="Someone in my group took a screenshot"
      />
    </Section>
  ),

  /*We might just have to do something where we give them the probability
  density (click a button to probability density) and then just isolate regions
  and ask them where it is most likely and least likely. I don’t think there is
  any way to get them to graph or that it would be worth it to do that. Two drop
  down menus with each */

  (f) => (
    <Section commits={f.probDensACommit}>
      <Prose>
        <p>
          Some students are discussing their thoughts about the question{" "}
          <em>
            “what is the probability that a measurement of position on a
            particle in state
            <M t="\ket{\psi_A}" /> will result in a value within <M t="dx" /> of
            <M t="x_0" />
            ?”
          </em>
        </p>

        <blockquote>
          <strong>Student A:</strong> Isn’t that exactly what{" "}
          <M t="\psi(x_0)" /> tells you?
        </blockquote>

        <blockquote>
          <strong>Student B:</strong> No, I think the probability is{" "}
          <M t="|\psi_A(x_0)|^2" />
        </blockquote>

        <blockquote>
          <strong>Student C:</strong> I feel like we need to include{" "}
          <M t="dx" /> somehow. Isn’t the answer the area under the wave
          function?
        </blockquote>
      </Prose>

      <TextArea
        field={f.studentInterpretationsProbDens}
        label={<Prose>What do you think about these responses? </Prose>}
      />

      <TextArea
        field={f.correctInterpretationProbDens}
        label={<Prose> Can you help firm up a fully correct answer?</Prose>}
      />

      <Continue
        commit={f.interpretProbDensCommit}
        allowed={
          isSet(f.studentInterpretationsProbDens) &&
          isSet(f.correctInterpretationProbDens)
        }
      />
    </Section>
  ),

  (f) => (
    <Section commits={f.interpretProbDensCommit}>
      <Toggle
        field={f.psiAExpVal}
        label={
          <Prose>
            Where do you think the expectation value of position for state{" "}
            <M t="\psi_A(x)" /> will be?
          </Prose>
        }
        choices={choices(f.psiAExpVal, {
          left: "Left of center",
          center: "At the center",
          right: "Right of center",
        })}
      />

      <TextArea field={f.psiAExpValExplain} label={<Prose>Why?</Prose>} />

      <Continue
        commit={f.psiAExpValCommit}
        allowed={isSet(f.psiAExpVal) && isSet(f.psiAExpValExplain)}
      />
    </Section>
  ),
  /*Choices. Hint The expectation value in discrete cases is EQUATION. How can
  we apply that in wave function notation */

  (f) => (
    <Section commits={f.psiAExpValCommit}>
      <Toggle
        field={f.psiAPosEigenstate}
        label={
          <Prose>
            Is a particle described by <M t="\psi_A(x)" /> in an eigenstate of
            position?
          </Prose>
        }
        choices={choices(f.psiAPosEigenstate, {
          "position eigenstate": "Yes, it is",
          "not position eigenstate": "No, it isn’t",
        })}
      />
      <TextArea
        field={f.psiAPosEigenstateExplain}
        label={<Prose>Why or why not?</Prose>}
      />
      <Continue commit={f.psiAPosEigenstateCommit} />
    </Section>
  ),

  (f) => (
    <Section commits={f.psiAPosEigenstateCommit}>
      <ContinueToNextPart commit={f.part3FinalCommit} />
    </Section>
  ),
  /*Yes/No with explain. If they answer it wrong we can have a follow up question about  what an eigenstate of position would look like: function, spike*/
]);
