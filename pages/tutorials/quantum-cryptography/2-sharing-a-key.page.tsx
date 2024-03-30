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
import { tableWithoutEve } from "./shared";

export default page(setup, ({ section, oneOf }) => ({
  name: "sharingKey",
  label: "Sharing a Private Key",
  answers: "checked-all",
  sections: [
    section({
      name: "introToSharedKey",
      body: (m) => (
        <Prose>
          On the previous page, we explained a quantum cryptographic protocol
          that transmitted a series of bits to Bob. However, Bob and Alice only
          agreed on their bits 75% of the time, and 25% of the time they only
          agreed by accident! On this page, we'll discuss how to make their keys
          agree 100% of the time by cleverly discarding bits that disagree
          without revealing the bits themselves.
          <br />
          <br />
          Here's the full table from the previous page:
          <tableWithoutEve.Component
            model={m.tableWithoutEve /* ignore-repeated-model */}
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
          that remain arise only when they either <b>both</b> applied an H gate,
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
                  Please double-check your answer. How often do Alice and Bob
                  make the same Hadamard decision? When they make the same
                  decision, do they need to discard a bit?
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
      name: "keepOrDiscardTableRow1",
      body: (m) => (
        <>
          <Prose>
            Fill in the following table, stating whether Alice and Bob should
            keep (K) or discard (D) their bit. After you submit your choices for
            the first four qubits, we'll have you practice with the next four
            qubits in another table.
          </Prose>
          <tableWithoutEve.Component
            model={m.tableWithoutEve /* ignore-repeated-model */}
            rows={[
              "qubitNumber",
              "initialState",
              "didAliceApplyH",
              "stateAlice",
              "didBobApplyH",
              "bitBob",
              "keepOrDiscard",
            ]}
            columns={[0, 1, 2, 3]}
            editing={"keepOrDiscard"}
          />
        </>
      ),
      guidance: {
        nextMessage(r) {
          if (!tableWithoutEve.isCorrect(r, "keepOrDiscard", [0, 1, 2, 3])) {
            return "incorrect";
          }
          return null;
        },
        messages: {
          incorrect: {
            body: (
              <>
                <Guidance.Disagree>
                  Remember that if both Alice and Bob apply the Hadamard gate,
                  Bob measures the same state Alice started with. If neither of
                  them apply the gate, Bob measures the same state Alice started
                  with. In those cases, can we trust the outcome? What about the
                  other cases?
                </Guidance.Disagree>
              </>
            ),
            onContinue: "nextMessage",
          },
        },
      },
      continue: {
        label: "More qubits!",
        allowed: (s, _, m) =>
          tableWithoutEve.isComplete(s, m, "keepOrDiscard", [0, 1, 2, 3]),
      },
    }),

    section({
      name: "keepOrDiscardTableRow1Answers",
      when: (r, s) =>
        !tableWithoutEve.isCorrect(r, "keepOrDiscard", [0, 1, 2, 3]),
      body: (m) => (
        <>
          <Prose>
            Here's our answers for whether Alice and Bob keep or discard their
            bits. Press "More qubits!" to try the next row.
          </Prose>
          <tableWithoutEve.Component
            model={m.tableWithoutEve /* ignore-repeated-model */}
            rows={[
              "qubitNumber",
              "initialState",
              "didAliceApplyH",
              "stateAlice",
              "didBobApplyH",
              "bitBob",
              "keepOrDiscard",
            ]}
            columns={[0, 1, 2, 3]}
          />
        </>
      ),
      continue: {
        label: "More qubits!",
        allowed: () => true,
      },
    }),

    section({
      name: "keepOrDiscardTableRow2",
      body: (m) => (
        <>
          <Prose>
            Fill in the following table, stating whether Alice and Bob should
            keep (K) or discard (D) their bit, for the next four qubits Alice
            sends.
          </Prose>
          <tableWithoutEve.Component
            model={m.tableWithoutEve /* ignore-repeated-model */}
            rows={[
              "qubitNumber",
              "initialState",
              "didAliceApplyH",
              "stateAlice",
              "didBobApplyH",
              "bitBob",
              "keepOrDiscard",
            ]}
            columns={[4, 5, 6, 7]}
            editing={"keepOrDiscard"}
          />
        </>
      ),
      guidance: {
        nextMessage(r) {
          if (!tableWithoutEve.isCorrect(r, "keepOrDiscard", [4, 5, 6, 7])) {
            return "incorrect";
          }
          return null;
        },
        messages: {
          incorrect: {
            body: (
              <>
                <Guidance.Disagree>
                  Remember that if both Alice and Bob apply the Hadamard gate,
                  Bob measures the same state Alice started with. If neither of
                  them apply the gate, Bob measures the same state Alice started
                  with. In those cases, can we trust the outcome? What about the
                  other cases?
                </Guidance.Disagree>
              </>
            ),
            onContinue: "nextMessage",
          },
        },
      },
      continue: {
        allowed: (s, _, m) =>
          tableWithoutEve.isComplete(s, m, "keepOrDiscard", [4, 5, 6, 7]),
      },
    }),

    section({
      name: "keepOrDiscardTableRow2Answers",
      when: (r, s) =>
        !tableWithoutEve.isCorrect(r, "keepOrDiscard", [4, 5, 6, 7]),
      body: (m) => (
        <>
          <Prose>
            Here's our answers for whether Alice and Bob keep or discard their
            bits.
          </Prose>
          <tableWithoutEve.Component
            model={m.tableWithoutEve /* ignore-repeated-model */}
            rows={[
              "qubitNumber",
              "initialState",
              "didAliceApplyH",
              "stateAlice",
              "didBobApplyH",
              "bitBob",
              "keepOrDiscard",
            ]}
            columns={[4, 5, 6, 7]}
          />
        </>
      ),
      continue: {
        allowed: () => true,
      },
    }),

    section({
      name: "keepOrDiscardTableRowComplete",
      body: (m) => (
        <>
          <Prose>Here's the final table, with all 12 qubits.</Prose>
          <tableWithoutEve.Component
            model={m.tableWithoutEve /* ignore-repeated-model */}
            rows={[
              "qubitNumber",
              "initialState",
              "didAliceApplyH",
              "stateAlice",
              "didBobApplyH",
              "bitBob",
              "keepOrDiscard",
            ]}
          />
        </>
      ),
      continue: {
        allowed: () => true,
      },
    }),

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
          disabled={s.sections?.doesAliceBobShareKeyCheckTwo?.revealedMessages?.includes(
            "incorrect",
          )}
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
      guidance: {
        nextMessage(r) {
          if (r.whatIsTheSharedKey !== 110110) return "incorrect";
          return null;
        },
        messages: {
          incorrect: {
            body: (s) => (
              <>
                <Callout color="red">
                  We may disagree with your answer. Any time Alice's and Bob's
                  Hadamard choices agreed, Bob's bit was not random. On the
                  table, Bob's random bits are shown in italics. To get our key,
                  we noted down every one of Bob's bits that was not in italics.
                  <br />
                  <br />
                  <center>Our key is "0110110".</center>
                </Callout>
              </>
            ),
            onContinue: "nextSection",
          },
        },
      },
    }),
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
          disabled={s.sections?.doesPublicInfoGiveInfoAboutBitString?.revealedMessages?.includes(
            "incorrect",
          )}
        />
      ),
      guidance: {
        nextMessage(r) {
          const answer = r.doesPublicInfoGiveInfoAboutBitString?.selected;

          if (answer === "yes") {
            return "incorrect";
          }
          return null;
        },
        messages: {
          incorrect: {
            body: (
              <Guidance.Disagree>
                We disagree with your answer. Revealing whether or not you
                applied a Hadamard gate is different from revealing what your
                measurement was.
              </Guidance.Disagree>
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
            model={m.tableWithoutEve /* ignore-repeated-model */}
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
