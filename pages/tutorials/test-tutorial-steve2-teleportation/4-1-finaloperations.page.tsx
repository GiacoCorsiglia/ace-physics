import { ChooseOne, Guidance, Image, M, Prose, Toggle } from "@/components";
import { page } from "@/tutorial";
import fig5 from "./assets/D-fig-5.png";

import setup from "./setup";

export default page(setup, ({ section, hint }) => ({
  name: "finaloperations1",
  label: "Final Operations on Bob's state (Part 1)",
  answers: "checked-all",

  sections: [
    section({
      name: "finaloperationsIntro",
      body: (
        <Prose>
          Recap: here's the state just before Alice's measurements:
          {/* (with terms
          reorganized so we can easily spot the 4 possible measurement outcomes
          for Alice to the left of the tensor product):  */}
          <br />
          <M
            t="\ket{\psi_2} = \frac{1}{2}(\ \ \ \ket{00} \otimes (a\ket{0} + b\ket{1})
          \ + \ket{01} \otimes (a\ket{1} + b\ket{0})"
          />
          <br />
          <M
            t="\qquad \qquad + \ket{10} \otimes (a\ket{0} - b\ket{1})
          + \ket{11} \otimes (a\ket{1} - b\ket{0}) "
          />
          <br />
          Alice now measures both her qubits, collapsing the state. <br />
          Bob’s resulting single-qubit state depends on what Alice has measured.
          <br /> <M t="{\bf Next\  major\ step}" /> : Our teleportation protocol
          has Alice send (by classical means, e.g. text or email) the outcome of
          her pair of measurements: <br />
          (M1 and M2 can each be 0 or 1.) So Alice sends either 00, 01, 10, or
          11. <br />
          In each case, Bob will then apply a set of gates to his qubit, to
          result in the mystery starting state <M t="\ket{\phi}" />. <br />
          Our final task is to work out what these gates are. The complete
          picture looks like this (we will explore the two new unfamiliar
          diagram elements below):
          <Image src={fig5} alt="circuit diagram D-5" />
        </Prose>
      ),
      continue: {
        label: "I’m ready to move on!",
      },
    }),
    section({
      name: "Case1recap",
      body: (
        <Prose>
          <strong> Case 1: </strong> Alice measures and sends the message 00.
          <br /> We already worked out (and it is visually apparent by looking
          at the first term in the top row of <M t="|\psi_2\rangle" /> above)
          that if Alice measured
          <M t="|00\rangle" />, then Bob’s qubit collapsed to the state
          <M t="a|0\rangle + b|1\rangle" />. <br /> <br />
          Alice sent "00", meaning her two measuresments were M1 = 0 and M2 = 0.
          <br /> Look carefully at the diagram (bottom right portion), this may
          be a novel representation for you. Try to make sense of what it shows:
          the two gates Bob acts on his qubit are determined by Alice's
          measurements!
          <br /> Bob acts
          <M t="X^{M2} = X^0 = I" /> and then <M t="Z^{M1} = Z^0 = I" />, a
          sequence of two identity gates. <br /> By acting two identities
          (effectively doing nothing), Bob's qubit remains in the state
          <M t="a|0\rangle + b|1\rangle" />; but this is the original mystery
          state
          <M t="|\phi\rangle" /> and teleportation was successful!
        </Prose>
      ),
      continue: {
        label: "Got it!",
      },
    }),

    section({
      name: "Case2",
      body: (m) => (
        <>
          <Prose>
            <strong> Case 2: </strong>
            Alice measures and sends the message 01.
            <br /> Recall from the top of the page:
            <br />
            <M
              t="\ket{\psi_2} = \frac{1}{2}(\ \ \ \ket{00} \otimes (a\ket{0} + b\ket{1})
          \ + \ket{01} \otimes (a\ket{1} + b\ket{0})"
            />
            <br />
            <M
              t="\qquad \qquad + \ket{10} \otimes (a\ket{0} - b\ket{1})
          + \ket{11} \otimes (a\ket{1} - b\ket{0}) "
            />
            <br />
          </Prose>
          <ChooseOne
            model={m.Case01Bobstate}
            choices={[
              ["a", <M t="a \ket{0} + b \ket{1}" />],
              ["b", <M t="a \ket{1} + b \ket{0}" />],
              ["c", <M t="a \ket{0} - b \ket{1}" />],
              ["d", <M t="a \ket{1} - b \ket{0}" />],
              ["other", "It's something else"],
            ]}
            label={
              <Prose>
                <p>
                  Using the second term in <M t="\ket{\psi_2}" />, write down
                  Bob’s single-qubit state, <M t="\ket{\psi_3}" />, just after
                  Alice has measured 01.
                  <br />
                </p>
              </Prose>
            }
          />
          <ChooseOne
            model={m.Case01Bobgate}
            choices={[
              ["I", "No gate needed (i.e. just an I gate)"],
              ["X", "An X gate"],
              ["Z", "A Z gate"],
              ["XZ", "An XZ combination"],
              ["ZX", "A ZX combination"],
              ["none", "None of the above is correct. It's complicated"],
              ["impossible", "No gate combination can work"],
            ]}
            label={
              <Prose>
                <p>
                  Without looking at the figure (just using your answer to the
                  previous question), figure out a single (or pair of) gate(s)
                  that would transform it into the desired (mystery) state
                  <M t="a \ket{0} + b \ket{1}" />
                </p>
              </Prose>
            }
          />
          <Toggle
            model={m.Case01Bobverify}
            choices={[
              ["matches", "It matches"],
              ["confused", "I'm confused"],
            ]}
            label={
              <Prose>
                <p>
                  The figure tells us that Bob will act <M t="Z^{M1} X^{M2}" />
                  on his qubit. Verify that this matches exactly what you
                  answered in the previous question.
                  <br />
                </p>
              </Prose>
            }
          />
        </>
      ),
      hints: [
        hint({
          name: "Case2hint",
          label: "Can I just get the answers?",
          body: (
            <Prose>
              <p>
                Looking at state <M t="\ket{\psi_2}" />, if Alice measures
                <M t="\ket{\psi_2}" />, we are looking at the second term. Bob's
                qubit is the last one, which appears after the tensor product.
                Bob must have <M t="a\ket{1} + b\ket{0}" />
                (which we note IS properly normalized, since |a|2 + |b|2 = 1).{" "}
                <br />
                As for what gates to act, this is a single qubit, and the X gate
                is the one that flips 0 to 1 and vice versa. Looks like that
                does the trick.
              </p>
            </Prose>
          ),
        }),
      ],
      // COMMENT:  Is that hint ok? Too much? It' really the answer! But we have no
      // other way to "escape" if the student doesn't know what to do. Maybe there's a better
      // way to code this!
      guidance: {
        nextMessage: () => "dynamicAnswer",
        messages: {
          dynamicAnswer: {
            body: ({ responses }) => (
              <Guidance.Dynamic
                status={
                  responses?.Case01Bobstate?.selected === "b" &&
                  responses?.Case01Bobgate?.selected === "X" &&
                  responses?.Case01Bobverify?.selected === "matches"
                    ? "agree"
                    : "disagree"
                }
              >
                {responses?.Case01Bobstate?.selected === "b" &&
                responses?.Case01Bobgate?.selected === "X" &&
                responses?.Case01Bobverify?.selected === "matches" ? (
                  <p>
                    Good job, you got it all! <br />
                    Just to summarize: If Alice measures
                    <M t="\ket{01}" />, we are looking at the last term in the
                    top line of
                    <M t="\ket{\psi_2}" /> above. Bob's qubit appears after the
                    tensor product symbol: he has state{" "}
                    <M t="a\ket{1} + b\ket{0}" />
                    <br /> This is already properly normalized, since{" "}
                    <M t="|a|^2 + |b|^2 =1" />
                    . <br />
                    As for what gates to act, this is a single qubit, and the X
                    gate is the one that flips 0 to 1 and vice versa. Looks like
                    that does the trick, turning Bob's state into the original
                    mystery state <M t="a\ket{0} + b\ket{1}" /> .
                  </p>
                ) : responses?.Case01Bobverify?.selected === "confused" ? (
                  <p>
                    {/* Getting here means that you selected "confused",
                     no matter WHAT else you selected! */}
                    You selected that you feel confused about that diagram.{" "}
                    <br />
                    Remember, we are assuming we're in a situation where Alice
                    has measured 01 (i.e. that means M1=0, and M2=1). <br />
                    Bob's gate sequence from the diagram is thus: <br /> first
                    hit his qubit with
                    <M t="X^{M2} = X^1 = X\ " /> followed by
                    <M t="Z^{M1} = Z^0 = I\ " />. <br />
                    That's an X followed by identity gate, i.e. just act an X
                    gate.
                    <br /> Look at your answers to the first two questions and
                    ask yourself if you are being consistent: does hitting
                    whatever you decided Bob's qubit is with an X gate transform
                    his qubit to state <M t="a \ket{0} + b \ket{1}" />? (If you
                    change your answer from "I'm confused" to "It matches" we
                    can give you more feedback!)
                  </p>
                ) : responses?.Case01Bobstate?.selected !== "b" ? (
                  <p>
                    {/* Getting here means that you did NOT select confused!
                    You got the state wrong! */}
                    We disagree with your answer for Bob's qubit state.
                    <br /> Remember that we are in the Case where we assume
                    Alice has measured 01. Look at the expression for{" "}
                    <M t="\ket{\psi_2}" />
                    and find the term with 01 to the left of the tensor product.
                    What remains after the tensor product is Bob's state!
                  </p>
                ) : (
                  <p>
                    {" "}
                    {/* I believe the only way to get here is to be NOT confused, AND you have Bob's state right,
                    so you just picked the wrong gate*/}
                    We agree with your choice of Bob's state,
                    <M t="a\ket{1} + b\ket{0}" />. But, that is not the original
                    mystery state, <M t="\ket{\phi} = a\ket{0} + b\ket{1}" />.
                    Looks like the 0 and 1 have been swapped. What gate will fix
                    this, converting your answer for Bob's state into the
                    desired (original) state <M t="\ket{\phi}" /> ?
                    <br /> Feel free to try again.
                  </p>
                )}
              </Guidance.Dynamic>
              // We need better feedback, it's just tedious. Can Giaco show us a better way?
              // IMPORTANT:  If they are stuck,
              // we should generate some sort of "tell me the answer" button, how to do that?
            ),

            onContinue: "nextSection",
          },
        },
      },
    }),

    // Wrap up the page
    //
    //
    //
  ],
}));
