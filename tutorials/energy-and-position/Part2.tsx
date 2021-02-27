import { Continue, Help, HelpButton, Prose, Reminder, Section } from "@/design";
import { Content } from "@/design/layout";
import { range } from "@/helpers/frontend";
import { Choice, TextArea, Toggle } from "@/inputs";
import { choices } from "@/inputs/Select";
import M from "@/math";
import { Axes, Bar, DragHandle, GridLine, Plot, Tick } from "@/plots";
import { isSet, needsHelp } from "@/state";
import { EnergyAndPosition } from "common/tutorials";
import { Fragment } from "react";
import { ContinueToNextPart, Part, sectionComponents } from "tutorials/shared";

export default function Part2() {
  return (
    <Part label="Energy Histogram">
      <Content>{sections}</Content>
    </Part>
  );
}

const graph = {
  width: 360,
  height: 320,
  scale: [360 / 6, 320 / 1.8],
  origin: [1, 0.9],
  barWidth: 0.7,
} as const;

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
        The graph below is a particular visual representation of the the state{" "}
        <M t="\ket{\psi_A}" /> from the previous page. It shows information
        about the state <em>in the energy basis</em>.
      </Prose>

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

      <Continue commit={f.part2IntroCommit} label="Got it" />
    </Section>
  ),

  (f) => (
    <Section commits={f.part2IntroCommit}>
      <TextArea
        model={f.interpretVerticalAxis}
        label={
          <Prose>
            Interpret the vertical values for each bar in the graph. What does
            the vertical axis tell you?
          </Prose>
        }
      />

      <Continue
        commit={f.interpretVerticalAxisCommit}
        allowed={isSet(f.interpretVerticalAxis)}
      />
    </Section>
  ),

  (f) => (
    <Section commits={f.interpretVerticalAxisCommit}>
      <TextArea
        model={f.normalizationMeaning}
        label={
          <Prose>
            Use the graph to check the <em>normalization</em> of{" "}
            <M t="\ket{\psi_A}" />. What does normalization tell you here?
          </Prose>
        }
      />

      <Continue
        commit={f.normalizationMeaningCommit}
        allowed={isSet(f.normalizationMeaning)}
      />
    </Section>
  ),

  (f) => (
    <Section commits={f.normalizationMeaningCommit}>
      <TextArea
        model={f.psiBDifference}
        label={
          <Prose>
            Consider a particle in the quantum state <M t="\ket{\psi_B}" />,
            defined as follows:
            <M
              display
              t="
              \ket{\psi_B}
              = \frac{\sqrt{2}}{\sqrt{6}} \ket{E_1}
              - \frac{\sqrt{3}}{\sqrt{6}} \ket{E_2}
              + \frac{1}{\sqrt{6}} \ket{E_4}
              "
            />
            What (if anything) is <strong>different</strong> here from the state{" "}
            <M t="\ket{\psi_A}" />?
          </Prose>
        }
      />

      <Continue
        commit={f.psiBDifferenceCommit}
        allowed={isSet(f.psiBDifference)}
      />
    </Section>
  ),

  (f) => (
    <Section commits={f.psiBDifferenceCommit}>
      <TextArea
        model={f.psiBMeasurements}
        label={
          <Prose>
            If you make an energy measurement on this new particle (in state{" "}
            <M t="\ket{\psi_B}" />
            ), what results could you get, with what probabilities?
          </Prose>
        }
      />

      <Toggle
        model={f.psiBvsPsiAExpectation}
        label={
          <Prose>
            Is the expectation value of energy for this particle the same, or
            different, from what you got for state <M t="\ket{\psi_A}" />?
          </Prose>
        }
        choices={choices(f.psiBvsPsiAExpectation, {
          same: "The same",
          different: "Different",
        })}
      />

      <Continue
        commit={f.psiBMeasurementsCommit}
        allowed={isSet(f.psiBMeasurements)}
      />
    </Section>
  ),

  (f) => {
    const tupleField = f.psiBBarHeights;

    const snapPoints = [
      0.9,
      1 / Math.sqrt(2),
      1 / Math.sqrt(3),
      1 / Math.sqrt(6),
      0.3,
      0.2,
      0.1,
      0,
      -0.1,
      -0.2,
      -0.3,
      -1 / Math.sqrt(6),
      -1 / Math.sqrt(3),
      -1 / Math.sqrt(2),
      -0.9,
    ];

    return (
      <Section commits={f.psiBMeasurementsCommit}>
        <Prose>
          Make a graph just like the one at the top of the page for this new
          state, <M t="\ket{\psi_B}" />. You can click and drag on the black
          dots to move the bars up and down.
        </Prose>

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

          <Tick y={1 / Math.sqrt(2)} label="1/\sqrt{2}" />
          <Tick y={1 / Math.sqrt(3)} label="1/\sqrt{3}" />
          <Tick y={1 / Math.sqrt(6)} label="1/\sqrt{6}" />

          <Tick y={-1 / Math.sqrt(2)} />
          <Tick y={-1 / Math.sqrt(3)} />
          <Tick y={-1 / Math.sqrt(6)} />

          {range(4).map((i) => {
            const n = i + 1;
            const field = tupleField.elements[i];

            const height = field.value !== undefined ? field.value : 0.1;

            return (
              <Fragment key={i}>
                <Tick
                  x={n}
                  label={`E_${n}`}
                  labelPosition={height >= 0 ? "below" : "above"}
                />

                <Bar
                  x={n}
                  height={height}
                  width={graph.barWidth}
                  opacity={field.value === undefined ? 0.5 : 1}
                  dashed={field.value === undefined}
                />

                <DragHandle
                  direction="y"
                  snapPoints={snapPoints}
                  xDefault={n}
                  yDefault={0.1}
                  yModel={field}
                />
              </Fragment>
            );
          })}
        </Plot>

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

        {needsHelp(f.psiBHistogramTechDifficultiesHelp) && (
          <Help>
            <Prose>
              <p>
                Are you having technical difficulties dragging the bars up and
                down in the graph? Sorry about that! You can now move on without
                finishing the graph. Please make note of this issue on the
                feedback page at the end of the tutorial.
              </p>

              {!isSet(f.psiBBarHeights) && (
                <p>
                  If you‘re not having tech difficulties, please finish the
                  graph before moving on though!
                </p>
              )}
            </Prose>
          </Help>
        )}

        <Continue
          commit={f.psiBHistogramCommit}
          allowed={
            isSet(f.psiBBarHeights) ||
            needsHelp(f.psiBHistogramTechDifficultiesHelp)
          }
        >
          <HelpButton help={f.psiBHistogramTechDifficultiesHelp}>
            Technical difficulties?
          </HelpButton>
        </Continue>
      </Section>
    );
  },

  (f) => (
    <Section commits={f.psiBHistogramCommit}>
      <Choice
        field={f.psiBDifferentFromPsiA}
        label={<Prose>Which of the following do you agree?</Prose>}
        choices={choices(f.psiBDifferentFromPsiA, {
          same: (
            <>
              The second particle is in the SAME state as <M t="\ket{\psi_A}" />
            </>
          ),
          different: (
            <>
              The second particle is in a DIFFERENT state from{" "}
              <M t="\ket{\psi_A}" />
            </>
          ),
        })}
        allowOther={false}
      />

      <TextArea
        model={f.psiBDistinguishableFromPsiA}
        label={
          <Prose>Is there any way, in principle, to distinguish them?</Prose>
        }
      />

      <Continue
        commit={f.psiBDifferentFromPsiACommit}
        allowed={
          isSet(f.psiBDifferentFromPsiA) && isSet(f.psiBDistinguishableFromPsiA)
        }
      />
    </Section>
  ),

  (f) => (
    <Section commits={f.psiBDifferentFromPsiACommit}>
      <ContinueToNextPart commit={f.part2FinalCommit} />
    </Section>
  ),
]);
