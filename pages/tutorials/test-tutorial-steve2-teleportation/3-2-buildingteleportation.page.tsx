import {
  Callout,
  ChooseOne,
  Decimal,
  Guidance,
  Image,
  M,
  Prose,
  Toggle,
} from "@/components";
import { page } from "@/tutorial";
import { PencilIcon } from "@primer/octicons-react";
import fig3 from "./assets/C-fig-3.png";

import setup from "./setup";

export default page(setup, ({ section, hint }) => ({
  name: "buildingteleportation2",
  label: "Building a Teleportation Circuit (Part 2)",
  answers: "checked-all",

  sections: [
    section({
      name: "building2Intro",
      body: (
        <Prose>
          The next step in this protocol is to apply a Hadamard gate on just the
          top qubit.
          <Image src={fig3} alt="circuit diagram C-2" />
          <br />
          REMINDERS: <br />
          On the previous page, we found the 3-qubit state just before the
          Hadamard is
          <br />
          <M
            display
            t="|\psi_1\rangle = \frac{1}{\sqrt{2}}(a|000\rangle + a|011\rangle + b|110\rangle + b|101\rangle)"
          />
          Also for reference, recall the actions of the Hadamard gate:
          <br />
          <M t="H|0\rangle = \frac{1}{\sqrt{2}}(|0\rangle + |1\rangle)\ \ " />
          and
          <M t="\ H|1\rangle = \frac{1}{\sqrt{2}}(|0\rangle - |1\rangle)" />.
          <br />
        </Prose>
      ),
      continue: {
        label: "I’m ready!",
      },
    }),

    section({
      name: "ntermsafterH",
      body: (m) => (
        <>
          <Decimal
            model={m.ntermsafterH}
            label={
              <Prose>
                The full 3-qubit state just before the Hadamard,
                <M t="\ket{\psi_1}" />, has four terms (see the "Reminders"
                above).
                <br />
                How many terms do you expect the 3-qubit state to have after the
                Hadamard acts on the top qubit (i.e. in <M t="\ket{\psi_1}" />
                )?
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
          const measureresponse = r.ntermsafterH;

          if (measureresponse === undefined) {
            return null;
          }

          if (measureresponse === 8) {
            return "correct";
          } else if (measureresponse === 4) {
            return "four";
          } else if (measureresponse === 6) {
            return "six";
          } else {
            return "incorrect";
          }
        },
        messages: {
          correct: {
            body: (
              <Guidance.Agree>
                We agree with your answer! Hadamard acting on a single pure
                state turns it into a superposition of two states. So the
                Hadamard on qubit 1 here will double the number of terms.
              </Guidance.Agree>
            ),
            onContinue: "nextSection",
          },
          four: {
            body: (
              <Guidance.Disagree>
                We disagree with your answer. Hadamard acting on a single pure
                state turns it into a superposition of two states. So the
                Hadamard on qubit 1 will increase the number of terms. <br />{" "}
                Check your calculation then click “Check in Again”.
              </Guidance.Disagree>
            ),
            onContinue: "nextMessage",
          },
          six: {
            body: (
              <Guidance.Disagree>
                We disagree with your answer. Hadamard acting on a single pure
                state turns it into a superposition of two states. So the
                Hadamard on qubit 1 should alter the number of terms <br />{" "}
                Check your calculation then click “Check in Again”.
              </Guidance.Disagree>
            ),
            onContinue: "nextMessage",
          },
          incorrect: {
            body: (
              <Guidance.Disagree>
                We disagree with your answer. Hadamard acting on a single pure
                state turns it into a superposition of two states. So the
                Hadamard on qubit 1 here should exactly double the number of
                terms.
                <br />
                Check your calculation then click “Check in Again”.
              </Guidance.Disagree>
            ),
            onContinue: "nextMessage",
          },
        },
      },
    }),
    // If they couldn't get it right, it appears they do NOT get an explanation, they just move on.
    // Can this be fixed? I DID make the text in the "incorrect" box tell them the answer in words...

    section({
      name: "trypsi2",
      body: () => (
        <>
          <Prose>
            <p>
              {" "}
              The state just before the Hadamard is:
              <br />
              <M
                display
                t="|\psi_1\rangle = \frac{1}{\sqrt{2}}(a|000\rangle + a|011\rangle + b|110\rangle + b|101\rangle)"
              />
              Try to work out the full three-qubit state right after the
              Hadamard (labeled <M t="\ket{\psi_2}" /> in the figure above).
              (Hint: The state should have eight terms, so it's a little messy.
              Really try to write it down carefully on paper before moving on.)
            </p>
          </Prose>

          <Callout color="blue" iconLeft={<PencilIcon />}>
            Try it for yourself! Write out the initial state on scrap paper.
          </Callout>
        </>
      ),
      hints: [
        hint({
          name: "trypsi2hint",
          label: "Can I get a little help?",
          body: (
            <Prose>
              <p>
                The incoming state <M t="\ket{\psi_1}" />
                is shown above. You need to act the Hadamard on the first qubit
                (only), leaving the other two qubits unaltered. (We reminded you
                of what a Hadamard does to a single qubit at the top of the
                page.)
                {/* This hint may not be enough! Let's think about more explicit help  */}
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
      name: "whatisxpostH",
      body: (m) => (
        <>
          <ChooseOne
            model={m.whatisxpostHchoice}
            choices={[
              ["0", <M t="0" />],
              ["1", <M t="1" />],
              ["else", <M t="{\rm Something\ else}" />],
            ]}
            label={
              <Prose>
                <p>
                  {" "}
                  Our answer looks like this (there are 8 terms!): <br />
                  <M
                    display
                    t="\ket{\psi_2}  = \frac{1}{2} \bigl(\ a\ket{000} \ + \  a\ket{011}\  + \ b\ket{010} \ + \ b\ket{001}"
                  />
                  <M
                    display
                    t="\qquad\qquad  + a\ket{x00} + a\ket{111} \ \pm b\ket{110} \ - b\ket{y} \bigr)"
                  />
                  Hopefully what you wrote matches it... If your answer is very
                  different, try again. (You may have ordered terms differently
                  than we did, so look carefully) <br /> Assuming you are
                  largely matching this form, let's check in. <br /> What is the
                  missing <M t="x" /> in the line above?
                  <br />
                </p>
              </Prose>
            }
          />
          <Toggle
            model={m.whatissignpostH}
            choices={[
              ["plus", <M t="+" />],
              ["minus", <M t="-" />],
            ]}
            label={
              <Prose>
                <p>
                  {" "}
                  Is that <M t="\pm" /> in the seventh term of{" "}
                  <M t="\ket{\psi_2}" /> plus or minus?
                  <br />
                </p>
              </Prose>
            }
          />
        </>
      ),
      // COMMENT:  If what they wrote doesn't match at all, can/should we have some sort of HINT button before they try to answer the question above about x?
      guidance: {
        nextMessage: () => "dynamicAnswer",
        messages: {
          dynamicAnswer: {
            body: ({ responses }) => (
              <Guidance.Dynamic
                status={
                  responses?.whatisxpostHchoice?.selected === "1" &&
                  responses?.whatissignpostH?.selected === "minus"
                    ? "agree"
                    : "disagree"
                }
              >
                {responses?.whatisxpostHchoice?.selected === "1" &&
                responses?.whatissignpostH?.selected === "minus" ? (
                  <p>
                    Right. For each term in <M t="\ket{\psi_1}" />, we apply an
                    H gate to (just) the first qubit, splitting that term up
                    into two terms. We arranged things so that the second row is
                    always that second term. So the x term arises from the
                    second term of <br />
                    <M t="\ket{0} = \frac{1}{\sqrt{2}}(\ket{0} + \ket{1} " />,
                    giving <M t="x=1" />. (The 2nd and third bits remain
                    untouched.)
                    <br />
                    The sign question regards acting H on the leading
                    <M t="\ket{1}" /> in the term <M t="b\ket{110}" />, which
                    introduces a minus sign in the second row, i.e. from{" "}
                    <M t="b(\ket{010}-\ket{110}" />. So it's a negative sign.
                    {/* Recall
                    <M t="\ket{\psi_1}  = \frac{1}{\sqrt{2}} (a\ket{000} + a\ket{01x} + b\ket{110} + b\ket{y})" />
                    <br /> The Hadamard is acting only on the first (leading)
                    qubit. <br /> Since
                    <M t="H|0\rangle = \frac{1}{\sqrt{2}}(|0\rangle + |1\rangle)\ " />
                    the first term in <M t="\ket{\psi_1}" /> will generate two
                    terms after the H acts. The "x" we're looking for here
                    arises from the second one. */}
                  </p>
                ) : (
                  <p>
                    One or more of your responses is not correct. <br />
                    For each term in <M t="\ket{\psi_1}" />, we apply an H gate
                    to (just) the first qubit, splitting that term up into two
                    terms. We arranged things so that the second row is always
                    that second term. So the x term arises from the second term
                    of <br />
                    <M t="\ket{0} = \frac{1}{\sqrt{2}}(\ket{0} + \ket{1})\ " />
                    (The 2nd and third bits remain untouched.) <br /> The sign
                    question regards acting H on the leading
                    <M t="\ket{1}" /> in the term <M t="b\ket{110}" />, which
                    introduces a minus sign in the second row, i.e. from{" "}
                    <M t="b(\ket{010}-\ket{110}" /> <br />
                    You are welcome to change your answer and try again
                    {/* Recall
                    <M t="\ket{\psi_1}  = \frac{1}{\sqrt{2}} (a\ket{000} + a\ket{01x} + b\ket{110} + b\ket{y})" />
                    <br /> The Hadamard is acting only on the first (leading)
                    qubit. <br />
                    Since
                    <M t="H|0\rangle = \frac{1}{\sqrt{2}}(|0\rangle + |1\rangle)\ " />
                    the first term in <M t="\ket{\psi_1}" /> will generate two
                    terms after the H acts. The "x" we're looking for here
                    arises from the second one. Thus, x = 1. */}
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
      name: "whatisypostH",
      body: (m) => (
        <ChooseOne
          model={m.whatisypostH}
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
                  responses?.whatisypostH?.selected === "101"
                    ? "agree"
                    : "disagree"
                }
              >
                {responses?.whatisypostH?.selected !== "101" ? (
                  <p>
                    We started from <br />
                    <M
                      display
                      t="|\psi_1\rangle = \frac{1}{\sqrt{2}}(a|000\rangle + a|011\rangle + b|110\rangle + b|101\rangle)"
                    />
                    and we are acting H on the first qubit in each term.
                    <br />
                    The <M t="\ket{y}\ " />
                    term we're asking about here arises from acting H on the the
                    leading <M t="\ket{1}\ " />
                    in the term <M t="b\ket{101}" />, which yields
                    <M t="b ( \ket{001} - \ket{101}) " />. <br /> (Do you agree?
                    Remember that the H acts ONLY on the very first qubit){" "}
                    <br />
                    It is that very last term that we were looking for.
                    <br />
                    You are welcome to change your answer above.
                  </p>
                ) : (
                  <p>
                    Right. We started from <br />
                    <M
                      display
                      t="|\psi_1\rangle = \frac{1}{\sqrt{2}}(a|000\rangle + a|011\rangle + b|110\rangle + b|101\rangle)"
                    />
                    and we are acting H on the first qubit in each term.
                    <br />
                    The <M t="\ket{y}\ " />
                    term we're asking about here arises from acting H on the the
                    leading <M t="\ket{1}\ " />
                    in the term <M t="b\ket{101}" />, which yields
                    <M t="b ( \ket{001} - \ket{101}) " />. (Do you agree?){" "}
                    <br /> It is that very last term that we were looking for,{" "}
                    <M t="\ket{1010}" />.
                    {/* The <M t="\ket{y}\ " />
                    term arises from acting H on the the leading{" "}
                    <M t="\ket{1}\ " />
                    in the term <M t="b\ket{101}" />, which yields
                    <M t="b ( \ket{001} - \ket{101}) " />. (It is that last term
                    that we were looking for, <M t="\ket{1010}" />
                    ). */}
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
      name: "building2Outro",
      body: (
        <Prose>
          Putting it all together at this stage, we have found
          <br />
          <M
            display
            t="\ket{\psi_2} = \frac{1}{2}\bigl(\ \  a|000\rangle \ + a|011\rangle \ + b|010\rangle \ + b|001\rangle"
          />
          <M
            display
            t="\qquad \qquad +\  a|100\rangle + a|111\rangle - b|110\rangle - b|101\rangle \bigr)"
          />
          <br />
          Take one more look that you agree with all 8 terms. If you worked it
          out first on your own, it is likely that we have visually organized
          the terms differently than you did, so please check carefully that you
          agree on everything, including signs.
        </Prose>
      ),
      continue: {
        label: "I’m ready for the next gates!",
      },
    }),
  ],
}));
