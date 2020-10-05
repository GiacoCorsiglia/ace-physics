import React from "react";
import { QuantumMouse } from "src/common/tutorials";
import { Prose } from "src/components";
import * as urls from "src/urls";
import { tutorialRoute } from "../shared";
import Challenge from "./Challenge";
import IntroToExpectationValue from "./IntroToExpectationValue";
import MatrixRepresentation from "./MatrixRepresentation";
import MeasuringEyeSize from "./MeasuringEyeSize";
import MoreMeasurements from "./MoreMeasurements";
import Pretest from "./Pretest";
import QuantumMood from "./QuantumMood";
import Superpositions from "./Superpositions";
import WhatIsAQuantumMouse from "./WhatIsAQuantumMouse";

export const route = tutorialRoute({
  url: urls.Tutorials.QuantumMouse,
  name: "QuantumMouse",
  schema: QuantumMouse,
  label: "Quantum Mouse Lab",
  intro: (
    <Prose>
      The quantum mouse lab is all about measurement, eigenvalues, and
      eigenstates. But with a fun twist!
    </Prose>
  ),
  parts: [
    {
      path: "before-you-start",
      label: "Before You start",
      element: <Pretest />,
    },
    {
      path: "what-is-a-quantum-mouse",
      label: "What is a Quantum Mouse?",
      element: <WhatIsAQuantumMouse />,
    },
    {
      path: "quantum-mood",
      label: "Moody Mice",
      element: <QuantumMood />,
    },
    {
      path: "superpositions",
      label: "Superpositions",
      element: <Superpositions />,
    },
    {
      path: "measuring-eye-size",
      label: "Measurements",
      element: <MeasuringEyeSize />,
    },
    {
      path: "more-measurements",
      label: "More Measurements",
      element: <MoreMeasurements />,
    },
    {
      path: "matrix-representations",
      label: "Matrix Representation",
      element: <MatrixRepresentation />,
    },
    {
      path: "intro-to-expectation-value",
      label: "Expectation Values",
      element: <IntroToExpectationValue />,
    },
    {
      path: "challenge",
      label: "Challenge",
      element: <Challenge />,
    },
  ],
});
