import {
  ChooseAll,
  Decimal,
  Horizontal,
  M,
  Prose,
  QuantumCircuit,
  TextLine,
} from "@/components";
import { posttest } from "@/tutorial";
import setup from "./setup";

export default posttest(setup, ({ section }) => ({
  sections: [
    section({
      body: (m) => (
        <Decimal
          model={m.probQubit1Is1}
          label={
            <Prose>
              Consider the 2-qubit state{" "}
              <M
                display
                t="\ket{\psi} = \frac{1}{3} \left(\sqrt{3} \ket{00} + 2 \ket{01} +i \sqrt{2} \ket{10}\right)"
              />
              Suppose the second qubit is measured to be a <M t="\ket{0}" />.
              Given that fact, what is the subsequent probability that qubit #1
              will then be measured to be a <M t="\ket{1}" />?
            </Prose>
          }
        />
      ),
    }),

    section({
      body: (m) => (
        <TextLine
          model={m.outputZxXZxH011}
          label={
            <Prose>
              Consider a 3-qubit state <M t="\ket{011}" />. What is the output
              of applying <M t="Z\otimes XZ \otimes H" />? to this state. In
              other words, what is
              <M t="Z\otimes XZ \otimes H \ket{011}" />?
            </Prose>
          }
        />
      ),
    }),

    section({
      body: (m) => (
        <ChooseAll
          model={m.equivalentOperatorToCircuitDiagram}
          label={
            <Prose>
              <p>
                Select ALL of the expressions which correctly match the diagram
                below.
              </p>

              <Horizontal justify="center">
                <div>
                  <QuantumCircuit t="& \gate{H} &  \qw & \qw \\ & \gate{Z} & \gate{X} & \qw \\" />
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
            ["H ⊗ XZ", <M t="A = H \otimes XZ" />],
            ["H ⊗ ZX", <M t="A = H \otimes ZX" />],
            ["HZ ⊗ X", <M t="A = HZ \otimes X" />],
            ["(H ⊗ Z)(I ⊗ X)", <M t="A = (H \otimes Z)(I \otimes X)" />],
            ["(I ⊗ X)(H ⊗ Z)", <M t="A = (I \otimes X)(H \otimes Z)" />],
            ["(H ⊗ X)(I ⊗ Z)", <M t="A = (H \otimes X)(I \otimes Z)" />],
            ["H(Z ⊗ X)", <M t="A = H(Z \otimes X)" />],
            ["(H ⊗ Z)X", <M t="A = (H \otimes Z)X" />],
          ]}
        />
      ),
    }),

    section({
      body: (m) => (
        <TextLine
          model={m.outputHxXZ00}
          label={
            <Prose>
              In the previous question, if the input state is <M t="\ket{00}" />
              , what is the output state?
            </Prose>
          }
        />
      ),
    }),
  ],
}));
