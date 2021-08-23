import { Prose } from "@/components";
import { intro } from "@/tutorial";
import setup from "./setup";

export default intro(setup, () => ({
  body: (
    <Prose>
      In this lab, we’ll investigate the phenomenon of “spin,” which is
      fundamentally quantum mechanical in nature.
    </Prose>
  ),
}));
