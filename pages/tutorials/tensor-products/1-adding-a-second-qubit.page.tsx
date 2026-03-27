import {
  Answer,
  ChooseAll,
  Decimal,
  Guidance,
  Horizontal,
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
  answers: "provided",
  sections: [
    section({
      name: "addingASecondQubitIntro",
      body: (
        <Prose>
          <p>
            In a circuit diagram, a qubit is represented as a single horizontal
            line (or wire). For example,
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
            In our notation, the top qubit is referred to as qubit #1 and is in
            state <M t="\ket{1}" />. The bottom qubit is referred to as qubit #2
            and is in state <M t="\ket{0}" />. (Note that qubit ordering
            conventions differ and your textbook or instructor might reverse
            this ordering.)
          </p>

          <p>
            We write the <i>two-qubit state</i> describing this system as{" "}
            <M t="\ket{1}\otimes \ket {0}" />, or using the shorthand{" "}
            <M t="\ket{1}\!\ket{0}" /> or just <M t="\ket{10}" />. Order
            matters, the first bit is listed first in all three notations, and
            is the topmost bit in the circuit diagram.
          </p>

          <p>
            The <M t="\otimes" /> is called a “tensor product”, and serves as a
            visual separator with the first particle on the left, and the 2nd on
            the right. This could be generalized to 3 particles, e.g.{" "}
            <M t="\ket{1} \otimes \ket{0} \otimes\ket{1}" />.
          </p>
        </Prose>
      ),
    }),
    //question A
    section({
      name: "arbitrary2QubitState",
      body: (m) => (
        <>
          <TextBox
            model={m.arbitrary2QubitState}
            label={
              <Prose>
                <p>Given the circuit diagram</p>
                <QuantumCircuit
                  t="
                \lstick{\ket{\psi}} & \qw & \qw & \qw \\
                \lstick{\ket{\phi}} & \qw & \qw & \qw \\
                "
                />
                <p>How would you write the 2-qubit state?</p>
              </Prose>
            }
          />

          <Prose faded size="small">
            <p>Don’t worry about formatting.</p>

            <p>
              You can write kets using the <code>|</code> and <code>{">"}</code>{" "}
              characters.
            </p>

            <p>
              Copy-paste these symbols if useful:{" "}
              <span style={{ marginLeft: "1rem" }}>ψ</span>
              <span style={{ marginLeft: "1rem" }}>⊗</span>
              <span style={{ marginLeft: "1rem" }}>ϕ</span>
            </p>
          </Prose>

          <Answer>
            <M t="\ket{\psi} \otimes \ket{\phi}" />
          </Answer>
        </>
      ),
    }),
    // question B
    section({
      name: "plusTimes0",
      body: (m) => (
        <ChooseAll
          model={m.plusTimes0}
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
          // answer={["1/root2(|0> + |1>) x |0>", "1/root2(|00> + |10>)"]}
        />
      ),
      guidance: {
        nextMessage: () => "answer",
        messages: {
          answer: {
            body: ({ responses }) => (
              <Guidance.Dynamic
                status={
                  responses?.plusTimes0?.selected?.includes(
                    "1/root2(|0> + |1>) x |0>",
                  ) &&
                  responses?.plusTimes0?.selected?.includes(
                    "1/root2(|00> + |10>)",
                  ) &&
                  !responses?.plusTimes0?.selected?.includes(
                    "|0> x 1/root2(|0> + |1>)",
                  ) &&
                  !responses?.plusTimes0?.selected?.includes(
                    "1/root2(|0>|0> + |1>|0>)",
                  )
                    ? "agree"
                    : "disagree"
                }
              >
                {!responses?.plusTimes0?.selected?.includes(
                  "1/root2(|0> + |1>) x |0>",
                ) ||
                !responses?.plusTimes0?.selected?.includes(
                  "1/root2(|00> + |10>)",
                ) ? (
                  <p>There are two correct answers!</p>
                ) : (
                  <></>
                )}

                {responses?.plusTimes0?.selected?.includes(
                  "1/root2(|0> + |1>) x |0>",
                ) ? (
                  <p>
                    <M t="\frac{1}{\sqrt{2}} (\ket{0} + \ket{1}) \otimes \ket{0}" />{" "}
                    is correct.
                  </p>
                ) : (
                  <></>
                )}
                {responses?.plusTimes0?.selected?.includes(
                  "|0> x 1/root2(|0> + |1>)",
                ) ? (
                  <p>
                    <M t="\ket{0} \otimes \frac{1}{\sqrt{2}} (\ket{0} + \ket{1})" />{" "}
                    is incorrect. In our convention, the top qubit is the first
                    in left-to-right order.
                  </p>
                ) : (
                  <></>
                )}
                {responses?.plusTimes0?.selected?.includes(
                  "1/root2(|00> + |10>)",
                ) ? (
                  <p>
                    <M t="\frac{1}{\sqrt{2}} (\ket{00} + \ket{10})" /> is
                    correct.
                  </p>
                ) : (
                  <></>
                )}
                {responses?.plusTimes0?.selected?.includes(
                  "1/root2(|0>|0> + |1>|0>)",
                ) ? (
                  <p>
                    <M t="\frac{1}{\sqrt{2}} (\ket{0}\!\ket{0} \otimes \ket{1}\!\ket{0})" />{" "}
                    is incorrect. Look at the expression closely and try again.
                  </p>
                ) : (
                  <></>
                )}
              </Guidance.Dynamic>
            ),
            onContinue: "nextSection",
          },
        },
      },
    }),
      //question C
    section({
      name: "plusTimes0Probabilities",
      body: (m, { responses }) => (
        <>
          <Prose>
            In the previous question, what is the probability that a measurement
            of the full 2-qubit state results in <M t="\ket{10}" />? What about{" "}
            <M t="\ket{01}" />?
          </Prose>

          <Horizontal align="center" justify="start">
            <Decimal
              model={m.probabilityOfKet10}
              label={
                <Prose>
                  Probability of <M t="\ket{10}" />:
                </Prose>
              }
            />
            <Answer
              correct={
                responses?.probabilityOfKet10 === 50 ||
                responses?.probabilityOfKet10 === 0.5
              }
            >
              50%
            </Answer>
          </Horizontal>
          <Horizontal align="center" justify="start">
            <Decimal
              model={m.probabilityOfKet01}
              label={
                <Prose>
                  Probability of <M t="\ket{01}" />:
                </Prose>
              }
            />
            <Answer correct={responses?.probabilityOfKet01 === 0.0}>0</Answer>
          </Horizontal>
        </>
      ),
      //hint
      hints: [
        hint({
          name: "state",
          label: "Can I have a hint?",
          body: (
            <Prose>
              This question is best answered by looking at the state written as <br/>
               <center><M t="\frac{1}{\sqrt{2}} (\ket{00} + \ket{10})" /></center>
            </Prose>
          ),
        }),
      ],
    }),
    //question D
    section({
      name: "plusTimes0SingleProbabilities",
      body: (m, { responses }) => (
        <>
          <Prose>
            What is the probability that a measurement of the <i>first qubit</i>{" "}
            results in a <M t="\ket{0}" />? Same question for the second qubit?
          </Prose>

          <Horizontal align="center" justify="start">
            <Decimal
              model={m.probabilityKet0FirstQubit}
              label={
                <Prose>
                  <i>First</i> qubit:
                </Prose>
              }
            />
            <Answer
              correct={
                responses?.probabilityKet0FirstQubit === 50 ||
                responses?.probabilityKet0FirstQubit === 0.5
              }
            >
              50%
            </Answer>
          </Horizontal>

          <Horizontal align="center" justify="start">
            <Decimal
              model={m.probabilityKet0SecondQubit}
              label={
                <Prose>
                  <i>Second</i> qubit:
                </Prose>
              }
            />
            <Answer
              correct={
                responses?.probabilityKet0SecondQubit === 100 ||
                responses?.probabilityKet0SecondQubit === 1
              }
            >
              100%
            </Answer>
          </Horizontal>
        </>
      ),
      hints: [
        hint({
          name: "probability",
          label: "Hint",
          body: (
            <Prose>
              This question is best answered by looking at the state written as
               <M t="\frac{1}{\sqrt{2}} (\ket{0} + \ket{1}) \otimes \ket{0}" />.
               Remember that in our notation, the first qubit is left of the tensor
               product symbol, and the second qubit is to the right. <br/>
               <br/> Alternatively, look back at the circuit diagram. In our notation,
               the first qubit is the top qubit in the diagram.
            </Prose>
          ),
        }),
      ],
    }),
  ],
}));
