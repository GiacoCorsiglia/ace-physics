import {
  Dropdown,
  Guidance,
  Image,
  LabelsLeft,
  M,
  Prose,
  Toggle,
} from "@/components";
import { page, repeatedModel } from "@/tutorial";
import Hadamard1Half from "./media/BB84 Alice and Bob Half.png";
import setup from "./setup";
import { tableWithoutEve } from "./shared";

export default page(setup, ({ section, oneOf }) => ({
  name: "quantumKeyDistribution",
  label: "Quantum Key Distribution",
  answers: "checked-all",
  sections: [
    section({
      name: "quantumKeyDistributionIntro",
      body: (
        <Prose>
          <p>
            There are several protocols that will enable two parties to
            distribute a secure, private key using the principles of quantum
            mechanics. The protocol discussed below is called the BB84 protocol
            after its inventors Charles Bennett and Gilles Brassard developed it
            in 1984.
          </p>
          <p>
            <u>The goal:</u> Alice and Bob wish to share a secret “key”, a long
            string of randomly generated 0’s and 1’s that they each possess, but
            nobody else does. (The secret key can be used to encode and decode
            secret messages at a later time. Note that the key itself does not
            contain any encrypted information.)
          </p>
          <p>
            When you send classical messages, you can't tell if someone was
            "eavesdropping". We are going to use quantum mechanics to generate a
            secret key and test to make sure no one was listening in.
          </p>
        </Prose>
      ),
    }),

    section({
      name: "aliceSendsSeriesOfQubits",
      enumerate: false,
      body: (
        <Prose>
          <p>
            Alice sends a series of qubits to Bob using the following protocol
            for each qubit:
          </p>
          <p>
            <ul>
              <li>
                Alice first randomly chooses to send a <M t="{\ket{0}}" /> or a{" "}
                <M t="{\ket{1}}" />.
              </li>
              <li>
                Then she randomly chooses whether to send this qubit through a
                single Hadamard gate or not.
              </li>
            </ul>
          </p>
          <p>
            For example, if she sends a <M t="{\ket{1}}" /> with no Hadamard,
            Bob receives a <M t="{\ket{1}}" /> If she sends a{" "}
            <M t="{\ket{0}}" /> through a Hadamard, Bob receives a{" "}
            <M t="{\ket{+}}" /> (which is <M t="{H\ket{0}}" />) Alice keeps a
            record of both her choices.
          </p>
          <Image
            src={Hadamard1Half}
            alt="The experimental setup described above"
          />
        </Prose>
      ),
    }),
    //                          intro table
     section({
      name: "tableWithoutEveStateAliceComplete",
      enumerate: false,
      body: (m) => (
        <>
          <tableWithoutEve.Component
            model={repeatedModel(m.tableWithoutEve)}
            rows={[
              "qubitNumber",
              "initialStateTwo",
              "didAliceApplyHTwo",
              "stateAliceTwo",
            ]}
          />
        </>
      ),
      continue: {
       allowed: () => true,
      },
    }),

    //                        question A
    section({
      name: "qubit1AliceToBob",
       body: (m) => (
        <Dropdown
          model={m.qubit1AliceToBob}
          label={
            <Prose>
             For qubit 1, what state does Alice send to Bob?
            </Prose>
          }
          choices={[
            ["+z", <M t="{H\ket{0}}" />],
            ["-z", <M t="{H\ket{1}}" />],
            ["+x", <M t="{H\ket{+}}" />],
            ["-x", <M t="{H\ket{-}}" />],
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
                        responses?.qubit1AliceToBob?.selected === "+z" ? "agree" : "disagree"
                      }
                    >
                      {responses?.qubit1AliceToBob?.selected !== "+z" ? (
                        <p>
                          Notice that for qubit 1, Alice wants to send 0 and
                          does not apply a Hadamard, so the qubit is unchanged.
                          Feel free to change your answer.
                        </p>
                      ) : (
                        <p>Yes! Alice wants to send 0 and does not apply a
                          Hadamard, so the qubit is unchanged.
                      </p>

                      )}
                    </Guidance.Dynamic>
                  ),
                  onContinue: "nextSection",
                },
              },
            },
    }),
    //                          question B
    section({
      name: "qubit2And5AliceToBob",
      body: (m, s) => (
        <>
         <LabelsLeft>
         <Dropdown
          model={m.qubit2AliceToBob}
          label={
            <Prose>
             For qubit 2, what state does Alice send to Bob?
            </Prose>
          }
          choices={[
            ["+z", <M t="{H\ket{0}}" />],
            ["-z", <M t="{H\ket{1}}" />],
            ["+x", <M t="{H\ket{+}}" />],
            ["-x", <M t="{H\ket{-}}" />],
            ["+y", "Other"],
          ]}
        />
           <Dropdown
          model={m.qubit5AliceToBob}
          label={
            <Prose>
             For qubit 5, what state does Alice send to Bob?
            </Prose>
          }
          choices={[
            ["+z", <M t="{H\ket{0}}" />],
            ["-z", <M t="{H\ket{1}}" />],
            ["+x", <M t="{H\ket{+}}" />],
            ["-x", <M t="{H\ket{-}}" />],
            ["+y", <M t="other" />],
          ]}
        />
        </LabelsLeft>
        </>
      ),
     guidance: {
            nextMessage: ((r: any) => {
               const a = r.qubit2AliceToBob?.selected;
               const b = r.qubit5AliceToBob?.selected;

               if (a === "+x" && b === "-x") {
                 return "correct";
               }

               // Only return "incorrect" if either dropdown has a value selected
               if (a !== "+x" || b !== "-x") {
                 return "incorrect";
               }
               // Otherwise, return null so no message is shown
               return null;
             }) as any,
             messages: {
               correct: {
                 body: (
                   <Guidance.Agree>Nice, we agree with your answer.</Guidance.Agree>
                 ),
                 onContinue: "nextSection",
               },
               incorrect: {
                 body: (
                   <Guidance.Disagree>
                     Looks like we disagree with at least one of your answers
                     for Alice's states. Recall the effect of the Hadamard gate
                     on a qubit:
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
      //continue: {
       // label: "Check in!",
        //allowed: (s, _, m) =>
         // tableWithoutEve.isComplete(s, m, "stateAlice", [4, 5, 6, 7]),
     // },
    }),

    section({
      name: "qubit8And9ApplyH",
      body: (m, s) => (
        <>
        <Prose> Use the information in the table to determine whether
          or not Alice applied a Hadamard to the following qubits.
        </Prose>
         <LabelsLeft>
         <Dropdown
          model={m.qubit8ApplyH}
          label={
            <Prose>
            Qubit 8:
            </Prose>
          }
          choices={[
            ["yes", <M t="Yes" />],
            ["no", <M t="No" />],
            ["unknown", "Unknown"],

          ]}
        />
           <Dropdown
          model={m.qubit9ApplyH}
          label={
            <Prose>
             Qubit 9:
            </Prose>
          }
          choices={[
            ["yes", <M t="Yes" />],
            ["no", <M t="No" />],
            ["unknown", "Unknown"],
          ]}
        />
        </LabelsLeft>
        </>
      ),
     guidance: {
            nextMessage: ((r: any) => {
               const a = r.qubit8ApplyH?.selected;
               const b = r.qubit9ApplyH?.selected;

               if (a === "yes" && b === "no") {
                 return "correct";
               }

               return "incorrect";
             }) as any,
             messages: {
               correct: {
                 body: (
                   <Guidance.Agree> We agree! On qubit 8, Alice's Hadamard
                    converted the <M t="\ket{0}"/> to a <M t="\ket{-}"/>. For
                    qubit 9, Alice did not operate on the qubit.
                   </Guidance.Agree>
                 ),
                 onContinue: "nextSection",
               },
               incorrect: {
                 body: (
                   <Guidance.Disagree>
                     We disagree with at least one of your answers. Since
                     Alice's bit is a 1, she starts with the <M t="\ket{1}"/>
                     state and either applies a Hadamard or not. Feel free to
                     change your answer(s).
                   </Guidance.Disagree>
                 ),
                 onContinue: "nextMessage",
               },
             },
           },
      //continue: {
       // label: "Check in!",
        //allowed: (s, _, m) =>
         // tableWithoutEve.isComplete(s, m, "stateAlice", [4, 5, 6, 7]),
     // },
    }),

      //                         question C
    section({
      name: "qubit10And11AlicesBit",
      body: (m, s) => (
        <>
        <Prose> For qubits 10 and 11, use the information in the table to
          determine which is the value of Alice's bit.
        </Prose>
         <LabelsLeft>
         <Dropdown
          model={m.qubit10AlicesBit}
          label={
            <Prose>
            Qubit 10:
            </Prose>
          }
          choices={[
            ["0", <M t="0" />],
            ["1", <M t="1" />],
            ["impossible", "Impossible"],

          ]}
        />
           <Dropdown
          model={m.qubit11AlicesBit}
          label={
            <Prose>
             Qubit 11:
            </Prose>
          }
          choices={[
             ["0", <M t="0" />],
            ["1", <M t="1" />],
            ["impossible", "Impossible"],
          ]}
        />
        </LabelsLeft>
        </>
      ),
       guidance: {
            nextMessage: ((r: any) => {
               const a = r.qubit10AlicesBit?.selected;
               const b = r.qubit11AlicesBit?.selected;

               // If neither dropdown has a selection yet, show no message
               if (a === undefined && b === undefined) {
                 return null;
               }

               if (a === "1" && b === "0") {
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
                     We disagree with at least one of your answers. Take another
                     look and feel free to change your answers.
                   </Guidance.Disagree>
                 ),
                 onContinue: "nextMessage",
               },
             },
           },
      //continue: {
       // label: "Check in!",
       // allowed: (s, _, m) =>
       //   tableWithoutEve.isComplete(s, m, "bitBob", [0, 1, 2, 3]),
     // },
    }),
    /////////////////////////////////////////////////////////////////////////
    //                            table 2
    section({
      //table is line 436 of 'shared' page
      name: "natureEffectBobBitAfterMeasurement",
      enumerate: false,
      body: (m) => (
        <>
          <tableWithoutEve.Component
            model={repeatedModel(m.tableWithoutEve)}
            rows={[
              "qubitNumber",
              "initialState",
              "didAliceApplyH",
              "stateAlice",
              "didBobApplyH",
              "bitBob",
            ]}
          />
          <Prose>
            Note that in all cases where the outcome was “random”, nature has
            picked a 0 or 1. We highlighted those above in grey and italics to
            remind you that those could have come out different. But this is
            what Bob got!
          </Prose>
        </>
      ),
      continue: {
        allowed: () => true,
      },
    }),
    //                          question 5
    section({
      name: "qubit2BobsBit",
       body: (m) => (
        <Dropdown
          model={m.qubit2BobsBit}
          label={
            <Prose>
             For qubit 2, what is the value of Bob's bit?
            </Prose>
          }
          choices={[
            ["0", <M t="0" />],
            ["1", <M t="1" />],
            ["random", "Random"],

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
                        responses?.qubit2BobsBit?.selected === "0" ? "agree" : "disagree"
                      }
                    >
                      {responses?.qubit2BobsBit?.selected !== "0" ? (
                        <p>
                          We disagree. Qubit 2 comes to Bob as a <M t="\ket{+}"/>.
                          Since Bob applies a Hadamard, he ends up measuring
                          <M t="{H\ket{+}=\ket{0}}" />, which has a 100% chance
                          of being measured to be 0.
                        </p>
                      ) : (
                        <p> We agree. Qubit 2 comes to Bob as a <M t="\ket{+}"/>.
                          Since Bob applies a Hadamard, he ends up measuring
                          <M t="{H\ket{+}=\ket{0}}" />, which has a 100% chance
                          of being measured to be 0.
                      </p>

                      )}
                    </Guidance.Dynamic>
                  ),
                  onContinue: "nextSection",
                },
              },
            },
    }),
    // question 6
     section({
      name: "qubit3And4Bits",
      body: (m, s) => (
        <>
        <Prose> For qubits 3 and 4, what are the values of Bob's bits?
        </Prose>
         <LabelsLeft>
         <Dropdown
          model={m.qubit3BobsBit}
          label={
            <Prose>
            Qubit 3:
            </Prose>
          }
          choices={[
            ["0", <M t="0" />],
            ["1", <M t="1" />],
            ["random", "Random"],

          ]}
        />
           <Dropdown
          model={m.qubit4BobsBit}
          label={
            <Prose>
             Qubit 4:
            </Prose>
          }
          choices={[
             ["0", <M t="0" />],
            ["1", <M t="1" />],
            ["random", "Random"],
          ]}
        />
        </LabelsLeft>
        </>
      ),
       guidance: {
            nextMessage: ((r: any) => {
               const a = r.qubit3BobsBit?.selected;
               const b = r.qubit4BobsBit?.selected;

               // If neither dropdown has a selection yet, show no message
               if (a === undefined && b === undefined) {
                 return null;
               }

               if (a === "random" && b === "1") {
                 return "correct";
               }

               return "incorrect";
             }) as any,
             messages: {
               correct: {
                 body: (
                   <Guidance.Agree> Correct! Great job! In the case of qubit 3,
                    the result is random, and Bob might have a 0 or a 1. We'll
                    see how to deal with this soon!
                   </Guidance.Agree>
                 ),
                 onContinue: "nextSection",
               },
               incorrect: {
                 body: (
                   <Guidance.Disagree>
                     We disagree with at least one of your answers. Remember that
                     if Bob makes a measurement on a state that is <M t="\ket{+}"/>
                      or <M t="\ket{-}"/>, his result
                     will be random. Feel free to change your answers.
                   </Guidance.Disagree>
                 ),
                 onContinue: "nextMessage",
               },
             },
           },
    }),
    // question 7
     section({
      name: "qubit6ApplyH",
       body: (m) => (
        <Dropdown
          model={m.qubit6ApplyH}
          label={
            <Prose>
             For qubit 6, given all the information in the table, did Bob apply
             a Hadamard before he measured?
            </Prose>
          }
          choices={[
            ["yes", "Yes"],
            ["no", "No"],
            ["unknown", "Unknown"],

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
                        responses?.qubit6ApplyH?.selected === "no" ? "agree" : "disagree"
                      }
                    >
                      {responses?.qubit6ApplyH?.selected !== "no" ? (
                        <p>
                          Notice that Bob has not applied a Hadamard to the
                          <M t="\ket{+}"/> state he was sent, so he is measuring
                          a <M t="\ket{+}"/> qubit. Is the outcome (0 or 1)
                          random or determined? Feel free to change your answer.
                        </p>
                      ) : (
                        <p> Yes we agree. Bob did not apply a Hadamard to the
                          <M t="\ket{+}"/> state that he was sent. When measuring
                          a <M t="\ket{+}"/> qubit, the outcome is random (with
                          50/50 odds of getting 0 or 1).
                      </p>

                      )}
                    </Guidance.Dynamic>
                  ),
                  onContinue: "nextSection",
                },
              },
            },
    }),
    // question 8
     section({
      name: "qubit7And10ApplyH",
      body: (m, s) => (
        <>
        <Prose> For qubits 7 and 10, did Bob apply a Hadamard before he measured?
        </Prose>
         <LabelsLeft>
         <Dropdown
          model={m.qubit7ApplyH}
          label={
            <Prose>
            Qubit 7:
            </Prose>
          }
          choices={[
            ["yes", "Yes"],
            ["no", "No"],
            ["unknown", "Unknown"],

          ]}
        />
           <Dropdown
          model={m.qubit10ApplyH}
          label={
            <Prose>
             Qubit 10:
            </Prose>
          }
          choices={[
             ["yes", "Yes"],
            ["no", "No"],
            ["unknown", "Unknown"],
          ]}
        />
        </LabelsLeft>
        </>
      ),
       guidance: {
            nextMessage: ((r: any) => {
               const a = r.qubit7ApplyH?.selected;
               const b = r.qubit10ApplyH?.selected;

               // If neither dropdown has a selection yet, show no message
               if (a === undefined && b === undefined) {
                 return null;
               }

               if (a === "no" && b === "yes") {
                 return "correct";
               }

               return "incorrect";
             }) as any,
             messages: {
               correct: {
                 body: (
                   <Guidance.Agree> We agree! For qubit 7, since we know that
                    Bob's measurement will be 0 with certainty, he must have
                    measured the state <M t="\ket{0}"/>, which is what Alice sent,
                    so he did not apply a Hadamard. But for qubit 10, the fact that
                    his measurement was random tells us he performed a measurement
                    on either the <M t="\ket{+}"/> or <M t="\ket{-}"/> state.
                    (In this case, given what Alice sent, it must have been a
                    <M t="\ket{+}"/>)
                   </Guidance.Agree>
                 ),
                 onContinue: "nextSection",
               },
               incorrect: {
                 body: (
                   <Guidance.Disagree>
                     If Bob's measurement is certain, he must have made a measurement
                     on a <M t="\ket{0}"/> or <M t="\ket{1}"/>.If it is random,
                     he must have made a measurement on a <M t="\ket{+}"/> or
                     <M t="\ket{-}"/>. Look again at the information in the table
                     and feel free to try again.
                   </Guidance.Disagree>
                 ),
                 onContinue: "nextMessage",
               },
             },
           },
    }),
    // question 9
     section({
      name: "certainOrRandom",
       body: (m) => (
        <>
        <Prose> Note that on this page, you can see the entire table with
          information that includes or not Bob's measurement results were random
          or certain. Without talking to Alice, does Bob know whether the result
          he got was "certain" or "random"?
        </Prose>
        <Toggle
                    model={m.certainOrRandom}
                    label="Can he tell?"
                    choices={[
                      ["yes", "Yes, he can tell"],
                      ["no", "No, he cannot tell"],
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
                        responses?.qubit6ApplyH?.selected === "no" ? "agree" : "disagree"
                      }
                    >
                      {responses?.qubit6ApplyH?.selected !== "no" ? (
                        <p>
                         We disagree with your answer. In practice, Bob has no way
                         of knowing whether his measurement outcome was certain to
                         occur or the result of chance. He doesn't know what qubit
                         state Alice sent him. Feel free to change your answer.
                        </p>
                      ) : (
                        <p> We agree with your answer. In practice, Bob has no way
                         of knowing whether his measurement outcome was certain to
                         occur or the result of chance. He doesn't know what qubit
                         state Alice sent him.
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
