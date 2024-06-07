import {
  Answer,
  ChooseAll,
  ChooseOne,
  M,
  Prose,
  QuantumCircuit,
} from "@/components";
import { page } from "@/tutorial";
import setup from "./setup";

export default page(setup, ({ section }) => ({
  name: "operators",
  label: "Operators",
  answers: "provided",
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
      name: "arbitraryOutputZxI",
      body: (m, { responses }) => (
        <>
          <ChooseAll
            model={m.arbitraryOutputZxI}
            label={
              <Prose>
                <p>Consider the following circuit.</p>

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
              [
                "Z(|ψ1⟩ ⊗ |ψ2⟩)",
                <M t="Z(\ket{\psi_1} \otimes \ket{\psi_2})" />,
              ],
              [
                "(Z |ψ1⟩) ⊗ |ψ2⟩",
                <M t="(Z\ket{\psi_1}) \otimes \ket{\psi_2}" />,
              ],
              [
                "(Z ⊗ I)(|ψ1⟩ ⊗ |ψ2⟩)",
                <M t="(Z\otimes I)(\ket{\psi_1} \otimes \ket{\psi_2})" />,
              ],
              [
                "(I ⊗ Z)(|ψ2⟩ ⊗ |ψ1⟩)",
                <M t="(I\otimes Z)(\ket{\psi_1} \otimes \ket{\psi_2})" />,
              ],
            ]}
            // answer={["(Z |ψ1⟩) ⊗ |ψ2⟩", "(Z ⊗ I)(|ψ1⟩ ⊗ |ψ2⟩)"]}
          />

          <Answer
            correct={
              responses?.arbitraryOutputZxI?.selected?.includes(
                "(Z |ψ1⟩) ⊗ |ψ2⟩"
              ) &&
              responses?.arbitraryOutputZxI?.selected?.includes(
                "(Z ⊗ I)(|ψ1⟩ ⊗ |ψ2⟩)"
              ) &&
              !responses?.arbitraryOutputZxI?.selected?.includes(
                "Z(|ψ1⟩ ⊗ |ψ2⟩)"
              ) &&
              !responses?.arbitraryOutputZxI?.selected?.includes(
                "(I ⊗ Z)(|ψ2⟩ ⊗ |ψ1⟩)"
              )
            }
          >
            <ul>
              <li>
                <M t="Z(\ket{\psi_1} \otimes \ket{\psi_2})" /> is{" "}
                <b>incorrect</b> because it treats <M t="Z" /> as operating on{" "}
                <em>both</em> <M t="\ket{\psi_1}" /> and <M t="\ket{\psi_2}" />{" "}
                even though <M t="Z" /> is a single-qubit (2x2 matrix) operator.
                You need a two-qubit (4x4 matrix) operator to act on two qubits
                at once!
              </li>
              <li>
                <M t="(Z\ket{\psi_1}) \otimes \ket{\psi_2}" /> is <b>correct</b>
                .
              </li>
              <li>
                <M t="(Z\otimes I)(\ket{\psi_1} \otimes \ket{\psi_2})" /> is{" "}
                <b>correct</b>.
              </li>
              <li>
                <M t="(I\otimes Z)(\ket{\psi_1} \otimes \ket{\psi_2})" /> is{" "}
                <b>incorrect</b> because it acts <M t="I" /> on{" "}
                <M t="\ket{\psi_1}" /> and <M t="Z" /> on <M t="\ket{\psi_2}" />
                , which is not what is shown in the circuit. Similarly,{" "}
                <M
                  display={true}
                  t="(A \otimes B \otimes C)(\ket{\psi_1} \otimes \ket{\psi_2} \otimes \ket{\psi_3})"
                />
                {/* <br /> */}
                acts <M t="A" /> on <M t="\ket{\psi_1}" />, <M t="B" /> on{" "}
                <M t="\ket{\psi_2}" />, and <M t="C" /> on{" "}
                <M t="\ket{\psi_3}" />.
              </li>
            </ul>
          </Answer>
        </>
      ),
    }),

    section({
      name: "redrawnZxI",
      enumerate: false,
      body: (
        <>
          <p>At the top of this page, we introduced the following circuit:</p>

          <QuantumCircuit
            t="
              \lstick{\ket{\psi}} & \gate{Z} & \qw \\
              \lstick{\ket{\phi}} & \gate{X} & \qw \\
              "
          />

          <p>
            This circuit can be redrawn with some <M t="I" /> (identity) gates
            added:
          </p>

          <QuantumCircuit
            t="
              \lstick{\ket{\psi}} & \gate{Z} & \gate{I} & \qw \\
              \lstick{\ket{\phi}} & \gate{I} & \gate{X} & \qw \\
              "
          />

          <p>
            Do you see that this circuit is functionally equivalent to the
            previous one?
          </p>
        </>
      ),
      continue: {
        label: "Interesting",
      },
    }),

    section({
      name: "findIInCircuit",
      body: (m) => (
        <ChooseOne
          model={m.findIInCircuit}
          label={
            <Prose>
              Consider the second <M t="{\color{blue} \mathbf{I}}" /> in the
              following expression:{" "}
              <M
                display
                t="(I \otimes X)(Z\otimes {\color{blue} \mathbf{I}}) (\ket{\psi} \otimes \ket{\phi} )"
              />
              Which gate in the circuit above is the{" "}
              <M t="{\color{blue} \mathbf{I}}" /> referring to?
            </Prose>
          }
          choices={[
            [
              "top",
              <>
                The <M t="I" /> on the top wire (qubit 1)
              </>,
            ],
            [
              "bottom",
              <>
                The <M t="I" /> on the bottom wire (qubit 2)
              </>,
            ],
            ["ambiguous", <>It’s ambiguous</>],
          ]}
          answer={"bottom"}
        />
      ),
    }),
  ],
}));
