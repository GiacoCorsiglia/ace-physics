import {
  Callout,
  ChooseOne,
  Decimal,
  LabelsLeft,
  Prose,
  TextBox,
} from "@/components";
import { page } from "@/tutorial";
import setup from "./setup";

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
              ["yes", "Yes, there is a sufficent amount of bits that agree."],
              ["no", "No, the error rate disproves this."],
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
                  However, we were thinking that for any qubit where Eve makes
                  the same Hadamard choice as Alice she can measure the qubit
                  and pass the qubit on to Bob unchanged. In this case, Eve will
                  also get the element of the key that matches what Alice has.
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
              We reproduce our table from earlier, butadd rows to show Eve in
              the middle. Eve will make the random decision to perform a
              Hadamard before and after her measurement or not. We indicate her
              choice in the table.
            </p>
            <p>
              Since we know that Alice and Bob will discard any bit where they
              did not make the same Hadamard choice, in our analysis, we are
              going to simply ignore those instances (to make less work for
              ourselves). We greyed out all of these columns.{" "}
              <b>[TODO are we removing the bars or just greying them out?]</b>
            </p>
            <p>
              Eve’s presencemay alter some outcomes, so we have eliminated the
              bottom portion of the table for now
            </p>
          </Prose>
          <h1>[TABLE]</h1>
          <h1>[[[Reactively show below once every box is filled]]]</h1>
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
      name: "natureEffectAfterEveSends",
      body: (
        <>
          <Prose>
            <h1>[TABLE]</h1>
          </Prose>
          <Prose>
            Note that in all cases where the outcome was “random”, nature has
            picked a 0 or 1. Those results are written in italics to remind you
            that they could have come out different. But this is what Eve got!
          </Prose>
        </>
      ),
    }),
    section({
      name: "qubitStateEveSendsToBob",
      body: (m) => (
        <>
          <Prose>
            Using these results, fill in the next row indicating what qubit
            state Eve sends to Bob.
          </Prose>
          <Prose>
            <h1>[TABLE]</h1>
          </Prose>
        </>
      ),
    }),
    section({
      name: "tableValidationAndNatureNotice",
      enumerate: false,
      body: (
        <Prose>
          Your table looks good so far! Hit the “measure” button to let “nature”
          determine the outcomes of all the cells labeled “R” for random in the
          last row
        </Prose>
      ),
    }),
    section({
      name: "natureEffectToBobMeasurements",
      body: (
        <>
          <Prose>
            <h1>[TABLE]</h1>
          </Prose>
          <Prose>
            Note that Bob's key no longer perfectly matches Alice's.
          </Prose>
        </>
      ),
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
