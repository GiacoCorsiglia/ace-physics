import {
  ChooseAll,
  ChooseOne,
  Decimal,
  Guidance,
  LabelsLeft,
  M,
  Prose,
  TextBox,
  Toggle,
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
          <p>
            In a circuit diagram, a qubit is represented as a single horizontal
            line (or wire). E.g.,
            <M display t="TODO" />
            represents a qubit in the
            <M t="\ket{1}" /> state.
          </p>
          <p>
            We can stack wires vertically to represent a circuit with two (or
            more) qubits:
            <M display t="TODO" />
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
              <M display t="TODO" />
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
              <M display t="TODO" />
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
                    Probability of <M t="\ket{10}" /> =
                  </p>
                </Prose>
              }
            />
            <Decimal
              model={m.probabilityOfKet01}
              label={
                <Prose>
                  <p>
                    Probability of <M t="\ket{01}" /> =
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
    section({
      name: "operatorsIntro",
      body: (
        <Prose>
          <p>
            We can include operators in a circuit with multiple qubits, such as,
            <M display t="TODO" />
          </p>
          <p>
            In this example, the output state of the first qubit is{" "}
            <M t="Z\ket{\psi}" /> and the output of the second qubit is{" "}
            <M t="X\ket{\phi}" />. The 2-qubit state can therefore be written
            <M display t="(Z\ket{\psi}) \otimes (X\ket{\phi})" />.
          </p>
          <p>
            We can also think of these two gates as a single, two-qubit gate:
            <M display t="TODO" />
            In this picture (which is equivalent to the one above), we can write
            the two-qubit operator as <M t="Z\otimes X" />. Then the output
            state can be written as{" "}
            <M t="(Z\otimes X)(\ket{\psi}\otimes \ket{\phi})" />.
          </p>
        </Prose>
      ),
    }),
    section({
      name: "representsOutputState",
      body: (m) => (
        <ChooseAll
          model={m.representsOutputStateSelectAll}
          label={
            <Prose>
              <p>Consider the following circuit. </p>
              <M display t="TODO" />
              <p>
                Which represents the output state? Select all correct
                expressions.
              </p>
            </Prose>
          }
          choices={[
            ["Z(|ψ1⟩ ⊗ |ψ2⟩)", <M t="Z(\ket{\psi_1} \otimes \ket{\psi_2})" />],
            ["(Z |ψ1⟩) ⊗ |ψ2⟩", <M t="(Z\ket{\psi_1}) \otimes \ket{\psi_2}" />],
            [
              "(Z ⊗ I)(|ψ1⟩ ⊗ |ψ2⟩)",
              <M t="(Z\otimes I)(\ket{\psi_1} \otimes \ket{\psi_2})" />,
            ],
            [
              "(I ⊗ Z)(|ψ2⟩ ⊗ |ψ1⟩)",
              <M t="(I\otimes Z)(\ket{\psi} \otimes \ket{\phi})" />,
            ],
          ]}
        />
      ),
    }),
    section({
      name: "differentRedrawnCircuit",
      enumerate: false,
      body: (
        <Guidance.HeadsUp>
          <p>
            The equation at the top of the page can be redrawn in circuit form
            below, with some I (identity) gates added. (Do you see that this
            circuit is functionally equivalent to the previous one?)
          </p>
          <M display t="TODO" />
        </Guidance.HeadsUp>
      ),
    }),
    section({
      name: "firstBoldedI",
      body: (m) => (
        <ChooseOne
          model={m.firstBoldedI}
          label={
            <Prose>
              <p>
                Consider the very first <M t="I" /> in the following expression:{" "}
                <M t="(Z\otimes \mathbf{I})(I\otimes X) (\ket{\psi} \otimes \ket{\phi} )" />
                . Which gate in the circuit above is that first (bolded){" "}
                <M t="I" /> referring to?
              </p>
            </Prose>
          }
          choices={[
            [
              "top",
              <p>
                The <M t="I" /> on the top qubit (qubit 1)
              </p>,
            ],
            [
              "bottom",
              <p>
                The <M t="I" /> on the bottom qubit (qubit 2)
              </p>,
            ],
            ["ambiguous", <p>It is ambiguous</p>],
          ]}
        />
      ),
    }),
    section({
      name: "twoQubitStateResult",
      body: (m) => (
        <TextBox
          model={m.twoQubitStateFinalResult}
          label={
            <>
              <Guidance.HeadsUp>
                <p>Let’s practice with this new notation.</p>
              </Guidance.HeadsUp>
              <Prose>
                <p>
                  What would the circuit for the following two-qubit state look
                  like?
                </p>
                <M
                  display
                  t="(X\otimes I ) (Z \otimes X) (\ket{\psi_1} \otimes \ket{\psi_2} )"
                />
              </Prose>
            </>
          }
        />
      ),
    }),
    section({
      name: "followingIsTFOne",
      body: (m) => (
        <Toggle
          model={m.followingIsTFOneChoice}
          label={
            <Prose>
              <p>
                Is the following <i>true</i> or <i>false</i>?
              </p>
              <M
                display
                t="(X\otimes I ) (Z \otimes X) (\ket{\psi_1} \otimes \ket{\psi_2} )  = (X Z)\otimes (I X )  (\ket{\psi_1} \otimes \ket{\psi_2} )"
              />
            </Prose>
          }
          choices={[
            ["yes", "Yes"],
            ["no", "No"],
          ]}
        />
      ),
    }),
    section({
      name: "followingIsTFTwo",
      body: (m) => (
        <Toggle
          model={m.followingIsTFTwoChoice}
          label={
            <Prose>
              <p>
                Is the following <i>true</i> or <i>false</i>?
              </p>
              <M
                display
                t="(X\otimes Z ) (X \otimes Z) (\ket{\psi_1} \otimes \ket{\psi_2} )  = X Z\ket{\psi_1}\otimes  X Z \ket{\psi_2}"
              />
            </Prose>
          }
          choices={[
            ["yes", "Yes"],
            ["no", "No"],
          ]}
        />
      ),
    }),
    section({
      name: "representCircuitBelow",
      body: (m) => (
        <TextBox
          model={m.representCircuitBelowText}
          label={
            <Prose>
              <p>Represent the circuit shown below as an equation:</p>
              <M display t="TODO" />
            </Prose>
          }
        />
      ),
    }),
    section({
      name: "outputStateOfCircuit",
      body: (m) => (
        <TextBox
          model={m.outputStateOfCircuitText}
          label={
            <Prose>
              <p>
                If <M t="\ket{\psi}=\ket{1}" /> and <M t="\ket{\phi}=\ket{1}" />
                , what is the output state of the above circuit?
              </p>
            </Prose>
          }
        />
      ),
    }),
  ],
}));
