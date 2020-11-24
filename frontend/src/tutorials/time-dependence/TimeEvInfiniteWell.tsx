import React from "react";
import { TimeDependence } from "src/common/tutorials";
import { Continue, Prose, Section } from "src/components";
import { TextArea } from "src/components/inputs";
import { Content } from "src/components/layout";
import M from "src/components/M";
import { Part, sectionComponents } from "../shared";

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
          A particle is in an infinite square well with potential energy V(x) =0
          for <M t="0 < x<L" /> (and is ∞ elsewhere.)
        </p>
        <p>
          {" "}
          The ψ_n x are the spatial parts of the energy eigenfunctions with
          energy values En , such that En = n2E1. Consider a particle in the
          ground state at time t=0 given by ψ_1 (x).
        </p>
      </Prose>

      <Continue commit={f.part1IntroCommit} />
    </Section>
  ),

  (f) => (
    <Section commits={f.part1IntroCommit}>
      <TextArea
        field={f.GroundStateSketch}
        label={
          <Prose>
            Sketch the ground state energy eigenfunction ψ_1 (x) at time t=0.
            Label your axes. Just briefly discuss it below.
          </Prose>
        }
      />
      <Continue commit={f.GroundStateSketchCommit} />
    </Section>
  ),
  (f) => (
    <Section commits={f.GroundStateSketchCommit}>
      <TextArea
        field={f.MidValue}
        label={
          <Prose>
            Draw a vertical line on your graph to indicate the value of ψ_1 (x)
            at the point x = L/2.
          </Prose>
        }
      />
      <Continue commit={f.MidValueCommit} />
    </Section>
  ),
  (f) => (
    <Section commits={f.MidValueCommit}>
      <TextArea
        field={f.GSTimeEv}
        label={
          <Prose>
            Write an expression for the time evolution of the energy
            eigenfunction ψ_1 (x,t) in terms of ψ_1 (x).
          </Prose>
        }
      />
      <Continue commit={f.GSTimeEvCommit} />
    </Section>
  ),
  (f) => (
    <Section commits={f.GSTimeEvCommit}>
      <TextArea
        field={f.TimeEvExp}
        label={
          <Prose>
            Consider ψ_1 at the point x = L/2. Plot the time evolution of ψ_1
            (x=L/2,t) on a graph of the complex plane. (Hint: Try plotting the
            values of e^(-i E_1 t / ħ) for E_1 t/ ħ = 0,π/2,π,3π/2 on the graph
            and interpolate between them.) Describe this time evolution in
            words.
          </Prose>
        }
      />
      <Continue commit={f.TimeEvExpCommit} />
    </Section>
  ),
  (f) => (
    <Section commits={f.TimeEvExpCommit}>
      <TextArea
        field={f.ProbDensPlot}
        label={
          <Prose>
            Now consider the probability density 〖|ψ_1 (x)|〗^2 at the point x
            = L/2. Plot the value of the probability density on the same set of
            axes above for the same times. How is this value related to the
            value of ψ_1?
          </Prose>
        }
      />
      <Continue commit={f.ProbDensPlotCommit} />
    </Section>
  ),
  (f) => (
    <Section commits={f.ProbDensPlotCommit}>
      <TextArea
        field={f.DifTimesPlotExp}
        label={
          <Prose>
            Using e^ix=cos x + i sin xor otherwise, determine e^(-i3π/2). Sketch
            the energy eigenfunction ψ_1 (x,t) for the time where E_1 t/ ħ =
            3π/2 . Label your axes.
          </Prose>
        }
      />
      <Continue commit={f.DifTimesPlotExpCommit} />
    </Section>
  ),
  (f) => (
    <Section commits={f.DifTimesPlotExpCommit}>
      <TextArea
        field={f.WholeFunctionPlotExp}
        label={
          <Prose>
            In question 4a you plotted the time evolution for a single value of
            x of the eigenfunction ψ_1 (x,t). How would you plot the time
            evolution for the entire function using a three-dimensional
            representation? (Just give yourself a minute to think about this –
            then please move on!)
          </Prose>
        }
      />
      <Continue commit={f.WholeFunctionPlotExpCommit} />
    </Section>
  ),
]);
