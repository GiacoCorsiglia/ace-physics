import React from "react";
import { QuantumBasis } from "src/common/tutorials";
import { Prose } from "src/components";
import * as urls from "src/urls";
import { tutorialRoute } from "../shared";
import ChangingBasis from "./ChangingBasis";
import DefiningBasis from "./DefiningBasis";
import Pretest from "./Pretest";
import ProbabilityProjection from "./ProbabilityProjection";
import RelatingDifferentBases from "./RelatingDifferentBases";

export const route = tutorialRoute({
  url: urls.Tutorials.QuantumBasis,
  name: "QuantumBasis",
  schema: QuantumBasis,
  label: "Visualizing a Vector in a Different Basis",
  intro: <Prose>Vectors, components, and bases—oh my!</Prose>,
  parts: [
    {
      label: "Before you Start",
      path: "before-you-start",
      element: <Pretest />,
    },
    {
      label: "Probability and Projection",
      path: "probability-and-projection",
      element: <ProbabilityProjection />,
    },
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
    {
      label: "Relating Different Bases",
      path: "relating-different-bases",
      element: <RelatingDifferentBases />,
    },
  ],
});
