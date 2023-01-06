import {
  Callout,
  ChooseOne,
  Guidance,
  M,
  Prose,
  QC,
  Toggle,
} from "@/components";
import { page } from "@/tutorial";
import { PencilIcon } from "@primer/octicons-react";
import setup from "./setup";

export default page(setup, ({ section }) => ({
  name: "circuitDiagrams",
  label: "Circuit Diagrams",
  answers: "none",
  cheatSheet: {
    body: (
      <>
        <M display t="Z = \frac{1}{\sqrt{2}}\pmatrix{1 & 0 \\ 0 & -1}" />
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
            <QC t="\lstick{ \ket{0}} & \gate{Z} & \qw & \rstick{\ket{\psi_{out}}}" />
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

            <QC t="\lstick{\ket{\psi}} & \gate{Z} & \gate{X} & \qw" />
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
    }),
  ],
}));
