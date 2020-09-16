import { ArrowDownIcon } from "@primer/octicons-react";
import { default as React } from "react";
import { QuantumBasis } from "src/common/tutorials";
import {
  Continue,
  Help,
  HelpButton,
  Info,
  Prose,
  Section,
} from "src/components";
import { Decimal, Select, TextArea, Toggle } from "src/components/inputs";
import { Column, Columns, Content } from "src/components/layout";
import M from "src/components/M";
import Matrix, { fieldToMatrix } from "src/components/Matrix";
import { Axes, Plot, Tick, Vector } from "src/components/plots";
import { isSet, isVisible, needsHelp, useFields } from "src/state";
import { ContinueToNextPart, Part } from "src/tutorials/shared";
import { approxEquals } from "src/util";

export default function DefiningBasis() {
  const f = useFields(QuantumBasis);

  const uColumnDiracCheck = () => {
    const [i_, j_] = f.uColumnDirac.elements;
    const i = i_.value?.selected;
    const j = j_.value?.selected;

    if (!i || !j) {
      return;
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
      f.uColumnDiracKetVisible.set(true);
    } else if (iCorrect && jCorrect) {
      // (1) Really right.
      f.uColumnDiracCorrectVisible.set(true);
    } else if ((iCorrect || iConj) && (jCorrect || jConj)) {
      // (3) Right up to at least one complex conjugate.
      f.uColumnDiracConjugateVisible.set(true);
    } else if (
      (iReversed && jReversed) ||
      (iReversedConj && jReversed) ||
      (iReversed && jReversedConj) ||
      (iReversedConj && jReversedConj)
    ) {
      // (4) Reversed.
      f.uColumnDiracReversedVisible.set(true);
    } else if (i === j) {
      // (8) Repeated.
      f.uColumnDiracRepeatedVisible.set(true);
    } else {
      // (8) Something else.
      f.uColumnDiracGeneralIncorrectVisible.set(true);
    }
  };

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
            choices={iAndJFormBasisChoices}
            label={
              <Prose>
                Can we use <M t="\ket{i}" /> and <M t="\ket{j}" /> as a basis?
              </Prose>
            }
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
            onClick={() => {
              if (f.iAndJFormBasis.value?.selected !== "yes") {
                f.iAndJSpanVisible.set(true);
              }
            }}
            allowed={isSet(f.iAndJFormBasis) && isSet(f.iAndJFormBasisExplain)}
          />
        </Section>

        <Section commits={[f.iAndJFormBasisCommit, f.iAndJSpanVisible]}>
          <Toggle
            field={f.iAndJSpan}
            choices={iAndJSpanChoices}
            label={
              <Prose>
                Can you write any 2-D vector in the form{" "}
                <M t="a\ket{i} + b\ket{j}" />. In other words, can any 2-D
                vector be expressed as a combination of the <M t="\vu{i}" /> and{" "}
                <M t="\vu{j}" /> unit vectors?
              </Prose>
            }
          />

          <Continue commit={f.iAndJSpanCommit} allowed={isSet(f.iAndJSpan)} />
        </Section>

        <Section commits={f.iAndJSpanCommit}>
          {f.iAndJSpan.value?.selected === "yes" && (
            <Help>
              <Prose>
                That’s right. This means that we <strong>can</strong> use{" "}
                <M t="\ket{i}" /> and <M t="\ket{j}" /> as a basis.
              </Prose>
            </Help>
          )}

          {f.iAndJSpan.value?.selected !== "yes" && (
            <Info>
              <Prose>
                Any vector in 2-D “regular” space can be written as a (linear)
                combination of the unit vectors <M t="\ket{i}" /> and
                <M t="\ket{j}" />. This means that we <strong>can</strong> use
                them as a basis.
              </Prose>
            </Info>
          )}

          <Continue commit={f.iAndJFeedbackCommit} />
        </Section>

        <Section
          commits={[
            f.iAndJFormBasisCommit,
            isVisible(f.iAndJSpanVisible) && f.iAndJFeedbackCommit,
          ]}
        >
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

          {approxEquals(f.uColumn.value, [0.894, 0.447]) && (
            <Info>
              <Prose>
                Be careful not to mix up the horizontal and vertical components
                in the graph!
              </Prose>
            </Info>
          )}

          {needsHelp(f.uColumnHelp) && (
            <Help>
              <Prose>
                Is <M t="\frac{1}{\sqrt{5}}" /> the <M t="\ket{i}" />{" "}
                (horizontal) component or the <M t="\ket{j}" /> (vertical)
                component?
              </Prose>
            </Help>
          )}

          <Continue commit={f.uColumnCommit} allowed={isSet(f.uColumn)}>
            <HelpButton help={f.uColumnHelp} />
          </Continue>
        </Section>

        <Section commits={[f.uColumnCommit]}>
          <Columns>
            <Column>
              <Prose noMargin>
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

          {needsHelp(f.uColumnDiracHelp) && (
            <Help>
              <Prose>
                If we were using normal vector notation (i.e.,
                <M t="\ket{u} = \vec{u}" />
                ), could you think of a dot product for each component? How do
                you express those in Dirac notation?
              </Prose>
            </Help>
          )}

          <Continue
            commit={f.uColumnDiracCommit}
            label="Let’s check in"
            allowed={isSet(f.uColumnDirac)}
            onClick={uColumnDiracCheck}
          >
            <HelpButton help={f.uColumnDiracHelp} />
          </Continue>
        </Section>

        <Section
          commits={[
            f.uColumnDiracCommit,
            f.uColumnDiracGeneralIncorrectVisible,
          ]}
        >
          <Info>
            <Prose>
              <p>
                This software is limited, and we’re not sure how to respond to
                your input! We do think there’s a good answer amongst the
                choices we gave you.
              </p>

              <p>
                Either adjust your answers and check in again, or just move on.
              </p>
            </Prose>
          </Info>

          <Continue
            commit={f.uColumnDiracGeneralIncorrectCommit}
            onClick={uColumnDiracCheck}
            label="Check in again"
          >
            {/* HACK: Incorrect use of help button */}
            <HelpButton help={f.uColumnDiracGeneralIncorrectCommit}>
              Just move on <ArrowDownIcon />
            </HelpButton>
          </Continue>
        </Section>

        <Section commits={[f.uColumnDiracCommit, f.uColumnDiracKetVisible]}>
          <Info>
            <Prose>
              <p>
                You’ve inserted a <strong>ket</strong> (
                <M prespace={false} t="\ket{u}" />,
                <M t="\ket{i}" />, or <M t="\ket{j}" />) into your column
                vector. This is kind of like writing vector
                <M t="\vec{v} = (5, \vec{w}, 3)" />, which normally doesn't make
                sense.
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

          <Continue
            commit={f.uColumnDiracKetCommit}
            onClick={uColumnDiracCheck}
            label="Check in again"
          />
        </Section>

        <Section
          commits={[f.uColumnDiracCommit, f.uColumnDiracRepeatedVisible]}
        >
          <Info>
            <Prose>
              <p>
                Looks like you repeated the same answer for both your horizontal
                and vertical components.
              </p>

              <p>
                You should have a different expression for both elements, since
                you should have different numbers for each element above.
              </p>

              <p>Adjust your answers, then check in again.</p>
            </Prose>
          </Info>

          <Continue
            commit={f.uColumnDiracRepeatedCommit}
            onClick={uColumnDiracCheck}
            label="Check in again"
          />
        </Section>

        <Section
          commits={[f.uColumnDiracCommit, f.uColumnDiracReversedVisible]}
        >
          <Info>
            <Prose>
              <p>
                Looks like you may have reversed at least one of your horizontal
                and vertical components.
              </p>

              <p>Adjust your answers, then check in again.</p>
            </Prose>
          </Info>

          <Continue
            commit={f.uColumnDiracReversedCommit}
            onClick={uColumnDiracCheck}
            label="Check in again"
          />
        </Section>

        <Section commits={[f.uColumnDiracCommit, f.uColumnDiracCorrectVisible]}>
          <Help>
            <Prose>Looks good to us! Nice work.</Prose>
          </Help>

          <Continue
            commit={f.uColumnDiracCorrectCommit}
            label="Keep on going"
          />
        </Section>

        <Section
          commits={[f.uColumnDiracCommit, f.uColumnDiracConjugateVisible]}
        >
          <Help>
            <Prose>
              <p>You’re really close!</p>

              <p>
                Just be careful about the order of your brakets. You should
                have:
                <M
                  display
                  t="\ket{u} \doteq \begin{pmatrix} \braket{i}{u} \\ \braket{j}{u} \end{pmatrix}"
                />
              </p>

              <p>
                This doesn’t matter in “regular space,” but it does matter in
                Quantum Mechanics when we work with complex numbers.
              </p>
            </Prose>
          </Help>

          <Continue commit={f.uColumnDiracConjugateCommit} />
        </Section>

        <Section
          commits={[
            f.uColumnDiracCommit,
            isVisible(f.uColumnDiracKetVisible) && f.uColumnDiracKetCommit,
            isVisible(f.uColumnDiracCorrectVisible) &&
              f.uColumnDiracCorrectCommit,
            isVisible(f.uColumnDiracConjugateVisible) &&
              f.uColumnDiracConjugateCommit,
            isVisible(f.uColumnDiracReversedVisible) &&
              f.uColumnDiracReversedCommit,
            isVisible(f.uColumnDiracRepeatedVisible) &&
              f.uColumnDiracRepeatedCommit,
            isVisible(f.uColumnDiracGeneralIncorrectVisible) &&
              f.uColumnDiracGeneralIncorrectCommit,
          ]}
        >
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

        <Section commits={f.innerProductMeaningCommit}>
          <ContinueToNextPart commit={f.definingBasisFinalCommit} />
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

const iAndJFormBasisChoices = [
  {
    value: "yes",
    label: (
      <>
        Yes, <M t="\ket{i}" /> and <M t="\ket{j}" /> form a basis.
      </>
    ),
  },
  { value: "no", label: <>No, they do not.</> },
] as const;

const iAndJSpanChoices = [
  { value: "yes", label: <>Yes, you can.</> },
  { value: "no", label: <>No, you cannot.</> },
] as const;
