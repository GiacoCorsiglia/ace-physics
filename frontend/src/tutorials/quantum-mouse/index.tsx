import React from "react";
import { Link, Outlet, Route } from "react-router-dom";
import * as urls from "src/urls";
import Part1 from "./Part1";
import Part2 from "./Part2";

export const route = (
  <Route
    path={urls.Tutorials.QuantumMouse.path}
    element={<QuantumMouseTutorial />}
  >
    <Route path="/" element={<Index />} />
    <Route path="1" element={<Part1 />} />
    <Route path="2" element={<Part2 />} />
  </Route>
);

function QuantumMouseTutorial() {
  return (
    <div>
      <h1>Quantum Mouse Lab</h1>

      <Outlet />
    </div>
  );
}

function Index() {
  return (
    <ul className="full-width">
      <li>
        <Link to={urls.part(urls.Tutorials.QuantumMouse, "1")}>Part 1</Link>
      </li>
      <li>
        <Link to={urls.part(urls.Tutorials.QuantumMouse, "2")}>Part 2</Link>
      </li>
    </ul>
  );
}
