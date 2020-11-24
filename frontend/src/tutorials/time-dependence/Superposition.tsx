import React from "react";
import { TimeDependence } from "src/common/tutorials";
import { Continue, Prose, Section } from "src/components";
import { TextArea } from "src/components/inputs";
import { Content } from "src/components/layout";
import { Part, sectionComponents } from "../shared";

export default function Superposition() {
  return (
    <Part label="Time Evolution for a superposition of eigenstates">
      <Content>{sections}</Content>
    </Part>
  );
}

const sections = sectionComponents(TimeDependence, [
  (f) => (
    <Section first>
      <Prose>
        <p>
          Set up the sim to consider the state ψ_A= √(1/2) (ψ_1 + ψ_2). Use the
          stop and step controls as needed.
        </p>
      </Prose>

      <Continue commit={f.Part3IntroCommit} />
    </Section>
  ),

  (f) => (
    <Section commits={f.Part3IntroCommit}>
      <TextArea
        field={f.Redline}
        label={
          <Prose>
            What does the red line in the top right wave function graph depict?
          </Prose>
        }
      />
      <Continue commit={f.RedlineCommit} />
    </Section>
  ),
  (f) => (
    <Section commits={f.RedlineCommit}>
      <TextArea
        field={f.ProbDensGraph}
        label={
          <Prose>
            Using the top right graph, explain why the 〖〖|ψ〗_A |〗^2
            probability density graph changes with time.
          </Prose>
        }
      />
      <Continue commit={f.ProbDensGraphCommit} />
    </Section>
  ),
  (f) => (
    <Section commits={f.ProbDensGraphCommit}>
      <TextArea
        field={f.ProbDensMidPoint}
        label={
          <Prose>
            What happens to the 〖〖|ψ〗_A |〗^2 probability density graph at
            the point x=L/2 as time goes by? (You can set the slider to fix
            x=L/2 in the sim) How can you explain this behavior?
          </Prose>
        }
      />
      <Continue commit={f.ProbDensMidPointCommit} />
    </Section>
  ),
  (f) => (
    <Section commits={f.ProbDensMidPointCommit}>
      <TextArea
        field={f.SamePlaneSymmExp}
        label={
          <Prose>
            ) For the next couple questions, we’re going to Generalize your
            results from the table on the previous page. What can you say about
            the symmetry of the function 〖〖|ψ〗_A |〗^2 with respect to L/2
            for instances where: 1) ψ_1and ψ_2 are in the same plane (0 or 180
            degrees out of phase) and
          </Prose>
        }
      />

      {/*Choices with this as same/dif*/}
      <TextArea
        field={f.PerpPlaneSymmExp}
        label={
          <Prose>
            2) ψ_1and ψ_2are in perpendicular planes (90 or 270 degrees out of
            phase).
          </Prose>
        }
      />
      <Continue commit={f.SymmExpCommit} />
    </Section>
  ),
  (f) => (
    <Section commits={f.SymmExpCommit}>
      <TextArea
        field={f.WhyPerpSymmExp}
        label={
          <Prose>
            When ψ_1and ψ_2are in perpendicular planes, the probability density
            〖〖|ψ〗_A (x,t)|〗^2 is symmetric with respect to L/2. Using the
            “Equation for 〖〖|ψ〗_A |〗^2” column in your table, explain how
            this symmetry arises in the probability density even though ψ_2 is
            antisymmetric.
          </Prose>
        }
      />
      <Continue commit={f.WhyPerpSymmExpCommit} />
    </Section>
  ),
  (f) => (
    <Section commits={f.WhyPerpSymmExpCommit}>
      <TextArea
        field={f.SupPeriodEntry}
        label={
          <Prose>
            Using the time display, step controls and the bottom graph, find the
            period of the probability density 〖〖|ψ〗_A |〗^2 (not the
            wavefunction!) in terms of h/E_1 .
          </Prose>
        }
      />
      <TextArea field={f.SupPeriodExp} label={<Prose></Prose>} />
      <Continue commit={f.SupPeriodEntryCommit} />
    </Section>
  ),
]);
