import {
  ChooseOne,
  Decimal,
  Guidance,
  M,
  Prose,
  TextBox,
  Toggle,
} from "@/components";
import { page } from "@/tutorial";
import setup from "./setup";

export default page(setup, ({ section, hint }) => ({
  name: "superpositionvmixed",
  label: "Superposition versus mixed states",
  //  answers: "provided",
  answers: "checked-some",
  //                          cheat sheet
  cheatSheet: {
    body: (
      <>
        <M display t="Z\ket{0} = \ket{0},\, Z\ket{1} = -\ket{1}" />
        <M display t="X\ket{0} = \ket{1},\, X\ket{1} = \ket{0}" />
      </>
    ),
  },
  sections: [
    //                  Question 1: multiple choice and text box
    section({
      name: "aliceBobQuestion1",
      body: (m) => (
        <>
          <Prose>
            Alice has created a black box device that outputs a qubit (one qubit
            at a time), each in the quantum state{" "}
            <M t="{1\over\sqrt{2}} (\ket{0} + \ket{1})" />. <br />
            <br />
            Bob created a black box that also outputs one qubit at a time, but
            each is either in state <M t="\ket{0}" /> or in state{" "}
            <M t="\ket{1}" />. His black box uses a random number generator to
            decide which is output, each with 50% probability. <br />
            <br />
            Alice and Bob's setups produce qubits that are (select one):
          </Prose>
          <ChooseOne
            model={m.aliceBobQuestion1}
            choices={[
              [
                "one",
                "Identical (and therefore, experimentally indistinguishable)",
              ],
              ["two", "Different, but experimentally indistinguishable"],
              ["more", "Different, and can be experimentally distinguished"],
            ]}
          />
          <TextBox
            model={m.aliceBob1Explain}
            label={
              <Prose>
                Briefly explain your reasoning. (Please dont spend much time on
                this yet, we just want your first impressions. We will be
                exploring the answer in the rest of this tutorial)
              </Prose>
            }
          />
        </>
      ),
      //            Hint: distinguishable vs. indistinguishable
      hints: [
        hint({
          name: "distinguishableHint",
          label: "Distinguishable vs. indistinguishable",
          body: (
            <Prose>
              Two qubits are experimentally distinguishable if they can be
              differentiated by a measurement. If they are indistinguishable,
              they cannot be differentiated by a measurement. <br />
            </Prose>
          ),
        }),
      ],
      //                  Question 1 Informative Feedback
      guidance: {
        nextMessage() {
          return "answer";
        },
        messages: {
          answer: {
            body: (
              <Guidance.HeadsUp>
                <p>
                  We havent checked your answer yet, because we are going to
                  explore this question further and come back to it later.
                </p>
              </Guidance.HeadsUp>
            ),
            onContinue: "nextSection",
          },
        },
      },
    }),

    //                  Questions 2A & 2B: number boxes
    section({
      name: "aliceBobQuestion2",
      body: (m) => (
        <>
          <Prose>
            {" "}
            Alice and Bob are debating how to think about their black boxes.{" "}
            <br />
            <br />
            Alice thinks there is something measureably different about their
            outputs.
            <br />
            <br />
            Bob disagrees, he argues that his black box is experimentally
            indistinguishable from Alice's, since (after all) both are
            effectively "50/50, 0 or 1" boxes. <br />
            <br />
            Trying to decide, Alice and Bob each produce a large number of
            qubits and measure each qubit to be a 0 or 1. They can only make
            measurements of 0 or 1. After measuring many qubits:{" "}
          </Prose>
          <Decimal
            model={m.aliceBobQuestion2A}
            label={
              <Prose>
                {" "}
                On average, what percent of Alice's qubits will be measured to
                be 0? <br />
              </Prose>
            }
          />
          <Decimal
            model={m.aliceBobQuestion2B}
            label={
              <Prose>
                On average, what percent of Bob's qubits will be measured to be
                0?
              </Prose>
            }
          />
          <Prose faded>
            {" "}
            <em>
              Your answer should be a whole number, not a fraction or decimal.
            </em>{" "}
          </Prose>
        </>
      ),
      //                     Question 2A & 2B Dual Feedback
      guidance: {
        nextMessage(r) {
          const a = r.aliceBobQuestion2A;
          const b = r.aliceBobQuestion2B;
          if (a === 50 && b === 50) {
            return "correct";
          }

          return "incorrect";
        },
        messages: {
          correct: {
            body: (
              <Guidance.Agree>Nice, we agree with your answer.</Guidance.Agree>
            ),
            onContinue: "nextSection",
          },
          incorrect: {
            body: (
              <Guidance.Disagree>
                At least one of your answers is incorrect. Please try again.
              </Guidance.Disagree>
            ),
            onContinue: "nextMessage",
          },
        },
      },
    }),
    //                  Question 2C: Y/N & text box
    section({
      name: "aliceBobQuestion2C",
      body: (m) => (
        <>
          <Toggle
            model={m.aliceBobQuestion2C}
            label={
              <Prose>
                On the basis of <em>just this set of experiments so far</em>,
                can Alice and Bob settle their debate?
              </Prose>
            }
            choices={[
              ["yes", "Yes"],
              ["no", "No"],
            ]}
          />
          <TextBox
            model={m.aliceBobQuestion2Cexplain}
            label={<Prose>Briefly, explain:</Prose>}
          />
        </>
      ),
      //                     Question 2C Feedback on Y/N
      guidance: {
        nextMessage: () => "dynamicAnswer",
        messages: {
          dynamicAnswer: {
            body: ({ responses }) => (
              <Guidance.Dynamic
                status={
                  responses?.aliceBobQuestion2C?.selected === "no"
                    ? "agree"
                    : "disagree"
                }
              >
                {responses?.aliceBobQuestion2C?.selected !== "no" ? (
                  <p>
                    Since the measurement outcomes are identical (50/50), how
                    can Alice and Bob distinguish their states simply by
                    measuring? <br /> (If you have already started to think
                    about some other experiment they could do - great! But our
                    question was just about the experiments they have done so
                    far, a direct measurement of their qubits. )
                    <br />
                    You are welcome to change your answer above.
                  </p>
                ) : (
                  <p>
                    We agree with your answer. The outcomes for Alice and Bob
                    are identical, 50/50. They cannot distinguish their boxes
                    based on these measurements alone, even if they make a large
                    number of trials.
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
      //                   Question 3A & 3B: number boxes
      name: "aliceBobQuestion3A",
      body: (m) => (
        <>
          <Prose>
            The statistical outcome of the previous experiment was the same for
            both (50-50). Bob claims that this shows their black boxes are
            experimentally indistinguishable. Alice wants to do another
            experiment. <br />
            <br />
            Alice suggests they each apply a Z gate to their qubits before they
            measure. After many such measurements:
          </Prose>
          <Decimal
            model={m.aliceBobQuestion3A}
            label={
              <Prose>
                On average, what percent of Alice's qubits will be measured to
                be 0?
              </Prose>
            }
          />
          <Decimal
            model={m.aliceBobQuestion3B}
            label={
              <Prose>
                On average, what percent of Bob's qubits will be measured to be
                0?
              </Prose>
            }
          />
          <Prose faded>
            {" "}
            <em>Your answer should be a whole number.</em>{" "}
          </Prose>
        </>
      ),
      //                  Question 3A & 3B Dual Feedback
      guidance: {
        nextMessage(r) {
          const a = r.aliceBobQuestion3A;
          const b = r.aliceBobQuestion3B;
          if (a === 50 && b === 50) {
            return "correct";
          }

          return "incorrect";
        },
        messages: {
          correct: {
            body: (
              <Guidance.Agree>
                Nice, we agree with your answer. After acting a Z gate, we have
                merely changed the phase of |1⟩ states, which does not affect
                any measurement outcomes.
              </Guidance.Agree>
            ),
            onContinue: "nextSection",
          },
          incorrect: {
            body: (
              <Guidance.Disagree>
                After acting with a Z gate, we have merely changed the phase of
                |1⟩ states. Does this affect any measurement probabilities?
                (Please try again.)
              </Guidance.Disagree>
            ),
            onContinue: "nextMessage",
          },
        },
      },
    }),

    section({
      //                  Question 3C: Y/N and text box
      name: "aliceBobQuestion3C",
      body: (m) => (
        <>
          <Toggle
            model={m.aliceBobQuestion3C}
            label={
              <Prose>
                On the basis of all experiments so far, can Alice and Bob settle
                their debate?
              </Prose>
            }
            choices={[
              ["yes", "Yes"],
              ["no", "No"],
            ]}
          />
          <TextBox
            model={m.aliceBobQuestion3Cexplain}
            label={<Prose>Briefly, explain.</Prose>}
          />
        </>
      ),
      //                       Question 3C Feedback on Y/N
      guidance: {
        nextMessage: () => "dynamicAnswer",
        messages: {
          dynamicAnswer: {
            body: ({ responses }) => (
              <Guidance.Dynamic
                status={
                  responses?.aliceBobQuestion3C?.selected === "no"
                    ? "agree"
                    : "disagree"
                }
              >
                {responses?.aliceBobQuestion3C?.selected !== "no" ? (
                  <p>
                    Since the measurement outcomes are still identical (50/50),
                    how can Alice and Bob distinguish their states simply by
                    measuring? <br />
                    <br />
                    You are welcome to change your answer above.
                  </p>
                ) : (
                  <p>
                    We agree with your answer. Acting with a single Z gate did
                    not change any of our measurement probabilities, so Alice
                    and Bob still cannot distinguish their boxes based on these
                    measurements alone.
                  </p>
                )}
              </Guidance.Dynamic>
            ),
            onContinue: "nextSection",
          },
        },
      },
    }),
    //                      Question 4: Y/N & text box
    section({
      name: "aliceBobQuestion4",
      body: (m) => (
        <>
          <Prose>
            The statistical outcome is once again the same for both observers.
            Bob believes this confirms their black boxes are experimentally
            indistinguishable. Alice wants to do another experiment. <br />
          </Prose>

          <Toggle
            model={m.aliceBobQuestion4}
            label={
              <Prose>
                This time, they decide to apply an X gate to their qubits before
                they measure. Using similar reasoning as in the previous
                experiments, decide whether the statistical outcome finally
                settles their debate. (Briefly, discuss.)
              </Prose>
            }
            choices={[
              ["yes", "Yes"],
              ["no", "No"],
            ]}
          />
          <TextBox
            model={m.aliceBobQuestion4explain}
            label={<Prose> Briefly, explain. </Prose>}
          />
        </>
      ),
      //              Question 4 Informative Feedback for Y/N
      guidance: {
        nextMessage: () => "dynamicAnswer",
        messages: {
          dynamicAnswer: {
            body: ({ responses }) => (
              <Guidance.Dynamic
                status={
                  responses?.aliceBobQuestion4?.selected === "no"
                    ? "agree"
                    : "disagree"
                }
              >
                {responses?.aliceBobQuestion4?.selected !== "no" ? (
                  <p>
                    Acting with an X gate flips |0⟩ with |1⟩ and vice versa.
                    Does this change either Alice or Bob's probabilities for
                    measurment?
                    <br />
                    You are welcome to change your answer above.
                  </p>
                ) : (
                  <p>
                    We agree with your answer. Acting with an X gate flips |0⟩
                    with |1⟩ and vice versa. This doesn't change either Alice or
                    Bob's probabilities for measurement, so they still cannot
                    distinguish their boxes based on these measurements alone.
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
      //                    Question 5A & 5B: number boxes
      name: "aliceBobQuestion5A",
      body: (m) => (
        <>
          <Prose>
            After all these experiments (the first, where they simply measured,
            then where they applied a Z gate before measuring, and finally where
            they applied an X gate), they found that it was impossible to
            distinguish Alice and Bob's qubits. They decide to try one more
            experiment. <br />
            <br />
            This time, they apply an H gate to their qubits before they measure.
            <br />
          </Prose>
          <Decimal
            model={m.aliceBobQuestion5A}
            label={
              <Prose>
                On average, what percent of Alice's qubits will be measured to
                be 0?
              </Prose>
            }
          />
          <Decimal
            model={m.aliceBobQuestion5B}
            label={
              <Prose>
                On average, what percent of Bob's qubits will be measured to be
                0?
              </Prose>
            }
          />
          <Prose faded>
            {" "}
            <em>Your answer should be a whole number.</em>{" "}
          </Prose>
        </>
      ),
      //                    Question 5A and 5B Dual Feedback
      guidance: {
        nextMessage(r) {
          const a = r.aliceBobQuestion5A;
          const b = r.aliceBobQuestion5B;
          if (a === 100 && b === 50) {
            return "correct";
          }

          return "incorrect";
        },
        messages: {
          correct: {
            body: (
              <Guidance.Agree>
                Nice, we agree with your answer. <br /> Acting an H gate on
                Alice's superposition{" "}
                <M t="{1\over\sqrt{2}} (\ket{0} + \ket{1})" /> gives |0⟩ with
                100% probability. But acting an H gate on Bob's qubit means you
                act it on either |0⟩ or |1⟩. Either of these gives 0 or 1 with
                50% probability. So Bob's outcome remains 50/50, while Alice's
                is now 100% |0⟩. <br /> If you only hade one measurement you
                might not be sure, but after many measurements, Alice and Bob
                can now distinguish their boxes!
              </Guidance.Agree>
            ),
            onContinue: "nextSection",
          },
          incorrect: {
            body: (
              <Guidance.Disagree>
                At least one of your answers is incorrect. If you act an H gate
                on Alice's superposition{" "}
                <M t="{1\over\sqrt{2}} (\ket{0} + \ket{1})" />, what does that
                yield? <br /> Meanwhile, if you act an H gate on Bob's qubit,
                you act it on either |0⟩ or |1⟩. <br /> In either case, what are
                your measurement probabilities? <br /> Please try again.
              </Guidance.Disagree>
            ),
            onContinue: "nextMessage",
          },
        },
      },
    }),

    section({
      //                         Question 5C: Y/N & text box
      name: "aliceBobQuestion5C",
      body: (m) => (
        <>
          <Toggle
            model={m.aliceBobQuestion5C}
            label={
              <Prose>
                <strong>Recall our original question:</strong> <br />
                Alice and Bob's setups produce qubits that are: <br />
                <em> i.</em> Identical (and therefore, experimentally
                indistinguishable). <br />
                <em> ii.</em> Different, but experimentally indistinguishable.{" "}
                <br />
                <em> iii.</em> Different, and can be experimentally
                distinguished. <br />
                <br />
                Does the outcome of this final experiment at last settle their
                debate?
              </Prose>
            }
            choices={[
              ["yes", "Yes"],
              ["no", "No"],
            ]}
          />
          <TextBox
            model={m.aliceBobQuestion5Cexplain}
            label={<Prose>Briefly, explain.</Prose>}
          />
        </>
      ),
      //                    Question 5C Feedback on Y/N
      guidance: {
        nextMessage: () => "dynamicAnswer",
        messages: {
          dynamicAnswer: {
            body: ({ responses }) => (
              <Guidance.Dynamic
                status={
                  responses?.aliceBobQuestion5C?.selected === "yes"
                    ? "agree"
                    : "disagree"
                }
              >
                {responses?.aliceBobQuestion5C?.selected !== "yes" ? (
                  <p>
                    In our last scenario above (acting an H gate before
                    measurement), Alice and Bob had very different
                    probabilities. After many measurements, Alice will always
                    get 0, while Bob will get 0 or 1 with equal probability.
                    <br />
                    You are welcome to change your answer above.
                  </p>
                ) : (
                  <p>
                    We agree with your answer. If they each first act an H gate,
                    the probabilities for Alice and Bob are now different, so
                    they can distinguish their boxes.
                  </p>
                )}
              </Guidance.Dynamic>
            ),
            onContinue: "nextSection",
          },
        },
      },
    }),
    //                        Concluding statement
    section({
      name: "superpositionvmixedConclusion",
      body: (m) => (
        <>
          <Prose>
            <strong>
              If you have any questions at this stage, please check with an
              instructor.
            </strong>{" "}
            <br />
            <br />
            This final experiment yields different statistical outcomes for
            Alice and Bob, showing that their black boxes do indeed produce
            experimentally
            <br /> <em> distinguishable states.</em> <br />
            Alice's state is called a <em> superposition.</em> It is a uniquely
            quantum mechanical state, and plays an important role in quantum
            computers.
            <br />
            Bob's state is called a<em> mixed state. </em>
            We often refer to this state as a mixture or a "lack-of-knowledge"
            state.
          </Prose>
        </>
      ),
    }),
  ],
}));
