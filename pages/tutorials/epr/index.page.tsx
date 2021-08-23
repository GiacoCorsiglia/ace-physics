import { Prose } from "@/components";
import { intro } from "@/tutorial";
import setup from "./setup";

export default intro(setup, () => ({
  body: (
    <Prose>
      Investigate the uniquely <em>quantum</em> effect of entanglement, and
      apply it to cryptography. Maybe God does play dice with the universe after
      all…
    </Prose>
  ),
}));
