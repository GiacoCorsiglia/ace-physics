import { Prose } from "@/design";
import { page } from "@/tutorial";
import setup from "./setup";

export default page(setup, ({ section, sequence, hint }) => ({
  name: "expectation-values",
  label: "Intro to Expectation Values",
  sections: [
    section({
      name: "expValIntro",
      body: <Prose>TODO</Prose>,
    }),
  ],
}));
