import { Info, Prose, Reminder } from "@/design";
import { Column, Columns } from "@/design/layout";
import { Decimal, TextArea, Toggle } from "@/inputs";
import M, { fieldToMatrix, Matrix } from "@/math";
import { Axes, Plot, Tick, Vector } from "@/plots";
import { page } from "@/tutorial";
import { PencilIcon } from "@primer/octicons-react";
import React from "react";
import setup from "./setup";
import { u, v } from "./shared";

export default page(setup, ({ section, hint }) => ({
  name: "operatorsAsMatrices",
  label: "Operators as Matrices",
  sections: [
    section({
      name: "operatorsAsMatricesIntro",
      body: (
        <Prose>
          Consider the operator <M t="\hat{P}" /> defined by the matrix
          representation:
          <M
            display
            t="\hat{P} \doteq \begin{pmatrix} -1 & 0 \\ 0 & 1 \end{pmatrix}"
          />
        </Prose>
      ),
      continue: { label: "Looks good" },
    }),

    section({
      name: "pTimesU",
      body: (m, { responses }) => (
        <>
          <Reminder>
            <M
              display
              t={`\\ket{u} = ${u[0]!.toFixed(2)}\\ket{x} + ${u[1]!.toFixed(
                2
              )}\\ket{y}`}
            />
          </Reminder>

          <Columns>
            <Column>
              <Prose noMargin>
                Represent <M t="\hat{P}\ket{u}" /> as a column vector, and plot
                the vector on the graph. You can do both by expressing each
                element in the column as a decimal number.
              </Prose>

              <Matrix
                className="margin-top"
                labelTex="\hat{P}\ket{u}"
                column={fieldToMatrix(
                  m.pTimesU,
                  <Decimal model={m.pTimesU.elements[0]} />
                )}
              />
            </Column>

            <Column>
              <PlotVectors
                original={u}
                operated={responses?.pTimesU}
                originalLabel="u"
                operator="P"
              />

              <Prose>
                We’ve added <M t="\color{green} \ket{u}" /> to the graph for
                you.
              </Prose>
            </Column>
          </Columns>

          <Info>
            <Prose>
              <PencilIcon /> &nbsp; Do these calculations on scrap paper!
            </Prose>
          </Info>
        </>
      ),
    }),

    section({
      name: "pTimesV",
      body: (m, { responses }) => (
        <>
          <Reminder>
            <M
              display
              t={`\\ket{v} = ${v[0]!.toFixed(2)}\\ket{x} ${v[1]!.toFixed(
                2
              )}\\ket{y}`}
            />
          </Reminder>

          <Columns>
            <Column>
              <Prose noMargin>
                Represent <M t="\hat{P}\ket{v}" /> as a column vector, and plot
                the vector on the graph.
              </Prose>

              <Matrix
                className="margin-top"
                labelTex="\hat{P}\ket{v}"
                column={fieldToMatrix(
                  m.pTimesV,
                  <Decimal model={m.pTimesV.elements[0]} />
                )}
              />
            </Column>

            <Column>
              <PlotVectors
                original={v}
                operated={responses?.pTimesV}
                originalLabel="v"
                operator="P"
              />

              <Prose>
                We’ve added <M t="\color{green} \ket{v}" /> to the graph for
                you.
              </Prose>
            </Column>
          </Columns>
        </>
      ),
    }),

    section({
      name: "generalRuleP",
      body: (m) => (
        <TextArea
          model={m.generalRuleP}
          label={
            <Prose>
              <p>
                Determine a general rule for the action of operator{" "}
                <M t="\hat{P}" />. Can you come up with a more descriptive name
                for this operator, something that tells us what it “does” to a
                vector?
              </p>

              <p>
                <em>
                  Hint: consider the graphical result of the operator’s action
                  on each vector.
                </em>
              </p>
            </Prose>
          }
        />
      ),
    }),

    section({
      name: "operatorQIntro",
      body: (
        <Prose>
          Now consider the operator <M t="\hat{Q}" /> defined by the matrix
          representation:
          <M
            display
            t="\hat{Q} \doteq \begin{pmatrix} 0 & 1 \\ -1 & 0 \end{pmatrix}"
          />
        </Prose>
      ),
      continue: { label: "I’m considering…" },
    }),

    section({
      name: "qTimesU",
      body: (m, { responses }) => (
        <>
          <Reminder>
            <M
              display
              t={`\\ket{u} = ${u[0]!.toFixed(2)}\\ket{x} + ${u[1]!.toFixed(
                2
              )}\\ket{y}`}
            />
          </Reminder>

          <Columns>
            <Column>
              <Prose noMargin>
                Represent <M t="\hat{Q}\ket{u}" /> as a column vector, and plot
                the vector on the graph.
              </Prose>

              <Matrix
                className="margin-top"
                labelTex="\hat{Q}\ket{u}"
                column={fieldToMatrix(
                  m.qTimesU,
                  <Decimal model={m.qTimesU.elements[0]} />
                )}
              />
            </Column>

            <Column>
              <PlotVectors
                original={u}
                operated={responses?.qTimesU}
                originalLabel="u"
                operator="Q"
              />

              <Prose>
                We’ve added <M t="\color{green} \ket{u}" /> to the graph for
                you.
              </Prose>
            </Column>
          </Columns>

          <Info>
            <Prose>
              <PencilIcon /> &nbsp; Again, do these calculations on scrap paper!
            </Prose>
          </Info>
        </>
      ),
    }),

    section({
      name: "qTimesV",
      body: (m, { responses }) => (
        <>
          <Reminder>
            <M
              display
              t={`\\ket{v} = ${v[0]!.toFixed(2)}\\ket{x} ${v[1]!.toFixed(
                2
              )}\\ket{y}`}
            />
          </Reminder>

          <Columns>
            <Column>
              <Prose noMargin>
                Represent <M t="\hat{Q}\ket{v}" /> as a column vector, and plot
                the vector on the graph.
              </Prose>

              <Matrix
                className="margin-top"
                labelTex="\hat{Q}\ket{v}"
                column={fieldToMatrix(
                  m.qTimesV,
                  <Decimal model={m.qTimesV.elements[0]} />
                )}
              />
            </Column>

            <Column>
              <PlotVectors
                original={v}
                operated={responses?.qTimesV}
                originalLabel="v"
                operator="Q"
              />

              <Prose>
                We’ve added <M t="\color{green} \ket{v}" /> to the graph for
                you.
              </Prose>
            </Column>
          </Columns>
        </>
      ),
    }),

    section({
      name: "generalRuleQ",
      body: (m) => (
        <TextArea
          model={m.generalRuleQ}
          label={
            <Prose>
              <p>
                Like before, determine a general rule for the action of operator{" "}
                <M t="\hat{Q}" />. Can you come up with a more descriptive name
                for this operator, something that tells us what it “does” to a
                vector?
              </p>

              <p>
                <em>
                  Hint: again, consider the graphical result of the operator’s
                  action on each vector.
                </em>
              </p>
            </Prose>
          }
        />
      ),
    }),

    section({
      name: "doPQCommute",
      body: (m) => (
        <>
          <Toggle
            model={m.doPQCommute}
            choices={[
              ["do not commute", "Yes, the order matters"],
              ["do commute", "No, the order doesn’t matter"],
            ]}
            label={
              <Prose>
                Suppose you were to act both operators <M t="\hat{P}" /> and{" "}
                <M t="\hat{Q}" /> on one of the vectors we started with. Would
                the result depend on the order in which you chose to act the two
                operators?
              </Prose>
            }
          />

          <TextArea
            model={m.doPQCommuteExplain}
            label={
              <Prose>
                Explain using both the mathematical results and the graphical
                interpretation of each operator.
              </Prose>
            }
          />
        </>
      ),
    }),
  ],
}));

function PlotVectors({
  original,
  operated,
  originalLabel,
  operator,
}: {
  original: readonly [number, number];
  operated: readonly [number | undefined, number | undefined] | undefined;
  originalLabel: string;
  operator: string;
}) {
  const [origX, origY] = original;
  const [x, y] = operated || [];

  return (
    <Plot width={266} height={266} scale={90}>
      <Axes xLabel="x" yLabel="y" />

      {/* Original: */}
      <Vector
        x={origX}
        y={origY}
        label={`\\ket{${originalLabel}}`}
        color="green"
      />

      {/* Operated: */}
      {x !== undefined && (
        <Tick
          x={x}
          label={x}
          color="blue"
          labelPosition={x < 0 && y && y < 0 ? "above" : "below"}
        />
      )}

      {y !== undefined && <Tick y={y} label={y} color="blue" />}

      {(x !== undefined || y !== undefined) && (
        <Vector
          x={x || 0}
          y={y || 0}
          label={`\\hat{${operator}}\\ket{${originalLabel}}`}
          color="blue"
        />
      )}
    </Plot>
  );
}
