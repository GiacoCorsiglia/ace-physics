import { Callout, ChooseOne, Guidance, Image, M, Prose } from "@/components";
import { page } from "@/tutorial";
import { PencilIcon } from "@primer/octicons-react";

import fig2 from "./assets/C-fig-2.png";
import setup from "./setup";

export default page(setup, ({ section, hint }) => ({
  name: "buildingteleportation1",
  label: "Building a Teleportation Circuit",
  answers: "checked-all",

  sections: [
    section({
      name: "building1Intro",
      body: (
        <Prose>
          Here is step one in our “teleportation protocol”, acting a CNOT on
          Alice’s pair of qubits:
          <Image src={fig2} alt="circuit diagram C-2" />
          <br />
          We have already found that our starting (input) 3-qubit state is:
          <br />
          <M t="|\psi_0\rangle = \frac{1}{\sqrt{2}}(a|000\rangle + a|011\rangle + b|100\rangle + b|111\rangle)" />
          <br /> Remember, Alice only has access to the first two qubits, her
          gates (and subsequent measurements) can be applied only to the top two
          qubits. <br />
          Alice starts with a CNOT gate, as shown above. The CNOT gate is
          capable of entangling qubits, and that’s what it does here. Alice is
          entangling the mystery qubit to her half of the entangled
          <M t="\ket{\beta_{00}}\ " />
          pair.
        </Prose>
      ),
      continue: {
        label: "I’m ready!",
      },
    }),

    section({
      name: "trypsi1",
      body: () => (
        <>
          <Prose>
            <p>
              Try to work out the full three-qubit state right after the CNOT
              (labeled |ψ1⟩ in the figure above). Write the state for yourself.
              (Hint: The state should have four terms, do you agree?)
            </p>
          </Prose>

          <Callout color="blue" iconLeft={<PencilIcon />}>
            Try it for yourself! Write out the initial state on scrap paper.
          </Callout>
        </>
      ),
      hints: [
        hint({
          name: "trypsi1hint",
          label: "Can I get a little help?",
          body: (
            <Prose>
              <p>
                The incoming state <M t="\ket{\psi_0}" />
                is shown in the text just below the figure above. You are then
                acting a CNOT on the top two qubits (only), leaving the third
                one unaltered. If you've forgotten how the CNOT works, you make
                take a break and (re)visit the{" "}
                {/* Is there a way to make a link that doesn't kill this window?  */}
                <a href="https://acephysics.net/tutorials/cnot-entanglement">
                  earlier tutorial on CNOT gates{" "}
                </a>
                , and come back!
              </p>
            </Prose>
          ),
        }),
      ],
      continue: {
        label: "I wrote it out",
      },
    }),

    section({
      name: "whatisx2q",
      body: (m) => (
        <ChooseOne
          model={m.whatisx2}
          choices={[
            ["0", <M t="0" />],
            ["1", <M t="1" />],
            ["else", <M t="{\rm Something\ else}" />],
          ]}
          label={
            <Prose>
              <p>
                {" "}
                Our answer looks like this: <br />
                <M t="\ket{\psi_1}  = \frac{1}{\sqrt{2}} (a\ket{000} + a\ket{01x} + b\ket{110} + b\ket{y})" />
                <br /> Hopefully what you wrote matches it... If your answer is
                very different, try again. Bit if you are largely matching this
                form, let's check in. What is the missing <M t="x" /> in the
                line above?
                <br />
              </p>
            </Prose>
          }
        />
      ),
      // COMMENT:  If what they wrote doesn't match at all, can/should we have some sort of HINT button before they try to answer the question above about x?
      guidance: {
        nextMessage: () => "dynamicAnswer",
        messages: {
          dynamicAnswer: {
            body: ({ responses }) => (
              <Guidance.Dynamic
                status={
                  responses?.whatisx2?.selected === "1" ? "agree" : "disagree"
                }
              >
                {responses?.whatisx2?.selected !== "1" ? (
                  <p>
                    Recall
                    <M t="|\psi_0\rangle = \frac{1}{\sqrt{2}}(a|000\rangle + a|011\rangle + b|100\rangle + b|111\rangle)" />
                    <br /> A CNOT gate will flip the second qubit if (and only
                    if ) the first qubit is a 1. In the second term,
                    <M t=" a\ket{011} " />, the first qubit is a 0, so nothing
                    happens to the term at all. (The third bit, in particular,
                    is not acted on by any gate - it just goes along for the
                    ride)
                    <br />
                    You are welcome to change your answer above.
                  </p>
                ) : (
                  <p>
                    Right. A CNOT gate will flip the second qubit if (and only
                    if ) the first qubit is a 1. In the second term,
                    <M t=" a\ket{011} " />, the first qubit is a 0, so nothing
                    happens to the term at all. (The third bit, in particular,
                    is not acted on by any gate - it just goes along for the
                    ride) Thus, x = 1.
                  </p>
                )}
              </Guidance.Dynamic>
            ),
            onContinue: "nextSection",
          },
        },
      },
    }),

    section({
      name: "whatisy2q",
      body: (m) => (
        <ChooseOne
          model={m.whatisy2}
          label={
            <Prose>
              <p>
                What is <M t="\ket{y}" />?
                <br />
              </p>
            </Prose>
          }
          choices={[
            ["000", <M t="\ket{000}" />],
            ["001", <M t="\ket{001}" />],
            ["010", <M t="\ket{010}" />],
            ["011", <M t="\ket{011}" />],
            ["100", <M t="\ket{100}" />],
            ["101", <M t="\ket{101}" />],
            ["110", <M t="\ket{110}" />],
            ["111", <M t="\ket{111}" />],
          ]}
        />
      ),

      guidance: {
        nextMessage: () => "dynamicAnswer",
        messages: {
          dynamicAnswer: {
            body: ({ responses }) => (
              <Guidance.Dynamic
                status={
                  responses?.whatisy2?.selected === "101" ? "agree" : "disagree"
                }
              >
                {responses?.whatisy2?.selected !== "101" ? (
                  <p>
                    In the final term of
                    <M t="\ket{\psi_0}, {\rm namely\ } b \ket{111}" />, notice
                    that the first qubit is a 1, so the second qubit is flipped.
                    But the third qubit is not acted on by any gate, so remains
                    unaltered
                    <br />
                    You are welcome to change your answer above.
                  </p>
                ) : (
                  <p>
                    Right. In the final term of
                    <M t="\ket{\psi_0}, {\rm namely\ } b \ket{111}" />, the
                    first qubit is a 1, so the second qubit is flipped. But the
                    third qubit is not acted on by any gate, it remained
                    unaltered
                  </p>
                )}
              </Guidance.Dynamic>
            ),
            onContinue: "nextSection",
          },
        },
      },
    }),

    section({
      name: "building1Outro",
      body: (
        <Prose>
          Summary so far: after this first stage:
          <Image src={fig2} alt="circuit diagram C-1" />
          <br />
          We found the 3-qubit output state so far is:
          <br />
          <M t="|\psi_1\rangle = \frac{1}{\sqrt{2}}(a|000\rangle + a|011\rangle + b|110\rangle + b|101\rangle)" />
        </Prose>
      ),
      continue: {
        label: "I’m ready for the next gates!",
      },
    }),
  ],
}));
