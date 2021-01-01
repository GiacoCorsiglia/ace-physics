import { Prose } from "@/design";
import * as urls from "@/urls";
import { TimeDependence } from "common/tutorials";
import { tutorialRoute } from "tutorials/shared";
import AnEnergyEigenstate from "./AnEnergyEigenstate";
import Superposition from "./Superposition";
import TimeEvInfiniteWell from "./TimeEvInfiniteWell";
import WrapUpTimeEv from "./WrapUpTimeEv";

export const route = tutorialRoute({
  url: urls.Tutorials.TimeDependence,
  name: "TimeDependence",
  schema: TimeDependence,
  label: "Time Dependence",
  intro: (
    <Prose>
      Visualize the time evolution of position space wave functions.
    </Prose>
  ),
  parts: [
    {
      label: "Time Evolution in the Infinite Square Well Potential",
      path: "time-evolution-infinite-square-well-potential",
      element: <TimeEvInfiniteWell />,
      labelSections: true,
    },
    {
      label: "An Energy Eigenstate",
      path: "an-energy-eigenstate",
      element: <AnEnergyEigenstate />,
      labelSections: true,
    },
    {
      label: "A Superposition of Eigenstates",
      path: "superposition",
      element: <Superposition />,
      labelSections: true,
    },
    {
      label: "Wrap up: Time evolution",
      path: "wrap-up-time-evolution",
      element: <WrapUpTimeEv />,
      labelSections: true,
    },
  ],
});
