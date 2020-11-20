import React from "react";
import { TimeDependence } from "src/common/tutorials";
import { Prose } from "src/components";
import * as urls from "src/urls";
import { tutorialRoute } from "../shared";
import Part1 from "./Part1";

export const route = tutorialRoute({
  url: urls.Tutorials.TimeDependence,
  name: "TimeDependence",
  schema: TimeDependence,
  label: "Time Dependence",
  intro: <Prose>Time dependence...</Prose>,
  parts: [
    {
      label: "TODO: NAME OF PART ONE",
      path: "TODO-NAME-OF-PART-ONE",
      element: <Part1 />,
    },
  ],
});
