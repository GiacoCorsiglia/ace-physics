import {
  ChooseOne,
  M,
  Prose,
  QuantumCircuit,
  TextBox,
  Toggle,
} from "@/components";
import { pretest } from "@/tutorial";
import setup from "./setup";

export default pretest(setup, ({ section }) => ({
  sections: [
    section({
      body: (m) => (
        <Prose>
          <p>
            Consider the circuit shown below. Assume the input 2-qubit state is{" "}
            <M t="\ket{11}" />.
          </p>
          <QuantumCircuit
            t="\lstick{\ket{1}} & \qw & \targ & \qw \\
               \lstick{\ket{1}} & \gate{H} & \ctrl{-1} & \qw }\"
          />
          <p>
            (Note that the CNOT gate is inverted compared to many of our
            previous examples - it is the 2nd qubit which is the control here)
          </p>
        </Prose>
      ),
    }),

    section({
      body: (m) => (
        <TextBox
          model={m.outputIHCNOT11}
          label={<Prose>What is the output state of the circuit above?</Prose>}
        />
      ),
    }),

    section({
      body: (m) => (
        <Toggle
          model={m.isOutputIHCNOT11Entangled}
          label={
            <p>Is the final output state in the previous part entangled?</p>
          }
          choices={[
            ["entangled", "Yes it is entangled"],
            ["not entangled", "No it is not entangled"],
          ]}
        />
      ),
    }),

    section({
      body: (m) => (
        <ChooseOne
          model={m.threeQubitOutputStateEntangled}
          label={
            <Prose>
              <p>
                Consider a 3-qubit state <M t="\ket{\psi}" /> which is{" "}
                <b>not</b> entangled.
              </p>

              <p>
                What is the output state after applying{" "}
                <M t="Z\otimes XZ \otimes H" /> to <M t=" \ket{\psi}" />?
              </p>
            </Prose>
          }
          choices={[
            ["entangled", "Entangled"],
            ["not entangled", "Not entangled"],
            [
              "it depends",
              <p>
                It depends on other details of the input state{" "}
                <M t="\ket{\psi}" /> (besides the given fact that it is
                initially not entangled)
              </p>,
            ],
          ]}
        />
      ),
    }),
  ],
}));
