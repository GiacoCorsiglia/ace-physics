import { Prose } from "@/design";
import { intro } from "@/tutorial";
import setup from "./setup";

export default intro(setup, () => ({
  body: (
    <Prose>
      Bridging between discrete vectors (such as those describing a particle’s
      spin state) and continuous wave functions (which might model a particle’s
      position state).
    </Prose>
  ),
}));
