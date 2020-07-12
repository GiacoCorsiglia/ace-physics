import React from "react";
import { Link, Route } from "react-router-dom";
import { QuantumMouse } from "src/common/tutorials";
import * as urls from "src/urls";
import Tutorial from "../Tutorial";
import Part1 from "./Part1";
import Part2 from "./Part2";

export const route = (
  <Route
    path={urls.Tutorials.QuantumMouse.path}
    element={<QuantumMouseTutorial />}
  >
    <Route path="/" element={<Parts />} />
    <Route path="1" element={<Part1 />} />
    <Route path="2" element={<Part2 />} />
  </Route>
);

function QuantumMouseTutorial() {
  return (
    <Tutorial
      name="Quantum Mouse Lab"
      schema={QuantumMouse}
      parts={<Parts />}
    />
  );
}

function Parts() {
  return (
    <ul>
      <li>
        <Link to={urls.part(urls.Tutorials.QuantumMouse, "1")}>Part 1</Link>
      </li>
      <li>
        <Link to={urls.part(urls.Tutorials.QuantumMouse, "2")}>Part 2</Link>
      </li>
    </ul>
  );
}
