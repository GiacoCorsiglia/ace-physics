import {
  ChooseOne,
  M,
  Prose,
  QuantumCircuit,
  TextBox,
  Toggle,
} from "@/components";
import { posttest } from "@/tutorial";
import setup from "./setup";

export default posttest(setup, ({ section }) => ({
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
          <TextBox
            model={m.twoQubitOutputState}
            label={<p>i) What is the output state?</p>}
          />

          <Toggle
            model={m.isFinalOutputStateEntangled}
            label={
              <p>
                ii) Is the final output state in the previous part entangled?
              </p>
            }
            choices={[
              ["yes", "Yes it is entangled"],
              ["no", "No it is not entangled"],
            ]}
          />
        </Prose>
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
                Is the output state after applying{" "}
                <M t="Z\otimes XZ \otimes H to \ket{\psi}" /> ... (choose one)
              </p>
            </Prose>
          }
          choices={[
            ["entangled", "entangled"],
            ["not entangled", "not entangled?"],
            [
              "it depends",
              <p>
                {" "}
                It still depends on other details of the input state{" "}
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
