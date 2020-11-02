import React from "react";
import { VectorsToFunctions } from "src/common/tutorials";
import { Prose } from "src/components";
import * as urls from "src/urls";
import { tutorialRoute } from "../shared";
import Position from "./Position";
import Spin4 from "./Spin4";

export const route = tutorialRoute({
  url: urls.Tutorials.VectorsToFunctions,
  name: "VectorsToFunctions",
  schema: VectorsToFunctions,
  label: "Vectors to Functions",
  intro: (
    <Prose>
      Bridging between discrete vectors (such as those describing a particle’s
      spin state) and continuous wave functions (which might model a particle’s
      position state).
    </Prose>
  ),
  parts: [
    {
      label: "A Spin-4 Particle",
      path: "spin-4",
      element: <Spin4 />,
    },
    {
      label: "A Continuous Variable",
      path: "position",
      element: <Position />,
    },
  ],
});
