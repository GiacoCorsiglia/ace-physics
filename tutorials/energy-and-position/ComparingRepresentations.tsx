import { EnergyAndPosition } from "common/tutorials";
import {
  Continue,
  Help,
  HelpButton,
  Prose,
  Reminder,
  Section,
} from "components";
import { TextArea } from "components/inputs";
import { Column, Columns, Content } from "components/layout";
import M from "components/M";
import { Axes, Bar, Curve, GridLine, Plot, Tick } from "components/plots";
import { isSet, needsHelp } from "services/state";
import { ContinueToNextPart, Part, sectionComponents } from "tutorials/shared";

export default function ComparingRepresentations() {
  return (
    <Part label="Comparing Representations">
      <Content>{sections}</Content>
    </Part>
  );
}

// TODO: DRY
const graph = {
  width: 360,
  height: 320,
  scale: [360 / 6, 320 / 1.8],
  origin: [1, 0.9],
  barWidth: 0.7,
} as const;

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
        <p>
          Let’s think again about the original state, <M t="\ket{\psi_A}" />.
        </p>

        <p>
          Here are the two pictorial representations we have been using so far:
        </p>
      </Prose>

      <Columns className="margin-top">
        <Column>
          <Plot
            width={graph.width}
            height={graph.height}
            scale={graph.scale}
            origin={graph.origin}
          >
            <Axes xLabel="E" />

            <GridLine y={1 / Math.sqrt(2)} />
            <GridLine y={1 / Math.sqrt(3)} />
            <GridLine y={1 / Math.sqrt(6)} />
            <GridLine y={-1 / Math.sqrt(2)} />
            <GridLine y={-1 / Math.sqrt(3)} />
            <GridLine y={-1 / Math.sqrt(6)} />

            <Tick x={1} label="E_1" />
            <Tick x={2} label="E_2" />
            <Tick x={3} label="E_3" />
            <Tick x={4} label="E_4" />

            <Tick y={1 / Math.sqrt(2)} label="1/\sqrt{2}" />
            <Tick y={1 / Math.sqrt(3)} label="1/\sqrt{3}" />
            <Tick y={1 / Math.sqrt(6)} label="1/\sqrt{6}" />

            <Tick y={-1 / Math.sqrt(2)} />
            <Tick y={-1 / Math.sqrt(3)} />
            <Tick y={-1 / Math.sqrt(6)} />

            <Bar x={1} height={1 / Math.sqrt(3)} width={graph.barWidth} />
            <Bar x={2} height={1 / Math.sqrt(2)} width={graph.barWidth} />
            <Bar x={4} height={1 / Math.sqrt(6)} width={graph.barWidth} />
          </Plot>
        </Column>

        <Column>
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
        </Column>
      </Columns>

      <Continue commit={f.part5IntroCommit} label="Thanks for the reminder!" />
    </Section>
  ),
  (f) => (
    <Section commits={f.part5IntroCommit}>
      <TextArea
        field={f.sameStateDifRep}
        label={
          <Prose>
            We are claiming these two very different representations show the
            SAME state <M t="\psi_A(x)" />. How can this be, the pictures look
            so different!?
          </Prose>
        }
      />

      {needsHelp(f.sameStateDifRepHelp) && (
        <Help>
          <Prose>
            What do the vertical and horizontal axes represent in each graph?
          </Prose>
        </Help>
      )}

      <Continue
        commit={f.sameStateDifRepCommit}
        allowed={isSet(f.sameStateDifRep)}
      >
        <HelpButton help={f.sameStateDifRepHelp} />
      </Continue>
    </Section>
  ),

  (f) => (
    <Section commits={f.sameStateDifRepCommit}>
      <TextArea
        field={f.inferFromHistRep}
        label={
          <Prose>
            What probabilities or information can you easily infer about this
            state from the E-basis histogram (on the left)?
          </Prose>
        }
      />

      <TextArea
        field={f.inferFromFuncRep}
        label={
          <Prose>What about the wave function graph (on the right)?</Prose>
        }
      />

      <Continue
        commit={f.inferFromRepCommit}
        allowed={isSet(f.inferFromHistRep) && isSet(f.inferFromFuncRep)}
      />
    </Section>
  ),

  (f) => (
    <Section commits={f.inferFromRepCommit}>
      <TextArea
        field={f.oneRepBetter}
        label={
          <Prose>
            Is one representation better (or more complete?) than the other?
          </Prose>
        }
      />

      <Continue commit={f.oneRepBetterCommit} allowed={isSet(f.oneRepBetter)} />
    </Section>
  ),

  (f) => (
    <Section commits={f.oneRepBetterCommit}>
      <ContinueToNextPart commit={f.part5FinalCommit} />
    </Section>
  ),
]);
