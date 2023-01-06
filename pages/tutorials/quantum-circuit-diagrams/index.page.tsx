import { Prose } from "@/components";
import { intro } from "@/tutorial";
import setup from "./setup";

export default intro(setup, () => ({
  body: (
    <Prose>
      Practice with single-qubit gates represented as circuit diagrams.
    </Prose>
  ),
}));
