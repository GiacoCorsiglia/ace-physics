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
  TextBox,
  Toggle,
} from "@/components";
import { page, repeatedModel } from "@/tutorial";
import Hadamard1Half from "./media/BB84 Alice and Bob Half.png";
import Hadamard1Full from "./media/BB84 Alice and Bob.png";
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

    section({
      name: "tableWithoutEveStateAlice1",
      body: (m, s) => (
        <>
          <Prose>
            Below is a sample of what might happen at the start of a run. The
            first row tells you Alice’s bit, which corresponds to her sending a{" "}
            <M t="{\ket{0}}" /> or a <M t="{\ket{1}}" /> state. The second tells
            you whether she applied the Hadamard gate. Both the first and the
            second row are filled completely randomly. Given this information,
            fill out the third row with the state that actually gets sent to
            Bob.
          </Prose>
          <tableWithoutEve.Component
            model={m.tableWithoutEve}
            rows={[
              "qubitNumber",
              "initialState",
              "didAliceApplyH",
              "stateAlice",
            ]}
            columns={[0, 1, 2, 3]}
            editing="stateAlice"
          />
        </>
      ),
      guidance: {
        nextMessage(r, s) {
          if (tableWithoutEve.isCorrect(r, "stateAlice", [0, 1, 2, 3])) {
            return "correctStates";
          }
          return "wrongStates";
        },
        messages: {
          correctStates: {
            body: (
              <>
                <Callout color="blue">
                  Your table looks good! Let's get some more practice with the
                  next four qubits Alice sends to Bob.
                </Callout>
              </>
            ),
            onContinue: "nextSection",
            continueLabel: "More qubits!",
          },
          wrongStates: {
            body: (
              <>
                <Callout color="red">
                  Looks like we disagree with some of your answers for Alice's
                  states. Recall the effect of the Hadamard gate on a qubit:
                  <M t="{H\ket{0} = \ket{+}}" display={true} />
                  <M t="{H\ket{1} = \ket{-}}" display={true} />
                  Also, if Alice does not apply the H-gate, does the qubit
                  change?
                </Callout>
              </>
            ),
            onContinue: "nextMessage",
            continueLabel: "Try again",
          },
        },
      },
      continue: {
        label: "Check in!",
        allowed: (s, _, m) =>
          tableWithoutEve.isComplete(s, m, "stateAlice", [0, 1, 2, 3]),
      },
    }),

    section({
      name: "tableWithoutEveStateAlice1Answers",
      enumerate: false,
      when: (r) => !tableWithoutEve.isCorrect(r, "stateAlice", [0, 1, 2, 3]),
      body: (m) => (
        <>
          <Prose>Here's our answers for the states Alice sends to Bob.</Prose>
          <tableWithoutEve.Component
            model={repeatedModel(m.tableWithoutEve)}
            rows={[
              "qubitNumber",
              "initialState",
              "didAliceApplyH",
              "stateAlice",
            ]}
            columns={[0, 1, 2, 3]}
          />
          <Prose>
            Before we move on, let's try the next qubits Alice sends.
          </Prose>
        </>
      ),
      continue: {
        label: "More qubits!",
        allowed: () => true,
      },
    }),

    section({
      name: "tableWithoutEveStateAlice2",
      body: (m, s) => (
        <>
          <Prose>
            Alice sends a total of 12 qubits to Bob. We've seen the first set of
            four; now let's try the second! Fill out the third row in this table
            with the state that actually gets sent to Bob.
          </Prose>
          <tableWithoutEve.Component
            model={repeatedModel(m.tableWithoutEve)}
            rows={[
              "qubitNumber",
              "initialState",
              "didAliceApplyH",
              "stateAlice",
            ]}
            columns={[4, 5, 6, 7]}
            editing="stateAlice"
          />
        </>
      ),
      guidance: {
        nextMessage(r, s) {
          if (tableWithoutEve.isCorrect(r, "stateAlice", [4, 5, 6, 7])) {
            return "correctStates";
          }
          return "wrongStates";
        },
        messages: {
          correctStates: {
            body: (
              <>
                <Callout color="blue">
                  Your table looks good! Let's see the final table, with all 12
                  qubits.
                </Callout>
              </>
            ),
            onContinue: "nextSection",
            continueLabel: "More qubits!",
          },
          wrongStates: {
            body: (
              <>
                <Callout color="red">
                  Looks like we disagree with some of your answers for Alice's
                  states. Recall the effect of the Hadamard gate on a qubit:
                  <M t="{H\ket{0} = \ket{+}}" display={true} />
                  <M t="{H\ket{1} = \ket{-}}" display={true} />
                  Also, if Alice does not apply the H-gate, does the qubit
                  change?
                </Callout>
              </>
            ),
            onContinue: "nextMessage",
            continueLabel: "Try again",
          },
        },
      },
      continue: {
        label: "Check in!",
        allowed: (s, _, m) =>
          tableWithoutEve.isComplete(s, m, "stateAlice", [4, 5, 6, 7]),
      },
    }),

    section({
      name: "tableWithoutEveStateAlice2Answers",
      enumerate: false,
      when: (r) => !tableWithoutEve.isCorrect(r, "stateAlice", [4, 5, 6, 7]),
      body: (m) => (
        <>
          <Prose>Here's our answers for the states Alice sends to Bob.</Prose>
          <tableWithoutEve.Component
            model={repeatedModel(m.tableWithoutEve)}
            rows={[
              "qubitNumber",
              "initialState",
              "didAliceApplyH",
              "stateAlice",
            ]}
            columns={[4, 5, 6, 7]}
          />
          <Prose>
            Alice sends a total of 12 qubits to Bob. We've filled in the final
            four—let's see the final table!
          </Prose>
        </>
      ),
      continue: {
        label: "More qubits!",
        allowed: () => true,
      },
    }),

    section({
      name: "tableWithoutEveStateAliceComplete",
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
            ]}
          />
        </>
      ),
      continue: {
        allowed: () => true,
      },
    }),

    section({
      name: "bobRandomChoiceOnEachQubit",
      body: (m) => (
        <>
          <Prose>
            When the qubit makes it to Bob, he randomly decides whether to apply
            his own Hadamard gate or not. <br /> <br />
            After doing so, he measures the qubit in the{" "}
            <M t="{\{\ket{0}, \ket{1}\}}" /> basis.
            <br />
            <Image
              src={Hadamard1Full}
              alt="The experimental setup described above"
            />
            We have added a new row to the table with the (random) choice Bob
            makes on each qubit: to apply an H or not? Please fill in the last
            row with the outcome of his subsequent measurement. "R" means his
            measurement is "random", with a 50% chance of getting either 0 or 1.
          </Prose>
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
            editing="bitBob"
            columns={[0, 1, 2, 3]}
          />
        </>
      ),
      guidance: {
        nextMessage(r, s) {
          if (tableWithoutEve.isCorrect(r, "bitBob", [0, 1, 2, 3])) {
            return "correctBits";
          }
          if (
            s.sections?.bobRandomChoiceOnEachQubit?.revealedMessages?.includes(
              "wrongBits",
            )
          )
            return "wrongBits2";
          return "wrongBits";
        },
        messages: {
          correctBits: {
            body: (
              <>
                <Callout color="blue">
                  Your table looks good! Let's get some more practice with the
                  next four qubits.
                </Callout>
              </>
            ),
            onContinue: "nextSection",
            continueLabel: "More qubits!",
          },
          wrongBits: {
            body: (
              <>
                <Callout color="red">
                  Looks like we disagree with some of your answers for Bob's
                  measurements. It might help to write down the state Bob has
                  after he does or does not apply the H-gate.
                </Callout>
              </>
            ),
            onContinue: "nextMessage",
            continueLabel: "Try again",
          },
          wrongBits2: {
            body: (
              <>
                <Callout color="red">
                  Looks like we still disagree. Recall the effects of the H
                  gate:
                  <br />
                  <center>
                    <M t="{H\ket{0} = \ket{+}}" /> <br />
                    <M t="{H\ket{1} = \ket{-}}" />
                    <br />
                    <M t="{H\ket{+} = \ket{0}}" /> <br />
                    <M t="{H\ket{-} = \ket{1}}" />
                  </center>
                  <br />
                  Also recall: <br />
                  <center>
                    <M
                      display={true}
                      t="{\ket{+} = \frac{1}{\sqrt{2}}(\ket{0}+\ket{1})}"
                    />
                    <br />
                    <M
                      display={true}
                      t="{\ket{-} = \frac{1}{\sqrt{2}}(\ket{0}-\ket{1})}"
                    />
                  </center>
                </Callout>
              </>
            ),
            onContinue: "nextMessage",
            continueLabel: "Check again",
            skipAllowed: () => true,
          },
        },
      },
      continue: {
        label: "Check in!",
        allowed: (s, _, m) =>
          tableWithoutEve.isComplete(s, m, "bitBob", [0, 1, 2, 3]),
      },
    }),
    section({
      name: "bobRandomChoiceOnEachQubitAnswers",
      enumerate: false,
      when: (r) => !tableWithoutEve.isCorrect(r, "bitBob", [0, 1, 2, 3]),
      body: (m) => (
        <>
          <Prose>Here's our answers for Bob's measurements.</Prose>
          <tableWithoutEve.Component
            model={repeatedModel(m.tableWithoutEve)}
            rows={[
              "qubitNumber",
              "initialState",
              "didAliceApplyH",
              "stateAlice",
              "didBobApplyH",
              "bitBobBeforeNature",
            ]}
            columns={[0, 1, 2, 3]}
          />
          <Prose>
            Before we move on, let's try the next qubits Alice sends.
          </Prose>
        </>
      ),
      continue: {
        label: "More qubits!",
        allowed: () => true,
      },
    }),
    section({
      name: "bobRandomChoiceOnEachQubit2",
      enumerate: true,
      body: (m) => (
        <>
          <Prose>
            Given the next four qubits Alice sends Bob, and whether he chooses
            to apply a Hadamard or not, fill in the dropdowns with the outcome
            of Bob's measurement: 0, 1, or "R" for random, with a 50% chance of
            getting either 0 or 1.
          </Prose>
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
            editing="bitBob"
            columns={[4, 5, 6, 7]}
          />
        </>
      ),
      guidance: {
        nextMessage(r, s) {
          if (tableWithoutEve.isCorrect(r, "bitBob", [4, 5, 6, 7])) {
            return "correctBits";
          }
          if (
            s.sections?.bobRandomChoiceOnEachQubit?.revealedMessages?.includes(
              "wrongBits",
            )
          )
            return "wrongBits2";
          return "wrongBits";
        },
        messages: {
          correctBits: {
            body: (
              <>
                <Callout color="blue">
                  Your table looks good! Hit the “measure” button to let
                  “nature” determine the outcomes of all the cells labeled “R”
                  for random in the last row. We'll also include the last four
                  bits that Alice sent.
                </Callout>
              </>
            ),
            onContinue: "nextSection",
            continueLabel: "Measure!",
          },
          wrongBits: {
            body: (
              <>
                <Callout color="red">
                  Looks like we disagree with some of your answers for Bob's
                  measurements. It might help to write down the state Bob has
                  after he does or does not apply the H-gate.
                </Callout>
              </>
            ),
            onContinue: "nextMessage",
            continueLabel: "Try again",
          },
          wrongBits2: {
            body: (
              <>
                <Callout color="red">
                  Looks like we still disagree. Recall the effects of the H
                  gate:
                  <br />
                  <center>
                    <M t="{H\ket{0} = \ket{+}}" /> <br />
                    <M t="{H\ket{1} = \ket{-}}" />
                    <br />
                    <M t="{H\ket{+} = \ket{0}}" /> <br />
                    <M t="{H\ket{-} = \ket{1}}" />
                  </center>
                  <br />
                  Also recall: <br />
                  <center>
                    <M
                      display={true}
                      t="{\ket{+} = \frac{1}{\sqrt{2}}(\ket{0}+\ket{1})}"
                    />
                    <br />
                    <M
                      display={true}
                      t="{\ket{-} = \frac{1}{\sqrt{2}}(\ket{0}-\ket{1})}"
                    />
                  </center>
                </Callout>
              </>
            ),
            onContinue: "nextMessage",
            continueLabel: "Check again",
            skipAllowed: () => true,
          },
        },
      },
      continue: {
        label: "Check in!",
        allowed: (s, _, m) =>
          tableWithoutEve.isComplete(s, m, "bitBob", [4, 5, 6, 7]),
      },
    }),
    section({
      name: "bobRandomChoiceOnEachQubitAnswers2",
      enumerate: false,
      when: (r) => !tableWithoutEve.isCorrect(r, "bitBob", [4, 5, 6, 7]),
      body: (m) => (
        <>
          <Prose>Here's our answers for Bob's measurements.</Prose>
          <tableWithoutEve.Component
            model={repeatedModel(m.tableWithoutEve)}
            rows={[
              "qubitNumber",
              "initialState",
              "didAliceApplyH",
              "stateAlice",
              "didBobApplyH",
              "bitBobBeforeNature",
            ]}
            columns={[4, 5, 6, 7]}
          />
          <Prose>
            Hit "Measure!" to let "nature" determine the outcomes of all the
            cells labeled "R" for random in the last row. We'll also add the
            last four qubits from before.
          </Prose>
        </>
      ),
      continue: {
        label: "Measure!",
        allowed: () => true,
      },
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
      //
    }),
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
    section({
      name: "doesAliceBobShareKeyAtCurrentStage",
      body: (m, s) => (
        <Toggle
          model={m.doesAliceBobShareKeyCheckOne}
          label={
            <Prose>
              At this stage, would you say Alice and Bob share a key?
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
