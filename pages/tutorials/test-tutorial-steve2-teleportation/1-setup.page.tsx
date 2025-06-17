import { ChooseOne, Guidance, M, Prose, TextBox, Toggle } from "@/components";

import { page } from "@/tutorial";
import setup from "./setup";
export default page(setup, ({ section, sequence }) => ({
  name: "intropage",
  label: "The Setup",
  answers: "checked-all",

  sections: [
    section({
      name: "setupIntro",
      body: (
        <Prose>
          Here is the problem: Alice has a single qubit in a mystery quantum
          state that she wants to send to Bob. We can write this state
          generically as <br />
          <M t="\ket{\phi} = a \ket{0} + b \ket{1}" />
          <br />
          Alice doesn’t know a or b. This is a physical qubit that exists in her
          lab.
          <br />
          Bob is across the hall (or the country, or the other side of a large
          quantum computer).
          <br /> <br /> Here's the question: How can Alice get her mystery state
          to Bob? <br />
          One option would be for her to put her qubit in a box and ship it to
          Bob. But qubits are fragile (we need to keep them isolated from their
          environment). This might be expensive or impractical.
          <br />
        </Prose>
      ),
      continue: {
        label: "Got it",
      },
    }),

    section({
      name: "singlemeasure",
      body: (m) => (
        <>
          <Toggle
            model={m.singlemeasure}
            choices={[
              ["yes", "Yes"],
              ["no", "No"],
            ]}
            label={
              <Prose>
                Could Alice make a single measurement on this mystery state to
                gain enough information that she can send to Bob, so that Bob
                can reconstruct this state in his lab?
              </Prose>
            }
          />

          <TextBox
            model={m.singlemeasureExplain}
            label={<Prose>Briefly explain,</Prose>}
          />
        </>
      ),
    }),

    section({
      when: (r) => r.singlemeasure?.selected === "yes",

      name: "singlemeasurestill",

      body: (m) => (
        <Toggle
          model={m.singlemeasurestill}
          choices={[
            ["yes", <>Yes, it remains (unaffected).</>],
            ["no", <>No, it has collapsed to either a 0 or 1.</>],
          ]}
          label={
            <Prose>
              If Alice makes a measurement, is the mystery state still available
              for further measurements?
            </Prose>
          }
        />
      ),

      guidance: {
        nextMessage: (responses) => {
          if (responses?.singlemeasurestill?.selected === "yes") {
            return "yes";
          }
          return "no";
        },
        messages: {
          yes: {
            body: (
              <Guidance.Disagree>
                Any time you measure a superposition state (like the mystery
                state), that state collapses, it is gone. All you have is a 0 or
                1 outcome, but you no longer have access to the original state.
              </Guidance.Disagree>
            ),
            onContinue: "nextSection",
          },

          no: {
            body: (
              <Guidance.Agree>
                Right. If Alice measures the mystery state, it collapses to
                either a 0 or a 1, and she can no longer access the original
                state.
              </Guidance.Agree>
            ),
            onContinue: "nextSection",
          },
        },
      },
    }),

    section({
      name: "setupresponse",
      body: (m) => (
        <>
          <Prose>
            {" "}
            Summary so far: If the mystery state had been a classical bit, then
            measuring would have worked just fine. Alice would learn whether her
            bit is a 0 or a 1 and could tell Bob. But with a quantum bit, if
            Alice makes a measurement, she disturbs the state. If she gets a 0
            as the result, then all she can say is that <M t="a " /> is nonzero,
            and the original state is destroyed. There is nothing she can do to
            get more specific information.
          </Prose>
        </>
      ),
      continue: {
        label: "Got it",
      },
    }),

    section({
      name: "setupsolve",
      body: (m) => (
        <>
          <Prose>
            <strong>
              We can solve Alice’s dilemma using a protocol called Quantum
              Teleportation.{" "}
            </strong>{" "}
            <br />
            It requires that Alice and Bob first share an entangled pair of
            qubits. That is, Alice and Bob each need one particle of a
            two-particle entangled state. In our case, Alice and Bob will share
            the Bell state: <br />
            <M t="\ket{\beta_{00}} = {1\over \sqrt{2}} (\ket{00} + \ket{11}) " />
            <br />
            Alice will get the first qubit (denoted by the left element in each
            ket) and Bob will take the second.
          </Prose>
        </>
      ),
    }),

    section({
      name: "measureentangle",
      body: (m) => (
        <>
          {" "}
          <Prose>
            {" "}
            Consider the entangled state <M t="\ket{\beta_{00}}" /> for a
            moment. If Alice measures her qubit, she has a 50% chance of
            measuring a 0 and a 50% chance of measuring a 1. (Do you agree?)
          </Prose>
          <ChooseOne
            model={m.measureentangle}
            label={
              <Prose>
                If she happens to measure 0, what is Bob’s state after her
                measurement?
              </Prose>
            }
            choices={[
              ["a", <M t=" \ket{0}" />],
              ["b", <M t=" \ket{1}" />],
              ["c", <M t=" \frac{1}{\sqrt{2}}(\ket{0} + \ket{1})" />],
              ["d", "Something else, it's more complicated"],
              ["e", "It's ill-defined or ambiguous"],
            ]}
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
                  responses?.measureentangle?.selected === "a"
                    ? "agree"
                    : "disagree"
                }
              >
                {responses?.measureentangle?.selected !== "a" ? (
                  <p>
                    Look again at state{" "}
                    <M t="\ket{\beta_{00}} = {1\over \sqrt{2}}(\ket{00}+\ket{11})" />
                    . It is entangled. If Alice measures <M t="0" />, she has
                    collapsed the state, and Bob is sure to posses state
                    <M t="\ket{0}. " /> <br />
                    (If this still seems very confusing to you, you might want
                    to take a moment to look at a precursor Tutorial, the one
                    titled "CNOT and Entanglement"))
                  </p>
                ) : (
                  <p>
                    Right. The state <M t="\ket{\beta_{00}}" />
                    is entangled. If Alice measures <M t="0, " /> Bob is sure to
                    possess state <M t="\ket{0}," />
                  </p>
                )}
              </Guidance.Dynamic>
            ),
            onContinue: "nextSection",
          },
        },
      },

      // guidance: {
      //   nextMessage: (responses) => {
      //     if (responses?.measureentangle?.selected === "a") {
      //       return "a";
      //     }
      //     return "nota";
      //   },
      //   messages: {
      //     a: {
      //       body: (
      //         <Guidance.Agree>
      //           Right. The state <M t="\ket{\beta_{00}}" />
      //           is entangled. If Alice measures <M t="0, " /> Bob is sure to
      //           possess state <M t="\ket{0}," />
      //         </Guidance.Agree>
      //       ),
      //       onContinue: "nextSection",
      //     },

      //     nota: {
      //       body: (
      //         <Guidance.Disagree>
      //           Look again at state{" "}
      //           <M t="\ket{\beta_{00}} = {1\over \sqrt{2}}(\ket{00}+\ket{11})" />
      //           . It is entangled. If Alice measures <M t="0" />, she has
      //           collapsed the state, and Bob is sure to posses state
      //           <M t="\ket{0}. " /> <br />
      //           (If this still seems very confusing to you, you might want to
      //           take a moment to look at a precursor Tutorial, the one titled
      //           "CNOT and Entanglement")
      //         </Guidance.Disagree>
      //       ),
      //       onContinue: "nextSection",
      //     },
      //   },
      // },
    }),
  ],
}));
