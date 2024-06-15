import {
  Answer,
  Callout,
  ChooseAll,
  Decimal,
  M,
  Prose,
  QuantumCircuit,
  TextBox,
  Toggle,
} from "@/components";
import { page } from "@/tutorial";
import setup from "./setup";

export default page(setup, ({ section }) => ({
  name: "consequencesOfEntanglement",
  label: "Consequences of Entanglement",
  answers: "provided",
  sections: [
    section({
      name: "practiceQuestionsIntro",
      body: (
        <>
          <Prose>
            Now that you've spent some time with the CNOT gate, let's go through
            some practice questions.
          </Prose>
        </>
      ),
    }),
    section({
      name: "whichInputsToCnotEntangle",
      body: (m) => (
        <>
          <ChooseAll
            model={m.whichInputsToCnotEntangle}
            label={
              <>
                <Prose>
                  Consider the following circuit:{" "}
                  <QuantumCircuit
                    t="
              \lstick{\ket{?}}  & \ctrl{1} & \qw \\
              \lstick{\ket{0}} & \targ & \qw
              "
                  />
                  Choose all options for <M t="\ket{?}" /> such that the output
                  state is entangled.
                </Prose>
              </>
            }
            choices={[
              ["|0>", <M t="\ket{0}" />],
              ["|1>", <M t="\ket{1}" />],
              ["|+>", <M t="\ket{+}" />],
              ["|->", <M t="\ket{-}" />],
            ]}
            answer={["|+>", "|->"]}
            explanation={
              <Prose>
                Here's what the circuit does in the cases where the top qubit is{" "}
                <M t="\ket{+}" /> and <M t="\ket{-}" />.{" "}
                <M
                  display
                  t="U_{CNOT}(\ket{+}\otimes\ket{0}) = U_{CNOT}\frac{1}{\sqrt{2}}(\ket{00} + \ket{10}) = \frac{1}{\sqrt{2}}(\ket{00} + \ket{11}) = \ket{\beta_{00}}"
                />
                <M
                  display
                  t="U_{CNOT}(\ket{-}\otimes\ket{0}) = U_{CNOT}\frac{1}{\sqrt{2}}(\ket{00} - \ket{10}) = \frac{1}{\sqrt{2}}(\ket{00} - \ket{11}) = \ket{\beta_{10}}"
                />
                Both of these output states are entangled.
              </Prose>
            }
          />
        </>
      ),
      guidance: {
        nextMessage: (responses) => {
          if (
            responses.whichInputsToCnotEntangle?.selected?.includes("|+>") &&
            responses.whichInputsToCnotEntangle?.selected?.includes("|->")
          ) {
            if (
              responses.whichInputsToCnotEntangle.selected.includes("|0>") ||
              responses.whichInputsToCnotEntangle.selected.includes("|1>")
            ) {
              return "basisStatesDontEntangle";
            }
            // return "correct";
            return null;
          }
          if (
            (responses.whichInputsToCnotEntangle?.selected?.includes("|+>") &&
              !responses.whichInputsToCnotEntangle?.selected?.includes(
                "|->",
              )) ||
            (!responses.whichInputsToCnotEntangle?.selected?.includes("|+>") &&
              responses.whichInputsToCnotEntangle?.selected?.includes("|->"))
          ) {
            if (
              responses.whichInputsToCnotEntangle.selected.includes("|0>") ||
              responses.whichInputsToCnotEntangle.selected.includes("|1>")
            ) {
              return "wrongAndMissingRight";
            }
            return "missingAnEntangler";
          }
          if (
            responses.whichInputsToCnotEntangle?.selected?.includes("|0>") ||
            responses.whichInputsToCnotEntangle?.selected?.includes("|1>")
          ) {
            return "basisStatesDontEntangle";
          }
          return null;
        },
        messages: {
          correct: {
            body: <Callout color="green"></Callout>,
            onContinue: "nextSection",
          },
          basisStatesDontEntangle: {
            body: (
              <Callout color="red">
                <p>
                  If the top qubit is <M t="\ket{0}" /> or <M t="\ket{1}" />,
                  then the two-qubit state is <M t="\ket{00}" /> or{" "}
                  <M t="\ket{10}" />. Recall that{" "}
                  <M
                    display
                    t="U_{CNOT}\ket{00} = \ket{00} \\ U_{CNOT}\ket{10} = \ket{11}"
                  />
                  Is either of these output states entangled?
                </p>
              </Callout>
            ),
            onContinue: "nextSection",
          },
          missingAnEntangler: {
            body: (
              <Callout color="red">
                There is more than one correct answer.
              </Callout>
            ),
            onContinue: "nextSection",
          },
          wrongAndMissingRight: {
            body: (
              <Callout color="red">
                <p>There is more than one correct answer.</p>
                <p>
                  Additionally, if the top qubit is <M t="\ket{0}" /> or{" "}
                  <M t="\ket{1}" />, then the two-qubit state is{" "}
                  <M t="\ket{00}" /> or <M t="\ket{10}" />. Recall that{" "}
                  <M
                    display
                    t="U_{CNOT}\ket{00} = \ket{00} \\ U_{CNOT}\ket{10} = \ket{11}"
                  />
                  Is either of these output states entangled?
                </p>
              </Callout>
            ),
            onContinue: "nextSection",
          },
        },
      },
    }),

    section({
      name: "outputOfTwoCNOTs",
      body: (m) => (
        <>
          <Prose>
            <p>Consider a circuit with two CNOTs, one after the other.</p>
          </Prose>
          <TextBox
            model={m.outputOfTwoCNOTs1}
            label={
              <>
                <Prose>
                  <p>
                    <QuantumCircuit
                      t="
              \lstick{\ket{1}}  & \ctrl{1} & \qw & \ctrl{1} & \qw \\
              \lstick{\ket{0}} & \targ & \qw & \targ & \qw
              "
                    />
                    What is the output of the above circuit?
                  </p>
                </Prose>
              </>
            }
          />
          <Answer>
            <p>
              Consider the action of two CNOTs in a row. If the control qubit is{" "}
              <M t="\ket{0}" />, the two CNOTs do nothing. If the control qubit
              is <M t="\ket{1}" />, the first CNOT flips the target qubit, and
              the second CNOT flips the target qubit again.
            </p>
            <p>
              The output of this circuit is <M t="\ket{10}" />, because the
              effect of these two CNOTs is to cancel each other out.
            </p>
          </Answer>
          <TextBox
            model={m.outputofTwoCNOTs2}
            label={
              <>
                <Prose>
                  <p>
                    <QuantumCircuit
                      t="
              \lstick{\ket{+}}  & \ctrl{1} & \qw & \ctrl{1} & \qw \\
              \lstick{\ket{0}} & \targ & \qw & \targ & \qw
              "
                    />
                    What is the output of the above circuit (now with a
                    different top qubit)?
                  </p>
                </Prose>
              </>
            }
          />
          <Answer>
            <p>
              As before, the output of this circuit is{" "}
              <M t="\ket{+}\otimes\ket{0}" />, because the effect of these two
              CNOTs is to cancel each other out.
            </p>
          </Answer>
        </>
      ),
    }),

    section({
      name: "upsideDownEntangler",
      body: (m) => (
        <>
          {" "}
          <Toggle
            model={m.upsideDownEntangledAfterH}
            label={
              <>
                <Prose>
                  <p>
                    Consider the following circuit:{" "}
                    <QuantumCircuit
                      t="\lstick{\ket{0}} & \qw & \targ & \qw
                    \\ \lstick{\ket{+}} & \gate{H} & \ctrl{-1} & \qw"
                    />
                    After the Hadamard gate, is the two-qubit state entangled?
                  </p>
                </Prose>
              </>
            }
            choices={[
              ["entangled", "Yes, the qubits are entangled"],
              ["not entangled", "No, the qubits are not entangled"],
            ]}
            answer={"not entangled"}
            explanation={
              <p>
                <M
                  display
                  t="(I\otimes H)(\ket{0}\otimes\ket{+}) = \ket{0}\otimes H\ket{+} = \ket{01}"
                />
              </p>
            }
          />
          <Toggle
            model={m.upsideDownEntangledAfterCNOT}
            label={
              <>
                <Prose>
                  <p>After the CNOT gate, is the two-qubit state entangled?</p>
                </Prose>
              </>
            }
            choices={[
              ["entangled", "Yes, the qubits are entangled"],
              ["not entangled", "No, the qubits are not entangled"],
            ]}
            answer={"not entangled"}
            explanation={
              <>
                <p>
                  Where <M t="U_{CNOT}" /> represents an CNOT with the control
                  as the right qubit and the target as the left qubit,{" "}
                  <M display t="U_{CNOT}\ket{01} = \ket{11}" />
                </p>
                <p>Neither this state or the previous state are entangled.</p>
              </>
            }
          />
        </>
      ),
    }),

    section({
      name: "upsideDownEntangler01",
      body: (m, state) => (
        <>
          <Decimal
            model={m.upsideDownEntangler01}
            label={
              <>
                <Prose>
                  <p>
                    Suppose we fed a different input state to the above circuit:{" "}
                    <QuantumCircuit
                      t="\lstick{\ket{0}} & \qw & \targ & \qw
                    \\ \lstick{\ket{1}} & \gate{H} & \ctrl{-1} & \qw"
                    />
                  </p>
                  <p>
                    If, after the circuit, the top qubit is measured to be{" "}
                    <M t="\ket{0}" />, what is the probability that the bottom
                    qubit will also be measured to be <M t="\ket{0}" />?
                  </p>
                </Prose>
              </>
            }
          />
          <Answer
            correct={
              state.responses?.upsideDownEntangler01 === 1 ||
              state.responses?.upsideDownEntangler01 === 100.0
            }
          >
            <p>
              The output of this circuit is{" "}
              <M display t="\frac{1}{\sqrt{2}}(\ket{00} - \ket{11})" />
              so if the first qubit is measured to be <M t="\ket{0}" />, the
              two-qubit state collapses to <M t="\ket{00}" />, in which case the
              probability of measuring the second qubit to be <M t="\ket{0}" />{" "}
              is 100%.
            </p>
          </Answer>
        </>
      ),
    }),

    // section({
    //   name: "consequencesOfEntanglementIntro",
    //   body: (
    //     <Prose>
    //       <p>
    //         When discussing two-qubit states, we often consider what happens
    //         when the two qubits are physically separated. Below, we refer to the
    //         person who receives the first qubit is “observer 1” and the person
    //         who receives the second qubit is “observer 2”.
    //       </p>

    //       <p>
    //         Note that it is possible to physically separate the two qubits even
    //         if it is not possible to write the quantum state for each qubit
    //         independently!
    //       </p>
    //     </Prose>
    //   ),
    //   continue: { label: "Onwards!" },
    // }),

    // section({
    //   name: "introducingAliceAndBob",
    //   enumerate: false,
    //   body: (
    //     <Prose>
    //       <p>
    //         Let’s give our two observers names. Observer 1 is Alice and observer
    //         2 is Bob.
    //       </p>

    //       <p>
    //         For the state <M t="\frac{1}{\sqrt{2}}(\ket{01} -\ket{10})" /> , we
    //         determined previously that Alice has a 50-50 chance of measuring
    //         either a <M t="\ket{0}" /> or a <M t="\ket{1}" />. These odds are
    //         the same for Bob. But if Alice measures first and gets a{" "}
    //         <M t="\ket{0}" />, she instantly knows that Bob will get a{" "}
    //         <M t="\ket{1}" /> (even if he is very far away).
    //       </p>
    //     </Prose>
    //   ),
    // }),

    // section({
    //   name: "didAliceSendMessageToBob",
    //   body: (m) => (
    //     <>
    //       <Toggle
    //         model={m.didAliceSendMessageToBob}
    //         label={
    //           <Prose>
    //             In the situation above, would you say Alice has sent a message
    //             to Bob (here, the message would be “
    //             <M prespace={false} t="\ket{1}" />
    //             ”)?
    //           </Prose>
    //         }
    //         choices={[
    //           ["yes", "Yes, she sent a message"],
    //           ["no", "No, she didn’t"],
    //         ]}
    //       />

    //       <TextBox
    //         model={m.didAliceSendMessageToBobExplain}
    //         label="Explain your choice:"
    //       />

    //       <Answer>
    //         No, Alice has not sent Bob a message. Although Alice knows what Bob
    //         will measure, Bob himself does <em>not</em> know until he makes the
    //         measurement.
    //       </Answer>
    //     </>
    //   ),
    // }),

    // section({
    //   name: "fasterThanLight",
    //   body: (m) => (
    //     <>
    //       <TextBox
    //         model={m.fasterThanLight}
    //         label={
    //           <Prose>
    //             Bob is far away, could this be an example of faster-than-light
    //             communication? Explain.
    //           </Prose>
    //         }
    //       />

    //       <Answer>
    //         This is not an example of faster-than-light communication because
    //         Alice has not sent Bob any information. Faster-than-light
    //         communication is impossible according to the laws of physics that we
    //         understand.
    //       </Answer>
    //     </>
    //   ),
    // }),
  ],
}));
