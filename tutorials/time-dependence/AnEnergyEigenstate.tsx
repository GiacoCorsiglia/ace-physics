import { Continue, Prose, Section } from "@/design";
import { Content } from "@/design/layout";
import { Decimal, FieldGroup, TextArea, Toggle } from "@/inputs";
import inputStyles from "@/inputs/inputs.module.scss";
import { choices } from "@/inputs/Select";
import M from "@/math";
import { Field, isSet } from "@/state";
import { LinkExternalIcon } from "@primer/octicons-react";
import { ChoiceSchema, StringSchema } from "common/schema";
import { TimeDependence } from "common/tutorials";
import { cx } from "linaria";
import { ContinueToNextPart, Part, sectionComponents } from "tutorials/shared";

export default function AnEnergyEigenstate() {
  return (
    <Part label="Time Evolution for An Energy Eigenstate">
      <Content>{sections}</Content>
    </Part>
  );
}

const sections = sectionComponents(TimeDependence, [
  (f) => (
    <Section first>
      <Prose>
        <p>
          For the rest of this tutorial, we’ll use a simulation to explore the
          time evolution of a wave function.
        </p>
      </Prose>

      <div className="text-center margin-top-1">
        <a
          className={cx(inputStyles.secondary, inputStyles.iconLast)}
          href="https://www.st-andrews.ac.uk/physics/quvis/simulations_html5/sims/TimeDevelopment/TimeDevelopment.html"
          target="_blank"
          rel="noreferrer noopener"
        >
          Open the “Time Development” sim
          <LinkExternalIcon />
        </a>
      </div>

      <Prose>
        <p>
          Play with the simulation for a couple of minutes.{" "}
          <strong>Someone share your screen</strong>, and discuss with your
          partners what each graph represents and the relationships between each
          pair of graphs. Then continue with the rest of the questions.
        </p>

        <p>
          Feel free to revisit the simulation while answering these questions.
          Don’t worry if you don’t get too far in this Tutorial—it’s long, and
          the important part is to make sense of what the sim is showing!
        </p>
      </Prose>

      <Continue commit={f.part2IntroCommit} />
    </Section>
  ),

  (f) => (
    <Section commits={f.part2IntroCommit}>
      <Prose>
        Set up the sim to consider (1st) the ground state. Use the bottom left
        stop and step controls as needed.
      </Prose>

      <Continue commit={f.simSetupCommit} label="It’s set up" />
    </Section>
  ),

  (f) => (
    <Section commits={f.simSetupCommit}>
      <TextArea
        model={f.prevGraphComparison}
        label={
          <Prose>
            <p>
              Explain how the top right graph in the simulation relates to your
              graph of the time evolution of
              <M t="\psi_1(x=L/2,t)" /> (question C on the previous page).
            </p>

            <p>
              Improve your graph if needed; in particular consider the sense of
              rotation.
            </p>
          </Prose>
        }
      />

      <Continue
        commit={f.prevGraphComparisonCommit}
        allowed={isSet(f.prevGraphComparison)}
      />
    </Section>
  ),

  (f) => (
    <Section commits={f.prevGraphComparisonCommit}>
      <TextArea
        model={f.simGraphComparison}
        label={
          <Prose>
            <p>
              Using the checkbox in the Main Controls on the bottom right of the
              sim, ensure that the top left <M t="\psi(x,t)" /> graph is
              visible. The time dependence of the ground state is{" "}
              <M t="\psi_1 (x,t)=\psi_1 (x) e^{-i E_1 t / \hbar}" />.
            </p>

            <p>
              Explain how the top left wave function graph relates to the top
              right graph.
            </p>
          </Prose>
        }
      />

      <Continue
        commit={f.simGraphComparisonCommit}
        allowed={isSet(f.simGraphComparison)}
      />
    </Section>
  ),

  (f) => (
    <Section commits={f.simGraphComparisonCommit}>
      <Prose>
        <p>A period is the time for a periodic system to complete one cycle.</p>

        <p>
          Using the time display and the top graphs, determine the rotation
          periods
          <M t="T_1" /> and <M t="T_2" /> of <M t="\psi_1" /> and
          <M t="\psi_2" /> respectively. Express these periods below in units of
          <M t="h/E_1" />.
        </p>
      </Prose>

      <FieldGroup grid suffixed className="margin-top-1">
        <Decimal model={f.rotationPeriod1} label={<M t="T_1 = " />} />

        <M t="\times \frac{h}{E_1}" />

        <Decimal model={f.rotationPeriod2} label={<M t="T_2 = " />} />

        <M t="\times \frac{h}{E_1}" />
      </FieldGroup>

      <Prose>
        Please note we said <M t="h/E_1" />: Why is that <M t="h" /> is correct,
        but <M t="\hbar" /> (with the bar) is not?
      </Prose>

      <Continue
        commit={f.rotationPeriodsCommit}
        allowed={isSet(f.rotationPeriod1) && isSet(f.rotationPeriod2)}
      />
    </Section>
  ),
  (f) => (
    <Section commits={f.rotationPeriodsCommit}>
      <Toggle
        model={f.comparePeriodicPsi2}
        choices={choices(f.comparePeriodicPsi2, {
          same: "They’re identical",
          different: "They’re different",
        })}
        label={
          <Prose>
            How do the graphs of <M t="\psi_2" /> at times <M t="t = 0" /> and
            <M t="t=T_2" /> compare?
          </Prose>
        }
      />

      {f.comparePeriodicPsi2.value?.selected === "different" && (
        <TextArea
          model={f.comparePeriodicPsi2Difference}
          label={<Prose>Explain the difference you see.</Prose>}
        />
      )}

      <Continue
        commit={f.comparePeriodicPsi2Commit}
        allowed={
          isSet(f.comparePeriodicPsi2) &&
          (f.comparePeriodicPsi2.value.selected !== "different" ||
            isSet(f.comparePeriodicPsi2Difference))
        }
      />
    </Section>
  ),

  (f) => (
    <Section commits={f.comparePeriodicPsi2Commit}>
      <TextArea
        model={f.verifyRotationPeriod2}
        label={
          <Prose>
            Mathematically, the period is the time <M t="T" /> for which
            <M t="\psi(x,0) = \psi(x,T)" />. Use the value you found previously
            for <M t="T_2" /> to verify this equation for <M t="\psi_2" />.
          </Prose>
        }
      />

      <Prose className="opacity-faded">
        Recall that <M t="E_n = n^2 E_1" /> and <M t="\hbar = h/2 \pi" /> .
      </Prose>

      <Continue
        commit={f.verifyRotationPeriod2Commit}
        allowed={isSet(f.verifyRotationPeriod2)}
      />
    </Section>
  ),
  (f) => {
    const allowedA =
      isSet(f.agreementStudentA) &&
      (f.agreementStudentA.value?.selected === "agree" ||
        isSet(f.explainStudentA));
    const allowedB =
      isSet(f.agreementStudentB) &&
      (f.agreementStudentB.value?.selected === "agree" ||
        isSet(f.explainStudentB));
    const allowedC =
      isSet(f.agreementStudentC) &&
      (f.agreementStudentC.value?.selected === "agree" ||
        isSet(f.explainStudentC));
    const allowedD =
      isSet(f.agreementStudentD) &&
      (f.agreementStudentD.value?.selected === "agree" ||
        isSet(f.explainStudentD));

    return (
      <Section commits={f.verifyRotationPeriod2Commit}>
        <Prose>
          <p>
            Do you agree or disagree with each of the following students
            statements?
          </p>

          <p>
            For each incorrect statement, explain how the statement is
            inconsistent with the graphs shown in the simulation and with the
            mathematical expression for <M t="\psi_1" />.
          </p>
        </Prose>

        <Agreement
          student="A"
          quote={
            <>
              <M t="\psi_1" /> evolves in time, the wave function rotates in the
              complex plane.
            </>
          }
          agreementField={f.agreementStudentA}
          explainField={f.explainStudentA}
        />

        <Agreement
          student="B"
          quote={
            <>
              <M t="\psi_1" /> oscillates up and down like a standing wave..
            </>
          }
          agreementField={f.agreementStudentB}
          explainField={f.explainStudentB}
        />

        <Agreement
          student="C"
          quote={
            <>
              <M t="\psi_1" /> does not evolve in time, as this is a stationary
              state.
            </>
          }
          agreementField={f.agreementStudentC}
          explainField={f.explainStudentC}
        />

        <Agreement
          student="D"
          quote={
            <>
              <M t="\psi_1" /> dies away with time and tends to zero.
            </>
          }
          agreementField={f.agreementStudentD}
          explainField={f.explainStudentD}
        />

        <Continue
          commit={f.studentStatementsOnTimeEvolutionCommit}
          allowed={allowedA && allowedB && allowedC && allowedD}
        />
      </Section>
    );
  },

  (f) => (
    <Section commits={f.studentStatementsOnTimeEvolutionCommit}>
      <ContinueToNextPart commit={f.part2FinalCommit} />
    </Section>
  ),
]);

