import {
  ChooseAll,
  ChooseOne,
  Decimal,
  Guidance,
  LabelsLeft,
  M,
  Prose,
  Reminder,
  TextBox,
  Toggle,
} from "@/components";
import { approxEquals, norm } from "@/helpers/client";
import { page } from "@/tutorial";
import setup from "./setup";

export default page(setup, ({ section, oneOf, hint }) => ({
  name: "superpositions",
  label: "Superpositions",
  answers: "checked-some",
  sections: [
    section({
      name: "superpositionsIntro",
      body: (
        <>
          <Reminder>
            <Prose>
              Small-eyed mice: &nbsp;{" "}
              <M t="\hat{S}\ket{\smalleye} = 1 \ket{\smalleye}" /> <br />
              Wide-eyed mice: &nbsp;{" "}
              <M t="\hat{S}\ket{\wideye} = 2 \ket{\wideye}" /> <br />
              Happy mice: &nbsp; <M t="\hat{M}\ket{\smiley}=\ket{\smiley}" />
              <br />
              Sad mice: &nbsp; <M t="\hat{M}\ket{\frownie}= -\ket{\frownie}" />
            </Prose>
          </Reminder>

          <Prose>
            Suppose I now tell you:
            <M
              display
              t="\ket{\wideye} = \frac{1}{\sqrt{5}} \ket{\smiley} + \frac{2}{\sqrt{5}} \ket{\frownie}"
            />
          </Prose>
        </>
      ),
      continue: { label: "Got it" },
    }),

    section({
      name: "coefficientsVsEigenvalues",
      body: (m) => (
        <ChooseOne
          model={m.coefficientsVsEigenvalues}
          label={
            <Prose>
              In the equation above, the coefficient{" "}
              <M t="\frac{2}{\sqrt{5}}" /> is an example of which of the
              following?
            </Prose>
          }
          choices={[
            [
              "eigenvalue",
              <>
                <M t="\frac{2}{\sqrt{5}}" /> is an <strong>eigenvalue</strong>
              </>,
            ],
            [
              "measurement outcome",
              <>
                <M t="\frac{2}{\sqrt{5}}" /> is a possible{" "}
                <strong>measurement outcome</strong>
              </>,
            ],
            [
              "probability",
              <>
                <M t="\frac{2}{\sqrt{5}}" /> is a <strong>probability</strong>
              </>,
            ],
            [
              "probability amplitude",
              <>
                <M t="\frac{2}{\sqrt{5}}" /> is a{" "}
                <strong>probability amplitude</strong>
              </>,
            ],
          ]}
        />
      ),
      guidance: {
        nextMessage(r) {
          const selected = r.coefficientsVsEigenvalues?.selected;
          if (selected) {
            return selected;
          }
          // Otherwise they must have input an "other" answer.
          return "other";
        },
        messages: {
          eigenvalue: {
            body: (
              <Guidance.Disagree>
                We disagree. Eigen-equations usually look like:
                <M
                  display
                  t="(\text{operator}) (\text{eigenvector}) = (\text{eigenvalue}) \cdot (\text{eigenvector})"
                />
                There is no operator in the equation above for{" "}
                <M t="\ket{\wideye}" />, and there are two terms on the right
                hand side.
              </Guidance.Disagree>
            ),
            onContinue: "nextMessage",
          },
          "measurement outcome": {
            body: (
              <Guidance.Disagree>
                We disagree. What are the possible measurement outcomes for the
                mood and eye size operators? Is <M t="\frac{2}{\sqrt{5}}" /> one
                of those possibilities?
              </Guidance.Disagree>
            ),
            onContinue: "nextMessage",
          },
          probability: {
            body: (
              <Guidance.Disagree>
                We don’t quite agree. Do you have to take any additional steps
                to calculate a probability from the <M t="\frac{2}{\sqrt{5}}" />{" "}
                coefficient?
              </Guidance.Disagree>
            ),
            onContinue: "nextMessage",
          },
          "probability amplitude": {
            body: (
              <Guidance.Agree>
                We agree! <M t="\frac{2}{\sqrt{5}}" /> is a probability
                amplitude. You must square it to calculate the corresponding
                probability.
              </Guidance.Agree>
            ),
            onContinue: "nextSection",
          },
          other: {
            body: (
              <Guidance.HeadsUp>
                This software is not designed to analyze what you’ve written,
                but we think one of our provided answers is accurate.
              </Guidance.HeadsUp>
            ),
            onContinue: "nextMessage",
            skipAllowed: () => true,
          },
        },
      },
    }),

    section({
      name: "whyWideStressed",
      body: (m) => (
        <TextBox
          label={
            <Prose>
              Above, we said
              <M
                display
                t="\ket{\wideye} = \frac{1}{\sqrt{5}} \ket{\smiley} + \frac{2}{\sqrt{5}} \ket{\frownie}"
              />
              This suggests that wide-eyed mice are rather <em>stressed</em>.
              Briefly, why might I say that?
            </Prose>
          }
          model={m.whyWideStressed}
        />
      ),
      hints: [
        hint({
          name: "whyWideStressed",
          body: (
            <Prose>
              Look at the equation above. If you asked a wide-eyed mouse (
              <M t="\ket{\wideye}" prespace={false} />) how they felt, what
              would they most likely say: <em>happy</em> or <em>sad</em>?
            </Prose>
          ),
        }),
      ],
    }),

    section({
      name: "smallEyeBasisChange",
      body: (m) => (
        <>
          <Prose>
            <p>
              Use <em>orthonormality</em> and <em>completeness</em> to expand
              the <M t="S = 1 \text{mm}" /> eigenstate in the “mood basis.”
            </p>

            <p>
              That is, we’re asking you to find the numbers <M t="a" /> and{" "}
              <M t="b" /> so that{" "}
              <M t="\ket{\smalleye} = a \ket{\smiley} + b \ket{\frownie}" />.
            </p>
          </Prose>

          <LabelsLeft>
            <Decimal label={<M t="a =" />} model={m.smallEyeA} />

            <Decimal label={<M t="b =" />} model={m.smallEyeB} />
          </LabelsLeft>

          <Prose>(You can type them in as decimals.)</Prose>
        </>
      ),
      hints: [
        hint({
          name: "smallEyeBasisChange",
          body: (
            <Prose>
              <p>
                <em>Orthonormality</em> and <em>completeness</em> tell you that:
                <M display t="\braket{\smalleye|\smalleye} = 1" />
                and
                <M display t="\braket{\wideye|\smalleye} = 0" />
              </p>
            </Prose>
          ),
        }),
      ],
      guidance: {
        nextMessage: (r) => abFeedback(r.smallEyeA, r.smallEyeB),
        messages: {
          abCorrect: {
            body: (
              <Guidance.Agree>
                Nicely done! We agree with your values for <M t="a" /> and{" "}
                <M t="b" />.
              </Guidance.Agree>
            ),
            onContinue: "nextSection",
          },
          abIncorrect: {
            body: () => <CoefficientsIncorrectMessage />,
            onContinue: "nextMessage",
          },
          abNotNormalized: {
            body: () => <CoefficientsNotNormalizedMessage />,
            onContinue: "nextMessage",
          },
        },
      },
    }),

    section({
      name: "abUnique",
      body: (m) => (
        <>
          <Toggle
            model={m.abUnique}
            label={
              <Prose>
                Is your answer for <M t="a" /> and <M t="b" /> unique?
              </Prose>
            }
            choices={[
              ["unique", "They’re unique"],
              [
                "not unique",
                <>
                  They’re <strong>not</strong> unique
                </>,
              ],
            ]}
          />

          <Prose>If not, does it matter?</Prose>
        </>
      ),
      hints: [
        hint({
          name: "abUnique",
          body: (
            <Prose>
              When we say <strong>unique</strong>, we’re asking whether the{" "}
              <M t="a" /> and <M t="b" /> you found are the only possible
              solution.
            </Prose>
          ),
        }),
      ],
    }),

    oneOf({
      which: (r) => {
        if (abFeedback(r.smallEyeA, r.smallEyeB) === "abCorrect") {
          // We'll only show this if you got the orthonormality question correct.
          // Keeping it in this `oneOf` for backwards compatibility.
          return "abAlternative";
        }

        return null;
      },
      sections: {
        abAlternative: section({
          name: "abAlternative",
          body: (m, { responses }) => (
            <ChooseAll
              model={m.abAlternative}
              label={
                <Prose>
                  Looks like you got:
                  <M
                    display
                    t={`a = ${
                      responses?.smallEyeA! > 0 ? "+" : "-"
                    } \\frac{2}{\\sqrt{5}} \\text{ and } b = ${
                      responses?.smallEyeB! < 0 ? "-" : "+"
                    } \\frac{1}{\\sqrt{5}}`}
                  />
                  Are any of these options valid answers too? Check ALL that
                  apply.
                </Prose>
              }
              choices={[
                [
                  "negative",
                  <M
                    display
                    t="\ket{\smalleye} = -a \ket{\smiley} -b \ket{\frownie}"
                  />,
                ],
                [
                  "i",
                  <M
                    display
                    t="\ket{\smalleye} = ai \ket{\smiley} + bi \ket{\frownie}"
                  />,
                ],
                [
                  "exp",
                  <M
                    display
                    t="\ket{\smalleye} = a \e^{i\pi/4} \ket{\smiley} + b \e^{i\pi/4} \ket{\frownie}"
                  />,
                ],
                ["none", "NONE of the above"],
              ]}
            />
          ),
        }),

        // Preserving this section for backwards compatibility.
        abNotNormalized: section({
          name: "abNotNormalized",
          isLegacy: true,
          body: () => <CoefficientsNotNormalizedMessage />,
        }),
        // Preserving this section for backwards compatibility.
        abIncorrect: section({
          name: "abIncorrect",
          isLegacy: true,
          body: () => <CoefficientsIncorrectMessage />,
        }),
      },
    }),
  ],
}));

