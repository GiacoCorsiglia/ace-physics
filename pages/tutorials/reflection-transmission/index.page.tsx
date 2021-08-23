import { Prose } from "@/components";
import { intro } from "@/tutorial";
import setup from "./setup";

export default intro(setup, () => ({
  body: (
    <Prose>
      Explore the phenomena of reflection and transmission from 1D potential
      barriers.
    </Prose>
  ),
}));
