import {
  Decimal,
  Dropdown,
  Guidance,
  LabelsLeft,
  M,
  Prose,
  TextBox,
  TextLine,
  Toggle,
  VariableLengthColumn,
} from "@/components";
import { deepEqual, range } from "@/helpers/client";
import { Axes, Bar, DragHandle, Grid, Indicator, Plot, Tick } from "@/plots";
import { page } from "@/tutorial";
import { Fragment } from "react";
import setup, { ResponseModels, Responses } from "./setup";
import styles from "./styles.module.scss";

export default page(setup, ({ section, hint }) => ({
  name: "aSpin4Particle",
  label: "A Spin 4 Particle",
  answers: "checked-some",
  sections: [
    section({
      name: "aSpin4ParticleIntro",
      body: (
        <Prose>
          <p>Consider a spin-4 particle.</p>

          <p>
            The eigenstates of <M t="S_z" /> are written as{" "}
            <M t="\ket{4}\!,\ \ket{3}\!,\ \dots,\ \ket{-3}\!,\ \ket{-4}" />
          </p>
        </Prose>
      ),
      continue: { label: "OK, got it" },
    }),

    section({
      name: "spin4Colum",
      body: (m) => (
        <>
          <Prose>
            Suppose the spin-4 particle is in the state <M t="\ket{\psi_D}" />,
            which satisfies the following relationships:
            <M
              display
              t="\braket{4|\psi_D} = 0,\ \braket{3|\psi_D} = 7,\ \braket{n|\psi_D} = (16 - n^2)"
            />
            Write <M t="\ket{\psi_D}" /> as a column vector with numbers. (Don’t
            worry about normalization yet.)
          </Prose>

          <VariableLengthColumn
            model={m.spin4Column}
            component={(model) => <Decimal model={model} />}
            labelTex="\ket{\psi_D}"
          />
        </>
      ),
    }),

    section({
      name: "spin4Histogram",
      body: (m, { responses }) => (
        <>
          <Prose>
            <p>
              Create a diagram for the probability amplitude of{" "}
              <M t="\ket{\psi_D}" />. You can click and drag on the black dots
              to move the bars up and down.
            </p>

            <p>
              Notice that we’ve labeled the horizontal axis <M t="n" />.
            </p>
          </Prose>

          <Histogram
            model={m.spin4BarHeights}
            value={responses?.spin4BarHeights}
            phase="editing"
          />

          <div className={styles.histogramLabels}>
            {range(9).map((i) => (
              <div className={styles.histogramLabel} key={i}>
                {responses?.spin4BarHeights?.[i]}
              </div>
            ))}
          </div>
        </>
      ),
      hints: [
        hint({
          name: "spin4HistogramTechDifficulties",
          label: "Technical difficulties?",
          body: (
            <Prose>
              <p>
                Are you having technical difficulties dragging the bars up and
                down in the graph? Sorry about that! You can now move on without
                finishing the graph. Please make note of this issue on the
                feedback page at the end of the tutorial.
              </p>

              <p>
                If you’re not having tech difficulties, please finish the graph
                before moving on though!
              </p>
            </Prose>
          ),
        }),
      ],
      continue: {
        allowed: ({ hints }, allowed) => {
          if (hints?.spin4HistogramTechDifficulties?.status === "revealed") {
            return true;
          }
          return allowed;
        },
      },
    }),

    section({
      name: "spin4ComponentsFeedback",
      enumerate: false,
      body: (_, { responses }) => {
        const answer = range(-4, 5).map((n) => 16 - n ** 2);
        const columnCorrect = deepEqual(answer, responses?.spin4Column);
        const histogramCorrect = deepEqual(answer, responses?.spin4BarHeights);

        if (columnCorrect && histogramCorrect) {
          return (
            <Guidance.Agree>
              Nice work! Now let’s focus in on notation.
            </Guidance.Agree>
          );
        } else if (!columnCorrect && histogramCorrect) {
          return (
            <Guidance.Disagree>
              Heads up. There’s at least one mistake in you column vector, but
              your histogram looks good. (This message will change if you adjust
              your answers above.)
            </Guidance.Disagree>
          );
        } else if (columnCorrect && !histogramCorrect) {
          return (
            <Guidance.Disagree>
              Heads up. There’s at least one mistake in you histogram, but your
              column vector looks good. (This message will change if you adjust
              your answers above.)
            </Guidance.Disagree>
          );
        } else {
          return (
            <Guidance.Disagree>
              Heads up. There’s at least one mistake in both your histogram and
              your column vector. (This message will change if you adjust your
              answers above.)
            </Guidance.Disagree>
          );
        }
      },
    }),

    section({
      name: "diracLabels",
      body: (m, { responses }) => (
        <>
          <Prose>
            Label these three points using Dirac notation (meaning, use clearly
            labeled bras and kets). You can type bras and kets using the{" "}
            <strong>&lt;</strong>, <strong>&gt;</strong>, and <strong>|</strong>{" "}
            keys, and just type the word “psi”.
          </Prose>

          <div className={styles.diracLabels}>
            <TextLine
              className={styles.diracLabelInput}
              model={m.minus3Dirac}
              placeholder=""
            />

            <TextLine
              className={styles.diracLabelInput}
              model={m.minus1Dirac}
              placeholder=""
            />

            <TextLine
              className={styles.diracLabelInput}
              model={m.plus4Dirac}
              placeholder=""
            />
          </div>

          <Histogram
            model={m.spin4BarHeights /* ignore-repeated-model */}
            value={responses?.spin4BarHeights}
            phase={"labeling"}
          />
        </>
      ),
    }),

    section({
      name: "diracLabelSelects",
      body: (m, { responses }) => {
        const cs = [
          ["<-4|psi>", <M t="\braket{-4|\psi_D}" />],
          ["<-3|psi>", <M t="\braket{-3|\psi_D}" />],
          ["<-2|psi>", <M t="\braket{-2|\psi_D}" />],
          ["<-1|psi>", <M t="\braket{-1|\psi_D}" />],
          ["<0|psi>", <M t="\braket{0|\psi_D}" />],
          ["<1|psi>", <M t="\braket{1|\psi_D}" />],
          ["<2|psi>", <M t="\braket{2|\psi_D}" />],
          ["<3|psi>", <M t="\braket{3|\psi_D}" />],
          ["<4|psi>", <M t="\braket{4|\psi_D}" />],
        ] as const;

        return (
          <>
            <Prose>
              Select labels for the same three points; choose the labels that
              most closely match the dirac notation expressions you typed in
              above.
            </Prose>
            <div className={styles.diracLabels}>
              <Dropdown
                className={styles.diracLabelSelect}
                model={m.minus3DiracSelect}
                choices={cs}
                placeholder=""
              />

              <Dropdown
                className={styles.diracLabelSelect}
                model={m.minus1DiracSelect}
                choices={cs}
                placeholder=""
              />

              <Dropdown
                className={styles.diracLabelSelect}
                model={m.plus4DiracSelect}
                choices={cs}
                placeholder=""
              />
            </div>

            <Histogram
              model={m.spin4BarHeights /* ignore-repeated-model */}
              value={responses?.spin4BarHeights}
              phase={"labeling"}
            />
          </>
        );
      },
    }),

    section({
      name: "diracLabelsFeedback",
      enumerate: false,
      body: (_, { responses }) => {
        const allCorrect =
          responses?.minus3DiracSelect?.selected === "<-3|psi>" &&
          responses?.minus1DiracSelect?.selected === "<-1|psi>" &&
          responses?.plus4DiracSelect?.selected === "<4|psi>";

        if (allCorrect) {
          return <Guidance.Agree>Looks good to us!</Guidance.Agree>;
        } else {
          return (
            <Guidance.Disagree>
              Heads up. There’s a mistake in at least one of your choices for
              Dirac Notation. (This message will update if you adjust your
              answers above.)
            </Guidance.Disagree>
          );
        }
      },
    }),

    section({
      name: "spin4Normalization",
      body: (m) => (
        <>
          <TextBox
            model={m.spin4Normalization}
            label={
              <Prose>
                <p>
                  Do you see that <M t="\ket{\psi}_D" /> is NOT normalized?
                </p>
                <p>
                  Without going through all the details, how would you go about
                  normalizing it?
                </p>
              </Prose>
            }
          />
        </>
      ),
    }),

    section({
      name: "spin4Prob",
      body: (m) => (
        <>
          <Prose>Which option is MORE likely?</Prose>

          <LabelsLeft>
            <Toggle
              model={m.spin4ProbAsymmetric}
              choices={[
                ["0", <M t="0" />],
                ["2hbar", <M t="+2 \hbar" />],
                ["equal", "Equally likely"],
              ]}
              label={
                <>
                  Measuring <M t="S_z" /> to be…
                </>
              }
            />

            <Toggle
              model={m.spin4ProbSymmetric}
              choices={[
                ["-2hbar", <M t="-2 \hbar" />],
                ["2hbar", <M t="+2 \hbar" />],
                ["equal", "Equally likely"],
              ]}
              label={
                <>
                  Measuring <M t="S_z" /> to be…
                </>
              }
            />
            <Toggle
              model={m.spin4ProbPositiveNegative}
              choices={[
                ["positive", "Positive"],
                ["negative", "Negative"],
                ["equal", "Equally likely"],
              ]}
              label={
                <>
                  Measuring <M t="S_z" /> to be…
                </>
              }
            />
          </LabelsLeft>
        </>
      ),
    }),
  ],
}));

