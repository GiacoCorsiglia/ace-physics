import {
  Callout,
  ChooseOne,
  Decimal,
  Dropdown,
  Guidance,
  LabelsLeft,
  M,
  Prose,
  Toggle,
} from "@/components";
import { page } from "@/tutorial";
import setup from "./setup";

export default page(setup, ({ section, oneOf }) => ({
  name: "quantumKeyDistribution",
  label: "Quantum Key Distribution",
  answers: "none",
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
            <u>The goal:</u> Alice and Bob wish to share a common “key”, a long
            string of randomly generated 0’s and 1’s that they each possess, but
            nobody else does. (Keyscan be used to encode and decode secret
            messages at a later time, oftenusing a one-time pad.)
          </p>
          <p>
            You might think Alice could just generate a random string andsendit
            to Bob. But what if another partycan “eavesdrop” on the message? Our
            protocol allows us to check to see if anyone else has seen the key.
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
            Alice sends a series of qubits to Bobusing the following protocol
            for each qubit:
          </p>
          <p>
            Alice first randomly chooses to send a <M t="{\ket{0}}" /> or a{" "}
            <M t="{\ket{1}}" />. Then she randomly chooses whether to send this
            qubit through a single Hadamardgateor not.
          </p>
          <p>
            For example, if she sends a <M t="{\ket{1}}" /> with no Hadamard,
            Bob receives a <M t="{\ket{1}}" />
          </p>
          <p>
            If she sends a <M t="{\ket{0}}" /> through a Hadamard, Bob receives
            a <M t="{\ket{+}}" />, etc. She keeps a record of both her choices.
          </p>
          <h1>[There is a qubit circuit drawn here]</h1>
        </Prose>
      ),
    }),
    section({
      name: "stateAliceHasSentBob",
      body: (m) => (
        <Prose>
          Below is a sample of what might happen at the start of a run, with
          Alice's random choices filled in:
          <h1>[[[Show table]]]</h1>
        </Prose>
      ),
    }),
    section({
      name: "bobRandomChoiceOnEachQubit",
      body: (m) => (
        <>
          <Prose>
            We have added a new row with the (random) choice Bob makes on each
            qubit: to apply an H or not? Please fill in the last row with the
            outcome of his subsequent measurement.
            <h1>[[[Show table]]]</h1>
            <h1>[[[Reactively show below once every box is filled]]]</h1>
          </Prose>
          <Callout color="blue">
            Your table looks good so far! Hit the “measure” button to let
            “nature” determine the outcomes of all the cells labeled “R” for
            random in the last row
          </Callout>
        </>
      ),
      continue: {
        label: "Measure!",
      },
    }),
    section({
      name: "natureEffectBobBitAfterMeasurement",
      enumerate: false,
      body: (
        <>
          <Prose>
            <h1>[[[Show table]]]</h1>
            Note that in all cases where the outcome was “random”, nature has
            picked a 0 or 1. We highlighted those above in italics to remind you
            that those could have come out different. But this is what Bob got!
          </Prose>
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
    }),
    section({
      name: "fractionOfBitStringsAgree",
      body: (m) => (
        <>
          <Prose>
            If they continue this protocol with many qubits and then compare
            their strings, what fraction of the bits will agree (on average)?
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
    }),
    oneOf({
      which: (response) => {
        const answer = response.fractionOfBitStringsAgree?.selected;

        if (answer === undefined) {
          return null;
        } else if (answer !== "75%") {
          return "howOftenBobResultBeRandom";
        }
        return "correctAnswer";
      },
      sections: {
        howOftenBobResultBeRandom: section({
          name: "fractionOfBitStringsAgreeIncorrect",
          body: (m) => (
            <>
              <Guidance.Disagree>
                Not quite, let's take a small detour to break down the bigger
                picture...
              </Guidance.Disagree>
              <ChooseOne
                model={m.howOftenBobResultBeRandom}
                label={
                  <Prose>
                    <h3>Detour Part I</h3>
                    <p>How often will Bob's result be random?</p>
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
        }),
        correctAnswer: section({
          name: "fractionOfBitStringsAgreeCorrect",
          body: (
            <Guidance.Agree>
              Correct! While there is some statistical fluctuations prone to
              happen, 75% of the time the bits will agree
            </Guidance.Agree>
          ),
        }),
      },
    }),
    section({
      name: "isBobResultNotRandomAgreement",
      when: (r) => r.fractionOfBitStringsAgree?.selected !== "75%",
      body: (m, { responses }) => (
        <>
          {responses?.howOftenBobResultBeRandom?.selected === "50%" ? (
            <Guidance.Agree>Yeah u right</Guidance.Agree>
          ) : (
            <Guidance.Disagree>nah its 50%</Guidance.Disagree>
          )}
          <Toggle
            model={m.isBobResultNotRandomAgreement}
            label={
              <Prose>
                <h3>Detour Part II</h3>
                <p>
                  With that in mind, if Bob's result is <b>NOT</b> random, do
                  they agree 100% of the time?
                </p>
              </Prose>
            }
            choices={[
              ["yes", "Yes, it is."],
              ["no", "No, it is not."],
            ]}
          />
        </>
      ),
    }),
    section({
      name: "howOftenNeverthelessMatch",
      enumerate: false,
      body: (m, { responses }) => (
        <>
          {responses?.isBobResultNotRandomAgreement?.selected === "yes" ? (
            <Guidance.Agree>Yeah u right</Guidance.Agree>
          ) : (
            <Guidance.Disagree>
              nah, bob agrees 100% of the time
            </Guidance.Disagree>
          )}
          <ChooseOne
            model={m.howOftenWillTheyNeverthelessMatch}
            label={
              <Prose>
                <h3>Detour Part III</h3>
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
    }),
    section({
      name: "howOftenNeverthelessMatchFeedback",
      enumerate: false,
      body: (m, { responses }) => (
        <>
          {responses?.howOftenWillTheyNeverthelessMatch?.selected === "50%" ? (
            <Guidance.Agree>
              Yeah you're correct, it is 50%! Congrats on finishing the detour,
              take a moment to understand what we just practiced right now.
            </Guidance.Agree>
          ) : (
            <Guidance.Disagree>
              The answer is unfortunately 50%. Don't let it beat you up, let's
              continue practicing this notion.
            </Guidance.Disagree>
          )}
        </>
      ),
    }),
    section({
      name: "fractionOfBitStringsAgreeRetry",
      enumerate: false,
      body: (m) => (
        <>
          <Callout color="blue">
            Taking what we just practiced right now, let's try this question one
            more time. Remember to take your time and think it through!
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
    }),
    oneOf({
      which: (response) => {
        const answer = response.fractionOfBitStringsAgreeRetry?.selected;

        if (answer === undefined) {
          return null;
        } else if (answer !== "75%") {
          return "incorrectAnswer";
        }
        return "correctAnswer";
      },
      sections: {
        incorrectAnswer: section({
          name: "fractionOfBitStringsAgreeRetryIncorrect",
          body: <Guidance.Disagree>[lengthy explanation]</Guidance.Disagree>,
        }),
        correctAnswer: section({
          name: "fractionOfBitStringsAgreeRetryCorrect",
          body: (
            <Guidance.Agree>
              <Prose justify="center">
                <h1>🎉YOU DID IT🎉</h1>
                <p>[just mention what they did]</p>
              </Prose>
            </Guidance.Agree>
          ),
        }),
      },
    }),
    section({
      name: "doesAliceBobShareKeyAtCurrentStage",
      body: (m) => (
        <Toggle
          model={m.doesAliceBobShareKeyCheckOne}
          label={
            <Prose>
              At this stage, would you say Alice and Bob share a key?
            </Prose>
          }
          choices={[
            ["yes", "Yes, they share a key."],
            ["no", "No, it is not possible."],
          ]}
        />
      ),
    }),
    section({
      name: "doesAliceBobShareKeyAtCurrentStageIncorrect",
      when: (r) => r.doesAliceBobShareKeyCheckOne?.selected === "yes",
      body: (
        <Guidance.Disagree>
          They do not share a key, a 25% error rate does not make a good shared
          key!
        </Guidance.Disagree>
      ),
    }),

    section({
      name: "fractionOfBitStringsAgreeExplanation",
      enumerate: false,
      body: (m, { responses }) => (
        <Prose>
          <p>
            {responses &&
            responses.doesAliceBobShareKeyCheckOne?.selected === "yes" ? (
              <b>They do not share a key</b>
            ) : (
              <b>You're correct they do not share a key</b>
            )}
            , there are too many mismatches. Alice and Bob must remove every bit
            where they could have a mismatch. To do this, after all measurements
            have been made, they both publicly share their full record of
            whether or not they applied an H gate. They do NOT publicly share
            their bit values.
          </p>
          <p>
            In every case where they did not both make the same decision to
            apply the H gate or not, they both simply discard that bit. Thus,
            all bits that remain arise only when they either both applied an H
            gate, or neither applied an H gate.
          </p>
        </Prose>
      ),
    }),
    section({
      name: "frequencyTheyDiscardBit",
      body: (m) => (
        <>
          <Prose>On average, how frequently do they discard a bit?</Prose>
          <LabelsLeft>
            <Dropdown
              model={m.frequencyTheyDiscardBit}
              label={<Prose>Discard Probability: </Prose>}
              choices={[
                ["25%", "25% of the time"],
                ["50%", "50% of the time"],
                ["75%", "75% of the time"],
              ]}
            />
          </LabelsLeft>
        </>
      ),
    }),
    section({
      name: "keepOrDiscardTableRow",
      body: (m) => (
        <Prose>
          <h1>[[[Show table]]]</h1>
        </Prose>
      ),
    }),
    section({
      name: "doesAliceBobShareKeyCheckTwo",
      body: (m) => (
        <Toggle
          model={m.doesAliceBobShareKeyCheckTwo}
          label={<Prose>At this stage, do Alice and Bob share a key?</Prose>}
          choices={[
            ["yes", "Yes, they both share a key."],
            ["no", "No, the outcome does not allow it."],
          ]}
        />
      ),
    }),
    section({
      name: "whatIsTheSharedKey",
      body: (m) => (
        <>
          <Prose>
            For the example table we worked on above, what is the shared key?
          </Prose>
          <LabelsLeft>
            <Decimal
              model={m.whatIsTheSharedKey}
              label={<Prose>Key in bits: </Prose>}
            ></Decimal>
          </LabelsLeft>
        </>
      ),
    }),
    section({
      name: "doesPublicInfoGiveInfoAboutBitString",
      body: (m) => (
        <ChooseOne
          model={m.doesPublicInfoGiveInfoAboutBitString}
          label={
            <Prose>
              An outside observer, Eve, sees the public information from Alice
              and Bob, sent after all measurements were completed, where they
              each shared their records of whether an H gate was applied each
              time. Does this public information give Eve information about
              Alice or Bob’s bit string?
            </Prose>
          }
          choices={[
            ["yes", "Yes, the public information allows this."],
            ["no", "No, not enough information."],
          ]}
        />
      ),
    }),
    section({
      name: "aliceAndBobPrivateKeyTable",
      body: (
        <Prose>
          Alice and Bob now share a private key! Here is the table so far
          (dashed entries are ignored)
          <h1>[[[Show table]]]</h1>
        </Prose>
      ),
    }),
  ],
}));
