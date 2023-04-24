import {
  Callout,
  ChooseOne,
  Decimal,
  Dropdown,
  LabelsLeft,
  M,
  Prose,
  Toggle,
} from "@/components";
import { page } from "@/tutorial";
import setup from "./setup";

export default page(setup, ({ section }) => ({
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
            <b>
              <u>Step 1:</u>
            </b>{" "}
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
          [There is a qubit circuit drawn here]
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
      body: (m, { responses }) => (
        <>
          <Prose>
            If they continue this protocol with many qubits and then compare
            their strings, what fraction of the bits will agree (on average)
          </Prose>
          <LabelsLeft>
            <Dropdown
              model={m.fractionOfBitStringsAgree}
              label={<Prose>Percentage in agreement: </Prose>}
              choices={[
                ["0%", "0%"],
                ["25%", "25%"],
                ["50%", "50%"],
                ["75%", "75%"],
                ["100%", "100%"],
                ["other", "something else"],
              ]}
            />
          </LabelsLeft>
          {responses?.fractionOfBitStringsAgree && (
            <Toggle
              model={m.doesAliceBobShareKeyCheckOne}
              label={
                <Prose>
                  At this stage, would you say Alice and Bob share a key?
                </Prose>
              }
              choices={[
                ["yes", "Yes, there is a sufficent amount of bits that agree."],
                ["no", "No, the error rate disproves this."],
              ]}
            />
          )}
        </>
      ),
    }),
    section({
      name: "fractionOfBitStringsAgreeExplanation",
      enumerate: false,
      body: (
        <Prose>
          <p>
            They do not share a key, there are too many mismatches. Alice and
            Bob must remove every bit where they could have a mismatch. To do
            this, after all measurements have been made, they both publicly
            share their full record of whether or not they applied an H gate.
            They do NOT publicly share their bit values.
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
        <ChooseOne
          model={m.frequencyTheyDiscardBit}
          label={
            <Prose>On average, how frequently do they discard a bit?</Prose>
          }
          choices={[
            ["25%", "25% of the time"],
            ["50%", "50% of the time"],
            ["75%", "75% of the time"],
          ]}
        />
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
