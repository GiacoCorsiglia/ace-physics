import React from "react";
import { EPR } from "src/common/tutorials";
import {
  Answer,
  AnswerVisibility,
  Continue,
  Prose,
  Reminder,
  RevealAnswersSection,
  Section,
} from "src/components";
import { Choice, FieldGroup, Text, Toggle } from "src/components/inputs";
import { choices } from "src/components/inputs/Select";
import { Content } from "src/components/layout";
import M from "src/components/M";
import { isSet, useFields } from "src/state";
import { ContinueToNextPart, Part, sectionComponents } from "../shared";

export default function QuantumCryptography() {
  const f = useFields(EPR);

  return (
    <Part label="Quantum Cryptography">
      <AnswerVisibility field={f.cryptographyAnswers}>
        <Content>
          {sections}

          <RevealAnswersSection
            commits={f.keyCommit}
            field={f.cryptographyAnswers}
          />

          <Section commits={f.cryptographyAnswers.properties.commit}>
            <ContinueToNextPart commit={f.cryptographyFinalCommit} />
          </Section>
        </Content>
      </AnswerVisibility>
    </Part>
  );
}

const sections = sectionComponents(EPR, [
  (f) => (
    <Section first>
      <Reminder>
        <Prose>
          <ul>
            <li>“Measures a 0” means “spin down“</li>
            <li>“Measuring a 1” means “spin up”</li>
            <li>“SG” means “Stern-Gerlach device“</li>
          </ul>

          <M
            display
            t="\ket{\psi} = \frac{1}{\sqrt{2}}\bigl(\ket{1}_A\ket{0}_B - \ket{0}_A\ket{1}_B\bigr)"
          />
        </Prose>
      </Reminder>

      <Prose>
        <p>
          Again, Assume Alice and Bob (the two observers) always choose either X
          or Z SG orientations to measure.
        </p>
      </Prose>

      <Continue commit={f.cryptographyIntroCommit} label="Got it" />
    </Section>
  ),

  (f) => {
    const certaintyChoices = choices(f.bobCertaintyTable.properties.aXbX, {
      certain: "Certain",
      uncertain: "Uncertain",
    });

    return (
      <>
        <Section commits={f.cryptographyIntroCommit}>
          <Prose>
            Complete the following table by recording in the third column
            whether or not Bob knows <em>with certainty</em> what Alice
            measures, from his knowledge of his own measurement AND Alice’s SG
            orientation.
          </Prose>

          <table className="table">
            <thead>
              <tr>
                <td>Alice’s SG Orientation</td>
                <td>Bob’s SG Orientation</td>
                <td>Is Bob certain or uncertain?</td>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td rowSpan={2}>X axis</td>
                <td>X axis</td>
                <td>
                  <Toggle
                    field={f.bobCertaintyTable.properties.aXbX}
                    choices={certaintyChoices}
                    answer="certain"
                  />
                </td>
              </tr>

              <tr>
                <td>Z axis</td>
                <td>
                  <Toggle
                    field={f.bobCertaintyTable.properties.aXbZ}
                    choices={certaintyChoices}
                    answer="uncertain"
                  />
                </td>
              </tr>

              <tr>
                <td rowSpan={2}>Z axis</td>
                <td>X axis</td>
                <td>
                  <Toggle
                    field={f.bobCertaintyTable.properties.aZbX}
                    choices={certaintyChoices}
                    answer="uncertain"
                  />
                </td>
              </tr>

              <tr>
                <td>Z axis</td>
                <td>
                  <Toggle
                    field={f.bobCertaintyTable.properties.aZbZ}
                    choices={certaintyChoices}
                    answer="certain"
                  />
                </td>
              </tr>
            </tbody>
          </table>

          <Continue
            commit={f.bobCertaintyTableCommit}
            allowed={isSet(f.bobCertaintyTable)}
          />
        </Section>
      </>
    );
  },

  (f) => (
    <Section commits={f.bobCertaintyTableCommit}>
      <Choice
        field={f.bobCertaintyTableRule}
        label={
          <Prose>
            In the above table/scenario, which of the following is true?
          </Prose>
        }
        choices={choices(f.bobCertaintyTableRule, {
          always: "Bob always knows with 100% certainty what Alice measures",
          sometimes:
            "Bob sometimes knows with 100% certainty what Alice measures",
          never: "Bob never knows with 100% certainty what Alice measures",
        })}
        answer="sometimes"
        explanation="In particular, Bob knows with 100% certainty only when he and Alice measure along the same direction."
      />

      <Continue
        commit={f.bobCertaintyTableRuleCommit}
        allowed={isSet(f.bobCertaintyTableRule)}
      />
    </Section>
  ),

  (f) => {
    const t = f.bobMeasurementTable.properties;
    const cs = choices(t.a1aXbX);

    return (
      <Section commits={f.bobCertaintyTableRuleCommit}>
        <Prose>
          Complete the following table with the measurements made by Bob in each
          case. The “?” option indicates that you’re not certain because it
          could be either 1 or 0.
        </Prose>

        <table className="table">
          <thead>
            <tr>
              <td>Alice’s measurement</td>
              <td>Alice’s SG Orientation</td>
              <td>Bob’s SG Orientation</td>
              <td>Bob’s Measurement</td>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td rowSpan={4}>1</td>
              <td rowSpan={2}>X axis</td>
              <td>X axis</td>
              <td>
                <Toggle field={t.a1aXbX} choices={cs} answer="0" />
              </td>
            </tr>

            <tr>
              <td>Z axis</td>
              <td>
                <Toggle field={t.a1aXbZ} choices={cs} answer="?" />
              </td>
            </tr>

            <tr>
              <td rowSpan={2}>Z axis</td>
              <td>X axis</td>
              <td>
                <Toggle field={t.a1aZbX} choices={cs} answer="?" />
              </td>
            </tr>

            <tr>
              <td>Z axis</td>
              <td>
                <Toggle field={t.a1aZbZ} choices={cs} answer="0" />
              </td>
            </tr>

            <tr>
              <td rowSpan={4}>0</td>
              <td rowSpan={2}>X axis</td>
              <td>X axis</td>
              <td>
                <Toggle field={t.a0aXbX} choices={cs} answer="1" />
              </td>
            </tr>

            <tr>
              <td>Z axis</td>
              <td>
                <Toggle field={t.a0aXbZ} choices={cs} answer="?" />
              </td>
            </tr>

            <tr>
              <td rowSpan={2}>Z axis</td>
              <td>X axis</td>
              <td>
                <Toggle field={t.a0aZbX} choices={cs} answer="?" />
              </td>
            </tr>

            <tr>
              <td>Z axis</td>
              <td>
                <Toggle field={t.a0aZbZ} choices={cs} answer="1" />
              </td>
            </tr>
          </tbody>
        </table>

        <Continue
          commit={f.bobMeasurementTableCommit}
          allowed={isSet(f.bobMeasurementTable)}
        />
      </Section>
    );
  },

  (f) => {
    const rows = [
      ["X", "X", "1"],
      ["X", "Z", "1"],
      ["Z", "Z", "0"],
      ["Z", "X", "1"],
      ["Z", "X", "1"],
      ["X", "X", "0"],
      ["Z", "Z", "1"],
      ["Z", "Z", "1"],
      ["X", "X", "0"],
      ["Z", "X", "0"],
    ] as const;

    const answers = rows.map(([aSG, bSG, bM]) => (aSG === bSG ? bM : "-"));
    const key = answers.filter((a) => a !== "-").join("");

    const cs = choices(f.keyTable.elements[0], {
      "0": "0",
      "1": "1",
      "-": "Discard",
    });

    return (
      <>
        <Section commits={f.bobMeasurementTableCommit}>
          <Prose>
            <p>
              Alice and Bob complete 10 trials to generate a key (a string of
              0’s and 1’s they and ONLY they know). Below is a chart of results
              Bob sees. He knows his SG orientation and Alice’s SG orientation
              (sent after measurements, on a public channel), and Bob knows the
              (secret) result of the measurement from his own orientation. Alice
              and Bob agree to discard data from when their orientations were
              different. On what remains, they agree to use Bob’s measurements
              as “the key” (a string of 0s and 1s).
            </p>

            <p>
              Fill in the table to determine the key. If the bit should be kept,
              select it’s value (0 or 1); otherwise indicate if the bit should
              be discarded.
            </p>
          </Prose>

          <table className="table">
            <thead>
              <tr>
                <td>Alice’s SG Orientation</td>
                <td>Bob’s SG Orientation</td>
                <td>Bob’s Measurement</td>
                <td>KEY</td>
              </tr>
            </thead>

            <tbody>
              {rows.map(([aSG, bSG, bM], i) => (
                <tr key={i}>
                  <td>{aSG}</td>
                  <td>{bSG}</td>
                  <td>{bM}</td>
                  <td>
                    <Toggle
                      field={f.keyTable.elements[i]}
                      choices={cs}
                      answer={answers[i]}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <Continue commit={f.keyTableCommit} allowed={isSet(f.keyTable)} />
        </Section>

        <Section commits={f.keyTableCommit}>
          <Prose>Given the dataset above, what is the shared key?</Prose>

          <FieldGroup grid className="margin-top">
            <Text
              field={f.key}
              label="Shared key:"
              style={{ maxWidth: "13rem" }}
              placeholder="Type the key here"
            />

            <Answer
              correct={f.key.value?.trim() === key}
              style={{ gridColumn: 2, maxWidth: "13rem" }}
            >
              {key}
            </Answer>
          </FieldGroup>

          <Continue commit={f.keyCommit} allowed={isSet(f.key)} />
        </Section>
      </>
    );
  },
]);
