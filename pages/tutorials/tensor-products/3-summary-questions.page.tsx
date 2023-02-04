import {
  Answer,
  Callout,
  ChooseAll,
  M,
  Prose,
  QuantumCircuit,
  TextBox,
  Toggle,
} from "@/components";
import { page } from "@/tutorial";
import { PencilIcon } from "@primer/octicons-react";
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
              "(I⊗H) (X⊗Z) (|ψ2>⊗|ψ1>)",
              <QuantumCircuit
                t="
                \lstick{\ket{\psi2}} & \gate{X} & \gate{I} \\
                \lstick{\ket{\psi1}} & \gate{Z} & \gate{H}
                "
              />,
            ],
            [
              "(H⊗_) (Z⊗X) (|ψ1>⊗|ψ2>)",
              <QuantumCircuit
                t="
                \lstick{\ket{\psi1}} & \gate{Z} & \gate{H} \\
                \lstick{\ket{\psi2}} & \qw & \gate{X}
                "
              />,
            ],
            [
              "(Z⊗X) (H⊗_) (|ψ1>⊗|ψ2>)",
              <QuantumCircuit
                t="
                \lstick{\ket{\psi1}} & \gate{H} & \gate{Z} \\
                \lstick{\ket{\psi2}} & \gate{I} & \gate{X}
                "
              />,
            ],
            [
              "(H⊗I) (Z⊗X) (|ψ1>⊗|ψ2>)",
              <QuantumCircuit
                t="
                \lstick{\ket{\psi1}} & \gate{Z} & \gate{H} \\
                \lstick{\ket{\psi2}} & \gate{X} & \gate{I}
                "
              />,
            ],
            [
              "(I⊗H) (X⊗Z) (|ψ1>⊗|ψ2>)",
              <QuantumCircuit
                t="
                \lstick{\ket{\psi1}} & \gate{X} & \qw \\
                \lstick{\ket{\psi2}} & \gate{Z} & \gate{H}
                "
              />,
            ],
          ]}
        />
      ),
    }),

    section({
      name: "XxIZxXPsi1xPsi2EqualsXZxIXPs1xPsi2",
      body: (m) => (
        <Toggle
          model={m.XxIZxXPsi1xPsi2EqualsXZxIXPs1xPsi2}
          label={
            <Prose>
              Is the following <i>true</i> or <i>false</i>?
              <M
                display
                t="(X \otimes I ) (Z \otimes X) (\ket{\psi_1} \otimes \ket{\psi_2} )  = (X Z)\otimes (I X )  (\ket{\psi_1} \otimes \ket{\psi_2} )"
              />
            </Prose>
          }
          choices={[
            ["true", "True"],
            ["false", "False"],
          ]}
          answer={"true"}
          explanation={
            <>
              The diagram is:
              <QuantumCircuit
                t="
                \lstick{\ket{\psi_1}} & \gate{Z} & \gate{X} \\
                \lstick{\ket{\psi_2}} & \gate{X} & \qw \\
                "
              />
              for <i>either</i> expression!
            </>
          }
        />
      ),
    }),

    section({
      name: "XxZXxZPsi1xPsi2EqualsXZPsi1xXZPsi2",
      body: (m) => (
        <Toggle
          model={m.XxZXxZPsi1xPsi2EqualsXZPsi1xXZPsi2}
          label={
            <Prose>
              Is the following <i>true</i> or <i>false</i>?
              <M
                display
                t="(X \otimes Z ) (X \otimes Z) (\ket{\psi_1} \otimes \ket{\psi_2} )  = X Z\ket{\psi_1}\otimes  X Z \ket{\psi_2}"
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
            We found that either of the following equations below are correct.
            <M display t="((X H) \otimes Z) (\ket{\psi_1} x \ket{\phi})" />
            <Prose justify="center">or</Prose>
            <M
              display
              t="(X \otimes I) (H \otimes Z) (\ket{\psi_1} \otimes \ket{\phi})"
            />
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

          <Prose faded size="small">
            Copy-paste these symbols if useful:{" "}
            <span style={{ marginLeft: "1rem" }}>ϕ</span>
            <span style={{ marginLeft: "1rem" }}>ψ</span>
            <span style={{ marginLeft: "1rem" }}>⊗</span>
          </Prose>

          <Answer>
            We found that either of the following equations below are correct.
            <M
              display
              t="\frac{-1}{\sqrt{2}} \ket{11} + \frac{1}{\sqrt{2}} \ket{01}"
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
