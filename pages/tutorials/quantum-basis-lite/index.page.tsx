import { Prose } from "@/components";
import { intro } from "@/tutorial";
import setup from "./setup";

export default intro(setup, () => ({
  body: <Prose>Vectors, components, and bases—oh my!</Prose>,
}));
