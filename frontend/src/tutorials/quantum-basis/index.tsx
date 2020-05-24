import React from "react";
import { Outlet, Route } from "react-router";
import * as urls from "src/urls";
import Part1 from "./Part1";
import Part2 from "./Part2";
import Part3 from "./Part3";
import Part4 from "./Part4";

export const route = (
  <Route
    path={urls.Tutorials.QuantumBasis.path}
    element={<QuantumBasisTutorial />}
  >
    <Route path="/" element={<div>Index</div>} />
    <Route path="1" element={<Part1 />} />
    <Route path="2" element={<Part2 />} />
    <Route path="3" element={<Part3 />} />
    <Route path="4" element={<Part4 />} />
  </Route>
);

function QuantumBasisTutorial() {
  return (
    <div>
      <h1>Visualizing a Vector in a Different Basis</h1>

      <Outlet />
    </div>
  );
}
