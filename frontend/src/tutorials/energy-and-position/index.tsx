import React from "react";
import { EnergyAndPosition } from "src/common/tutorials";
import { Prose } from "src/components";
import M from "src/components/M";
import * as urls from "src/urls";
import { tutorialRoute } from "../shared";
import ComparingRepresentations from "./ComparingRepresentations";
import Part1 from "./Part1";
import Part2 from "./Part2";
import PositionRepresentationA from "./PositionRepresentationA";
import PositionRepresentationB from "./PositionRepresentationB";
import Pretest from "./Pretest";
import WrapUpConnectingBases from "./WrapUpConnectingBases";

export const route = tutorialRoute({
  url: urls.Tutorials.EnergyAndPosition,
  name: "EnergyAndPosition",
  schema: EnergyAndPosition,
  label: "Energy and Position",
  intro: <Prose>Energy and position intro spiel here…</Prose>,
  parts: [
    {
      label: "Before You Start",
      path: "before-you-start",
      element: <Pretest />,
    },
    {
      label: "The Energy Basis",
      path: "energy-basis",
      element: <Part1 />,
    },
    {
      label: "Energy Histograms",
      path: "energy-histograms",
      element: <Part2 />,
    },
    {
      label: (
        <>
          Representing <M t="\ket{\psi_A}" /> in the Position Basis
        </>
      ),
      title: "Representing A in the Position Basis",
      path: "position-representation-A",
      element: <PositionRepresentationA />,
    },
    {
      label: (
        <>
          Representing <M t="\ket{\psi_B}" /> in the Position Basis
        </>
      ),
      title: "Representing B in the Position Basis",
      path: "position-representation-B",
      element: <PositionRepresentationB />,
    },
    {
      label: "Comparing representations",
      path: "comparing-representations",
      element: <ComparingRepresentations />,
    },
    {
      label: "Wrap Up: Connecting Bases",
      path: "wrap-up-connecting-bases",
      element: <WrapUpConnectingBases />,
    },
  ],
});
