import { Answer, Prose, Reminder } from "@/design";
import { ChooseOne, FieldGroup, Text, Toggle } from "@/inputs";
import M from "@/math";
import { page } from "@/tutorial";
import React from "react";
import setup from "./setup";

export default page(setup, ({ section }) => ({
  name: "quantumCryptography",
  label: "Quantum Cryptography",
  answers: "provided",
  sections: [
    section({
      name: "quantumCryptographyIntro",
      body: (
        <>
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
              Again, Assume Alice and Bob (the two observers) always choose
              either X or Z SG orientations to measure.
            </p>
          </Prose>
        </>
      ),
      continue: { label: "Got it" },
    }),

    section({
      name: "bobCertaintyTable",
      body: (m) => {
        const certaintyChoices = [
          ["certain", "Certain"],
          ["uncertain", "Uncertain"],
        ] as const;

        return (
          <>
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
                      model={m.bobCertaintyTable.properties.aXbX}
                      choices={certaintyChoices}
                      answer="certain"
                    />
                  </td>
                </tr>

                <tr>
                  <td>Z axis</td>
                  <td>
                    <Toggle
                      model={m.bobCertaintyTable.properties.aXbZ}
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
                      model={m.bobCertaintyTable.properties.aZbX}
                      choices={certaintyChoices}
                      answer="uncertain"
                    />
                  </td>
                </tr>

                <tr>
                  <td>Z axis</td>
                  <td>
                    <Toggle
                      model={m.bobCertaintyTable.properties.aZbZ}
                      choices={certaintyChoices}
                      answer="certain"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </>
        );
      },
    }),

    section({
      name: "bobCertaintyTableRule",
      body: (m) => (
        <ChooseOne
          model={m.bobCertaintyTableRule}
          label={
            <Prose>
              In the above table/scenario, which of the following is true?
            </Prose>
          }
          choices={[
            [
              "always",
              "Bob always knows with 100% certainty what Alice measures",
            ],
            [
              "sometimes",
              "Bob sometimes knows with 100% certainty what Alice measures",
            ],
            [
              "never",
              "Bob never knows with 100% certainty what Alice measures",
            ],
          ]}
          answer="sometimes"
          explanation="In particular, Bob knows with 100% certainty only when he and Alice measure along the same direction."
        />
      ),
    }),

    section({
      name: "bobMeasurementTable",
      body: (m) => {
        const t = m.bobMeasurementTable.properties;
        const cs = [
          ["0", "0"],
          ["1", "1"],
          ["?", "?"],
        ] as const;

        return (
          <>
            <Prose>
              Complete the following table with the measurements made by Bob in
              each case. The “?” option indicates that you’re not certain
              because it could be either 1 or 0.
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
                    <Toggle model={t.a1aXbX} choices={cs} answer="0" />
                  </td>
                </tr>

                <tr>
                  <td>Z axis</td>
                  <td>
                    <Toggle model={t.a1aXbZ} choices={cs} answer="?" />
                  </td>
                </tr>

                <tr>
                  <td rowSpan={2}>Z axis</td>
                  <td>X axis</td>
                  <td>
                    <Toggle model={t.a1aZbX} choices={cs} answer="?" />
                  </td>
                </tr>

                <tr>
                  <td>Z axis</td>
                  <td>
                    <Toggle model={t.a1aZbZ} choices={cs} answer="0" />
                  </td>
                </tr>

                <tr>
                  <td rowSpan={4}>0</td>
                  <td rowSpan={2}>X axis</td>
                  <td>X axis</td>
                  <td>
                    <Toggle model={t.a0aXbX} choices={cs} answer="1" />
                  </td>
                </tr>

                <tr>
                  <td>Z axis</td>
                  <td>
                    <Toggle model={t.a0aXbZ} choices={cs} answer="?" />
                  </td>
                </tr>

                <tr>
                  <td rowSpan={2}>Z axis</td>
                  <td>X axis</td>
                  <td>
                    <Toggle model={t.a0aZbX} choices={cs} answer="?" />
                  </td>
                </tr>

                <tr>
                  <td>Z axis</td>
                  <td>
                    <Toggle model={t.a0aZbZ} choices={cs} answer="1" />
                  </td>
                </tr>
              </tbody>
            </table>
          </>
        );
      },
    }),

    section({
      name: "keyTable",
      body: (m) => {
        const cs = [
          ["0", "0"],
          ["1", "1"],
          ["-", "Discard"],
        ] as const;

        return (
          <>
            <Prose>
              <p>
                Alice and Bob complete 10 trials to generate a key (a string of
                0’s and 1’s they and ONLY they know). Below is a chart of
                results Bob sees. He knows his SG orientation and Alice’s SG
                orientation (sent after measurements, on a public channel), and
                Bob knows the (secret) result of the measurement from his own
                orientation. Alice and Bob agree to discard data from when their
                orientations were different. On what remains, they agree to use
                Bob’s measurements as “the key” (a string of 0s and 1s).
              </p>

              <p>
                Fill in the table to determine the key. If the bit should be
                kept, select it’s value (0 or 1); otherwise indicate if the bit
                should be discarded.
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
                {keyTableRows.map(([aSG, bSG, bM], i) => (
                  <tr key={i}>
                    <td>{aSG}</td>
                    <td>{bSG}</td>
                    <td>{bM}</td>
                    <td>
                      <Toggle
                        model={m.keyTable.elements[i]}
                        choices={cs}
                        answer={answers[i]}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        );
      },
    }),

    section({
      name: "key",
      body: (m, { responses }) => (
        <>
          <Prose>Given the dataset above, what is the shared key?</Prose>

          <FieldGroup grid className="margin-top">
            <Text
              model={m.key}
              label="Shared key:"
              style={{ maxWidth: "13rem" }}
              placeholder="Type the key here"
            />

            <Answer
              correct={responses?.key?.trim() === key}
              style={{ gridColumn: 2, maxWidth: "13rem" }}
            >
              {key}
            </Answer>
          </FieldGroup>
        </>
      ),
    }),
  ],
}));

const keyTableRows = [
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

const answers = keyTableRows.map(([aSG, bSG, bM]) => (aSG === bSG ? bM : "-"));
const key = answers.filter((a) => a !== "-").join("");
