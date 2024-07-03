import {
  Answer,
  ChooseAll,
  Decimal,
  Guidance,
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
            Some two-qubit operators <strong>cannot</strong> be separated into a
            pair of single-qubit operators. One important example of this is the
            CNOT gate (aka <M t="U_{CNOT}" /> or the “controlled-not” gate). In
            circuit diagrams it is drawn like this:
          </p>

          <QuantumCircuit
            t="& \ctrl{1}  & \qw \\
            & \targ & \qw"
          />

          <p>
            The black dot shows which qubit is the “control bit”. The other
            qubit is called the “target bit”. If the control qubit is{" "}
            <M t="\ket{0}" /> then the target qubit is unaffected, but if the
            control qubit is <M t="\ket{1}" /> then the target qubit is acted on
            by the NOT gate, which flips <M t="\ket{0}" /> and <M t="\ket{1}" />
            .
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
            Stare for a second, make sure you agree that these formulas match
            the description above.
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
            computational basis, it will look like this. Please fill in the
            missing quadrant.
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
      body: (m, { responses }) => (
        <Toggle
          model={m.canFactorCNOT}
          label={
            <>
              <Prose>
                Can the <M t="U_{CNOT}" /> gate be written as a tensor product
                of two single qubit operators? In other words, is{" "}
                <M t="U_{CNOT} = A_1 \otimes A_2" /> for some single qubit
                operators <M t="A_1" /> and <M t="A_2" />?
              </Prose>
              <br />
              {/* <Answer correct={responses?.canFactorCNOT?.selected === "no"}> */}
              <Answer>
                Remember the "rule" for tensor products of matrices:
                <M
                  display
                  t="\pmatrix{\enspace a & b \enspace \\ \enspace c & d \enspace} \otimes \pmatrix{\enspace e & f \enspace \\ \enspace g & h \enspace} =
            \pmatrix{\; a \, \pmatrix{\enspace e & f \enspace \\ \enspace g & h \enspace} & b \, \pmatrix{\enspace e & f \enspace \\ \enspace g & h \enspace} \; \\ \; c \, \pmatrix{\enspace e & f \enspace \\ \enspace g & h \enspace} & d \, \pmatrix{\enspace e & f \enspace \\ \enspace g & h \enspace} \;}"
                />
                <M
                  display
                  t="= \pmatrix{\; ae & af & be & bf \; \\ \; ag & ah & bg & bf \; \\ \; ce & cf & de & df \; \\ \; cg & ch & dg & df \;}"
                />
                Given this rule, could the tensor product of any two matrices{" "}
                <em>ever</em> result in the matrix form of <M t="U_{CNOT}" /> as
                shown in question A?
              </Answer>
            </>
          }
          choices={[
            ["yes", "Yes, it can be written as a tensor product"],
            [
              "no",
              <p>
                No, <M t="U_{CNOT} \neq A_1 \otimes A_2" />{" "}
              </p>,
            ],
          ]}
          // answer="no"
        />
      ),
    }),
    section({
      name: "dirac01HICNOT",
      body: (m) => (
        <>
          <Prose>
            The following circuit can be expressed in Dirac notation:
          </Prose>
          <QuantumCircuit
            t="\lstick{\ket{0}} & \gate{H} & \ctrl{1}  & \qw \\
                    \lstick{\ket{1}} & \qw & \targ & \qw"
          />
          <Prose>
            Choose all correct respresentations of the circuit below.
          </Prose>
          <ChooseAll
            model={m.dirac01HICNOT}
            choices={[
              [
                "(HxI)(U_CNOT)(0x1)",
                <M t="(H\otimes I)(U_{CNOT})(\ket{0}\otimes\ket{1})" />,
              ],
              [
                "(IxH)(U_CNOT)(0x1)",
                <M t="(I\otimes H)(U_{CNOT})(\ket{0}\otimes\ket{1})" />,
              ],
              [
                "(U_CNOT)(HxI)(0x1)",
                <M t="U_{CNOT}(H\otimes I)(\ket{0}\otimes\ket{1})" />,
              ],
              [
                "(U_CNOT)(IxH)(0x1)",
                <M t="U_{CNOT}(I\otimes H)(\ket{0}\otimes\ket{1})" />,
              ],
              ["(U_CNOT)(H0x1)", <M t="U_{CNOT}(H\ket{0}\otimes\ket{1})" />],
              // ["(U_CNOT)(0xH1)", <M t="U_{CNOT}(\ket{0}\otimes H\ket{1})" />],
              [
                "U_CNOT(H0)xU_CNOT(1)",
                <M t="U_{CNOT}(H\ket{0}) \otimes U_{CNOT}\ket{1}" />,
              ],
              // [
              //   "U_CNOT(0)xU_CNOT(H1)",
              //   <M t="U_{CNOT}\ket{0} \otimes U_{CNOT}(H\ket{1})" />,
              // ],
            ]}
            answer={["(U_CNOT)(H0x1)", "(U_CNOT)(HxI)(0x1)"]}
          />
        </>
      ),
      guidance: {
        nextMessage: () => "dynamicAnswer",
        messages: {
          dynamicAnswer: {
            body: ({ responses }) => (
              <Guidance.Dynamic
                status={
                  responses?.dirac01HICNOT?.selected?.includes(
                    "(U_CNOT)(H0x1)",
                  ) &&
                  responses?.dirac01HICNOT?.selected?.includes(
                    "(U_CNOT)(HxI)(0x1)",
                  ) &&
                  responses.dirac01HICNOT.selected.length === 2
                    ? "agree"
                    : "disagree"
                }
              >
                {!responses?.dirac01HICNOT?.selected?.includes(
                  "(U_CNOT)(HxI)(0x1)",
                ) ||
                !responses?.dirac01HICNOT?.selected?.includes(
                  "(U_CNOT)(H0x1)",
                ) ? (
                  <p>There are two correct answers!</p>
                ) : (
                  <></>
                )}
                {responses?.dirac01HICNOT?.selected?.includes(
                  "(HxI)(U_CNOT)(0x1)",
                ) ||
                responses?.dirac01HICNOT?.selected?.includes(
                  "(IxH)(U_CNOT)(0x1)",
                ) ? (
                  <p>
                    Neither{" "}
                    <M t="(H\otimes I)(U_{CNOT})(\ket{0}\otimes\ket{1})" /> nor
                    <M t="(I\otimes H)(U_{CNOT})(\ket{0}\otimes\ket{1})" /> is
                    correct because those expressions imply that{" "}
                    <M t="U_{CNOT}" /> applies first, while in the circuit,{" "}
                    <M t="H\otimes I" /> applies first.
                  </p>
                ) : (
                  <></>
                )}
                {responses?.dirac01HICNOT?.selected?.includes(
                  "(U_CNOT)(HxI)(0x1)",
                ) ? (
                  <p>
                    <M t="U_{CNOT}(H\otimes I)(\ket{0}\otimes\ket{1})" /> is
                    correct.
                  </p>
                ) : (
                  <></>
                )}
                {responses?.dirac01HICNOT?.selected?.includes(
                  "(U_CNOT)(IxH)(0x1)",
                ) ? (
                  <p>
                    <M t="U_{CNOT}(I\otimes H)(\ket{0}\otimes\ket{1})" /> is not
                    correct because the expression implies that H acts on{" "}
                    <M t="\ket{1}" />, while in the circuit, H acts on{" "}
                    <M t="\ket{0}" />.
                  </p>
                ) : (
                  <></>
                )}
                {responses?.dirac01HICNOT?.selected?.includes(
                  "(U_CNOT)(H0x1)",
                ) ? (
                  <p>
                    <M t="U_{CNOT}(H\ket{0}\otimes\ket{1})" /> is correct.
                  </p>
                ) : (
                  <></>
                )}
                {responses?.dirac01HICNOT?.selected?.includes(
                  "U_CNOT(H0)xU_CNOT(1)",
                ) ? (
                  <p>
                    <M t="U_{CNOT}(H\ket{0}) \otimes U_{CNOT}\ket{1}" /> is not
                    correct because it implies that <M t="U_{CNOT}" /> applies
                    separately to <M t="\ket{0}" /> and <M t="\ket{1}" />, while
                    in fact, <M t="U_{CNOT}" /> acts on combined two-qubit
                    states.
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

    section({
      name: "output01HICNOT",
      body: (m) => (
        <>
          <TextBox
            model={m.output01HICNOT}
            label={
              <Prose>
                What is the output state of this circuit?{" "}
                <QuantumCircuit
                  t="\lstick{\ket{0}} & \gate{H} & \ctrl{1}  & \qw \\
                    \lstick{\ket{1}} & \qw & \targ & \qw"
                />
              </Prose>
            }
          />

          <Answer>
            <M display t="(U_{CNOT})(H \otimes I)(\ket{01}) =" />
            <M display t="U_{CNOT}(\ket{+}\otimes\ket{1}) =" />
            <M
              display
              t="U_{CNOT}(\frac{1}{\sqrt{2}}[\ket{01} + \ket{11}]) ="
            />
            <M display t="\frac{1}{\sqrt{2}}[\ket{01} + \ket{10}]" />
          </Answer>
        </>
      ),
      hints: [
        [
          hint({
            name: "gateIsLinear",
            body: (
              <Prose>
                The <M t="U_{CNOT}" /> gate is linear, which means that,
                <M
                  display
                  t="U_{CNOT}(a \ket{01} + b\ket{11}) = a \ U_{CNOT} \ket{01} + b\ U_{CNOT}\ket{11}"
                />
              </Prose>
            ),
          }),
        ],
      ],
    }),

    section({
      name: "output01HICNOTProp0Qubit1",
      body: (m, { responses }) => (
        <>
          <Prose>
            In the circuit just above, what is the probability of measuring a
            <M t="\ket{0}" /> on the first output qubit?
          </Prose>

          <LabelsLeft>
            <Decimal
              model={m.output01HICNOTProp0Qubit1}
              label={<Prose>First Qubit: </Prose>}
            />
          </LabelsLeft>

          <Answer
            correct={
              responses?.output01HICNOTProp0Qubit1 === 0.5 ||
              responses?.output01HICNOTProp0Qubit1 === 50
            }
          >
            50%
          </Answer>
        </>
      ),
    }),
    section({
      name: "output01HICNOTProp0Qubit2",
      body: (m, { responses }) => (
        <>
          <Prose>
            Going back to the circuit above, what is the probability of
            measuring a
            <M t="\ket{0}" /> on the second output qubit?
          </Prose>

          <LabelsLeft>
            <Decimal
              model={m.output01HICNOTProp0Qubit2}
              label={<Prose>Second Qubit: </Prose>}
            />
          </LabelsLeft>

          <Answer
            correct={
              responses?.output01HICNOTProp0Qubit2 === 0.5 ||
              responses?.output01HICNOTProp0Qubit2 === 50
            }
          >
            50%
          </Answer>
        </>
      ),
    }),

    section({
      name: "output01HICNOTProb00Qubit2",
      body: (m, { responses }) => (
        <>
          <Prose>
            Finally, what is the probability of measuring a
            <M t="\ket{00}" /> on the combined two-qubit state?
          </Prose>

          <LabelsLeft>
            <Decimal
              model={m.output01HICNOTProb00Qubit2}
              label={<Prose>Combined State: </Prose>}
            />
          </LabelsLeft>

          <Answer correct={responses?.output01HICNOTProb00Qubit2 === 0.0}>
            <Prose>
              <p>0%</p>

              <p>
                This answer might strike you as surprising. This is not how
                classical probability works: if the two qubits were independent,
                then you would expect the probability of a <M t="\ket{01}" />{" "}
                outcome to be <M t="1/2 \times 1/2 = 0.25" />.
              </p>

              <p>
                There is something <em> very interesting</em> about this output
                state. Let’s explore this in the rest of the tutorial.
              </p>
            </Prose>
          </Answer>
        </>
      ),
    }),
  ],
}));
