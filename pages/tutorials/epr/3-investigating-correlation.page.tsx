import { ChooseAll, ChooseOne, M, Prose } from "@/components";
import { page } from "@/tutorial";
import setup from "./setup";

export default page(setup, ({ section }) => ({
  name: "investigatingCorrelation",
  label: "Investigating Correlation",
  answers: "provided",
  sections: [
    section({
      name: "investigatingCorrelationIntro",
      body: (
        <Prose>
          <p>Here are some definitions for this page:</p>

          <ul>
            <li>
              “Measures a <strong>0</strong>” means “<strong>spin up</strong>”
            </li>
            <li>
              “Measuring a <strong>1</strong>” means “<strong>spin down</strong>
              ”
            </li>
            <li>“SG” means “Stern-Gerlach device“</li>
          </ul>

          <p>
            As before, we have two observers and an entangled initial state—the
            same “anti-correlated Bell state” from the previous page. Using our
            new definitions, we can write the state like this:
            <M
              display
              t="\ket{\psi} = \frac{1}{\sqrt{2}}\bigl(\ket{1}_A\ket{0}_B - \ket{0}_A\ket{1}_B\bigr)"
            />
          </p>

          <p>
            Assume Alice and Bob (the two observers) always choose either X or Z
            SG orientations to measure. (That is, they each independently choose
            their axis randomly, with 50-50 odds of choosing X or Z.)
          </p>
        </Prose>
      ),
    }),

    section({
      name: "bX1A0",
      body: (m) => (
        <ChooseOne
          model={m.bX1A0}
          label={
            <Prose>
              Bob uses an SG oriented along the X axis and measures a 1. If
              Alice measures a 0, which of the following is true?
            </Prose>
          }
          choices={aliceSGChoices}
          answer="either"
          explanation="No way to know with certainty from a single outcome."
        />
      ),
    }),

    section({
      name: "bX1A1",
      body: (m) => (
        <ChooseOne
          model={m.bX1A1}
          label={
            <Prose>
              Bob uses an SG oriented along the X axis and measures a 1. If
              Alice measures a 1, which of the following is true?
            </Prose>
          }
          choices={aliceSGChoices}
          answer="Z"
          explanation="If it was X, she would HAVE to have measured 0, but she did not."
        />
      ),
    }),

    section({
      name: "aZ0B1Prob",
      body: (m) => (
        <ChooseOne
          model={m.aZ0B1Prob}
          label={
            <Prose>
              <p>
                If Alice uses an SG oriented along the Z axis and measures a 0,
                what is the likelihood that Bob measures a 1?
              </p>

              <p>
                Recall: Bob <em>randomly</em> (with 50/50 odds) orients his SG
                either along the X or Z axis.
              </p>
            </Prose>
          }
          choices={[
            ["100% certainty", "100% certainty"],
            ["75% certainty", "75% certainty"],
            ["50% certainty", "50% certainty"],
            ["25% certainty", "25% certainty"],
            ["0% certainty", "0% certainty"],
          ]}
          answer="75% certainty"
          explanation={
            <p>
              If Bob measures Z, the likelihood is 100%, but if he measures X,
              it’s 50%. Since the measurement he chooses is random, and thus
              each occurs half the time, the overall likelihood is
              <M t="100\% * ½ + 50\% * ½ = 75\%" />.
            </p>
          }
        />
      ),
    }),

    section({
      name: "aZ1B1Prob",
      body: (m) => (
        <ChooseOne
          model={m.aZ1B1Prob}
          label={
            <Prose>
              <p>
                If Alice uses an SG oriented along the Z axis and measures a 1,
                what is the likelihood that Bob measures a 1?
              </p>

              <p>
                Hint: Recall that Bob randomly orients his SG either along the X
                or Z axis.
              </p>
            </Prose>
          }
          choices={[
            ["100% certainty", "100% certainty"],
            ["75% certainty", "75% certainty"],
            ["50% certainty", "50% certainty"],
            ["25% certainty", "25% certainty"],
            ["0% certainty", "0% certainty"],
          ]}
          answer="25% certainty"
          explanation={
            <p>
              If Bob measures Z, the likelihood is 0%. If he measures X, it’s
              50%. The overall likelihood is
              <M t="0\% * ½ + 50\% * ½ = 25\%" />.
            </p>
          }
        />
      ),
    }),

    section({
      name: "aZbZ",
      body: (m) => (
        <ChooseAll
          model={m.aZbZ}
          label={
            <Prose>
              If Bob and Alice both use SGs oriented along the Z axis, choose
              ALL statements that are true. (There may be more than one.)
            </Prose>
          }
          choices={bobMeasurementChoices}
          answer={["0", "1"]}
          explanation="Both are true.  They must measure opposites."
        />
      ),
    }),

    section({
      name: "aZbX",
      body: (m) => (
        <ChooseAll
          model={m.aZbX}
          label={
            <Prose>
              Bob uses an SG oriented along the X axis an Alice us an SG
              oriented along the Z axis. Choose ALL statements that are true.
              (There may be more than one.)
            </Prose>
          }
          choices={bobMeasurementChoices}
          answer={["either"]}
        />
      ),
    }),

    section({
      name: "general",
      body: (m) => (
        <ChooseAll
          model={m.general}
          label={
            <Prose>
              Choose ALL statements that are <em>in general</em> correct.
            </Prose>
          }
          choices={[
            [
              "Bob 1",
              "If Bob measures a 1, he can always infer the result of Alice’s measurement",
            ],
            [
              "Bob 0",
              "If Bob measures a 0, he can always infer the result of Alice’s measurement",
            ],
            [
              "same direction",
              "If Alice and Bob both have their SGs oriented in the same direction and they know this, Bob should be able to infer the result of Alice's measurement",
            ],
          ]}
          answer={["same direction"]}
          explanation={
            <p>
              This is the only option that is true <em>in general</em>.
            </p>
          }
        />
      ),
    }),
  ],
}));

const aliceSGChoices = [
  ["X", "Alice must have an X oriented SG"],
  ["Z", "Alice must have a Z oriented SG"],
  ["either", "Alice can have either an X or Z oriented SG"],
  ["none", "None of the above has to be true"],
] as const;

const bobMeasurementChoices = [
  ["0", "If Alice measures a 1, Bob MUST measure a 0"],
  ["1", "If Alice measures a 0, Bob MUST measure a 1"],
  ["either", "If Alice measures a 1, Bob may measure either a 0 or a 1"],
] as const;
