import {
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
  name: "sharingKey",
  label: "Sharing a Private Key",
  sections: [
    section({
      name: "introToSharedKey",
      body: (
        <Prose>
          On the previous page, we explained a quantum cryptographic protocol
          that transmitted a series of bits to Bob. However, Bob and Alice only
          agreed on their bits 75% of the time, and 25% of the time they only
          agreed by accident! On this page, we'll discuss how to make their keys
          agree 100% of the time, by discarding bits that disagree, in a clever
          way.
          <br />
          <br />
          Here's the full table from the previous page:
        </Prose>
      ),
    }),
    section({
      name: "fractionOfBitStringsAgreeExplanationPartOne",
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
      name: "fractionOfBitStringsAgreeExplanationPartTwo",
      enumerate: false,
      body: (
        <Prose>
          In every case where they did not both make the same decision to apply
          the H gate or not, they both simply discard that bit. Thus, all bits
          that remain arise only when theyeither <b>both</b> applied an H gate,
          or <b>neither</b> applied an H gate.
        </Prose>
      ),
      continue: { label: "Interesting!" },
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
      guidance: {
        nextMessage(r) {
          if (r.frequencyTheyDiscardBit?.selected !== "50%") {
            return "incorrect";
          }
          return "correct";
        },
        messages: {
          incorrect: {
            body: (
              <>
                <Guidance.Disagree>
                  Please double-check your answer. When Alice chooses not to
                  apply H, how often does Bob make the same decision? Similarly,
                  when Alice chooses to apply H, how often does Bob make the
                  same decision?
                </Guidance.Disagree>
              </>
            ),
            onContinue: "nextMessage",
          },
          correct: {
            body: (
              <>
                <Guidance.Agree>
                  That's correct! Bob agrees with Alice's H-gate choice 50% of
                  the time. When he agrees, his bit is 100% accurate. The other
                  50% of the time, when they find out that their H-gate choices
                  disagreed for a given bit, they should discard that bit.
                </Guidance.Agree>
              </>
            ),
            onContinue: "nextSection",
          },
        },
      },
    }),
    section({
      name: "keepOrDiscardTableRow",
      body: (m) => (
        <Prose>
          Fill in the following table, stating whether Alice and Bob should keep
          (K) or discard (D) their bit. After you submit your choices for the
          first four qubits, we'll have you practice with the next four qubits
          in another table.
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
            ["no", "No, they do not."],
          ]}
        />
      ),
      guidance: {
        nextMessage(r) {
          const answer = r.doesAliceBobShareKeyCheckTwo?.selected;

          if (answer === "no") {
            return "incorrect";
          }
          return null;
        },
        messages: {
          incorrect: {
            body: (
              <Guidance.Disagree>
                As it turns out, Alice and Bob finally share a key. Whenever
                Alice and Bob's H-gate choices agree, the state Bob measures is
                the same state that Alice started with—a <M t="{\ket{0}}" />{" "}
                goes to a <M t="{\ket{0}}" />, for example. If Alice and Bob
                only keep bits where their H-gate choices agreed, they will
                always have the same bits, and therefore they share a key!
              </Guidance.Disagree>
            ),
            onContinue: "nextSection",
          },
        },
      },
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
          Alice and Bob now share a private key! Here is the table so far, where
          we've removed all columns where Alice and Bob discarded their bits.
          <h1>[[[Show table with removeGreyedColumns]]]</h1>
        </Prose>
      ),
    }),
  ],
}));
