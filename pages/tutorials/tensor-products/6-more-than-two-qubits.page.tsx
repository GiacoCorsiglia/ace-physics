import {
  Answer,
  Callout,
  Integer,
  LabelsLeft,
  M,
  Prose,
  QuantumCircuit,
  TextLine,
} from "@/components";
import { page } from "@/tutorial";
import { PencilIcon } from "@primer/octicons-react";
import setup from "./setup";

export default page(setup, ({ section }) => ({
  name: "moreThanTwoQubits",
  label: "More Than 2 Qubits",
  answers: "provided",
  sections: [
    section({
      name: "moreThanTwoQubitsIntro",
      body: (
        <Prose>
          <p>
            Reminder: A 2-qubit system has four dimensions, because there are
            four linearly independent basis states: <M t="\ket{00}" />,{" "}
            <M t="\ket{01}" />, <M t="\ket{10}" />, <M t="\ket{11}" />.
          </p>

          <p>How about a system with 3 qubits?</p>
        </Prose>
      ),
      continue: {
        label: "Let’s explore",
      },
    }),

    section({
      name: "dimension3QubitSpace",
      body: (m, { responses }) => (
        <>
          <Prose>What would be the dimension of a 3-qubit space?</Prose>

          <LabelsLeft>
            <Integer model={m.dimension3QubitSpace} label="Dimension:" />
          </LabelsLeft>

          <Prose>
            Another way to ask this question is to ask how many basis vectors
            are needed to write an arbitrary 3-qubit state.
          </Prose>

          <Answer correct={responses?.dimension3QubitSpace === 8}>
            <M t="2^3 = 8" />
          </Answer>
        </>
      ),
    }),

    section({
      name: "dimensionNQubitSpace",
      body: (m) => (
        <>
          <Prose>
            What is the dimension of a system of <M t="N" /> qubits?
          </Prose>

          <LabelsLeft>
            <TextLine model={m.dimensionNQubitSpace} label="Dimension:" />
          </LabelsLeft>

          <Prose>
            Hint: You’ll need to express this as an equation in terms of{" "}
            <M t="N" />.
          </Prose>

          <Answer>
            <M t="2^N" />
          </Answer>
        </>
      ),
    }),

    section({
      name: "outputZxXZxI000",
      body: (m) => (
        <>
          <Prose>
            Consider a circuit with 3 qubits all starting in the{" "}
            <M t="\ket{0}" /> state. We can write the initial 3-qubit state as{" "}
            <M t="\ket{000}" />.
          </Prose>

          <TextLine
            model={m.outputZxXZxI000}
            label={
              <Prose>
                What is the outcome of applying <M t="Z \otimes XZ \otimes I" />{" "}
                on this state?
              </Prose>
            }
          />

          <Callout color="blue" iconLeft={<PencilIcon />}>
            Draw the circuit diagram for this scenario on scrap paper.
          </Callout>

          <Answer>
            <p>The circuit diagram looks like:</p>

            <QuantumCircuit
              t="
              \lstick{\ket{0}} & \gate{Z} & \qw \\
              \lstick{\ket{0}} & \gate{Z} & \gate{X} \\
              \lstick{\ket{0}} & \gate{I} & \qw \\
              "
            />

            <p>
              And the output state is <M t="\ket{010}" />, or equivalently
              <M t="\ket{0} \otimes \ket{1} \otimes \ket{0}" />.
            </p>
          </Answer>
        </>
      ),
      continue: {
        label: "I drew the circuit diagram",
      },
    }),

    section({
      name: "nQubitExample",
      body: (m) => (
        <Prose>
          <p>
            Consider a different example with <M t="n" /> qubits where all
            qubits are initialized to the <M t="\ket{0}" /> state and the first
            gate applied on all qubits is a Hadamard. In Dirac notation this
            would be written,
            <M
              display
              t="H \otimes H \otimes H \otimes \ldots \otimes H \ket{000\ldots 0}"
            />
          </p>

          <p>
            A natural shorthand is: <M t="H^{\otimes n} \ket{0}^{\otimes n} " />
            and the circuit can also be simplified by drawing below. Note that
            the single wire is now representing <M t="n" /> wires (indicated by
            the slash).
          </p>

          <QuantumCircuit t="\lstick{\ket{0}^{\otimes n}} & / & \gate{H^{\otimes n}} &   \qw" />
        </Prose>
      ),
    }),

    section({
      name: "nQubitProbAll0",
      body: (m) => (
        <>
          <TextLine
            model={m.nQubitProbAll0}
            label={
              <Prose>
                At the end of the above <M t="n" />
                -qubit circuit, what is the probability that you will measure{" "}
                <strong>all</strong> <M t="n" /> qubits to be <M t="\ket{0}" />?
              </Prose>
            }
          />

          <Answer>
            <M display t="\left(\frac{1}{2}\right)^n" />
          </Answer>
        </>
      ),
    }),

    section({
      name: "nQubitProbFirst0",
      body: (m) => (
        <>
          <TextLine
            model={m.nQubitProbFirst0}
            label={
              <Prose>
                If you were instead to measure only the first qubit, what is the
                probability it will result in <M t="\ket{0}" />?
              </Prose>
            }
          />

          <Answer>50%</Answer>
        </>
      ),
    }),
  ],
}));
