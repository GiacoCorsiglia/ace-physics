import {
  Callout,
  ChooseOne,
  Decimal,
  Dropdown,
  Guidance,
  LabelsLeft,
  M,
  Prose,
  TextBox,
  Toggle
} from "@/components";
import { page, repeatedModel } from "@/tutorial";
import setup from "./setup";
import { tableWithoutEve } from "./shared";

export default page(setup, ({ section, oneOf }) => ({
  name: "dealingWithRandomness",
  label: "Dealing With Randomness",
  answers: "checked-all",
  sections: [
    section({
      name: "dealingWithRandomnessIntro",
      enumerate: false,
       body: (
        <Prose>
          <p>
           Here is a summary of everything you found on the previous page:
          </p>
        </Prose>
      ),
      }),

     section({
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
              "didBobApplyHTwo",
              "bitBobTwo",
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
    // question A
     section({
          name: "circumstancesWhenBobAndAlice100Agree",
          body: (m) => (
            <>
              <TextBox
                model={m.circumstancesWhenBobAndAlice100Agree}
                label={
                  <Prose>
                    <p>
                      Consider the bits where Alice and Bob got the same result with
                      100% probability (i.e., Bob didn't get a <em>random</em> bit).
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
        // question B CHANGE FEEDBACK TO PAGE 2 QUESTION M
        section({
          name: "amountOfBitStringsAgree",
          body: (m) => (
            <>
              <Prose>
                At this stage, if Alice and Bob now compare their bit strings, how
                many bits agree?
              </Prose>
              <LabelsLeft>
                <Decimal
                  model={m.amountOfBitStringsAgree}
                  label={<Prose>Agreed bits: </Prose>}
                />
              </LabelsLeft>
            </>
          ),
          guidance: {
            nextMessage(r) {
              if (r.amountOfBitStringsAgree !== 9) return "incorrect";
              return null;
            },
            messages: {
              incorrect: {
                body: (
                  <>
                    <Callout color="red">
                      To answer this question, we looked at the top and bottom of
                      each column, to see what bit Alice started with (which is
                      'her' bit) and what bit Bob measured (which is 'his' bit). 9
                      times out of 12, their bits matched.
                    </Callout>
                  </>
                ),
                onContinue: "nextSection",
              },
            },
          },
        }),
        //                           question C
        section({
          name: "fractionOfBitStringsAgree",
          body: (m) => (
            <>
              <Prose>
                If we repeat the above procedure many times, what fraction of the
                bits will agree (on average)?
              </Prose>
              <ChooseOne
                model={m.fractionOfBitStringsAgree}
                choices={[
                  ["0%", "0%"],
                  ["25%", "25%"],
                  ["50%", "50%"],
                  ["75%", "75%"],
                  ["100%", "100%"],
                  ["other", "something else"],
                ]}
              />
            </>
          ),
          guidance: {
            nextMessage(r) {
              const res = r.fractionOfBitStringsAgree?.selected;

              if (res === "75%") {
                return "correct";
              }
              return "detour";
            },
            messages: {
              correct: {
                body: (
                  <Guidance.Agree>
                    Correct! While some statistical fluctuations are prone to
                    happen, on average the bits will agree 75% of the time.
                  </Guidance.Agree>
                ),
                onContinue: "nextSection",
              },
              detour: {
                body: (
                  <Guidance.Disagree>
                    Not quite—let's take a small detour to break down the bigger
                    picture...
                  </Guidance.Disagree>
                ),
                onContinue: "nextSection",
              },
            },
          },
        }),
        // detour question 1
        section({
          name: "fractionOfBitStringsAgreeIncorrect",
          when: (r) => r.fractionOfBitStringsAgree?.selected !== "75%",
          body: (m) => (
            <>
              <LabelsLeft>
                <Dropdown
                  model={m.howOftenBobResultBeRandom}
                  label={<Prose>How often will Bob's result be random?</Prose>}
                  choices={[
                    ["0%", "0%"],
                    ["25%", "25%"],
                    ["50%", "50%"],
                    ["75%", "75%"],
                    ["100%", "100%"],
                  ]}
                />
              </LabelsLeft>
            </>
          ),
          guidance: {
            nextMessage(r) {
              const res = r.howOftenBobResultBeRandom?.selected;

              if (res === "50%") {
                return "correct";
              }
              return "incorrect";
            },
            messages: {
              correct: {
                body: (
                  <Guidance.Agree>
                    You're right! Whenever Bob makes a different Hadamard choice
                    from Alice, the state he ends up measuring will be either
                    <M t="{\ket{+}}" /> or <M t="{\ket{-}}" />. When he measures one
                    of those states, he gets a random result. This happens 50% of
                    the time.
                  </Guidance.Agree>
                ),
                onContinue: "nextSection",
              },
              incorrect: {
                body: (
                  <Guidance.Disagree>
                    Think about what happens when Bob makes a different Hadamard
                    choice from Alice. The state he ends up measuring will be either{" "}
                    <M t="{\ket{+}}" /> or <M t="{\ket{-}}" />. When he measures one
                    of those states, he gets a random result. This happens 50% of
                    the time.
                  </Guidance.Disagree>
                ),
                onContinue: "nextMessage",
              },
            },
          },
        }),
        //detour question 2
        section({
          name: "isBobResultNotRandomAgreement",
          when: (r) => r.howOftenBobResultBeRandom !== undefined,
          body: (m, s) => (
            <>
              <Toggle
                model={m.isBobResultNotRandomAgreement}
                label={
                  <Prose>
                    With that in mind, if Bob's result is <b>NOT</b> random, do they
                    agree 100% of the time?
                  </Prose>
                }
                choices={[
                  ["yes", "Yes, they do."],
                  ["no", "No, they do not."],
                ]}
                disabled={s.sections?.isBobResultNotRandomAgreement?.revealedMessages?.includes(
                  "incorrect",
                )}
              />
            </>
          ),
          guidance: {
            nextMessage(r) {
              const res = r.isBobResultNotRandomAgreement?.selected;

              if (res === "no") {
                return "incorrect";
              }
              return null;
            },
            messages: {
              incorrect: {
                body: (
                  <Guidance.Disagree>
                    As it turns out, they agree 100% of the time. When Bob's result
                    is not random, it's because he is measuring a{" "}
                    <M t="{\ket{0}}" /> or <M t="{\ket{1}}" /> state.
                    <hr />
                    If neither Alice nor Bob apply a Hadamard gate, then Bob will
                    get the same state Alice sent him. <hr />
                    If they both apply a Hadamard gate, then Alice's H-gate will be{" "}
                    <em>reversed</em> by Bob's H-gate, leaving Bob with the same
                    state that Alice started with. Either way, his bit will be the
                    same as Alice's.
                  </Guidance.Disagree>
                ),
                onContinue: "nextSection",
              },
            },
          },
        }),
        //detour question 3
        section({
          name: "howOftenNeverthelessMatch",
          enumerate: false,
          when: (r) => r.isBobResultNotRandomAgreement !== undefined,
          body: (m) => (
            <>
              <ChooseOne
                model={m.howOftenWillTheyNeverthelessMatch}
                label={
                  <Prose>
                    <p>Finally let us consider this...</p>
                    <p>
                      Of just those times that Bob's answer was Random, how often
                      will they nevertheless match?
                    </p>
                  </Prose>
                }
                choices={[
                  ["0%", "0%"],
                  ["25%", "25%"],
                  ["50%", "50%"],
                  ["75%", "75%"],
                  ["100%", "100%"],
                  ["other", "something else"],
                ]}
              />
            </>
          ),
          guidance: {
            nextMessage(r) {
              const answer = r.howOftenWillTheyNeverthelessMatch?.selected;

              if (answer === "50%") {
                return "correct";
              }
              return "incorrect";
            },
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
                    Please double-check your answer. Remember that when Bob's result
                    is random, he is just as likely to measure a 0 as he is to
                    measure a 1.
                  </Guidance.Disagree>
                ),
                onContinue: "nextMessage",
              },
            },
          },
        }),
        //detour question 4
        section({
          name: "fractionOfBitStringsAgreeRetry",
          when: (r) => r.howOftenWillTheyNeverthelessMatch !== undefined,
          enumerate: false,
          body: (m) => (
            <>
              <Callout color="blue">
                Given what we've learned, let's try this question one more time.
                Remember to take your time and think it through!
              </Callout>
              <Prose>
                If Bob and Alice continue this protocol with many qubits and then
                compare their strings, what fraction of the bits will agree (on
                average)?
              </Prose>
              <ChooseOne
                model={m.fractionOfBitStringsAgreeRetry}
                choices={[
                  ["0%", "0%"],
                  ["25%", "25%"],
                  ["50%", "50%"],
                  ["75%", "75%"],
                  ["100%", "100%"],
                  ["other", "something else"],
                ]}
              />
            </>
          ),
          guidance: {
            nextMessage(r) {
              const answer = r.fractionOfBitStringsAgreeRetry?.selected;

              if (answer === "75%") {
                return "correct";
              }
              return "incorrect";
            },
            messages: {
              correct: {
                body: (
                  <Guidance.Agree>
                    Correct! While some statistical fluctuations are prone to
                    happen, on average the bits will agree 75% of the time.
                  </Guidance.Agree>
                ),
                onContinue: "nextSection",
              },
              incorrect: {
                body: (
                  <Guidance.Disagree>
                    Please double-check your answer. How often is Bob's result
                    random (so that they agree 50% of the time), and how often is
                    Bob's result
                    <em>not</em> random (so that they agree 100% of the time)?
                  </Guidance.Disagree>
                ),
                onContinue: "nextMessage",
              },
            },
          },
        }),
        //                         question D
        section({
          name: "doesAliceBobShareKeyAtCurrentStage",
          body: (m, s) => (
            <Toggle
              model={m.doesAliceBobShareKeyCheckOne}
              label={
                <Prose>
                  At this stage, would you say Alice and Bob share a key with
                  no errors?
                </Prose>
              }
              choices={[
                ["yes", "Yes, they share a key."],
                ["no", "No, they do not share a key."],
              ]}
              disabled={s.sections?.doesAliceBobShareKeyAtCurrentStage?.revealedMessages?.includes(
                "incorrect",
              )}
            />
          ),
          guidance: {
            nextMessage(r) {
              const answer = r.doesAliceBobShareKeyCheckOne?.selected;

              if (answer === "yes") {
                return "incorrect";
              }
              return "correct";
            },
            messages: {
              incorrect: {
                body: (
                  <Guidance.Disagree>
                    They do not share a key, considering that they have a 25% error
                    rate. This does not make a good shared key because there are too
                    many mismatches! Let us look at this further on the next page...
                  </Guidance.Disagree>
                ),
                onContinue: "nextSection",
              },
              correct: {
                body: (
                  <Guidance.Agree>
                    Correct! They do not share a key, there are too many mismatches.
                    Let us look at this further on the next page...
                  </Guidance.Agree>
                ),
                onContinue: "nextSection",
              },
            },
          },
        }),
  ],
}));
