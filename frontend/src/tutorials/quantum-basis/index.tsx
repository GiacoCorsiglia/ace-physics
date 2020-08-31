import React from "react";
import { QuantumBasis } from "src/common/tutorials";
import { Prose } from "src/components";
import * as urls from "src/urls";
import { tutorialRoute } from "../shared";
import ChangingBasis from "./ChangingBasis";
import DefiningBasis from "./DefiningBasis";

export const route = tutorialRoute({
  url: urls.Tutorials.QuantumBasis,
  name: "QuantumBasis",
  schema: QuantumBasis,
  label: "Visualizing a Vector in a Different Basis",
  intro: <Prose>Vectors, components, and bases—oh my!</Prose>,
  parts: [
    {
      label: "Defining a Basis",
      path: "defining-basis",
      element: <DefiningBasis />,
    },
    {
      label: "Changing Basis",
      path: "changing-basis",
      element: <ChangingBasis />,
    },
  ],
});
