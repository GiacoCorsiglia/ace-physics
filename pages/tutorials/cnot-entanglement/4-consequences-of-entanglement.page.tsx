import { Answer, M, Prose, TextBox } from "@/components";
import { page } from "@/tutorial";
import setup from "./setup";

export default page(setup, ({ section }) => ({
  name: "consequencesOfEntanglement",
  label: "Consequences of Entanglement",
  answers: "provided",
  sections: [
    section({
      name: "consequencesOfEntanglementIntro",
      body: (
        <Prose>
          <p>
            When discussing two-qubit states, we often consider what happens
            when the two qubits are physically separated. Below, we refer to the
            person who has the first qubit is “observer 1” and the person who
            has the second qubit is “observer 2”.
          </p>

          <p>
            Note that it is possible to physically separate the two qubits even
            if it is not possible to write the quantum state for each qubit
            independently!
          </p>
        </Prose>
      ),
      continue: { label: "Onwards!" },
    }),

    section({
      name: "introducingAliceAndBob",
      enumerate: false,
      body: (
        <Prose>
          <p>
            Let’s give our two observers names. Observer 1 is Alice and observer
            2 is Bob.
          </p>

          <p>
            For the state <M t="\frac{1}{\sqrt{2}}(\ket{01} -\ket{10})" /> , we
            determined previously that Alice has a 50-50 chance of measuring
            either a <M t="\ket{0}" /> or a <M t="\ket{1}" />. These odds are
            the same for Bob. But if Alice measures first and gets a{" "}
            <M t="\ket{0}" /> , she instantly knows that Bob will get a{" "}
            <M t="\ket{1}" /> (even if he is very far away).
          </p>
        </Prose>
      ),
    }),

    section({
      name: "didAliceSendMessageToBob",
      body: (m) => (
        <>
          <TextBox
            model={m.didAliceSendMessageToBob}
            label={
              <Prose>
                In the situation above, would you say Alice has sent Bob a
                message to Bob (here, the message would be “
                <M prespace={false} t="\ket{1}" />
                ”)?
              </Prose>
            }
          />

          <Answer>
            No, Alice has not sent Bob a message. Although Alice knows what Bob
            will measure, Bob himself does <em> not </em> know until he makes
            the measurement. From Bob’s perspective, his odds are 50-50
            regardless of whether Alice made a measurement or not.
          </Answer>
        </>
      ),
    }),

    section({
      name: "fasterThanLight",
      body: (m) => (
        <>
          <TextBox
            model={m.fasterThanLight}
            label={
              <Prose>
                Bob is far away, could this be an example of faster-than-light
                communication? Why?
              </Prose>
            }
          />

          <Answer>
            This is not an example of faster-than-light communication because
            Alice has not sent Bob any information. Faster-than-light
            communication is impossible according to the laws of physics that we
            understand.
          </Answer>
        </>
      ),
    }),
  ],
}));
