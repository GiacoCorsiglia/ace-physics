import {
  Answer,
  Callout,
  Guidance,
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

export default page(setup, ({ section, hint }) => ({
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
    //question A
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
       hints: [
        hint({
          name: "basis",
          label: "Hint",
          body: (
            <Prose>
              Reminder, for a 2-qubit space, the basis states are <M t="\ket{00}" />,
              <M t="\ket{01}" />, <M t="\ket{10}" />, and <M t="\ket{11}" />. That
              makes it a 4-dimensional space. What if you add another qubit? Can you list
              out the basis states (then count them).
            </Prose>
          ),
        }),
      ],
      guidance: {
        nextMessage: () => "basisStates",
        messages: {
          basisStates: {
            body: ({ responses }) => (
              <Guidance.Dynamic
                status={
                  responses?.dimension3QubitSpace === 8 ? "agree" : "disagree"
                }
              >
                Here we list out all the basis states:{" "}
                <M
                  display
                  t="\ket{000},\ket{001},\ket{010},\ket{011},\ket{100},\ket{101},\ket{110},\ket{111}"
                />
                There are 8 basis states, making this an 8-dimensional space.
              </Guidance.Dynamic>
            ),
            onContinue: "nextSection",
          },
        },
      },
    }),
    //question B
    section({
      name: "dimensionNQubitSpace",
      body: (m) => (
        <>
          <Prose>
            Can you generalize your answers above to find the dimension of a system
            of <M t="N" /> qubits?
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
    //question C
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
        label: "Move On",
      },

      hints: [
        hint({
          name: "ZxXZxI000",
          body: (
            <>
              <p>The circuit diagram looks like:</p>

              <QuantumCircuit
                t="
              \lstick{\ket{0}} & \gate{Z} & \qw \\
              \lstick{\ket{0}} & \gate{Z} & \gate{X} \\
              \lstick{\ket{0}} & \gate{I} & \qw \\
              "
              />
            Remember that our convention is that the left-most qubit is represented
            by the top qubit in the circuit diagram.
            </>
          ),
          label: "Show me the circuit diagram",
        }),
      ],
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
      ), ///////////////////////////////////////////////
       hints: [
        hint({
          name: "qubitSystem",
          label: "Hint",
          body: (
            <Prose>
             Suppose we had a 2-qubit system. <br/>
              <center><M t="H \otimes H \ket{00} \breakIfNarrow{=} "/>
              <M t= "\frac{1}{\sqrt{2}}(\ket{0}+\ket{1})\otimes\frac{1}{\sqrt{2}}(\ket{0}+\ket{1})\breakIfNarrow{=}" />
              <M t= "\frac{1}{2} ({\ket{00}+\ket{01}+\ket{10}+\ket{11}})"/></center>
             <br/> (Convince yourself of that!) So the
             probability of getting all zeros is 1/4. How would this look for 3
             qubits? n qubits?
            </Prose>
          ),
        }),
      ],
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
       hints: [
        hint({
          name: "topHint",
          label: "Hint",
          body: (
            <Prose>
             We are only looking at the top qubit here. Since the first qubit isn't
             entangled, it is in the state <M t=" H\ket{0}" />. What is the
             probability of measuring a 0 on this first qubit?
            </Prose>
          ),
        }),
      ],
    }),
  ],
}));
