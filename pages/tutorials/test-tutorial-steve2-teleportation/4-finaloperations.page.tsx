import { Prose } from "@/components";
import { page } from "@/tutorial";

import setup from "./setup";

export default page(setup, ({ section, hint }) => ({
  name: "finaloperations",
  label: "Final Operations on Bob's state",
  answers: "checked-all",

  sections: [
    section({
      name: "finaloperationsIntro",
      body: <Prose>ZZZ to do</Prose>,
      continue: {
        label: "I’m ready to move on!",
      },
    }),
  ],
}));
