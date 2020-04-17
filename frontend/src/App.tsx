import React from "react";
import {
  BrowserRouter as Router,
  Link,
  // @ts-ignore
  Outlet,
  // @ts-ignore
  useRoutes,
} from "react-router-dom";
import Plotter from "./components/graph/Plotter";
import Plotter2 from "./components/graph/Plotter2";
import Part1 from "./components/tutorials/change-of-basis/Part1";
import Part2 from "./components/tutorials/change-of-basis/Part2";
import Part3 from "./components/tutorials/change-of-basis/Part3";
import Part4 from "./components/tutorials/change-of-basis/Part4";
import QuantumMouseTutorial from "./components/tutorials/quantum-mouse";

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
        { path: "quantum-mouse/*", element: <QuantumMouseTutorial /> },
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
        <ul>
          <li>
            <Link to="tutorials/quantum-mouse">Quantum Mouse Lab</Link>
          </li>

          <li>
            <Link to="tutorials/change-of-basis/1">Change-of-basis</Link>
          </li>
        </ul>
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
          <Part1 />
        </div>
      ),
    },
    {
      path: "2",
      element: (
        <div>
          <Part2 />
          <Plotter />
        </div>
      ),
    },
    {
      path: "3",
      element: (
        <div>
          <Part3 />
          <Plotter2 />
        </div>
      ),
    },
    {
      path: "4",
      element: <Part4 />,
    },
  ]);

  return (
    <div>
      <h1>Visualizing a Vector in a Different Basis</h1>

      {el}
    </div>
  );
}
