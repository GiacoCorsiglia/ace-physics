import React from "react";
import { ReflectingOnTransmission } from "src/common/tutorials";
import { Prose } from "src/components";
import * as urls from "src/urls";
import { tutorialRoute } from "../shared";
import Part1 from "./Part1";
import Part2 from "./Part2";
import Part3 from "./Part3";
import Part4 from "./Part4";
import Part5 from "./Part5";

export const route = tutorialRoute({
  url: urls.Tutorials.ReflectingOnTransmission,
  name: "ReflectingOnTransmission",
  schema: ReflectingOnTransmission,
  label: "Reflecting on Transmission",
  intro: <Prose>Reflection & Transmission…</Prose>,
  parts: [
    {
      label: "Symmetric Potential Well",
      path: "symmetric-potential-well",
      element: <Part1 />,
    },
    {
      label: "Transmission Coefficients",
      path: "transmission-coefficients",
      element: <Part2 />,
    },
    {
      label: "Transmission for the Potential Well: Experiment",
      path: "transmission-for-the-potential-well-experiment",
      element: <Part3 />,
    },
    {
      label: "Transmission for the Potential Well: Formula",
      path: "transmission-for-the-potential-well-formula",
      element: <Part4 />,
    },
    {
      label: "Summary",
      path: "summary",
      element: <Part5 />,
    },
  ],
});
