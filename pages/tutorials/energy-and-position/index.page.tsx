import { Prose } from "@/components";
import { intro } from "@/tutorial";
import setup from "./setup";

export default intro(setup, () => ({
  body: (
    <Prose>
      Explore the connection between the energy and position representations of
      a quantum state.
    </Prose>
  ),
}));
