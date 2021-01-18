import { Prose } from "@/design";
import { intro } from "@/tutorial";
import setup from "./setup";

export default intro(setup, () => ({
  body: (
    <Prose>
      The quantum mouse lab is all about measurement, eigenvalues, and
      eigenstates. But with a fun twist!
    </Prose>
  ),
}));
