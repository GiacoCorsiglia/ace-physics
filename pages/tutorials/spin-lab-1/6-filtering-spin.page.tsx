import { Prose } from "@/design";
import { page } from "@/tutorial";
import React from "react";
import setup from "./setup";

export default page(setup, ({ section }) => ({
  name: "filteringSpin",
  label: "Filtering Spin",
  sections: [
    section({
      name: "filteringSpinIntro",
      body: (
        <>
          <Prose>TODO</Prose>
        </>
      ),
    }),
  ],
}));
