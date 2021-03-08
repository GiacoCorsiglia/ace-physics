import { Help, Info, Prose } from "@/design";
import { Column, Columns } from "@/design/layout";
import { approxEquals } from "@/helpers/frontend";
import { Decimal, Select, TextArea, Toggle } from "@/inputs";
import M, { Matrix } from "@/math";
import { modelToColumn } from "@/math/Matrix";
import { Axes, Plot, Tick, Vector } from "@/plots";
import { page } from "@/tutorial";
import React from "react";
import setup, { Responses } from "./setup";

export default page(setup, ({ section, sequence, oneOf, hint }) => ({
  name: "definingBasis",
  label: "Defining Basis",
  answers: "checked-some",
  sections: [
    section({
      name: "definingBasisIntro",
      body: (
        <Prose>
          Let’s work in 2-D “regular space” where Cartesian unit vectors{" "}
          <M t="\vu{i}" /> and <M t="\vu{j}" /> are written as <M t="\ket{i}" />{" "}
          and <M t="\ket{j}" />. We can write them as column vectors as follows:
          <M
            display
            t="
              \ket{i} \doteq \begin{pmatrix} 1 \\ 0 \end{pmatrix}
              \text{ and }
              \ket{j} \doteq \begin{pmatrix} 0 \\ 1 \end{pmatrix}
              "
          />
        </Prose>
      ),
    }),

    section({
      name: "iAndJFormBasis",
      body: (m) => (
        <>
          <Toggle
            model={m.iAndJFormBasis}
            choices={[
              [
                "yes",
                <>
                  Yes, <M t="\ket{i}" /> and <M t="\ket{j}" /> form a basis.
                </>,
              ],
              ["no", <>No, they do not.</>],
            ]}
            label={
              <Prose>
                Can we use <M t="\ket{i}" /> and <M t="\ket{j}" /> as a basis?
              </Prose>
            }
          />

          <TextArea
            model={m.iAndJFormBasisExplain}
            label={
              <Prose>
                What do you need to form a basis? Explain whether or not{" "}
                <M t="\ket{i}" /> and <M t="\ket{j}" /> meet this requirement.
              </Prose>
            }
          />
        </>
      ),
    }),

    sequence({
      when: (r) => r.iAndJFormBasis?.selected !== "yes",
      sections: [
        section({
          name: "iAndJSpan",

          body: (m) => (
            <Toggle
              model={m.iAndJSpan}
              choices={[
                ["yes", <>Yes, you can.</>],
                ["no", <>No, you cannot.</>],
              ]}
              label={
                <Prose>
                  Can you write any 2-D vector in the form{" "}
                  <M t="a\ket{i} + b\ket{j}" />. In other words, can any 2-D
                  vector be expressed as a combination of the <M t="\vu{i}" />{" "}
                  and <M t="\vu{j}" /> unit vectors?
                </Prose>
              }
            />
          ),
        }),

        section({
          name: "iAndJFeedback",
          body: (_, { responses }) => (
            <>
              {responses?.iAndJSpan?.selected === "yes" && (
                <Help>
                  <Prose>
                    That’s right. This means that we <strong>can</strong> use{" "}
                    <M t="\ket{i}" /> and <M t="\ket{j}" /> as a basis.
                  </Prose>
                </Help>
              )}

              {responses?.iAndJSpan?.selected !== "yes" && (
                <Info>
                  <Prose>
                    Any vector in 2-D “regular” space can be written as a
                    (linear) combination of the unit vectors <M t="\ket{i}" />{" "}
                    and
                    <M t="\ket{j}" />. This means that we <strong>can</strong>{" "}
                    use them as a basis.
                  </Prose>
                </Info>
              )}
            </>
          ),
        }),
      ],
    }),

    section({
      name: "uColumn",
      body: (m, { responses }) => (
        <>
          <Prose>
            Consider the vector <M t="\ket{u}" /> written in the{" "}
            <M t="\ket{i}" /> and
            <M t="\ket{j}" /> basis:
            <M
              display
              t="\ket{u} = \frac{1}{\sqrt{5}} \ket{i} + \frac{2}{\sqrt{5}} \ket{j}"
            />
            It may help to know that
            <M t="\frac{1}{\sqrt{5}} \approx 0.447" /> and
            <M t="\frac{2}{\sqrt{5}} \approx 0.894" />.
          </Prose>

          <Columns className="margin-top">
            <Column>
              <Prose noMargin>
                Represent <M t="\ket{u}" /> as a column vector, and plot the
                vector on the graph. You can do both by expressing each element
                in the column as a decimal number.
              </Prose>

              <Matrix
                className="margin-top"
                labelTex="\ket{u}"
                column={modelToColumn(m.uColumn, (c, i) => (
                  <Decimal
                    model={c}
                    placeholder={i === 0 ? "Horizontal" : "Vertical"}
                  />
                ))}
              />
            </Column>

            <Column>
              <PlotU
                vector={responses?.uColumn}
                vectorDirac={responses?.uColumnDirac}
                labels="numbers"
              />
            </Column>
          </Columns>

          {approxEquals(responses?.uColumn, [0.894, 0.447]) && (
            <Info>
              <Prose>
                Be careful not to mix up the horizontal and vertical components
                in the graph!
              </Prose>
            </Info>
          )}
        </>
      ),
      hints: [
        hint({
          name: "uColumn",
          body: (
            <Prose>
              Is <M t="\frac{1}{\sqrt{5}}" /> the <M t="\ket{i}" /> (horizontal)
              component or the <M t="\ket{j}" /> (vertical) component?
            </Prose>
          ),
        }),
      ],
    }),

    section({
      name: "uColumnDirac",
      body: (m, { responses }) => (
        <Columns>
          <Column>
            <Prose noMargin>
              Now express each element in the column vector symbolically as an
              appropriate expression in Dirac notation. Make sure you agree with
              the use of these expressions as labels in the graph as well.
            </Prose>

            <Matrix
              className="margin-top"
              labelTex="\ket{u}"
              column={modelToColumn(m.uColumnDirac, (c) => (
                <Select model={c} choices={uColumnDiracChoices} />
              ))}
            />
          </Column>

          <Column>
            <PlotU
              vector={responses?.uColumn}
              vectorDirac={responses?.uColumnDirac}
              labels="dirac"
            />
          </Column>
        </Columns>
      ),
      hints: [
        hint({
          name: "uColumnDirac",
          body: (
            <Prose>
              If we were using normal vector notation (i.e.,
              <M t="\ket{u} = \vec{u}" />
              ), could you think of a dot product for each component? How do you
              express those in Dirac notation?
            </Prose>
          ),
        }),
      ],
      continue: { label: "Let’s check in" },
    }),

    oneOf({
      which: (r) => {
        const [i_, j_] = r.uColumnDirac || [];
        const i = i_?.selected;
        const j = j_?.selected;

        if (!i || !j) {
          return null;
        }

        const iCorrect = i === "<i|u>";
        const jCorrect = j === "<j|u>";

        const iConj = i === "<u|i>";
        const jConj = j === "<u|j>";

        const iReversed = i === "<j|u>";
        const jReversed = j === "<i|u>";

        const iReversedConj = i === "<u|j>";
        const jReversedConj = j === "<u|i>";

        const iKet = i === "|u>" || i === "|i>" || i === "|j>";
        const jKet = j === "|u>" || j === "|i>" || j === "|j>";

        // There are 8 * 8 = 64 total options (including "other").

        if (iKet || jKet) {
          // (40) Really wrong.
          return "uColumnDiracKet";
        } else if (iCorrect && jCorrect) {
          // (1) Really right.
          return "uColumnDiracCorrect";
        } else if ((iCorrect || iConj) && (jCorrect || jConj)) {
          // (3) Right up to at least one complex conjugate.
          return "uColumnDiracConjugate";
        } else if (
          (iReversed && jReversed) ||
          (iReversedConj && jReversed) ||
          (iReversed && jReversedConj) ||
          (iReversedConj && jReversedConj)
        ) {
          // (4) Reversed.
          return "uColumnDiracReversed";
        } else if (i === j) {
          // (8) Repeated.
          return "uColumnDiracRepeated";
        } else {
          // (8) Something else.
          return "uColumnDiracGeneralIncorrect";
        }
      },
      sections: {
        uColumnDiracCorrect: section({
          name: "uColumnDiracCorrect",
          body: (
            <Help>
              <Prose>Looks good to us! Nice work.</Prose>
            </Help>
          ),
        }),

        uColumnDiracKet: section({
          name: "uColumnDiracKet",
          body: (
            <Info>
              <Prose>
                <p>
                  You’ve inserted a <strong>ket</strong> (
                  <M prespace={false} t="\ket{u}" />,
                  <M t="\ket{i}" />, or <M t="\ket{j}" />) into your column
                  vector. This is kind of like writing vector
                  <M t="\vec{v} = (5, \vec{w}, 3)" />, which normally doesn't
                  make sense.
                </p>

                <p>
                  The elements of your column vector should be{" "}
                  <strong>numbers</strong>. In Dirac notation,{" "}
                  <strong>inner products</strong> (aka “brakets”) evaluate to
                  numbers.
                </p>

                <p>
                  Similarly, it <em>would</em> be sensible to write{" "}
                  <M t="\vec{v} = (5, \vec{w} \cdot \vec{v}, 3)" />.
                </p>

                <p>Adjust your answers, then check in again.</p>
              </Prose>
            </Info>
          ),
          continue: { label: "Check in again" },
        }),

        uColumnDiracConjugate: section({
          name: "uColumnDiracConjugate",
          body: (
            <Help>
              <Prose>
                <p>You’re really close!</p>

                <p>
                  Just be careful about the order of your brakets. You should
                  have:
                  <M
                    display
                    t="\ket{u} \doteq \begin{pmatrix} \braket{i|u} \\ \braket{j|u} \end{pmatrix}"
                  />
                </p>

                <p>
                  This doesn’t matter in “regular space,” but it does matter in
                  Quantum Mechanics when we work with complex numbers.
                </p>
              </Prose>
            </Help>
          ),
        }),

        uColumnDiracReversed: section({
          name: "uColumnDiracReversed",
          body: (
            <Info>
              <Prose>
                <p>
                  Looks like you may have reversed at least one of your
                  horizontal and vertical components.
                </p>

                <p>Adjust your answers, then check in again.</p>
              </Prose>
            </Info>
          ),
          continue: { label: "Check in again" },
        }),

        uColumnDiracRepeated: section({
          name: "uColumnDiracRepeated",
          body: (
            <Info>
              <Prose>
                <p>
                  Looks like you repeated the same answer for both your
                  horizontal and vertical components.
                </p>

                <p>
                  You should have a different expression for both elements,
                  since you should have different numbers for each element
                  above.
                </p>

                <p>Adjust your answers, then check in again.</p>
              </Prose>
            </Info>
          ),
          continue: { label: "Check in again" },
        }),

        uColumnDiracGeneralIncorrect: section({
          name: "uColumnDiracGeneralIncorrect",
          body: (
            <Info>
              <Prose>
                <p>
                  This software is limited, and we’re not sure how to respond to
                  your input! We do think there’s a good answer amongst the
                  choices we gave you.
                </p>

                <p>
                  Adjust your answers and check in again (or just click “Check
                  in again” to move on).
                </p>
              </Prose>
            </Info>
          ),
          continue: { label: "Check in again" },
        }),
      },
    }),

    section({
      name: "innerProductMeaning",
      body: (m) => (
        <TextArea
          model={m.innerProductMeaning}
          label={
            <Prose>
              Discuss a conceptual meaning for these inner products based on the
              graph.
            </Prose>
          }
        />
      ),
    }),
  ],
}));

