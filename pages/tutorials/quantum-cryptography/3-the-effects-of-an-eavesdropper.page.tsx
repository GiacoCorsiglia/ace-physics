import {
  Callout,
  ChooseOne,
  Decimal,
  Guidance,
  Image,
  LabelsLeft,
  M,
  Prose,
  TextBox,
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
            body: (s) => (
              <>
                <Callout color="yellow">
                  We haven't actually checked your free response answer yet, but{" "}
                  {s.responses?.isPossibleEveMakeMeasurement?.selected ===
                  "yesSometimes"
                    ? "we agree with your selection."
                    : "we disagree with your selection—Eve can sometimes pass the qubit on unchanged."}
                </Callout>
                <br />
                <Callout color="blue">
                  Eve doesn't know whether she has a state in the{" "}
                  <M t="{\{\ket{0}, \ket{1}\}}" /> basis or the{" "}
                  <M t="{\{\ket{+}, \ket{-}\}}" /> basis when the qubits pass
                  through her device, because that information has not yet been
                  publicly released. <hr />
                  If Eve makes the same H-gate choice as Alice, then she will
                  accurately measure the state and pass it on to Bob.
                  <hr />
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
              We reproduce our table from earlier (including only the 'keep'
              qubits), but add rows to show Eve's operations. For each state she
              receives, Eve will make a random decision to perform a Hadamard
              before her measurement. We indicate her choice in the table.
            </p>
            <p>
              Please fill in the last row with the outcome of Eve's subsequent
              measurement. "R" stands for "random" with a 50/50 chance of
              observing 0 or 1.
            </p>
          </Prose>
          <tableWithEve.Component
            model={m.tableWithEve}
            rows={[
              "qubitNumber",
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
              tableWithEve.nonGreyedCols.slice(0, 4),
            )
          ) {
            return "correctBits";
          }
          if (
            s.sections?.evesBitAfterMeasurement?.revealedMessages?.includes(
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
                  measurements. It might help to write down the state Eve has
                  after she does or does not apply the H-gate.
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
          tableWithEve.isComplete(
            s,
            m,
            "bitEve",
            tableWithEve.nonGreyedCols.slice(0, 4),
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
          tableWithEve.nonGreyedCols.slice(0, 4),
        ),
      body: (m) => (
        <>
          <Prose>Here's our answers for Eve's measurements.</Prose>
          <tableWithEve.Component
            model={repeatedModel(m.tableWithEve)}
            rows={[
              "qubitNumber",
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
            model={repeatedModel(m.tableWithEve)}
            rows={[
              "qubitNumber",
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
              tableWithEve.nonGreyedCols.slice(4),
            )
          ) {
            return "correctBits";
          }
          if (
            s.sections?.evesBitAfterMeasurement2?.revealedMessages?.includes(
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
                  measurements. It might help to write down the state Eve has
                  after she does or does not apply the H-gate.
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
          tableWithEve.isComplete(
            s,
            m,
            "bitEve",
            tableWithEve.nonGreyedCols.slice(4),
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
          tableWithEve.nonGreyedCols.slice(4),
        ),
      body: (m) => (
        <>
          <Prose>Here's our answers for Eve's measurements.</Prose>
          <tableWithEve.Component
            model={repeatedModel(m.tableWithEve)}
            rows={[
              "qubitNumber",
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
      guidance: {
        nextMessage: () => "ourAnswer",
        messages: {
          ourAnswer: {
            body: (
              <>
                <Guidance.Hint>
                  We haven't checked your answer, but:
                </Guidance.Hint>
                <Guidance.HeadsUp>
                  If Eve makes a Hadamard choice opposite to Alice's choice,
                  then Eve will always measure a superposition state (
                  <M t="\ket{+}" /> or <M t="\ket{-}" />) in the{" "}
                  <M t="\{0, 1\}" /> basis and get a random result. How often
                  does this happen?
                </Guidance.HeadsUp>
              </>
            ),
            onContinue: "nextSection",
          },
        },
      },
    }),
    section({
      name: "qubitStateEveSendsToBob1",
      body: (m) => (
        <>
          <Prose>
            Eve tries to cover her tracks before passing her state on to Bob. If
            she applied a Hadamard gate before measuring, she reapplies it after
            measuring to try to reverse her former action. If she did not apply
            an H-gate before, she does nothing.
            <br /> <br />
            Fill in the next row indicating what qubit state Eve sends to Bob.
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
              tableWithEve.nonGreyedCols.slice(0, 4),
            )
          ) {
            return "correctStates";
          }
          if (
            s.sections?.qubitStateEveSendsToBob1?.revealedMessages?.includes(
              "wrongStates",
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
                  <M t="{\ket{1}}" />. Then, she either does or does not reapply
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
            tableWithEve.nonGreyedCols.slice(0, 4),
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
          tableWithEve.nonGreyedCols.slice(0, 4),
        ),
      body: (m) => (
        <>
          <Prose>Here's our answers for Eve's states.</Prose>
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
              tableWithEve.nonGreyedCols.slice(4),
            )
          ) {
            return "correctStates";
          }
          if (
            s.sections?.qubitStateEveSendsToBob1?.revealedMessages?.includes(
              "wrongStates",
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
                  <M t="{\ket{1}}" />. Then, she either does or does not reapply
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
            tableWithEve.nonGreyedCols.slice(4),
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
          tableWithEve.nonGreyedCols.slice(4),
        ),
      body: (m) => (
        <>
          <Prose>Here's our answers for Eve's states.</Prose>
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
                <Guidance.Hint>
                  We haven't checked your answer, but:
                </Guidance.Hint>
                <Guidance.HeadsUp>
                  If Eve makes the same Hadamard choice as Alice, she will
                  measure the original bit that Alice randomly chose, and then
                  send it along in the same basis that Alice sent. If Eve makes
                  the wrong choice, she will <em>always</em> send a qubit in the
                  wrong basis. Can you tell why?
                </Guidance.HeadsUp>
              </>
            ),
            onContinue: "nextSection",
          },
        },
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
              tableWithEve.nonGreyedCols.slice(0, 4),
            )
          ) {
            return "correctBits";
          }
          if (
            s.sections?.bobsBitAfterEve1?.revealedMessages?.includes(
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
          tableWithEve.isComplete(
            s,
            m,
            "bitBob",
            tableWithEve.nonGreyedCols.slice(0, 4),
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
          tableWithEve.nonGreyedCols.slice(0, 4),
        ),
      body: (m) => (
        <>
          <Prose>Here's our answers for Bob's measurements.</Prose>
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
              tableWithEve.nonGreyedCols.slice(4),
            )
          ) {
            return "correctBits";
          }
          if (
            s.sections?.bobsBitAfterEve2?.revealedMessages?.includes(
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
          tableWithEve.isComplete(
            s,
            m,
            "bitBob",
            tableWithEve.nonGreyedCols.slice(4),
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
          tableWithEve.nonGreyedCols.slice(4),
        ),
      body: (m) => (
        <>
          <Prose>Here's our answers for Bob's measurements.</Prose>
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
    section({
      name: "fractionOfMismatchedComparedSampleBits",
      body: (m) => (
        <>
          <Prose>
            In this small sample, what percentage of the compared bits
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
      guidance: {
        nextMessage(r, s) {
          if (
            r.fractionOfMismatchedComparedBits === 75 ||
            r.fractionOfMismatchedComparedBits === 0.75
          )
            return "didYouWriteMismatch";
          if (
            r.fractionOfMismatchedComparedBits !== 25 &&
            r.fractionOfMismatchedComparedBits !== 0.25
          ) {
            if (
              !s.sections?.fractionOfMismatchedComparedBits?.revealedMessages?.includes(
                "incorrect",
              )
            ) {
              return "incorrect";
            }
            return null;
          }
          return "correct";
        },
        messages: {
          incorrect: {
            body: (
              <>
                <Guidance.Disagree>
                  We disagree with your answer. Firstly, we consider only the
                  "keep" bits (bits where Alice and Bob agreed on their H-gate
                  choice). <hr />
                  50% of the time, Eve will make the same H-gate choice as Alice
                  and Bob, and the state will pass from Eve to Bob unchanged.{" "}
                  <hr />
                  50% of the time, Eve will make a different H-gate choice from
                  Alice and Bob. This will result in Bob measuring a state from
                  the <M t="{\{\ket{+}, \ket{-}\}}" /> basis, giving him a
                  random result that is as likely to match as mismatch.
                  <hr />
                  Under these circumstances, how often will their bits mismatch?
                  {/* If you combine these two cases, Bob's and Alice's bits will
                  match 75% of the time, and mismatch 25% of the time. */}
                </Guidance.Disagree>
              </>
            ),
            onContinue: "nextSection",
          },
          correct: {
            body: (state) => (
              <>
                <Guidance.Agree>
                  {!state.sections?.fractionOfMismatchedComparedBits?.revealedMessages?.includes(
                    "incorrect",
                  ) ? (
                    <>
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
                    </>
                  ) : (
                    <>
                      Bob's and Alice's bits will match 75% of the time, and
                      mismatch 25% of the time.
                    </>
                  )}
                </Guidance.Agree>
              </>
            ),
            onContinue: "nextMessage",
          },
          didYouWriteMismatch: {
            body: (
              <>
                <Guidance.Disagree>
                  Were you answering how often the qubits <em>mismatch</em> or
                  how often they <em>match</em>?
                </Guidance.Disagree>
              </>
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
      when: (r) =>
        r.fractionOfMismatchedComparedBits !== 25 &&
        r.fractionOfMismatchedComparedBits !== 0.25,
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
    section({
      name: "chanceOfEveBeingUndetected",
      body: (m) => (
        <>
          <Prose>
            Assume we decided to select 2 bits to compare for our test to detect
            Eve. What is the percent chance that both of Bob's bits will match
            Alice's? <b>(Round to the nearest percent).</b>
          </Prose>
          <LabelsLeft>
            <Decimal
              model={m.chanceOfEveBeingUndetected}
              label={<Prose>Percentage: </Prose>}
            />
          </LabelsLeft>
          <Prose>
            In an ideal world, all bits should match, so any mismatch indicates
            an eavesdropper.
          </Prose>
        </>
      ),
      guidance: {
        nextMessage(r) {
          if (r.chanceOfEveBeingUndetected !== 56) return "incorrect";
          return null;
        },
        messages: {
          incorrect: {
            body: (
              <>
                <Guidance.Disagree>
                  We disagree with your answer. We know that Bob and Alice's
                  bits match 75% of the time. The chance that two bits match is
                  therefore <M t="{(0.75)^2}" /> or 56%. If this happens, Alice
                  and Bob fail to notice the eavesdropper.
                </Guidance.Disagree>
              </>
            ),
            onContinue: "nextSection",
          },
        },
      },
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
      guidance: {
        nextMessage(r) {
          return "explanation";
        },
        messages: {
          explanation: {
            body: (
              <>
                <Guidance.Hint>
                  We haven't checked your answer, but:
                </Guidance.Hint>
                <Guidance.HeadsUp>
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
  ],
}));
