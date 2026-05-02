import {
  Callout,
  ChooseOne,
  Guidance,
  M,
  Prose,
  QuantumCircuit,
  Toggle,
} from "@/components";
import { page } from "@/tutorial";
import { PencilIcon } from "@primer/octicons-react";
import setup from "./setup";

export default page(setup, ({ section, hint }) => ({
  name: "circuitDiagrams",
  label: "Circuit Diagrams",
  answers: "checked-some",
  cheatSheet: {
    body: (
      <>
        <M display t="Z = \pmatrix{1 & 0 \\ 0 & -1}" />
        <M display t="X = \pmatrix{0 & 1 \\ 1 & 0}" />
      </>
    ),
  },
  sections: [
    section({
      name: "circuitDiagramsIntro",
      body: (
        <Prose>
          <p>
            A pictorial way to represent the operation <M t="Z \ket{0}" /> is
            with a <strong>circuit diagram</strong>:
            <QuantumCircuit t="\lstick{ \ket{0}} & \gate{Z} & \qw & \rstick{\ket{\psi_{out}}}" />
            where the wire shows the progression of the qubit from left to
            right.
          </p>

          <p>
            The state written to the left is the initial state of the qubit and
            the state on the right is the output state. Gates are indicated by
            boxes with the description of the gate labeled.
          </p>

          <p>
            The output of the circuit above is{" "}
            <M t="\ket{\psi_{out}}  = \ket{0}" />, because the <M t="Z" /> gate
            does not change a <M t="\ket{0}" /> state. Recall what <M t="Z" />{" "}
            gates do: if we input a <M t="\ket{1}" /> into that circuit,{" "}
            <M t="\ket{\psi_{out}} = -\ket{1}" />.
          </p>
        </Prose>
      ),
      continue: {
        label: "Got it",
      },
    }),

    section({
      name: "doXAndZCommute",
      body: (m) => (
        <>
          <Prose>
            Compute <M t="XZ" /> and <M t="ZX" /> using matrices. <br /> (If you
            need a refresher on these matrices, click the "i" button in the
            lower left of your screen.)
          </Prose>

          <Callout color="blue" iconLeft={<PencilIcon size="medium" />}>
            Do this on scrap paper.
          </Callout>

          <Toggle
            model={m.doXAndZCommute}
            label="Does the order matter?"
            choices={[
              ["yes", "Yes, order matters"],
              [
                "no",
                <>
                  No, <M t="XZ = ZX" />
                </>,
              ],
            ]}
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
                  responses?.doXAndZCommute?.selected === "yes"
                    ? "agree"
                    : "disagree"
                }
              >
                {responses?.doXAndZCommute?.selected !== "yes" ? (
                  <p>
                    In general, the order of matrix multiplication matters.
                    However, if it happens that AB=BA, then the operators A and
                    B are said to commute. <br />
                    <br />
                    Please check your matrix multiplication.
                  </p>
                ) : (
                  <p>
                    Great! In general, the order of matrix multiplication
                    matters. However, if it happens that AB=BA, then the
                    operators A and B are said to commute. In this case, we have
                    found that X and Z do not commute.{" "}
                  </p>
                )}
              </Guidance.Dynamic>
            ),
            onContinue: "nextSection",
          },
        },
      },
    }),
    // question B
    section({
      name: "doesZSelfCommute",
      body: (m) => (
        <>
          <Toggle
            model={m.doesZSelfCommute}
            label={
              <Prose>
                Does <M t="Z" /> commute with itself?
              </Prose>
            }
            choices={[
              ["yes", "Yes"],
              ["no", "No"],
            ]}
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
                  responses?.doesZSelfCommute?.selected === "yes"
                    ? "agree"
                    : "disagree"
                }
              >
                {responses?.doesZSelfCommute?.selected !== "yes" ? (
                  <p>
                    We disagree with your answer, check the hint and try again.
                  </p>
                ) : (
                  <p>
                    We agree, <M t="ZZ = ZZ" />!
                  </p>
                )}
              </Guidance.Dynamic>
            ),
            onContinue: "nextSection",
          },
        },
      },
      hints: [
        hint({
          name: "commute",
          label: "Commute?",
          body: (
            <>
              Z is said to commute with itself if <M t="ZZ = ZZ" />.
            </>
          ),
        }),
      ],
    }),

    section({
      name: "circuitDiagramOrder",
      body: (m) => (
        <>
          <Prose>
            <p>
              The notation <M t="X Z \ket{\psi}" /> means act <M t="Z" /> first,
              and then act <M t="X" /> on that outcome. This is because{" "}
              <M t="Z" /> is directly acting on <M t="\ket{\psi}" />, and then{" "}
              <M t="X" /> acts on the state <M t="(Z\ket{\psi})" />.
            </p>

            <p>Consider the circuit diagram shown here:</p>

            <QuantumCircuit t="\lstick{\ket{\psi}} & \gate{Z} & \gate{X} & \qw" />
          </Prose>

          <ChooseOne
            model={m.circuitDiagramOrder}
            label={
              <Prose>
                How would you write the circuit above as an equation?
              </Prose>
            }
            choices={[
              ["xz", <M t="X Z \ket{\psi}" />],
              ["zx", <M t="Z X \ket{\psi}" />],
              ["either order", "Both of the above work."],
            ]}
          />
        </>
      ),
      // guidance: {
      //   nextMessage: () => "answer",
      //   messages: {
      //     answer: {
      //       body: ({ responses }) => (
      //         <Guidance.Dynamic
      //           status={
      //             responses?.circuitDiagramOrder?.selected === "xz"
      //               ? "agree"
      //               : "disagree"
      //           }
      //         >
      //           In general, order of matrix multiplication matters. However, if
      //           it happens that <M t="AB = BA" />, then the operators
      //           <M t="A" /> and <M t="B" /> are said to <em>commute</em>. (So
      //           above, we saw that <M t="X" /> and <M t="Z" /> do <em>not</em>{" "}
      //           commute.)
      //         </Guidance.Dynamic>
      //       ),
      //       onContinue: "nextSection",
      //     },
      //   },
      // },
      guidance: {
        nextMessage: () => "dynamicAnswer",
        messages: {
          dynamicAnswer: {
            body: ({ responses }) => (
              <Guidance.Dynamic
                status={
                  responses?.circuitDiagramOrder?.selected === "xz"
                    ? "agree"
                    : "disagree"
                }
              >
                {responses?.circuitDiagramOrder?.selected !== "xz" ? (
                  <p>Please check the order and try again.</p>
                ) : (
                  <p>We agree with your answer. </p>
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
