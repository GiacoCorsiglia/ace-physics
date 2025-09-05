import { Callout, Guidance, M, Prose, TextBox, Toggle } from "@/components";
import { page } from "@/tutorial";
import setup from "./setup";

export default page(setup, ({ section, hint }) => ({
  name: "furtherExploration",
  label: "Further exploration of superposition states",
  answers: "checked-all",
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
        <Prose>
          {" "}
          On this page, we'll consider a few more superposition states.{" "}
        </Prose>
      ),
    }),
    //                    Question 1: Y/N & text box
    section({
      name: "furtherQuestion1",
      body: (m) => (
        <>
          <Toggle
            model={m.furtherQuestion1}
            label={
              <Prose>
                Alice and Bob's friend Charlie has also created a black box that
                outputs a qubit in the superposition state{" "}
                <M t="{1\over\sqrt{2}} (\ket{0} - \ket{1})" />, one qubit at a
                time. <br />
                Can you come up with a way to experimentally distinguish Alice,
                who produces <M t="{1\over\sqrt{2}} (\ket{0} + \ket{1})" />, and
                Charlie's qubits from each other?{" "}
                <em>
                  (Assume you can run experiments a large number of times, as in
                  our previous examples.)
                </em>
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
      //                   Question 1 Feedback on Y/N
      guidance: {
        nextMessage: () => "dynamicAnswer",
        messages: {
          dynamicAnswer: {
            body: ({ responses }) => (
              <Guidance.Dynamic
                status={
                  responses?.furtherQuestion1?.selected === "yes"
                    ? "agree"
                    : "disagree"
                }
              >
                {responses?.furtherQuestion1?.selected !== "yes" ? (
                  <p>
                    You selected "No", but there is a way. <br /> Look back at
                    what you did near the end of the previous page. Consider
                    first acting a Hadamard (H) gate on these states, and THEN
                    measuring. What would the outcomes be for Alice and for
                    Charlie?
                    <br />
                    You are welcome to change your answer above.
                  </p>
                ) : (
                  <p>
                    We agree with your selected answer (but our system is not
                    able to evaluate your typed response) <br /> Acting a
                    Hadamard gate before measurement will distinguish these two
                    states with 100% certainty. (Do you see why?)
                  </p>
                )}
              </Guidance.Dynamic>
            ),
            onContinue: "nextSection",
          },
        },
      },
    }),
    //                     Question 2: Y/N & text box
    section({
      name: "furtherQuestion2",
      body: (m) => (
        <>
          <Toggle
            model={m.furtherQuestion2}
            label={
              <Prose>
                Can you perform any gates or measurements to <em>convert</em>{" "}
                Charlie's qubit into Alice's? <br />
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
                If so, how? If not, why not? <br />
              </Prose>
            }
          />
        </>
      ),
      //                     Question 2 Feedback on Y/N
      guidance: {
        nextMessage: () => "dynamicAnswer",
        messages: {
          dynamicAnswer: {
            body: ({ responses }) => (
              <Guidance.Dynamic
                status={
                  responses?.furtherQuestion2?.selected === "yes"
                    ? "agree"
                    : "disagree"
                }
              >
                {responses?.furtherQuestion2?.selected !== "yes" ? (
                  <p>
                    You selected "No", but there is a way. <br />
                    Can you think of single quantum gate that changes the phase
                    of the |1⟩ state, but not the |0⟩ state?
                    <br />
                    You are welcome to change your answer above.
                  </p>
                ) : (
                  <p>
                    We agree with your selected answer (but our system is not
                    able to evaluate your typed response) <br /> Did you think
                    of applying a Z gate (which changes the phase of a |1⟩
                    state, but not a |0⟩ state)?
                  </p>
                )}
              </Guidance.Dynamic>
            ),
            onContinue: "nextSection",
          },
        },
      },
    }),
    //                      Question 3: Y/N & text box
    section({
      name: "furtherQuestion3",
      body: (m) => (
        <>
          <Prose>
            <em>Thought experiment:</em> Is it possible to perform any gates
            and/or measurements to convert Charlie's qubit into Bob's (which,
            recall, each have a 50/50 coin-toss chance of being{" "}
            <M t="\ket{0}" /> or <M t="\ket{1}" />
            )? <br />
            <br />
          </Prose>
          <TextBox
            model={m.furtherQuestion3Explain}
            label={
              <Prose>
                If so, how? If not, why not? <br />
              </Prose>
            }
          />
        </>
      ),
      continue: {
        label: "I've thought about it",
      },
      guidance: {
        nextMessage: () => "answer",
        messages: {
          answer: {
            body: (
              <Callout color="blue">
                This one is a little subtle.
                <br /> We are asking if you can convert a known superposition
                state into a mixed "coin toss" state. None of our quantum gates
                can do this for us. <br /> <br /> One reasonable approach is to
                simply measure Charlie's qubit. This will give you a 50/50
                chance of getting |0⟩ or |1⟩, just like Bob's qubit. However,
                after measurement, Charlie's qubit is definitely in the state
                you measured (either |0⟩ or |1⟩). It is not really in Bob's
                mixed state, it's definitely one or the other (we just did not
                know in advance). But effectively, if you ignore the outcome and
                pass this bit along, it is indistinguishable from Bob's mixed
                state.
              </Callout>
            ),
            onContinue: "nextSection",
          },
        },
      },

      // <Toggle
      //   model={m.furtherQuestion3}
      //   label={
      //     <Prose>
      //       <em>Thought experiment:</em> Is it possible to perform any gates
      //       and/or measurements to convert Charlie's qubit into Bob's
      //       (which, recall, each have a 50/50 coin-toss chance of being{" "}
      //       <M t="\ket{0}" /> or <M t="\ket{1}" />
      //       )? <br />
      //       <br />
      //     </Prose>
      //   }
      //   choices={[
      //     ["yes", "Yes"],
      //     ["no", "No"],
      //   ]}
      // />
      // <TextBox
      //   model={m.furtherQuestion3Explain}
      //   label={
      //     <Prose>
      //       If so, how? If not, why not? <br />
      //     </Prose>
      // }
      // />
      //   </>
      // ),
      //                   Question 3 Feedback on Y/N
      // guidance: {
      //   nextMessage: () => "dynamicAnswer",
      //   messages: {
      //     dynamicAnswer: {
      //       body: ({ responses }) => (
      //         <Guidance.Dynamic
      //           status={
      //             responses?.furtherQuestion3?.selected === "yes"
      //               ? "agree"
      //               : "disagree"
      //           }
      //         >
      //           {responses?.furtherQuestion3?.selected !== "yes" ? (
      //             <p>
      //               ZZZ maybe fix this! This is a little subtle. What if you
      //               simply measure Charlie's qubit? This will give you a 50/50
      //               chance of getting |0⟩ or |1⟩, just like Bob's qubit.
      //               <br />
      //             </p>
      //           ) : (
      //             <p>
      //               ZZZ maybe fix this! We agree, although it's a little
      //               ambiguous. Our best answer is to simply measure Charlie's
      //               qubit. After measurement, it will be in the state you
      //               measured (either |0⟩ or |1⟩), with 50/50 chance of either.
      //               Still, the resulting qubit is not really in Bob's mixed
      //               state, it's definitely one or the other (we just did not
      //               know in advance) You cannot convert Charlie's original
      //               superposition state into Bob's mixed state through gates and
      //               measurements alone.
      //               <br />.
      //             </p>
      //           )}
      //         </Guidance.Dynamic>
      //       ),
      //       onContinue: "nextSection",
      //     },
      //   },
      // },
    }),
    //                      Question 4: Y/N & text box
    section({
      name: "furtherQuestion4",
      body: (m) => (
        <>
          <Prose>
            <em>Thought experiment:</em> Can you perform any gates or
            measurements to convert Bob's qubit (recall, a 50/50 coin-toss
            chance of being
            <M t="\ket{0}" /> or <M t="\ket{1}" />) into Charlie's qubit? (a
            superposition state <M t="{1\over\sqrt{2}} (\ket{0} - \ket{1})" /> )
            ? <br />
            <br />
          </Prose>
          <TextBox
            model={m.furtherQuestion4Explain}
            label={
              <Prose>
                If so, how? If not, why not? <br />
              </Prose>
            }
          />
        </>
      ),
      continue: {
        label: "I've thought about it",
      },
      guidance: {
        nextMessage: () => "answer",
        messages: {
          answer: {
            body: (
              <Callout color="blue">
                This one is again a little subtle. Can you convert a 50/50 mixed
                state into a particular superposition state? None of our quantum
                gates can do this for us. <br /> <br /> One reasonable approach
                is to measure Bob's qubit. But now you have to respond
                "conditionally". If you measure |1⟩, act a Hadamard on it ,
                which turns it into Charlie's state.
                <br />
                If you measure |0⟩, first act an X (which turns it into |1⟩),
                then a Hadamard, which again turns it into Charlie's state.
                <br /> This works, but it requires you to know the outcome of
                the measurement, and then act differently based on that outcome.
                <br /> <br />
                Note that if you simply measure Bob's qubit and ignore the
                outcome, you will end up with either |0⟩ or |1⟩, each with 50%
                probability. This is not Charlie's superposition state.
              </Callout>
            ),
            onContinue: "nextSection",
          },
        },
      },
      //  <Toggle
      //  model={m.furtherQuestion4}
      //       label={
      //         <Prose>
      //           <em>Thought experiment:</em> Can you perform any gates or
      //           measurements to convert Bob's qubit into Charlie's?
      //           <br />
      //         </Prose>
      //       }
      //       choices={[
      //         ["yes", "Yes"],
      //         ["no", "No"],
      //       ]}
      //     />
      //     <TextBox
      //       model={m.furtherQuestion4Explain}
      //       label={
      //         <Prose>
      //           If so, how? If not, why not? <br />
      //         </Prose>
      //       }
      //     />
      //   </>
      // ),
      // //                     Question 4 Feedback on Y/N
      // guidance: {
      //   nextMessage: () => "dynamicAnswer",
      //   messages: {
      //     dynamicAnswer: {
      //       body: ({ responses }) => (
      //         <Guidance.Dynamic
      //           status={
      //             responses?.furtherQuestion4?.selected === "yes"
      //               ? "agree"
      //               : "disagree"
      //           }
      //         >
      //           {responses?.furtherQuestion4?.selected !== "yes" ? (
      //             <p>
      //               Not the answer we are looking for, check your reasoning
      //               again.
      //               <br />
      //               You are welcome to change your answer above.
      //             </p>
      //           ) : (
      //             <p>
      //               We agree with your selected answer (but our system is not
      //               able to evaluate your typed response) <br />.
      //             </p>
      //           )}
      //         </Guidance.Dynamic>
      //       ),
      //       onContinue: "nextSection",
      //     },
      //   },
      // },
    }),
    //                        Question 5: Y/N & text box
    section({
      name: "furtherQuestion5",
      body: (m) => (
        <>
          <Toggle
            model={m.furtherQuestion5}
            label={
              <Prose>
                Dani has yet another black box that outputs qubits in the
                superposition state{" "}
                <M t="{1\over\sqrt{2}} (\ket{1} - \ket{0})" />. Recall that
                Charlie's box produces particles in the state{" "}
                <M t="{1\over\sqrt{2}} (\ket{0} - \ket{1})" />. <br />
                <br />
                Can you come up with a way to experimentally distinguish
                Charlie's and Dani's qubits? <br />
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
                If so, how? If not, why not? <br />
              </Prose>
            }
          />
        </>
      ),
      //                      Question 5 Feedback on Y/N
      guidance: {
        nextMessage: () => "dynamicAnswer",
        messages: {
          dynamicAnswer: {
            body: ({ responses }) => (
              <Guidance.Dynamic
                status={
                  responses?.furtherQuestion5?.selected === "no"
                    ? "agree"
                    : "disagree"
                }
              >
                {responses?.furtherQuestion5?.selected !== "no" ? (
                  <p>
                    Note that these two qubits differ only by an overall common
                    phase of -1.
                    <br />
                    Any such overall phase has no measurable effect on the
                    qubit.
                    <br />
                    You are welcome to change your answer above.
                  </p>
                ) : (
                  <p>
                    We agree with your answer. Overall phase of a qubit is not
                    measurable, there is no way to distinguish these two states.
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
