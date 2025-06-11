import { Image, M, Prose, TextBox } from "@/components";

import { page } from "@/tutorial";
import fig1 from "./assets/B-fig-1.png";
import setup from "./setup";

export default page(setup, ({ section }) => ({
  name: "statepreparation",
  label: "State Preparation",
  answers: "provided",

  sections: [
    section({
      name: "statePrepIntro",
      body: (
        <Prose>
          Remember that Alice has two qubits in her possession, a mystery state
          <M t="\ket{\phi} = a \ket{0} +  b \ket{1} " /> and also the first
          qubit of the entangled pair she shares with Bob. Bob has just one
          qubit, the second qubit of that shared, entangled Bell pair.
        </Prose>
      ),
      continue: {
        label: "Let’s do it",
      },
    }),

    section({
      name: "fillinstate",
      body: (m) => (
        <TextBox
          model={m.fillinstate}
          label={
            <Prose>
              We will treat the mystery state as the first qubit of our full
              initial three-qubit state which is:{" "}
              <M t="\ket{\phi} \otimes \ket{\beta_{00}}" /> <br />
              (So, in the circuit diagram, we put the mystery qubit at the top,
              the first qubit)
              <Image src={fig1} alt="circuit diagram 1" />
              We need to write the full initial (input) 3 qubit state in Dirac
              notation. We’ve filled in most of the terms but left some blanks
              for you to complete. Fill in the state by finding x and y in the
              final line: <br />
              <M t="\ket{\phi} \otimes \ket{\beta_{00}} = \frac{1}{\sqrt{2}} (a\ket{000} + a\ket{01x} + b\ket{100} + b\ket{y})" />
              <br /> We will provide the answers below - please check that you
              got it right and if not, look again to see if you can find your
              mistake(s).
            </Prose>
          }
        />
      ),
    }),
  ],
}));
