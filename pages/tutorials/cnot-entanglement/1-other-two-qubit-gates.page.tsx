import {
  Decimal,
  Horizontal,
  M,
  Prose,
  QuantumCircuit,
  TextBox,
  Toggle,
} from "@/components";
import { page } from "@/tutorial";
import setup from "./setup";

export default page(setup, ({ section, hint }) => ({
  name: "otherTwoQubitGates",
  label: "Other Two-Qubit Gates",
  answers: "none",
  sections: [
    section({
      name: "otherTwoQubitGatesIntro",
      body: (
        <Prose>
          <p>
            Some two-qubit operators can not be separated into a pair of
            single-qubit operators. One important example of this is the CNOT
            (or “<M t="U_{CNOT}" />” or “controlled-Not” gate) In circuit
            diagrams it is drawn like this:
          </p>
          <QuantumCircuit
            t="& \ctrl{1}  & \qw \\
            & \targ & \qw"
          />
          <p>
            The black dot shows which input qubit is the “control bit”. The
            other input qubit is called the “target bit”. If the control qubit
            is <M t="\ket{0}" /> then the target qubit is unaffected, but if the
            control qubit is <M t="\ket{1}" /> then the target qubit is acted on
            by the NOT gate.
          </p>
          <p>
            In terms of the computational 2-qubit basis states, the words above
            correspond to:
          </p>
          <M
            display
            t="U_{CNOT}\ket{00} \rightarrow \ket{00} \\
              U_{CNOT}\ket{01} \rightarrow \ket{01} \\
              U_{CNOT}\ket{10} \rightarrow \ket{11} \\
              U_{CNOT}\ket{11} \rightarrow \ket{10}"
          />
          <p>
            (Stare for a second, make sure you agree that these formulas match
            the description above)
          </p>
          <p>
            If we want to write <M t="U_{CNOT}" /> as a 4x4 matrix in the
            computational basis, it will look like this:
          </p>
          <M
            display
            t="\pmatrix{\; 1 & 0 & 0 & 0 \;\\\; 0 & 1 & 0 & 0 \;\\\; 0 & 0 & ? & ? \;\\\; 0 & 0 & ? & ?\;}"
          />
          <p>
            ⭐⭐⭐Fill in the bottom right corner of the matrix (above).⭐⭐ ⭐
          </p>
        </Prose>
      ),
    }),
    section({
      name: "writtenAsTensorProduct",
      body: (m) => (
        <Toggle
          model={m.writtenAsTensorProduct}
          label={
            <Prose>
              Can the <M t="U_{CNOT}" /> gate be written as a tensor product of
              two single qubit operators, i.e. is{" "}
              <M t="U_{CNOT} = O_1 \otimes O_2" /> for some single qubit
              operators <M t="O_1" /> and <M t="O_2" />?
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
      name: "outputOfCircuit",
      body: (m) => (
        <TextBox
          model={m.outputOfCircuit}
          label={
            <Prose>
              What is the output of this circuit?{" "}
              <QuantumCircuit
                t="\lstick{\ket{0}} & \gate{H} & \ctrl{1}  & \qw \\
                   \lstick{\ket{0}} & \qw & \targ & \qw"
              />
            </Prose>
          }
        />
      ),
      hints: [
        [
          hint({
            name: "gateIsLinear",
            body: (
              <Prose>
                The <M t="U_{CNOT}" /> gate is linear, which means that e.g.{" "}
                <M
                  display
                  t="U_{CNOT}(a \ket{00} + b\ket{10}) = a \   U_{CNOT} \ket{00} + b\ U_{CNOT}\ket{10}"
                />
              </Prose>
            ),
          }),
        ],
      ],
    }),
    section({
      name: "probMeasuringKet0",
      body: (m) => (
        <>
          <Prose>
            In the circuit just above, what is the probability of measuring a
            <M t="\ket{0}" /> on the first output qubit?
          </Prose>
          <Horizontal align="center" justify="start">
            <Decimal
              model={m.probMeasuringKet0}
              label={<Prose>First Qubit: </Prose>}
            />
          </Horizontal>
        </>
      ),
    }),
    section({
      name: "probMeasuringKet1",
      body: (m) => (
        <>
          <Prose>
            Adding to the previous question, what is the probability of
            measuring a
            <M t="\ket{1}" /> on the second output qubit?
          </Prose>
          <Horizontal align="center" justify="start">
            <Decimal
              model={m.probMeasuringKet1}
              label={<Prose>Second Qubit: </Prose>}
            />
          </Horizontal>
        </>
      ),
    }),
    section({
      name: "probMeasuringKet01",
      body: (m) => (
        <>
          <Prose>
            Finally, what is the probability of measuring a
            <M t="\ket{01}" /> on the second output qubit?
          </Prose>
          <Horizontal align="center" justify="start">
            <Decimal
              model={m.probMeasuringKet01}
              label={<Prose>Second Qubit: </Prose>}
            />
          </Horizontal>
        </>
      ),
    }),
    section({
      name: "interestingProbComment",
      body: (
        <Prose>
          <p>
            Your answer to the last question might strike you as surprising.
            This is not how classical probability works - if the two qubits were
            independent, then you would expect the probability of a{" "}
            <M t="\ket{01}" /> outcome to be <M t="1/2 \times 1/2 = 0.25" />.
          </p>
          <p>
            There is something very interesting about this output state. Let’s
            explore this in the coming problems.
          </p>
        </Prose>
      ),
    }),
  ],
}));
