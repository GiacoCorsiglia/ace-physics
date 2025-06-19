import {
  Answer,
  ChooseOne,
  Guidance,
  M,
  Prose,
  QuantumCircuit,
  TextBox,
} from "@/components";
import { page } from "@/tutorial";
import setup from "./setup";

export default page(setup, ({ section, hint }) => ({
  name: "buildingteleportation",
  label: "Building a Teleportation Circuit",
  answers: "provided",

  sections: [
    section({
      name: "morePracticeIntro",
      body: (
        <Prose>
          THIS IS OLD, MUST START EDITING FROM HERE. Additional practice with
          some slightly tougher circuits.
        </Prose>
      ),
      continue: {
        label: "I’m ready!",
      },
    }),

    section({
      name: "inverseOfX",
      body: (m) => (
        <>
          <ChooseOne
            model={m.inverseOfX}
            label={
              <Prose>
                <p>
                  What does the second gate have to be to make this circuit
                  behave as shown no matter what the input state is?
                </p>

                <QuantumCircuit t="\lstick{ \ket{\psi} }& \gate{X} & \gate{?} & \qw & \rstick{\ket{\psi}}" />
              </Prose>
            }
            choices={[
              ["X", <M t="? = X" />],
              ["Z", <M t="? = Z" />],
              ["H", <M t="? = H" />],
              ["I", <M t="? = I" />],
            ]}
          />

          {/* <Prose>
            <em>Hint:</em> Another way to ask this is: find an operator{" "}
            <M t="?" /> such that <M t="X? = I" />. This operator is called the{" "}
            <em>inverse</em> of <M t="X" />.
          </Prose> */}
        </>
      ),
      guidance: {
        nextMessage: () => "inverse",
        messages: {
          inverse: {
            body: (s) => (
              <Guidance.Dynamic
                status={
                  s.responses?.inverseOfX?.selected === "X"
                    ? "agree"
                    : "disagree"
                }
              >
                The operator <M t="?" /> is the <em>inverse</em> of <M t="X" />.
                If an operator is unitary, it is its own inverse. <M t="X" />,{" "}
                <M t="Z" />, and <M t="H" /> are unitary, just like many other
                gates we use in quantum computing.
              </Guidance.Dynamic>
            ),
            onContinue: "nextSection",
          },
        },
      },
      hints: [
        hint({
          name: "inverse",
          label: "Hint?",
          body: (
            <>
              This circuit is supposed to leave the final state equal to the
              initial state. Think about what <M t="X" /> does to a state. What
              operator could reverse the action of <M t="X" />?
            </>
          ),
        }),
      ],
    }),

    section({
      name: "outputZHPlus",
      body: (m) => (
        <>
          <TextBox
            model={m.outputZHPlus}
            label={
              <Prose>
                What is the output of the following circuit?
                <QuantumCircuit t="\lstick{\frac{1}{\sqrt{2}}(\ket{0} + \ket{1})} & \gate{H} & \gate{Z} & \qw" />
              </Prose>
            }
          />
          {/* TODO: Multiple choice.  Phase dropdown, state dropdown */}
        </>
      ),
    }),

    section({
      name: "outputHZPlus",
      body: (m) => (
        <>
          <TextBox
            model={m.outputHZPlus}
            label={
              <Prose>
                What is the output of the following circuit?
                <QuantumCircuit t="\lstick{\frac{1}{\sqrt{2}}(\ket{0} + \ket{1})} & \gate{Z} & \gate{H} & \qw" />
              </Prose>
            }
          />
          <Answer>
            <M
              display
              t="Z\frac{1}{\sqrt{2}}(\ket{0} + \ket{1}) = \frac{1}{\sqrt{2}}(Z\ket{0}+Z\ket{1}) = \frac{1}{\sqrt{2}}(\ket{0}-\ket{1}) = \ket{-}"
            />
            <M display t="H\ket{-} = \ket{1}" />
          </Answer>
          {/* TODO: Multiple choice */}
        </>
      ),
    }),

    section({
      name: "doHZCommute",
      body: (m) => (
        <TextBox
          model={m.doHZcommute}
          label={
            <Prose>
              Given the answers on this page, can you say whether <M t="H" />{" "}
              commutes with <M t="Z" /> without bothering to multiply matrices
              in different orders?
            </Prose>
          }
        />
      ),
    }),
  ],
}));
