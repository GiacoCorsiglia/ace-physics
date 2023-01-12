import { Callout, Decimal, Guidance, M, Prose } from "@/components";
import { page } from "@/tutorial";
import { PencilIcon } from "@primer/octicons-react";
import setup from "./setup";

export default page(setup, ({ section, hint }) => ({
  name: "quantumBits",
  label: "Quantum Bits (Qubits)",
  answers: "none",
  sections: [
    section({
      name: "quantumBitsIntro",
      body: (
        <Prose>
          <p>
            In a classical computer, bits are 0 and 1. In a quantum computer, we
            write <strong>qu</strong>bits as <M t="\ket{0}" /> and
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
            which means
            <M display t="a\ket{0} + b\ket{1} = \pmatrix{a \\ b}" />
          </p>
        </Prose>
      ),
    }),

    section({
      name: "qubitProb0",
      body: (m) => (
        <>
          <Decimal
            model={m.qubitProb0}
            label={
              <Prose>
                If the state is
                <M display t="\frac{1} {5}\pmatrix{3i \\ -4}," />
                what is the probability of measuring <M t="\ket{0}" />?
              </Prose>
            }
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
      guidance: {
        nextMessage(r) {
          const correct = (3 / 5) ** 2;
          const prob = r.qubitProb0;

          if (prob === undefined) {
            return null;
          }

          if (prob === correct) {
            return "correct";
          } else if (prob === -correct) {
            return "negativeCorrect";
          } else if (prob === 3 / 5 || prob === -3 / 5) {
            return "unsquared";
          } else if (prob < 0 || prob > 1) {
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
                Your answer should be between 0 and 1.
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
    }),

    section({
      name: "qubitProb1",
      body: (m) => (
        <Decimal
          model={m.qubitProb1}
          label={
            <Prose>
              What about the probability of measuring <M t="\ket{1}" /> (for the
              same state as the last question)?
            </Prose>
          }
        />
      ),
      guidance: {
        nextMessage(r) {
          const correct = (4 / 5) ** 2;
          const prob = r.qubitProb1;

          if (prob === correct) {
            return "correct";
          } else {
            return "incorrect";
          }
        },
        messages: {
          correct: {
            body: (
              <Guidance.Agree>
                <p>We agree with your answer.</p>

                <p>
                  You can confirm that the probabilities for <M t="\ket{0}" />{" "}
                  (which you found above) and <M t="\ket{1}" /> add up to 1.
                  This is always the case: you must have 100% probability of
                  measuring <em>something</em>.
                </p>

                <p>
                  The <M t="1/5" /> coefficient in front of the column vector
                  ensures that this is true.
                </p>
              </Guidance.Agree>
            ),
            onContinue: "nextSection",
          },
          incorrect: {
            body: (
              <Guidance.Disagree>
                <p>Heads up—double check your calculation.</p>
              </Guidance.Disagree>
            ),
            onContinue: "nextMessage",
          },
        },
      },
    }),
  ],
}));
