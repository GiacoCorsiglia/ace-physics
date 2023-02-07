import {
  Answer,
  Decimal,
  LabelsLeft,
  M,
  Matrix,
  Prose,
  QuantumCircuit,
  TextLine,
} from "@/components";
import { page } from "@/tutorial";
import setup from "./setup";

export default page(setup, ({ section, hint }) => ({
  name: "twoQubitVectorSpace",
  label: "The Two Qubit Vector Space",
  answers: "provided",
  sections: [
    section({
      name: "twoQubitVectorSpaceIntro",
      body: (
        <Prose>
          <h2>Two-qubit states</h2>

          <p>
            A two qubit system has four dimensions, because there are four
            linearly independent basis states: <M t="\ket{00}" />,
            <M t="\ket{10}" />, <M t="\ket{01}" />, <M t="\ket{11}" /> .
          </p>

          <p>
            We need to pick an order for the four basis vectors. Let's choose
            the “counting in binary” order. Remembering that, e.g.,{" "}
            <M t="\ket{01} = \ket{0}\otimes\ket{1}" />, our basis vectors for a
            2 qubit system are (in order):
          </p>

          <M
            display
            t="
            \ket{00} = \pmatrix{\enspace 1 \enspace \\ 0 \\ 0 \\ 0} \;\;
            \ket{01} = \pmatrix{\enspace 0 \enspace \\ 1 \\ 0 \\ 0} \;\;
            \ket{10} = \pmatrix{\enspace 0 \enspace \\ 0 \\ 1 \\ 0} \;\;
            \ket{11} = \pmatrix{\enspace 0 \enspace \\ 0 \\ 0 \\ 1} \;\;
            "
          />
        </Prose>
      ),
    }),
    section({
      name: "probMeasureTwoQubitState",
      body: (m, { responses }) => (
        <>
          <Prose>
            Consider the state
            <M
              display
              t="\ket{\psi} = \frac{1}{\sqrt{5}}\pmatrix{\quad 1 \quad \\ -1 \\ i \sqrt{2} \\ i}"
            />
            What is the probability of measuring this 2-qubit state to be
            <M t="\ket{10}" />?
          </Prose>

          <LabelsLeft>
            <Decimal
              model={m.probMeasureTwoQubitState}
              label={
                <>
                  Probability <M t="\ =" />
                </>
              }
            />
          </LabelsLeft>

          <Answer
            correct={
              responses?.probMeasureTwoQubitState === 0.4 ||
              responses?.probMeasureTwoQubitState === 40
            }
          >
            <M
              display
              t="\left|\frac{i\sqrt{2}}{\sqrt{5}} \right|^2 = \frac{2}{5} = 0.4"
            />
          </Answer>
        </>
      ),
    }),

    section({
      name: "basisPlacementVectorVisual",
      enumerate: false,
      body: (
        <Prose>
          <p>
            To help answer the previous question, we can remember the
            “placement” of each basis vector in the column vector:
          </p>
          <M
            display
            t="\ket{\psi} = \frac{1}{\sqrt{5}}\pmatrix{\quad 1 \quad \\ -1 \\ i \sqrt{2} \\ i} \begin{array}{c} \leftarrow \ket{00} \\ \leftarrow \ket{01} \\ \leftarrow \ket{10} \\ \leftarrow \ket{11} \end{array}"
          />
        </Prose>
      ),
    }),

    section({
      name: "twoVectorTensorProductRule",
      enumerate: false,
      body: (
        <Prose>
          <p>
            If given two vectors, e.g.{" "}
            <M t="\ket{\psi} = \pmatrix{\; a \; \\ b}" />
            and <M t="\ket{\phi} = \pmatrix{\; c \; \\ d}" />
            , you can find the tensor product of them like this:
            <M
              display
              t="\ket{\psi} \otimes\ket{\phi} = (a \ket{0}+b\ket{1})\otimes (c \ket{0}+d\ket{1})"
            />
            <M
              display
              t="= ac \ket{00}+ad\ket{01} + bc \ket{10} + bd\ket{11}"
            />
          </p>

          <p>(Please check for yourself that we got all 4 terms correct)</p>

          <p>
            This is equivalent to remembering the following “rule”:
            <M
              display
              t="\pmatrix{\; a \; \\ b}  \otimes \pmatrix{\; c \; \\ d} = \pmatrix{\; a \, \pmatrix{\; c \; \\ d} \; \\ b \, \pmatrix{\; c \; \\ d}} =  \pmatrix{\enspace ac \enspace \\ ad \\ bc \\ bd}"
            />
          </p>
        </Prose>
      ),
    }),

    section({
      name: "fourDColumnVector",
      body: (m) => (
        <>
          <Prose>
            <p>
              What is{" "}
              <M t="\frac{1}{\sqrt{2}}( \ket{0}+i\ket{1})\otimes \frac{1}{\sqrt{2}}( \ket{0}-\ket{1}) " />{" "}
              written as a 4-dimensional column vector?
            </p>

            <Matrix
              labelTex="\frac{1}{\sqrt{2}}( \ket{0}+i\ket{1})\otimes \frac{1}{\sqrt{2}}( \ket{0}-\ket{1})"
              column={Matrix.modelToColumn(m.fourDColumnVector, (c, i) => (
                <TextLine model={c} placeholder={`Component ${i + 1}`} />
              ))}
            />
          </Prose>

          <Answer>
            <M
              display
              t="\frac{1}{2}\pmatrix{\quad 1 \quad \\ -1 \\ i \\ -i}"
            />
          </Answer>
        </>
      ),
      hints: [
        hint({
          name: "diracNotation",
          label: "Are there any rules that can help?",
          body: (
            <Prose>
              <p>
                You can do this by using the rule above or expanding in Dirac
                notation and ordering the terms correctly. Can you do it both
                ways to check yourself?
              </p>
            </Prose>
          ),
        }),
      ],
    }),

    section({
      name: "circuitOutputAsColumnVector",
      body: (m) => (
        <>
          <Prose>
            <p>
              What is the output state of the following circuit, written as a
              4-dimensional column vector?
            </p>

            <QuantumCircuit t="\lstick{\ket{0}} & \gate{H} &   \qw \\ \lstick{\ket{1}} & \gate{X} & \qw \\" />

            <Matrix
              label={<M t="\text{Output state} = " />}
              column={Matrix.modelToColumn(
                m.circuitOutputAsColumnVector,
                (c, i) => (
                  <TextLine model={c} placeholder={`Component ${i + 1}`} />
                )
              )}
            />
          </Prose>

          <Answer>
            <M
              display
              t="\frac{1}{\sqrt{2}}\pmatrix{\quad 1 \quad \\ 0 \\ 1 \\ 0}"
            />
          </Answer>
        </>
      ),
    }),

    section({
      name: "probTwoQubitSystem",
      body: (m, { responses }) => (
        <>
          <Prose>
            For the output of the circuit above, what is the probability that
            the 2-qubit system will be measured to be <M t="\ket{01}" />?
          </Prose>

          <LabelsLeft>
            <Decimal
              model={m.probTwoQubitSystem}
              label={<Prose>Probability:</Prose>}
            />
          </LabelsLeft>

          <Answer correct={responses?.probTwoQubitSystem === 0}>
            Zero, the second entry vanishes. Check from the diagram second qubit
            is <M t="\ket{0}" />
          </Answer>
        </>
      ),
    }),
  ],
}));
