import {
  Callout,
  ChooseOne,
  Guidance,
  Image,
  M,
  Prose,
  Toggle,
} from "@/components";
import { page } from "@/tutorial";
import { PencilIcon } from "@primer/octicons-react";

import fig4 from "./assets/C-fig-4.png";

import setup from "./setup";

export default page(setup, ({ section, hint }) => ({
  name: "buildingteleportation4",
  label: "Building a Teleportation Circuit (Part 4)",
  answers: "checked-all",

  sections: [
    section({
      name: "building4Intro",
      body: (
        <Prose>
          {" "}
          <M t="{\bf Recap\ of \ the\ last\ page:}" /> There were four
          possibilities for Alice’s measurement:{" "}
          <M t="\ket{00}, \ket{01}, \ket{10}, \ {\rm or}\ \ket{11}" />.
          <br /> We just worked out the situation where Alice got
          <M t="\ket{00}" />. After her measurement, Bob’s single-qubit state
          has collapsed to
          <M t="a \ket{0} + b \ket{1}" />. <br />
          To see what happens for the other three possibilities, it really helps
          to re-write <M t="\ket{\psi_2}" /> by combining the terms containing
          each of Alice’s four possible 2-qubit outcomes, so it's much easier to
          read off Bob’s resulting single-qubit state.
          <p>As a reminder, here's the circuit so far:</p>
          <Image src={fig4} alt="circuit diagram C-4" />
          <br />
          And, here's the state just before Alice's measurements that we want to
          reorganize: <br />
          <M
            display
            t="\ket{\psi_2} = \frac{1}{2}\bigl(\ a|000\rangle \ + a|011\rangle \ + b|010\rangle \ + b|001\rangle"
          />
          <M
            display
            t="\qquad \qquad + a|100\rangle + a|111\rangle - b|110\rangle - b|101\rangle \bigr)"
          />
        </Prose>
      ),
      continue: {
        label: "I’m ready to move on!",
      },
    }),

    section({
      name: "tryreorg",
      body: () => (
        <>
          <Prose>
            <p>
              Let’s reorganize the 8 terms above by factoring out the four
              possible 2-qubit outcomes Alice can get. As an example, notice
              that exactly two of the terms start with <M t="\ket{00}" /> ,
              namely
              <M t="a \ket{000} + b \ket{001} " /> (the 1st and 4th terms on the
              top line), so we can factor out the leading <M t="\ket{00}" />{" "}
              from those two and rewrite as <br />
              <M t="\ket{00} \otimes (a \ket{0} + b \ket{1})" />
              <br />
              Take a moment to work out all other terms yourself in detail.
              <br /> There are 8 terms above, you aren't changing anything - all
              you are doing is combining them into (four) pairs of terms that
              have the first two bits in common. <br />
              Please try to write it down carefully on paper before moving on.
            </p>
          </Prose>

          <Callout color="blue" iconLeft={<PencilIcon />}>
            Try it for yourself! Write out the state on scrap paper.
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
                There are only 4 unique possibilities for the first two qubits:
                00, 01, 10, and 11. We have already taken care of the (two)
                terms that start with 00, and wrote them as a tensor product:
                <M t="\ket{00} \otimes (a \ket{0} + b \ket{1})" />. Just do the
                same for the remaining 6 terms. You should find they "pair up",
                two terms for each of the remaining combinations. <br />
                If you get stuck, keep going, we'll guide you through it.
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
      name: "factorizedstate",
      body: (m) => (
        <>
          <Prose>
            Recall: We know that <br />
            <M
              display
              t="\ket{\psi_2} = \frac{1}{2}\bigl(\ a|000\rangle \ + a|011\rangle \ + b|010\rangle \ + b|001\rangle"
            />
            <M
              display
              t="\qquad \qquad \ + \ a|100\rangle + a|111\rangle - b|110\rangle - b|101\rangle\bigr)"
            />
            Your task was to reorganize those 8 terms. Let's check your result
            by matching your answer to the form shown below: find x, y and z
            (and decide if the ± should be plus or minus.) <br />
            <M
              display
              t="\ket{\psi_2} = \frac{1}{2}(\ \ket{00} \otimes (a\ket{0} + b\ket{1}) \ \ + \ \ket{01} \otimes (a\ket{1} \pm b\ket{0})"
            />
            <M
              display
              t=" + \ket{10} \otimes (a\ket{x} - b\ket{y})\  + \ \ket{11} \otimes \ket{z}\bigr) "
            />
          </Prose>
          <Toggle
            model={m.afterfactorsign}
            choices={[
              ["plus", <M t="+" />],
              ["minus", <M t="-" />],
              ["ambiguous", "It is ambiguous"],
            ]}
            label={
              <Prose>
                <p>
                  {" "}
                  Is that <M t="\pm" /> near the end of the first line +, −, or
                  is it ambiguous?
                  <br />
                </p>
              </Prose>
            }
          />
          <Toggle
            model={m.afterfactorx}
            choices={[
              ["0", <M t="0" />],
              ["1", <M t="1" />],
              ["other", "It's something else"],
            ]}
            label={
              <Prose>
                <p>
                  What is x?
                  <br />
                </p>
              </Prose>
            }
          />
          <Toggle
            model={m.afterfactory}
            choices={[
              ["0", <M t="0" />],
              ["1", <M t="1" />],
              ["other", "It's something else"],
            ]}
            label={
              <Prose>
                <p>
                  What is y?
                  <br />
                </p>
              </Prose>
            }
          />
          <ChooseOne
            model={m.afterfactorz}
            choices={[
              ["a", <M t="a \ket{0} - b \ket{1}" />],
              ["b", <M t="a \ket{0} + b \ket{1}" />],
              ["c", <M t="a \ket{1} - b \ket{0}" />],
              ["d", <M t="a \ket{1} + b \ket{0}" />],
              ["other", "It's something else"],
            ]}
            label={
              <Prose>
                <p>
                  What is z?
                  <br />
                </p>
              </Prose>
            }
          />
        </>
      ),
      hints: [
        hint({
          name: "factorizedstatehint",
          label: "Can I just get the answers?",
          body: (
            <Prose>
              <p>
                For the <M t="\pm" /> question: you must find the one term that
                begins with <M t="\ket{01}" />, and has b out front. There is
                only one such term, it’s the third term in the first line. The
                coefficient is +1.
                <br />
                For the questions about x and y: you must find all terms that
                start with <M t="\ket{10}" />. <br /> I see two such terms, both
                are in the second line, the 1st and last terms. <br /> The 1st
                term has a coefficient of a, with <M t="\ket{0}\ " /> as the
                final bit, so x is 0.
                <br /> The last term has a coefficient of <M t="-b" />, with
                <M t="\ket{1}\ " /> as the final bit, so y is 1.
                <br />
                As for z : locate all terms that began with <M t="\ket{11}" />.
                I see two of them, the middle two terms in the second line. What
                is left behind for the final qubit is thus{" "}
                <M t="z = a\ket{1}-b\ket{0}" />.
              </p>
            </Prose>
          ),
        }),
      ],
      // COMMENT:  If what they wrote doesn't match at all, can/should we have
      // some sort of HINT button before they try to answer the question above about x?
      // I did add a "Just give me the answers" button, that work?
      guidance: {
        nextMessage: () => "dynamicAnswer",
        messages: {
          dynamicAnswer: {
            body: ({ responses }) => (
              <Guidance.Dynamic
                status={
                  responses?.afterfactorsign?.selected === "plus" &&
                  responses?.afterfactorx?.selected === "0" &&
                  responses?.afterfactory?.selected === "1" &&
                  responses?.afterfactorz?.selected === "c"
                    ? "agree"
                    : "disagree"
                }
              >
                {responses?.afterfactorsign?.selected === "plus" &&
                responses?.afterfactorx?.selected === "0" &&
                responses?.afterfactory?.selected === "1" &&
                responses?.afterfactorz?.selected === "c" ? (
                  <p>
                    Good job, you got it all! Just to summarize: <br />
                    For the <M t="\pm" /> question: you find the term that begin
                    with <M t="\ket{01}" />, and has b out front. There is only
                    one such term, it’s the third term in the first line. The
                    coefficient is +1.
                    <br />
                    For the questions about x and y: you find all terms that
                    start with <M t="\ket{10}" />. I see two such terms, both in
                    the second line, the 1st and last terms. The 1st term has a
                    coefficient of a, with <M t="\ket{0}\ " /> as the final bit,
                    so x is 0.
                    <br /> The last term has a coefficient of <M t="-b" />, with
                    <M t="\ket{1}\ " /> as the final bit, so y is 1.
                    <br />
                    As for z : locate all terms that began with{" "}
                    <M t="\ket{11}" />. I see two of them, the middle two terms
                    in the second line. What is left behind for the final qubit
                    is thus <M t="z = a\ket{1}-b\ket{0}" />.
                  </p>
                ) : responses?.afterfactorsign?.selected !== "plus" ? (
                  <p>
                    {" "}
                    We have not checked all your answers yet, but just consider
                    the first question about the sign of that term: you need to
                    locate a term that begins with <M t="\ket{01}" />, and has{" "}
                    <M t="b\ " /> out front. <br /> There is only one such term,
                    it’s the third term in the first line. What's the sign of
                    its coefficient? <br /> Feel free to change your answer(s)
                    and try again.
                    <br />
                  </p>
                ) : (
                  // To get here, they are NOT correct, but they DO have a plus sign!
                  <p>
                    One or more of your responses is not correct. Here are some
                    general hints, please try again!
                    <br />
                    For the questions about x and y: you must locate all terms
                    that start with <M t="\ket{10}" />. I see two such terms,
                    both in the second line, the 1st and last terms. <br /> The
                    1st term has a coefficient of a, what is the final bit?
                    (That's x!) <br /> The last term has a coefficient of{" "}
                    <M t="-b" />, what is the final bit? (That's y!)
                    <br />
                    For the question about z : you need to locate all terms that
                    begin with <M t="\ket{11}" />. <br /> I see two of them, the
                    middle two terms in the second line. Whatever is left behind
                    for the final qubit is z.
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

    // End it all! This comes after the last \section{}
  ],
}));
