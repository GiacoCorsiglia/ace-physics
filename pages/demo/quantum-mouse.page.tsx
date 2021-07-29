import QuantumMouse from "@pages/tutorials/quantum-mouse/2-moody-mice.page";
import { TutorialDemoPage } from "./tutorial-demo";

export default function QuantumMouseDemo() {
  return (
    <TutorialDemoPage
      tutorialPage={QuantumMouse}
      title="Quantum Mouse Tutorial, Page 2"
      intro={
        <>
          <p>
            Here’s a demo of the second page of our Quantum Mouse tutorial. The
            first page introduces notation for a “quantum mouse,” which has two
            associated quantum observables: eye size, and mood.
          </p>
        </>
      }
      initialState={{
        responses: {
          smallBigInnerProduct: { selected: "0" },
        },
      }}
    />
  );
}
