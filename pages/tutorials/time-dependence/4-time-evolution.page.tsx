import { Image, M, Prose, TextBox } from "@/components";
import { page } from "@/tutorial";
import graphsImg from "./assets/student-graphs.png";
import setup from "./setup";

export default page(setup, ({ section }) => ({
  name: "timeEvolution",
  label: "Wrap Up: Time Evolution",
  answers: "none",
  sections: [
    section({
      name: "timeEvolutionIntro",
      body: (
        <Prose>
          <p>Let’s pull together the things we've learned.</p>
        </Prose>
      ),
      continue: { label: "Let’s do it!" },
    }),

    section({
      name: "incorrectStatementsWrapUp",
      body: (m) => (
        <>
          <Prose>
            The following two students’ statements are both incorrect. Explain
            how each statement is inconsistent with the graphs shown in the
            simulation.
          </Prose>

          <TextBox
            model={m.explainWhyIncorrectStudentA}
            label={
              <Prose>
                <p>
                  <strong>Student A:</strong>
                </p>

                <blockquote>
                  The wave function has a real and imaginary component, but you
                  only need to consider the real component when determining the
                  probability density, because the imaginary component
                  disappears when you square the wave function.
                </blockquote>

                <p>Explain why this statement is incorrect:</p>
              </Prose>
            }
          />

          <TextBox
            model={m.explainWhyIncorrectStudentB}
            label={
              <Prose>
                <p>
                  <strong>Student B:</strong>
                </p>

                <blockquote>
                  The time evolution of the wave function <M t="\psi_A" /> is{" "}
                  <M
                    display
                    t="\psi_A (x,t) = e^{-iEt/\hbar} ( \psi_1(x) + \psi_2(x) )"
                  />
                </blockquote>

                <p>Explain why this statement is incorrect:</p>
              </Prose>
            }
          />
        </>
      ),
    }),

    section({
      name: "explainWhyGraphIncorrect",
      isLegacy: true,
      body: (m) => (
        <>
          <Prose>
            <p>
              Consider the following incorrect graphs made by a student to show
              the time evolution of <M t="\psi_A" />, along with an explanation
              for the graphs.
            </p>

            <Image
              src={graphsImg}
              alt="Graphs of ψA at 3 at t=0, at a quarter period, and at a half period."
            />

            <blockquote>
              The time evolution of the wave function is that it sloshes back
              and forth along the real axis, in a way that the minimum and
              maximum exchange places.
            </blockquote>
          </Prose>

          <TextBox
            model={m.explainWhyGraphIncorrect}
            label={
              <Prose>
                Explain why the graphs and explanation are incorrect.
              </Prose>
            }
          />
        </>
      ),
    }),

    section({
      name: "connectSimWithCorrectDescription",
      body: (m) => (
        <>
          <TextBox
            model={m.connectSimWithCorrectDescription}
            label={
              <Prose>
                <p>
                  Consider the following <strong>correct</strong> description of
                  how the wave function
                  <M t="\psi_A (x,t)" /> evolves with time:
                </p>

                <blockquote>
                  The time evolution of <M t="\psi_A" /> has both real and
                  imaginary parts that change with time, due to the different
                  rotation frequencies of
                  <M t="\psi_1" /> and <M t="\psi_1" /> in the complex plane.
                </blockquote>

                <p>How does the simulation illustrate this?</p>
              </Prose>
            }
          />
        </>
      ),
    }),
  ],
}));
