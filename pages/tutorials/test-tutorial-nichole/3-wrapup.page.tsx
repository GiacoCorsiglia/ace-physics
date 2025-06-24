import {
  M,
  Prose,
  TextBox
} from "@/components";
import { page } from "@/tutorial";
import setup from "./setup";

export default page(setup, ({ section, hint }) => ({
  name: "wrapup",
  label: "Further exploration",
  answers: "provided",
  cheatSheet: {
    body: (
      <>
        <M display t="Z\ket{0} = \ket{0},\, Z\ket{1} = -\ket{1}" />
        <M display t="X\ket{0} = \ket{1},\, X\ket{1} = \ket{0}" />
        <M display t="H\ket{0} = \frac{1}{\sqrt{2}}(\ket{0} + \ket{1})" />
        <M display t="H\ket{1} = \frac{1}{\sqrt{2}}(\ket{0} - \ket{1})" />
      </>
    ),
  },
  sections: [
    section({
      name: "morePracticeIntro",
      body: (
        <Prose> Further exploration </Prose>
      ),
    }),

    section({
      name: "wrapup1",
      body: (m) => (
        <>
        <Prose>
          Alice and Bob's friend Charlie has also created a black box that outputs
          a qubit in the superposition state {" "}
          <M t="{1\over\sqrt{2}} (\ket{0} - \ket{1})" />,
          one qubit at a time. <br />
        </Prose>
          <TextBox
          model={m.wrapup1}
          label={
            <Prose>
              Can you come up with a way to experimentally distinguish Alice, who
              produces {" "}<M t="{1\over\sqrt{2}} (\ket{0} + \ket{1})" />,
              and Charlie's qubits from each other? (Assume you can
              run experiments a large number of times, as in our previous examples.)
              If you can, what is the minimum number of gates needed by Alice
              and/or Charlie? If you cannot, is there a reason why not?
            </Prose>
          }
          />
        </>
      )
    }),

     /* guidance: {
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
    }),*/

    section({
      name: "wrapup2",
      body: (m) => (
        <>
          <TextBox
          model={m.wrapup2}
          label={
            <Prose>
              Can you perform any gates or measurements to convert Charlie's qubit
              into Alice's? <br />
               If so how? If not, why not?
            </Prose>
          }
          />
        </>
      )
    }),

    section({
      name: "wrapup3",
      body: (m) => (
        <>
          <TextBox
          model={m.wrapup3}
          label={
            <Prose>
             <em>Thought experiment:</em> Is it possible to perform any gates and/or
             measurements to convert Charlie's qubit into Bob's (which, recall,
             each have a 50/50 coin-toss chance of being {" "}
             <M t="\ket{0}" /> or {" "} <M t="\ket{1}" />)? <br />
             <br />
               If so how? If not, why not?
            </Prose>
          }
          />
        </>
      )
    }),

    section({
      name: "wrapup4",
      body: (m) => (
        <>
          <TextBox
          model={m.wrapup4}
          label={
            <Prose>
              <em>Thought experiment:</em> Can you perform any gates or measurements to
              convert Bob's qubit into Charlie's?
               <br />
               If so how? If not, why not?
            </Prose>
          }
          />
        </>
      )
    }),

    section({
      name: "wrapup5",
      body: (m) => (
        <>
        <TextBox
        model={m.wrapup5}
        label={
          <Prose>
            Dani has yet another black box that outputs qubits in the
            superposition state  {" "} <M t="{1\over\sqrt{2}} (\ket{1} - \ket{0})" />.
            Recall that Charlie's box produces particles
            in the state  {" "}
            <M t="{1\over\sqrt{2}} (\ket{0} - \ket{1})" />.  <br />
            Can you come up with a way to experimentally distinguish Charlie's
            and Dani's qubits?  <br />
            If so how? If not, why not?
          </Prose>
        }
        />
        </>
      )
    }),
  ],
}));
