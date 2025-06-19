import {
  ChooseOne,
  Decimal,
  Guidance,
  Image,
  M,
  Prose,
  TextBox,
  Toggle,
} from "@/components";

import { page } from "@/tutorial";

import fig1 from "./assets/B-fig-1.png";
import setup from "./setup";

export default page(setup, ({ section }) => ({
  name: "statepreparation",
  label: "State Preparation",
  answers: "checked-some",

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
      name: "whatisxq",
      body: (m) => (
        <ChooseOne
          model={m.whatisx}
          choices={[
            ["0", <M t="0" />],
            ["1", <M t="1" />],
            ["else", <M t="{\rm Something\ else}" />],
          ]}
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
        />
      ),
      guidance: {
        nextMessage: () => "dynamicAnswer",
        messages: {
          dynamicAnswer: {
            body: ({ responses }) => (
              <Guidance.Dynamic
                status={
                  responses?.whatisx?.selected === "1" ? "agree" : "disagree"
                }
              >
                {responses?.whatisx?.selected !== "1" ? (
                  <p>
                    When you tensor product a single qubit with a 2-qubit state,
                    // this results in a 3-qubit state. Recall that //{" "}
                    <M t="\ket{\beta_{00}} = {1\over\sqrt{2}}(\ket{00}+\ket{11})" />
                    // The very first term arose from //{" "}
                    <M t="a \ket{0} \otimes \ket{00}" />, and the second term
                    (with // the missing "x"), comes from //{" "}
                    <M t="a \ket{0} \otimes \ket{11}" />, which becomes //{" "}
                    <M t="a \ket{011}" />. (Thus, <M t="x=1" />
                    // .){" "}
                  </p>
                ) : (
                  <p>
                    Right. When you tensor product a single qubit with a 2-qubit
                    // state, this results in a 3-qubit state. Recall that //{" "}
                    <M t="\ket{\beta_{00}} = {1\over\sqrt{2}}(\ket{00}+\ket{11})" />
                    // The very first term arose from //{" "}
                    <M t="a \ket{0} \otimes \ket{00}" />, and the second term
                    (with // the missing "x"), comes from //{" "}
                    <M t="a \ket{0} \otimes \ket{11}" />, which becomes //{" "}
                    <M t="a \ket{011}" />. (Thus, <M t="x=1" />
                    // .)
                  </p>
                )}
              </Guidance.Dynamic>
            ),
            onContinue: "nextSection",
          },
        },
      },
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

    section({
      name: "summary1",
      body: (m) => (
        <>
          <Prose>
            OUR ANSWER: The starting 3-qubit initial state can be written as:{" "}
            <br />
            <M t="\phi \otimes \beta_{00} = \frac{1}{\sqrt{2}} (a \ket{000} + a \ket{011} + b \ket{100} + b \ket{111})" />
            <br /> Did you get all the details correct? (If you disagree, please
            take the time now to work it out.)
          </Prose>
        </>
      ),
      continue: {
        label: "Got it",
      },
    }),

    section({
      name: "measure1",
      body: (m) => (
        <>
          <Decimal
            model={m.measure1}
            label={
              <Prose>
                Suppose Alice measures both of her qubits. How many different
                possible outcomes can she get?
              </Prose>
            }
          />

          <Prose>
            <em>Hint:</em> Your answer should be a whole number.
          </Prose>

          {/* <Prose> Blah</Prose> */}
        </>
      ),

      guidance: {
        nextMessage(r) {
          const measureresponse = r.measure1;

          if (measureresponse === undefined) {
            return null;
          }

          if (measureresponse === 4) {
            return "correct";
          } else if (measureresponse === 2) {
            return "two";
          } else if (measureresponse === 1) {
            return "one";
          } else {
            return "incorrect";
          }
        },
        messages: {
          correct: {
            body: (
              <Guidance.Agree>
                We agree with your answer! There are four possible measurement
                outcomes: 00, 01, 10, or 11{" "}
              </Guidance.Agree>
            ),
            onContinue: "nextSection",
          },
          two: {
            body: (
              <Guidance.Disagree>
                Remember that we are measuring two qubits, each of which can be
                0 or 1. Can you simply list out all the possible outcomes for
                such a 2-qubit measurement? Check your calculation then click
                “Check in Again”.
              </Guidance.Disagree>
            ),
            onContinue: "nextMessage",
          },
          one: {
            body: (
              <Guidance.Disagree>
                Remember that we are measuring two qubits, each of which can be
                0 or 1. Can you simply list out all the possible outcomes for
                such a 2-qubit measurement? Check your calculation then click
                “Check in Again”.
              </Guidance.Disagree>
            ),
            onContinue: "nextMessage",
          },
          incorrect: {
            body: (
              <Guidance.Disagree>
                We disagree with your answer. Remember that we are measuring two
                qubits, each of which can be 0 or 1. Can you simply list out all
                the possible outcomes for such a 2-qubit measurement? Check your
                calculation then click “Check in Again”.
              </Guidance.Disagree>
            ),
            onContinue: "nextMessage",
          },
        },
      },
    }),

    section({
      name: "equallylikelyq",
      body: (m) => (
        <>
          <Toggle
            model={m.equallylikely}
            choices={[
              ["yes", "Yes"],
              ["no", "No"],
            ]}
            label={<Prose>Are all measurement options equally likely?</Prose>}
          />

          <TextBox
            model={m.equallylikelyExplain}
            label={<Prose>Briefly explain,</Prose>}
          />
        </>
      ),

      guidance: {
        nextMessage: () => "dynamicAnswer",
        messages: {
          dynamicAnswer: {
            body: ({ responses }) => (
              <Guidance.Dynamic
                status={
                  responses?.equallylikely?.selected === "yes"
                    ? "disagree"
                    : "agree"
                }
              >
                {responses?.equallylikely?.selected !== "no" ? (
                  <p>
                    We disagree with your answer. The probabilities of measuring
                    the different outcomes depend on the coefficients{" "}
                    <M t="a" /> and <M t="b" /> in the mystery state. For
                    instance, the probability of measuring <M t="\ket{00}" /> is{" "}
                    <M t="|a|^2/2" />.
                  </p>
                ) : (
                  <p>
                    Right. The probabilities of measuring the different outcomes
                    depend on the coefficients <M t="a" /> and <M t="b" /> in
                    the mystery state. For instance, the probability of
                    measuring <M t="\ket{00}" /> is <M t="|a|^2/2" />.
                  </p>
                )}
              </Guidance.Dynamic>
            ),
            onContinue: "nextSection",
          },
        },
      },
    }),
  ],
}));
