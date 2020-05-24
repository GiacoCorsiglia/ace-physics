import React from "react";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import * as Tutorials from "./tutorials";
import * as urls from "./urls";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppIndex />} />
        {Tutorials.route}
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </Router>
  );
}

function AppIndex() {
  return (
    <div>
      <h1>ACE Physics Online</h1>

      <Link to={urls.Tutorials.link}>Check out the online tutorials.</Link>
    </div>
  );
}
