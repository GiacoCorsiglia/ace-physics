import {
  Answer,
  Callout,
  Horizontal,
  M,
  Prose,
  QuantumCircuit,
  TextBox,
  Toggle,
} from "@/components";
import { page } from "@/tutorial";
import setup from "./setup";

export default page(setup, ({ section }) => ({
  name: "anEntangledBasis",
  label: "An Entangled Basis",
  answers: "provided",
  cheatSheet: {
    body: (
      <M
        display
        t="
        \begin{aligned}
          \ket{\beta_{00}} &= \frac{1}{\sqrt{2}} (\ket{00} + \ket{11}) \\
          \ket{\beta_{01}} &= \frac{1}{\sqrt{2}} (\ket{01} + \ket{10}) \\
          \ket{\beta_{10}} &= \frac{1}{\sqrt{2}} (\ket{00} - \ket{11}) \\
          \ket{\beta_{11}} &= \frac{1}{\sqrt{2}} (\ket{01} - \ket{10})
        \end{aligned}
        "
      />
    ),
  },
  sections: [
    section({
      name: "circuitToGenerateBellStates",
      enumerate: false,
      body: (m) => (
        <>
          <Prose>
            <p>
              On page 1, you discovered that the output of:
              <QuantumCircuit
                t="
              \lstick{\ket{0}} & \gate{H} & \ctrl{1} & \qw \\
              \lstick{\ket{0}} & \qw & \targ & \qw
              "
              />
              was:
              <M display t="\frac{1}{\sqrt{2}} (\ket{00} + \ket{11})" />
            </p>

            <p>This circuit is commonly used to entangle states.</p>

            {/* <p>
              <strong>Check for yourself</strong> that if you input the other
              three basis states (
              <M prespace={false} t="\ket{01}" />, <M t="\ket{10}" />, and{" "}
              <M t="\ket{11}" />) this same circuit gives the corresponding Bell
              output states.
            </p> */}
          </Prose>
          <TextBox
            model={m.entangle01}
            label={
              <Prose>
                Determine the output state of the above circuit if the input
                state is <M t="\ket{11}" /> instead of <M t="\ket{00}" />.
              </Prose>
            }
          />
        </>
      ),
      continue: {
        label: "Move on",
      },
      guidance: {
        nextMessage: () => "answer",
        messages: {
          answer: {
            body: (
              <Callout color="blue">
                We found that the output of this circuit is{" "}
                <M t="\frac{1}{\sqrt{2}} (\ket{01} - \ket{10})" />. This is also
                entangled.
              </Callout>
            ),
            onContinue: "nextSection",
          },
        },
      },
    }),

    section({
      name: "anEntangledBasisIntro",
      body: (
        <Prose>
          <p>
            We have already discussed how the states <M t="\ket{00}" />,{" "}
            <M t="\ket{01}" />, <M t="\ket{10}" />, and <M t="\ket{11}" /> form
            a basis for the two-qubit space. Another valid basis is the “Bell
            Basis”, which consists of four linearly independent entangled states
            (known as the Bell states).
          </p>
          <M
            display
            t="
            \begin{aligned}
              \ket{\beta_{00}} &= \frac{1}{\sqrt{2}} (\ket{00} + \ket{11}) \\
              \ket{\beta_{01}} &= \frac{1}{\sqrt{2}} (\ket{01} + \ket{10}) \\
              \ket{\beta_{10}} &= \frac{1}{\sqrt{2}} (\ket{00} - \ket{11}) \\
              \ket{\beta_{11}} &= \frac{1}{\sqrt{2}} (\ket{01} - \ket{10})
            \end{aligned}
            "
          />
          Notice that the above circuit turned <M t="\ket{00}" /> into{" "}
          <M t="\ket{\beta_{00}}" /> and <M t="\ket{11}" /> into{" "}
          <M t="\ket{\beta_{11}}" />.
        </Prose>
      ),
    }),

    section({
      name: "beforeAndAfterCNOT",
      body: (m, { responses }) => (
        <>
          <Toggle
            model={m.beforeCNOT}
            label={
              <Prose>
                In the circuit shown above, with <M t="\ket{00}" /> as input (as
                shown above), does qubit 1 have a definite state just{" "}
                <strong>before</strong> entering the <M t="U_{CNOT}" /> gate?
              </Prose>
            }
            choices={[
              ["yes", "Yes, qubit 1 has a definite state"],
              ["no", "No, it does not"],
            ]}
            answer="yes"
            explanation={
              <>
                The state is
                <M t="H\ket{0} = \frac{1}{\sqrt{2}}(\ket{0} + \ket{1})" />
              </>
            }
          />

          {responses?.beforeCNOT && (
            <Toggle
              model={m.afterCNOT}
              label={
                <Prose>
                  How about just <strong>after</strong> exiting that gate?
                </Prose>
              }
              choices={[
                ["yes", "Yes, qubit 1 has a definite state"],
                ["no", "No, it does not"],
              ]}
              answer="no"
              explanation="Qubit 1 is now entangled with qubit 2."
            />
          )}
        </>
      ),
    }),

    section({
      name: "circuitToDisentangleBeta00",
      body: (m, { responses }) => (
        <>
          <Toggle
            model={m.isBeta00Entangled}
            label={
              <Prose>
                <p>
                  Consider the circuit shown below, with an input state of{" "}
                  <M t="\ket{\beta_{00}}" />:
                </p>

                <Horizontal justify="center">
                  <div>
                    <M t="\ket{\beta_{00}}" />
                  </div>

                  <div>
                    <QuantumCircuit
                      // TODO: Support \inputgroupv
                      t="
                        \lstick{} &  \ctrl{1} & \gate{H} & \qw \\
                        \lstick{} & \targ & \qw & \qw \\
                        %\inputgroupv{1}{2}{0.5em}{1em}{\ket{\beta_{00}}}
                      "
                    />
                  </div>
                </Horizontal>

                <p>Is the input state entangled?</p>
              </Prose>
            }
            choices={[
              ["yes", "Yes, it is entangled"],
              ["no", "No, it is not entangled"],
            ]}
            answer="yes"
            explanation="All four of the Bell basis states are entangled."
          />

          {responses?.isBeta00Entangled && (
            <Toggle
              model={m.isBeta00EntangledAfterCNOT}
              label={
                <Prose>
                  Is the 2-qubit state entangled just <strong>before</strong>{" "}
                  entering the Hadamard?
                </Prose>
              }
              choices={[
                ["yes", "Yes, it is entangled just before"],
                ["no", "No, it is not"],
              ]}
              answer="no"
              explanation={
                <p>
                  After the CNOT, the 2-qubit state is
                  <M t="CNOT\ket{\beta_{00}} = \frac{1}{2}(\ket{00} + \ket{10}) \\ = \frac{1}{2}(\ket{0} + \ket{1})\otimes\ket{0}" />
                </p>
              }
            />
          )}

          {responses?.isBeta00EntangledAfterCNOT && (
            <>
              <TextBox
                model={m.outputBeta00CNOTHI}
                label={<Prose>What is the output state?</Prose>}
              />

              <Answer>
                <M t="\ket{00}" />
              </Answer>

              <Toggle
                model={m.isOutputBeta00CNOTHIEntangled}
                label={<Prose>Is the output state entangled?</Prose>}
                choices={[
                  ["yes", "Yes, it is entangled"],
                  ["no", "No, it is not entangled"],
                ]}
                answer="no"
              />
            </>
          )}
        </>
      ),
    }),
  ],
}));
