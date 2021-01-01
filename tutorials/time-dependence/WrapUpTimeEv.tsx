import { Continue, Prose, Section } from "@/design";
import { Content } from "@/design/layout";
import { TextArea } from "@/inputs";
import M from "@/math";
import { isSet } from "@/state";
import { TimeDependence } from "common/tutorials";
import { ContinueToNextPart, Part, sectionComponents } from "tutorials/shared";
import graphsImg from "./img/student-graphs.png";

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
        <p>Let’s pull together the things we've learned</p>
      </Prose>

      <Continue commit={f.part4IntroCommit} label="Let’s do it!" />
    </Section>
  ),

  (f) => (
    <Section commits={f.part4IntroCommit}>
      <Prose>
        The following two students’ statements are both incorrect. Explain how
        each statement is inconsistent with the graphs shown in the simulation.
      </Prose>

      <TextArea
        field={f.explainWhyIncorrectStudentA}
        label={
          <Prose>
            <p>
              <strong>Student A:</strong>
            </p>

            <blockquote>
              The wave function has a real and imaginary component, but you only
              need to consider the real component when determining the
              probability density, because the imaginary component disappears
              when you square the wave function.
            </blockquote>

            <p>Explain why this statement is incorrect:</p>
          </Prose>
        }
      />

      <TextArea
        field={f.explainWhyIncorrectStudentB}
        label={
          <Prose>
            <p>
              <strong>Student B:</strong>
            </p>

            <blockquote>
              The time evolution of the wave function <M t="\psi_A" /> is{" "}
              <M
                display
                t="\psi_A (x,t) =
              e^{-iEt/\hbar} ( \psi_1(x) + \psi_2(x) )"
              />
            </blockquote>

            <p>Explain why this statement is incorrect:</p>
          </Prose>
        }
      />

      <Continue
        commit={f.incorrectStatementsWrapUpCommit}
        allowed={
          isSet(f.explainWhyIncorrectStudentA) &&
          isSet(f.explainWhyIncorrectStudentB)
        }
      />
    </Section>
  ),

  (f) => (
    <Section commits={f.incorrectStatementsWrapUpCommit}>
      <Prose>
        <p>
          Consider the following incorrect graphs made by a student to show the
          time evolution of <M t="\psi_A" />, along with an explanation for the
          graphs.
        </p>

        <img
          src={graphsImg}
          alt="Graphs of ψA at 3 at t=0, at a quarter period, and at a half period."
        />

        <blockquote>
          The time evolution of the wave function is that it sloshes back and
          forth along the real axis, in a way that the minimum and maximum
          exchange places.
        </blockquote>
      </Prose>

      <TextArea
        field={f.explainWhyGraphIncorrect}
        label={
          <Prose>Explain why the graphs and explanation are incorrect.</Prose>
        }
      />

      <Continue
        commit={f.explainWhyGraphIncorrectCommit}
        allowed={isSet(f.explainWhyGraphIncorrect)}
      />
    </Section>
  ),

  (f) => (
    <Section commits={f.explainWhyGraphIncorrectCommit}>
      <TextArea
        field={f.connectSimWithCorrectDescription}
        label={
          <Prose>
            <p>
              Consider the following <strong>correct</strong> description of how
              the wave function
              <M t="\psi_A (x,t)" /> evolves with time:
            </p>

            <blockquote>
              The time evolution of <M t="\psi_A" /> has both real and imaginary
              parts that change with time, due to the different rotation
              frequencies of
              <M t="\psi_1" /> and <M t="\psi_1" /> in the complex plane.
            </blockquote>

            <p>How does the simulation illustrate this?</p>
          </Prose>
        }
      />

      <Continue
        commit={f.connectSimWithCorrectDescriptionCommit}
        allowed={isSet(f.connectSimWithCorrectDescription)}
      />
    </Section>
  ),

  (f) => (
    <Section commits={f.connectSimWithCorrectDescriptionCommit}>
      <ContinueToNextPart commit={f.part4FinalCommit} />
    </Section>
  ),
]);
