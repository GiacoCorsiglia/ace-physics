import { Prose } from "@/components";
import { intro } from "@/tutorial";
import setup from "./setup";

export default intro(setup, () => ({
  body: (
    <Prose>
      Use the tensor product operation to describe systems with multiple qubits
      mathematically.
    </Prose>
  ),
}));