const uColumnDiracChoices = [
  ["|i>", <M t="\ket{i}" />],
  ["|j>", <M t="\ket{j}" />],
  ["|u>", <M t="\ket{u}" />],
  ["<i|u>", <M t="\braket{i|u}" />],
  ["<j|u>", <M t="\braket{j|u}" />],
  ["<u|i>", <M t="\braket{u|i}" />],
  ["<u|j>", <M t="\braket{u|j}" />],
] as const;

const valueToDirac: { [k: string]: string } = Object.fromEntries(
  uColumnDiracChoices.map(([value, label]) => [value, label.props.t])
);

function PlotU({
  vector,
  vectorDirac,
  labels,
}: {
  vector: Responses["uColumn"];
  vectorDirac: Responses["uColumnDirac"];
  labels: "numbers" | "dirac";
}) {
  const [x, y] = vector || [];

  const [xD, yD] = (() => {
    if (labels === "dirac" && vectorDirac) {
      const [x, y] = vectorDirac;
      const xD = x ? x.selected : "";
      const yD = y ? y.selected : "";

      return [xD ? valueToDirac[xD] : "", yD ? valueToDirac[yD] : ""];
    }
    return ["", ""];
  })();

  return (
    <Plot width={266} height={266} scale={90}>
      <Axes xLabel="\vb{i}" yLabel="\vb{j}" />

      {x !== undefined && (
        <Tick x={x} label={labels === "dirac" ? xD : x} color="blue" />
      )}

      {y !== undefined && (
        <Tick y={y} label={labels === "dirac" ? yD : y} color="blue" />
      )}

      {(x !== undefined || y !== undefined) && (
        <Vector
          x={x || 0}
          y={y || 0}
          label={labels === "dirac" ? "" : "\\ket{u}"}
          color="blue"
        />
      )}
    </Plot>
  );
}
