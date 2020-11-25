import React from "react";
import { TimeDependence } from "src/common/tutorials";
import { Continue, Prose, Section } from "src/components";
import { Decimal, FieldGroup, TextArea, Toggle } from "src/components/inputs";
import { choices } from "src/components/inputs/Select";
import { Content } from "src/components/layout";
import M from "src/components/M";
import { isSet } from "src/state";
import { ContinueToNextPart, Part, sectionComponents } from "../shared";

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
        Set up the sim to consider the state
        <M t="\psi_A = \frac{1}{\sqrt{2}} (\psi_1 + \psi_2)" />. Use the{" "}
        <em>stop</em> and <em>step</em> controls as needed.
      </Prose>

      <Continue commit={f.part3IntroCommit} />
    </Section>
  ),

  (f) => (
    <Section commits={f.part3IntroCommit}>
      <TextArea
        field={f.meaningOfRedLineInSim}
        label={
          <Prose>
            What does the red line in the top right wave function graph depict?
          </Prose>
        }
      />

      <Continue
        commit={f.meaningOfRedLineInSimCommit}
        allowed={isSet(f.meaningOfRedLineInSim)}
      />
    </Section>
  ),

  (f) => (
    <Section commits={f.meaningOfRedLineInSimCommit}>
      <TextArea
        field={f.explainTimeDependenceOfProbDens}
        label={
          <Prose>
            Using the top right graph, explain why the <M t="|\psi_A|^2" />{" "}
            probability density graph changes with time.
          </Prose>
        }
      />

      <Continue
        commit={f.explainTimeDependenceOfProbDensCommit}
        allowed={isSet(f.explainTimeDependenceOfProbDens)}
      />
    </Section>
  ),

  (f) => (
    <Section commits={f.explainTimeDependenceOfProbDensCommit}>
      <TextArea
        field={f.behaviorOfProbDensAtMidpoint}
        label={
          <Prose>
            What happens to the <M t="|\psi_A|^2" /> probability density graph
            at the point <M t="x=L/2" /> as time goes by? How can you explain
            this behavior?
          </Prose>
        }
      />

      <Prose className="opacity-faded">
        You can set the slider to fix <M t="x=L/2" /> in the sim
      </Prose>

      <Continue
        commit={f.behaviorOfProbDensAtMidpointCommit}
        allowed={isSet(f.behaviorOfProbDensAtMidpoint)}
      />
    </Section>
  ),

  (f) => (
    <Section commits={f.behaviorOfProbDensAtMidpointCommit}>
      <Prose>TABLE HERE</Prose>
    </Section>
  ),

  (f) => {
    const cs = choices(f.samePlaneSymmetry, {
      symmetric: (
        <>
          <M t="|\psi_A|^2" /> <b>is</b> symmetric about <M t="x = L/2" />
        </>
      ),
      asymmetric: (
        <>
          <M t="|\psi_A|^2" /> is <b>not</b> symmetric in this case
        </>
      ),
    });

    return (
      <Section commits={f.behaviorOfProbDensAtMidpointCommit}>
        <Prose>
          For the next few questions, we’re going to generalize your results
          from the table.
        </Prose>

        <Prose>
          What can you say about the symmetry of the function{" "}
          <M t="|\psi_A|^2" /> with respect to <M t="L/2" /> for the following
          two instances?
        </Prose>

        <Toggle
          field={f.samePlaneSymmetry}
          label={
            <Prose>
              When <M t="\psi_1" /> and <M t="\psi_2" /> are in{" "}
              <strong>the same plane</strong> (0 or 180 degrees out of phase):
            </Prose>
          }
          choices={cs}
        />

        <Toggle
          field={f.perpPlaneSymmetry}
          label={
            <Prose>
              When <M t="\psi_1" /> and <M t="\psi_2" /> are in{" "}
              <strong>perpendicular planes</strong> (90 or 270 degrees out of
              phase):
            </Prose>
          }
          choices={cs}
        />

        <Continue
          commit={f.symmetryCommit}
          allowed={isSet(f.samePlaneSymmetry) && isSet(f.perpPlaneSymmetry)}
        />
      </Section>
    );
  },

  (f) => (
    <Section commits={f.symmetryCommit}>
      <TextArea
        field={f.explainSymmetryWhenPerp}
        label={
          <Prose>
            <p>
              When <M t="\psi_1" /> and <M t="\psi_2" /> are in perpendicular
              planes, the probability density <M t="|\psi_A|^2" /> is symmetric
              with respect to <M t="L/2" />.
            </p>

            <p>
              Using the “Equation for <M t="|\psi_A|^2" />” column in your
              table, explain how this symmetry arises in the probability density
              even though <M t="\psi_2" /> is antisymmetric.
            </p>
          </Prose>
        }
      />

      <Continue
        commit={f.explainSymmetryWhenPerpCommit}
        allowed={isSet(f.explainSymmetryWhenPerp)}
      />
    </Section>
  ),

  (f) => (
    <Section commits={f.explainSymmetryWhenPerpCommit}>
      <Prose>
        Using the time display, step controls, and the bottom graph, find the
        period <M t="T_A" /> of the probability density <M t="|\psi_A|^2" />{" "}
        (not the wave function!) in terms of <M t="h/E_1" />.
      </Prose>

      <FieldGroup grid suffixed className="margin-top-1">
        <Decimal field={f.periodOfProbDens} label={<M t="T_A = " />} />

        <M t="\times \frac{h}{E_1}" />
      </FieldGroup>

      <Prose>
        <em>
          To think about: how does the orientation of the bottom graph relate to
          the orientation of the time-evolving eigenfunctions?
        </em>
      </Prose>

      <Continue
        commit={f.periodOfProbDensCommit}
        allowed={isSet(f.periodOfProbDens)}
      />
    </Section>
  ),

  (f) => (
    <Section commits={f.periodOfProbDensCommit}>
      <ContinueToNextPart commit={f.part3FinalCommit} />
    </Section>
  ),
]);
