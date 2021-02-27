import { UserMenu } from "@/auth";
import { Prose } from "@/design";
import { Content, Header, Page } from "@/design/layout";
import { Html } from "@/helpers/frontend";
import * as urls from "@/urls";
import { ChevronRightIcon } from "@primer/octicons-react";
import Link from "next/link";
import styles from "tutorials/tutorials.module.scss";

export default function TutorialsIndex() {
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
            course’s webpage). Of course, you’re always welcome to explore!
          </p>
        </Prose>

        <nav>
          <ul>
            <TutorialLink label="Spin Lab 1" url={urls.Tutorials.SpinLab1}>
              Investigate the phenomenon of “spin,” which is fundamentally
              quantum mechanical in nature.
            </TutorialLink>

            <TutorialLink label="Spin Lab 2" url={urls.Tutorials.SpinLab2}>
              Continue exploring spin, and practice with Dirac Notation.
            </TutorialLink>

            <TutorialLink
              label="Quantum Mouse Lab"
              url={urls.Tutorials.QuantumMouse}
            >
              It’s all about eigenvalues, eigenstates, and measurement.
            </TutorialLink>

            <TutorialLink
              label="Visualizing a Vector in a Different Basis — Main Edition"
              url={urls.Tutorials.QuantumBasis}
            >
              Connecting quantum state vectors with the 2D vectors you’re used
              to.
              <br />
              The “Main” edition connects these concepts with quantum
              probabilities, and investigates the reasons one might change
              basis.
            </TutorialLink>

            <TutorialLink
              label="Visualizing a Vector in a Different Basis — Lite Edition"
              url={urls.Tutorials.QuantumBasisLite}
            >
              Connecting quantum state vectors with the 2D vectors you’re used
              to.
              <br />
              The “Lite” edition doesn’t discuss the connection with quantum
              probabilities or reasons for changing basis, but takes less time.
            </TutorialLink>

            <TutorialLink
              label="Quantum Mouse Lab 2"
              url={urls.Tutorials.QuantumMouse2}
            >
              Continue to explore eigenvalues, eigenstates, operators, and
              measurement.
            </TutorialLink>

            <TutorialLink
              label="Spins & Magnetic Fields"
              url={urls.Tutorials.SpinsAndMagneticFields}
            >
              What happens when a spin-½ particle passes through a region with a
              magnetic field?
            </TutorialLink>

            {/* <TutorialLink label="EPR and Entanglement" url={urls.Tutorials.EPR}>
              Investigate the uniquely <em>quantum</em> effect of entanglement,
              and apply it to cryptography.
            </TutorialLink> */}

            {/* <TutorialLink
              label="Probability Amplitude: From Vectors to Functions"
              url={urls.Tutorials.VectorsToFunctions}
            >
              Bridging between discrete vectors (such as those describing a
              particle’s spin state) and continuous wave functions (which might
              model a particle’s position state).
            </TutorialLink> */}

            {/* <TutorialLink
              label="Energy and Position"
              url={urls.Tutorials.EnergyAndPosition}
            >
              Explore the connection between the energy and position
              representations of a quantum state.
            </TutorialLink> */}

            {/* <TutorialLink
              label="Time Dependence"
              url={urls.Tutorials.TimeDependence}
            >
              Visualize the time evolution of position space wave functions.
            </TutorialLink> */}

            <TutorialLink
              label="Reflecting on Transmission"
              url={urls.Tutorials.ReflectionTransmission}
            >
              Explore the phenomena of reflection and transmission from 1D
              potential barriers.
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
}: {
  label: React.ReactNode;
  url: urls.URL;
  children?: Html;
}) {
  return (
    <li>
      <Link href={url.link}>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a className={styles.tutorialLink}>
          <p className={styles.tutorialLabel}>{label}</p>

          <div className={styles.arrow}>
            <ChevronRightIcon />
          </div>

          <Prose className="no-margin">{children}</Prose>
        </a>
      </Link>
    </li>
  );
}
