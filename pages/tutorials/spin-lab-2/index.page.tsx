import { Prose } from "@/design";
import { intro } from "@/tutorial";
import setup from "./setup";

export default intro(setup, () => ({
  body: (
    <Prose>
      In this lab, we’ll continue exploring the phenomenon of “spin,” and
      practice with Dirac notation (also called “bra-ket” notation or “bracket”
      notation).
    </Prose>
  ),
}));
