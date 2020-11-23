import React from "react";
import { TimeDependence } from "src/common/tutorials";
import { Prose } from "src/components";
import * as urls from "src/urls";
import { tutorialRoute } from "../shared";
import AnEnergyEigenstate from "./AnEnergyEigenstate";
import Superposition from "./Superposition";
import TimeEvoInfiniteWell from "./TimeEvoInfiniteWell";
import WrapUpTimeEv from "./WrapUpTimeEv";


export const route = tutorialRoute({
  url: urls.Tutorials.TimeDependence,
  name: "TimeDependence",
  schema: TimeDependence,
  label: "Time Dependence",
  intro: <Prose>Time dependence...</Prose>,
  parts: [
    {
      label: "Time Evolution in the infinite square well potential",
      path: "TimeEvoInfiniteWell",
      element: <TimeEvoInfiniteWell />,
    },
    {
      label: "An energy eigenstate",
      path: "AnEnergyEigenstate",
      element: <AnEnergyEigenstate />,
    },
    {
      label: "A superposition of eigenstates",
      path: "Superposition",
      element: <Superposition />,
    },
    {
      label: "Wrap up: Time evolution",
      path: "WrapUpTimeEv",
      element: <WrapUpTimeEv />,
    },
  ],
});
