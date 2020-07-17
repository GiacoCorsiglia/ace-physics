import React from "react";
import { Link, Outlet, Route } from "react-router-dom";
import { Content, Header, Page } from "src/components/layout";
import { UserMenu } from "src/components/shared/UserMenu";
import * as urls from "src/urls";
import * as QuantumBasis from "./quantum-basis";
import * as QuantumMouse from "./quantum-mouse";

export const route = (
  <Route path={urls.Tutorials.path} element={<Outlet />}>
    <Route path="/" element={<TutorialsIndex />} />
    {QuantumBasis.route}
    {QuantumMouse.route}
  </Route>
);

function TutorialsIndex() {
  return (
    <Page title="Tutorials">
      <Header>
        <UserMenu />
      </Header>

      <Content as="main" className="prose">
        <h1>Tutorials</h1>

        <nav>
          <ul>
            <li>
              <Link to={urls.Tutorials.QuantumMouse.link}>Quantum Mouse</Link>
            </li>

            <li>
              <Link to={urls.Tutorials.QuantumBasis.link}>Quantum Basis</Link>
            </li>
          </ul>
        </nav>
      </Content>
    </Page>
  );
}
