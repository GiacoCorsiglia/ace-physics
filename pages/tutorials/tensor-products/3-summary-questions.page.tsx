import {
  Answer,
  Callout,
  ChooseAll,
  Image,
  M,
  Prose,
  QuantumCircuit,
  TextBox,
  Toggle,
} from "@/components";
import { page } from "@/tutorial";
import { PencilIcon } from "@primer/octicons-react";
import TP3C1 from "./media/TP 3C Circuit 1.png";
import TP3C2 from "./media/TP 3C Circuit 2.png";
import setup from "./setup";

export default page(setup, ({ section }) => ({
  name: "summaryQuestions",
  label: "Summary Questions",
  answers: "provided",
  sections: [
    section({
      name: "summaryIntro",
      body: (
        <Prose>
          <p>Let’s practice with this new notation.</p>
        </Prose>
      ),
      continue: {
        label: "Let’s do it",
      },
    }),

    section({
      name: "sketchHxIZxXPsi1xPsi2",
      body: () => (
        <>
          <Prose>
            <p>
              What would the circuit for the following two-qubit state look
              like?
            </p>
            <M
              display
              t="(H \otimes I ) (Z \otimes X) (\ket{\psi_1} \otimes \ket{\psi_2} )"
            />
          </Prose>

          <Callout color="blue" iconLeft={<PencilIcon />}>
            Draw the circuit on scrap paper.
          </Callout>
        </>
      ),
      continue: {
        label: "I drew the circuit",
      },
    }),

    section({
      name: "selectHxIZxXPsi1xPsi2",
      body: (m) => (
        <ChooseAll
          label={
            <Prose>
              Select ALL circuit diagrams that are equivalent to your drawing
              (there may be more than one):
            </Prose>
          }
          model={m.selectHxIZxXPsi1xPsi2}
          choices={[
            [
              "(I⊗H) (X⊗Z) (|ψ1>⊗|ψ2>)",
              <QuantumCircuit
                t="
                \lstick{\ket{\psi_1}} & \gate{X} & \gate{I} \\
                \lstick{\ket{\psi_2}} & \gate{Z} & \gate{H}
                "
              />,
            ],
            [
              "(H⊗_) (Z⊗X) (|ψ1>⊗|ψ2>)",
              <QuantumCircuit
                t="
                \lstick{\ket{\psi_1}} & \gate{Z} & \gate{H} \\
                \lstick{\ket{\psi_2}} & \qw & \gate{X}
                "
              />,
            ],
            [
              "(Z⊗X) (H⊗_) (|ψ1>⊗|ψ2>)",
              <QuantumCircuit
                t="
                \lstick{\ket{\psi_1}} & \gate{H} & \gate{Z} \\
                \lstick{\ket{\psi_2}} & \gate{I} & \gate{X}
                "
              />,
            ],
            [
              "(H⊗I) (Z⊗X) (|ψ1>⊗|ψ2>)",
              <QuantumCircuit
                t="
                \lstick{\ket{\psi_1}} & \gate{Z} & \gate{H} \\
                \lstick{\ket{\psi_2}} & \gate{X} & \gate{I}
                "
              />,
            ],
            [
              "(_⊗H) (X⊗Z) (|ψ1>⊗|ψ2>)",
              <QuantumCircuit
                t="
                \lstick{\ket{\psi_1}} & \gate{X} & \qw \\
                \lstick{\ket{\psi_2}} & \gate{Z} & \gate{H}
                "
              />,
            ],
          ]}
          answer={["(H⊗_) (Z⊗X) (|ψ1>⊗|ψ2>)", "(H⊗I) (Z⊗X) (|ψ1>⊗|ψ2>)"]}
        />
      ),
      guidance: {
        nextMessage: (responses, state) => {
          if (
            !responses.selectHxIZxXPsi1xPsi2?.selected?.includes(
              "(Z⊗X) (H⊗_) (|ψ1>⊗|ψ2>)",
            ) &&
            (responses.selectHxIZxXPsi1xPsi2?.selected?.includes(
              "(_⊗H) (X⊗Z) (|ψ1>⊗|ψ2>)",
            ) ||
              responses.selectHxIZxXPsi1xPsi2?.selected?.includes(
                "(I⊗H) (X⊗Z) (|ψ1>⊗|ψ2>)",
              ))
          ) {
            return "picked1or5";
          }
          if (
            !responses.selectHxIZxXPsi1xPsi2?.selected?.includes(
              "(I⊗H) (X⊗Z) (|ψ1>⊗|ψ2>)",
            ) &&
            !responses.selectHxIZxXPsi1xPsi2?.selected?.includes(
              "(_⊗H) (X⊗Z) (|ψ1>⊗|ψ2>)",
            ) &&
            responses.selectHxIZxXPsi1xPsi2?.selected?.includes(
              "(Z⊗X) (H⊗_) (|ψ1>⊗|ψ2>)",
            )
          ) {
            return "picked3";
          }
          if (
            responses.selectHxIZxXPsi1xPsi2?.selected?.includes(
              "(Z⊗X) (H⊗_) (|ψ1>⊗|ψ2>)",
            ) &&
            (responses.selectHxIZxXPsi1xPsi2?.selected?.includes(
              "(I⊗H) (X⊗Z) (|ψ1>⊗|ψ2>)",
            ) ||
              responses.selectHxIZxXPsi1xPsi2?.selected?.includes(
                "(_⊗H) (X⊗Z) (|ψ1>⊗|ψ2>)",
              ))
          ) {
            return "picked1or5and3";
          }
          if (
            (responses.selectHxIZxXPsi1xPsi2?.selected?.includes(
              "(H⊗I) (Z⊗X) (|ψ1>⊗|ψ2>)",
            ) ||
              responses.selectHxIZxXPsi1xPsi2?.selected?.includes(
                "(H⊗_) (Z⊗X) (|ψ1>⊗|ψ2>)",
              )) &&
            !(
              responses.selectHxIZxXPsi1xPsi2?.selected?.includes(
                "(I⊗H) (X⊗Z) (|ψ1>⊗|ψ2>)",
              ) ||
              responses.selectHxIZxXPsi1xPsi2?.selected?.includes(
                "(Z⊗X) (H⊗_) (|ψ1>⊗|ψ2>)",
              ) ||
              responses.selectHxIZxXPsi1xPsi2?.selected?.includes(
                "(_⊗H) (X⊗Z) (|ψ1>⊗|ψ2>)",
              )
            )
          ) {
            return "nowCorrect";
          }
          return null;
        },
        messages: {
          picked1or5: {
            body: (
              <Callout color="red">
                Check your qubit ordering: remember that in each parenthetical{" "}
                <M t="(A\otimes B)" />, A corresponds to the first qubit and B
                corresponds to the second qubit.
              </Callout>
            ),
            onContinue: "nextMessage",
          },
          picked3: {
            body: (
              <Callout color="red">
                Check which gates apply to the qubits first: for example, you
                can write the expression <M t="XZ\ket{\psi}" /> as{" "}
                <M t="X(Z\ket{\psi})" />, meaning that Z applies first, and then
                X.
              </Callout>
            ),
            onContinue: "nextMessage",
          },
          picked1or5and3: {
            body: (
              <Callout color="red">
                <p>
                  Check your qubit ordering: remember that in each parenthetical{" "}
                  <M t="(A\otimes B)" />, A corresponds to the first qubit and B
                  corresponds to the second qubit.
                </p>{" "}
                <p>
                  Also, check which gates apply to the qubits first: for
                  example, you can write the expression <M t="XZ\ket{\psi}" />{" "}
                  as <M t="X(Z\ket{\psi})" />, meaning that Z applies first, and
                  then X.
                </p>
              </Callout>
            ),
            onContinue: "nextMessage",
          },
          nowCorrect: {
            body: (state) => (
              <Callout color="green">
                <p>You've got it!</p>
                {!state.responses?.selectHxIZxXPsi1xPsi2?.selected?.includes(
                  "(H⊗I) (Z⊗X) (|ψ1>⊗|ψ2>)",
                ) ||
                !state.responses?.selectHxIZxXPsi1xPsi2?.selected?.includes(
                  "(H⊗_) (Z⊗X) (|ψ1>⊗|ψ2>)",
                ) ? (
                  <p>
                    There's another correct answer. This message will disappear
                    if you find it, but either way, feel free to move on!
                  </p>
                ) : null}
              </Callout>
            ),
            onContinue: "nextSection",
          },
        },
      },
    }),

    section({
      name: "XxIZxXPsi1xPsi2EqualsXZxIXPs1xPsi2",
      body: (m) => (
        <>
          <Toggle
            model={m.XxIZxXPsi1xPsi2EqualsXZxIXPs1xPsi2}
            label={
              <Prose>
                Is the following equality <i>true</i> or <i>false</i>?
                <M
                  display
                  t="{(X \otimes I ) (Z \otimes X) (\ket{\psi_1} \otimes \ket{\psi_2} )}  \breakIfNarrow{=} {(X Z)\otimes (I X )  (\ket{\psi_1} \otimes \ket{\psi_2} )}"
                />
              </Prose>
            }
            choices={[
              ["true", "True"],
              ["false", "False"],
            ]}
            answer={"true"}
            explanation={
              // <>
              //   The diagram is:
              //   <QuantumCircuit
              //     t="
              //     \lstick{\ket{\psi_1}} & \gate{Z} & \gate{X} \\
              //     \lstick{\ket{\psi_2}} & \gate{X} & \qw \\
              //     "
              //   />
              //   for <i>either</i> expression!
              // </>
              <>
                Both sides are equal to{" "}
                <M t="XZ\ket{\psi_1} \otimes IX\ket{\psi_2}" />. You could draw
                the left side of the equation above like this:
                {/* <QuantumCircuit
                  t="
                \lstick{\ket{\psi_1}} & \gate{Z} & \gate{X} \\
                \lstick{\ket{\psi_2}} & \gate{X} & \gate{I} \gategroup{1}{2}{2}{2}{.7em}{--} \gategroup{1}{3}{2}{3}{.7em}{--}
                "
                /> */}
                <Image maxWidth="35%" src={TP3C1} alt="" />
                And the right side of the equation above like this:
                {/* <QuantumCircuit
                  t="
                \lstick{\ket{\psi_1}} & \gate{Z} & \gate{X} \\
                \lstick{\ket{\psi_2}} & \gate{X} & \gate{I} \gategroup{1}{1}{2}{3}{.7em}{--}
                "
                /> */}
                <Image maxWidth="35%" src={TP3C2} alt="" />
              </>
            }
          />
        </>
      ),
    }),

    section({
      name: "XxZXxZPsi1xPsi2EqualsXZPsi1xXZPsi2",
      body: (m) => (
        <Toggle
          model={m.XxZXxZPsi1xPsi2EqualsXZPsi1xXZPsi2}
          label={
            <Prose>
              Is the following equality <i>true</i> or <i>false</i>?
              {/* <M
                display
                t="
                  \begin{gathered}
                  (X \otimes Z ) (X \otimes Z) (\ket{\psi_1} \otimes \ket{\psi_2} ) \\
                  =
                  X Z\ket{\psi_1}\otimes  X Z \ket{\psi_2}
                  \end{gathered}
                "
              /> */}
              <M
                display
                t="
                  {(X \otimes Z ) (X \otimes Z) (\ket{\psi_1} \otimes \ket{\psi_2} )}
                  \breakIfNarrow{=}
                  {X Z\ket{\psi_1}\otimes  X Z \ket{\psi_2}}
                "
              />
            </Prose>
          }
          choices={[
            ["true", "True"],
            ["false", "False"],
          ]}
          answer={"false"}
          explanation={
            <>
              Both <M t="Z" /> operators are on the right hand side of the{" "}
              <M t="\otimes" /> symbol, meaning that they both should be applied
              to <M t="\ket{\psi_2}" />, because it is also on the right hand
              side of the <M t="\otimes" /> symbol.
            </>
          }
        />
      ),
    }),

    section({
      name: "equationXHPsixZPhi",
      body: (m) => (
        <>
          <TextBox
            model={m.equationXHPsixZPhi}
            label={
              <Prose>
                <p>Represent the circuit shown below as an equation:</p>

                <QuantumCircuit
                  t="
                  \lstick{\ket{\psi}} & \gate{H} &  \gate{X} & \qw \\
                  \lstick{\ket{\phi}} & \gate{Z} & \qw & \qw \\
                  "
                />
              </Prose>
            }
          />

          <Prose faded size="small">
            Copy-paste these symbols if useful:{" "}
            <span style={{ marginLeft: "1rem" }}>ϕ</span>
            <span style={{ marginLeft: "1rem" }}>ψ</span>
            <span style={{ marginLeft: "1rem" }}>⊗</span>
          </Prose>

          <Answer>
            We found that any of the following equations below are correct.
            <M display t="((X H) \otimes Z) (\ket{\psi} \otimes \ket{\phi})" />
            <Prose justify="center">or</Prose>
            <M
              display
              t="(X \otimes I) (H \otimes Z) (\ket{\psi} \otimes \ket{\phi})"
            />
            <Prose justify="center">or</Prose>
            <M display t="XH\ket{\psi} \otimes Z\ket{\phi}" />
          </Answer>
        </>
      ),
    }),

    section({
      name: "outputXH1xZ1",
      body: (m) => (
        <>
          <TextBox
            model={m.outputXH1xZ1}
            label={
              <Prose>
                If <M t="\ket{\psi}=\ket{1}" /> and <M t="\ket{\phi}=\ket{1}" />
                , what is the output state of the above circuit?
              </Prose>
            }
          />

          <Answer>
            We found that either of the following equations below are correct.
            <M
              display
              t="\frac{1}{\sqrt{2}} \ket{01} - \frac{1}{\sqrt{2}} \ket{11}"
            />
            <M
              display
              t="\frac{1}{\sqrt{2}} (\ket{0} - \ket{1}) \otimes \ket{1}"
            />
          </Answer>
        </>
      ),
    }),
  ],
}));
