import {
  Answer,
  Decimal,
  LabelsLeft,
  M,
  Matrix,
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
  answers: "provided",
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
        </Prose>
      ),
    }),

    section({
      name: "writeCNOTAsMatrix",
      body: (m, { responses }) => (
        <>
          <Prose>
            If we want to write <M t="U_{CNOT}" /> as a 4x4 matrix in the
            computational basis, it will look like this:
          </Prose>

          <Matrix
            matrix={[
              ["1", "0", "0", "0"],
              ["1", "1", "0", "0"],
              [
                "0",
                "0",
                <Decimal placeholder="?" model={m.CNOTMatrix33} />,
                <Decimal placeholder="?" model={m.CNOTMatrix34} />,
              ],
              [
                "0",
                "0",
                <Decimal placeholder="?" model={m.CNOTMatrix43} />,
                <Decimal placeholder="?" model={m.CNOTMatrix44} />,
              ],
            ]}
          />

          <Answer
            correct={
              responses?.CNOTMatrix33 === 0.0 &&
              responses?.CNOTMatrix34 === 1 &&
              responses?.CNOTMatrix43 === 1 &&
              responses?.CNOTMatrix44 === 0.0
            }
          >
            <M
              display
              t="\pmatrix{\enspace 1 & 0 & 0 & 0 \enspace \\ \enspace 0 & 1 & 0 & 0 \enspace \\ \enspace 0 & 0 & 0 & 1 \enspace \\ \enspace 0 & 0 & 1 & 0 \enspace}"
            />
          </Answer>
        </>
      ),
    }),

    section({
      name: "canFactorCNOT",
      body: (m) => (
        <Toggle
          model={m.canFactorCNOT}
          label={
            <Prose>
              Can the <M t="U_{CNOT}" /> gate be written as a tensor product of
              two single qubit operators, i.e. is{" "}
              <M t="U_{CNOT} = O_1 \otimes O_2" /> for some single qubit
              operators <M t="O_1" /> and <M t="O_2" />?
            </Prose>
          }
          choices={[
            ["yes", "Yes, it can be written as a tensor product"],
            [
              "no",
              <p>
                No, <M t="U_{CNOT} \neq O_1 \otimes O_2" />{" "}
              </p>,
            ],
          ]}
          answer="no"
        />
      ),
    }),

    section({
      name: "output00HICNOT",
      body: (m) => (
        <>
          <TextBox
            model={m.output00HICNOT}
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

          <Answer>
            <M display t="(U_{CNOT})(H \otimes I)(100) =" />
            <M display t="U_{CNOT}(\ket{+}\otimes\ket{0}) =" />
            <M
              display
              t="U_{CNOT}(\frac{1}{\sqrt{2}}[\ket{00} + \ket{10}]) ="
            />
            <M display t="\frac{1}{\sqrt{2}}[\ket{00} + \ket{11}]" />
          </Answer>
        </>
      ),
      hints: [
        [
          hint({
            name: "gateIsLinear",
            body: (
              <Prose>
                The <M t="U_{CNOT}" /> gate is linear, which means that e.g.{" "}
                <M display t="U_{CNOT}(a \ket{00} + b\ket{10}) =" />
                <M display t="a \ U_{CNOT} \ket{00} + b\ U_{CNOT}\ket{10}" />
              </Prose>
            ),
          }),
        ],
      ],
    }),

    section({
      name: "output00HICNOTProp0Qubit1",
      body: (m, { responses }) => (
        <>
          <Prose>
            In the circuit just above, what is the probability of measuring a
            <M t="\ket{0}" /> on the first output qubit?
          </Prose>

          <LabelsLeft>
            <Decimal
              model={m.output00HICNOTProp0Qubit1}
              label={<Prose>First Qubit: </Prose>}
            />
          </LabelsLeft>

          <Answer
            correct={
              responses?.output00HICNOTProp0Qubit1 === 0.5 ||
              responses?.output00HICNOTProp0Qubit1 === 50
            }
          >
            50%
          </Answer>
        </>
      ),
    }),
    section({
      name: "output00HICNOTProp1Qubit2",
      body: (m, { responses }) => (
        <>
          <Prose>
            Going back to the circuit above, what is the probability of
            measuring a
            <M t="\ket{1}" /> on the second output qubit?
          </Prose>

          <LabelsLeft>
            <Decimal
              model={m.output00HICNOTProp1Qubit2}
              label={<Prose>Second Qubit: </Prose>}
            />
          </LabelsLeft>

          <Answer
            correct={
              responses?.output00HICNOTProp1Qubit2 === 0.5 ||
              responses?.output00HICNOTProp1Qubit2 === 50
            }
          >
            50%
          </Answer>
        </>
      ),
    }),

    section({
      name: "output00HICNOTProb01Qubit2",
      body: (m, { responses }) => (
        <>
          <Prose>
            Finally, what is the probability of measuring a
            <M t="\ket{01}" /> on the second output qubit?
          </Prose>

          <LabelsLeft>
            <Decimal
              model={m.output00HICNOTProb01Qubit2}
              label={<Prose>Second Qubit: </Prose>}
            />
          </LabelsLeft>

          <Answer correct={responses?.output00HICNOTProb01Qubit2 === 0.0}>
            0%
          </Answer>
        </>
      ),
    }),

    // TODO: Don't reveal this until after the answers are shown.
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
            There is something <em> very interesting</em> about this output
            state. Let’s explore this in the coming problems.
          </p>
        </Prose>
      ),
    }),
  ],
}));
