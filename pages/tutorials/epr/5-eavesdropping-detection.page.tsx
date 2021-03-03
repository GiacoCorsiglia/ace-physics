import { Answer, Prose, Reminder } from "@/design";
import { ChooseOne, Integer, TextArea } from "@/inputs";
import M from "@/math";
import { Model } from "@/reactivity";
import { NumberField } from "@/schema/fields";
import { page } from "@/tutorial";
import { useValue } from "@/tutorial/state-tree";
import React from "react";
import EavesdroppingProtectionSvg from "./assets/eavesdropping-protection.svg";
import setup from "./setup";

export default page(setup, ({ section }) => ({
  name: "eavesdroppingDetection",
  label: "TODO",
  answersChecked: "none",
  sections: [
    section({
      name: "eavesdroppingDetectionIntro",
      body: (
        <>
          <EavesdroppingProtectionSvg className="svg-img" />

          <Prose>
            <p>
              Now there is a third party, Eve, who intercepts every particle
              sent to Bob with her own SG, which she randomly orients along the
              X or Z direction. She does NOT know the SG orientations of Alice
              or Bob at the time she measures.
            </p>

            <p>
              Eve immediately generates a replacement particle to send to Bob in
              place of the one she intercepted. If Eve measures a 1 along the Z
              axis, she produces and sends a particle to Bob that is in the{" "}
              <M t="\ket{\uparrow_B}_Z" /> state. If Eve measures a 0 along the
              X axis, she produces and sends to Bob a particle in the{" "}
              <M t="\ket{\downarrow_B}_X" /> state, etc.
            </p>

            <p>
              <strong>
                Assume that, after all measurements, Alice and Bob have publicly
                shared their axes choices.{" "}
                <em>
                  However, Alice and Bob have NOT yet shared what results they
                  got.
                </em>
              </strong>
            </p>

            <p>
              Since Alice and Bob discard all measurements for which their SGs
              are not oriented in the same direction (both in the Z direction,
              or both X), we ignore such mismatched cases for the remainder of
              this tutorial.
            </p>
          </Prose>

          <Reminder>
            <Prose>
              <M
                display
                t="\ket{\psi} = \frac{1}{\sqrt{2}}\bigl(\ket{1}_A\ket{0}_B - \ket{0}_A\ket{1}_B\bigr)"
              />
            </Prose>
          </Reminder>
        </>
      ),
      continue: { label: "Got it" },
    }),

    section({
      name: "eveCertainty",
      body: (m) => (
        <ChooseOne
          model={m.eveCertainty}
          label={
            <Prose>
              If Alice and Bob both have their SGs oriented along X, which one
              of the following statements is true about whether Eve can be 100%
              sure about what Alice had noted as the corresponding bit of the
              key.
            </Prose>
          }
          choices={[
            [
              "certain if X",
              "Eve will be certain about this bit of the key  if her SG is oriented along the X axis",
            ],
            [
              "certain if Z",
              "Eve will be certain about this bit of the key if her SG is oriented along the Z axis",
            ],
            [
              "always certain",
              "Eve will be certain about this bit of the key regardless of the orientation of her SG",
            ],
            [
              "never certain",
              "Eve can never be certain about this bit of the key",
            ],
          ]}
          allowOther={false}
          answer="certain if X"
        />
      ),
    }),

    section({
      name: "eveUndetected",
      body: (m) => (
        <ChooseOne
          model={m.eveUndetected}
          label={
            <Prose>
              If Alice and Bob have their SGs oriented along X and Eve has her
              SG oriented along the X axis, could Eve’s presence go undetected?
            </Prose>
          }
          choices={[
            [
              "undetected",
              "Eve’s measurement is the same as the one Bob would have made without Eve’s presence. This situation is such that Eve’s presence will certainly go UNdetected.",
            ],
            [
              "detected",
              "Eve’s measurement is the opposite to the one Bob would have made, so her presence could be detected. (E.g., if Bob would have measured a 0, Eve measures a 1, and sends a 1 along to Bob).",
            ],
            [
              "maybe detected",
              "Eve’s measurement is either the same as or opposite to the one Bob would have made with equal likelihood. It might be possible to detect her presence, but it’s not certain.",
            ],
            ["none", "None of the above."],
          ]}
          allowOther={false}
          answer="undetected"
        />
      ),
    }),

    section({
      name: "eveVsBob",
      body: (m) => (
        <ChooseOne
          model={m.eveVsBob}
          label={
            <Prose>
              If Alice and Bob have their SGs oriented along X and Eve has her
              SG oriented along Z, how does Eve’s measurement (i.e., 1 or 0)
              compare to the one Bob would have made had Eve not interfered?
            </Prose>
          }
          choices={[
            [
              "same",
              "Eve’s measurement is definitely the same as the one Bob would have made.",
            ],
            [
              "opposite",
              "Eve’s measurement is opposite the one Bob would have made (e.g. if Eve measures a 1, Bob would have measured a 0 or vice versa).",
            ],
            [
              "either",
              "Eve’s measurement is either the same as or opposite to the one Bob would have made with equal likelihood.",
            ],
            ["none", "None of the above."],
          ]}
          allowOther={false}
          answer="either"
          explanation={
            <>
              <p>
                Eve “collapsed” a definite Z state into the X-basis. She gets a
                50/50 result. WHICHEVER she gets, sending that to Bob, he now
                measures back in Z, and in either case he gets up or down with
                50/50 chances. So, he has only a 50/50 chance of getting what he
                would have gotten (and what Alice says he should get!)
              </p>

              <p>
                When that happens, he doesn’t get what Alice thinks he should
                have—if they later compare that case, they notice these
                “mismatches” and realize Eve was present! So they must check
                some agreed upon portion of their keys (publicly) before using
                them to send a message.
              </p>
            </>
          }
        />
      ),
    }),

    section({
      name: "probBobUnaffectedEveX",
      body: (m) => (
        <ChooseOne
          model={m.probBobUnaffectedEveX}
          label={
            <Prose>
              Alice and Bob have their SGs oriented along X and Eve has her SG
              oriented along <strong>X</strong>. If Eve generates a replacement
              particle and sends it to Bob, as described above, what is the
              likelihood that Bob will make the same measurement that he would
              have without Eve’s interference?
            </Prose>
          }
          choices={[
            ["100%", "100%"],
            ["75%", "75%"],
            ["50%", "50%"],
            ["25%", "25%"],
            ["0%", "0%"],
          ]}
          allowOther={false}
          answer="100%"
        />
      ),
    }),

    section({
      name: "probBobUnaffectedEveZ",
      body: (m) => (
        <ChooseOne
          model={m.probBobUnaffectedEveZ}
          label={
            <Prose>
              Alice and Bob have their SGs oriented along X and Eve has her SG
              oriented along <strong>Z</strong>. If Eve generates a replacement
              particle and sends it to Bob, as described above, what is the
              likelihood that Bob will make the same measurement that he would
              have without Eve’s interference?
            </Prose>
          }
          choices={[
            ["100%", "100%"],
            ["50%", "50%"],
            ["25%", "25%"],
            ["0%", "0%"],
          ]}
          allowOther={false}
          answer="50%"
        />
      ),
    }),

    section({
      name: "probEveDetected",
      body: (m) => (
        <ChooseOne
          model={m.probEveDetected}
          label={
            <Prose>
              If both Alice and Bob have their SGs oriented along X, what is the
              likelihood that Bob will detect Eve’s interference (i.e, Alice and
              Bob’s bits will <em>not</em> match when they later compare their
              records)?
            </Prose>
          }
          choices={[
            ["75%", "75%"],
            ["50%", "50%"],
            ["25%", "25%"],
            ["0%", "0%"],
          ]}
          allowOther={false}
          answer="25%"
          explanation={
            <p>
              Half the time Eve was oriented in X too, and detection chance is
              0%. But half the time Eve will be oriented in Z, that’s the
              scenario just above where the detection chance is 50%. Overall,
              the detection chance is <M t="½ * 0\% + ½ * 50\% = 25\%" />.
            </p>
          }
        />
      ),
    }),

    section({
      name: "eveDetectionTable",
      body: (m) => (
        <>
          <Prose>
            Summarize your answers above by completing the following table.
            Enter the likelihood that Bob will detect Eve’s interference (Alice
            and Bob’s bits will not match if Alice and Bob were to compare some
            bits, e.g., every 10th bit of their key) for each of the following
            cases:
          </Prose>

          <table className="table">
            <thead>
              <tr>
                <td>Alice and Bob’s SG Orientation</td>
                <td>Eve’s SG Orientation</td>
                <td>Likelihood of Detecting Interference</td>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td rowSpan={2}>X axis</td>
                <td>X axis</td>
                <td>
                  <Percent
                    model={m.eveDetectionTable.properties.abXeX}
                    answer={0}
                  />
                </td>
              </tr>

              <tr>
                <td>Z axis</td>
                <td>
                  <Percent
                    model={m.eveDetectionTable.properties.abXeZ}
                    answer={50}
                  />
                </td>
              </tr>

              <tr>
                <td rowSpan={2}>Z axis</td>
                <td>X axis</td>
                <td>
                  <Percent
                    model={m.eveDetectionTable.properties.abZeX}
                    answer={50}
                  />
                </td>
              </tr>

              <tr>
                <td>Z axis</td>
                <td>
                  <Percent
                    model={m.eveDetectionTable.properties.abZeZ}
                    answer={0}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </>
      ),
    }),

    section({
      name: "overallDetectionProb",
      body: (m, { responses }) => (
        <>
          <Prose>
            What is the overall likelihood that Bob will detect interference for
            a bit in the key (if he compares many bits with Alice) due to
            eavesdropping by Eve?
          </Prose>

          <Percent
            label={
              <div style={{ marginRight: "1rem" }}>Overall likelihood:</div>
            }
            model={m.overallDetectionProb}
            className="margin-top-1"
          />

          <Answer correct={responses?.overallDetectionProb === 25}>
            <Prose>
              <blockquote>25%</blockquote>
              <p>This is really the same question as two questions prior.</p>
            </Prose>
          </Answer>

          <TextArea
            model={m.oddsBobDoesntNoticeEve}
            placeholder="Optional: type your response here"
            label={
              <Prose>
                To think about: If we “check”, say, 100 bits with Eve present,
                what are the odds that Bob FAILS to notice the eavesdropper?
              </Prose>
            }
          />

          <Answer>
            <Prose>
              After checking 100 bits, the odds that Bob FAILS to notice the
              eavesdropper are:
              <M display t="(0.75)^{100} = 3 \times 10^{-13}" />
            </Prose>
          </Answer>
        </>
      ),
    }),

    section({
      name: "whyQuantum",
      body: (m) => (
        <>
          <TextArea
            model={m.whyQuantum}
            label={
              <Prose>
                Why does this system necessarily depend on quantum mechanics
                rather than classical mechanics?
              </Prose>
            }
          />

          <Answer>
            <Prose>
              Classically, there is no such thing as “collapse.” Eve’s
              measurement can be “delicate” and not change the state. She looks
              but simply passes it along to Bob, he has no way to know she
              peeked! Without an eavesdropper we don’t need QM, the “colored
              marbles” from page 3 (the “Classical Marble Scenario”) would
              suffice, but if you are worried about eavesdropping, that won’t
              work!
            </Prose>
          </Answer>
        </>
      ),
    }),
  ],
}));

const Percent = ({
  model,
  answer,
  label,
  className,
}: {
  model: Model<NumberField>;
  answer?: number;
  label?: React.ReactNode;
  className?: string;
}) => {
  const [value] = useValue(model.path as any);

  return (
    <div
      className={className}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {label}

      <div style={{ display: "flex", alignItems: "stretch" }}>
        <Integer
          style={{
            maxWidth: "6.5rem",
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
            textAlign: "right",
          }}
          model={model}
          placeholder="Percent"
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "0.3rem",
            borderStyle: "solid",
            borderColor: "#ccc",
            borderWidth: "1px 1px 1px 0",
            borderTopRightRadius: "3px",
            borderBottomRightRadius: "3px",
          }}
        >
          <M t="\%" />
        </div>
      </div>

      {answer !== undefined && (
        <Answer
          style={{ marginLeft: "1rem", marginTop: "0" }}
          correct={value === answer}
        >
          {answer}%
        </Answer>
      )}
    </div>
  );
};
