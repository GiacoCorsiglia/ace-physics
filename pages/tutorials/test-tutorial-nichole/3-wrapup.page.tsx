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
      name: "furtherQuestion1",
      body: (m) => (
        <>
        <Toggle
            model={m.furtherQuestion1}
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
          model={m.furtherQuestion1Explain}
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
                        responses?.furtherQuestion1?.selected === "yes" ? "agree" : "disagree"
                      }
                    >
                      {responses?.furtherQuestion1?.selected !== "yes" ? (
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
      name: "furtherQuestion2",
      body: (m) => (
        <>
          <Toggle
          model={m.furtherQuestion2}
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
          model={m.furtherQuestion2Explain}
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
                  responses?.furtherQuestion2?.selected === "yes" ? "agree" : "disagree"
                }
              >
                {responses?.furtherQuestion2?.selected !== "yes" ? (
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
      name: "furtherQuestion3",
      body: (m) => (
        <>
          <Toggle
          model={m.furtherQuestion3}
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
          model={m.furtherQuestion3Explain}
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
                  responses?.furtherQuestion3?.selected === "yes" ? "agree" : "disagree"
                }
              >
                {responses?.furtherQuestion3?.selected !== "yes" ? (
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
      name: "furtherQuestion4",
      body: (m) => (
        <>
          <Toggle
          model={m.furtherQuestion4}
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
          model={m.furtherQuestion4Explain}
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
                  responses?.furtherQuestion4?.selected === "yes" ? "agree" : "disagree"
                }
              >
                {responses?.furtherQuestion4?.selected !== "yes" ? (
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
      name: "furtherQuestion5",
      body: (m) => (
        <>
        <Toggle
        model={m.furtherQuestion5}
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
          model={m.furtherQuestion5Explain}
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
                  responses?.furtherQuestion5?.selected === "yes" ? "agree" : "disagree"
                }
              >
                {responses?.furtherQuestion5?.selected !== "yes" ? (
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
