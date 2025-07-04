import {
  Guidance,
  M,
  Prose,
  TextBox,
  Toggle
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
        <Prose> More practice with gates and qubits. </Prose>
      ),
    }),
//question 1
    section({
      name: "wrapup1",
      body: (m) => (
        <>
        <Toggle
            model={m.wrapup1}
            label={
              <Prose>
              Alice and Bob's friend Charlie has also created a black box that outputs
              a qubit in the superposition state {" "}
              <M t="{1\over\sqrt{2}} (\ket{0} - \ket{1})" />,
              one qubit at a time. <br />
              Can you come up with a way to experimentally distinguish Alice, who
              produces {" "}<M t="{1\over\sqrt{2}} (\ket{0} + \ket{1})" />,
              and Charlie's qubits from each other? <em>(Assume you can
              run experiments a large number of times, as in our previous
              examples.)</em>
            </Prose>
            }
            choices={[
              ["yes", "Yes"],
              ["no", "No"],
            ]}
          />
          <TextBox
          model={m.wrapup1Explain}
          label={
            <Prose>
              If you can, what is the minimum number of gates needed by Alice
              and/or Charlie? If you cannot, is there a reason why not?
            </Prose>
          }
          />
        </>
      ),
      //question 1 feedback
       guidance: {
              nextMessage: () => "dynamicAnswer",
              messages: {
                dynamicAnswer: {
                  body: ({ responses }) => (
                    <Guidance.Dynamic
                      status={
                        responses?.wrapup1?.selected === "yes" ? "agree" : "disagree"
                      }
                    >
                      {responses?.wrapup1?.selected !== "yes" ? (
                        <p>
                        Not the answer we are looking for, check your reasoning again.
                          <br />
                          You are welcome to change your answer above.
                        </p>
                      ) : (
                        <p>
                        We agree with your answer.
                        </p>
                      )}
                    </Guidance.Dynamic>
                  ),
                  onContinue: "nextSection",
                },
              },
            },
    }),
//question 2
    section({
      name: "wrapup2",
      body: (m) => (
        <>
          <Toggle
          model={m.wrapup2}
          label={
            <Prose>
              Can you perform any gates or measurements to <em>convert</em> Charlie's qubit
              into Alice's? <br />

            </Prose>
          }
          choices={[
            ["yes", "Yes"],
            ["no", "No"],
          ]}
          />
          <TextBox
          model={m.wrapup2Explain}
          label={
            <Prose>
              If so, how? If not, why not?  <br />
            </Prose>
          }
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
                  responses?.wrapup2?.selected === "yes" ? "agree" : "disagree"
                }
              >
                {responses?.wrapup2?.selected !== "yes" ? (
                  <p>
                  Not the answer we are looking for, check your reasoning again.
                    <br />
                    You are welcome to change your answer above.
                  </p>
                ) : (
                  <p>
                  We agree with your answer.
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
      name: "wrapup3",
      body: (m) => (
        <>
          <Toggle
          model={m.wrapup3}
          label={
            <Prose>
             <em>Thought experiment:</em> Is it possible to perform any gates and/or
             measurements to convert Charlie's qubit into Bob's (which, recall,
             each have a 50/50 coin-toss chance of being {" "}
             <M t="\ket{0}" /> or {" "} <M t="\ket{1}" />)? <br />
             <br />
            </Prose>
          }
          choices={[
            ["yes", "Yes"],
            ["no", "No"],
          ]}
          />
          <TextBox
          model={m.wrapup3Explain}
          label={
            <Prose>
              If so, how? If not, why not?  <br />
            </Prose>
          }
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
                  responses?.wrapup3?.selected === "yes" ? "agree" : "disagree"
                }
              >
                {responses?.wrapup3?.selected !== "yes" ? (
                  <p>
                  Not the answer we are looking for, check your reasoning again.
                    <br />
                    You are welcome to change your answer above.
                  </p>
                ) : (
                  <p>
                  We agree with your answer.
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
      name: "wrapup4",
      body: (m) => (
        <>
          <Toggle
          model={m.wrapup4}
          label={
            <Prose>
              <em>Thought experiment:</em> Can you perform any gates or measurements to
              convert Bob's qubit into Charlie's?
               <br />
            </Prose>
          }
          choices={[
            ["yes", "Yes"],
            ["no", "No"],
          ]}
          />
          <TextBox
          model={m.wrapup4Explain}
          label={
            <Prose>
              If so, how? If not, why not?  <br />
            </Prose>
          }
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
                  responses?.wrapup4?.selected === "yes" ? "agree" : "disagree"
                }
              >
                {responses?.wrapup4?.selected !== "yes" ? (
                  <p>
                  Not the answer we are looking for, check your reasoning again.
                    <br />
                    You are welcome to change your answer above.
                  </p>
                ) : (
                  <p>
                  We agree with your answer.
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
      name: "wrapup5",
      body: (m) => (
        <>
        <Toggle
        model={m.wrapup5}
        label={
          <Prose>
            Dani has yet another black box that outputs qubits in the
            superposition state  {" "} <M t="{1\over\sqrt{2}} (\ket{1} - \ket{0})" />.
            Recall that Charlie's box produces particles
            in the state  {" "}
            <M t="{1\over\sqrt{2}} (\ket{0} - \ket{1})" />.  <br />
            <br />
            Can you come up with a way to experimentally distinguish Charlie's
            and Dani's qubits?  <br />
          </Prose>
        }
        choices={[
          ["yes", "Yes"],
          ["no", "No"],
        ]}
        />
         <TextBox
          model={m.wrapup5Explain}
          label={
            <Prose>
              If so, how? If not, why not?  <br />
            </Prose>
          }
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
                  responses?.wrapup5?.selected === "yes" ? "agree" : "disagree"
                }
              >
                {responses?.wrapup5?.selected !== "yes" ? (
                  <p>
                  Not the answer we are looking for, check your reasoning again.
                    <br />
                    You are welcome to change your answer above.
                  </p>
                ) : (
                  <p>
                  We agree with your answer.
                  </p>
                )}
              </Guidance.Dynamic>
            ),
            onContinue: "nextSection",
          },
        },
      },
    }),
  ],
}));
