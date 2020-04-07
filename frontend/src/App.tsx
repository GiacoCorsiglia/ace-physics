import React from "react";

import Graph from "./components/graph/Graph";

import "./App.css";
import Plotter from "./components/graph/Plotter";
import Plotter2 from "./components/graph/Plotter2";

export default function App() {
  return (
    <div>
      <h2>Part 2</h2>
      <h3>(b)</h3>
      <Plotter />
      <h2>Part 3</h2>
      <h3>(b)</h3>
      <Plotter2 />
      <h2>Part 4</h2>
      <Graph />
    </div>
  );
}
