import React from "react";
import {
  Link,
  // @ts-ignore
  useRoutes,
} from "react-router-dom";
import Part1 from "./Part1";
import Part2 from "./Part2";

export default function QuantumMouseTutorial() {
  const el = useRoutes([
    { path: "/", element: <div>Index</div> },
    { path: "1", element: <Part1 /> },
    { path: "2", element: <Part2 /> },
  ]);

  return (
    <div>
      <h1>Quantum Mouse Lab</h1>

      {el}

      <ul className="full-width">
        <li>
          <Link to="/tutorials/quantum-mouse/1">Part 1</Link>
        </li>
        <li>
          <Link to="/tutorials/quantum-mouse/2">Part 2</Link>
        </li>
      </ul>
    </div>
  );
}
