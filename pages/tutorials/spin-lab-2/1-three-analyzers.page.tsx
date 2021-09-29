import {
  ChooseAll,
  Dropdown,
  Integer,
  LabelsLeft,
  M,
  Prose,
  Image,
  Reminder,
  Table,
  TextBox,
  Toggle,
} from "@/components";
import { page } from "@/tutorial";
import threeAnalyzersImg from "./assets/three-analyzers.png";
import setup from "./setup";
import styles from "./styles.module.scss";

export default page(setup, ({ section, hint }) => ({
  name: "threeAnalyzers",
  label: "Three Analyzers",
  sections: [
    section({
      name: "threeAnalyzersIntro",
      body: (
        <Prose>
          <p>Consider the (thermal, random) oven and 3 analyzers below.</p>

          <Image
            src={threeAnalyzersImg}
            alt="Three chained Stern-Gerlach analyzers."
          />

          <p>
            Many experimental runs are made with the source producing{" "}
            <strong>200 particles</strong> for each run. The third analyzer is a
            Z-direction spin analyzer, and the first two are X, Y, or Z
            analyzers (they could both be the same kind).
          </p>
        </Prose>
      ),
      continue: { label: "Got it" },
    }),

    section({
      name: "averageMinsMaxes",
      body: (m) => (
        <>
          <Prose>
            <strong>On average</strong> (after many repeated trials), what is
            the maximum and minimum number of particles that can be detected in
            Detector A? Detector B?
          </Prose>

          <Table>
            <thead>
              <tr>
                <td></td>
                <td>Detector A</td>
                <td>Detector B</td>
              </tr>
            </thead>

            <tbody className={styles.expandInputsInTable}>
              <tr>
                <th>Maximum</th>
                <td>
                  <Integer model={m.averageMaxA} />
                </td>
                <td>
                  <Integer model={m.averageMaxB} />
                </td>
              </tr>
              <tr>
                <th>Minimum</th>
                <td>
                  <Integer model={m.averageMinA} />
                </td>
                <td>
                  <Integer model={m.averageMinB} />
                </td>
              </tr>
            </tbody>
          </Table>
        </>
      ),
    }),

    section({
      name: "setupForMaxA",
      body: (m) => (
        <>
          <Prose>
            Provide an example of a combination of the first two analyzers that
            would produce, on average, a <strong>maximum for Detector A</strong>
            .
          </Prose>

          <LabelsLeft>
            <Dropdown
              model={m.maxAi}
              label={<b className={styles.green}>Analyzer i:</b>}
              choices={analyzerChoices}
            />
            <Dropdown
              model={m.maxAii}
              label={<b className={styles.blue}>Analyzer ii:</b>}
              choices={analyzerChoices}
            />
          </LabelsLeft>

          <TextBox
            model={m.maxAExplain}
            label={<Prose>Explain why this combination works:</Prose>}
          />
        </>
      ),
    }),

    section({
      name: "overMaxA",
      body: (m) => (
        <>
          <Toggle
            model={m.overMaxA}
            label={
              <Prose>
                Is it possible that on some given run (<em>not</em> on average),
                Detector A might measure a value <em>greater</em> than the
                maximum you claimed above?
              </Prose>
            }
            choices={[
              ["yes", "Yes"],
              ["no", "No"],
            ]}
          />

          <TextBox model={m.overMaxAExplain} label={<Prose>Explain:</Prose>} />
        </>
      ),
    }),

    section({
      name: "setupForOtherMinsMaxes",
      body: (m) => (
        <>
          <Prose>
            <p>Let’s practice some more.</p>

            <p>
              Provide an example of a combination of the first two analyzers
              that would produce, on average, a maximum or a minimum for
              Detector A or Detector B.
            </p>
          </Prose>

          <Table>
            <thead>
              <tr>
                <td></td>
                <td>Minimum for Detector A</td>
                <td>Maximum for Detector B</td>
                <td>Minimum for Detector B</td>
              </tr>
            </thead>

            <tbody>
              <tr>
                <th className={styles.green}>Analyzer&nbsp;i</th>
                <td>
                  <Dropdown model={m.minAi} choices={analyzerChoices} />
                </td>
                <td>
                  <Dropdown model={m.maxBi} choices={analyzerChoices} />
                </td>
                <td>
                  <Dropdown model={m.minBi} choices={analyzerChoices} />
                </td>
              </tr>

              <tr>
                <th className={styles.blue}>Analyzer&nbsp;ii</th>
                <td>
                  <Dropdown model={m.minAii} choices={analyzerChoices} />
                </td>
                <td>
                  <Dropdown model={m.maxBii} choices={analyzerChoices} />
                </td>
                <td>
                  <Dropdown model={m.minBii} choices={analyzerChoices} />
                </td>
              </tr>
            </tbody>
          </Table>

          <Reminder>
            <Prose>
              <Image
                src={threeAnalyzersImg}
                alt="Three chained Stern-Gerlach analyzers."
              />
            </Prose>
          </Reminder>
        </>
      ),
    }),

    section({
      name: "moreThanOneCombo",
      body: (m) => (
        <>
          <Toggle
            model={m.moreThanOneCombo}
            label={
              <Prose>
                Is there more than one combination that can produce these
                results?
              </Prose>
            }
            choices={[
              ["yes", "Yes"],
              ["no", "No"],
            ]}
          />

          <TextBox
            model={m.moreThanOneComboExplain}
            label={<Prose>Explain:</Prose>}
          />
        </>
      ),
    }),

    section({
      name: "psi2IfDetectorB50",
      body: (m) => (
        <>
          <ChooseAll
            model={m.psi2IfDetectorB50}
            label={
              <Prose>
                <p>
                  The particles leaving the middle analyzer are in state{" "}
                  <M t="\ket{\psi_2}" />. If Detector B detects 50 particles on
                  average, what are the possible states <M t="\ket{\psi_2}" />?
                </p>

                <p>Check ALL that apply.</p>
              </Prose>
            }
            choices={[
              ["+x", <M t="\ket{+}_x" />],
              ["-x", <M t="\ket{-}_x" />],
              ["+y", <M t="\ket{+}_y" />],
              ["-y", <M t="\ket{-}_y" />],
              ["+z", <M t="\ket{+}" />],
              ["-z", <M t="\ket{-}" />],
            ]}
          />

          <Reminder>
            <Prose>
              <p>Here’s the experimental setup again:</p>

              <Image
                src={threeAnalyzersImg}
                alt="Three chained Stern-Gerlach analyzers."
              />

              <p>
                Many experimental runs are made with the source producing{" "}
                <strong>200 particles</strong> for each run. The third analyzer
                is a Z-direction spin analyzer, and the first two are X, Y, or Z
                analyzers (they could both be the same kind).
              </p>
            </Prose>
          </Reminder>
        </>
      ),
    }),

    section({
      name: "setupsIfDetectorB50",
      body: (m) => (
        <>
          <ChooseAll
            model={m.setupsIfDetectorB50}
            label={
              <Prose>
                <p>
                  What combination(s) of the first two analyzers could produce
                  this result (that Detector B detects 50 particles on average)?
                </p>

                <p>Check ALL that apply.</p>
              </Prose>
            }
            choices={analyzerComboChoices}
          />

          <Reminder>
            <Prose>
              <Image
                src={threeAnalyzersImg}
                alt="Three chained Stern-Gerlach analyzers."
              />
            </Prose>
          </Reminder>
        </>
      ),
    }),

    section({
      name: "setupsWhereABSame",
      body: (m) => (
        <>
          <ChooseAll
            model={m.setupsWhereABSame}
            label={
              <Prose>
                <p>
                  What combination(s) of the first two analyzers will cause
                  Detectors A and B to record <strong>the same number</strong>{" "}
                  of particles on average.
                </p>

                <p>Check ALL that apply.</p>
              </Prose>
            }
            choices={analyzerComboChoices}
          />

          <TextBox
            model={m.setupsWhereABSameExplain}
            label={
              <Prose>Explain why these combinations produce this result:</Prose>
            }
          />

          <Reminder>
            <Prose>
              <Image
                src={threeAnalyzersImg}
                alt="Three chained Stern-Gerlach analyzers."
              />
            </Prose>
          </Reminder>
        </>
      ),
    }),
  ],
}));

const analyzerChoices = [
  ["X", "X"],
  ["Y", "Y"],
  ["Z", "Z"],
] as const;

//prettier-ignore
const analyzerComboChoices = [
  ["XX", <><b className={styles.green}>X</b> then <b className={styles.blue}>X</b></>],
  ["XY", <><b className={styles.green}>X</b> then <b className={styles.blue}>Y</b></>],
  ["XZ", <><b className={styles.green}>X</b> then <b className={styles.blue}>Z</b></>],
  ["YX", <><b className={styles.green}>Y</b> then <b className={styles.blue}>X</b></>],
  ["YY", <><b className={styles.green}>Y</b> then <b className={styles.blue}>Y</b></>],
  ["YZ", <><b className={styles.green}>Y</b> then <b className={styles.blue}>Z</b></>],
  ["ZX", <><b className={styles.green}>Z</b> then <b className={styles.blue}>X</b></>],
  ["ZY", <><b className={styles.green}>Z</b> then <b className={styles.blue}>Y</b></>],
  ["ZZ", <><b className={styles.green}>Z</b> then <b className={styles.blue}>Z</b></>],
] as const;
