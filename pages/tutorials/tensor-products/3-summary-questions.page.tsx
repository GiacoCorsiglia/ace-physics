import { M, Prose, QuantumCircuit, TextBox, Toggle } from "@/components";
import { page } from "@/tutorial";
import setup from "./setup";

export default page(setup, ({ section }) => ({
  name: "summaryQuestions",
  label: "Summary Questions",
  answers: "none",
  sections: [
    section({
      name: "summaryIntro",
      body: (
        <Prose>
          <p>Let’s practice with this new notation.</p>
        </Prose>
      ),
    }),
    section({
      name: "twoQubitStateResult",
      body: (m) => (
        <TextBox
          model={m.twoQubitStateFinalResult}
          label={
            <>
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
              <QuantumCircuit
                t="
                \lstick{\ket{1}} & \gate{H} &  \gate{X} & \qw \\
                \lstick{\ket{1}} & \gate{Z} & \qw & \qw \\
                "
              />
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
