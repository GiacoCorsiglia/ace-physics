import { Prose } from "@/components";
import { intro } from "@/tutorial";
import setup from "./setup";

export default intro(setup, () => ({
  body: (
    <Prose>
      An introduction to the Controlled NOT (CNOT) gate and the related concept
      of entanglement.
    </Prose>
  ),
}));
