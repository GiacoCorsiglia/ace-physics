import {
  Callout,
  ChooseOne,
  Decimal,
  Dropdown,
  Guidance,
  Image,
  LabelsLeft,
  M,
  Prose,
  TextBox
} from "@/components";
import { page, repeatedModel } from "@/tutorial";
import Hadamard2 from "./media/BB84 w Eve.png";
import setup from "./setup";
import { tableWithEve } from "./shared";

export default page(setup, ({ section }) => ({
  name: "theEffectsOfAnEavesdropper",
  label: "Effects of an Eavesdropper",
  answers: "checked-some",
  sections: [
    section({
      name: "theEffectsOfAnEavesdropperIntro",
      body: (
        <Prose>
          <p>
            In the above analysis, we assumed that the qubit traveled perfectly
            safely from Alice to Bob. However, during the qubit’s travel, it
            would be possible for a nefarious third person, Eve (the
            eavesdropper), to intercept a qubit, measure it, then send the
            resulting state on to Bob. This portion of the worksheet will
            address what effect that will have to the resulting key and how
            Alice and Bob can test for an eavesdropper.
          </p>
        </Prose>
      ),
    }),
    section({
      name: "theEffectsOfAnEavesdropperIntroCircuit",
      enumerate: false,
      body: (
        <Prose>
          <p>
            Let’s assume that Eve gains complete access to all the physical
            qubits after Alice sends them, and before Bob receives them. In
            classical systems, there is no way to detect Eve’s presence: she
            just measures each bit from Alice, records it, and passes it along
            to Bob who is unaware of her presence. But what about our qubit
            system?
          </p>
          <Image
            src={Hadamard2}
            alt="Eve's apparatus in between Bob's and Alice's"
          />
        </Prose>
      ),
    }),
    //question A
    section({
      name: "isPossibleEveMakeMeasurement",
      body: (m, { responses }) => (
        <>
          <ChooseOne
            model={m.isPossibleEveMakeMeasurement}
            label={
              <Prose>
                 In the diagram above, Eve receives a qubit from Alice.
                  Does she pass on a qubit in that same state to Bob?
              </Prose>
            }
            choices={[
              ["yesAlways", "Yes, always."],
              ["yesSometimes", "Yes, sometimes (it depends)."],
              ["no", "No, never."],
            ]}
          />
          {responses?.isPossibleEveMakeMeasurement && (
            <TextBox
              model={m.ipEMMExplanation}
              label={
                <Prose>
                  If so, under what conditions is this possible? If not, explain
                  why not.
                </Prose>
              }
            />
          )}
        </>
      ),
      guidance: {
        nextMessage(r) {
          const res = r.ipEMMExplanation;

          if (res) {
            return "discussion";
          }
          return null;
        },
        messages: {
          discussion: {
            body: (s) => (
              <>

                <Callout color="blue">We havent checked your answers yet, but: <br />
                  Eve doesn't know whether she has a state in the{" "}
                  <M t="{\{\ket{0}, \ket{1}\}}" /> basis or the{" "}
                  <M t="{\{\ket{+}, \ket{-}\}}" /> basis when the qubits pass
                  through her device, because that information has not yet been
                  publicly released. <hr />
                 If Eve (luckily) makes the same H-gate choice as Alice, then
                 she will pass along to Bob the same state that Alice sent.
                  <hr />
                 If Eve (unluckily) makes a different H-gate choice than Alice,
                 her measurement result is random, and so she passes a random
                 state to Bob.

                </Callout>
              </>
            ),
            onContinue: "nextSection",
          },
        },
      },
      continue: {
        label: "Sounds good!",
      },
    }),

    //table 1
    section({
          name: "natureEffectAfterEveSendsQuestion",
          enumerate: false,
          body: (m) => (
            <>
            <Prose>
                Note that a letter "R" indicates a case where the outcome
                was “random”, this is what Eve got!
              </Prose>
              <tableWithEve.Component
                model={repeatedModel(m.tableWithEve)}
                rows={[
                  "qubitNumber",
                  "initialState",
                  "didAliceApplyH",
                  "stateAlice",
                  "didEveApplyH",
                  "bitEveTwo",
                ]}
               columns={tableWithEve.nonGreyedCols}
              />

            </>
          ),
         continue: {
       allowed: () => true,
      },
        }),
    //question B
     section({
          name: "qubit2And4EvesBit",
          body: (m, s) => (
            <>
            <Prose> Use the information in the table to determine the value of
              Eve's bit (after she measures) for qubits 2 and 4.
            </Prose>
             <LabelsLeft>
             <Dropdown
              model={m.evesBitQubit2}
              label={
                <Prose>
                Qubit 2:
                </Prose>
              }
              choices={[
               ["0", 0],
               ["1", 1],
               ["random", "R"],
              ]}
            />
               <Dropdown
              model={m.evesBitQubit4}
              label={
                <Prose>
                 Qubit 4:
                </Prose>
              }
              choices={[
              ["0", 0],
               ["1", 1],
               ["random", "R"],
              ]}
            />
            </LabelsLeft>
            </>
          ),
          // ********NOTE: add new feedback if incorrect twice ********
         guidance: {
                nextMessage: ((r: any) => {
                   const a = r.evesBitQubit2?.selected;
                   const b = r.evesBitQubit4?.selected;

                   if (a === "random" && b === "random") {
                     return "correct";
                   }

                   return "incorrect";

                 }) as any,
                 messages: {
                   correct: {
                     body: (
                       <Guidance.Agree> Correct - good work!
                       </Guidance.Agree>
                     ),
                     onContinue: "nextSection",
                   },
                   incorrect: {
                     body: (
                       <Guidance.Disagree>
                         Looks like we disagree with at least some of your
                         answers for Eve's measurements. It might help to write
                          down the state Eve has after she does or does not
                          apply the H-gate.

                       </Guidance.Disagree>
                     ),
                     onContinue: "nextMessage",
                   },
                 },
               },
        }),
        // question C
         section({
          name: "qubit5And9EvesBit",
          body: (m, s) => (
            <>
            <Prose> Use the information in the table to determine the value of
              Eve's bit (after she measures) for qubits 5 and 9.
            </Prose>
             <LabelsLeft>
             <Dropdown
              model={m.evesBitQubit5}
              label={
                <Prose>
                Qubit 5:
                </Prose>
              }
              choices={[
               ["0", 0],
               ["1", 1],
               ["random", "R"],

              ]}
            />
               <Dropdown
              model={m.evesBitQubit9}
              label={
                <Prose>
                 Qubit 9:
                </Prose>
              }
              choices={[
               ["0", 0],
               ["1", 1],
               ["random", "R"],
              ]}
            />
            </LabelsLeft>

            </>
          ),
         guidance: {
                nextMessage: ((r: any) => {
                   const a = r.evesBitQubit5?.selected;
                   const b = r.evesBitQubit9?.selected;

                   if (a === "1" && b === "1") {
                     return "correct";
                   }

                   return "incorrect";
                 }) as any,
                 messages: {
                   correct: {
                     body: (
                       <Guidance.Agree> Correct - good work!
                       </Guidance.Agree>
                     ),
                     onContinue: "nextSection",
                   },
                   incorrect: {
                     body: (
                       <Guidance.Disagree>
                         Looks like we disagree with at least some of your
                         answers for Eve's measurements. It might help to write
                          down the state Eve has after she does or does not
                          apply the H-gate.

                       </Guidance.Disagree>
                     ),
                     onContinue: "nextMessage",
                   },
                 },
               },
           //continue: {
           //label: "Measure!",
            //},
            continue: {
            label: "Check in!",
            //allowed: (s, _, m) =>
             // tableWithoutEve.isComplete(s, m, "stateAlice", [4, 5, 6, 7]),
          },

        }),
         section({
      name: "hitMeasureForRandom",
      enumerate: false,
      body: (
        <Prose>
          <p>
            Hit "Measure!" to let "nature" determine the outcomes of
              all the cells labeled "R" for random in the last row.
          </p>

        </Prose>
      ),
      continue: {
           label: "Measure!",
            },
    }),
        // Table 2 (answers)
         section({
          name: "natureEffectAfterEveSends",
           enumerate: false,
          body: (m) => (
            <>
             <Prose>
                Note that in all cases where the outcome was “random”, nature has
                picked a 0 or 1. Those results are written in italics to remind you
                that they could have come out different. But this is what Eve got!
              </Prose>
              <tableWithEve.Component
                model={repeatedModel(m.tableWithEve)}
                rows={[
                  "qubitNumber",
                  "initialState",
                  "didAliceApplyH",
                  "stateAlice",
                  "didEveApplyH",
                  "bitEve",
                ]}
                columns={tableWithEve.nonGreyedCols}
              />
            </>
          ),
         continue: {
           allowed: () => true,
          },
        }),

         //question D
            section({
                  name: "circumstancesEveMeasuresR",
                  body: (m) => (
                    <>
                      <TextBox
                        model={m.circumstancesEveMeasuresR}
                        label={
                          <Prose>
                            <p>Consider the bits for which Eve got a random result.</p>
                            <p>
                              In your own words, why did this happen (or, under what
                              circumstances)?
                            </p>
                          </Prose>
                        }
                      ></TextBox>
                      <Decimal
                        model={m.howOftenEveMeasuresR}
                        label={
                          <Prose>
                            If this procedure was repeated many times, what percentage of
                            the time would Eve get a random result?
                          </Prose>
                        }
                        placeholder={"Percent"}
                      />
                    </>
                  ),
                  //question D feedback
                  guidance: {
                    nextMessage: () => "ourAnswer",
                  messages: {
                     ourAnswer: {
                      body: (s) => {
                      if (s.responses?.howOftenEveMeasuresR === 50 || s.responses?.howOftenEveMeasuresR === .50) {
                             return <Guidance.Agree>Correct!</Guidance.Agree>;
                               }
                               return (
                                 <>
                                   <Guidance.Disagree>
                                     If Eve makes a Hadamard choice opposite to Alice's choice,
                                    then Eve will always measure a superposition state (
                                   <M t="\ket{+}" /> or <M t="\ket{-}" />) in the{" "}
                                  <M t="\{0, 1\}" /> basis and get a random result.
                                  How often does this happen?
                                   </Guidance.Disagree>
                                 </>
                               );
                             },
                             onContinue: "nextSection",
                           },
                         },
                       },
                }),
                //table 3
                 section({
              name: "natureEffectAfterEveSends2",
               enumerate: false,
              body: (m) => (
                <>
                <Prose>
                   Eve tries to cover her tracks before passing her state on
                    to Bob. If she applied a Hadamard gate before measuring,
                    she reapplies it after measuring (to try to reverse her
                    former action). If she did not apply an H-gate before,
                    she does nothing.
                  </Prose>
                  <tableWithEve.Component
                    model={repeatedModel(m.tableWithEve)}
                    rows={[
                      "qubitNumber",
                      "initialState",
                      "didAliceApplyH",
                      "stateAlice",
                      "didEveApplyH",
                      "bitEve",
                      "stateEveTwo",
                    ]}
                    columns={tableWithEve.nonGreyedCols.slice(0, 8)}
                  />

                </>
              ),
              continue: {
                allowed: () => true,
              },
            }),
            //question E
             section({
      name: "eveSendsBobQubit2",
       body: (m) => (
        <Dropdown
          model={m.eveSendsBobQubit2}
          label={
            <Prose>
            For qubit 2, what is the qubit that Eve sends on to Bob?
            </Prose>
          }
          choices={[
            ["+z", <M t="{\ket{0}}" />],
            ["-z", <M t="{\ket{1}}" />],
            ["+x", <M t="{\ket{+}}" />],
            ["-x", <M t="{\ket{-}}" />],
            ["+y", "Other"],
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
                        responses?.eveSendsBobQubit2?.selected === "-z" ? "agree" : "disagree"
                      }
                    >
                      {responses?.eveSendsBobQubit2?.selected !== "-z" ? (
                        <p>
                          Looks like we disagree. Remember that when Eve measures
                           a state and gets a bit (0 or 1) she collapses the state
                           into  <M t="\ket{0}"/> or <M t="\ket{1}"/>. Then,
                           she either does or does not reapply
                           the Hadamard gate, according to the table. Given this
                           information, can you figure out what states she sends
                            to Bob?  (For qubit 2, the table says she did not
                            reapply the Hadamard.)
                        </p>
                      ) : (
                        <p>Correct! When Eve measures a state and gets a bit
                          (0 or 1) she collapses the state into <M t="\ket{0}"/>
                          or <M t="\ket{1}"/>. Then, she either does or does not
                          reapply the Hadamard gate, according to the table.
                          (In this case, she did not reapply the Hadamard.)

                      </p>

                      )}
                    </Guidance.Dynamic>
                  ),
                  onContinue: "nextSection",
                },
              },
            },
    }),
    //qusetion F
     section({
      name: "eveSendsBob3Qubits",
      body: (m, s) => (
        <>
         <LabelsLeft>
         <Dropdown
          model={m.eveSendsBobQubit4}
          label={
            <Prose>
             For qubit 4, what is the qubit that Eve sends on to Bob?
            </Prose>
          }
          choices={[
            ["+z", <M t="{\ket{0}}" />],
            ["-z", <M t="{\ket{1}}" />],
            ["+x", <M t="{\ket{+}}" />],
            ["-x", <M t="{\ket{-}}" />],
            ["+y", "Other"],
          ]}
        />
           <Dropdown
          model={m.eveSendsBobQubit9}
          label={
            <Prose>
             For qubit 9, what is the qubit that Eve sends on to Bob?
            </Prose>
          }
          choices={[
            ["+z", <M t="{\ket{0}}" />],
            ["-z", <M t="{\ket{1}}" />],
            ["+x", <M t="{\ket{+}}" />],
            ["-x", <M t="{\ket{-}}" />],
            ["+y", <M t="other" />],
          ]}
        />
         <Dropdown
          model={m.eveSendsBobQubit12}
          label={
            <Prose>
             For qubit 12, what is the qubit that Eve sends on to Bob?
            </Prose>
          }
          choices={[
            ["+z", <M t="{\ket{0}}" />],
            ["-z", <M t="{\ket{1}}" />],
            ["+x", <M t="{\ket{+}}" />],
            ["-x", <M t="{\ket{-}}" />],
            ["+y", <M t="other" />],
          ]}
        />
        </LabelsLeft>
        </>
      ),
     guidance: {
            nextMessage: ((r: any) => {
               const a = r.eveSendsBobQubit4?.selected;
               const b = r.eveSendsBobQubit9?.selected;
               const c = r.eveSendsBobQubit12?.selected;


               if (a === "-x" && b === "-z" && c === "+x") {
                 return "correct";
               }

               // Only return "incorrect" if either dropdown has a value selected
               if (a !== "+x" || b !== "-x" || c!== "+z") {
                 return "incorrect";
               }
               // Otherwise, return null so no message is shown
               return null;
             }) as any,
             messages: {
               correct: {
                 body: (
                   <Guidance.Agree>Great job! </Guidance.Agree>
                 ),
                 onContinue: "nextSection",
               },
               incorrect: {
                 body: (
                   <Guidance.Disagree>
                    Looks like we disagree with at least one of your answers.
                    Remember that when Eve measures a state and gets a bit (0 or 1)
                    she collapses the state into <M t="{H\ket{0}}" />or<M t="{H\ket{1}}" />. Then, she either does or
                    does not reapply the Hadamard gate, according to the table.
                    Given this information, can you figure out what states she sends
                     to Bob?  Recall the effect of the Hadamard gate on a qubit:

                     <p>
                      <center>
                      <M
                     t="H\ket{0} = \ket{+}"
                    /> <br />
                    <M
                     t="H\ket{1} = \ket{-}"
                    /> <br />
                    </center>
                    </p>
                    Feel free to try again.
                   </Guidance.Disagree>
                 ),
                 onContinue: "nextMessage",
               },
             },
           },
          }),
    //  table 4
        section({
              name: "tableWithEveAndNotBobComplete",
              enumerate: false,
              body: (m) => (
                <>
                  <tableWithEve.Component
                    model={repeatedModel(m.tableWithEve)}
                    rows={[
                      "qubitNumber",
                      "initialState",
                      "didAliceApplyH",
                      "stateAlice",
                      "didEveApplyH",
                      "bitEve",
                      "stateEve",
                    ]}
                    columns={tableWithEve.nonGreyedCols}
                  />
                </>
              ),
              continue: {
                allowed: () => true,
              },
            }),
     // question G
    section({
          name: "circumstancesEveSendsSameState",
          body: (m) => (
            <>
              <TextBox
                model={m.circumstancesEveSendsSameState}
                label={
                  <Prose>
                    <p>
                      Under what circumstances could Eve send the same quantum state
                      that Alice sent?
                    </p>
                  </Prose>
                }
              ></TextBox>
            </>
          ),
          guidance: {
            nextMessage: () => "ourAnswer",
            messages: {
              ourAnswer: {
                body: (
                  <>

                    <Guidance.HeadsUp>
                      We haven’t checked your answer, but if Eve makes the same
                      Hadamard choice as Alice, she will measure the original
                       bit that Alice randomly chose, and then send it along in
                       the same basis that Alice sent. If Eve makes the wrong choice,
                       she will always send a qubit in the wrong basis. <br />
                        <br />
                      To be specific: If Alice did NOT apply a Hadamard, and
                      neither does Eve, the qubit is simply sent along unaffected by
                      Eve’s measurement. (If Eve measures a 0, she sends a <M t="{H\ket{0}}"/>,
                       which is what Alice sent. The same goes for 1.)
                      But if, for example, Alice sends a <M t="{H\ket{0}}"/>, and Eve chooses
                       differently than Alice (and thus applies a Hadamard),
                       she will turn the state into <M t="{H\ket{1}}"/>. Her measurement result
                       will then be random, and she will apply another Hadamard,
                       sending along either <M t="{H\ket{+}}"/> or <M t="{H\ket{-}}"/>
                       to Bob. She sends a different state than Alice originally sent.
                      Convince yourself that in all scenarios, if Eve chooses
                      differently than Alice, she will never send the state Alice
                      sent. (But, if she chooses the same, she will always send
                       the state Alice sent.)
                    </Guidance.HeadsUp>
                  </>
                ),
                onContinue: "nextSection",
              },
            },
          },
        }),
        //  table 5
       section({
             name: "bobsBitAfterEve1",
             enumerate: false,
             body: (m) => (
               <>
                 <Prose>
                   We recall the choices Bob made to apply the Hadamard gate or not.
                   Whether Eve is in the line or not, he makes the same choices. Now
                   let's see what bits he measures after (potentially) applying the
                   Hadamard gate, now that Eve has interfered.
                 </Prose>
                 <tableWithEve.Component
                   model={repeatedModel(m.tableWithEve)}
                   rows={[
                     "qubitNumber",
                     "initialState",
                     "didAliceApplyH",
                     "stateAlice",
                     "didEveApplyH",
                     "bitEve",
                     "stateEve",
                     "didBobApplyH",
                     "bitBobTwo",
                   ]}
                   columns={tableWithEve.nonGreyedCols.slice(0, 8)}
                   editing={"bitBob"}
                 />
               </>
             ),
              continue: {
                allowed: () => true,
              },
            }),
        // question H
section({
      name: "bobsMeasurementQubit4",
       body: (m) => (
        <Dropdown
          model={m.bobsMeasurementQubit4}
          label={
            <Prose>
            For qubit 4, what is the result of Bob's measurement?
            </Prose>
          }
          choices={[
            ["0", 0],
            ["1", 1],
            ["random", "R"],
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
                        responses?.bobsMeasurementQubit4?.selected === "random" ? "agree" : "disagree"
                      }
                    >
                      {responses?.bobsMeasurementQubit4?.selected !== "random" ? (
                        <p>
                          For qubit 4, Bob doesn’t apply the Hadamard, so he is
                           measuring the <M t="\ket{-}"/> state. (The outcome is random)
                        </p>
                      ) : (
                        <p>Correct! Bob’s outcome will be random because he is
                          measuring the <M t="\ket{-}"/> state.
                      </p>

                      )}
                    </Guidance.Dynamic>
                  ),
                  onContinue: "nextSection",
                },
              },
            },
    }),
    // Question I
     section({
          name: "qubit5And8BobsMeasurement",
          body: (m, s) => (
            <>
            <Prose> For qubits 5 and 8, what are the results of Bob's measurements?
            </Prose>
             <LabelsLeft>
             <Dropdown
              model={m.qubit5BobsMeasurement}
              label={
                <Prose>
                Qubit 5:
                </Prose>
              }
              choices={[
                ["0", "0"],
                ["1", "1"],
                ["random", "R"],

              ]}
            />
               <Dropdown
              model={m.qubit8BobsMeasurement}
              label={
                <Prose>
                 Qubit 8:
                </Prose>
              }
              choices={[
               ["0", "0"],
                ["1", "1"],
                ["random", "R"],
              ]}
            />
            </LabelsLeft>
             <Prose> Hit "Measure!" to let "nature" determine the outcomes of
              all the cells labeled "R" for random in the last row.
            </Prose>
            </>
          ),
         guidance: {
                nextMessage: ((r: any) => {
                   const a = r.qubit5BobsMeasurement?.selected;
                   const b = r.qubit8BobsMeasurement?.selected;

                   if (a === "1" && b === "random") {
                     return "correct";
                   }

                   return "incorrect";
                 }) as any,
                 messages: {
                   correct: {
                     body: (
                       <Guidance.Agree> We agree!
                       </Guidance.Agree>
                     ),
                     onContinue: "nextSection",
                   },
                   incorrect: {
                     body: (
                       <Guidance.Disagree>
                        It might help to write down the state Bob has after he does (or does not apply) the H-gate.
                      And, recall the effects of the H gate:
                      <center>
                       <M t="H\ket{0} = \ket{+}"/>, <M t="H\ket{1} = \ket{-}"/>,
                       <M t="H\ket{+} = \ket{0}"/>, <M t="H\ket{-} = \ket{1}"/>
                       with <M t="\ket{+} = \frac{1}{\sqrt{2}}(\ket{0} + \ket{1})"/> and
                       <M t="\ket{-} = \frac{1}{\sqrt{2}}(\ket{0} - \ket{1})"/>
                      </center>
                       </Guidance.Disagree>
                     ),
                     onContinue: "nextMessage",
                   },
                 },
               },
          continue: {
           label: "Measure!",
            },
        }),
        //table 6
           section({
             name: "bobsBitAfterEve3",
             enumerate: false,
             body: (m) => (
               <>
                 <Prose>
                   Note that Bob’s key no longer perfectly matches Alice’s.

                 </Prose>
                 <tableWithEve.Component
                   model={repeatedModel(m.tableWithEve)}
                   rows={[
                     "qubitNumber",
                     "initialState",
                     "didAliceApplyH",
                     "stateAlice",
                     "didEveApplyH",
                     "bitEve",
                     "stateEve",
                     "didBobApplyH",
                     "bitBob",
                   ]}
                   columns={tableWithEve.nonGreyedCols.slice(0, 8)}
                   //editing={"bitBob"}
                 />
               </>
             ),
              continue: {
                allowed: () => true,
              },
            }),
            // question J
             section({
                  name: "circumstancesBobCorrectBecomesR",
                  body: (m) => (
                    <>
                      <TextBox
                        model={m.circumstancesBobCorrectBecomesR}
                        label={
                          <Prose>
                            <p>
                              Before Eve's interference, these seven bits were the bits that
                              Alice and Bob agreed on 100% of the time. Now, however, some
                              of Bob's meaurements are resulting in random answers.
                            </p>
                            <p>
                              In your own words, why does this happen (or, under what
                              circumstances)?
                            </p>
                          </Prose>
                        }
                      ></TextBox>
                    </>
                  ),
                }),
                // question K
                section({
                  name: "fractionOfMismatchedComparedSampleBits",
                  body: (m) => (
                    <>
                      <Prose>
                        In this small sample, what percentage of Alice and Bob's bits are
                        mismatched? <b>(Round to the nearest percent).</b>
                      </Prose>
                      <LabelsLeft>
                        <Decimal
                          model={m.fractionOfMismatchedComparedSampleBits}
                          label={<Prose>Percentage: </Prose>}
                        />
                      </LabelsLeft>
                    </>
                  ),
                  guidance: {
                    nextMessage(r) {
                      if (r.fractionOfMismatchedComparedSampleBits !== undefined) {
                        if (
                          !(
                            r.fractionOfMismatchedComparedSampleBits >= 28 &&
                            r.fractionOfMismatchedComparedSampleBits <= 30
                          )
                        )
                          return "incorrect";
                      }
                      return null;
                    },
                    messages: {
                      incorrect: {
                        body: (
                          <>
                            <Guidance.Disagree>
                              To answer this question, we compared Bob's bits to Alice's
                              bits (the bottom row to the top row). Bits 7 and 8 disagree,
                              so our answer is 2/7, or 29%.{" "}
                            </Guidance.Disagree>
                          </>
                        ),
                        onContinue: "nextSection",
                      },
                    },
                  },
                }),
                // question L
                 section({
                      name: "fractionOfMismatchedComparedBits",
                      body: (m) => (
                        <>
                          <Prose>
                            Now consider a very large string (much larger than 7 bits). Eve is
                            intercepting all bits. Alice and Bob are only comparing bits which
                            they expect will agree (i.e. they made the same H-gate choice) What
                            percentage of the compared bits will mismatch?{" "}
                            <b>(Round to the nearest percent).</b>
                          </Prose>
                          <LabelsLeft>
                            <Decimal
                              model={m.fractionOfMismatchedComparedBits}
                              label={<Prose>Percentage: </Prose>}
                            />
                          </LabelsLeft>
                        </>
                      ),
                      // CHANGE TO POSITIVE NEGATIVE FEEDBACK .25 correct , 75 incorrect
                       guidance: {
                             nextMessage(r) {

                               const raw =
                                 typeof r.fractionOfMismatchedComparedBits === "object" && r.fractionOfMismatchedComparedBits !== null
                                   ? (r.fractionOfMismatchedComparedBits as any).selected ?? r.fractionOfMismatchedComparedBits
                                   : r.fractionOfMismatchedComparedBits;

                               const answer = raw != null ? String(raw) : undefined;

                               if (answer === "25") {
                                 return "correct";
                               } else if (answer !== "25") {
                                 return "incorrect";
                               }
                               return null;
                             },
                             messages: {
                                   correct: {
                                     body: <Guidance.Agree> Thats correct!
                                         </Guidance.Agree>,
                                     onContinue: "nextSection",
                                   },
                                   incorrect: {
                                     body: (
                                       <Guidance.Disagree>
                                         We disagree with your answer. Firstly, we consider only
                                      the "keep" bits (bits where Alice and Bob agreed on their
                                      H-gate choice). <hr />
                                      50% of the time, Eve will make the same H-gate choice as
                                      Alice and Bob, and the state will pass from Eve to Bob
                                      unchanged. <hr />
                                      50% of the time, Eve will make a different H-gate choice
                                      from Alice and Bob. This will result in Bob measuring a
                                      state from the <M t="{\{\ket{+}, \ket{-}\}}" /> basis,
                                      giving him a random result that is as likely to match as
                                      mismatch.
                                      <hr />
                                      If you combine these two cases, Bob's and Alice's bits
                                      will match 75% of the time, and mismatch 25% of the time.
                                       </Guidance.Disagree>
                                     ),
                                     onContinue: "nextMessage",
                                   },
                                 },
                               },

                      hints: [
                        {
                          name: "decisionTreeForMismatch",
                          body: (
                            <>
                              How often does Bob get the same state Alice sent? Also, what
                              happens when Bob doesn’t get the same state Alice sent?
                            </>
                          ),
                        },
                      ],
                    }),
            section({
            name: "explanationOfMismatchedComparedBits",
            enumerate: false,
            body: (
            <Prose>
            <p>
            50% of the time, Bob's and Alice's bits match because Eve made the
            same H-gate choice as Alice. The other 50% of the time, Bob measures
            a random result, which means he might or might not get the same
            result as Alice.
            </p>
            <p>
            In total, Alice and Bob's bits match 75% of the time. They mismatch
            25% of the time: when Bob gets a random result and measures the
            opposite of Alice.
            </p>
           </Prose>
            ),
           }),
                    // INTRO
                     section({
              name: "aliceAndBobNeedToCheck",
               enumerate: false,
              body: (
             <Prose>
             <p>
             Alice and Bob still need to check for an Eavesdropper. To do this,
             they disclose a portion of their remaining key. (They can no longer
             use these elements of the key to encrypt/decrypt anything.)
            If their bits are all the same, they can be confident no one intercepted.
            If the bits are not the same, they might have made mistakes, or there
            may have been an eavesdropper. But either way, they should abandon
            the protocol and start fresh again.
              </p>
        </Prose>
      ),
    }),
    // question M
       section({
                  name: "percentOfBobsTest",
                  body: (m) => (
                    <>
                      <Prose>
                       Assume a very long message was sent, and we choose to
                       disclose only 2 bits to test for the presence of Eve.
                      What is the percent chance that both of Bob's “test” bits
                      will match Alice's? <b>(Round to the nearest percent).</b>
                      </Prose>
                      <LabelsLeft>
                        <Decimal
                          model={m.percentOfBobsTest}
                          label={<Prose>Percentage: </Prose>}
                        />
                      </LabelsLeft>
                    </>
                  ),
                 guidance: {
        nextMessage(r) {
          // support models that return either a wrapped { selected: ... } or a raw value (number/string)
          // Only access `.selected` if the model is an object to avoid TS errors when it's a number/string.
          const raw =
            typeof r.percentOfBobsTest === "object" && r.percentOfBobsTest !== null
              ? (r.percentOfBobsTest as any).selected ?? r.percentOfBobsTest
              : r.percentOfBobsTest;

          const answer = raw != null ? String(raw) : undefined;

          if (answer === "56") {
            return "correct";
          } else if (answer !== "56") {
            return "incorrect";
          }
          return null;
        },
        messages: {
              correct: {
                body: <Guidance.Agree>We agree with your answer. We know that Bob
                  and Alice's bits match 75% of the time. The chance that two bits
                  match is therefore <M t="{(0.75)^2}" /> or 56%. If this happens, Alice
                  and Bob fail to notice the eavesdropper.

                    </Guidance.Agree>,
                onContinue: "nextSection",
              },
              incorrect: {
                body: (
                  <Guidance.Disagree>
                    We know that Bob and Alice's bits match 75% of the time.
                    The chance that two bits match is therefore <M t="{(0.75)^2}" /> or 56%.
                    If this happens, Alice and Bob fail to notice the eavesdropper.

                  </Guidance.Disagree>
                ),
                onContinue: "nextMessage",
              },
            },
          },
         }),
         // question N
          section({
               name: "oddsOfBobAliceFailToNotice",
               body: (m) => (
                 <>
                   <Prose>
                     If we check 100 bits (with Eve present), what are the odds that Bob
                     and Alice <strong>fail</strong> to notice the eavesdropper? (That is, what are the
                     chance that all 100 bits Bob and Alice check match?)
                   </Prose>
                   <TextBox model={m.oddsOfBobAliceFailToNotice} />
                 </>
               ),
               guidance: {
                 nextMessage(r) {
                   return "explanation";
                 },
                 messages: {
                   explanation: {
                     body: (
                       <>

                         <Guidance.HeadsUp>
                          We haven't checked your answer, but:
                           Each bit has a 75% chance of matching, so 100 bits have a{" "}
                           <M t="{(0.75)^{100}}" /> chance of matching. This is roughly a{" "}
                           <M t="{3\times 10^{-11} \%}" /> chance of matching. The chance
                           that Alice and Bob fail to notice their eavesdropper is
                           practically nil.
                         </Guidance.HeadsUp>
                       </>
                     ),
                     onContinue: "nextSection",
                   },
                 },
               },
             }),
             section({
               name: "conclusion",
               body: (
                 <>
                   <Prose>
                     In this protocol, Alice and Bob were able to share a secret key
                     (which is just a sequence of 0s and 1s). Moreover, they were able to
                     detect whether or not someone (in our example, Eve), was listening
                     in. This protocol does require that Alice and Bob “throw away” a lot
                     of bits.
                     <br />
                     <br />
                     Here is an overview of the protocol you just learned:
                     <ol>
                       <li>
                         Alice sends qubits to Bob: she randomly picks{" "}
                         <M t="{\ket{0}}" /> or a <M t="{\ket{1}}" /> to send and
                         randomly chooses whether to send them through a Hadamard gate.
                       </li>
                       <li>
                         Bob receives the qubits and randomly chooses whether to send
                         them through a Hadamard. He then measures in the{" "}
                         <M t="{\{\ket{0}, \ket{1}\}}" /> basis.
                       </li>
                       <li>
                         Alice and Bob publicly reveal whether or not they applied a
                         Hadamard gate.
                       </li>
                       <li>
                         Alice and Bob discard all elements of their key where they did
                         not make the same Hadamard choice (that is when only one of them
                         did a Hadamard gate).
                       </li>
                       <li>
                         Finally, Alice and Bob check for an Eavesdropper, who would have
                         messed with the qubits in between steps 1 and 2. They check by
                         disclosing a portion of their remaining key. (They can no longer
                         use these elements of the key to encrypt/decrypt anything.) If
                         their bits are all the same, they can be confident no one
                         intercepted. If the bits are not the same, they might have made
                         mistakes or there may have been an eavesdropper. But either way,
                         they should abandon the protocol and start fresh again.
                       </li>
                     </ol>
                   </Prose>
                 </>
               ),
             }),
            //
      ]}));
