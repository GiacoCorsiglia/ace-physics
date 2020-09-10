import React from "react";
import { QuantumBasis } from "src/common/tutorials";
import { Continue, Prose, Section } from "src/components";
import { Decimal, Select, TextArea, Toggle } from "src/components/inputs";
import { Column, Columns, Content } from "src/components/layout";
import M from "src/components/M";
import Matrix, { fieldToMatrix } from "src/components/Matrix";
import { Axes, Plot, Tick, Vector } from "src/components/plots";
import { isSet, useFields } from "src/state";
import { Part } from "src/tutorials/shared";

export default function DefiningBasis() {
  const f = useFields(QuantumBasis);

  return (
    <Part label="Defining a Basis">
      <Content>
        <Section first>
          <Prose>
            Let’s work in 2-D “regular space” where Cartesian unit vectors{" "}
            <M t="\vu{i}" /> and <M t="\vu{j}" /> are written as{" "}
            <M t="\ket{i}" /> and <M t="\ket{j}" />. We can write them as column
            vectors as follows:
            <M
              display
              t="\ket{i} \doteq \mqty(1 \\ 0) \text{ and } \ket{j} \doteq \mqty(0 \\ 1)"
            />
          </Prose>

          <Continue commit={f.definingBasisIntroCommit} />
        </Section>

        <Section commits={[f.definingBasisIntroCommit]}>
          <Toggle
            field={f.iAndJFormBasis}
            label={
              <Prose>
                Can we use <M t="\ket{i}" /> and <M t="\ket{j}" /> as a basis?
              </Prose>
            }
            yes={
              <>
                Yes, <M t="\ket{i}" /> and <M t="\ket{j}" /> form a basis.
              </>
            }
            no={<>No, they do not.</>}
          />

          <TextArea
            field={f.iAndJFormBasisExplain}
            label={
              <Prose>
                What do you need to form a basis? Explain whether or not{" "}
                <M t="\ket{i}" /> and <M t="\ket{j}" /> meet this requirement.
              </Prose>
            }
          />

          <Continue
            commit={f.iAndJFormBasisCommit}
            allowed={isSet(f.iAndJFormBasis) && isSet(f.iAndJFormBasisExplain)}
          />
        </Section>

        <Section commits={[f.iAndJFormBasisCommit]}>
          <Prose>
            Consider the vector
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
              <p>
                Represent <M t="\ket{u}" /> as a column vector, and plot the
                vector on the graph. You can do both by expressing each element
                in the column as a decimal number.
              </p>

              <Matrix
                className="margin-top"
                labelTex="\ket{u}"
                column={[
                  <Decimal
                    field={f.uColumn.elements[0]}
                    placeholder="Horizontal"
                  />,
                  <Decimal
                    field={f.uColumn.elements[1]}
                    placeholder="Vertical"
                  />,
                ]}
              />
            </Column>

            <Column>
              <PlotU labels="numbers" />
            </Column>
          </Columns>

          <Continue commit={f.uColumnCommit} allowed={isSet(f.uColumn)} />
        </Section>

        <Section commits={[f.uColumnCommit]}>
          <Columns>
            <Column>
              <Prose>
                Now express each element in the column vector symbolically as an
                appropriate expression in Dirac notation. Make sure you agree
                with the use of these expressions as labels in the graph as
                well.
              </Prose>

              <Matrix
                className="margin-top"
                labelTex="\ket{u}"
                matrix={fieldToMatrix(
                  f.uColumnDirac,
                  <Select
                    choices={uColumnDiracChoices}
                    field={f.uColumnDirac.elements[0]}
                  />
                )}
              />
            </Column>

            <Column>
              <PlotU labels="dirac" />
            </Column>
          </Columns>

          <Continue
            commit={f.uColumnDiracCommit}
            allowed={isSet(f.uColumnDirac)}
          />
        </Section>

        <Section commits={[f.uColumnDiracCommit]}>
          <TextArea
            field={f.innerProductMeaning}
            label={
              <Prose>
                Discuss a conceptual meaning for these inner products based on
                the graph.
              </Prose>
            }
          />

          <Continue
            commit={f.innerProductMeaningCommit}
            allowed={isSet(f.innerProductMeaning)}
          />
        </Section>
      </Content>
    </Part>
  );
}

const uColumnDiracChoices = [
  { value: "|i>", label: <M t="\ket{i}" /> },
  { value: "|j>", label: <M t="\ket{j}" /> },
  { value: "|u>", label: <M t="\ket{u}" /> },
  { value: "<i|u>", label: <M t="\braket{i}{u}" /> },
  { value: "<j|u>", label: <M t="\braket{j}{u}" /> },
  { value: "<u|i>", label: <M t="\braket{u}{i}" /> },
  { value: "<u|j>", label: <M t="\braket{u}{j}" /> },
] as const;

const valueToDirac = uColumnDiracChoices.reduce((o, c) => {
  o[c.value] = c.label.props.t;
  return o;
}, {} as Record<string, string>);

function PlotU({ labels }: { labels: "numbers" | "dirac" }) {
  const f = useFields(QuantumBasis);

  const [x, y] = f.uColumn.value || [];

  const [xD, yD] = (() => {
    if (labels === "dirac" && f.uColumnDirac.value) {
      const [x, y] = f.uColumnDirac.value;
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
