import React from "react";
import {
  BrowserRouter as Router,
  // @ts-ignore
  useRoutes,
  Link,
  // @ts-ignore
  Outlet,
} from "react-router-dom";

import Graph from "./components/graph/Graph";
import Plotter from "./components/graph/Plotter";
import Plotter2 from "./components/graph/Plotter2";
import Part1 from "./components/tutorials/change-of-basis/Part1";

export default function App() {
  return (
    <Router>
      <RealApp />
    </Router>
  );
}

function RealApp() {
  return useRoutes([
    { path: "/", element: <TutorialIndex /> },
    {
      path: "tutorials",
      element: <Outlet />,
      children: [
        { path: "change-of-basis/*", element: <ChangeOfBasisTutorial /> },
      ],
    },
  ]);
}

function TutorialIndex() {
  return (
    <div>
      <h1>Tutorials</h1>

      <nav>
        <Link to="tutorials/change-of-basis/1">Change-of-basis</Link>
      </nav>
    </div>
  );
}

function ChangeOfBasisTutorial() {
  const el = useRoutes([
    {
      path: "/",
      element: <div>Index</div>,
    },
    {
      path: "1",
      element: (
        <div>
          <h2>Part 1</h2>
          <Part1 />
        </div>
      ),
    },
    {
      path: "2",
      element: (
        <div>
          <h2>Part 2</h2>
          <Plotter />
        </div>
      ),
    },
    {
      path: "3",
      element: (
        <div>
          <h2>Part 3</h2>
          <Plotter2 />
        </div>
      ),
    },
    {
      path: "4",
      element: (
        <div>
          <h2>Part 4</h2>
          <Graph />
        </div>
      ),
    },
  ]);

  return (
    <div>
      <h1>Change-of-Basis</h1>

      {el}
    </div>
  );
}
