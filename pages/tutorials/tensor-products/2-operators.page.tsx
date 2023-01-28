import {
  ChooseAll,
  ChooseOne,
  Guidance,
  M,
  Prose,
  QuantumCircuit,
} from "@/components";
import { page } from "@/tutorial";
import setup from "./setup";

export default page(setup, ({ section }) => ({
  name: "operators",
  label: "Operators",
  answers: "none",
  sections: [
    section({
      name: "operatorsIntro",
      body: (
        <Prose>
          <p>
            We can include operators in a circuit with multiple qubits, such as,
            <QuantumCircuit
              t="
              \lstick{\ket{\psi}} & \gate{Z} & \qw \\
              \lstick{\ket{\phi}} & \gate{X} & \qw \\
              "
            />
          </p>
          <p>
            In this example, the output state of the first qubit is{" "}
            <M t="Z\ket{\psi}" /> and the output of the second qubit is{" "}
            <M t="X\ket{\phi}" />. The 2-qubit state can therefore be written
            <M display t="(Z\ket{\psi}) \otimes (X\ket{\phi})" />
          </p>
          <p>
            We can also think of these two gates as a single, two-qubit gate:
            <QuantumCircuit
              t="
              \lstick{\ket{\psi}} & \qw & \gate{Z} & \qw \\
              \lstick{\ket{\phi}} & \qw & \gate{X} & \qw \gategroup{1}{2}{2}{3}{.7em}{--} \\
              "
            />
            In this picture (which is equivalent to the one above), we can write
            the two-qubit operator as <M t="Z\otimes X" />. Then the output
            state can be written as:{" "}
            <M display t="(Z\otimes X)(\ket{\psi}\otimes \ket{\phi})" />
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
              <QuantumCircuit
                t="
                \lstick{\ket{\psi_1}} & \gate{Z} & \qw \\
                \lstick{\ket{\psi_2}} & \qw & \qw \\
                "
              />
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
            below, with some <M t="I" /> (identity) gates added. (Do you see
            that this circuit is functionally equivalent to the previous one?)
          </p>
          <QuantumCircuit
            t="
              \lstick{\ket{\psi}} & \gate{Z} & \gate{I} & \qw \\
              \lstick{\ket{\phi}} & \gate{I} & \gate{X} & \qw \\
              "
          />
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
              Consider the very first <M t="I" /> in the following expression:{" "}
              <M t="(Z\otimes \mathbf{I})(I\otimes X) (\ket{\psi} \otimes \ket{\phi} )" />
              . Which gate in the circuit above is that first (bolded){" "}
              <M t="I" /> referring to?
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
  ],
}));
