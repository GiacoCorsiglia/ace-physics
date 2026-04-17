import {
  ChooseOne,
  Guidance,
  M,
  Prose,
  QuantumCircuit,
  TextBox,
  Toggle,
} from "@/components";

import { page } from "@/tutorial";
import setup from "./setup";

export default page(setup, ({ section, hint }) => ({
  name: "reviewingGates",
  label: "Reviewing Gates",
  answers: "checked-all",
  //                          cheat sheet
  cheatSheet: {
    body: (
      <>
        <M display t="Z = \pmatrix{1 & 0 \\ 0 & -1}" />
        <M display t="X = \pmatrix{0 & 1 \\ 1 & 0}" />
        <M display t="H = \frac{1}{\sqrt{2}}\pmatrix{1 & 1 \\ 1 & -1}" />
      </>
    ),
  },
  //                  Introduction to Reviewing Gates
  sections: [
    section({
      name: "reviewingGatesIntro",
      body: (m) => (
        <>
          <Prose>
            {" "}
            First let's do a brief review of some single-qubit circuits:
          </Prose>
        </>
      ),
    }),
    //                         Question 1: multiple choice
    section({
      name: "gatesQuestion1",
      body: (m) => (
        <>
          <ChooseOne
            model={m.gatesQuestion1}
            label={
              <Prose>
                What is the output of the following circuit? (Try to do this
                without multiplying matrices.)
                <QuantumCircuit t="\lstick{\frac{1}{\sqrt{2}}(\ket{0} + \ket{1})} & \gate{H} & \gate{Z} & \qw" />
              </Prose>
            }
            choices={[
              ["0", <M t=" \ket{0}" />],
              ["minus0", <M t=" - \ket{0}" />],
              ["1", <M t=" \ket{1}" />],
              ["minus1", <M t=" -\ket{1}" />],
              ["plus", <M t=" \frac{1}{\sqrt{2}}(\ket{0} + \ket{1})" />],
              ["minus", <M t=" \frac{1}{\sqrt{2}}(\ket{0} - \ket{1})" />],
              ["other", "Something else"],
            ]}
          />
        </>
      ),
      //                      Question 1 Feedback
      guidance: {
        nextMessage: () => "dynamicAnswer",
        messages: {
          dynamicAnswer: {
            body: ({ responses }) => (
              <Guidance.Dynamic
                status={
                  responses?.gatesQuestion1?.selected === "0"
                    ? "agree"
                    : "disagree"
                }
              >
                {responses?.gatesQuestion1?.selected !== "0" ? (
                  <p>
                    We disagree with your answer. <br /> What does the H gate do
                    to the input state? (We have a little "cheat sheet" in the
                    lower left corner of your screen if you need to review basic
                    gates )
                    <br />
                    You are welcome to change your answer above.
                  </p>
                ) : (
                  <p>Cool. We agree with your answer.</p>
                )}
              </Guidance.Dynamic>
            ),
            onContinue: "nextSection",
          },
        },
      },
    }),
    //                        Question 2: multiple choice
    section({
      name: "gatesQuestion2",
      body: (m) => (
        <>
          <ChooseOne
            model={m.gatesQuestion2}
            label={
              <Prose>
                What is the output of the following circuit? (Try to do this
                without multiplying matrices.)
                <QuantumCircuit t="\lstick{\frac{1}{\sqrt{2}}(\ket{0} + \ket{1})} & \gate{Z} & \gate{H} & \qw" />
              </Prose>
            }
            choices={[
              ["0", <M t=" \ket{0}" />],
              ["minus0", <M t=" - \ket{0}" />],
              ["1", <M t=" \ket{1}" />],
              ["minus1", <M t=" -\ket{1}" />],
              ["plus", <M t=" \frac{1}{\sqrt{2}}(\ket{0} + \ket{1})" />],
              ["minus", <M t=" \frac{1}{\sqrt{2}}(\ket{0} - \ket{1})" />],
              ["other", "Something else"],
            ]}
          />
        </>
      ),
      //                      Question 2 Feedback
      guidance: {
        nextMessage: () => "dynamicAnswer",
        messages: {
          dynamicAnswer: {
            body: ({ responses }) => (
              <Guidance.Dynamic
                status={
                  responses?.gatesQuestion2?.selected === "1"
                    ? "agree"
                    : "disagree"
                }
              >
                {responses?.gatesQuestion2?.selected !== "1" ? (
                  <p>
                    We disagree with your answer. <br /> The operation of basic
                    gates is summarized in the little "cheat sheet" in the lower
                    left corner of your screen. <br /> Also note that order
                    matters: the Z gate acts first, the H gate follows.
                    <br />
                    You are welcome to change your answer above.
                  </p>
                ) : (
                  <p>We agree with your answer!</p>
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
      name: "gatesQuestion3",
      body: (m) => (
        <>
          <Toggle
            model={m.gatesQuestion3}
            label={
              <Prose>
                Using your answers above, does <M t="H" /> commute with{" "}
                <M t="Z" /> ?
              </Prose>
            }
            choices={[
              ["yes", "Yes"],
              ["no", "No"],
            ]}
          />
          <TextBox
            model={m.gatesQuestion3Explain}
            label={<Prose>Briefly, explain:</Prose>}
          />
        </>
      ),
      //                     Question 3: commute hint
      hints: [
        hint({
          name: "gatesHintQuestion3",
          label: "Commute?",
          body: (
            <Prose>
              Gates (and operators) commute when the order in which they are
              applied does not matter. That is, Z and H would commute if HZ =
              ZH.
            </Prose>
          ),
        }),
      ],
      //                           Question 3 Feedback: Y/N
      guidance: {
        nextMessage: () => "dynamicAnswer",
        messages: {
          dynamicAnswer: {
            body: ({ responses }) => (
              <Guidance.Dynamic
                status={
                  responses?.gatesQuestion3?.selected === "no"
                    ? "agree"
                    : "disagree"
                }
              >
                {responses?.gatesQuestion3?.selected !== "no" ? (
                  <p>
                    H and Z don't commute. You can see this directly from matrix
                    multiplication, or by considering the answers to the
                    previous two questions (which differed only by the order of
                    acting H and Z, yet gave different results) <br />
                    You are welcome to change your answer above.
                  </p>
                ) : (
                  <p>
                    Right, H and Z do not commute. Order matters. You can verify
                    this directly from matrix multiplication, or by considering
                    the answers to the previous two questions (which differed
                    only by the order of acting H and Z, yet gave different
                    results)
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
