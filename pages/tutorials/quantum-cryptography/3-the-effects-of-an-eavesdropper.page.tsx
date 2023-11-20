import {
  Callout,
  ChooseOne,
  Decimal,
  LabelsLeft,
  M,
  Prose,
  TextBox,
} from "@/components";
import { page } from "@/tutorial";
import setup from "./setup";
import { tableWithEve } from "./shared";

export default page(setup, ({ section }) => ({
  name: "theEffectsOfAnEavesdropper",
  label: "Effects of an Eavesdropper",
  answers: "none",
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
          <h1>[There is a qubit circuit drawn here]</h1>
        </Prose>
      ),
    }),
    section({
      name: "isPossibleEveMakeMeasurement",
      body: (m, { responses }) => (
        <>
          <ChooseOne
            model={m.isPossibleEveMakeMeasurement}
            label={
              <Prose>
                Is it possible for Eve to make a measurement on the qubit and
                pass it on to Bob unchanged?
              </Prose>
            }
            choices={[
              ["yesAlways", "Yes, always."],
              ["yesSometimes", "Yes, sometimes."],
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
            body: (
              <>
                <Callout color="yellow">
                  Hey, we haven't actually checked your free response answer
                  yet!
                </Callout>
                <br />
                <Callout color="blue">
                  However, the way we understand it, Eve doesn't know whether
                  she has a state in the <M t="{\ket{0/1}}" /> basis or the{" "}
                  <M t="{\ket{+/-}}" /> basis when the qubits pass through her
                  device, because that information has not yet been publicly
                  released. If Eve makes the same H-gate choice as Alice, then
                  she will accurately measure the state and pass it on to Bob.
                  If they make different H-gate choices, the result of Eve's
                  measurement and the subsequent state she passes onto Bob will
                  be completely random.
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
    section({
      name: "evesBitAfterMeasurement",
      body: (m) => (
        <>
          <Prose>
            <p>
              We reproduce our table from earlier, but add rows to show Eve in
              the middle. Eve will make the random decision to perform a
              Hadamard before and after her measurement or not. We indicate her
              choice in the table.
            </p>
            <p>
              Since we know that Alice and Bob will discard any bit where they
              did not make the same Hadamard choice, in our analysis, we are
              going to simply ignore those instances (to make less work for
              ourselves). We removed all of these columns.{" "}
            </p>
            <p>
              Eve’s presence may alter some outcomes, so we have eliminated the
              bottom portion of the table for now. As usual, we are starting
              with the first four columns, but we'll add the next 3 after.
            </p>
          </Prose>
          <tableWithEve.Component
            model={m.tableWithEve}
            rows={[
              "initialState",
              "didAliceApplyH",
              "stateAlice",
              "didEveApplyH",
              "bitEve",
            ]}
            columns={tableWithEve.nonGreyedCols.slice(0, 4)}
            editing={"bitEve"}
          />
        </>
      ),
      guidance: {
        nextMessage(r, s) {
          if (
            tableWithEve.isCorrect(
              r,
              "bitEve",
              tableWithEve.nonGreyedCols.slice(0, 4)
            )
          ) {
            return "correctBits";
          }
          if (
            s.sections?.evesBitAfterMeasurement?.revealedMessages?.includes(
              "wrongBits"
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
                  last three qubits.
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
                  Looks like we disagree with some of your answers for Eve's
                  measurements. Remember that Eve is measuring in the{" "}
                  <M t="{\ket{0}}" />/<M t="{\ket{1} }" /> basis,
                  <em> after</em> she either does or does not apply H. Think
                  about what state she has <em>right before</em> she measures.
                  What happens if she tries to measure <M t="{\ket{+}}" /> or{" "}
                  <M t="{\ket{-}}" /> in that basis?
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
                  What are the actual states that Eve measures, after the H gate
                  has been (possibly) applied? And what are the outcomes of her
                  measurements?
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
          tableWithEve.isComplete(
            s,
            m,
            "bitEve",
            tableWithEve.nonGreyedCols.slice(0, 4)
          ),
      },
    }),
    section({
      name: "eveRandomChoiceOnEachQubitAnswers",
      enumerate: false,
      when: (r) =>
        !tableWithEve.isCorrect(
          r,
          "bitEve",
          tableWithEve.nonGreyedCols.slice(0, 4)
        ),
      body: (m) => (
        <>
          <Prose>Here's our answers for Eve's measurements.</Prose>
          <tableWithEve.Component
            model={m.tableWithEve /* ignore-repeated-model */}
            rows={[
              "initialState",
              "didAliceApplyH",
              "stateAlice",
              "didEveApplyH",
              "bitEveBeforeNature",
            ]}
            columns={tableWithEve.nonGreyedCols.slice(0, 4)}
          />
          <Prose>
            Before we move on, let's try the last 3 qubits Alice sends.
          </Prose>
        </>
      ),
      continue: {
        label: "More qubits!",
        allowed: () => true,
      },
    }),

    section({
      name: "evesBitAfterMeasurement2",
      enumerate: true,
      body: (m) => (
        <>
          <Prose>
            Given the next three qubits Alice sends, and whether Eve chooses to
            apply a Hadamard or not, fill in the dropdowns with the outcome of
            Eve's measurement: 0, 1, or "R" for random, with a 50% chance of
            getting either 0 or 1.
          </Prose>
          <tableWithEve.Component
            model={m.tableWithEve /* ignore-repeated-model */}
            rows={[
              "initialState",
              "didAliceApplyH",
              "stateAlice",
              "didEveApplyH",
              "bitEve",
            ]}
            editing="bitEve"
            columns={tableWithEve.nonGreyedCols.slice(4)}
          />
        </>
      ),
      guidance: {
        nextMessage(r, s) {
          if (
            tableWithEve.isCorrect(
              r,
              "bitEve",
              tableWithEve.nonGreyedCols.slice(4)
            )
          ) {
            return "correctBits";
          }
          if (
            s.sections?.evesBitAfterMeasurement2?.revealedMessages?.includes(
              "wrongBits"
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
                  for random in the last row.
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
                  Looks like we disagree with some of your answers for Eve's
                  measurements. Remember that Eve is measuring in the{" "}
                  <M t="{\ket{0}}" />/<M t="{\ket{1} }" /> basis,
                  <em> after</em> she either does or does not apply H. Think
                  about what state she has <em>right before</em> she measures.
                  What happens if she tries to measure <M t="{\ket{+}}" /> or{" "}
                  <M t="{\ket{-}}" /> in that basis?
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
                  What are the actual states that Eve measures, after the H gate
                  has been (possibly) applied? And what are the outcomes of her
                  measurements?
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
          tableWithEve.isComplete(
            s,
            m,
            "bitEve",
            tableWithEve.nonGreyedCols.slice(4)
          ),
      },
    }),
    section({
      name: "eveRandomChoiceOnEachQubitAnswers2",
      enumerate: false,
      when: (r) =>
        !tableWithEve.isCorrect(
          r,
          "bitEve",
          tableWithEve.nonGreyedCols.slice(4)
        ),
      body: (m) => (
        <>
          <Prose>Here's our answers for Eve's measurements.</Prose>
          <tableWithEve.Component
            model={m.tableWithEve /* ignore-repeated-model */}
            rows={[
              "initialState",
              "didAliceApplyH",
              "stateAlice",
              "didEveApplyH",
              "bitEveBeforeNature",
            ]}
            columns={tableWithEve.nonGreyedCols.slice(4)}
          />
          <Prose>
            Hit "Measure!" to let "nature" determine the outcomes of all the
            cells labeled "R" for random in the last row.
          </Prose>
        </>
      ),
      continue: {
        label: "Measure!",
        allowed: () => true,
      },
    }),

    section({
      name: "natureEffectAfterEveSends",
      body: (m) => (
        <>
          <tableWithEve.Component
            model={m.tableWithEve /* ignore-repeated-model */}
            rows={[
              "initialState",
              "didAliceApplyH",
              "stateAlice",
              "didEveApplyH",
              "bitEve",
            ]}
            columns={tableWithEve.nonGreyedCols}
          />
          <Prose>
            Note that in all cases where the outcome was “random”, nature has
            picked a 0 or 1. Those results are written in italics to remind you
            that they could have come out different. But this is what Eve got!
          </Prose>
        </>
      ),
      continue: {
        allowed: () => true,
      },
    }),
    section({
      name: "qubitStateEveSendsToBob1",
      body: (m) => (
        <>
          <Prose>
            Using these results, fill in the next row indicating what qubit
            state Eve sends to Bob. Recall that if she applies the Hadamard
            gate, she does so before and after her measurement.
          </Prose>
          <tableWithEve.Component
            model={m.tableWithEve /* ignore-repeated-model */}
            rows={[
              "initialState",
              "didAliceApplyH",
              "stateAlice",
              "didEveApplyH",
              "bitEve",
              "stateEve",
            ]}
            editing="stateEve"
            columns={tableWithEve.nonGreyedCols.slice(0, 4)}
          />
        </>
      ),

      guidance: {
        nextMessage(r, s) {
          if (
            tableWithEve.isCorrect(
              r,
              "stateEve",
              tableWithEve.nonGreyedCols.slice(0, 4)
            )
          ) {
            return "correctStates";
          }
          if (
            s.sections?.qubitStateEveSendsToBob1?.revealedMessages?.includes(
              "wrongStates"
            )
          )
            return "wrongStates2";
          return "wrongStates";
        },
        messages: {
          correctStates: {
            body: (
              <>
                <Callout color="blue">
                  Your table looks good! Let's get some more practice with the
                  last three qubits.
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
                  Looks like we disagree with some of your answers for Eve's
                  states. Remember that when she measures a state and gets a bit
                  (0 or 1) she collapses the state into <M t="{\ket{0}}" /> or{" "}
                  <M t="{\ket{1}}" />. Then, she either does or does not apply
                  the Hadamard gate, according to the table. Given this
                  information, can you figure out what states she sends to Bob?
                </Callout>
              </>
            ),
            onContinue: "nextMessage",
            continueLabel: "Try again",
          },
          wrongStates2: {
            body: (
              <>
                <Callout color="red">
                  Looks like we still disagree with some of your answers for
                  Eve's states. Recall the effect of the Hadamard gate on a
                  qubit:
                  <M t="{H\ket{0} = \ket{+}}" display={true} />
                  <M t="{H\ket{1} = \ket{-}}" display={true} />
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
          tableWithEve.isComplete(
            s,
            m,
            "stateEve",
            tableWithEve.nonGreyedCols.slice(0, 4)
          ),
      },
    }),
    section({
      name: "qubitStateEveSendsToBob1Answers",
      enumerate: false,
      when: (r) =>
        !tableWithEve.isCorrect(
          r,
          "stateEve",
          tableWithEve.nonGreyedCols.slice(0, 4)
        ),
      body: (m) => (
        <>
          <Prose>Here's our answers for Eve's states.</Prose>
          <tableWithEve.Component
            model={m.tableWithEve /* ignore-repeated-model */}
            rows={[
              "initialState",
              "didAliceApplyH",
              "stateAlice",
              "didEveApplyH",
              "bitEve",
              "stateEve",
            ]}
            columns={tableWithEve.nonGreyedCols.slice(0, 4)}
          />
          <Prose>
            Before we move on, let's try the last 3 qubits Alice sends.
          </Prose>
        </>
      ),
      continue: {
        label: "More qubits!",
        allowed: () => true,
      },
    }),

    section({
      name: "qubitStateEveSendsToBob2",
      body: (m) => (
        <>
          <Prose>
            Fill in the results for the last 3 qubits indicating what qubit
            state Eve sends to Bob. Recall that if she applies the Hadamard
            gate, she does so before and after her measurement.
          </Prose>
          <tableWithEve.Component
            model={m.tableWithEve /* ignore-repeated-model */}
            rows={[
              "initialState",
              "didAliceApplyH",
              "stateAlice",
              "didEveApplyH",
              "bitEve",
              "stateEve",
            ]}
            editing="stateEve"
            columns={tableWithEve.nonGreyedCols.slice(4)}
          />
        </>
      ),

      guidance: {
        nextMessage(r, s) {
          if (
            tableWithEve.isCorrect(
              r,
              "stateEve",
              tableWithEve.nonGreyedCols.slice(4)
            )
          ) {
            return "correctStates";
          }
          if (
            s.sections?.qubitStateEveSendsToBob1?.revealedMessages?.includes(
              "wrongStates"
            )
          )
            return "wrongStates2";
          return "wrongStates";
        },
        messages: {
          correctStates: {
            body: (
              <>
                <Callout color="blue">
                  Your table looks good! Let's see the final table, with all 7
                  qubits.
                </Callout>
              </>
            ),
            onContinue: "nextSection",
          },
          wrongStates: {
            body: (
              <>
                <Callout color="red">
                  Looks like we disagree with some of your answers for Eve's
                  states. Remember that when she measures a state and gets a bit
                  (0 or 1) she collapses the state into <M t="{\ket{0}}" /> or{" "}
                  <M t="{\ket{1}}" />. Then, she either does or does not apply
                  the Hadamard gate, according to the table. Given this
                  information, can you figure out what states she sends to Bob?
                </Callout>
              </>
            ),
            onContinue: "nextMessage",
            continueLabel: "Try again",
          },
          wrongStates2: {
            body: (
              <>
                <Callout color="red">
                  Looks like we still disagree with some of your answers for
                  Eve's states. Recall the effect of the Hadamard gate on a
                  qubit:
                  <M t="{H\ket{0} = \ket{+}}" display={true} />
                  <M t="{H\ket{1} = \ket{-}}" display={true} />
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
          tableWithEve.isComplete(
            s,
            m,
            "stateEve",
            tableWithEve.nonGreyedCols.slice(4)
          ),
      },
    }),
    section({
      name: "qubitStateEveSendsToBob2Answers",
      enumerate: false,
      when: (r) =>
        !tableWithEve.isCorrect(
          r,
          "stateEve",
          tableWithEve.nonGreyedCols.slice(4)
        ),
      body: (m) => (
        <>
          <Prose>Here's our answers for Eve's states.</Prose>
          <tableWithEve.Component
            model={m.tableWithEve /* ignore-repeated-model */}
            rows={[
              "initialState",
              "didAliceApplyH",
              "stateAlice",
              "didEveApplyH",
              "bitEve",
              "stateEve",
            ]}
            columns={tableWithEve.nonGreyedCols.slice(4)}
          />
          <Prose>Let's see the final table, with all 7 qubits.</Prose>
        </>
      ),
      continue: {
        allowed: () => true,
      },
    }),
    section({
      name: "tableWithEveAndNotBobComplete",
      enumerate: false,
      body: (m) => (
        <>
          <tableWithEve.Component
            model={m.tableWithEve /* ignore-repeated-model */}
            rows={[
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

    section({
      name: "bobsBitAfterEve1",
      body: (m) => (
        <>
          <Prose>
            We recall the choices Bob made to apply the Hadamard gate or not.
            Whether Eve is in the line or not, he makes the same choices. Now
            let's see what bits he measures after (potentially) applying the
            Hadamard gate, now that Eve has interfered.
          </Prose>
          <tableWithEve.Component
            model={m.tableWithEve /* ignore-repeated-model */}
            rows={[
              "initialState",
              "didAliceApplyH",
              "stateAlice",
              "didEveApplyH",
              "bitEve",
              "didBobApplyH",
              "bitBob",
            ]}
            columns={tableWithEve.nonGreyedCols.slice(0, 4)}
            editing={"bitBob"}
          />
        </>
      ),
      guidance: {
        nextMessage(r, s) {
          if (
            tableWithEve.isCorrect(
              r,
              "bitBob",
              tableWithEve.nonGreyedCols.slice(0, 4)
            )
          ) {
            return "correctBits";
          }
          if (
            s.sections?.bobsBitAfterEve1?.revealedMessages?.includes(
              "wrongBits"
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
                  last three qubits.
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
                  measurements. Remember that Bob is measuring in the{" "}
                  <M t="{\ket{0}}" />/<M t="{\ket{1} }" /> basis,
                  <em> after</em> he either does or does not apply H. Think
                  about what state he has <em>right before</em> he measures.
                  What happens if he tries to measure <M t="{\ket{+}}" /> or{" "}
                  <M t="{\ket{-}}" /> in that basis?
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
                  What are the actual states that Bob measures, after the H gate
                  has been (possibly) applied? And what are the outcomes of his
                  measurements?
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
          tableWithEve.isComplete(
            s,
            m,
            "bitBob",
            tableWithEve.nonGreyedCols.slice(0, 4)
          ),
      },
    }),
    section({
      name: "bobsBitAfterEve1Answers",
      enumerate: false,
      when: (r) =>
        !tableWithEve.isCorrect(
          r,
          "bitBob",
          tableWithEve.nonGreyedCols.slice(0, 4)
        ),
      body: (m) => (
        <>
          <Prose>Here's our answers for Bob's measurements.</Prose>
          <tableWithEve.Component
            model={m.tableWithEve /* ignore-repeated-model */}
            rows={[
              "initialState",
              "didAliceApplyH",
              "stateAlice",
              "didEveApplyH",
              "bitEve",
              "didBobApplyH",
              "bitBobBeforeNature",
            ]}
            columns={tableWithEve.nonGreyedCols.slice(0, 4)}
          />
          <Prose>
            Before we move on, let's try the last 3 qubits Alice sends.
          </Prose>
        </>
      ),
      continue: {
        label: "More qubits!",
        allowed: () => true,
      },
    }),

    section({
      name: "bobsBitAfterEve2",
      enumerate: true,
      body: (m) => (
        <>
          <Prose>
            Given the next three states Bob gets from Eve and his random choice
            to apply a Hadamard gate, fill in the last row with the bit he
            measures,
          </Prose>
          <tableWithEve.Component
            model={m.tableWithEve /* ignore-repeated-model */}
            rows={[
              "initialState",
              "didAliceApplyH",
              "stateAlice",
              "didEveApplyH",
              "bitEve",
              "didBobApplyH",
              "bitBob",
            ]}
            editing="bitBob"
            columns={tableWithEve.nonGreyedCols.slice(4)}
          />
        </>
      ),
      guidance: {
        nextMessage(r, s) {
          if (
            tableWithEve.isCorrect(
              r,
              "bitBob",
              tableWithEve.nonGreyedCols.slice(4)
            )
          ) {
            return "correctBits";
          }
          if (
            s.sections?.bobsBitAfterEve2?.revealedMessages?.includes(
              "wrongBits"
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
                  for random in the last row.
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
                  measurements. Remember that Bob is measuring in the{" "}
                  <M t="{\ket{0}}" />/<M t="{\ket{1} }" /> basis,
                  <em> after</em> he either does or does not apply H. Think
                  about what state he has <em>right before</em> he measures.
                  What happens if he tries to measure <M t="{\ket{+}}" /> or{" "}
                  <M t="{\ket{-}}" /> in that basis?
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
                  What are the actual states that Bob measures, after the H gate
                  has been (possibly) applied? And what are the outcomes of his
                  measurements?
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
          tableWithEve.isComplete(
            s,
            m,
            "bitBob",
            tableWithEve.nonGreyedCols.slice(4)
          ),
      },
    }),
    section({
      name: "bobsBitAfterEve2Answers",
      enumerate: false,
      when: (r) =>
        !tableWithEve.isCorrect(
          r,
          "bitBob",
          tableWithEve.nonGreyedCols.slice(4)
        ),
      body: (m) => (
        <>
          <Prose>Here's our answers for Bob's measurements.</Prose>
          <tableWithEve.Component
            model={m.tableWithEve /* ignore-repeated-model */}
            rows={[
              "initialState",
              "didAliceApplyH",
              "stateAlice",
              "didEveApplyH",
              "bitEve",
              "didBobApplyH",
              "bitBobBeforeNature",
            ]}
            columns={tableWithEve.nonGreyedCols.slice(4)}
          />
          <Prose>
            Hit "Measure!" to let "nature" determine the outcomes of all the
            cells labeled "R" for random in the last row.
          </Prose>
        </>
      ),
      continue: {
        label: "Measure!",
        allowed: () => true,
      },
    }),
    section({
      name: "natureEffectToBobMeasurements",
      body: (m) => (
        <>
          <tableWithEve.Component
            model={m.tableWithEve /* ignore-repeated-model */}
            rows={[
              "initialState",
              "didAliceApplyH",
              "stateAlice",
              "didEveApplyH",
              "bitEve",
              "didBobApplyH",
              "bitBob",
            ]}
            columns={tableWithEve.nonGreyedCols}
          />
          <Prose>
            Note that Bob's key no longer perfectly matches Alice's.
          </Prose>
        </>
      ),
      continue: {
        allowed: () => true,
      },
    }),
    section({
      name: "fractionOfMismatchedComparedSampleBits",
      body: (m) => (
        <>
          <Prose>
            In this small sample, what fraction of the compared bits mismatched?{" "}
            <b>(Round to second decimal point).</b>
          </Prose>
          <LabelsLeft>
            <Decimal
              model={m.fractionOfMismatchedComparedSampleBits}
              label={<Prose>Percentage: </Prose>}
            />
          </LabelsLeft>
        </>
      ),
    }),
    section({
      name: "fractionOfMismatchedComparedBits",
      body: (m) => (
        <>
          <Prose>
            If Eve is intercepting all bits, for large strings, what fraction of
            the compared bits will mismatch?{" "}
            <b>(Round to second decimal point).</b>
          </Prose>
          <LabelsLeft>
            <Decimal
              model={m.fractionOfMismatchedComparedBits}
              label={<Prose>Percentage: </Prose>}
            />
          </LabelsLeft>
        </>
      ),
    }),
    section({
      name: "chanceOfEveBeingDetected",
      body: (m) => (
        <>
          <Prose>
            Assume we decided to select 2 bits to compare for our test to detect
            Eve. What is the chance she will be detected?{" "}
            <b>(Round to second decimal point).</b>
          </Prose>
          <LabelsLeft>
            <Decimal
              model={m.chanceOfEveBeingDetected}
              label={<Prose>Percentage: </Prose>}
            />
          </LabelsLeft>
        </>
      ),
    }),
    section({
      name: "oddsOfBobAliceFailToNotice",
      body: (m) => (
        <>
          <Prose>
            If we check 100 bits (with Eve present), what are the odds that Bob
            and Alice FAIL to notice the eavesdropper? (That is, what are the
            chance that all 100 bits Bob and Alice check match?)
          </Prose>
          <TextBox model={m.oddsOfBobAliceFailToNotice} />
        </>
      ),
    }),
  ],
}));
