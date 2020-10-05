import React from "react";
import { EPR } from "src/common/tutorials";
import { Prose } from "src/components";
import * as urls from "src/urls";
import { tutorialRoute } from "../shared";
import EntangledStates from "./EntangledStates";
import Marbles from "./Marbles";

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
      label: "Classical Marble Scenario",
      path: "marbles",
      element: <Marbles />,
    },
    {
      label: "Entangled States",
      path: "entangled-states",
      element: <EntangledStates />,
    },
  ],
});
