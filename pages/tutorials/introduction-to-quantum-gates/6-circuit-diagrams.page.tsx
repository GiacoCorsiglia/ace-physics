import {
  Callout,
  ChooseOne,
  Guidance,
  M,
  Prose,
  QC,
  TextBox,
  Toggle,
} from "@/components";
import { page } from "@/tutorial";
import { PencilIcon } from "@primer/octicons-react";
import setup from "./setup";

export default page(setup, ({ section }) => ({
  name: "circuitDiagrams",
  label: "Circuit Diagrams",
  answers: "none",
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

    section({
      name: "outputZX1",
      body: (m) => (
        <TextBox
          model={m.outputZX1}
          label={
            <Prose>
              What is the output of the following circuit?
              <QC t="\lstick{\ket{1}} & \gate{X} & \gate{Z} & \qw" />
            </Prose>
          }
        />
      ),
    }),

    section({
      name: "outputXZ1",
      body: (m) => (
        <>
          <TextBox
            model={m.outputXZ1}
            label={
              <Prose>
                What is the output of the following circuit?
                <QC t="\lstick{\ket{1}} & \gate{Z} & \gate{X} & \qw" />
              </Prose>
            }
          />

          <Prose>
            Note: you should get a different output from the previous question,
            in this case merely a different phase. Order of operations often
            matters!
          </Prose>
        </>
      ),
    }),

    section({
      name: "matrixOrEquationApproach",
      body: (m) => (
        <>
          <Prose>
            Did you solve the last two questions by multiplying out matrices, or
            by using equations (e.g. starting with <M t="X\ket{1} = \ket{0}" />{" "}
            followed by acting <M t="Z" /> on <M t="\ket{0}" />
            )? Whichever you chose, try the other, just this once.
          </Prose>

          <Callout color="blue" iconLeft={<PencilIcon size="medium" />}>
            Do this on scrap paper.
          </Callout>

          <TextBox
            model={m.matrixOrEquationApproach}
            label="Which seems easier? "
          />
        </>
      ),
    }),

    section({
      name: "inverseOfX",
      body: (m) => (
        <>
          <ChooseOne
            model={m.inverseOfX}
            label={
              <Prose>
                <p>
                  What does the second gate have to be to make this circuit
                  behave as shown no matter what the input state is?
                </p>

                <QC t="\lstick{ \ket{\psi} }& \gate{X} & \gate{?} & \qw & \rstick{\ket{\psi}}" />
              </Prose>
            }
            choices={[
              ["X", <M t="? = X" />],
              ["Z", <M t="? = Z" />],
              ["H", <M t="? = H" />],
              ["I", <M t="? = I" />],
            ]}
          />

          <Prose>
            <em>Hint:</em> Another way to ask this is: find an operator{" "}
            <M t="?" /> such that <M t="X? = I" />. This operator is called the{" "}
            <em>inverse</em> of <M t="X" />.
          </Prose>
        </>
      ),
    }),

    section({
      name: "outputZHPlus",
      body: (m) => (
        <>
          <TextBox
            model={m.outputZHPlus}
            label={
              <Prose>
                What is the output of the following circuit?
                <QC t="\lstick{\frac{1}{\sqrt{2}}(\ket{0} + \ket{1})} & \gate{H} & \gate{Z} & \qw" />
              </Prose>
            }
          />
        </>
      ),
    }),

    section({
      name: "outputHZPlus",
      body: (m) => (
        <>
          <TextBox
            model={m.outputHZPlus}
            label={
              <Prose>
                What is the output of the following circuit?
                <QC t="\lstick{\frac{1}{\sqrt{2}}(\ket{0} + \ket{1})} & \gate{Z} & \gate{H} & \qw" />
              </Prose>
            }
          />
        </>
      ),
    }),

    section({
      name: "doHZCommute",
      body: (m) => (
        <TextBox
          model={m.doHZCommute}
          label={
            <Prose>
              Given the answers on this page, can you say whether <M t="H" />{" "}
              commutes with <M t="Z" /> without bothering to multiply matrices
              in different orders?
            </Prose>
          }
        />
      ),
    }),
  ],
}));
