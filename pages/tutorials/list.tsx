import { Html } from "@/helpers/client";

/**
 * List of all tutorials for display on different pages.
 */
export const tutorialList: TutorialListing[] = [
  {
    id: "SpinLab1",
    link: "spin-lab-1",
    label: "Spin Lab 1",
    blurb: (
      <>
        Investigate the phenomenon of “spin”, which is fundamentally quantum
        mechanical in nature.
      </>
    ),
  },
  {
    id: "SpinLab2",
    link: "spin-lab-2",
    label: "Spin Lab 2",
    blurb: <>Continue exploring spin, and practice with Dirac Notation.</>,
  },
  {
    id: "QuantumMouse",
    link: "quantum-mouse",
    label: "Quantum Mouse Lab",
    blurb: (
      <>
        Connecting quantum state vectors with the 2D vectors you’re used to.
        <br />
        The “Main” edition connects these concepts with quantum probabilities,
        and investigates the reasons one might change basis.
      </>
    ),
  },
  {
    id: "QuantumBasisMain",
    link: "quantum-basis",
    label: "Visualizing a Vector in a Different Basis — Main Edition",
    blurb: (
      <>
        Connecting quantum state vectors with the 2D vectors you’re used to.
        <br />
        The “Main” edition connects these concepts with quantum probabilities,
        and investigates the reasons one might change basis.
      </>
    ),
  },
  {
    id: "QuantumBasisLite",
    link: "quantum-basis-lite",
    label: "Visualizing a Vector in a Different Basis — Lite Edition",
    blurb: (
      <>
        Connecting quantum state vectors with the 2D vectors you’re used to.
        <br />
        The “Lite” edition doesn’t discuss the connection with quantum
        probabilities or reasons for changing basis, but takes less time.
      </>
    ),
  },
  {
    id: "QuantumMouse2",
    link: "quantum-mouse-2",
    label: "Quantum Mouse Lab 2",
    blurb: (
      <>
        Continue to explore eigenvalues, eigenstates, operators, and
        measurement.
      </>
    ),
  },
  {
    id: "SpinsAndMagneticFields",
    link: "spins-and-magnetic-fields",
    label: "Spins & Magnetic Fields",
    blurb: (
      <>
        What happens when a spin-½ particle passes through a region with a
        magnetic field?
      </>
    ),
  },
  {
    id: "IntroductionToQuantumGates",
    link: "introduction-to-quantum-gates",
    label: "Introduction to Quantum Gates",
    blurb: <>Your first step in learning about quantum computing.</>,
  },
  {
    id: "QuantumCircuitDiagrams",
    link: "quantum-circuit-diagrams",
    label: "Quantum Circuit Diagrams",
    blurb: (
      <>Practice with single-qubit gates represented as circuit diagrams.</>
    ),
  },
  {
    id: "TensorProducts",
    link: "tensor-products",
    label: "Tensor Products",
    blurb: (
      <>
        Use the tensor product operation to describe systems with multiple
        qubits mathematically.
      </>
    ),
  },
  {
    id: "CnotEntanglement",
    link: "cnot-entanglement",
    label: "CNOT and Entanglement",
    blurb: (
      <>
        An introduction to the Controlled NOT (CNOT) gate and the related
        concept of entanglement.
      </>
    ),
  },
  {
    id: "EPR",
    link: "epr",
    label: "EPR and Entanglement",
    blurb: (
      <>
        Investigate the uniquely <em>quantum</em> effect of entanglement, and
        apply it to cryptography.
      </>
    ),
  },
  {
    id: "VectorsToFunctions",
    link: "vectors-to-functions",
    label: "Probability Amplitude: From Vectors to Functions",
    blurb: (
      <>
        Bridging between discrete vectors (such as those describing a particle’s
        spin state) and continuous wave functions (which might model a
        particle’s position state).
      </>
    ),
  },
  {
    id: "EnergyAndPosition",
    link: "energy-and-position",
    label: "Energy & Position",
    blurb: (
      <>
        Explore the connection between the energy and position representations
        of a quantum state.
      </>
    ),
  },
  {
    id: "TimeDependence",
    link: "time-dependence",
    label: "Time Dependence",
    blurb: <>Visualize the time evolution of position space wave functions.</>,
  },
  {
    id: "ReflectionTransmission",
    link: "reflection-transmission",
    label: "Reflecting on Transmission",
    blurb: (
      <>
        Explore the phenomena of reflection and transmission from 1D potential
        barriers.
      </>
    ),
  },

];

if (process.env.NEXT_PUBLIC_ACE_ENV !== 'production') tutorialList.push({
    id: "TestTutorial",
    link: "test-tutorial",
    label: "Documentation Tutorial",
    blurb: (
      <>
        Edit this tutorial to test your theories about how they work! Environment: {process.env.NEXT_PUBLIC_ACE_ENV}
      </>
    ),
  });
// use push to add testtutorial in !'production' environment

export interface TutorialListing {
  /**
   * Internal name for the tutorial.
   */
  readonly id: string;
  /**
   * The link for the tutorial ("/tutorials/{this-part-of-the-link-only}")
   */
  readonly link: string;
  /**
   * The tutorial's title.
   */
  readonly label: Html;
  /**
   * Brief description of the tutorial.
   */
  readonly blurb: Html;
}
