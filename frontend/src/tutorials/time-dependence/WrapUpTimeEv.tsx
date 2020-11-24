import React from "react";
import { TimeDependence } from "src/common/tutorials";
import { Continue, Prose, Section } from "src/components";
import { TextArea } from "src/components/inputs";
import { Content } from "src/components/layout";
import { Part, sectionComponents } from "../shared";

export default function WrapUpTimeEv() {
  return (
    <Part label="Wrap Up: Time evolution">
      <Content>{sections}</Content>
    </Part>
  );
}

const sections = sectionComponents(TimeDependence, [
  (f) => (
    <Section first>
      <Prose>
        <p>Let us pull together the things we've learned</p>
      </Prose>

      <Continue commit={f.part4IntroCommit} />
    </Section>
  ),

  (f) => (
    <Section commits={f.part4IntroCommit}>
      <Prose>
        The following two students’ statements are both incorrect. Explain how
        each statement is inconsistent with the graphs shown in the simulation.
      </Prose>
      <TextArea
        field={f.StudAWrapUp}
        label={
          <Prose>
            Student A: “The wave function has a real and imaginary component,
            but you only need to consider the real component when determining
            the probability density, because the imaginary component disappears
            when you square the wave function.”
          </Prose>
        }
      />
      <TextArea
        field={f.StudBWrapUp}
        label={
          <Prose>
            Student B: “The time evolution of the wave function ψ_A is ψ_A (x,t)
            = e^(-iEt/ħ ) (ψ_1 (x) +ψ_2 (x) ) .”
          </Prose>
        }
      />
      <Continue commit={f.StudWrapUpCommit} />
    </Section>
  ),
  (f) => (
    <Section commits={f.StudWrapUpCommit}>
      <TextArea
        field={f.GraphDisWrapUp}
        label={
          <Prose>
            Consider the following incorrect graphs made by a student to show
            the time evolution of . Explain why the graphs and explanation are
            incorrect. “The time evolution of the wave function is that it
            sloshes back and forth along the real axis, in a way that the
            minimum and maximum exchange places.”
          </Prose>
        }
      />
      <Continue commit={f.GraphDisWrapUpCommit} />
    </Section>
  ),
  (f) => (
    <Section commits={f.GraphDisWrapUpCommit}>
      <TextArea
        field={f.DesripDiscuss}
        label={
          <Prose>
            Consider the following correct description of how the wave function
            ψ_A (x,t) evolves with time:“The time evolution of ψ_A has both real
            and imaginary parts that change with time, due to the different
            rotation frequencies of ψ_1and ψ_2 in the complex plane.” How does
            the simulation illustrate this?
          </Prose>
        }
      />
      <Continue commit={f.DesripDiscussCommit} />
    </Section>
  ),
]);
