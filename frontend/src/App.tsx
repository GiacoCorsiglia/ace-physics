import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Link,
  // @ts-ignore
  Outlet,
  // @ts-ignore
  useRoutes,
} from "react-router-dom";
import { loadIndex } from "./api";
import Plotter from "./components/graph/Plotter";
import Plotter2 from "./components/graph/Plotter2";
import Part1 from "./tutorials/change-of-basis/Part1";
import Part2 from "./tutorials/change-of-basis/Part2";
import Part3 from "./tutorials/change-of-basis/Part3";
import Part4 from "./tutorials/change-of-basis/Part4";
import QuantumMouseTutorial from "./tutorials/quantum-mouse";
import { url } from "./util";

export default function App() {
  return (
    <Router>
      <RealApp />
    </Router>
  );
}

function RealApp() {
  const basename =
    process.env.NODE_ENV === "production"
      ? "/EducationIssues/OnlineTutorials"
      : undefined;
  return useRoutes(
    [
      { path: "/", element: <TutorialIndex /> },
      {
        path: "tutorials",
        element: <Outlet />,
        children: [
          { path: "quantum-mouse/*", element: <QuantumMouseTutorial /> },
          { path: "change-of-basis/*", element: <ChangeOfBasisTutorial /> },
        ],
      },
      { element: <h1>Not found</h1> },
    ],
    basename
  );
}

function TutorialIndex() {
  const [data, setData] = useState();

  useEffect(() => {
    loadIndex().then(setData);
  }, []);

  return (
    <div>
      <h1>Tutorials</h1>

      <pre className="full-width">{JSON.stringify(data, undefined, 2)}</pre>

      <nav>
        <ul>
          <li>
            <Link to={url("tutorials/quantum-mouse")}>Quantum Mouse Lab</Link>
          </li>

          <li>
            <Link to={url("tutorials/change-of-basis/1")}>Change-of-basis</Link>
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
