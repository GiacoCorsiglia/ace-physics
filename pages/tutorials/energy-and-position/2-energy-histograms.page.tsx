import { Help, Info, Prose, Reminder } from "@/design";
import { range } from "@/helpers";
import { ChooseOne, TextArea, Toggle } from "@/inputs";
import M from "@/math";
import { Axes, Bar, DragHandle, GridLine, Plot, Tick } from "@/plots";
import { page } from "@/tutorial";
import { approxEquals } from "@/util";
import React, { Fragment } from "react";
import setup from "./setup";

const graph = {
  width: 360,
  height: 320,
  scale: [360 / 6, 320 / 1.8],
  origin: [1, 0.9],
  barWidth: 0.7,
} as const;

export default page(setup, ({ section, hint, oneOf }) => ({
  name: "energyHistograms",
  label: "Energy Histograms",
  answers: "checked-some",
  sections: [
    section({
      name: "energyHistogramsIntro",
      body: (
        <>
          <Reminder>
            <M
              display
              t="
              \ket{\psi_A}
              = \frac{\sqrt{2}}{\sqrt{6}} \ket{E_1}
              + \frac{\sqrt{3}}{\sqrt{6}} \ket{E_2}
              + \frac{1}{\sqrt{6}} \ket{E_4}
              "
            />
          </Reminder>

          <Prose>
            The graph below is a particular visual representation of the the
            state <M t="\ket{\psi_A}" /> from the previous page. It shows
            information about the state <em>in the energy basis</em>.
          </Prose>

          <Plot
            width={graph.width}
            height={graph.height}
            scale={graph.scale}
            origin={graph.origin}
          >
            <Axes xLabel="E" />

            <GridLine y={1 / Math.sqrt(2)} />
            <GridLine y={1 / Math.sqrt(3)} />
            <GridLine y={1 / Math.sqrt(6)} />
            <GridLine y={-1 / Math.sqrt(2)} />
            <GridLine y={-1 / Math.sqrt(3)} />
            <GridLine y={-1 / Math.sqrt(6)} />

            <Tick x={1} label="E_1" />
            <Tick x={2} label="E_2" />
            <Tick x={3} label="E_3" />
            <Tick x={4} label="E_4" />

            <Tick y={1 / Math.sqrt(2)} label="1/\sqrt{2}" />
            <Tick y={1 / Math.sqrt(3)} label="1/\sqrt{3}" />
            <Tick y={1 / Math.sqrt(6)} label="1/\sqrt{6}" />

            <Tick y={-1 / Math.sqrt(2)} />
            <Tick y={-1 / Math.sqrt(3)} />
            <Tick y={-1 / Math.sqrt(6)} />

            <Bar x={1} height={1 / Math.sqrt(3)} width={graph.barWidth} />
            <Bar x={2} height={1 / Math.sqrt(2)} width={graph.barWidth} />
            <Bar x={4} height={1 / Math.sqrt(6)} width={graph.barWidth} />
          </Plot>
        </>
      ),
    }),

    section({
      name: "interpretVerticalAxis",
      body: (m) => (
        <>
          <TextArea
            model={m.interpretVerticalAxis}
            label={
              <Prose>
                Interpret the vertical values for each bar in the graph. What
                does the vertical axis tell you?
              </Prose>
            }
          />
        </>
      ),
    }),

    section({
      name: "normalizationMeaning",
      body: (m) => (
        <>
          <TextArea
            model={m.normalizationMeaning}
            label={
              <Prose>
                Use the graph to check the <em>normalization</em> of{" "}
                <M t="\ket{\psi_A}" />. What does normalization tell you here?
              </Prose>
            }
          />
        </>
      ),
    }),

    section({
      name: "psiBDifference",
      body: (m) => (
        <>
          <TextArea
            model={m.psiBDifference}
            label={
              <Prose>
                Consider a particle in the quantum state <M t="\ket{\psi_B}" />,
                defined as follows:
                <M
                  display
                  t="
              \ket{\psi_B}
              = \frac{\sqrt{2}}{\sqrt{6}} \ket{E_1}
              - \frac{\sqrt{3}}{\sqrt{6}} \ket{E_2}
              + \frac{1}{\sqrt{6}} \ket{E_4}
              "
                />
                What (if anything) is <strong>different</strong> here from the
                state <M t="\ket{\psi_A}" />?
              </Prose>
            }
          />
        </>
      ),
    }),

    section({
      name: "psiBMeasurements",
      body: (m) => (
        <>
          <TextArea
            model={m.psiBMeasurements}
            label={
              <Prose>
                If you make an energy measurement on this new particle (in state{" "}
                <M t="\ket{\psi_B}" />
                ), what results could you get, with what probabilities?
              </Prose>
            }
          />

          <Toggle
            model={m.psiBvsPsiAExpectation}
            label={
              <Prose>
                Is the expectation value of energy for this particle the same,
                or different, from what you got for state <M t="\ket{\psi_A}" />
                ?
              </Prose>
            }
            choices={[
              ["same", "The same"],
              ["different", "Different"],
            ]}
          />
        </>
      ),
    }),

    section({
      name: "psiBvsPsiAExpectationIncorrect",
      when: (r) => r.psiBvsPsiAExpectation?.selected === "different",
      body: (
        <Info>
          <Prose>
            Despite the flipped sign on the coefficient for <M t="\ket{E_2}" />,{" "}
            <M t="\ket{\psi_A}" /> and <M t="\ket{\psi_B}" /> have the same
            expectation value for energy.
          </Prose>
        </Info>
      ),
    }),

    section({
      name: "psiBHistogram",
      body: (m, { responses }) => {
        const tupleModel = m.psiBBarHeights;

        const snapPoints = [
          0.9,
          1 / Math.sqrt(2),
          1 / Math.sqrt(3),
          1 / Math.sqrt(6),
          0.3,
          0.2,
          0.1,
          0,
          -0.1,
          -0.2,
          -0.3,
          -1 / Math.sqrt(6),
          -1 / Math.sqrt(3),
          -1 / Math.sqrt(2),
          -0.9,
        ];

        return (
          <>
            <Prose>
              Make a graph just like the one at the top of the page for this new
              state, <M t="\ket{\psi_B}" />. You can click and drag on the black
              dots to move the bars up and down.
            </Prose>

            <Plot
              width={graph.width}
              height={graph.height}
              scale={graph.scale}
              origin={graph.origin}
            >
              <Axes xLabel="E" />

              <GridLine y={1 / Math.sqrt(2)} />
              <GridLine y={1 / Math.sqrt(3)} />
              <GridLine y={1 / Math.sqrt(6)} />
              <GridLine y={-1 / Math.sqrt(2)} />
              <GridLine y={-1 / Math.sqrt(3)} />
              <GridLine y={-1 / Math.sqrt(6)} />

              <Tick y={1 / Math.sqrt(2)} label="1/\sqrt{2}" />
              <Tick y={1 / Math.sqrt(3)} label="1/\sqrt{3}" />
              <Tick y={1 / Math.sqrt(6)} label="1/\sqrt{6}" />

              <Tick y={-1 / Math.sqrt(2)} />
              <Tick y={-1 / Math.sqrt(3)} />
              <Tick y={-1 / Math.sqrt(6)} />

              {range(4).map((i) => {
                const n = i + 1;
                const model = tupleModel.elements[i];
                const value = responses?.psiBBarHeights?.[i];
                const height = value !== undefined ? value : 0.1;

                return (
                  <Fragment key={i}>
                    <Tick
                      x={n}
                      label={`E_${n}`}
                      labelPosition={height >= 0 ? "below" : "above"}
                    />

                    <Bar
                      x={n}
                      height={height}
                      width={graph.barWidth}
                      opacity={value === undefined ? 0.5 : 1}
                      dashed={value === undefined}
                    />

                    <DragHandle
                      direction="y"
                      snapPoints={snapPoints}
                      xDefault={n}
                      yDefault={0.1}
                      yModel={model}
                    />
                  </Fragment>
                );
              })}
            </Plot>

            <Reminder>
              <M
                display
                t="
              \ket{\psi_B}
              = \frac{\sqrt{2}}{\sqrt{6}} \ket{E_1}
              - \frac{\sqrt{3}}{\sqrt{6}} \ket{E_2}
              + \frac{1}{\sqrt{6}} \ket{E_4}
              "
              />
            </Reminder>
          </>
        );
      },
      hints: [
        hint({
          name: "psiBHistogramTechDifficulties",
          label: "Technical Difficulties?",
          body: (
            <Prose>
              <p>
                Are you having technical difficulties dragging the bars up and
                down in the graph? Sorry about that! You can now move on without
                finishing the graph. Please make note of this issue on the
                feedback page at the end of the tutorial.
              </p>

              <p>
                If you‘re not having tech difficulties, please finish the graph
                before moving on though!
              </p>
            </Prose>
          ),
        }),
      ],
      continue: {
        allowed: ({ hints }, allowed) =>
          allowed ||
          hints?.psiBHistogramTechDifficulties?.status === "revealed",
      },
    }),

    oneOf({
      which: (r) => {
        if (
          r.psiBBarHeights === undefined ||
          r.psiBBarHeights.some((h) => h === undefined)
        ) {
          return null;
        }
        const correct = approxEquals(r.psiBBarHeights, [
          Math.sqrt(2 / 6),
          Math.sqrt(3 / 6),
          0,
          Math.sqrt(1 / 6),
        ]);
        return correct ? "psiBHistogramCorrect" : "psiBHistogramIncorrect";
      },
      sections: {
        psiBHistogramCorrect: section({
          name: "psiBHistogramCorrect",
          body: (
            <Help>
              <Prose>Your histogram looks good to us!</Prose>
            </Help>
          ),
        }),

        psiBHistogramIncorrect: section({
          name: "psiBHistogramIncorrect",
          body: (
            <Info>
              <Prose>
                Heads up, there’s at least one error in your histogram.
              </Prose>
            </Info>
          ),
        }),
      },
    }),

    section({
      name: "psiBDifferentFromPsiA",
      body: (m) => (
        <>
          <ChooseOne
            model={m.psiBDifferentFromPsiA}
            label={
              <Prose>
                With which of the following statements do you agree?
              </Prose>
            }
            choices={[
              [
                "same",
                <>
                  The second particle is in the SAME state as{" "}
                  <M t="\ket{\psi_A}" />
                </>,
              ],
              [
                "different",
                <>
                  The second particle is in a DIFFERENT state from{" "}
                  <M t="\ket{\psi_A}" />
                </>,
              ],
            ]}
            allowOther={false}
          />

          <TextArea
            model={m.psiBDistinguishableFromPsiA}
            label={
              <Prose>
                Is there any way, in principle, to distinguish them?
              </Prose>
            }
          />
        </>
      ),
      hints: [
        hint({
          name: "psiBDifferentFromPsiA",
          body: (
            <Prose>
              It’s OK if you’re unsure about this one! We’ll come back to this
              question later on, so just give your best guess for now.
            </Prose>
          ),
        }),
      ],
    }),
  ],
}));
