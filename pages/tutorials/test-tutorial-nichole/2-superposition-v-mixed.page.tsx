import {
  Answer,
  Callout,
  M,
  Prose,
  QuantumCircuit,
  TextBox,
} from "@/components";
import { page } from "@/tutorial";
import { PencilIcon } from "@primer/octicons-react";
import setup from "./setup";

export default page(setup, ({ section }) => ({
  name: "superpositionvmixed",
  label: "Superposition versus mixed states",
  answers: "provided",
  cheatSheet: {
    body: (
      <>
        <M display t="Z\ket{0} = \ket{0},\, Z\ket{1} = -\ket{1}" />
        <M display t="X\ket{0} = \ket{1},\, X\ket{1} = \ket{0}" />
      </>
    ),
  },
  sections: [
    section({
      name: "evaluatingCircuitsIntro",
      body: (
        <Prose>
          On this page we’ll evaluate the output of a couple circuits. In other
          words, we’ll calculate which state the circuit outputs given a
          specific input state.
        </Prose>
      ),
      continue: {
        label: "Let’s do it",
      },
    }),

    section({
      name: "outputZX1",
      body: (m) => (
        <TextBox
          model={m.outputZX1}
          label={
            <Prose>
              What is the output of the following circuit?
              <QuantumCircuit t="\lstick{\ket{1}} & \gate{X} & \gate{Z} & \qw" />
            </Prose>
          }
        />
        // TODO: Add follow-up question: what is the matrix representation of your answer
        // Two component column, options ±1, 0, ±1/sqrt{2}
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
                <QuantumCircuit t="\lstick{\ket{1}} & \gate{Z} & \gate{X} & \qw" />
              </Prose>
            }
          />
          {/* TODO: Multiple choice, ±|0>, ±|1> */}

          <Prose>
            Note: you should get a different output from the previous question,
            in this case merely a different phase. Order of operations often
            matters!
          </Prose>
          <Answer>
            <M display t="Z\ket{1} = -\ket{1}" />
            <M display t="X(-\ket{1}) = -X\ket{1} = -\ket{0}" />
            <p>
              Note that we get a negative sign because <M t="Z" /> acted on{" "}
              <M t="\ket{1}" />, not <M t="\ket{0}" />.
            </p>
          </Answer>
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
  ],
}));
