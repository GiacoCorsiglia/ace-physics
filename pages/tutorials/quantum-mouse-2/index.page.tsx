import { Prose } from "@/design";
import { intro } from "@/tutorial";
import setup from "./setup";

export default intro(setup, () => ({
  body: (
    <Prose>Explore eigenvalues, eigenstates, operators, and measurement.</Prose>
  ),
}));
