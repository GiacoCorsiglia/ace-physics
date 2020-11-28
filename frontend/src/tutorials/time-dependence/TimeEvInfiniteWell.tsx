import React from "react";
import { TimeDependence } from "src/common/tutorials";
import { Continue, Hint, Prose, Section } from "src/components";
import { FieldGroup, Text, TextArea } from "src/components/inputs";
import { Content } from "src/components/layout";
import M from "src/components/M";
import { Axes, Label, Plot, WithPlot } from "src/components/plots";
import { isSet } from "src/state";
import { ContinueToNextPart, Part, sectionComponents } from "../shared";

export default function TimeEvInfiniteWell() {
  return (
    <Part label="Time Evolution in the Infinite Square Well Potential">
      <Content>{sections}</Content>
    </Part>
  );
}

const sections = sectionComponents(TimeDependence, [
  (f) => (
    <Section first>
      <Prose>
        <p>
          A particle is in an infinite square well with potential energy
          <M t="V(x) = 0" /> for <M t="0~<~x~<~L" /> (and <M t="\infty" />{" "}
          elsewhere.)
        </p>

        <p>
          The <M t="\psi_n(x)" /> are the spatial parts of the energy
          eigenfunctions with energy values <M t="E_n" />, such that
          <M t="E_n = n^2 E_1" />. Consider a particle in the ground state at
          time t=0 given by <M t="\psi_1(x)" />.
        </p>
      </Prose>

      <Continue commit={f.part1IntroCommit} />
    </Section>
  ),

  (f) => (
    <Section commits={f.part1IntroCommit}>
      <Prose>
        Sketch the ground state energy eigenfunction <M t="\psi_1(x)" /> at time{" "}
        <M t="t=0" />.{" "}
        <strong>Share your screen and use Zoom’s annotation feature.</strong>
      </Prose>

      <Plot width={560} height={400} origin={[0.2, "center"]}>
        <Axes yLabel="\psi_1(x, t=0)" xLabel="x" />
      </Plot>

      <Prose>
        Finally, draw a vertical line on your graph to indicate the value of{" "}
        <M t="\psi_1(x)" />
        at the point <M t="x = L/2" />.
      </Prose>

      <Continue
        commit={f.groundStateSketchCommit}
        label="I drew my vertical line"
      />
    </Section>
  ),

  (f) => (
    <Section commits={f.groundStateSketchCommit}>
      <Prose>
        Write an expression for the time evolution of the energy eigenfunction{" "}
        <M t="\psi_1(x,t)" /> in terms of <M t="\psi_1(x)" />.
      </Prose>

      <FieldGroup grid className="margin-top-1">
        <Text
          field={f.timeEvolvedGroundState}
          label={<M t="\psi_1(x,t) =" />}
        />
      </FieldGroup>

      <Prose className="opacity-faded">
        To type <M t="\psi_1(x)" />, copy-paste this: ψ1(x)
      </Prose>

      <Continue
        commit={f.timeEvolvedGroundStateCommit}
        allowed={isSet(f.timeEvolvedGroundState)}
      />
    </Section>
  ),

  (f) => (
    <Section commits={f.timeEvolvedGroundStateCommit}>
      <Prose>
        <p>
          Consider <M t="\psi_1" /> at the point <M t="x = L/2" />. Plot the
          time evolution of <M t="\psi_1(x=L/2,t)" /> on a graph of the complex
          plane. (Use Zoom annotation again.)
        </p>

        <p>
          <Hint>
            Try plotting the values of
            <M t="e^{-i E_1 t /\hbar}" /> for{" "}
            <M t="E_1 t/ ħ = 0,\pi/2,\pi,3\pi/2" /> on the graph and interpolate
            between them.
          </Hint>
        </p>
      </Prose>

      <Plot width={400} height={400}>
        <Axes yLabel="\text{Im}" xLabel="\text{Re}" />
      </Plot>

      <Prose>
        <strong>Take a screenshot of your graph when you’re done.</strong>
      </Prose>

      <TextArea
        field={f.timeEvolutionDescription}
        label={<Prose>Describe this time evolution in words:</Prose>}
      />

      <Continue
        commit={f.timeEvolutionDescriptionCommit}
        label="I took a screenshot"
        allowed={isSet(f.timeEvolutionDescription)}
      />
    </Section>
  ),

  (f) => (
    <Section commits={f.timeEvolutionDescriptionCommit}>
      <Prose>
        <p>Your plot should be a circle in the complex plane, like below.</p>

        <p>
          Now consider the probability density <M t="|\psi_1(x)|^2" /> at the
          point <M t="x = L/2" />.{" "}
          <strong>Plot the value of the probability density</strong> on these
          same axes for the same times (
          <M t="E_1 t/ ħ = 0,\pi/2,\pi,3\pi/2" prespace={false} />
          ):
        </p>
      </Prose>

      <Plot width={400} height={400}>
        <Axes yLabel="\text{Im}" xLabel="\text{Re}" />

        <WithPlot>
          {(plot) => (
            <>
              <circle
                cx={0}
                cy={0}
                r={plot.x(1.5)}
                fill="none"
                stroke="green"
                strokeWidth={2}
              />
              <circle cx={plot.x(1.5)} cy={0} r={4} fill="green" />
              <circle cx={0} cy={plot.y(1.5)} r={4} fill="green" />
              <circle cx={plot.x(-1.5)} cy={0} r={4} fill="green" />
              <circle cx={0} cy={plot.y(-1.5)} r={4} fill="green" />
            </>
          )}
        </WithPlot>

        <Label
          t="\color{green} \psi(x,t)"
          x={-1.5 / Math.sqrt(2)}
          y={1.5 / Math.sqrt(2)}
          anchor="bottomRight"
        />
      </Plot>

      <TextArea
        field={f.probDensRelationshipToProbAmp}
        label={
          <Prose>
            How is this value related to the value of <M t="\psi_1" />?
          </Prose>
        }
      />

      <Continue
        commit={f.probDensPlotCommit}
        allowed={isSet(f.probDensRelationshipToProbAmp)}
      />
    </Section>
  ),

  (f) => (
    <Section commits={f.probDensPlotCommit}>
      <Prose>
        Using <M t="e^{ix} = \cos x + i \sin x" /> or otherwise, determine
        <M t="e^{-i3\pi/2}" />.
      </Prose>

      <FieldGroup grid className="margin-top-1">
        <Text field={f.exp3PiOver2} label={<M t="e^{i3\pi/2} = " />} />
      </FieldGroup>

      <Prose>
        <p>
          Sketch the energy eigenfunction
          <M t="\psi_1(x,t)" /> for the time where
          <M t="E_1 t/\hbar = 3\pi/2" />.
        </p>

        <p>How should the axes be labeled?</p>
      </Prose>

      <FieldGroup grid className="margin-top">
        <Text field={f.difTimePlotAxisX} label="Horizontal axis label:" />
        <Text field={f.difTimePlotAxisY} label="Vertical axis label:" />
      </FieldGroup>

      <Prose>Now complete the sketch using Zoom annotation.</Prose>

      <Plot width={560} height={400} origin={[0.2, "center"]}>
        <Axes
          xLabel={
            f.difTimePlotAxisX.value
              ? `\\text{${f.difTimePlotAxisX.value.replace(/\\/g, "")}}`
              : undefined
          }
          yLabel={
            f.difTimePlotAxisY.value
              ? `\\text{${f.difTimePlotAxisY.value.replace(/\\/g, "")}}`
              : undefined
          }
        />
      </Plot>

      <Continue
        commit={f.difTimePlotCommit}
        label="I’m done sketching"
        allowed={
          isSet(f.exp3PiOver2) &&
          isSet(f.difTimePlotAxisX) &&
          isSet(f.difTimePlotAxisY)
        }
      />
    </Section>
  ),

  (f) => (
    <Section commits={f.difTimePlotCommit}>
      <TextArea
        field={f.wholeFunctionTimeDependencePlot}
        label={
          <Prose>
            Above, you plotted the time evolution for a single value of
            <M t="x" /> of the eigenfunction <M t="\psi_1(x,t)" />. How would
            you plot the time evolution for the entire function using a
            three-dimensional representation?
          </Prose>
        }
      />

      <Prose className="opacity-faded">
        Just give yourself a minute to think about this—then please move on!
      </Prose>

      <Continue
        commit={f.wholeFunctionTimeDependencePlotCommit}
        allowed={isSet(f.wholeFunctionTimeDependencePlot)}
      />
    </Section>
  ),

  (f) => (
    <Section commits={f.wholeFunctionTimeDependencePlotCommit} noLabel>
      <ContinueToNextPart commit={f.part1FinalCommit} />
    </Section>
  ),
]);
