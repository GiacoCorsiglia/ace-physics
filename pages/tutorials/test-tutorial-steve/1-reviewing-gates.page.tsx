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

export default page(setup, ({ section }) => ({
  name: "reviewingGates",
  label: "Reviewing Gatess",
  answers: "none",
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
      name: "reviewingGatesIntro",
      body: (
        <Prose>
          <p>
            First lets do a brief review review of some single-qubit circuits:
            ZZZ Here is Tex source sample <M t="\ket{\psi_{out}}  = \ket{0}" />
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
            Compute <M t="XZ" /> and <M t="ZX" /> using matrices.
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
        nextMessage: () => "answer",
        messages: {
          answer: {
            body: ({ responses }) => (
              <Guidance.Dynamic
                status={
                  responses?.doXAndZCommute?.selected === "yes"
                    ? "agree"
                    : "disagree"
                }
              >
                In general, order of matrix multiplication matters. However, if
                it happens that <M t="AB = BA" />, then the operators
                <M t="A" /> and <M t="B" /> are said to <em>commute</em>. (So
                above, we saw that <M t="X" /> and <M t="Z" /> do <em>not</em>{" "}
                commute.)
              </Guidance.Dynamic>
            ),
            onContinue: "nextSection",
          },
        },
      },
    }),

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
        nextMessage(r, s) {
          if (r.circuitDiagramOrder?.selected === "xz") {
            return null;
          }
          return "answer";
        },
        messages: {
          answer: {
            body: (
              <>
                <Callout color="red">
                  We disagree with your answer. Reread the first sentence
                  carefully and compare it to the picture; make sure you
                  understand what’s going on here.
                </Callout>
              </>
            ),
            onContinue: "nextSection",
            continueLabel: "Move on",
          },
        },
      },
    }),
  ],
}));
