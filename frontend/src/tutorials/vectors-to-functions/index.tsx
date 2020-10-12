import React from "react";
import { VectorsToFunctions } from "src/common/tutorials";
import { Prose } from "src/components";
import * as urls from "src/urls";
import { tutorialRoute } from "../shared";
import Spin4 from "./Spin4";

export const route = tutorialRoute({
  url: urls.Tutorials.VectorsToFunctions,
  name: "VectorsToFunctions",
  schema: VectorsToFunctions,
  label: "Vectors to Functions",
  intro: <Prose>Vectors to functions…</Prose>,
  parts: [
    {
      label: "A Spin-4 Particle",
      path: "spin-4",
      element: <Spin4 />,
    },
  ],
});
