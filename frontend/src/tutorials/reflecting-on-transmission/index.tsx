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
import Pretest from "./Pretest";

export const route = tutorialRoute({
  url: urls.Tutorials.ReflectingOnTransmission,
  name: "ReflectingOnTransmission",
  schema: ReflectingOnTransmission,
  label: "Reflecting on Transmission",
  intro: <Prose>Reflection & Transmission…</Prose>,
  parts: [
    {
      label: "Before You Start",
      path: "before-you-start",
      element: <Pretest />,
      labelSections: true,
    },
    {
      label: "Symmetric Potential Well",
      path: "symmetric-potential-well",
      element: <Part1 />,
      labelSections: true,
    },
    {
      label: "Transmission Coefficients",
      path: "transmission-coefficients",
      element: <Part2 />,
      labelSections: true,
    },
    {
      label: "Transmission for the Potential Well: Experiment",
      path: "transmission-for-the-potential-well-experiment",
      element: <Part3 />,
      labelSections: true,
    },
    {
      label: "Transmission for the Potential Well: Formula",
      path: "transmission-for-the-potential-well-formula",
      element: <Part4 />,
      labelSections: true,
    },
    {
      label: "Summary",
      path: "summary",
      element: <Part5 />,
      labelSections: true,
    },
  ],
});
