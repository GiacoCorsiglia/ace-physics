import {
  Decimal,
  Guidance,
  LabelsLeft,
  M,
  Matrix,
  Prose,
  QuantumCircuit,
} from "@/components";
import { page } from "@/tutorial";
import setup from "./setup";

export default page(setup, ({ section, hint }) => ({
  name: "twoQubitVectorSpace",
  label: "The Two Qubit Vector Space",
  answers: "none",
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
            the "counting in binary" order. Remembering that, e.g.,{" "}
            <M t="\ket{01} = \ket{0}\otimes\ket{1}" />, our basis vectors for a
            2 qubit system are (in order):
          </p>
          <M
            display
            t="
            \ket{00} = \left( \begin{array}{c}1 \\ 0 \\ 0 \\ 0 \end{array} \right) \;\;
            \ket{01} = \left( \begin{array}{c}0 \\ 1 \\ 0 \\ 0 \end{array} \right) \;\;
            \ket{10} = \left( \begin{array}{c}0 \\ 0 \\ 1 \\ 0 \end{array} \right) \;\;
            \ket{11} = \left( \begin{array}{c}0 \\ 0 \\ 0 \\ 1 \end{array} \right)
            "
          />
        </Prose>
      ),
    }),
    section({
      name: "probMeasureTwoQubitState",
      body: (m) => (
        <>
          <Prose>
            If you have a state{" "}
            <M t="\ket{\psi} = \frac{1}{\sqrt{5}}\left( \begin{array}{c}1  \\ -1 \\ i \sqrt{2} \\ i\end{array} \right)" />
            , what is the probability of measuring the 2-qubit state to be{" "}
            <M t="\ket{10}" />?
          </Prose>
          <LabelsLeft>
            <Decimal
              model={m.probMeasureTwoQubitState}
              label={<Prose>Probability:</Prose>}
            />
          </LabelsLeft>
        </>
      ),
    }),
    section({
      name: "basisPlacementVectorVisual",
      body: (
        <Prose>
          <p>
            To help answer the previous question, we can remember the
            'placement' of each basis vector in the column vector:
          </p>
          <M
            display
            t="\ket{\psi} = \frac{1}{\sqrt{5}}\left( \begin{array}{c}1  \\ -1 \\ i\sqrt{2} \\ i\end{array} \right) \begin{array}{c} \leftarrow \ket{00} \\ \leftarrow \ket{01} \\ \leftarrow \ket{10} \\ \leftarrow \ket{11} \end{array}"
          />
        </Prose>
      ),
    }),
    section({
      name: "twoVectorTensorProductRule",
      enumerate: false,
      body: (
        <Guidance.HeadsUp>
          <p>
            If given two vectors, e.g.{" "}
            <M t="\ket{\psi} = \left(\begin{array}{c}a  \\ b\end{array}\right)" />
            and{" "}
            <M t="\ket{\phi} = \left(\begin{array}{c} c  \\ d\end{array}\right)" />
            , you can find the tensor product of them like this:
          </p>
          <M
            display
            t="\ket{\psi} \otimes\ket{\phi} = (a \ket{0}+b\ket{1})\otimes (c \ket{0}+d\ket{1})"
          />
          <M display t="= ac \ket{00}+ad\ket{01} + bc \ket{10} + bd\ket{11}" />
          <p>(Please check for yourself that we got all 4 terms correct)</p>
          <p>This is equivalent to remembering the following "rule":</p>
          <M
            display
            t="\left(\begin{array}{c} a \\ b \end{array}\right)  \otimes \left(\begin{array}{c} c \\ d \end{array}\right) = \left(\begin{array}{c} a \left(\begin{array}{c} c \\ d \end{array}\right) \\ b \left(\begin{array}{c} c \\ d \end{array}\right) \end{array}\right) =  \left( \begin{array}{c}ac   \\ ad  \\ bc \\ bd \end{array} \right)"
          />
        </Guidance.HeadsUp>
      ),
    }),
    section({
      name: "fourDColumnVector",
      body: (m) => (
        <Prose>
          <p>
            What is{" "}
            <M t="\frac{1}{\sqrt{2}}( \ket{0}+i\ket{1})\otimes \frac{1}{\sqrt{2}}( \ket{0}-\ket{1}) " />{" "}
            written as a 4-dimensional column vector?
          </p>
          <Matrix
            labelTex="\frac{1}{\sqrt{2}}( \ket{0}+i\ket{1})\otimes \frac{1}{\sqrt{2}}( \ket{0}-\ket{1}) ="
            column={Matrix.modelToColumn(m.fourDColumnVector, (c, i) => (
              <>
                <Decimal model={c} placeholder={`x${i + 1}`} />
              </>
            ))}
          />
        </Prose>
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
      name: "outputStatefourDColVector",
      body: (m) => (
        <Prose>
          <p>
            What is the output state of the following circuit, written as a
            4-dimensional column vector?
          </p>
          <QuantumCircuit t="\lstick{\ket{0}} & \gate{H} &   \qw \\ \lstick{\ket{1}} & \gate{X} & \qw \\" />
          <Matrix
            column={Matrix.modelToColumn(
              m.outputStatefourDColVector,
              (c, i) => (
                <>
                  <Decimal model={c} placeholder={`x${i + 1}`} />
                </>
              )
            )}
          />
        </Prose>
      ),
    }),
    section({
      name: "probTwoQubitSystem",
      body: (m) => (
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
        </>
      ),
    }),
  ],
}));
