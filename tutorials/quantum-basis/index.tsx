import * as urls from "@/urls";
import { QuantumBasis, QuantumBasisLite } from "common/tutorials";
import { Prose } from "components";
import { tutorialRoute } from "tutorials/shared";
import ChangingBasis from "./ChangingBasis";
import DefiningBasis from "./DefiningBasis";
import Pretest from "./Pretest";
import ProbabilityProjection from "./ProbabilityProjection";
import RelatingDifferentBases from "./RelatingDifferentBases";
import WrapUp from "./WrapUp";

const routeFull = tutorialRoute({
  url: urls.Tutorials.QuantumBasis,
  name: "QuantumBasis",
  schema: QuantumBasis,
  label: "Visualizing a Vector in a Different Basis — Full Version",
  intro: <Prose>Vectors, components, and bases—oh my!</Prose>,
  parts: [
    {
      label: "Before You Start",
      path: "before-you-start",
      element: <Pretest />,
    },
    {
      label: "Probability and Projection",
      path: "probability-and-projection",
      element: <ProbabilityProjection />,
    },
    {
      label: "Defining a Basis",
      path: "defining-basis",
      element: <DefiningBasis />,
    },
    {
      label: "Changing Basis",
      path: "changing-basis",
      element: <ChangingBasis />,
    },
    {
      label: "Relating Different Bases",
      path: "relating-different-bases",
      element: <RelatingDifferentBases />,
    },
    {
      label: "Wrapping up",
      path: "WrapUp",
      element: <WrapUp />,
    },
  ],
});

const routeLite = tutorialRoute({
  url: urls.Tutorials.QuantumBasisLite,
  name: "QuantumBasisLite",
  schema: QuantumBasisLite,
  label: "Visualizing a Vector in a Different Basis — Lite Version",
  intro: <Prose>Vectors, components, and bases—oh my!</Prose>,
  parts: [
    {
      label: "Before You Start",
      path: "before-you-start",
      element: <Pretest />,
    },
    {
      label: "Defining a Basis",
      path: "defining-basis",
      element: <DefiningBasis />,
    },
    {
      label: "Changing Basis",
      path: "changing-basis",
      element: <ChangingBasis />,
    },
    {
      label: "Relating Different Bases",
      path: "relating-different-bases",
      element: <RelatingDifferentBases />,
    },
  ],
});

export const route = [routeFull, routeLite];
