import React from "react";
import { QuantumBasis } from "src/common/tutorials";
import { Continue, Help, HelpButton, Prose, Section } from "src/components";
import { Decimal, Select, TextArea } from "src/components/inputs";
import { Content } from "src/components/layout";
import M from "src/components/M";
import Matrix, { fieldToMatrix } from "src/components/Matrix";
import { needsHelp, useFields } from "src/state";
import { Part } from "src/tutorials/shared";

export default function ChangingBasis() {
  const f = useFields(QuantumBasis);

  return (
    <Part label="Changing Basis">
      <Content>
        <Section first>
          <Prose>
            <p>We can represent vectors in any basis we want!</p>

            <p>
              Let’s shift to a new basis of <M t="\ket{v_1}" /> and{" "}
              <M t="\ket{v_2}" />, where
              <M
                display
                t="
            \ket{v_1} \doteq \mqty( \sqrt{3}/2 \\ 1/2 )
            \text{ and }
            \ket{v_2} \doteq \mqty( -1/2 \\ \sqrt{3}/2 )
          "
              />
              (You can check that these vectors are orthonormal if you'd like.)
            </p>
          </Prose>

          <Continue commit={f.changingBasisIntroCommit} />
        </Section>

        <Section commits={[f.changingBasisIntroCommit]}>
          <Prose>
            <p>
              Represent our vector{" "}
              <M t="\ket{u} = \frac{1}{\sqrt{5}} \ket{i} + \frac{2}{\sqrt{5}} \ket{j}" />{" "}
              in this new basis.
            </p>
            <p>
              This means we wish to write our vector in the form{" "}
              <M t="a\ket{v_1} + b\ket{v_2}" />
              . Your task is to find <M t="a" /> and <M t="b" />.
            </p>

            <p>Do this on scrap paper and click to move on once you’re done!</p>
          </Prose>

          {needsHelp(f.changedBasisHelp) && (
            <Help>
              <Prose>
                <M t="a" /> and <M t="b" /> are coefficients. How do you
                represent those in Dirac notation?
              </Prose>
            </Help>
          )}

          <Continue
            commit={f.changedBasisCommit}
            label="I’m done changing basis"
          >
            <HelpButton help={f.changedBasisHelp} />
          </Continue>
        </Section>

        <Section commits={[f.changedBasisCommit]}>
          <Prose>
            Plot the new vector in the new basis on the graph below.
          </Prose>

          <Continue commit={f.kPlotCommit} />
        </Section>

        <Section commits={[f.kPlotCommit]}>
          <Prose>
            Let’s represent our vector as a column vector in this new basis.
            That is, in the form:
            <M display t="\mqty(a \\ b)_{\large{v}}" />
            We’ll do it two ways again.
          </Prose>

          <Prose>
            First express each element in the column vector as a decimal.
          </Prose>

          <Matrix
            className="margin-top"
            subscriptTex="v"
            matrix={fieldToMatrix(
              f.kPlotPoint,
              <Decimal field={f.kPlotPoint.elements[0]} />
            )}
          />

          <Continue commit={f.kColumnCommit} />
        </Section>

        <Section commits={[f.kColumnCommit]}>
          <Prose>
            Now express each element in the column vector as an inner product.
          </Prose>

          <Matrix
            className="margin-top"
            subscriptTex="v"
            matrix={fieldToMatrix(
              f.kColumnDirac,
              <Select
                choices={kColumnDiracChoices}
                field={f.kColumnDirac.elements[0]}
              />
            )}
          />

          <Continue commit={f.kColumnDiracCommit} />
        </Section>

        <Section commits={[f.kColumnDiracCommit]}>
          <TextArea
            field={f.columnSubscriptExplain}
            label={
              <Prose>Why is there a subscript on the column vectors?</Prose>
            }
          />

          <Continue commit={f.columnSubscriptExplainCommit} />
        </Section>
      </Content>
    </Part>
  );
}

const kColumnDiracChoices = [
  { value: "|v1>", label: <M t="\ket{v_1}" /> },
  { value: "|v2>", label: <M t="\ket{v_2}" /> },
  { value: "<v1|u>", label: <M t="\braket{v_1}{u}" /> },
  { value: "<v2|u>", label: <M t="\braket{v_2}{u}" /> },
  { value: "<i|u>", label: <M t="\braket{i}{u}" /> },
  { value: "<j|u>", label: <M t="\braket{j}{u}" /> },
] as const;
