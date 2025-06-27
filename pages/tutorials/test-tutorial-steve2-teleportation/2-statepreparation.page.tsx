import {
  Callout,
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
import { PencilIcon } from "@primer/octicons-react";

import fig1 from "./assets/B-fig-1.png";
import setup from "./setup";

export default page(setup, ({ section, hint }) => ({
  name: "statepreparation",
  label: "State Preparation",
  answers: "checked-all",

  sections: [
    section({
      name: "statePrepIntro",
      body: (
        <Prose>
          Remember that Alice has two qubits in her possession, a mystery state
          <M t="\ket{\phi} = a \ket{0} +  b \ket{1} " /> and also the first
          qubit of the entangled pair she shares with Bob. <br /> Bob has just
          one qubit, the second qubit of that shared, entangled Bell pair.
        </Prose>
      ),
      continue: {
        label: "Let’s do it",
      },
    }),

    section({
      name: "writeinitialstate",
      body: () => (
        <>
          <Prose>
            <p>
              We will treat the mystery state as the first qubit of our full
              initial three-qubit state which is:{" "}
              <M t="\ket{\phi} \otimes \ket{\beta_{00}}" /> <br />
              (So, in the circuit diagram, we put the mystery qubit at the top,
              the first qubit)
              <Image src={fig1} alt="circuit diagram 1" />
              <br />
              We need to write the full initial (input) 3 qubit state in Dirac
              notation.
            </p>
          </Prose>

          <Callout color="blue" iconLeft={<PencilIcon />}>
            Try it for yourself! Write out the initial state on scrap paper.
          </Callout>
        </>
      ),
      hints: [
        hint({
          name: "initialstatehint1",
          label: "Can I get a little help?",
          body: (
            <Prose>
              <p>
                The mystery state is{" "}
                <M
                  t="\ket{\phi} = a \ket{0} + b
                      \ket{1}"
                />
                , the entangled pair is <br />
                <M
                  t="\ket{\beta_{00}} =
                      {1\over\sqrt{2}}(\ket{00}+\ket{11})"
                />
                , the full initial state is{" "}
                <M
                  t="\ket{\phi} \otimes
                      \ket{\beta_{00}}"
                />
                .
                <br />
                When you write this out in Dirac notation, use the distributive
                property of the tensor product. This gives a sum of terms (how
                many?) each of which looks like
                <M t="{\rm some\  number} \ket{xyz}" />, where
                <M t="x,y, {\rm and\ z}\ " /> are each 0 or 1.
              </p>
            </Prose>
          ),
        }),
      ],
      continue: {
        label: "I wrote it out",
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
                We asked for the full initial (input) 3 qubit state in Dirac
                notation. Our answer looks like this: <br />
                <M t="\ket{\phi} \otimes \ket{\beta_{00}} = \frac{1}{\sqrt{2}} (a\ket{000} + a\ket{01x} + b\ket{100} + b\ket{y})" />
                <br /> Hopefully what you wrote matches it... To check, what is
                the missing <M t="x" /> in the line above?
                <br />
              </p>
            </Prose>
          }
        />
      ),
      // COMMENT:  If what they wrote doesn't match at all, can/should we have some sort of HINT button before they try to answer the question above about x?
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
                    this results in a 3-qubit state. Recall that{" "}
                    <M t="\ket{\beta_{00}} = {1\over\sqrt{2}}(\ket{00}+\ket{11})" />
                    <br />
                    The very first term in the answer arose from{" "}
                    <M t="a \ket{0} \otimes \ket{00}" />, and the second term
                    (with the missing "x"), comes from{" "}
                    <M t="a \ket{0} \otimes \ket{11}" />, which becomes{" "}
                    <M t="a \ket{011}." /> (So, what is x in{" "}
                    <M t="a\ket{01x}" />
                    ?) )
                    <br />
                    You are welcome to change your answer above.
                  </p>
                ) : (
                  <p>
                    Right. When you tensor product a single qubit with a 2-qubit
                    state, this results in a 3-qubit state. Recall that{" "}
                    <M t="\ket{\beta_{00}} = {1\over\sqrt{2}}(\ket{00}+\ket{11})" />
                    <br />
                    The very first term in the answer arose from{" "}
                    <M t="a \ket{0} \otimes \ket{00}" />, and the second term
                    (with the missing "x"), comes from{" "}
                    <M t="a \ket{0} \otimes \ket{11}" />, which becomes{" "}
                    <M t="a \ket{011}" />. (Thus, <M t="x=1" />
                    .)
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
        />
      ),

      guidance: {
        nextMessage: () => "dynamicAnswer",
        messages: {
          dynamicAnswer: {
            body: ({ responses }) => (
              <Guidance.Dynamic
                status={
                  responses?.whatisy?.selected === "111" ? "agree" : "disagree"
                }
              >
                {responses?.whatisy?.selected !== "111" ? (
                  <p>
                    The third term in the full state is{" "}
                    <M t="b \ket{1} \otimes \ket{00}" />, which becomes{" "}
                    <M t="b \ket{100}" />. The fourth term is{" "}
                    <M t="b \ket{1} \otimes \ket{11}" />, which becomes{" "}
                    <M t="b \ket{111}" />. Feel free to change your answer
                    above.
                  </p>
                ) : (
                  <p>
                    Right. The third term in the full state is{" "}
                    <M t="b \ket{1} \otimes \ket{00}" />, which becomes{" "}
                    <M t="b \ket{100}" />. The fourth term is{" "}
                    <M t="b \ket{1} \otimes \ket{11}" />, which becomes{" "}
                    <M t="b \ket{111}" />.
                  </p>
                )}
              </Guidance.Dynamic>
            ),
            onContinue: "nextSection",
          },
        },
      },
    }),

    // section({
    //   name: "summary1",
    //   body: (m) => (
    //     <>
    //       <Prose>
    //         Summary so far: The starting 3-qubit initial state can be written
    //         as: <br />
    //         <M t="\phi \otimes \beta_{00} = \frac{1}{\sqrt{2}} (a \ket{000} + a \ket{011} + b \ket{100} + b \ket{111})" />
    //         <br /> Did you get all the details correct? (If you disagree, please
    //         take the time now to work it out.)
    //       </Prose>
    //     </>
    //   ),
    //   continue: {
    //     label: "Got it",
    //   },
    // }),

    section({
      name: "measure1",
      body: (m) => (
        <>
          <Decimal
            model={m.measure1}
            label={
              <Prose>
                Summary so far: The starting 3-qubit initial state can be
                written as: <br />
                <M t="\phi \otimes \beta_{00} = \frac{1}{\sqrt{2}} (a \ket{000} + a \ket{011} + b \ket{100} + b \ket{111})" />
                <br /> Did you get all the details correct? (If you disagree,
                please take the time now to work it out.) <br />
                <br />
                Suppose Alice now measures both of her qubits. How many
                different possible outcomes can she get?
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
                such a 2-qubit measurement? <br /> Check your calculation then
                click “Check in Again”.
              </Guidance.Disagree>
            ),
            onContinue: "nextMessage",
          },
          one: {
            body: (
              <Guidance.Disagree>
                Remember that we are measuring two qubits, each of which can be
                0 or 1. Can you simply list out all the possible outcomes for
                such a 2-qubit measurement? <br /> Check your calculation then
                click “Check in Again”.
              </Guidance.Disagree>
            ),
            onContinue: "nextMessage",
          },
          incorrect: {
            body: (
              <Guidance.Disagree>
                We disagree with your answer. Remember that we are measuring two
                qubits, each of which can be 0 or 1. Can you simply list out all
                the possible outcomes for such a 2-qubit measurement? <br />
                Check your calculation then click “Check in Again”.
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
    section({
      name: "alice00whatisbobq",
      body: (m) => (
        <ChooseOne
          model={m.alice00whatisbob}
          label={
            <Prose>
              <p>
                Reminder: The starting 3-qubit initial state can be written as:{" "}
                <br />
                <M t="\phi \otimes \beta_{00} = \frac{1}{\sqrt{2}} (a \ket{000} + a \ket{011} + b \ket{100} + b \ket{111})" />
                <br />
                If Alice were to measure her 2 qubits and get 00, what state
                would Bob have?
                <br />
              </p>
            </Prose>
          }
          choices={[
            ["0", <M t="\ket{0}" />],
            ["1", <M t="\ket{1}" />],
            ["plus", <M t="{1\over{\sqrt{2}}}(\ket{0}+\ket{1})" />],
            ["other", <M t="{\rm Something\ entirely\ different}" />],
          ]}
        />
      ),

      guidance: {
        nextMessage: () => "dynamicAnswer",
        messages: {
          dynamicAnswer: {
            body: ({ responses }) => (
              <Guidance.Dynamic
                status={
                  responses?.alice00whatisbob?.selected === "0"
                    ? "agree"
                    : "disagree"
                }
              >
                {responses?.alice00whatisbob?.selected !== "0" ? (
                  <p>
                    There are four terms in the state, but only one begins with
                    00, namely the term <M t="\ket{000}" /> . Bob has the last
                    bit, so if Alice measured <M t="\ket{00}" /> , then Bob’s
                    qubit collapsed to the (normalized) state <M t="\ket{0}" />{" "}
                    . Feel free to change your answer above.
                  </p>
                ) : (
                  <p>
                    Right. There are four terms in the state, but only one
                    begins with 00, namely the term <M t="\ket{000}" /> . Bob
                    has the last bit, so if Alice measured <M t="\ket{00}" /> ,
                    then Bob’s qubit collapsed to the (normalized) state{" "}
                    <M t="\ket{0}" /> .
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
      name: "aliceotherq",
      body: (m) => (
        <ChooseOne
          model={m.aliceother}
          label={
            <Prose>
              <p>
                Each of the four terms in our 3-qubit initial state <br />
                <M t="\phi \otimes \beta_{00} = \frac{1}{\sqrt{2}} (a \ket{000} + a \ket{011} + b \ket{100} + b \ket{111})" />
                <br />
                begins with a unique outcome for the first two bits, which are
                all that Alice has access to:
                <M t="\ket{00}, \ket{01}, \ket{10}, {\rm or} \ket{11}" />.{" "}
                <br />
                Each of those four terms results in just one option for the
                third (Bob’s) qubit. As one concrete example, our previous
                question showed that if Alice measures 00, then Bob must have
                the state
                <M t="\ket{0}" />
                <br />
                <br />
                What <M t="{\it other\ }" /> measurement outcome could Alice get
                that would also leave Bob’s qubit in the state <M t="\ket{0}" />{" "}
                ?
              </p>
            </Prose>
          }
          choices={[
            ["01", <M t="\ket{01}" />],
            ["10", <M t="\ket{10}" />],
            ["11", <M t="\ket{11}" />],
            ["none", <M t="{\rm Nothing\ else\ is\ possible}" />],
          ]}
          // COMMENT:  Should we add a "More than one of these" (or, select more than one) option?
        />
      ),

      guidance: {
        nextMessage: () => "dynamicAnswer",
        messages: {
          dynamicAnswer: {
            body: ({ responses }) => (
              <Guidance.Dynamic
                status={
                  responses?.aliceother?.selected === "10"
                    ? "agree"
                    : "disagree"
                }
              >
                {responses?.aliceother?.selected !== "10" ? (
                  <p>
                    Look at the full initial state. There is one (and only one)
                    other term that has a 0 for Bob’s bit, namely the 3rd one,{" "}
                    <M t="b\ket{100}" />. <br /> So if Alice measures{" "}
                    <M t="\ket{10}" />
                    , Bob’s qubit is also going to be in state <M t="\ket{0}" />
                    . <br /> Feel free to change your answer above.
                  </p>
                ) : (
                  <p>
                    Right. Looking at the full initial state. There is one (and
                    only one) other term that has a 0 for Bob’s bit, namely the
                    3rd one, <M t="b\ket{100}" />. <br />
                    So if Alice measures <M t="\ket{10}" />
                    , Bob’s qubit is also going to be in state <M t="\ket{0}" />
                    .
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
      name: "followupsectionBq",
      body: (m) => (
        <>
          <Toggle
            model={m.followupsectionB}
            choices={[
              ["yes", "Yes"],
              ["no", "No"],
            ]}
            label={
              <Prose>
                If Alice has measured her two qubits, and considering{" "}
                <M t="{\it only\  }" /> the initial setup described so far,
                would Bob then possess the mystery state (the one we called{" "}
                <M t="\ket{\phi} = a\ket{0} + b\ket{1}" /> above)?
              </Prose>
            }
          />

          <TextBox
            model={m.followupsectionBExplain}
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
                  responses?.followupsectionB?.selected === "yes"
                    ? "disagree"
                    : "agree"
                }
              >
                {responses?.followupsectionB?.selected !== "no" ? (
                  <p>
                    {" "}
                    Careful. So far - if Alice makes a measurement, the mystery
                    state is destroyed, and not sent to Bob. Bob would have
                    either 0 or 1, not the desired mystery superposition{" "}
                    <M t="\ket{\phi} = a\ket{0} + b\ket{1}" />. We do{" "}
                    <M t="{\it not\ }" /> yet have quantum teleportation from
                    Alice to Bob, but we are getting set up for it.
                  </p>
                ) : (
                  <p>
                    Right. So far - if Alice makes a measurement, the mystery
                    state is destroyed, and not sent to Bob. Bob would have
                    either 0 or 1, not the desired mystery superposition{" "}
                    <M t="\ket{\phi} = a\ket{0} + b\ket{1}" />. We do{" "}
                    <M t="{\it not\ }" /> yet have quantum teleportation from
                    Alice to Bob, but we are getting set up for it.
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
