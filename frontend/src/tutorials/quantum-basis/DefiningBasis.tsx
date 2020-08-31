import React from "react";
import { QuantumBasis } from "src/common/tutorials";
import { Continue, Prose, Section } from "src/components";
import { Decimal, Select, TextArea, Toggle } from "src/components/inputs";
import { Content } from "src/components/layout";
import M from "src/components/M";
import Matrix, { fieldToMatrix } from "src/components/Matrix";
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
            Plot the vector
            <M
              t="\ket{u} = \frac{1}{\sqrt{5}} \ket{i} + \frac{2}{\sqrt{5}} \ket{j}"
              display
            />
            on the graph below by typing in the coordinates as decimals.
          </Prose>

          <Continue commit={f.uPlotPointCommit} />
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
              f.uColumnDirac,
              <Select
                choices={uColumnDiracChoices}
                field={f.uColumnDirac.elements[0]}
              />
            )}
          />

          <Continue commit={f.uColumnCommit} />
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
              f.uColumn,
              <Decimal field={f.uColumn.elements[0]} />
            )}
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
