import {
  Callout,
  ChooseOne,
  Decimal,
  Guidance,
  Image,
  M,
  Prose,
  Toggle,
} from "@/components";
import { page } from "@/tutorial";
import { PencilIcon } from "@primer/octicons-react";
import fig4 from "./assets/C-fig-4.png";

import setup from "./setup";

export default page(setup, ({ section, hint }) => ({
  name: "buildingteleportation3",
  label: "Building a Teleportation Circuit (Part 3)",
  answers: "checked-all",

  sections: [
    section({
      name: "building3Intro",
      body: (
        <Prose>
          So far we have determined the state <M t="\ket{\psi_2}" />:
          <br />
          <M
            display
            t="\ket{\psi_2} = \frac{1}{2}(\ a|000\rangle \ + a|011\rangle \ + b|010\rangle \ + b|001\rangle"
          />
          <M
            display
            t="\qquad \qquad + a|100\rangle + a|111\rangle - b|110\rangle - b|101\rangle)"
          />
          <Image src={fig4} alt="circuit diagram C-4" />
          At this stage, Alice can now measure BOTH of her qubits, as indicated
          in the figure above.
        </Prose>
      ),
      continue: {
        label: "I’m ready to move on!",
      },
    }),

    section({
      name: "measure2",
      body: (m) => (
        <>
          <Decimal
            model={m.measure2}
            label={
              <Prose>
                How many different possible 2-qubit measurement combinations can
                Alice get, in principle?
              </Prose>
            }
          />

          <Prose>
            <em>Hint:</em> Your answer should be a whole number.
          </Prose>
        </>
      ),

      guidance: {
        nextMessage(r) {
          const measureresponse = r.measure2;

          if (measureresponse === undefined) {
            return null;
          }

          if (measureresponse === 4) {
            return "correct";
          } else if (measureresponse === 2) {
            return "two";
          } else if (measureresponse === 1) {
            return "one";
          } else {
            return "incorrect";
          }
        },
        messages: {
          correct: {
            body: (
              <Guidance.Agree>
                We agree with your answer! There are four possible measurement
                outcomes: 00, 01, 10, or 11{" "}
              </Guidance.Agree>
            ),
            onContinue: "nextSection",
          },
          two: {
            body: (
              <Guidance.Disagree>
                Remember that we are measuring two qubits, each of which can be
                0 or 1. Can you simply list out all the possible outcomes for
                such a 2-qubit measurement? <br /> Check your calculation then
                click “Check in Again”.
              </Guidance.Disagree>
            ),
            onContinue: "nextMessage",
          },
          one: {
            body: (
              <Guidance.Disagree>
                Remember that we are measuring two qubits, each of which can be
                0 or 1. Can you simply list out all the possible outcomes for
                such a 2-qubit measurement? <br /> Check your calculation then
                click “Check in Again”.
              </Guidance.Disagree>
            ),
            onContinue: "nextMessage",
          },
          incorrect: {
            body: (
              <Guidance.Disagree>
                We disagree with your answer. Remember that we are measuring two
                qubits, each of which can be 0 or 1. Can you simply list out all
                the possible outcomes for such a 2-qubit measurement? <br />
                Check your calculation then click “Check in Again”.
              </Guidance.Disagree>
            ),
            onContinue: "nextMessage",
          },
        },
      },
    }),
    // Note:  If they are stuck, there is no "escape" here. I think the hint is
    // clear enough, but they cannot move on if they don't get it. Is that ok?
    //
    //
    section({
      name: "Alicemeasures00",
      body: (m) => (
        <ChooseOne
          model={m.Alicemeasures00}
          choices={[
            ["125", "12.5% (= 1/8)"],
            ["25", "25% (= 1/4)"],
            ["50", "50% (= .5) "],
            ["asquared", <M t="|a|^2" />],
            ["asquaredover4", <M t="|a|^2/4" />],
            ["none", "None of the above is correct"],
          ]}
          label={
            <Prose>
              What is the probability that Alice’s pair of measurements will
              turn out to be 00?
            </Prose>
          }
        />
      ),

      guidance: {
        nextMessage: () => "dynamicAnswer",
        messages: {
          dynamicAnswer: {
            body: ({ responses }) => (
              <Guidance.Dynamic
                status={
                  responses?.Alicemeasures00?.selected === "25"
                    ? "agree"
                    : "disagree"
                }
              >
                {responses?.Alicemeasures00?.selected === "125" ? (
                  <p>
                    Close! Looking at the expression for
                    <M t="\ket{\psi_1}" /> above, I notice there are two terms
                    that begin with 00, the 1st and 4th terms on the first line.{" "}
                    <br />
                    To get the probability of either of those, we must sum the
                    squares of the coefficients of these two terms. So, the
                    probability is <M t="\frac{1}{4}(|a|^2 + |b|^2 )." />
                    <br /> I'm wondering if you simplified that correctly? Did
                    you remember that
                    <M t="|a|^2 + |b|^2 =1" />?
                    <br />
                    Feel free to change your answer.
                  </p>
                ) : responses?.Alicemeasures00?.selected === "25" ? (
                  <p>
                    Right! Just to summarize: the expression for{" "}
                    <M t="\ket{\psi_1}" /> above has two terms that begin with
                    00, the 1st and 4th terms on the first line. <br />
                    To get the probability of either of those, we summed the
                    squares of the coefficients of these two terms. So, the
                    probability is <M t="\frac{1}{4}(|a|^2 + |b|^2 )." />
                    <br /> Using <M t="|a|^2 + |b|^2 =1" />, the result is
                    indeed 25%.
                  </p>
                ) : responses?.Alicemeasures00?.selected === "50" ? (
                  <p>
                    Close! Looking at the expression for
                    <M t="\ket{\psi_1}" /> above, I notice there are two terms
                    that begin with 00, the 1st and 4th terms on the first line.{" "}
                    <br />
                    To get the probability of either of those, we must sum the
                    squares of the coefficients of these two terms. So, the
                    probability is <M t="\frac{1}{4}(|a|^2 + |b|^2 )." />
                    <br /> I'm wondering if you simplified that correctly? Did
                    you remember that <M t="|a|^2 + |b|^2 =1" />?
                    <br />
                    Feel free to change your answer.
                  </p>
                ) : responses?.Alicemeasures00?.selected === "none" ? (
                  <p>
                    It's a little tricky. Look carefully at the expression for
                    <M t="\ket{\psi_1}" /> above. <br /> There are TWO terms
                    that begin with 00, the 1st and 4th terms on the first line.{" "}
                    <br />
                    To get the probability of either of those, you must sum the
                    squares of the coefficients of these two terms. So, the
                    probability is <M t="\frac{1}{4}(|a|^2 + |b|^2 )." />
                    <br /> You might have thought this was not one of the given
                    answers ("None of the above"), but can you simplify that
                    expression? Remember
                    <M t="|a|^2 + |b|^2 =1." />)
                    <br />
                    Feel free to change your answer.
                  </p>
                ) : (
                  <p>
                    Not quite! Remember, you need to sum the squares of the
                    coefficients for ALL the terms that start with 00, not just{" "}
                    the first one. Feel free to try again.
                  </p>
                )}
              </Guidance.Dynamic>
            ),
            onContinue: "nextSection",
          },
        },
      },
      // The above guidance is heavy handed if they aren't getting it. Can we improve?
    }),

    section({
      name: "A00Bobwhat",
      body: (m) => (
        <>
          <Prose>
            <p>
              {" "}
              Summary: For Alice, measuring 00, 01, 10, or 11 are all equally
              likely outcomes, with 25% chance each. <br /> Alice’s measurement
              gives her no information at all about the mystery state, all four
              of her outcomes are equally likely. <br /> However, something
              interesting has nevertheless happened! Let’s look to see what Bob
              now has for his (single) qubit after Alice’s measurement.
            </p>{" "}
          </Prose>
          <ChooseOne
            model={m.A00Bobwhatchoose}
            choices={[
              ["0", <M t="\ket{0}" />],
              ["1", <M t="\ket{1}" />],
              ["plus", <M t="\frac{1}{\sqrt{2}}(\ket{0} + \ket{1})" />],
              ["a0b1", <M t="a\ket{0} + b\ket{1}" />],
              ["halfa0b1", <M t="\frac{1}{2}(a \ket{0} + b \ket{1})" />],
              ["none", <M t="{\rm None\ of\  the\  above\  is\  correct}" />],
              [
                "other",
                "It is ill-defined and cannot be written as a pure ket state",
              ],
            ]}
            label={
              <Prose>
                <p>
                  {" "}
                  Recall that Bob is in possession of ONLY the second qubit from
                  that original entangled <M t="\ket{\beta_{00}}" /> pair; this
                  is the third (rightmost) qubit in <M t="\ket{\psi_2}" />{" "}
                  <br /> As a reminder, the state before Alice's measurements
                  was:
                  <br />
                  <M
                    display
                    t="\ket{\psi_2} = \frac{1}{2}(\ a|000\rangle \ + a|011\rangle \ + b|010\rangle \ + b|001\rangle"
                  />
                  <M
                    display
                    t="\qquad \qquad + a|100\rangle + a|111\rangle - b|110\rangle - b|101\rangle)"
                  />
                  Bob has not done any gates or measurements yet.
                  <br />
                  Let's consider the specific situation where Alice happens to
                  measure
                  <M t="\ket{00}" />. What is the (normalized) state of Bob’s
                  qubit after her measurement?
                </p>
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
                  responses?.A00Bobwhatchoose?.selected === "a0b1"
                    ? "agree"
                    : "disagree"
                }
              >
                {responses?.A00Bobwhatchoose?.selected === "halfa0b1" ? (
                  <p>
                    Really close! After a "partial measurement" of a 3-qubit
                    state, you must properly renormalize the remaining one-qubit
                    term. <br /> Did you remember that
                    <M t="|a|^2 + |b|^2 =1?" />
                    <br />
                    You are welcome to change your answer above.
                  </p>
                ) : responses?.A00Bobwhatchoose?.selected === "a0b1" ? (
                  <p>
                    Right! There were exactly two terms in{" "}
                    <M t="\ket{\psi_2}\ " />
                    which start with 00, namely:{" "}
                    <M t="\frac{1}{2} (a \ket{000} + b\ket{001})\ " />. Thus,
                    after Alice’s measurement of 00, the 3-qubit state has
                    collapsed to the (normalized) state{" "}
                    <M t="a \ket{000} + b\ket{001}\ " />. (The{" "}
                    <M t="\frac{1}{2}\ " />
                    disappears when we normalize after measurement.)
                  </p>
                ) : (
                  <p>
                    We disagree with your answer. <br /> Partial measurement of
                    a multi-qubit state is subtle. There are exactly two terms
                    in <M t="\ket{\psi_2}\ " />
                    which start with 00, namely:{" "}
                    <M t="\frac{1}{2} (a \ket{000} + b\ket{001})\ " />. <br />
                    After Alice’s measurement of 00, the 3-qubit state must
                    collapse to (just) the third qubit combination appearing in
                    only those two terms. All other terms collapse away. <br />
                    In addition, after measurement you must renormalize your
                    (single qubit) state, remembering that{" "}
                    <M t="|a|^2+|b|^2=1." /> <br /> Feel free to try again.
                  </p>
                )}
                {/* Do we want other/different feedback for some of the distractors?
                Can just add those in above... */}
              </Guidance.Dynamic>
            ),
            onContinue: "nextSection",
          },
        },
      },
    }),

    section({
      name: "building4Intro",
      body: (
        <Prose>
          {" "}
          <M t="{\bf Recap\ of \ the\ last\ page:}" /> There were four
          possibilities for Alice’s measurement:{" "}
          <M t="\ket{00}, \ket{01}, \ket{10}, \ {\rm or}\ \ket{11}" />.
          <br /> We just worked out the situation where Alice got
          <M t="\ket{00}" />. After her measurement, Bob’s single-qubit state
          has collapsed to
          <M t="a \ket{0} + b \ket{1}" />. <br />
          To see what happens for the other three possibilities, it really helps
          to re-write <M t="\ket{\psi_2}" /> by combining the terms containing
          each of Alice’s four possible 2-qubit outcomes, so it's much easier to
          read off Bob’s resulting single-qubit state.
          <p>As a reminder, here's the circuit so far:</p>
          <Image src={fig4} alt="circuit diagram C-4" />
          <br />
          And, here's the state just before Alice's measurements that we want to
          reorganize: <br />
          <M
            display
            t="\ket{\psi_2} = \frac{1}{2}\bigl(\ a|000\rangle \ + a|011\rangle \ + b|010\rangle \ + b|001\rangle"
          />
          <M
            display
            t="\qquad \qquad + a|100\rangle + a|111\rangle - b|110\rangle - b|101\rangle \bigr)"
          />
        </Prose>
      ),
      continue: {
        label: "I’m ready to move on!",
      },
    }),

    section({
      name: "tryreorg",
      body: () => (
        <>
          <Prose>
            <p>
              Let’s reorganize the 8 terms above by factoring out the four
              possible 2-qubit outcomes Alice can get. As an example, notice
              that exactly two of the terms start with <M t="\ket{00}" /> ,
              namely
              <M t="a \ket{000} + b \ket{001} " /> (the 1st and 4th terms on the
              top line), so we can factor out the leading <M t="\ket{00}" />{" "}
              from those two and rewrite as <br />
              <M t="\ket{00} \otimes (a \ket{0} + b \ket{1})" />
              <br />
              Take a moment to work out all other terms yourself in detail.
              <br /> There are 8 terms above, you aren't changing anything - all
              you are doing is combining them into (four) pairs of terms that
              have the first two bits in common. <br />
              Please try to write it down carefully on paper before moving on.
            </p>
          </Prose>

          <Callout color="blue" iconLeft={<PencilIcon />}>
            Try it for yourself! Write out the state on scrap paper.
          </Callout>
        </>
      ),
      hints: [
        hint({
          name: "tryreorghint",
          label: "Can I get a little help?",
          body: (
            <Prose>
              <p>
                There are only 4 unique possibilities for the first two qubits:
                00, 01, 10, and 11. We have already taken care of the (two)
                terms that start with 00, and wrote them as a tensor product:
                <M t="\ket{00} \otimes (a \ket{0} + b \ket{1})" />. Just do the
                same for the remaining 6 terms. You should find they "pair up",
                two terms for each of the remaining combinations. <br />
                If you get stuck, keep going, we'll guide you through it.
                {/* This hint may not be enough! Let's think about more explicit help  */}
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
      name: "factorizedstate",
      body: (m) => (
        <>
          <Prose>
            Recall: We know that <br />
            <M
              display
              t="\ket{\psi_2} = \frac{1}{2}\bigl(\ a|000\rangle \ + a|011\rangle \ + b|010\rangle \ + b|001\rangle"
            />
            <M
              display
              t="\qquad \qquad \ + \ a|100\rangle + a|111\rangle - b|110\rangle - b|101\rangle\bigr)"
            />
            Your task was to reorganize those 8 terms. Let's check your result
            by matching your answer to the form shown below: find x, y and z
            (and decide if the ± should be plus or minus.) <br />
            <M
              display
              t="\ket{\psi_2} = \frac{1}{2}(\ \ket{00} \otimes (a\ket{0} + b\ket{1}) \ \ + \ \ket{01} \otimes (a\ket{1} \pm b\ket{0})"
            />
            <M
              display
              t=" + \ket{10} \otimes (a\ket{x} - b\ket{y})\  + \ \ket{11} \otimes \ket{z}\bigr) "
            />
          </Prose>
          <Toggle
            model={m.afterfactorsign}
            choices={[
              ["plus", <M t="+" />],
              ["minus", <M t="-" />],
              ["ambiguous", "It is ambiguous"],
            ]}
            label={
              <Prose>
                <p>
                  {" "}
                  Is that <M t="\pm" /> near the end of the first line +, −, or
                  is it ambiguous?
                  <br />
                </p>
              </Prose>
            }
          />
          <Toggle
            model={m.afterfactorx}
            choices={[
              ["0", <M t="0" />],
              ["1", <M t="1" />],
              ["other", "It's something else"],
            ]}
            label={
              <Prose>
                <p>
                  What is x?
                  <br />
                </p>
              </Prose>
            }
          />
          <Toggle
            model={m.afterfactory}
            choices={[
              ["0", <M t="0" />],
              ["1", <M t="1" />],
              ["other", "It's something else"],
            ]}
            label={
              <Prose>
                <p>
                  What is y?
                  <br />
                </p>
              </Prose>
            }
          />
          <ChooseOne
            model={m.afterfactorz}
            choices={[
              ["a", <M t="a \ket{0} - b \ket{1}" />],
              ["b", <M t="a \ket{0} + b \ket{1}" />],
              ["c", <M t="a \ket{1} - b \ket{0}" />],
              ["d", <M t="a \ket{1} + b \ket{0}" />],
              ["other", "It's something else"],
            ]}
            label={
              <Prose>
                <p>
                  What is z?
                  <br />
                </p>
              </Prose>
            }
          />
        </>
      ),
      hints: [
        hint({
          name: "factorizedstatehint",
          label: "Can I just get the answers?",
          body: (
            <Prose>
              <p>
                For the <M t="\pm" /> question: you must find the one term that
                begins with <M t="\ket{01}" />, and has b out front. There is
                only one such term, it’s the third term in the first line. The
                coefficient is +1.
                <br />
                For the questions about x and y: you must find all terms that
                start with <M t="\ket{10}" />. <br /> I see two such terms, both
                are in the second line, the 1st and last terms. <br /> The 1st
                term has a coefficient of a, with <M t="\ket{0}\ " /> as the
                final bit, so x is 0.
                <br /> The last term has a coefficient of <M t="-b" />, with
                <M t="\ket{1}\ " /> as the final bit, so y is 1.
                <br />
                As for z : locate all terms that began with <M t="\ket{11}" />.
                I see two of them, the middle two terms in the second line. What
                is left behind for the final qubit is thus{" "}
                <M t="z = a\ket{1}-b\ket{0}" />.
              </p>
            </Prose>
          ),
        }),
      ],
      // COMMENT:  If what they wrote doesn't match at all, can/should we have
      // some sort of HINT button before they try to answer the question above about x?
      // I did add a "Just give me the answers" button, that work?
      guidance: {
        nextMessage: () => "dynamicAnswer",
        messages: {
          dynamicAnswer: {
            body: ({ responses }) => (
              <Guidance.Dynamic
                status={
                  responses?.afterfactorsign?.selected === "plus" &&
                  responses?.afterfactorx?.selected === "0" &&
                  responses?.afterfactory?.selected === "1" &&
                  responses?.afterfactorz?.selected === "c"
                    ? "agree"
                    : "disagree"
                }
              >
                {responses?.afterfactorsign?.selected === "plus" &&
                responses?.afterfactorx?.selected === "0" &&
                responses?.afterfactory?.selected === "1" &&
                responses?.afterfactorz?.selected === "c" ? (
                  <p>
                    Good job, you got it all! Just to summarize: <br />
                    For the <M t="\pm" /> question: you find the term that begin
                    with <M t="\ket{01}" />, and has b out front. There is only
                    one such term, it’s the third term in the first line. The
                    coefficient is +1.
                    <br />
                    For the questions about x and y: you find all terms that
                    start with <M t="\ket{10}" />. I see two such terms, both in
                    the second line, the 1st and last terms. The 1st term has a
                    coefficient of a, with <M t="\ket{0}\ " /> as the final bit,
                    so x is 0.
                    <br /> The last term has a coefficient of <M t="-b" />, with
                    <M t="\ket{1}\ " /> as the final bit, so y is 1.
                    <br />
                    As for z : locate all terms that began with{" "}
                    <M t="\ket{11}" />. I see two of them, the middle two terms
                    in the second line. What is left behind for the final qubit
                    is thus <M t="z = a\ket{1}-b\ket{0}" />.
                  </p>
                ) : responses?.afterfactorsign?.selected !== "plus" ? (
                  <p>
                    {" "}
                    We have not checked all your answers yet, but just consider
                    the first question about the sign of that term: you need to
                    locate a term that begins with <M t="\ket{01}" />, and has{" "}
                    <M t="b\ " /> out front. <br /> There is only one such term,
                    it’s the third term in the first line. What's the sign of
                    its coefficient? <br /> Feel free to change your answer(s)
                    and try again.
                    <br />
                  </p>
                ) : (
                  // To get here, they are NOT correct, but they DO have a plus sign!
                  <p>
                    One or more of your responses is not correct. Here are some
                    general hints, please try again!
                    <br />
                    For the questions about x and y: you must locate all terms
                    that start with <M t="\ket{10}" />. I see two such terms,
                    both in the second line, the 1st and last terms. <br /> The
                    1st term has a coefficient of a, what is the final bit?
                    (That's x!) <br /> The last term has a coefficient of{" "}
                    <M t="-b" />, what is the final bit? (That's y!)
                    <br />
                    For the question about z : you need to locate all terms that
                    begin with <M t="\ket{11}" />. <br /> I see two of them, the
                    middle two terms in the second line. Whatever is left behind
                    for the final qubit is z. <br /> You are free to change your
                    answers above and try again, (when you get it all right the
                    feedback color will change to green)
                  </p>
                )}
              </Guidance.Dynamic>
              // We need better feedback, it's just tedious. Can Giaco show us a better way?
              // IMPORTANT:  If they are stuck,
              // we should generate some sort of "tell me the answer" button, how to do that?
            ),

            onContinue: "nextSection",
          },
        },
      },
    }),

    // End it all! This comes after the last \section{}
  ],
}));
