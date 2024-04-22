import {
  ChooseAll,
  Column,
  Columns,
  Dropdown,
  Horizontal,
  M,
  Prose,
  Reminder,
  TextBox,
  Vocabulary,
} from "@/components";
import { Axes, Bar, Plot, Tick, WithPlot } from "@/plots";
import { get } from "@/reactivity/immutable";
import { page, repeatedModel } from "@/tutorial";
import setup, { ResponseModels, Responses, State } from "./setup";
import styles from "./styles.module.scss";

// We need this special checker for the PlusMinusModels, because we only set
// _some_ of the `pm.properties` in a given section, so the default continue
// allowed behavior will always consider the root field unset.
const isContinueAllowedChecker =
  (keys: (keyof PlusMinusModel["properties"])[]) =>
  (state: State, _: boolean, models: ResponseModels): boolean =>
    [models.probability, models.probabilityAmplitude].every((pm) => {
      const modelValue = get(state as any, pm.path as any);
      return keys.every((key) => {
        const value = modelValue?.[key];
        return value !== undefined;
      });
    });

export default page(setup, ({ section }) => ({
  name: "probabilityAndProjection",
  label: "Probability & Projection",
  answers: "none",
  sections: [
    section({
      name: "probabilityAndProjectionIntro",
      body: (
        <Prose>
          Consider the state:
          <M
            display
            t="\ket{\psi_A} = \frac{3}{5}\ket{+} - \frac{4}{5}\ket{-} \doteq \frac{1}{5} \begin{pmatrix} 3 \\ -4 \end{pmatrix}"
          />
          The coefficients <M t="\frac{3}{5}" /> and <M t="-\frac{4}{5}" /> are
          examples of what we call{" "}
          <Vocabulary>probability amplitudes</Vocabulary>.
        </Prose>
      ),
      continue: { label: "Got it" },
    }),

    section({
      name: "meaningOfCoefficients",
      body: (m) => (
        <ChooseAll
          model={m.meaningOfCoefficients}
          choices={[
            ["normalized", "They tell you that the state is normalized."],
            [
              "measurement-outcomes",
              <>
                They are the possible outcomes for measurements of spin along
                the <i>z</i>
                -direction.
              </>,
            ],
            [
              "probabilities-direct",
              <>
                They are the probabilities for spin measurements along the{" "}
                <i>z</i>
                -direction.
              </>,
            ],
            [
              "probabilities-squared",
              <>
                They give you the probabilities for spin measurements along the{" "}
                <i>z</i>
                -direction (once you square them).
              </>,
            ],
          ]}
          label={
            <Prose>
              What do the coefficients <M t="\frac{3}{5}" /> and{" "}
              <M t="-\frac{4}{5}" /> tell you?
              <br /> Check ALL that apply.
            </Prose>
          }
        />
      ),
    }),

    section({
      name: "histogramHeights",
      body: (m, { responses }) => (
        <>
          <Prose>Let's create two histograms to represent this state.</Prose>

          <Columns>
            <Column>
              <Prose>
                First, complete the histogram below to show{" "}
                <Vocabulary>probability amplitudes</Vocabulary> for each
                possible outcome, <M t="\pm \hbar/2" />, in the <em>z</em>
                -direction.
              </Prose>

              <Histogram pm={responses?.probabilityAmplitude} />

              <HistogramHeightControl pm={m.probabilityAmplitude} />
            </Column>

            <Column>
              <Prose>
                Now, complete the histogram below to show the corresponding{" "}
                <Vocabulary>probabilities</Vocabulary> for each possible
                outcome, <M t="\pm \hbar/2" />, in the <em>z</em>-direction.
              </Prose>

              <Histogram pm={responses?.probability} />

              <HistogramHeightControl pm={m.probability} />
            </Column>
          </Columns>

          <Reminder>
            <M
              display
              t="\ket{\psi_A} = \frac{3}{5}\ket{+} - \frac{4}{5}\ket{-} \doteq \frac{1}{5} \begin{pmatrix} 3 \\ -4 \end{pmatrix}"
            />
          </Reminder>
        </>
      ),
      continue: {
        allowed: isContinueAllowedChecker(["minusHeight", "plusHeight"]),
      },
    }),

    section({
      name: "histogramLabels",
      body: (m, { responses }) => (
        <>
          <Prose>
            On the same histograms, which are repeated below, label each bar
            with Dirac notation for either probability or probability amplitude.
          </Prose>

          <Columns>
            <Column>
              <Prose>
                <Vocabulary>Probability amplitudes</Vocabulary>
              </Prose>

              <Histogram pm={responses?.probabilityAmplitude} />

              <HistogramLabelControl
                pm={repeatedModel(m.probabilityAmplitude)}
              />
            </Column>

            <Column>
              <Prose>
                <Vocabulary>Probabilities</Vocabulary>
              </Prose>

              <Histogram pm={responses?.probability} />

              <HistogramLabelControl pm={repeatedModel(m.probability)} />
            </Column>
          </Columns>

          <Prose>
            Your labels should correspond with the <em>height</em> of each bar.
          </Prose>
        </>
      ),
      continue: {
        allowed: isContinueAllowedChecker(["minusLabel", "plusLabel"]),
      },
    }),

    section({
      name: "relationshipProbAmp",
      body: (m) => (
        <TextBox
          model={m.relationshipProbAmp}
          label={
            <Prose>
              What is the relationship between the{" "}
              <Vocabulary>probability</Vocabulary> and the{" "}
              <Vocabulary>probability amplitude?</Vocabulary>
            </Prose>
          }
        />
      ),
    }),
  ],
}));

