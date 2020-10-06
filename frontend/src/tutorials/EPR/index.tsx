import React from "react";
import { EPR } from "src/common/tutorials";
import { Prose } from "src/components";
import * as urls from "src/urls";
import { tutorialRoute } from "../shared";
import EavesdroppingDetection from "./EavesdroppingDetection";
import EntangledStates from "./EntangledStates";
import InvestigatingCorrelation from "./InvestigatingCorrelation";
import Marbles from "./Marbles";
import Pretest from "./Pretest";
import QuantumCryptography from "./QuantumCryptography";

export const route = tutorialRoute({
  url: urls.Tutorials.EPR,
  name: "EPR",
  schema: EPR,
  label: "EPR and Entangled States",
  intro: <Prose>Entanglement…</Prose>,
  info: (
    <Prose className="faded text-smallest">
      <em>
        This tutorial is from{" "}
        <a
          href="https://www.asc.ohio-state.edu/heckler.6/"
          target="_blank"
          rel="noopener noreferrer"
        >
          A. Heckler
        </a>{" "}
        at Ohio State University (modified by CU Boulder)
      </em>
    </Prose>
  ),
  parts: [
    {
      label: "Before You Start",
      path: "before-you-start",
      element: <Pretest />,
    },
    {
      label: "Classical Marble Scenario",
      path: "marbles",
      element: <Marbles />,
    },
    {
      label: "Entangled States",
      path: "entangled-states",
      element: <EntangledStates />,
    },
    {
      label: "Investigating Correlation",
      path: "investigating-correlation",
      element: <InvestigatingCorrelation />,
    },
    {
      label: "Quantum Cryptography",
      path: "quantum-cryptography",
      element: <QuantumCryptography />,
    },
    {
      label: "Eavesdropping Detection",
      path: "eavesdropping-detection",
      element: <EavesdroppingDetection />,
    },
  ],
});
