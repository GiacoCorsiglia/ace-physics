import { M, Prose, TextBox } from "@/components";
import { page } from "@/tutorial";
import setup from "./setup";

export default page(setup, ({ section }) => ({
  name: "addingASecondQubit",
  label: "Adding a Second Qubit",
  answers: "none",
  sections: [
    section({
      name: "addingASecondQubitIntro",
      body: (
        <Prose>
          <p>
            In a circuit diagram, a qubit is represented as a single horizontal
            line (or wire). E.g.,
            <M display t="TODO" />
            represents a qubit in the
            <M t="\ket{1}" /> state.
          </p>
        </Prose>
      ),
    }),
    section({
      name: "write2QubitState",
      body: (m) => (
        <TextBox
          model={m.write2QubitState}
          label={
            <Prose>
              Given the circuit diagram
              <M display t="TODO" />
              How would you write the 2-qubit state?
            </Prose>
          }
        />
      ),
    }),
  ],
}));