const Histogram = ({
  model: tupleModel,
  value,
  phase,
  barCount = 9,
}: {
  model: ResponseModels["spin4BarHeights"];
  value: Responses["spin4BarHeights"];
  phase: "editing" | "labeling";
  /** @deprecated */
  barCount?: 9;
}) => (
  <Plot
    width={560}
    scale={[Math.ceil(560 / (barCount || 9)), 15]}
    height={(16 + 2 + 2) * 15}
    origin={["center", 16 + 2]}
    padding={25}
  >
    <Grid axis="y" />

    {range(barCount).map((i) => {
      const defaultHeight = 4;
      // Only odd number counts have a center
      const isCenter = barCount % 2 === 1 && i === Math.floor(barCount / 2);
      const x = i - (barCount - 1) / 2;
      const model = tupleModel.elements[i];
      const modelValue = value?.[i];
      const height = modelValue !== undefined ? modelValue : defaultHeight;

      return (
        <Fragment key={i}>
          {phase === "editing" && <Indicator x={x} />}

          {phase === "labeling" && (i === 1 || i === 3 || i === 8) && (
            <Indicator x={x} from={height} to="top" />
          )}

          <Tick x={x} label={isCenter ? undefined : x} />

          <Bar x={x} height={height} width={0.6} />

          <DragHandle
            direction="y"
            snap={1}
            xDefault={x}
            yDefault={defaultHeight}
            yModel={model}
            disabled={phase !== "editing"}
          />
        </Fragment>
      );
    })}

    <Tick y={16} label={16} labelPosition="left" />

    <Axes xLabel="n" yLabel="\text{Probability Amplitude}" />
  </Plot>
);
