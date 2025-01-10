import { Prose } from "@/components";
import { intro } from "@/tutorial";
import setup from "./setup";

export default intro(setup, () => ({
  body: <Prose>Your first step in learning about Giaco's computing.</Prose>,
}));
