import { Prose } from "@/components";
import { page } from "@/tutorial";

import setup from "./setup";

export default page(setup, ({ section, hint }) => ({
  name: "partingquestions",
  label: "Some parting questions",
  answers: "checked-all",

  sections: [
    section({
      name: "partingquestionsIntro",
      body: <Prose>TO DO</Prose>,
      continue: {
        label: "I’m ready to move on!",
      },
    }),

    // Wrap up the page
    //
    //
    //
  ],
}));