const minusColor = "#e2f9db";
const plusColor = "#ecdbf9";

function asNumber(height: string | undefined) {
  if (!height) {
    return undefined;
  }
  const [num, denom] = height.split("/");
  return parseInt(num) / parseInt(denom);
}

function Histogram({ pm }: { pm: Responses["probability"] }) {
  const minusHeight = asNumber(pm?.minusHeight?.selected);
  const plusHeight = asNumber(pm?.plusHeight?.selected);

  return (
    <Plot>
      <Axes />

      <Tick
        x={-0.75}
        label="-\hbar / 2"
        labelPosition={minusHeight && minusHeight < 0 ? "above" : "below"}
        color="darkgreen"
      />

      <Tick
        x={0.75}
        label="+\hbar / 2"
        labelPosition={plusHeight && plusHeight < 0 ? "above" : "below"}
        color="darkviolet"
      />

      <WithPlot>
        {({ width, height }) => (
          <line
            x1={-width / 4}
            y1={29}
            x2={-width / 4}
            y2={height / 2}
            stroke="#9be585"
            strokeWidth={2}
            strokeDasharray="4"
          />
        )}
      </WithPlot>

      <WithPlot>
        {({ width, height }) => (
          <line
            x1={width / 4}
            y1={29}
            x2={width / 4}
            y2={height / 2}
            stroke="#cc90f9"
            strokeWidth={2}
            strokeDasharray="4"
          />
        )}
      </WithPlot>

      {minusHeight && <Bar x={-0.75} height={minusHeight} fill={minusColor} />}

      {plusHeight && <Bar x={0.75} height={plusHeight} fill={plusColor} />}
    </Plot>
  );
}

type PlusMinusModel = ResponseModels["probability"];

function HistogramHeightControl({ pm }: { pm: PlusMinusModel }) {
  const heightChoices = [
    ["3/5", <M t="3/5" />],
    ["-3/5", <M t="-3/5" />],
    ["4/5", <M t="4/5" />],
    ["-4/5", <M t="-4/5" />],
    ["9/25", <M t="9/25" />],
    ["-9/25", <M t="-9/25" />],
    ["16/25", <M t="16/25" />],
    ["-16/25", <M t="-16/25" />],
  ] as const;

  return (
    <Horizontal>
      <Dropdown
        model={pm.properties.minusHeight}
        choices={heightChoices}
        placeholder="Height…"
        className={styles.minusSelect}
      />

      <Dropdown
        model={pm.properties.plusHeight}
        choices={heightChoices}
        placeholder="Height…"
        className={styles.plusSelect}
      />
    </Horizontal>
  );
}

function HistogramLabelControl({ pm }: { pm: PlusMinusModel }) {
  const labelChoices = [
    ["|->", <M t="\ket{-}" />],
    ["|+>", <M t="\ket{+}" />],
    ["<-|psi_A>", <M t="\braket{-|\psi_A}" />],
    ["<+|psi_A>", <M t="\braket{+|\psi_A}" />],
    ["|<-|psi_A>|^2", <M t="|\braket{-|\psi_A}|^2" />],
    ["|<+|psi_A>|^2", <M t="|\braket{+|\psi_A}|^2" />],
  ] as const;

  return (
    <Horizontal>
      <Dropdown
        model={pm.properties.minusLabel}
        choices={labelChoices}
        placeholder="Label…"
        className={styles.minusSelect}
      />

      <Dropdown
        model={pm.properties.plusLabel}
        choices={labelChoices}
        placeholder="Label…"
        className={styles.plusSelect}
      />
    </Horizontal>
  );
}
