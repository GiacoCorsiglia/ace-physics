import {
  Callout,
  Guidance,
  M,
  Matrix,
  Prose,
  TextBox,
  TextLine,
  Toggle,
} from "@/components";
import { page } from "@/tutorial";
import { PencilIcon } from "@primer/octicons-react";
import setup from "./setup";

export default page(setup, ({ section, hint }) => ({
  name: "xGate",
  label: "Gates",
  answers: "checked-some",
  sections: [
    section({
      name: "xGateIntro",
      body: (
        <Prose>
          To perform any tasks on our quantum computer, we need to apply “gates”
          (like in a classical computer, where we have the NOT gate and the OR
          gate). When a gate acts on a state, the result is another state. These
          gates take the form of quantum mechanical operators. We will go over
          some of the more common gates for quantum computers.
        </Prose>
      ),
      continue: {
        label: "Got it",
      },
    }),

    section({
      name: "xGate",
      enumerate: false,
      body: (
        <Prose>
          <h3>
            <M t="X" /> gate (Also called “Not gate” or <M t="U_{Not}" /> gate)
          </h3>

          <p>
            The <M t="X" /> gate performs the function of a NOT gate, changing{" "}
            <M t="\ket{0}" /> to <M t="\ket{1}" /> and vice versa.
          </p>

          <p>
            The mathematical expression that matches this sentence is{" "}
            <M t="X\ket{0}=\ket{1}" />.
          </p>

          <p>
            Mathematically, the <M t="X" /> gate is written in matrix notation
            as
            <M display t="X = \pmatrix{0 & 1 \\ 1 & 0}" />
            Take a moment to verify (using matrix multiplication) that
            <M display t="X\ket{0} = \ket{1} \and X\ket{1} = \ket{0}." />
          </p>
        </Prose>
      ),
      continue: {
        label: "I verified these equalities",
      },
    }),

    section({
      name: "xTimesArbitraryKet",
      body: (m) => (
        <>
          <TextBox
            model={m.xTimesArbitraryKet}
            label={
              <Prose>
                What is <M t="X (a\ket{0} + b\ket{1})" />?
              </Prose>
            }
          />

          <Prose>Can you answer this without using matrices?</Prose>

          <Prose faded>
            You can type a ket using the <code>|</code> and <code>{">"}</code>{" "}
            keys, such as |0{">"}.
          </Prose>
        </>
      ),
      hints: [
        hint({
          name: "withoutMatrices",
          label: "Without Matrices?",
          body: (
            <Prose>
              To answer without matrices, try using the rules given above for
              the products <M t="X\ket{0}" /> and <M t="X\ket{1}" />.
            </Prose>
          ),
        }),
      ],
      guidance: {
        nextMessage() {
          return "answer";
        },
        messages: {
          answer: {
            body: (
              <Guidance.HeadsUp>
                <p>
                  Our answer is: <M t="a\ket{1} + b\ket{0}" />.
                </p>

                <p>
                  Here’s how we did it, using the rules given above for{" "}
                  <M t="X" />:
                  <M display t="X (a\ket{0} + b\ket{1})" />
                  <M display t="= Xa\ket{0} + Xb\ket{1}" />
                  <M display t="= aX\ket{0} + bX\ket{1}" />
                  <M display t="= a\ket{1} + b\ket{0}" />
                </p>
              </Guidance.HeadsUp>
            ),
            onContinue: "nextSection",
          },
        },
      },
    }),

    section({
      name: "xTimesKet",
      body: (m) => (
        <>
          <Prose>
            What is the output state when you act <M t="X" /> on the state
            <M t="\frac{1}{5}\pmatrix{3i \\ -4}" />?
          </Prose>

          <Matrix
            label={<M display t="X \frac{1}{5}\pmatrix{3i \\ -4} = " />}
            column={Matrix.modelToColumn(m.xTimesKet, (r) => (
              <TextLine model={r} />
            ))}
          />

          <Prose>Is there more than one way to do this calculation?</Prose>
        </>
      ),
    }),

    section({
      name: "xTimesPlus",
      body: (m) => (
        <>
          <Prose>
            Act <M t="X" /> on the state{" "}
            <M t="\frac{1}{\sqrt{2}} (\ket{0}+\ket{1})" />.
          </Prose>

          <Callout color="blue" iconLeft={<PencilIcon size="medium" />}>
            Do this on scrap paper.
          </Callout>

          <Toggle
            model={m.xTimesPlus}
            label={<Prose>Is the result a different state?</Prose>}
            choices={[
              ["yes", "Yes, it’s a different state"],
              ["no", "No, it’s the same state"],
            ]}
          />
        </>
      ),
      hints: [
        hint({
          name: "actX",
          label: (
            <>
              What does “Act <M t="X" />” mean?
            </>
          ),
          body: (
            <Prose>
              <p>
                When we say “Act <M t="X" /> on the state”, we mean calculate
                the result of multiplying <M t="X" /> times the state.
              </p>

              <p>
                A gate (like <M t="X" />) is an <strong>action</strong> that can
                be performed on a state, which produces a new, potentially
                altered state.
              </p>
            </Prose>
          ),
        }),
      ],
      guidance: {
        nextMessage: () => "answer",
        messages: {
          answer: {
            body: ({ responses }) => (
              <Guidance.Dynamic
                status={
                  responses?.xTimesPlus?.selected === "no"
                    ? "agree"
                    : "disagree"
                }
              >
                It’s the same state, because the coefficients for{" "}
                <M t="\ket{0}" /> and <M t="\ket{1}" /> are both{" "}
                <M t="1/\sqrt{2}" />, so swapping the coefficients has no
                effect.
              </Guidance.Dynamic>
            ),
            onContinue: "nextSection",
          },
        },
      },
    }),
  ],
}));
