import { ChevronRightIcon } from "@primer/octicons-react";
import React from "react";
import { Link, Outlet, Route } from "react-router-dom";
import { Prose } from "src/components";
import { Content, Header, Page } from "src/components/layout";
import { UserMenu } from "src/components/shared/UserMenu";
import * as urls from "src/urls";
import { Children } from "src/util";
import * as EPR from "./EPR";
import * as QuantumBasis from "./quantum-basis";
import * as QuantumMouse from "./quantum-mouse";
import styles from "./tutorials.module.scss";
import * as VectorsToFunctions from "./vectors-to-functions";

export const route = (
  <Route path={urls.Tutorials.path} element={<Outlet />}>
    <Route path="/" element={<TutorialsIndex />} />
    {QuantumBasis.route}
    {QuantumMouse.route}
    {EPR.route}
    {VectorsToFunctions.route}
  </Route>
);

function TutorialsIndex() {
  return (
    <Page title="Tutorials">
      <Header>
        <UserMenu />
      </Header>

      <Content as="main">
        <Prose>
          <h1>
            <em>Tutorials</em> about Quantum Mechanics
          </h1>

          <p>
            Here’s a set of interactive activities for people studying quantum
            mechanics. If you’re here on this website, good chance you’re one of
            those people! We hope you find them useful—and we’ll be interested
            to know what you think.
          </p>

          <p>
            If your professor sent you here, they can probably tell you which
            tutorial is most relevant to whatever you’re covering in class this
            week. You should probably check in with them (or maybe refer to your
            course’s webpage). Of course, you’re always welcome to explore.{" "}
            <span role="img" aria-label="happy cat">
              😸
            </span>
          </p>
        </Prose>

        <nav>
          <ul>
            <TutorialLink
              label="Quantum Mouse Lab"
              url={urls.Tutorials.QuantumMouse}
            >
              It’s all about eigenvalues, eigenstates, and measurement.
            </TutorialLink>

            <TutorialLink
              label="Visualizing a Vector in a Different Basis — Full"
              url={urls.Tutorials.QuantumBasis}
            >
              Connecting quantum state vectors with the 2D vectors you’re used
              to.
              <br />
              This “Full” version connects these concepts with quantum
              probabilities, and investigates the reasons one might change
              basis.
            </TutorialLink>

            <TutorialLink
              label="Visualizing a Vector in a Different Basis — Lite"
              url={urls.Tutorials.QuantumBasisLite}
            >
              Connecting quantum state vectors with the 2D vectors you’re used
              to.
              <br />
              The “Lite” version doesn’t discuss the connection with quantum
              probabilities or reasons for changing basis, but takes less time.
            </TutorialLink>

            <TutorialLink label="EPR and Entanglement" url={urls.Tutorials.EPR}>
              Investigate the uniquely <em>quantum</em> effect of entanglement,
              and apply it to cryptography.
            </TutorialLink>

            <TutorialLink
              label="Probability Amplitude: From Vectors to Functions"
              url={urls.Tutorials.VectorsToFunctions}
            >
              Vectors to functions…
            </TutorialLink>
          </ul>
        </nav>
      </Content>
    </Page>
  );
}

function TutorialLink({
  label,
  url,
  children,
}: { label: React.ReactNode; url: urls.URL } & Children) {
  return (
    <li>
      <Link className={styles.tutorialLink} to={url.link}>
        <p className={styles.tutorialLabel}>{label}</p>

        <div className={styles.arrow}>
          <ChevronRightIcon />
        </div>

        <Prose className="no-margin">{children}</Prose>
      </Link>
    </li>
  );
}
