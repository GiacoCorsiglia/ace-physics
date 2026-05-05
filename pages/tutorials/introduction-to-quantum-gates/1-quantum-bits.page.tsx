import { Callout, Dropdown, Guidance, M, Prose } from "@/components";
import { page } from "@/tutorial";
import { PencilIcon } from "@primer/octicons-react";
import setup from "./setup";

export default page(setup, ({ section, hint }) => ({
  name: "quantumBits",
  label: "Quantum Bits (Qubits)",
  answers: "checked-all",
  sections: [
    section({
      name: "quantumBitsIntro",
      body: (
        <Prose>
          <p>
            In a classical computer, bits are 0 and 1. In a quantum computer, we
            write qubits as <M t="\ket{0}" /> and
            <M t="\ket{1}" />. A unique feature of a quantum computer is that a
            qubit can exist in a superposition state:
            <M display t="\ket{\psi} = a\ket{0}+b\ket{1}" />
            where a and b are complex numbers of magnitude <M t="\leq 1" />.
          </p>

          <p>
            The symbol <M t="\ket{\psi}" /> is a common notation for a generic
            qubit. (Just like the notation <M t="f(x)" /> is often used for a
            generic function of <M t="x" />
            .)
          </p>

          <p>
            For such a superposition, the probability of measuring{" "}
            <M t="\ket{0}" /> is <M t="|a|^2" />, and of measuring{" "}
            <M t="\ket{1}" /> is <M t="|b|^2" />. No other measurements are
            possible.
          </p>
        </Prose>
      ),
    }),

    section({
      name: "qubitsAsColumns",
      enumerate: false,
      body: (
        <Prose>
          <p>
            The symbols <M t="\ket{0}" />, <M t="\ket{1}" />, and{" "}
            <M t="\ket{\psi}" /> are all called “kets” (this is just a name for
            the notation).
          </p>

          <p>
            An alternate representation is to write kets as column vectors:
            <M
              display
              t="
              \ket{0} = \pmatrix{1 \\ 0}, \;\;
              \ket{1} = \pmatrix{0 \\ 1}
            "
            />
            which means an arbitrary single-qubit state can be represented as:
            <M display t="a\ket{0} + b\ket{1} = \pmatrix{a \\ b}" />
          </p>
        </Prose>
      ),
    }),

    section({
      name: "qubitProb0",
      body: (m) => (
        <>
          <Dropdown
            model={m.qubitProb0}
            label={
              <Prose>
                If a single qubit is in the state
                <M display t="\frac{1} {5}\pmatrix{3i \\ -4}," />
                what is the probability of measuring it to be <M t="\ket{0}" />?
              </Prose>
            }
            choices={[
              ["+z", <M t="3i/5" />],
              ["-z", <M t="9/25" />],
              ["+x", <M t="-9/25" />],
              ["-x", <M t="4/5" />],
              ["+y", <M t="16/25" />],
              ["-y", <M t="-16/25" />],
            ]}
          />

          <Prose>
            <em>Hint:</em> Your answer should be a decimal value between{" "}
            <M t="0" /> and <M t="1" />.
          </Prose>

          <Callout color="blue" iconLeft={<PencilIcon size="medium" />}>
            Do this on scrap paper.
          </Callout>

          <Prose>
            We use the convention that <M t="i = \sqrt{-1}" />.
          </Prose>
        </>
      ),
        guidance: {
        nextMessage: (responses) =>
         {
          if (responses?.qubitProb0?.selected === "-z") {
            return "correct";
          } else if (responses?.qubitProb0?.selected === "+x") {
            return "negativeCorrect";
          } else if (responses?.qubitProb0?.selected === "+z") {
            return "unsquared";
          } else if (responses?.qubitProb0?.selected === "+y") {
            return "outOfRange";
          } else {
            return "incorrect";
          }
        },
        messages: {
          correct: {
            body: <Guidance.Agree>We agree with your answer!</Guidance.Agree>,
            onContinue: "nextSection",
          },
          negativeCorrect: {
            body: (
              <Guidance.Disagree>
                Heads up: <M t="|i|^2 = +1" />, so your answer should be
                positive.
              </Guidance.Disagree>
            ),
            onContinue: "nextMessage",
          },
          unsquared: {
            body: (
              <Guidance.Disagree>
                Close, but you need to square the coefficient when calculating
                probability.
              </Guidance.Disagree>
            ),
            onContinue: "nextMessage",
          },
          outOfRange: {
            body: (
              <Guidance.Disagree>
                We disagree with your answer. Check your calculation then click
                “Check in Again”.
              </Guidance.Disagree>
            ),
            onContinue: "nextMessage",
          },
          incorrect: {
            body: (
              <Guidance.Disagree>
                We disagree with your answer. Check your calculation then click
                “Check in Again”.
              </Guidance.Disagree>
            ),
            onContinue: "nextMessage",
          },
        },
      },


      hints: [
        hint({
          name: "probability",
          label: "Probability?",
          body: (
            <>
              If the state is <M t="\ket{\psi} = a\ket{0}+b\ket{1}" />, the
              probability of measuring <M t="\ket{1}" /> is <M t="|b|^2" />.
              Note that <M t="|i|^2 = +1" />.
            </>
          ),
        }),
      ],
    }),

    section({
      name: "qubitProb1",
      body: (m) => (
        <Dropdown
          model={m.qubitProb1}
          label={
            <Prose>
              What about the probability of measuring <M t="\ket{1}" /> (for the
              same state as the last question)?
            </Prose>
          }
          choices={[
            ["+z", <M t="3i/5" />],
            ["-z", <M t="9/25" />],
            ["+x", <M t="-9/25" />],
            ["-x", <M t="4/5" />],
            ["+y", <M t="16/25" />],
            ["-y", <M t="-16/25" />],
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
                  responses?.qubitProb1?.selected === "+y" ? "agree" : "disagree"
                }
              >
                {responses?.qubitProb1?.selected !== "+y" ? (
                  <p>
                    Heads up—double check your calculation.
                  </p>
                ) : (
                  <p>We agree with your answer.
                    <br />
                  You can confirm that the probabilities for <M t="\ket{0}" />{" "}
                  (which you found above) and <M t="\ket{1}" /> add up to 1.
                  This is always the case: you must have 100% probability of
                  measuring <em>something</em>.
                  <br />
                 This is called <strong>normalization.</strong>
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
