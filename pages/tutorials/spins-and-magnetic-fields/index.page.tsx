import { Prose } from "@/components";
import { intro } from "@/tutorial";
import setup from "./setup";

export default intro(setup, () => ({
  body: (
    <Prose>
      What happens when a spin-½ particle passes through a region with a
      magnetic field?
    </Prose>
  ),
}));
