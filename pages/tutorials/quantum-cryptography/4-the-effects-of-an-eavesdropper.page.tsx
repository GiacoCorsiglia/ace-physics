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
    /// where things go wrong
    //table 1
    section({
          name: "natureEffectAfterEveSendsQuestion",
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
          //continue: {
           // label: "Check in!",
            //allowed: (s, _, m) =>
             // tableWithoutEve.isComplete(s, m, "stateAlice", [4, 5, 6, 7]),
         // },
        }),
        // question C
         section({
          name: "qubit4And9EvesBit",
          body: (m, s) => (
            <>
            <Prose> Use the information in the table to determine the value of
              Eve's bit (after she measures) for qubits 4 and 9.
            </Prose>
             <LabelsLeft>
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
             <Prose> Hit "Measure!" to let "nature" determine the outcomes of
              all the cells labeled "R" for random in the last row.
            </Prose>
            </>
          ),
         guidance: {
                nextMessage: ((r: any) => {
                   const a = r.evesBitQubit4?.selected;
                   const b = r.evesBitQubit9?.selected;

                   if (a === "random" && b === "1") {
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
                     //onContinue: "nextMessage",
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
        // Table 2 (answers)
         section({
          name: "natureEffectAfterEveSends",
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

      ]}));
