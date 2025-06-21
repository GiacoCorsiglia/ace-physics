import { Callout, Decimal, Guidance, Image, M, Prose } from "@/components";
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
          <M t="|\psi_1\rangle = \frac{1}{\sqrt{2}}(a|000\rangle + a|011\rangle + b|110\rangle + b|101\rangle)" />
          <br />
          Also for reference, recall the actions of the Hadamard gate:
          <br />
          <M t="H|0\rangle = \frac{1}{\sqrt{2}}(|0\rangle + |1\rangle)\ " />
          and
          <M t="H|1\rangle = \frac{1}{\sqrt{2}}(|0\rangle - |1\rangle)" />.
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
                <M t="\ket{\psi_1}" />, has four terms (see the top of the
                page). <br />
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
              <M t="|\psi_1\rangle = \frac{1}{\sqrt{2}}(a|000\rangle + a|011\rangle + b|110\rangle + b|101\rangle)" />
              <br />
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
                is shown in the text just below the figure above. You need to
                act the Hadamard on the first qubit (only), leaving the other
                two qubits unaltered. (We reminded you of what a Hadamard does
                to a single qubit at the top of the page.)
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

    // section({
    //   name: "whatisx2q",
    //   body: (m) => (
    //     <ChooseOne
    //       model={m.whatisx2}
    //       choices={[
    //         ["0", <M t="0" />],
    //         ["1", <M t="1" />],
    //         ["else", <M t="{\rm Something\ else}" />],
    //       ]}
    //       label={
    //         <Prose>
    //           <p>
    //             {" "}
    //             Our answer looks like this: <br />
    //             <M t="\ket{\psi_1}  = \frac{1}{\sqrt{2}} (a\ket{000} + a\ket{01x} + b\ket{110} + b\ket{y})" />
    //             <br /> Hopefully what you wrote matches it... If your answer is
    //             very different, try again. Bit if you are largely matching this
    //             form, let's check in. What is the missing <M t="x" /> in the
    //             line above?
    //             <br />
    //           </p>
    //         </Prose>
    //       }
    //     />
    //   ),
    //   // COMMENT:  If what they wrote doesn't match at all, can/should we have some sort of HINT button before they try to answer the question above about x?
    //   guidance: {
    //     nextMessage: () => "dynamicAnswer",
    //     messages: {
    //       dynamicAnswer: {
    //         body: ({ responses }) => (
    //           <Guidance.Dynamic
    //             status={
    //               responses?.whatisx2?.selected === "1" ? "agree" : "disagree"
    //             }
    //           >
    //             {responses?.whatisx2?.selected !== "1" ? (
    //               <p>
    //                 Recall
    //                 <M t="|\psi_0\rangle = \frac{1}{\sqrt{2}}(a|000\rangle + a|011\rangle + b|100\rangle + b|111\rangle)" />
    //                 <br /> A CNOT gate will flip the second qubit if (and only
    //                 if ) the first qubit is a 1. In the second term,
    //                 <M t=" a\ket{011} " />, the first qubit is a 0, so nothing
    //                 happens to the term at all. (The third bit, in particular,
    //                 is not acted on by any gate - it just goes along for the
    //                 ride)
    //                 <br />
    //                 You are welcome to change your answer above.
    //               </p>
    //             ) : (
    //               <p>
    //                 Right. A CNOT gate will flip the second qubit if (and only
    //                 if ) the first qubit is a 1. In the second term,
    //                 <M t=" a\ket{011} " />, the first qubit is a 0, so nothing
    //                 happens to the term at all. (The third bit, in particular,
    //                 is not acted on by any gate - it just goes along for the
    //                 ride) Thus, x = 1.
    //               </p>
    //             )}
    //           </Guidance.Dynamic>
    //         ),
    //         onContinue: "nextSection",
    //       },
    //     },
    //   },
    // }),

    // section({
    //   name: "whatisy2q",
    //   body: (m) => (
    //     <ChooseOne
    //       model={m.whatisy2}
    //       label={
    //         <Prose>
    //           <p>
    //             What is <M t="\ket{y}" />?
    //             <br />
    //           </p>
    //         </Prose>
    //       }
    //       choices={[
    //         ["000", <M t="\ket{000}" />],
    //         ["001", <M t="\ket{001}" />],
    //         ["010", <M t="\ket{010}" />],
    //         ["011", <M t="\ket{011}" />],
    //         ["100", <M t="\ket{100}" />],
    //         ["101", <M t="\ket{101}" />],
    //         ["110", <M t="\ket{110}" />],
    //         ["111", <M t="\ket{111}" />],
    //       ]}
    //     />
    //   ),

    //   guidance: {
    //     nextMessage: () => "dynamicAnswer",
    //     messages: {
    //       dynamicAnswer: {
    //         body: ({ responses }) => (
    //           <Guidance.Dynamic
    //             status={
    //               responses?.whatisy2?.selected === "101" ? "agree" : "disagree"
    //             }
    //           >
    //             {responses?.whatisy2?.selected !== "101" ? (
    //               <p>
    //                 In the final term of
    //                 <M t="\ket{\psi_0}, {\rm namely\ } b \ket{111}" />, notice
    //                 that the first qubit is a 1, so the second qubit is flipped.
    //                 But the third qubit is not acted on by any gate, so remains
    //                 unaltered
    //                 <br />
    //                 You are welcome to change your answer above.
    //               </p>
    //             ) : (
    //               <p>
    //                 Right. In the final term of
    //                 <M t="\ket{\psi_0}, {\rm namely\ } b \ket{111}" />, the
    //                 first qubit is a 1, so the second qubit is flipped. But the
    //                 third qubit is not acted on by any gate, it remained
    //                 unaltered
    //               </p>
    //             )}
    //           </Guidance.Dynamic>
    //         ),
    //         onContinue: "nextSection",
    //       },
    //     },
    //   },
    // }),

    // section({
    //   name: "building1Outro",
    //   body: (
    //     <Prose>
    //       Summary so far: after this first stage:
    //       <Image src={fig2} alt="circuit diagram C-1" />
    //       <br />
    //       We found the 3-qubit output state so far is:
    //       <br />
    //       <M t="|\psi_1\rangle = \frac{1}{\sqrt{2}}(a|000\rangle + a|011\rangle + b|110\rangle + b|101\rangle)" />
    //     </Prose>
    //   ),
    //   continue: {
    //     label: "I’m ready for the next gates!",
    //   },
    // }),
  ],
}));