const abFeedback = (
  smallEyeA: number | undefined,
  smallEyeB: number | undefined,
) => {
  const a = 2 / Math.sqrt(5);
  const b = -1 / Math.sqrt(5);

  const isNormalized = approxEquals(norm(smallEyeA, smallEyeB), 1);

  const rightRatio = approxEquals(
    a / b,
    (smallEyeA || NaN) / (smallEyeB || NaN),
  );

  // We'll only show this if you got the orthonormality question correct.
  // Keeping it in this `oneOf` for backwards compatibility.

  if (isNormalized && rightRatio) {
    // a & b are correct!
    return "abCorrect";
  } else if (rightRatio) {
    return "abNotNormalized";
  } else {
    return "abIncorrect";
  }
};

const CoefficientsNotNormalizedMessage = () => (
  <Guidance.Disagree>
    The state <M t="\ket{\smalleye}" /> is <em>normalized</em>, so your
    coefficients should satisfy
    <M display t="|a|^2 + |b|^2 = 1" />
    You may want to check up on that before moving on.
  </Guidance.Disagree>
);

const CoefficientsIncorrectMessage = () => (
  <Guidance.Disagree>
    You might want to check up on your coefficients <M t="a" /> and <M t="b" />{" "}
    before moving on. You can double check the following relations:
    <M display t="\braket{\smalleye|\smalleye} = |a|^2 + |b|^2 = 1" />
    and
    <M
      display
      t="\braket{\wideye|\smalleye} = \left(\frac{1}{\sqrt{5}} \bra{\smiley} + \frac{2}{\sqrt{5}} \bra{\frownie}\right) \left(a \ket{\smiley} + b \ket{\frownie}\right) = 0"
    />
  </Guidance.Disagree>
);
