import { Prose } from "@/design";
import { intro } from "@/tutorial";
import setup from "./setup";

export default intro(setup, () => ({
  body: (
    <Prose>
      Investigate the phenomenon of “spin,” which is fundamentally quantum
      mechanical in nature.
    </Prose>
  ),
}));
