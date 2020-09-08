import React from "react";
import { QuantumBasis } from "src/common/tutorials";
import { Continue, Prose, Section } from "src/components";
import {
  Decimal,
  FieldGroup,
  Select,
  TextArea,
  Toggle,
} from "src/components/inputs";
import { Column, Columns, Content } from "src/components/layout";
import M from "src/components/M";
import Matrix, { fieldToMatrix } from "src/components/Matrix";
import { Axes, CircleLabel, Plot, Tick, Vector } from "src/components/plots";
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
          <Columns>
            <Column>
              <Prose>
                <p>
                  Plot the vector
                  <M t="\ket{u} = \frac{1}{\sqrt{5}} \ket{i} + \frac{2}{\sqrt{5}} \ket{j}" />{" "}
                  on the graph by typing in the coordinates as decimals.
                </p>

                <p>
                  It may help to know that
                  <M t="\frac{1}{\sqrt{5}} \approx 0.447" /> and
                  <M t="\frac{2}{\sqrt{5}} \approx 0.894" />.
                </p>
              </Prose>

              <Matrix
                className="margin-top"
                matrix={fieldToMatrix(
                  f.uPlotPoint,
                  <Decimal field={f.uPlotPoint.elements[0]} />,
                  fieldToMatrix.Row
                )}
                commas
              />
            </Column>

            <Column>
              <PlotU />
            </Column>
          </Columns>

          <Continue commit={f.uPlotPointCommit} allowed={isSet(f.uPlotPoint)} />
        </Section>

        <Section commits={[f.uPlotPointCommit]}>
          <Prose>
            <p>
              Let’s represent <M t="\ket{u}" /> as a column vector. We’ll do it
              two ways.
            </p>
            <p>
              First, express each element in the column vector as a pure
              (decimal) number
            </p>
          </Prose>

          <Matrix
            className="margin-top"
            labelTex="\ket{u}"
            matrix={fieldToMatrix(
              f.uColumn,
              <Decimal field={f.uColumn.elements[0]} />
            )}
          />

          <Continue commit={f.uColumnCommit} allowed={isSet(f.uColumn)} />
        </Section>

        <Section commits={[f.uColumnCommit]}>
          <Prose>
            Now express each element in the column vector symbolically as an
            appropriate expression in Dirac notation.
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

          <Continue
            commit={f.uColumnDiracCommit}
            allowed={isSet(f.uColumnDirac)}
          />
        </Section>

        <Section>
          <Columns>
            <Column>
              <Prose>
                <p>
                  Here’s the graph you created above. Identify the elements in
                  the graph that you could label with each of the two inner
                  products from the previous question.
                </p>
              </Prose>

              <FieldGroup grid className="margin-top">
                <Select
                  field={f.iInnerProductLabel}
                  choices={innerProductLabelChoices}
                  label={<M t="\braket{i}{u}" />}
                  placeholder="should label…"
                />

                <Select
                  field={f.jInnerProductLabel}
                  choices={innerProductLabelChoices}
                  label={<M t="\braket{j}{u}" />}
                  placeholder="should label…"
                />
              </FieldGroup>
            </Column>

            <Column>
              <PlotU withLabels />
            </Column>
          </Columns>

          <TextArea
            field={f.innerProductMeaning}
            label={
              <Prose>
                Discuss a conceptual meaning for these inner products based on
                the graph
              </Prose>
            }
          />

          <Continue
            commit={f.innerProductLabelingCommit}
            allowed={
              isSet(f.iInnerProductLabel) &&
              isSet(f.jInnerProductLabel) &&
              isSet(f.innerProductMeaning)
            }
          />
        </Section>
      </Content>
    </Part>
  );
}

const uColumnDiracChoices = [
  { value: "|i>", label: <M t="\ket{i}" /> },
  { value: "|j>", label: <M t="\ket{j}" /> },
  { value: "<i|u>", label: <M t="\braket{i}{u}" /> },
  { value: "<j|u>", label: <M t="\braket{j}{u}" /> },
  { value: "<u|i>", label: <M t="\braket{u}{i}" /> },
  { value: "<u|j>", label: <M t="\braket{u}{j}" /> },
] as const;

const innerProductLabelChoices = [
  { value: "A", label: "A" },
  { value: "B", label: "B" },
  { value: "C", label: "C" },
] as const;

function PlotU({ withLabels = false }: { withLabels?: boolean }) {
  const f = useFields(QuantumBasis);

  const [x, y] = f.uPlotPoint.value || [];

  return (
    <Plot>
      <Axes xLabel="\vb{i}" yLabel="\vb{j}" />

      {x !== undefined && <Tick x={x} label={x} color="blue" />}

      {y !== undefined && <Tick y={y} label={y} color="blue" />}

      {(x !== undefined || y !== undefined) && (
        <Vector x={x || 0} y={y || 0} label="\ket{u}" color="blue" />
      )}

      {withLabels && x !== undefined && y !== undefined && (
        <>
          <CircleLabel x={0} y={y} label="A" anchor="rightCenter" offset={25} />

          <CircleLabel x={x} y={y} label="B" anchor="bottomRight" />

          <CircleLabel x={x} y={0} label="C" anchor="topCenter" offset={45} />
        </>
      )}
    </Plot>
  );
}
