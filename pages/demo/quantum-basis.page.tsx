import { M } from "@/components";
import QuantumBasis from "@pages/tutorials/quantum-basis/3-changing-basis.page";
import { TutorialDemoPage } from "./tutorial-demo";

export default function QuantumBasisDemo() {
  return (
    <TutorialDemoPage
      tutorialPage={QuantumBasis}
      title="Quantum Basis Tutorial, Page 3"
      intro={
        <>
          <p>
            Here’s a demo of the third page of our Quantum Basis tutorial, which
            connects Dirac notation with 2D Cartesian space.
          </p>

          <p>
            On this page, <M t="\ket{i}" /> and <M t="\ket{j}" /> refer to the
            Cartesian unit vectors <M t="\mathbf{\hat{i}}" /> and{" "}
            <M t="\mathbf{\hat{j}}" />. This notation is introduced earlier in
            the tutorial, as is the vector <M t="\ket{u}" />.
          </p>
        </>
      }
      initialState={{}}
    />
  );
}
