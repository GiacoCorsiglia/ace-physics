import { Prose } from "@/components";
import { intro } from "@/tutorial";
import setup from "./setup";

export default intro(setup, () => ({
  body: (
    <Prose>
      Using quantum mechanics to encode information in a secret key, and to
      discover an eavesdropper on your communications.
    </Prose>
  ),
}));
