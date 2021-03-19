import { Prose } from "@/design";
import { intro } from "@/tutorial";
import setup from "./setup";

export default intro(setup, () => ({
  body: (
    <Prose>
      Visualize the time evolution of position space wave functions.
    </Prose>
  ),
}));
