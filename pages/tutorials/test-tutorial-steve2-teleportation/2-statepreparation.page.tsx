import { ChooseOne, Image, M, Prose } from "@/components";

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

    // section({
    //   name: "fillinstate",
    //   body: (m) => (
    //     <TextBox
    //       model={m.fillinstate}
    //       label={
    //         <Prose>
    //           We will treat the mystery state as the first qubit of our full
    //           initial three-qubit state which is:{" "}
    //           <M t="\ket{\phi} \otimes \ket{\beta_{00}}" /> <br />
    //           (So, in the circuit diagram, we put the mystery qubit at the top,
    //           the first qubit)
    //           <Image src={fig1} alt="circuit diagram 1" />
    //         </Prose>
    //       }
    //     />
    //   ),
    // }),

    section({
      name: "whatisxq",
      body: (m) => (
        <ChooseOne
          model={m.whatisx}
          label={
            <Prose>
              <p>
                {" "}
                We will treat the mystery state as the first qubit of our full
                initial three-qubit state which is:{" "}
                <M t="\ket{\phi} \otimes \ket{\beta_{00}}" /> <br />
                (So, in the circuit diagram, we put the mystery qubit at the
                top, the first qubit)
                <Image src={fig1} alt="circuit diagram 1" />
                <br />
                We need to write the full initial (input) 3 qubit state in Dirac
                notation. <br />
                Fill in the state by finding x and y in the final line: <br />
                <M t="\ket{\phi} \otimes \ket{\beta_{00}} = \frac{1}{\sqrt{2}} (a\ket{000} + a\ket{01x} + b\ket{100} + b\ket{y})" />
                <br />
                What is x in the line above?
              </p>
            </Prose>
          }
          choices={[
            ["0", <M t="0" />],
            ["1", <M t="1" />],
            ["else", <M t="{\rm Something\ else}" />],
          ]}
          answer="1"
          explanation={
            <>
              {`When you tensor product a single qubit with a 2-qubit
              state, this results in a 3-qubit state.
              Recall that `}
              <M t="\ket{\beta_{00}} = {1\over\sqrt{2}}(\ket{00}+\ket{11})" />
              {`. The very first term arose from `}
              <M t="a \ket{0} \otimes \ket{00}" />,
              {` the second term, with the missing “x”, comes from `}
              <M t="a \ket{0} \otimes \ket{11}" />, {` which becomes `}
              <M t="a \ket{011}" />.{` (Thus, `}
              <M t="x=1" />
              {`.)`}
            </>
          }
        />
      ),
    }),

    section({
      name: "whatisyq",
      body: (m) => (
        <ChooseOne
          model={m.whatisy}
          label={
            <Prose>
              <p>
                What is <M t="\ket{y}" />?
                <br />
              </p>
            </Prose>
          }
          choices={[
            ["000", <M t="\ket{000}" />],
            ["001", <M t="\ket{001}" />],
            ["010", <M t="\ket{010}" />],
            ["011", <M t="\ket{011}" />],
            ["100", <M t="\ket{100}" />],
            ["101", <M t="\ket{101}" />],
            ["110", <M t="\ket{110}" />],
            ["111", <M t="\ket{111}" />],
          ]}
          answer="111"
          explanation={
            <>
              {` The third term in the full state is `}
              <M t="b \ket{1} \otimes \ket{00}" />,{` which becomes `}
              <M t="b \ket{100}" />.{` The fourth term is `}
              <M t="b \ket{1} \otimes \ket{11}" />,{` which becomes `}
              <M t="b \ket{111}" />.{` (Thus, `}
              <M t="y=\ket{111}" />
              {`.)`}
            </>
          }
        />
      ),
    }),
  ],
}));
