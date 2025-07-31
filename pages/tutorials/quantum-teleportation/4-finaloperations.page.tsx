import { ChooseOne, Guidance, Image, M, Prose, Toggle } from "@/components";
import { page } from "@/tutorial";
import fig5 from "./assets/D-fig-5.png";

import setup from "./setup";

export default page(setup, ({ section, hint }) => ({
  name: "finaloperations",
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
            display
            t="\ket{\psi_2} = \frac{1}{2}\bigl(\   \ket{00} \otimes (a\ket{0} + b\ket{1})
          \ + \ \ket{01} \otimes (a\ket{1} + b\ket{0})"
          />
          <M
            display
            t="\qquad \qquad \ \  + \ket{10} \otimes (a\ket{0} - b\ket{1})
            \ + \ \ket{11} \otimes (a\ket{1} - b\ket{0})\ \bigr) "
          />
          Alice now measures both her qubits, collapsing the state. <br />
          Bob’s resulting single-qubit state depends on what Alice has measured.
          <br /> <br /> <M t="{\bf Next\  major\ step}" /> : Our teleportation
          protocol has Alice send (by classical means, e.g. text or email) the
          outcome of her pair of measurements: <br />
          (<M t="M_1\ " /> and <M t="M_2 " /> are the measurement values. They
          can each be 0 or 1.) <br /> So Alice sends either 00, 01, 10, or 11.{" "}
          <br />
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
          Alice sent "00", meaning her two measuresments were <M t="M_1=0\ " />
          and <M t="M_2=0. " />
          <br /> Look carefully at the diagram (bottom right portion), this may
          be a novel representation for you. Try to make sense of what it shows:
          the two gates Bob acts on his qubit are determined by Alice's
          measurements!
          <br /> Bob acts
          <M t="X^{M_2} = X^0 = I" /> and then <M t="Z^{M_1} = Z^0 = I" />, a
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
              display
              t="\ket{\psi_2} = \frac{1}{2}\bigl(\ \ \ \ket{00} \otimes (a\ket{0} + b\ket{1})
          \ + \ \ket{01} \otimes (a\ket{1} + b\ket{0})"
            />
            <M
              display
              t="\qquad \qquad \ + \ket{10} \otimes (a\ket{0} - b\ket{1})
         \  + \ \ket{11} \otimes (a\ket{1} - b\ket{0}) \bigr) "
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
                  The figure tells us that Bob will act{" "}
                  <M t="Z^{M_1} X^{M_2}" />
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
                <M t="\ket{01}" />, we must be looking at the second term. Bob's
                qubit is the last one, which appears after the tensor product.
                Bob must have <M t="a\ket{1} + b\ket{0}" />
                (which we note IS properly normalized, since{" "}
                <M t="|a|^2 + |b|^2 = 1" />
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
                    has measured 01 (i.e. that means <M t="M_1=0," /> and
                    <M t="M_2=1." /> ) <br />
                    Bob's gate sequence from the diagram is thus: <br /> first
                    hit his qubit with
                    <M t="X^{M_2} = X^1 = X\ " /> followed by
                    <M t="Z^{M_1} = Z^0 = I\ " />. <br />
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
                    <br /> Remember that we are in the case where we assume
                    Alice has measured 01. Look at the expression for{" "}
                    <M t="\ket{\psi_2}" />
                    and find the term with 01 to the left of the tensor product.
                    What remains after the tensor product is Bob's state!
                    <br /> You are welcome to change your answer above.
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
    section({
      name: "finaloperations2Intro",
      body: (
        <Prose>
          <Image src={fig5} alt="circuit diagram D-5" />
          Once again, we remind you of the state before measurement:
          <M
            display
            t="\ket{\psi_2} = \frac{1}{2}\bigl(\ \ \ \ket{00} \otimes (a\ket{0} + b\ket{1})
          \ + \ket{01} \otimes (a\ket{1} + b\ket{0})"
          />
          <M
            display
            t="\qquad \qquad + \ket{10} \otimes (a\ket{0} - b\ket{1})
          + \ket{11} \otimes (a\ket{1} - b\ket{0})\bigr) "
          />
          <br />
        </Prose>
      ),
      continue: {
        label: "I’m ready to move on!",
      },
    }),

    section({
      name: "Case3",
      body: (m) => (
        <>
          <Prose>
            <strong> Case 3: </strong>
            Suppose Alice measures and sends the message 10.
            <br />
          </Prose>
          <ChooseOne
            model={m.Case3Bobstate}
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
                  Write down Bob’s single-qubit state, <M t="\ket{\psi_3}" />,
                  just after Alice has measured 10.
                  <br />
                </p>
              </Prose>
            }
          />
          <ChooseOne
            model={m.Case3Bobgate}
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
                  The figure tells us that Bob will act{" "}
                  <M t="Z^{M_1} X^{M_2}\ " />
                  on his qubit. Which of the following options does this
                  correspond to?
                </p>
              </Prose>
            }
          />
          <Toggle
            model={m.Case3Bobverify}
            choices={[
              ["matches", "It matches"],
              ["confused", "I'm confused"],
            ]}
            label={
              <Prose>
                <p>
                  Confirm for yourself that the gate(s) you just chose will
                  indeed corretly transform Bob's qubit into the desired
                  (myster) state
                  <M t="\ket{\phi} = a\ket{0} + b \ket{1} " />
                  <br />
                </p>
              </Prose>
            }
          />
        </>
      ),
      hints: [
        hint({
          name: "Case3hint",
          label: "Can I just get the answers?",
          body: (
            <Prose>
              <p>
                Looking at state <M t="\ket{\psi_2}" />, if Alice measures
                <M t="\ket{10}" />, we must be looking at the third term. Bob's
                qubit is the part which appears after the tensor product. <br />{" "}
                Bob must have <M t="a\ket{0} - b\ket{1}, " />
                which we note is properly normalized, since
                <M t="|a|^2 + |b|^2 = 1" />.
                <br />
                As for what gate(s) to act, this is a single qubit. All that we
                need to do is flip the minus sign on the second term. The Z gate
                flips the phase of a <M t="\ket{1}" /> state. Looks like just
                that alone does the trick.
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
                  responses?.Case3Bobstate?.selected === "c" &&
                  responses?.Case3Bobgate?.selected === "Z" &&
                  responses?.Case3Bobverify?.selected === "matches"
                    ? "agree"
                    : "disagree"
                }
              >
                {responses?.Case3Bobstate?.selected === "c" &&
                responses?.Case3Bobgate?.selected === "Z" &&
                responses?.Case3Bobverify?.selected === "matches" ? (
                  <p>
                    Good job, you got it all! <br />
                    Just to summarize: If Alice measures
                    <M t="\ket{10}" />, we are looking at the first term in the
                    second line of
                    <M t="\ket{\psi_2}" /> above. <br /> Bob's qubit appears
                    after the tensor product symbol: state{" "}
                    <M t="a\ket{0} - b\ket{1}" />
                    <br /> This is already properly normalized, since{" "}
                    <M t="|a|^2 + |b|^2 =1" />
                    . <br />
                    As for what gates to act, this is a single qubit, and the Z
                    gate is the one that flips the phase of <M t="\ket{1}\ " />{" "}
                    states. <br /> That does the trick, turning Bob's state into
                    the original mystery state <br />{" "}
                    <M t="\ket{\phi} = a\ket{0} + b\ket{1}" /> .
                  </p>
                ) : responses?.Case3Bobverify?.selected === "confused" ? (
                  <p>
                    {/* Getting here means that you selected "confused",
                         no matter WHAT else you selected! */}
                    You selected that you feel confused about that diagram.{" "}
                    <br />
                    Remember, we are assuming we're in a situation where Alice
                    has measured 10 (i.e. that means <M t="M_1=1," /> and{" "}
                    <M t="M_2=0." /> ). <br />
                    Bob's gate sequence from the diagram is thus: <br /> first
                    hit his qubit with
                    <M t="X^{M_2} = X^0 = I\ " /> followed by
                    <M t="Z^{M_1} = Z^1 = Z\ " />. <br />
                    That's an identity gate followed by Z, i.e. just act a Z
                    gate.
                    <br /> Look at your answers to the first two questions and
                    ask yourself if you are being consistent: does hitting
                    whatever you decided Bob's qubit is with a Z gate transform
                    his qubit to state <M t="a \ket{0} + b \ket{1}" />? (If you
                    change your answer from "I'm confused" to "It matches" we
                    can give you more feedback!)
                  </p>
                ) : responses?.Case3Bobstate?.selected !== "c" ? (
                  <p>
                    {/* Getting here means that you did NOT select confused!
                        You got the state wrong! */}
                    We disagree with your answer for Bob's qubit state.
                    <br /> Remember that we are in the case where we assume
                    Alice has measured 10. Look at the expression for{" "}
                    <M t="\ket{\psi_2}" />
                    and find the term with 10 to the left of the tensor product.
                    What remains after the tensor product is Bob's state.
                    <br /> You are welcome to change your answer above.
                  </p>
                ) : (
                  <p>
                    {" "}
                    {/* I believe the only way to get here is to be NOT confused,
                    AND you have Bob's state right,
                        so you just picked the wrong gate*/}
                    We agree with your choice of Bob's state,
                    <M t="a\ket{0} - b\ket{1}" />. But, that is not the original
                    mystery state, <M t="\ket{\phi} = a\ket{0} + b\ket{1}" />.
                    Looks like the phase on the 2nd term is not right. What
                    (single) gate will fix this, converting your answer for
                    Bob's state into the desired (original) state{" "}
                    <M t="\ket{\phi}" /> ?
                    <br /> Feel free to try again.
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
      name: "Case4",
      body: (m) => (
        <>
          <Prose>
            <strong> Case 4: </strong> This is the final possibility. <br />
            Suppose Alice measures and sends the message 11.
            <br />
          </Prose>
          <ChooseOne
            model={m.Case4Bobstate}
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
                  Write down Bob’s single-qubit state, <M t="\ket{\psi_3}" />,
                  just after Alice has measured 11.
                  <br />
                </p>
              </Prose>
            }
          />
          <ChooseOne
            model={m.Case4Bobgate}
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
                  The figure tells us that Bob will act{" "}
                  <M t="Z^{M_1} X^{M_2}\ " />
                  on his qubit. Which of the following options does this
                  correspond to?
                </p>
              </Prose>
            }
          />
          <Toggle
            model={m.Case4Bobverify}
            choices={[
              ["matches", "It matches"],
              ["confused", "I'm confused"],
            ]}
            label={
              <Prose>
                <p>
                  Confirm for yourself that the gate(s) you just chose will
                  indeed corretly transform Bob's qubit into the desired
                  (myster) state
                  <M t="\ket{\phi} = a\ket{0} + b \ket{1} " />
                  <br />
                </p>
              </Prose>
            }
          />
        </>
      ),
      hints: [
        hint({
          name: "Case4hint",
          label: "Can I just get the answers?",
          body: (
            <Prose>
              <p>
                Looking at state <M t="\ket{\psi_2}" />, if Alice measures
                <M t="\ket{11}" />, we must be looking at the final term. Bob's
                qubit is the part which appears after the tensor product. <br />{" "}
                Bob must have <M t="a\ket{1} - b\ket{0}, " />
                which we note is properly normalized, since
                <M t="|a|^2 + |b|^2 = 1" />.
                <br />
                As for what gate(s) to act, this is a single qubit. We need to
                flip 1 to 0 and vice versa, but that still leaves a relative
                minus sign for the two terms. The Z gate flips the phase of a{" "}
                <M t="\ket{1}" /> state. So we need a sequence of 2 gates. To
                avoid introducing any undesired overall phase of -1, do you want
                to apply ZX or XZ?
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
                  responses?.Case4Bobstate?.selected === "d" &&
                  responses?.Case4Bobgate?.selected === "ZX" &&
                  responses?.Case4Bobverify?.selected === "matches"
                    ? "agree"
                    : "disagree"
                }
              >
                {responses?.Case4Bobstate?.selected === "d" &&
                responses?.Case4Bobgate?.selected === "ZX" &&
                responses?.Case4Bobverify?.selected === "matches" ? (
                  <p>
                    Good job, you got it all! <br />
                    Just to summarize: If Alice measures
                    <M t="\ket{11}" />, we are looking at the final term of
                    <M t="\ket{\psi_2}" /> above. <br /> Bob's qubit appears
                    after the tensor product symbol: state{" "}
                    <M t="a\ket{1} - b\ket{0}" />
                    <br /> This is already properly normalized, since{" "}
                    <M t="|a|^2 + |b|^2 =1" />
                    . <br />
                    As for what gates to act, this is a single qubit. Acting X
                    first will swap 0 for 1, yielding{" "}
                    <M t="a\ket{0} - b\ket{1}" />. Then acting with a Z gate
                    flips the phase of <M t="\ket{1}\ " />. <br />
                    That turns Bob's state into the original mystery state{" "}
                    <M t="a\ket{0} + b\ket{1}" />. <br />
                    Notice that in Dirac notation, the operator ZX acting on a
                    state means X first, followed by Z, as we desire. (The
                    answer XZ is not quite right, convince yourself that it
                    leaves behind an overall phase factor of -1 out front.)
                  </p>
                ) : responses?.Case4Bobverify?.selected === "confused" ? (
                  <p>
                    {/* Getting here means that you selected "confused",
                         no matter WHAT else you selected! */}
                    Feeling confused?
                    <br />
                    Remember, Alice has measured 11, i.e. <M t="M_1=1," /> and{" "}
                    <M t="M_2=1." /> <br />
                    Bob's gate sequence from the diagram is thus as follows:{" "}
                    <br /> first hit his qubit with
                    <M t="X^{M_2} = X^1 = X\ " /> followed by
                    <M t="Z^{M_1} = Z^1 = Z\ " />. <br />
                    That's an X gate followed by Z in the diagram, which is
                    written in Dirac notation as ZX (In Dirac notation, the
                    state you act on is always on the right, so X will act
                    first. It's backwards from how the gates appear in the
                    diagram! <br /> Be sure you understand that subtlety, there
                    is a separate Tutorial on single-qubit gates if you want to
                    practice more with going between Dirac notation and circuit
                    diagrams )
                    <br /> <br /> Look at your answers to the first two
                    questions and ask yourself if you are being consistent: does
                    hitting whatever you decided Bob's qubit is with a ZX
                    combination transform his qubit to state{" "}
                    <M t="a \ket{0} + b \ket{1}" />? <br />
                    If you change your answer from "I'm confused" to "It
                    matches" we can give you more feedback!
                  </p>
                ) : responses?.Case4Bobstate?.selected !== "d" ? (
                  <p>
                    {/* Getting here means that you did NOT select confused!
                        You got the state wrong! */}
                    We disagree with your answer for Bob's qubit state.
                    <br /> Remember that we are in the case where we assume
                    Alice has measured 11. Look at the expression for{" "}
                    <M t="\ket{\psi_2}" />
                    and find the term with 11 to the left of the tensor product.
                    What remains after the tensor product is Bob's state.
                    <br /> You are welcome to change your answer above.
                  </p>
                ) : (
                  <p>
                    {" "}
                    {/* I believe the only way to get here is to be NOT confused,
                    AND you have Bob's state right,
                        so you just picked the wrong gate*/}
                    We agree with your choice of Bob's state,
                    <M t="a\ket{1} - b\ket{0}" />. But, that is not the original
                    mystery state, <M t="\ket{\phi} = a\ket{0} + b\ket{1}" />.
                    Looks like the 1's and 0's are swapped, and we have a
                    relative phase that is not right. What gate combination will
                    fix this, converting your answer for Bob's state into the
                    desired (original) state <M t="\ket{\phi}" /> ?
                    <br /> Feel free to try again. Note that order matters: ZX
                    and XZ give slightly different results (an overall phase
                    difference.) Choose the combination that gives exactly the
                    mystery state.
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
      name: "endfinaloperations",
      body: (
        <Prose>
          We have exhausted all four possible cases. In each situation, after
          operating with one or two simple gates (determined entirely by Alice’s
          classical 2-bit message), Bob ended up with a single qubit in the
          exact same quantum state as our original mystery state{" "}
          <M t="\ket{\phi}" />. <br />
          Remarkably, even though Alice still has no knowledge of{" "}
          <M t="a {\rm \ or\ } b\ " />
          at this point, and nothing besides two classical bits of information
          were sent, the quantum state has been “teleported” to Bob.
        </Prose>
      ),
      continue: {
        label: "Got it!",
      },
    }),

    // Wrap up the page
    //
    //
    //
  ],
}));
