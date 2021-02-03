import { Help, Prose, Reminder } from "@/design";
import { ChooseAll, Decimal, FieldGroup, TextArea, Toggle } from "@/inputs";
import M from "@/math";
import { page } from "@/tutorial";
import { approxEquals, norm } from "@/util";
import React from "react";
import setup from "./setup";

export default page(setup, ({ section, oneOf, hint }) => ({
  name: "superpositions",
  label: "Superpositions",
  answersChecked: "some",
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
      name: "whyWideStressed",
      body: (m) => (
        <TextArea
          label={
            <Prose>
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
              <M t="\ket{\wideye}" prespace={false} />) how they felt, which
              would you <em>probably</em> expect them to say: <em>happy</em> or{" "}
              <em>sad</em>?
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

          <FieldGroup grid className="margin-top">
            <Decimal label={<M t="a =" />} model={m.smallEyeA} />

            <Decimal label={<M t="b =" />} model={m.smallEyeB} />
          </FieldGroup>

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
                  They’re <strong className="prose">not</strong> unique
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
      continue: { label: "Let’s check in" },
    }),

    oneOf({
      which: (r) => {
        const a = 2 / Math.sqrt(5);
        const b = -1 / Math.sqrt(5);

        const isNormalized = approxEquals(norm(r.smallEyeA, r.smallEyeB), 1);

        const rightRatio = approxEquals(
          a / b,
          (r.smallEyeA || NaN) / (r.smallEyeB || NaN)
        );

        if (isNormalized && rightRatio) {
          // a & b are correct!
          return "abAlternative";
        } else if (!isNormalized && rightRatio) {
          // a & b are not normalized.
          return "abNotNormalized";
        } else {
          // Something else is wrong.
          return "abIncorrect";
        }
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
                      responses?.smallEyeB! > 0 ? "+" : "-"
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

        abNotNormalized: section({
          name: "abNotNormalized",
          body: (
            <Help>
              <Prose>
                The state <M t="\ket{\smalleye}" /> is <em>normalized</em>, so
                your coefficients should satisfy
                <M display t="|a|^2 + |b|^2 = 1" />
                You may want to check up on that before moving on.
              </Prose>
            </Help>
          ),
        }),

        abIncorrect: section({
          name: "abIncorrect",
          body: (
            <Help>
              <Prose>
                You might want to check up on your coefficients <M t="a" /> and{" "}
                <M t="b" /> before moving on. You can double check the following
                relations:
                <M
                  display
                  t="\braket{\smalleye|\smalleye} = |a|^2 + |b|^2 = 1"
                />
                and
                <M
                  display
                  t="\braket{\wideye|\smalleye} = \left(\frac{1}{\sqrt{5}} \bra{\smiley} + \frac{2}{\sqrt{5}} \bra{\frownie}\right) \left(a \ket{\smiley} + b \ket{\frownie}\right) = 0"
                />
              </Prose>
            </Help>
          ),
        }),
      },
    }),
  ],
}));
