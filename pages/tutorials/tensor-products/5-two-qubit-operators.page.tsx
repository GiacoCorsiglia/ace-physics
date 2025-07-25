import {
  Answer,
  Callout,
  ChooseAll,
  ChooseOne,
  Guidance,
  Horizontal,
  M,
  Matrix,
  Prose,
  QuantumCircuit,
  TextBox,
  TextLine,
} from "@/components";
import { arraysEqual, deepEqual } from "@/helpers/client";
import { page } from "@/tutorial";
import setup from "./setup";

export default page(setup, ({ section }) => ({
  name: "twoQubitOperators",
  label: "Two Qubit Operators",
  // answers: "provided",
  sections: [
    section({
      name: "twoQubitOperatorsIntro",
      body: (
        <Prose>
          <p>Recall the example from before:</p>

          <QuantumCircuit t="\lstick{\ket{\psi}} & \gate{Z} & \qw \\ \lstick{\ket{\phi}} & \gate{X} & \qw \\" />

          <p>
            We said that one way to represent the output of this circuit is:{" "}
            <M display t="(Z\otimes X) (\ket{\psi} \otimes \ket{\phi} )" />.
          </p>
        </Prose>
      ),
    }),

    section({
      name: "representZxX",
      body: (m) => (
        <ChooseOne
          model={m.representZxX}
          label={
            <Prose>
              <p>
                We know that <M t="\ket{\psi} \otimes \ket{\phi}" /> can be
                represented as a <M t="4\times 1" /> column vector (4 rows, 1
                column). How would you represent <M t="(Z\otimes X)" />?
              </p>
            </Prose>
          }
          choices={[
            ["scalar", <p>scalar (constant) multiplier</p>],
            [
              "1x4", // note that the answer ID is opposite to the answer text. text is correct
              <>
                <M t="4 \times 1" /> column vector
              </>,
            ],
            [
              "4x1",
              <>
                <M t="1 \times 4" /> row vector
              </>,
            ],
            [
              "4x4",
              <>
                <M t="4 \times 4" /> matrix
              </>,
            ],
            [
              "2x2",
              <>
                <M t="2 \times 2" /> matrix
              </>,
            ],
          ]}
          // answer="4x4"
        />
      ),
    }),

    section({
      name: "twoOperatorsRule",
      enumerate: false,
      body: (
        <Prose>
          Given two operators, you can represent their tensor product by
          following this “rule”:
          <M
            display
            t="\pmatrix{\enspace a & b \enspace \\ \enspace c & d \enspace} \otimes \pmatrix{\enspace e & f \enspace \\ \enspace g & h \enspace} =
            \pmatrix{\; a \, \pmatrix{\enspace e & f \enspace \\ \enspace g & h \enspace} & b \, \pmatrix{\enspace e & f \enspace \\ \enspace g & h \enspace} \; \\ \; c \, \pmatrix{\enspace e & f \enspace \\ \enspace g & h \enspace} & d \, \pmatrix{\enspace e & f \enspace \\ \enspace g & h \enspace} \;}"
          />
          <M
            display
            t="= \pmatrix{\; ae & af & be & bf \; \\ \; ag & ah & bg & bf \; \\ \; ce & cf & de & df \; \\ \; cg & ch & dg & df \;}"
          />
        </Prose>
      ),
    }),

    section({
      name: "representZxXAs4x4Matrix",
      body: (m, { responses }) => (
        <>
          <Prose>
            <p>
              What is <M t="(Z\otimes X)" /> expressed as a <M t="4 \times 4" />{" "}
              matrix?
            </p>
          </Prose>

          <Matrix
            matrix={Matrix.modelToMatrix(m.representZxXAs4x4Matrix, (c) => (
              <TextLine model={c} placeholder={"Number"} />
            ))}
          />

          {/* <Answer
            correct={deepEqual(responses?.representZxXAs4x4Matrix, [
              ["0", "1", "0", "0"],
              ["1", "0", "0", "0"],
              ["0", "0", "0", "-1"],
              ["0", "0", "-1", "0"],
            ])}
          >
            <M
              display
              t="\pmatrix{\enspace 0 & 1 & 0 & 0 \enspace \\ \enspace 1 & 0 & 0
                 & 0 \enspace \\ \enspace 0 & 0 & 0 & -1 \enspace \\ \enspace 0 & 0 & -1 & 0 \enspace}"
            />
            Note that if you group this matrix into four 2x2 matrices, you can
            write it in a common shorthand:
            <M
              display
              t="\pmatrix{\enspace \pmatrix{\enspace 0 & 1 \enspace \\ \enspace 1 & 0 \enspace} &
              \pmatrix{\enspace 0 & 0 \enspace \\ \enspace 0 & 0 \enspace} \enspace \\[10px]
              \enspace\pmatrix{\enspace 0 & 0 \enspace \\ \enspace 0 & 0 \enspace} &
              \pmatrix{ 0 & -1  \\  -1 & 0 } \enspace}
              =
              \pmatrix{\enspace X & 0 \enspace \\ \enspace 0 & -X \enspace}"
            />
          </Answer> */}
        </>
      ),
      guidance: {
        nextMessage: () => "answer",
        messages: {
          answer: {
            body: ({ responses }) => (
              <Guidance.Dynamic
                status={
                  deepEqual(responses?.representZxXAs4x4Matrix, [
                    ["0", "1", "0", "0"],
                    ["1", "0", "0", "0"],
                    ["0", "0", "0", "-1"],
                    ["0", "0", "-1", "0"],
                  ])
                    ? "agree"
                    : "disagree"
                }
              >
                We found:
                <M
                  display
                  t="\pmatrix{\enspace 0 & 1 & 0 & 0 \enspace \\ \enspace 1 & 0 & 0
                 & 0 \enspace \\ \enspace 0 & 0 & 0 & -1 \enspace \\ \enspace 0 & 0 & -1 & 0 \enspace}"
                />
                Note that if you group this matrix into four 2x2 matrices, you
                can write it in a common shorthand:
                <M
                  display
                  t="\pmatrix{\enspace \pmatrix{\enspace 0 & 1 \enspace \\ \enspace 1 & 0 \enspace} &
              \pmatrix{\enspace 0 & 0 \enspace \\ \enspace 0 & 0 \enspace} \enspace \\[10px]
              \enspace\pmatrix{\enspace 0 & 0 \enspace \\ \enspace 0 & 0 \enspace} &
              \pmatrix{ 0 & -1  \\  -1 & 0 } \enspace}
              =
              \pmatrix{\enspace X & 0 \enspace \\ \enspace 0 & -X \enspace}"
                />
              </Guidance.Dynamic>
            ),
            onContinue: "nextSection",
          },
        },
      },
    }),

    section({
      name: "columnZ0xX1",
      body: (m, { responses }) => (
        <>
          <Prose>
            <p>
              Write the output state of the following circuit diagram as a
              4-component column vector.
            </p>

            <QuantumCircuit t="\lstick{\ket{0}} & \gate{Z} &   \qw \\ \lstick{\ket{1}} & \gate{X} & \qw \\" />

            <p>
              Please solve this two DIFFERENT ways (you should get the same
              answer):
            </p>

            <ol>
              <li>
                Use the diagram to determine the output of each qubit, then
                write the result as a column vector.
              </li>

              <li>
                Write <M t="Z\otimes X" /> as a <M t="4 \times 4" /> matrix
                (previous question!) and write the input state{" "}
                <M t="\ket{01}" />
                as a 4-D column vector, then matrix multiply.
              </li>
            </ol>

            <Matrix
              label={<M t="\text{Output state} = " />}
              column={Matrix.modelToColumn(m.columnZ0xX1, (c, i) => (
                <TextLine model={c} placeholder={`Component ${i + 1}`} />
              ))}
            />
          </Prose>

          <Answer
            correct={arraysEqual(responses?.columnZ0xX1, ["1", "0", "0", "0"])}
          >
            <M display t="\pmatrix{\enspace 1 \enspace \\ 0 \\ 0 \\ 0}" />
          </Answer>
        </>
      ),
      guidance: {
        nextMessage: (responses, state) => {
          if (!arraysEqual(responses?.columnZ0xX1, ["1", "0", "0", "0"])) {
            if (state.sections?.columnZ0xX1?.revealedMessages !== undefined) {
              return "hereYouGo";
            }
            return "tryAgain";
          } else if (
            state.sections?.columnZ0xX1?.revealedMessages !== undefined
          ) {
            return "nowCorrect";
          }
          return null;
        },
        messages: {
          tryAgain: {
            body: (
              <Callout color="red">
                It looks like we don't agree with your answer. If you only used
                one of the methods we suggested, try using the other now and see
                what happens. Or, check your work carefully.
              </Callout>
            ),
            onContinue: "nextMessage",
          },
          hereYouGo: {
            body: (
              <Callout color="red">
                We still disagree with your answer, but here's ours:{" "}
                <M
                  display
                  t="(Z\ket{0})\otimes(X\ket{1}) = \ket{0}\otimes\ket{0} = \ket{00} = \pmatrix{\enspace 1 \enspace \\ 0 \\ 0 \\ 0}"
                />
              </Callout>
            ),
            onContinue: "nextSection",
          },
          nowCorrect: {
            body: <Callout color="green">We agree with your answer.</Callout>,
            onContinue: "nextSection",
          },
        },
      },
    }),
    section({
      name: "circuitAsOperator",
      body: (m) => (
        <ChooseAll
          model={m.circuitAsOperator}
          label={
            <Prose>
              <p>
                Select ALL of the expressions which correctly match the diagram
                below.
              </p>

              <Horizontal justify="center">
                <div>
                  <QuantumCircuit t="& \gate{H} &  \gate{X} & \qw \\ & \gate{Z} & \qw & \qw \\" />
                </div>
                <div>
                  <M t="=" />
                </div>
                <div>
                  <QuantumCircuit t="& \multigate{1}{A} & \qw \\ & \ghost{A} & \qw \\" />
                </div>
              </Horizontal>
            </Prose>
          }
          choices={[
            ["HX ⊗ Z", <M t="A = HX \otimes Z" />],
            ["XH ⊗ Z", <M t="A = XH \otimes Z" />],
            ["HZ ⊗ X", <M t="A = HZ \otimes X" />],
            ["(H ⊗ Z)(X ⊗ I)", <M t="A = (H \otimes Z) (X \otimes I)" />],
            ["(X ⊗ I)(H ⊗ Z)", <M t="A = (X \otimes I) (H \otimes Z)" />],
            ["(H ⊗ X) Z", <M t="A = (H \otimes X) \ Z" />],
            ["X (H ⊗ Z)", <M t="A = X\  (H \otimes Z)" />],
          ]}
          // answer={["XH ⊗ Z", "(X ⊗ I)(H ⊗ Z)"]}
        />
      ),
      guidance: {
        nextMessage: () => "answer",
        messages: {
          answer: {
            body: ({ responses }) => (
              <Guidance.Dynamic
                status={
                  responses?.circuitAsOperator?.selected?.includes("XH ⊗ Z") &&
                  responses.circuitAsOperator.selected.includes(
                    "(X ⊗ I)(H ⊗ Z)",
                  ) &&
                  responses.circuitAsOperator.selected.length === 2
                    ? "agree"
                    : "disagree"
                }
              >
                Our answers are <M t="A = XH \otimes Z" /> and{" "}
                <M t="A = (X \otimes I) (H \otimes Z)" />. If you chose any
                others, you might want to check your work again. One way to do
                this is to figure out how A would apply to the two-qubit state{" "}
                <M t="\ket{\psi_1}\otimes\ket{\psi_2}" /> and see which options
                are consistent.
              </Guidance.Dynamic>
            ),
            onContinue: "nextSection",
          },
        },
      },
    }),
    section({
      name: "summaryTextBox",
      body: (m) => (
        <>
          <TextBox
            model={m.page5summaryTextBox}
            label={
              <Prose>
                Now that you’ve seen our answers, briefly comment on where they
                agree or disagree with yours, and why. Summarize what you feel
                like you’ve learned, and/or what you’re feeling confused about.
              </Prose>
            }
          ></TextBox>
        </>
      ),
      continue: {
        allowed: () => true,
      },
    }),
  ],
}));
