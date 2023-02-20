import { M, Prose, QuantumCircuit, TextBox, Toggle } from "@/components";
import { page } from "@/tutorial";
import setup from "./setup";

export default page(setup, ({ section }) => ({
  name: "anEntangledBasis",
  label: "An Entangled Basis",
  answers: "none",
  sections: [
    section({
      name: "anEntangledBasisIntro",
      body: (
        <Prose>
          <p>
            We have already discussed how the states{" "}
            <M t="{ \ket{00}, \ket{01}, \ket{10}, \ket{11}}" /> form a basis for
            the two-qubit space. Another valid basis is the “Bell Basis”, which
            consists of four linearly independent entangled states (known as the
            Bell states).
          </p>
          <M
            display
            t="\ket{\beta_{00}} = \frac{1}{\sqrt{2}} (\ket{00} + \ket{11}) \\
               \ket{\beta_{01}} = \frac{1}{\sqrt{2}} (\ket{01} + \ket{10}) \\
               \ket{\beta_{10}} = \frac{1}{\sqrt{2}} (\ket{00} - \ket{11}) \\
               \ket{\beta_{11}} = \frac{1}{\sqrt{2}} (\ket{01} - \ket{10})"
          />
          <p>Above, you discovered that the output of:</p>
          <QuantumCircuit
            t="
              \lstick{\ket{0}} & \gate{H} & \ctrl{1} & \qw \\
              \lstick{\ket{0}} & \qw & \targ & \qw
              "
          />
          <p>
            was:{" "}
            <M
              display
              t="\frac{1}{\sqrt{2}} (\ket{00} + \ket{11}) = \ket{\beta_{00}}"
            />{" "}
          </p>
        </Prose>
      ),
    }),
    section({
      name: "anEntangledBasisCheck",
      enumerate: false,
      body: (
        <Prose>
          This circuit is commonly used to entangle states. Check for yourself
          that if you input the other three basis states{" "}
          <M t="(\ket{01},\ket{10}, and \ket{11})" /> this same circuit gives
          the corresponding Bell output states.{" "}
        </Prose>
      ),
      continue: {
        label: "I checked it!",
      },
    }),
    section({
      name: "beforeAndAfterEnteringCNOTGate",
      body: (m, { responses }) => (
        <>
          <Toggle
            model={m.beforeEnteringCNOTGate}
            label={
              <Prose>
                In the circuit shown above, with <M t="\ket{00}" /> as input,
                does qubit 1 have a definite state just <i>before</i> entering
                the <M t="U_{CNOT}" /> gate?
              </Prose>
            }
            choices={[
              ["yes", "Yes, it does have a definite state"],
              ["no", "No, it does not have one before"],
            ]}
          />
          {responses?.beforeEnteringCNOTGate && (
            <Toggle
              model={m.afterEnteringCNOTGate}
              label={
                <Prose>
                  How about just <i>after</i> exiting that gate?
                </Prose>
              }
              choices={[
                ["yes", "Yes, it has one after"],
                ["no", "No, it does not have a definite state after"],
              ]}
            />
          )}
        </>
      ),
    }),
    section({
      name: "circuitEntangled",
      body: (m, { responses }) => (
        <>
          <Toggle
            model={m.circuitStateInputEntangled}
            label={
              <Prose>
                <p>
                  Consider the circuit shown below, with an input state of{" "}
                  <M t="\ket{\beta_{00}}" />:
                </p>
                <QuantumCircuit
                  // TODO: Support \inputgroupv
                  t="
                  \lstick{} &  \ctrl{1} & \gate{H} & \qw \\
                  \lstick{} & \targ & \qw & \qw \\
                  %\inputgroupv{1}{2}{0.5em}{1em}{\ket{\beta_{00}}}
                  "
                />
                <p>Is the input state entangled?</p>
              </Prose>
            }
            choices={[
              ["yes", "Yes, it is entangled"],
              ["no", "No, it is not entangled"],
            ]}
          />

          {responses?.circuitStateInputEntangled && (
            <Toggle
              model={m.twoQubitStateEntangled}
              label={
                <Prose>
                  Is the 2-qubit state entangled just BEFORE entering the
                  Hadamard?
                </Prose>
              }
              choices={[
                ["yes", "Yes, it is entangled just before"],
                ["no", "No, it is not before entering Hadamard"],
              ]}
            />
          )}

          {responses?.twoQubitStateEntangled && (
            <TextBox
              model={m.outputOfCircuit}
              label={<Prose>What is the output state?</Prose>}
            />
          )}

          {responses?.outputOfCircuit && (
            <Toggle
              model={m.outputStateOfCircuitEntangled}
              label={<Prose>Is it entangled?</Prose>}
              choices={[
                ["yes", "Yes, it is entangled"],
                ["no", "No, it is not entangled"],
              ]}
            />
          )}
        </>
      ),
    }),
  ],
}));
