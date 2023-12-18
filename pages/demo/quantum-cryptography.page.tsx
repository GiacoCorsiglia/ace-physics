import { M } from "@/components";
import QuantumCryptography from "@pages/tutorials/quantum-cryptography/1-quantum-key-distribution.page";
import { TutorialDemoPage } from "./tutorial-demo";

export default function QuantumCryptographyDemo() {
  return (
    <TutorialDemoPage
      tutorialPage={QuantumCryptography}
      title="Quantum Cryptograhy Tutorial, Page 1"
      intro={
        <>
          <p>
            Here’s a demo of the first page of our Quantum Cryptography
            tutorial, which walks students through the BB84 protocol for key
            distribution.
          </p>

          <p>
            On this page, <M t="{\ket{0}}" /> and <M t="{\ket{1}}" /> are the
            basis states for the computational basis, while <M t="{\ket{+}}" />{" "}
            and <M t="{\ket{-}}" /> are the basis states for the x-basis.
          </p>
        </>
      }
      initialState={{}}
    />
  );
}
