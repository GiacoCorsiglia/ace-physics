import {
  ChooseAll,
  ChooseOne,
  Decimal,
  Guidance,
  Horizontal,
  M,
  Matrix,
  Prose,
  QuantumCircuit,
} from "@/components";
import { page } from "@/tutorial";
import setup from "./setup";

export default page(setup, ({ section }) => ({
  name: "twoQubitOperators",
  label: "Two Qubit Operators",
  answers: "none",
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
      name: "representZOTimesX",
      body: (m) => (
        <ChooseOne
          model={m.representZOTimesX}
          label={
            <Prose>
              <p>
                We know that <M t="\ket{\psi} \otimes \ket{\phi}" /> can be
                represented as a <M t="1\times 4" /> column vector. How would
                you represent <M t="(Z\otimes X)" />?
              </p>
            </Prose>
          }
          choices={[
            ["scalar", <p>scalar (constant) multiplier</p>],
            [
              "1x4",
              <p>
                <M t="1 \times 4" /> column vector
              </p>,
            ],
            [
              "4x1",
              <p>
                <M t="4 \times 1" /> row vector
              </p>,
            ],
            [
              "4x4",
              <p>
                <M t="4 \times 4" /> matrix
              </p>,
            ],
            [
              "2x2",
              <p>
                <M t="2 \times 2" /> matrix
              </p>,
            ],
          ]}
        />
      ),
    }),
    section({
      name: "twoOperatorsRule",
      enumerate: false,
      body: (
        <Guidance.HeadsUp>
          <p>
            Given two operators, you can represent their tensor product by
            following this "rule":
          </p>
          <M
            display
            t="\left(\begin{array}{cc} a & b \\ c & d \end{array}\right)  \otimes \left(\begin{array}{cc} e & f\\ g & h \end{array}\right) =
\left(\begin{array}{cc} a\left(\begin{array}{cc} e & f\\ g & h \end{array}\right) & b\left(\begin{array}{cc} e & f\\ g & h \end{array}\right) \\ c \left(\begin{array}{cc} e & f\\ g & h \end{array}\right)& d \left(\begin{array}{cc} e & f\\ g & h \end{array}\right)\end{array}\right)"
          />
          <M
            display
            t="= \left(\begin{array}{cccc} ae & af & be & bf \\ ag & ah & bg & bf \\ ce & cf & de& df \\ cg & ch & dg& df \end{array}\right)"
          />
        </Guidance.HeadsUp>
      ),
    }),
    section({
      name: "representAs4x4Matrix",
      body: (m) => (
        <Prose>
          <p>
            What is <M t="(Z\otimes X)" /> expressed as a <M t="4 \times 4" />{" "}
            matrix?
          </p>
          <Matrix
            matrix={Matrix.modelToMatrix(m.representAs4x4Matrix, (c) => (
              <Decimal model={c} />
            ))}
          />
        </Prose>
      ),
    }),
    section({
      name: "writeInTwoDifferentWays",
      body: (m) => (
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
              Use the diagram to determine the output of each qubit, then write
              the result as a column vector.
            </li>
            <li>
              Write <M t="Z\otimes X" /> as a <M t="4 \times 4" /> matrix
              (previous question!) and write the input state <M t="\ket{01}" />
              as a 4-D column vector, then matrix multiply.
            </li>
          </ol>
          <Matrix
            matrix={Matrix.modelToMatrix(
              m.writeInTwoDifferentWaysMatrix,
              (c) => (
                <Decimal model={c} />
              )
            )}
          />
        </Prose>
      ),
    }),
    section({
      name: "expressionMatchDiagram",
      body: (m) => (
        <ChooseAll
          model={m.expressionMatchDiagram}
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
        />
      ),
    }),
  ],
}));
