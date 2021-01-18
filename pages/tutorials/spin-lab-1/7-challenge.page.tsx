import { Prose } from "@/design";
import { page } from "@/tutorial";
import React from "react";
import setup from "./setup";

export default page(setup, ({ section }) => ({
  name: "challenge",
  label: "Challenge",
  sections: [
    section({
      name: "challengeIntro",
      body: (
        <>
          <Prose>TODO</Prose>
        </>
      ),
    }),
  ],
}));
