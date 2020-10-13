import React from "react";
import { EnergyAndPosition } from "src/common/tutorials";
import { Prose } from "src/components";
import * as urls from "src/urls";
import { tutorialRoute } from "../shared";
import NameOfLastPart from "./NameOfLastPart";

export const route = tutorialRoute({
  url: urls.Tutorials.EnergyAndPosition,
  name: "EnergyAndPosition",
  schema: EnergyAndPosition,
  label: "Energy and Position",
  intro: <Prose>Energy and position intro spiel here…</Prose>,
  parts: [
    {
      label: "Name of last part",
      path: "name-of-last-part",
      element: <NameOfLastPart />,
    },
  ],
});
