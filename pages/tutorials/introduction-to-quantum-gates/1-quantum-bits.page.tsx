import { Callout, Decimal, M, Prose } from "@/components";
import { page } from "@/tutorial";
import { PencilIcon } from "@primer/octicons-react";
import setup from "./setup";

export default page(setup, ({ section }) => ({
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

          {/* TODO: Possible mistakes, minus sign, not squaring, neglecting 1/5  */}
        </>
      ),
    }),

    section({
      name: "qubitProb1",
      body: (m) => (
        <Decimal
          model={m.qubitProb1}
          label={
            <Prose>
              What about the probability of measuring <M t="\ket{1}" />?
            </Prose>
            // TODO: Clarify the same state as before
          }
        />
      ),
      // TODO: Add feedback message about normalization (why is the 1/5 out front).
    }),
  ],
}));
