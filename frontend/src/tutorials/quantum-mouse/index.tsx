import React from "react";
import { QuantumMouse } from "src/common/tutorials";
import { Prose } from "src/components";
import * as urls from "src/urls";
import { tutorialRoute } from "../shared";
import Part2 from "./Part2";
import WhatIsAQuantumMouse from "./WhatIsAQuantumMouse";

export const route = tutorialRoute({
  url: urls.Tutorials.QuantumMouse,
  schema: QuantumMouse,
  label: "Quantum Mouse Lab",
  intro: (
    <Prose>
      The quantum mouse lab is all about measurement, eigenvalues, and
      eigenstates. But with a fun twist! Are you ready?
    </Prose>
  ),
  parts: [
    {
      path: "what-is-a-quantum-mouse",
      label: "What is a quantum mouse?",
      element: <WhatIsAQuantumMouse />,
    },
    {
      path: "superpositions",
      label: "Superpositions",
      element: <Part2 />,
    },
  ],
});
