import { Prose } from "@/design";
import { cx } from "@/helpers/frontend";
import { Decimal, FieldGroup, TextArea, Toggle } from "@/inputs";
import inputStyles from "@/inputs/inputs.module.scss";
import M from "@/math/M";
import { page } from "@/tutorial";
import { LinkExternalIcon } from "@primer/octicons-react";
import React from "react";
import setup, { ResponseModels, Responses } from "./setup";

export default page(setup, ({ section }) => ({
  name: "anEnergyEigenstate",
  label: "An Energy Eigenstate",
  answers: "none",
  sections: [
    section({
      name: "anEnergyEigenstateIntro",
      body: (
        <>
          <Prose>
            <p>
              For the rest of this tutorial, we’ll use a simulation to explore
              the time evolution of a wave function.
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
              partners what each graph represents and the relationships between
              each pair of graphs. Then continue with the rest of the questions.
            </p>

            <p>
              Feel free to revisit the simulation while answering these
              questions. Don’t worry if you don’t get too far in this
              Tutorial—it’s long, and the important part is to make sense of
              what the sim is showing!
            </p>
          </Prose>
        </>
      ),
    }),

    section({
      name: "simSetup",
      body: (m) => (
        <>
          <Prose>
            Set up the sim to consider (1st) the ground state. Use the bottom
            left stop and step controls as needed.
          </Prose>
        </>
      ),
    }),

    section({
      name: "prevGraphComparison",
      body: (m) => (
        <>
          <TextArea
            model={m.prevGraphComparison}
            label={
              <Prose>
                <p>
                  Explain how the top right graph in the simulation relates to
                  your graph of the time evolution of
                  <M t="\psi_1(x=L/2,t)" /> (question C on the previous page).
                </p>

                <p>
                  Improve your graph if needed; in particular consider the sense
                  of rotation.
                </p>
              </Prose>
            }
          />
        </>
      ),
    }),

    section({
      name: "simGraphComparison",
      body: (m) => (
        <>
          <TextArea
            model={m.simGraphComparison}
            label={
              <Prose>
                <p>
                  Using the checkbox in the Main Controls on the bottom right of
                  the sim, ensure that the top left <M t="\psi(x,t)" /> graph is
                  visible. The time dependence of the ground state is{" "}
                  <M t="\psi_1 (x,t)=\psi_1 (x) e^{-i E_1 t / \hbar}" />.
                </p>

                <p>
                  Explain how the top left wave function graph relates to the
                  top right graph.
                </p>
              </Prose>
            }
          />
        </>
      ),
    }),

    section({
      name: "rotationPeriods",
      body: (m) => (
        <>
          <Prose>
            <p>
              A period is the time for a periodic system to complete one cycle.
            </p>

            <p>
              Using the time display and the top graphs, determine the rotation
              periods
              <M t="T_1" /> and <M t="T_2" /> of <M t="\psi_1" /> and
              <M t="\psi_2" /> respectively. Express these periods below in
              units of
              <M t="h/E_1" />.
            </p>
          </Prose>

          <FieldGroup grid suffixed className="margin-top-1">
            <Decimal model={m.rotationPeriod1} label={<M t="T_1 = " />} />

            <M t="\times \frac{h}{E_1}" />

            <Decimal model={m.rotationPeriod2} label={<M t="T_2 = " />} />

            <M t="\times \frac{h}{E_1}" />
          </FieldGroup>

          <Prose>
            Please note we said <M t="h/E_1" />: Why is that <M t="h" /> is
            correct, but <M t="\hbar" /> (with the bar) is not?
          </Prose>
        </>
      ),
    }),
    section({
      name: "comparePeriodicPsi2",
      body: (m, { responses }) => (
        <>
          <Toggle
            model={m.comparePeriodicPsi2}
            choices={[
              ["same", "They’re identical"],
              ["different", "They’re different"],
            ]}
            label={
              <Prose>
                How do the graphs of <M t="\psi_2" /> at times <M t="t = 0" />{" "}
                and
                <M t="t=T_2" /> compare?
              </Prose>
            }
          />

          {responses?.comparePeriodicPsi2?.selected === "different" && (
            <TextArea
              model={m.comparePeriodicPsi2Difference}
              label={<Prose>Explain the difference you see.</Prose>}
            />
          )}
        </>
      ),
    }),

    section({
      name: "verifyRotationPeriod2",
      body: (m) => (
        <>
          <TextArea
            model={m.verifyRotationPeriod2}
            label={
              <Prose>
                Mathematically, the period is the time <M t="T" /> for which
                <M t="\psi(x,0) = \psi(x,T)" />. Use the value you found
                previously for <M t="T_2" /> to verify this equation for{" "}
                <M t="\psi_2" />.
              </Prose>
            }
          />

          <Prose className="opacity-faded">
            Recall that <M t="E_n = n^2 E_1" /> and <M t="\hbar = h/2 \pi" /> .
          </Prose>
        </>
      ),
    }),

    section({
      name: "studentStatementsOnTimeEvolution",
      body: (m, { responses }) => (
        <>
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
                <M t="\psi_1" /> evolves in time, the wave function rotates in
                the complex plane.
              </>
            }
            agreementModel={m.agreementStudentA}
            agreementResponse={responses?.agreementStudentA}
            explainModel={m.explainStudentA}
          />

          <Agreement
            student="B"
            quote={
              <>
                <M t="\psi_1" /> oscillates up and down like a standing wave..
              </>
            }
            agreementModel={m.agreementStudentB}
            agreementResponse={responses?.agreementStudentB}
            explainModel={m.explainStudentB}
          />

          <Agreement
            student="C"
            quote={
              <>
                <M t="\psi_1" /> does not evolve in time, as this is a
                stationary state.
              </>
            }
            agreementModel={m.agreementStudentC}
            agreementResponse={responses?.agreementStudentC}
            explainModel={m.explainStudentC}
          />

          <Agreement
            student="D"
            quote={
              <>
                <M t="\psi_1" /> dies away with time and tends to zero.
              </>
            }
            agreementModel={m.agreementStudentD}
            agreementResponse={responses?.agreementStudentD}
            explainModel={m.explainStudentD}
          />
        </>
      ),
      continue: {
        allowed: ({ responses }) => {
          const allowedA =
            responses?.agreementStudentA?.selected === "agree" ||
            !!responses?.explainStudentA;
          const allowedB =
            responses?.agreementStudentB?.selected === "agree" ||
            !!responses?.explainStudentB;
          const allowedC =
            responses?.agreementStudentC?.selected === "agree" ||
            !!responses?.explainStudentC;
          const allowedD =
            responses?.agreementStudentD?.selected === "agree" ||
            !!responses?.explainStudentD;
          return allowedA && allowedB && allowedC && allowedD;
        },
      },
    }),
  ],
}));

const Agreement = ({
  student,
  quote,
  agreementModel,
  explainModel,
  agreementResponse,
}: {
  student: string;
  quote: React.ReactNode;
  agreementModel: ResponseModels["agreementStudentA"];
  agreementResponse: Responses["agreementStudentA"];
  explainModel: ResponseModels["explainStudentA"];
}) => {
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
          model={agreementModel}
          choices={[
            ["agree", "I agree"],
            ["disagree", "I disagree"],
          ]}
          layout="vertical"
        />

        <div>
          <TextArea
            model={explainModel}
            placeholder={
              agreementResponse?.selected !== "disagree"
                ? ""
                : "Explain your disagreement"
            }
            aria-label={
              agreementResponse?.selected !== "disagree"
                ? ""
                : "Explain your disagreement"
            }
            disabled={agreementResponse?.selected !== "disagree"}
          />
        </div>
      </div>
    </div>
  );
};
