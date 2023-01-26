import {
  ChooseAll,
  Decimal,
  LabelsLeft,
  M,
  Prose,
  QuantumCircuit,
  TextBox,
} from "@/components";
import { page } from "@/tutorial";
import setup from "./setup";

export default page(setup, ({ section, hint }) => ({
  name: "addingASecondQubit",
  label: "Adding a Second Qubit",
  answers: "none",
  sections: [
    section({
      name: "addingASecondQubitIntro",
      body: (
        <Prose>
          <h2>States</h2>
          <p>
            In a circuit diagram, a qubit is represented as a single horizontal
            line (or wire). E.g.,
            <QuantumCircuit t="\lstick{\ket{1}} & \qw &  \qw & \qw \\" />
            represents a qubit in the
            <M t="\ket{1}" /> state.
          </p>
          <p>
            We can stack wires vertically to represent a circuit with two (or
            more) qubits:
            <QuantumCircuit
              t="
              \lstick{\ket{1}} & \qw & \qw & \qw \\ \\
              \lstick{\ket{0}} & \qw & \qw & \qw \\
              "
            />
            In this system, qubit #1 is in state <M t="\ket{1}" /> , and qubit
            #2 is in state <M t="\ket{0}" />.
          </p>
          <p>
            We write the <i>two-qubit state</i> describing this system as{" "}
            <M
              t="\ket{1}\otimes \ket
            {0}"
            />
            , or using the shorthand <M t="\ket{1}\!\ket{0}" /> or just{" "}
            <M t="\ket{10}" />. Order matters, the first bit is listed first in
            all three notations, and is the topmost bit in the circuit diagram.
          </p>
          <p>
            The <M t="\otimes" /> is called a "tensor product", and serves as a
            visual separator with the first particle on the left, and the 2nd on
            the right. (This could be generalized to 3 particles, e.g.{" "}
            <M
              t="\ket{1}
            \otimes \ket{0} \otimes\ket{1}"
            />
            .
          </p>
        </Prose>
      ),
    }),
    section({
      name: "write2QubitState",
      body: (m) => (
        <TextBox
          model={m.write2QubitState}
          label={
            <Prose>
              <p>Given the circuit diagram</p>
              <QuantumCircuit
                t="
                \lstick{\ket{\psi}} & \qw & \qw & \qw \\ \\
                \lstick{\ket{\phi}} & \qw & \qw & \qw \\
                "
              />
              <p>How would you write the 2-qubit state?</p>
            </Prose>
          }
        />
      ),
    }),
    section({
      name: "write2QubitStateSelectAll",
      body: (m) => (
        <ChooseAll
          model={m.write2QubitStateSelectAll}
          label={
            <Prose>
              <p>Given the circuit diagram</p>
              <QuantumCircuit
                t="
                \lstick{\frac{1}{\sqrt{2}}(\ket{0} + \ket{1})} & \qw & \qw & \qw \\ \\
                \lstick{\ket{0}} & \qw & \qw & \qw \\
                "
              />
              <p>
                How would you write the 2-qubit state? Select ALL that apply
              </p>
            </Prose>
          }
          choices={[
            [
              "1/root2(|0> + |1>) x |0>",
              <M t="\frac{1}{\sqrt{2}} (\ket{0} + \ket{1}) \otimes \ket{0}" />,
            ],
            [
              "|0> x 1/root2(|0> + |1>)",
              <M t="\ket{0} \otimes \frac{1}{\sqrt{2}} (\ket{0} + \ket{1})" />,
            ],
            [
              "1/root2(|00> + |10>)",
              <M t="\frac{1}{\sqrt{2}} (\ket{00} + \ket{10})" />,
            ],
            [
              "1/root2(|0>|0> + |1>|0>)",
              <M t="\frac{1}{\sqrt{2}} (\ket{0}\!\ket{0} \otimes \ket{1}\!\ket{0})" />,
            ],
          ]}
        />
      ),
    }),
    section({
      name: "full2QubitProbability",
      body: (m) => (
        <>
          <Prose>
            <p>
              In the previous question, what is the probability that a
              measurement of the full 2-qubit state results in{" "}
              <M t="\ket{10}" />? What about
              <M t="\ket{01}" />?
            </p>
          </Prose>
          <LabelsLeft>
            <Decimal
              model={m.probabilityOfKet10}
              label={
                <Prose>
                  <p>
                    Probability of <M t="\ket{10}" />:
                  </p>
                </Prose>
              }
            />
            <Decimal
              model={m.probabilityOfKet01}
              label={
                <Prose>
                  <p>
                    Probability of <M t="\ket{01}" />:
                  </p>
                </Prose>
              }
            />
          </LabelsLeft>
        </>
      ),
    }),
    section({
      name: "probabilityFirstQubitOnly",
      body: (m) => (
        <>
          <Prose>
            <p>
              What is the probability that a measurement of the{" "}
              <i>first qubit only</i> results in a <M t="\ket{0}" />? Same
              question for the second qubit?
            </p>
          </Prose>
          <LabelsLeft>
            <Decimal
              model={m.resultIsKet0FirstQubit}
              label={
                <Prose>
                  <p>
                    <i>First</i> qubit:
                  </p>
                </Prose>
              }
            />
            <Decimal
              model={m.resultIsKet0SecondQubit}
              label={
                <Prose>
                  <p>
                    <i>Second</i> qubit:
                  </p>
                </Prose>
              }
            />
          </LabelsLeft>
        </>
      ),
      hints: [
        hint({
          name: "probability",
          label: "Probability?",
          body: (
            <Prose>
              <p>
                Can you see how to get this both from the circuit diagram
                picture and also from the 2-state equations you selected?
              </p>
            </Prose>
          ),
        }),
      ],
    }),
  ],
}));
