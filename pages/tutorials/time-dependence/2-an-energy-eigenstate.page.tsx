import {
  Button,
  ControlGroup,
  Decimal,
  Guidance,
  Justify,
  M,
  Prose,
  TextBox,
  Toggle,
} from "@/components";
import { approxEquals, Html } from "@/helpers/frontend";
import { page } from "@/tutorial";
import setup, { ResponseModels, Responses } from "./setup";

export default page(setup, ({ section, oneOf }) => ({
  name: "anEnergyEigenstate",
  label: "An Energy Eigenstate",
  answers: "checked-some",
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

          <Justify center>
            <Button
              link="https://www.st-andrews.ac.uk/physics/quvis/simulations_html5/sims/TimeDevelopment/TimeDevelopment.html"
              color="blue"
            >
              Open the “Time Development” sim
            </Button>
          </Justify>

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
          <TextBox
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
          <TextBox
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

          <ControlGroup>
            <Decimal model={m.rotationPeriod1} label={<M t="T_1 = " />} />
            <M t="\times \frac{h}{E_1}" />
          </ControlGroup>

          <ControlGroup>
            <Decimal model={m.rotationPeriod2} label={<M t="T_2 = " />} />
            <M t="\times \frac{h}{E_1}" />
          </ControlGroup>

          <Prose>
            Please note we said <M t="h/E_1" />: Why is that <M t="h" /> is
            correct, but <M t="\hbar" /> (with the bar) is not?
          </Prose>
        </>
      ),
    }),

    oneOf({
      which: (r) => {
        const t1Correct = 1;
        const t2Correct = 0.25;
        const t1 = r.rotationPeriod1;
        const t2 = r.rotationPeriod2;

        if (
          t1 === 0.25 * t1Correct ||
          t1 === 2 * t1Correct ||
          t1 === 4 * t1Correct ||
          t2 === 0.25 * t2Correct ||
          t2 === 0.5 * t2Correct ||
          t2 === 2 * t2Correct ||
          t2 === 4 * t2Correct
        ) {
          return "rotationPeriodsOffByFactor";
        } else if (
          !approxEquals(t1, t1Correct) ||
          !approxEquals(t2, t2Correct)
        ) {
          return "rotationPeriodsIncorrect";
        } else if (t1 === t1Correct && t2 === t2Correct) {
          return "rotationPeriodsCorrect";
        } else if (approxEquals(t1, t1Correct) || approxEquals(t2, t2Correct)) {
          return "rotationPeriodsClose";
        }

        return null;
      },
      sections: {
        rotationPeriodsCorrect: section({
          name: "rotationPeriodsCorrect",
          body: (
            <Guidance.Agree>
              Nice—we agree with those values for <M t="T_1" /> and{" "}
              <M t="T_2" />.
            </Guidance.Agree>
          ),
        }),
        rotationPeriodsClose: section({
          name: "rotationPeriodsClose",
          body: (
            <Guidance.Disagree>
              You’re close, but at least one of your values is slightly off.
              Make sure you use the time step arrows and both of the upper plots
              to identify the exact periods.
            </Guidance.Disagree>
          ),
        }),
        rotationPeriodsOffByFactor: section({
          name: "rotationPeriodsOffByFactor",
          body: (
            <Guidance.Disagree>
              You’re close, but at least one of your values is off by a factor
              of 2 or 4.
            </Guidance.Disagree>
          ),
        }),
        rotationPeriodsIncorrect: section({
          name: "rotationPeriodsIncorrect",
          body: (
            <Guidance.Disagree>
              Heads up—at least one of your values is mistaken.
            </Guidance.Disagree>
          ),
        }),
      },
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
            <TextBox
              model={m.comparePeriodicPsi2Difference}
              label={<Prose>Explain the difference you see.</Prose>}
            />
          )}
        </>
      ),
    }),

    oneOf({
      which: (r) =>
        r.comparePeriodicPsi2?.selected === "same"
          ? "comparePeriodicPsi2Correct"
          : "comparePeriodicPsi2Incorrect",
      sections: {
        comparePeriodicPsi2Correct: section({
          name: "comparePeriodicPsi2Correct",
          body: <Guidance.Agree>They look identical to us!</Guidance.Agree>,
        }),
        comparePeriodicPsi2Incorrect: section({
          name: "comparePeriodicPsi2Incorrect",
          body: (
            <Guidance.HeadsUp>
              This software can’t analyze what you’ve written, but the two
              graphs look identical to us! We’re using{" "}
              <M t="T_2 = 0.25 h/E_1" />.
            </Guidance.HeadsUp>
          ),
        }),
      },
    }),

    section({
      name: "verifyRotationPeriod2",
      body: (m) => (
        <>
          <TextBox
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

          <Prose faded>
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

    section({
      name: "studentStatementsOnTimeEvolutionGuidance",
      enumerate: false,
      body: (_, { responses }) => (
        <>
          <OurResponse
            correct={responses?.agreementStudentA?.selected === "agree"}
          >
            agree with Student A. The graph in the upper-left of the sim shows{" "}
            <M t="\psi_1" /> rotating in the complex plane.
          </OurResponse>

          <OurResponse
            correct={responses?.agreementStudentB?.selected === "disagree"}
          >
            disagree with Student B. <M t="\psi_1" /> <strong>rotates</strong>{" "}
            in the complex plane, it does not merely oscillate up and down.
          </OurResponse>

          <OurResponse
            correct={responses?.agreementStudentC?.selected === "disagree"}
          >
            disagree with Student C. <M t="\psi_1" /> rotates in the complex
            plane, which means it evolves in time. That said, <M t="\psi_1" />{" "}
            <strong>is</strong> a stationary state. This means that the
            probability <em>density</em> <M t="|\psi_1|^2" /> (i.e., what you
            can physically measure) does not evolve in time. However, the wave
            function itself still does.
          </OurResponse>

          <OurResponse
            correct={responses?.agreementStudentD?.selected === "disagree"}
          >
            disagree with Student D. <M t="\psi_1" /> is periodic, it does not
            tend towards zero.
          </OurResponse>
        </>
      ),
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
          <TextBox
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

const OurResponse = ({
  correct,
  children,
}: {
  correct: boolean;
  children: Html;
}) => {
  return correct ? (
    <Guidance.Agree>
      <Prose>We also {children}</Prose>
    </Guidance.Agree>
  ) : (
    <Guidance.Disagree>
      <Prose>We {children}</Prose>
    </Guidance.Disagree>
  );
};
