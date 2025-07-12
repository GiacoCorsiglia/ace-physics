import { ChooseOne, Guidance, M, Prose, QuantumCircuit, TextBox, Toggle } from "@/components";

import { page } from "@/tutorial";
import setup from "./setup";

export default page(setup, ({ section, hint }) => ({
  name: "reviewingGates",
  label: "Reviewing Gates",
  answers: "none",
  cheatSheet: {
    body: (
      <>
        <M display t="Z = \pmatrix{1 & 0 \\ 0 & -1}" />
        <M display t="X = \pmatrix{0 & 1 \\ 1 & 0}" />
        <M display t="H = \frac{1}{\sqrt{2}}\pmatrix{1 & 1 \\ 1 & -1}" />
      </>
    ),
  },
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
// question 1
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
      // feedback for question 1
       guidance: {
              nextMessage: () => "dynamicAnswer",
              messages: {
                dynamicAnswer: {
                  body: ({ responses }) => (
                    <Guidance.Dynamic
                      status={
                        responses?.gatesQuestion1?.selected === "0" ? "agree" : "disagree"
                      }
                    >
                      {responses?.gatesQuestion1?.selected !== "0" ? (
                        <p>
                          Incorrect.
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
// question 2
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
      //feedback for question 2
      guidance: {
        nextMessage: () => "dynamicAnswer",
        messages: {
          dynamicAnswer: {
            body: ({ responses }) => (
              <Guidance.Dynamic
                status={
                  responses?.gatesQuestion2?.selected === "1" ? "agree" : "disagree"
                }
              >
                {responses?.gatesQuestion2?.selected !== "1" ? (
                  <p>
                    Incorrect.
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
//question 3 toggle and text box
    section({
      name: "gatesQuestion3",
      body: (m) => (
        <>
          <Toggle
            model={m.gatesQuestion3}
            label={
              <Prose>
               Using your answers above, does <M t="H" />{" "}
                commute with <M t="Z" /> ?
              </Prose>
            }
            choices={[
              ["yes", "Yes"],
              ["no", "No"],
            ]}
          />
          <TextBox
          model={m.gatesQuestion3Explain}
          label={
            <Prose>
              Briefly, explain:
            </Prose>
          }
          />
        </>
      ),
      //definition of commuting for question 3
      hints: [
        hint({
          name: "gatesHintQuestion3",
          label: "Commute?",
          body: (
            <Prose>
              Gates (and operators) commute when the order in which they are
              applied does not matter. That is, Z and H would commute if
              HZ = ZH.
            </Prose>
          ),
        }),
      ],
//feedback for toggle question 3
      guidance: {
        nextMessage: () => "dynamicAnswer",
        messages: {
          dynamicAnswer: {
            body: ({ responses }) => (
              <Guidance.Dynamic
                status={
                  responses?.gatesQuestion3?.selected === "no" ? "agree" : "disagree"
                }
              >
                {responses?.gatesQuestion3?.selected !== "no" ? (
                  <p>
                   Incorrect.
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
