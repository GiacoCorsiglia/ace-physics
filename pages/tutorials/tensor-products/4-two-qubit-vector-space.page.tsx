import { Decimal, LabelsLeft, M, Matrix, Prose } from "@/components";
import { page } from "@/tutorial";
import setup from "./setup";

export default page(setup, ({ section }) => ({
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
          TODO ADD FEEDBACK SUGGESTION
        </>
      ),
    }),
    section({
      name: "fourDColumnVector",
      body: (m) => (
        <>
          <Prose>
            What is{" "}
            <M t="\frac{1}{\sqrt{2}}( \ket{0}+i\ket{1})\otimes \frac{1}{\sqrt{2}}( \ket{0}-\ket{1})" />
            written as a 4-dimensional column vector? TODO: MAKE INTO 4D VECTOR
            <Matrix
              column={Matrix.modelToColumn(
                m.fourDColumnVectorResult,
                (c, i) => (
                  <Decimal
                    model={c}
                    placeholder={i === 0 ? "Horizontal" : "Vertical"}
                  />
                )
              )}
            />
          </Prose>
        </>
      ),
    }),
    section({ name: "outputStatefourDColVector", body: (m) => <>TODO</> }),
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
