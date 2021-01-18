import { Prose } from "@/design";
import { page } from "@/tutorial";
import setup from "./setup";

export default page(setup, ({ section, sequence, hint }) => ({
  name: "challenge",
  label: "Challenge",
  sections: [
    section({
      name: "challengeIntro",
      body: <Prose>TODO</Prose>,
    }),
  ],
}));
