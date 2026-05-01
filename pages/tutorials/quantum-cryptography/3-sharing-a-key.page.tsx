import {
    ChooseOne,
    Dropdown,
    Guidance,
    LabelsLeft,
    M,
    Prose,
    TextLine,
    Toggle
} from "@/components";
import { page, repeatedModel } from "@/tutorial";
import setup from "./setup";
import { tableWithoutEve } from "./shared";

export default page(setup, ({ section, oneOf }) => ({
  name: "sharingKey",
  label: "Sharing a Private Key",
  answers: "checked-all",
  sections: [
    section({
      name: "introToSharedKey",
       enumerate: false,
      body: (m) => (
        <Prose>
          On the previous page, we explained a quantum cryptographic protocol
          that transmitted a series of bits to Bob. However, Bob and Alice don’t
          always get the same bits (they only agree 75% of the time, and some of
          those were on accident). On this page, we'll discuss how to make their
          keys agree 100% of the time by cleverly discarding bits that disagree
          without revealing the bits themselves.
          <br />
          <br />
          Here's the full table from the previous page:
          <tableWithoutEve.Component
            model={repeatedModel(m.tableWithoutEve)}
            rows={[
              "qubitNumber",
              "initialState",
              "didAliceApplyH",
              "stateAlice",
              "didBobApplyH",
              "bitBob",
              "keepOrDiscardTwo"
            ]}
          />
          <Prose>
            Note that in all cases where the outcome was “random”, nature has
            picked a 0 or 1. We highlighted those above in italics to remind you
            that those could have come out different. But this is what Bob got!
          </Prose>
        </Prose>
      ),
      continue: {
        allowed: () => true,
      },
    }),
 section({
      name: "mismatchExplanationPartOne",
      enumerate: false,
      body: (
        <Prose>
          Alice and Bob must remove every bit where they could have a mismatch.
          To do this, <b>after all measurements have been made</b>, they both
          publicly share their full record of whether or not they applied an H
          gate. They do NOT publicly share their bit values.
        </Prose>
      ),
      continue: { label: "Okay..." },
    }),
    section({
      name: "mismatchExplanationPartTwo",
      enumerate: false,
      body: (
        <Prose>
          In every case where they did not both make the same decision to apply
          the H gate or not, they both simply discard that bit. Thus, all bits
          that remain arise only when they either <b>both</b> applied an H gate,
          or <b>neither</b> applied an H gate.
        </Prose>
      ),
      continue: { label: "Interesting!" },
    }),
//                              question A
section({
      name: "qubit6KeepOrDiscard",
       body: (m) => (
        <Dropdown
          model={m.qubit6KeepOrDiscard}
          label={
            <Prose>
             Do Alice and Bob keep or discard qubit 6?
            </Prose>
          }
          choices={[
            ["+z", "Keep"],
            ["-z", "Discard"],

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
                        responses?.qubit6KeepOrDiscard?.selected === "-z" ? "agree" : "disagree"
                      }
                    >
                      {responses?.qubit6KeepOrDiscard?.selected !== "-z" ? (
                        <p>
                         Remember, in any case where they do not both make the
                         same decision to apply the H gate nor not, they both
                         discard the bit. For qubit 6, Alice applies a Hadamard,
                          but Bob does not. (Feel free to change your answer)

                        </p>
                      ) : (
                        <p>Right! In any case where they do not both make the
                          same decision to apply the H gate nor not, they both
                          discard the bit.

                      </p>

                      )}
                    </Guidance.Dynamic>
                  ),
                  onContinue: "nextSection",
                },
              },
            },
    }),
    //                         question B
section({
      name: "aliceAndBobKeepOrDiscard",
      body: (m, s) => (
        <>
         <LabelsLeft>
         <Dropdown
          model={m.qubit7KeepOrDiscard}
          label={
            <Prose>
             Do Alice and Bob keep or discard qubit 7?
            </Prose>
          }
          choices={[
           ["+z", "Keep"],
            ["-z", "Discard"],

          ]}
        />
           <Dropdown
          model={m.qubit8KeepOrDiscard}
          label={
            <Prose>
            Do Alice and Bob keep or discard qubit 8?
            </Prose>
          }
          choices={[
             ["+z", "Keep"],
            ["-z", "Discard"],
          ]}
        />
        <Dropdown
          model={m.qubit10KeepOrDiscard}
          label={
            <Prose>
            Do Alice and Bob keep or discard qubit 10?
            </Prose>
          }
          choices={[
             ["+z", "Keep"],
            ["-z", "Discard"],
          ]}
        />
        </LabelsLeft>
        </>
      ),
     guidance: {
            nextMessage: ((r: any) => {
               const a = r.qubit7KeepOrDiscard?.selected;
               const b = r.qubit8KeepOrDiscard?.selected;
               const c = r.qubit10KeepOrDiscard?.selected;

               if (a === "+z" && b === "+z" && c === "-z") {
                 return "correct";
               }

               // Only return "incorrect" if either dropdown has a value selected
               if (a !== "+z" || b !== "+z" || c !== "-z") {
                 return "incorrect";
               }
               // Otherwise, return null so no message is shown
               return null;
             }) as any,
             messages: {
               correct: {
                 body: (
                   <Guidance.Agree>Great job! We agree with your answers.
                  </Guidance.Agree>
                 ),
                 onContinue: "nextSection",
               },
               incorrect: {
                 body: (
                   <Guidance.Disagree>
                     If both Alice and Bob apply the H gate, Bob measures the
                     same state Alice started with. If neither of them applies
                     the H gate, Bob again measures the same state Alice started
                      with.  In both of these cases, we trust (and thus keep) the
                      outcomes. But what about in situations where Alice and Bob
                      make a different decision about applying an H gate? Feel
                      free to try again!
                   </Guidance.Disagree>
                 ),
                 onContinue: "nextMessage",
               },
             },
           },
    }),
      //                        question C
    section({
      name: "doesAliceBobShareKeyCheckTwo",
      body: (m, s) => (
        <Toggle
          model={m.doesAliceBobShareKeyCheckTwo}
          label={
            <Prose>
              Using only the 'keep' bits, do Alice and Bob share a key?
            </Prose>
          }
          choices={[
            ["yes", "Yes, they both share a key."],
            ["no", "No, they do not."],
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
           responses?.doesAliceBobShareKeyCheckTwo?.selected === "yes" ? "agree" : "disagree"
            }
              >
            {responses?.doesAliceBobShareKeyCheckTwo?.selected !== "yes" ? (
              <p>
                 As it turns out, Alice and Bob finally share a key. Whenever
                Alice and Bob's H-gate choices agree, the state Bob measures is
                the same state that Alice started with—a <M t="{\ket{0}}" />{" "}
                goes to a <M t="{\ket{0}}" />, for example. If Alice and Bob
                only keep bits where their H-gate choices agreed, they will
                always have the same bits, and therefore they share a key!
               </p>
               ) : (
              <p>
                We agree with your answer. As it turns out, Alice and Bob
                finally share a key. Whenever
                Alice and Bob's H-gate choices agree, the state Bob measures is
                the same state that Alice started with—a <M t="{\ket{0}}" />{" "}
                goes to a <M t="{\ket{0}}" />, for example. If Alice and Bob
                only keep bits where their H-gate choices agreed, they will
                always have the same bits, and therefore they share a key!
                  </p>
        )}
                </Guidance.Dynamic>
                  ),
                  onContinue: "nextSection",
                    },
                  },
                },
      hints: [
        {
          name: "whatIsAKey",
          body: (
            <>
              Alice and Bob wish to share a secret “key”, a long string of
              randomly generated 0’s and 1’s that they each possess, but nobody
              else does. Using only the 'keep' bits, do they each possess the
              same string of 0's and 1's?
            </>
          ),
          label: "What is a key?",
        },
      ],
    }),
    //                            question D
    section({
      name: "whatIsTheSharedKey",
      body: (m) => (
        <>
          <Prose>
            For the example table we worked on above, what is the shared key?
          </Prose>
          <LabelsLeft>
            <TextLine
             model ={m.whatIsTheSharedKey}
              label={<Prose>Key in bits: </Prose>}
            ></TextLine>
          </LabelsLeft>
        </>
      ),
      guidance: {
        nextMessage(r) {
          // support models that return either a wrapped { selected: ... } or a raw value (number/string)
          // Only access `.selected` if the model is an object to avoid TS errors when it's a number/string.
          const raw =
            typeof r.whatIsTheSharedKey === "object" && r.whatIsTheSharedKey !== null
              ? (r.whatIsTheSharedKey as any).selected ?? r.whatIsTheSharedKey
              : r.whatIsTheSharedKey;

          const answer = raw != null ? String(raw).trim() : undefined;
          const correctKey = "0110110";

          if (answer === correctKey) {
            return "correct";
          } else if (answer !== undefined && answer !== correctKey) {
            return "incorrect";
          }
          return null;
        },
        messages: {
              correct: {
                body: <Guidance.Agree>We agree with your answer. Any time
                  Alice's and Bob's Hadamard choices agreed, Bob's bit was not
                  random. On the table, Bob's random bits are shown in italics.
                   To get our key, we noted down every one of Bob's bits that
                    was not in italics.
                    <center>Our key is "0110110".</center>
                    </Guidance.Agree>,
                onContinue: "nextSection",
              },
              incorrect: {
                body: (
                  <Guidance.Disagree>
                    We disagree with your answer. Any time
                  Alice's and Bob's Hadamard choices agreed, Bob's bit was not
                  random. On the table, Bob's random bits are shown in italics.
                   To get our key, we noted down every one of Bob's bits that
                    was not in italics.
                    <center>Our key is "0110110".</center>
                  </Guidance.Disagree>
                ),
                onContinue: "nextMessage",
              },
            },
          },
    }),
    //                            question E
    section({
      name: "doesPublicInfoGiveInfoAboutBitString",
      body: (m, s) => (
        <ChooseOne
          model={m.doesPublicInfoGiveInfoAboutBitString}
          label={
            <Prose>
              If an outside observer sees only the public information from Alice
              and Bob (i.e. whether or not they applied a Hadamard gate), does
              the observer gain information about the contents of the shared
              key?
            </Prose>
          }
          choices={[
            ["yes", "Yes, the public information allows this."],
            ["no", "No, not enough information."],
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
           responses?.doesPublicInfoGiveInfoAboutBitString?.selected === "no" ? "agree" : "disagree"
            }
              >
            {responses?.doesPublicInfoGiveInfoAboutBitString?.selected !== "no" ? (
              <p>
               We disagree with your answer. The public information only
                reveals whether Alice and Bob applied a Hadamard gate or not.
                 Since the key bits are only taken from cases where their
                  Hadamard choices agreed, the public information does not
                   reveal anything about the actual bits in the key.
               </p>
               ) : (
              <p> We agree with your answer. The public information only
                reveals whether Alice and Bob applied a Hadamard gate or not.
                 Since the key bits are only taken from cases where their
                  Hadamard choices agreed, the public information does not
                   reveal anything about the actual bits in the key.
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
          name: "aliceAndBobPrivateKeyTable",
          body: (m) => (
            <Prose>
              Alice and Bob now share a private key. Here is the table so far, where
              we've removed all columns where Alice and Bob discarded their bits.
              <tableWithoutEve.Component
                model={repeatedModel(m.tableWithoutEve)}
                rows={[
                  "qubitNumber",
                  "initialState",
                  "didAliceApplyH",
                  "stateAlice",
                  "didBobApplyH",
                  "bitBob",
                  "keepOrDiscard",
                  "finalPrivateKey",
                ]}
                columns={tableWithoutEve.nonGreyedCols}
              />
            </Prose>
          ),
          continue: {
            allowed: () => true,
          },
        }),
  ],
}));
