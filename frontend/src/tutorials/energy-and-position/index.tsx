import React from "react";
import { EnergyAndPosition } from "src/common/tutorials";
import { Prose } from "src/components";
import * as urls from "src/urls";
import { tutorialRoute } from "../shared";
import WrapUpConnectingBases from "./WrapUpConnectingBases";

export const route = tutorialRoute({
  url: urls.Tutorials.EnergyAndPosition,
  name: "EnergyAndPosition",
  schema: EnergyAndPosition,
  label: "Energy and Position",
  intro: <Prose>Energy and position intro spiel here…</Prose>,
  parts: [
    {
      label: "Wrap Up: Connecting Bases",
      path: "wrap-up-connecting-bases",
      element: <WrapUpConnectingBases/>,
    },
  ],
});
