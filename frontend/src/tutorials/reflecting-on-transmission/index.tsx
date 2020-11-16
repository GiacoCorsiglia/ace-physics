import React from "react";
import { ReflectingOnTransmission } from "src/common/tutorials";
import { Prose } from "src/components";
import * as urls from "src/urls";
import { tutorialRoute } from "../shared";
import Part1 from "./Part1";
import Part2 from "./Part2";
import Part3 from "./Part3";

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
      label: "Transmission for the Potential Well",
      path: "transmission-for-the-potential-well",
      element: <Part3 />,
    },
  ],
});