function Agreement({
  student,
  quote,
  agreementField,
  explainField,
}: {
  student: string;
  quote: React.ReactNode;
  agreementField: Field<ChoiceSchema<readonly ["agree", "disagree"]>>;
  explainField: Field<StringSchema>;
}) {
  return (
    <div
      style={{
        borderTop: "1px solid hsl(0, 0, 80%)",
        paddingBottom: "1rem",
        marginTop: "1rem",
      }}
    >
      <Prose>
        <strong>Student {student}:</strong> <em>{quote}</em>
      </Prose>

      <div
        style={{
          marginTop: "1rem",
          display: "grid",
          gridTemplateColumns: "auto 1fr",
          gap: "1rem",
          alignItems: "center",
        }}
      >
        <Toggle
          model={agreementField}
          choices={choices(agreementField, {
            agree: "I agree",
            disagree: "I disagree",
          })}
          vertical
        />

        <div>
          <TextArea
            model={explainField}
            placeholder={
              agreementField.value?.selected !== "disagree"
                ? ""
                : "Explain your disagreement"
            }
            aria-label={
              agreementField.value?.selected !== "disagree"
                ? ""
                : "Explain your disagreement"
            }
            disabled={agreementField.value?.selected !== "disagree"}
          />
        </div>
      </div>
    </div>
  );
}
