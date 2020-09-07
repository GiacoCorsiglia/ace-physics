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

            <p>
              (You’ll need the values of <M t="a" /> and <M t="b" /> as decimals
              when you move on.)
            </p>
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

        <Section commits={f.changedBasisCommit}>
          <Prose>
            Let’s go ahead and plot the vector in the new basis. Before we do
            that, let’s think about our axes.
          </Prose>

          <Toggle
            field={f.v1v2AxesAllowed}
            choices={v1v2AxesAllowedChoices}
            label={
              <Prose>
                Is it OK to label the horizontal axis as <M t="\vb{v1}" /> and
                the vertical axis as <M t="\vb{v2}" />?
              </Prose>
            }
          />

          {f.v1v2AxesAllowed.value?.selected === "no" && (
            <TextArea
              field={f.v1v2AxesAllowedExplain}
              label={<Prose>Explain why not:</Prose>}
            />
          )}

          {needsHelp(f.v1v2AxesAllowedHelp) && (
            <Help>
              <Prose>
                <M t="\ket{v1}" /> and <M t="\ket{v2}" /> form an{" "}
                <em>orthonormal basis</em> just like <M t="\ket{i}" /> and{" "}
                <M t="\ket{j}" />. This means that they can be represented by
                any pair of perpendicular axes.
              </Prose>
            </Help>
          )}

          {needsHelp(f.v1v2AxesAllowedHelp2) && (
            <Help>
              <Prose>
                Therefore <strong>yes</strong>, we can label our axes this way
                in this diagram.
              </Prose>
            </Help>
          )}

          <Continue
            commit={f.v1v2AxesAllowedCommit}
            allowed={
              isSet(f.v1v2AxesAllowed) &&
              (f.v1v2AxesAllowed.value?.selected === "yes" ||
                isSet(f.v1v2AxesAllowedExplain))
            }
            onClick={() => {
              if (f.v1v2AxesAllowed.value?.selected === "no") {
                f.v1v2AxesAllowedCorrectionVisible.set(true);
              }
            }}
          >
            <HelpButton help={f.v1v2AxesAllowedHelp}>I’m not sure!</HelpButton>

            {needsHelp(f.v1v2AxesAllowedHelp) && (
              <HelpButton help={f.v1v2AxesAllowedHelp2}>
                I’m still unsure
              </HelpButton>
            )}
          </Continue>
        </Section>

        <Section
          commits={[
            f.v1v2AxesAllowedCommit,
            f.v1v2AxesAllowedCorrectionVisible,
          ]}
        >
          <Prose>
            <p>
              Because <M t="\ket{v1}" /> and <M t="\ket{v2}" /> form an{" "}
              <em>orthonormal basis</em>, they can be represented by any pair of
              perpendicular axes. So we think it’s just fine for us to use the
              horizontal and vertical axes for this purpose.
            </p>

            <p>
              Sorry this software can’t respond directly to your explanation
              above!
            </p>

            <p>
              We’re going to go ahead and set up our axes this way. If you have
              lingering questions, you should reach out to your peers or
              instructors! Don’t worry though—you’re totally good to keep
              working on the tutorial.
            </p>
          </Prose>

          <Continue commit={f.v1v2AxesAllowedCorrectionCommit} />
        </Section>

        <Section
          commits={[
            f.v1v2AxesAllowedCommit,
            isVisible(f.v1v2AxesAllowedCorrectionVisible) &&
              f.v1v2AxesAllowedCorrectionCommit,
          ]}
        >
          <Columns>
            <Column>
              <Prose>
                <p>
                  Alright, let’s plot the vector. Like before, type in the new
                  coordinates as decimals below.
                </p>
              </Prose>

              <Matrix
                className="margin-top"
                matrix={fieldToMatrix(
                  f.kPlotPoint,
                  <Decimal field={f.kPlotPoint.elements[0]} />,
                  fieldToMatrix.Row
                )}
                commas
              />
            </Column>

            <Column>
              <PlotK />
            </Column>
          </Columns>

          <Continue commit={f.kPlotCommit} allowed={isSet(f.kPlotPoint)} />
        </Section>

        <Section commits={f.kPlotCommit}>
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
              f.kColumn,
              <Decimal field={f.kColumn.elements[0]} />
            )}
          />

          <Continue commit={f.kColumnCommit} allowed={isSet(f.kColumn)} />
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

          <Info>
            <Prose>
              If you changed basis another way, you could have done so by
              computing these inner products too! It’s often the most efficient
              way.
            </Prose>
          </Info>

          <Continue
            commit={f.kColumnDiracCommit}
            allowed={isSet(f.kColumnDirac)}
          />
        </Section>

        <Section commits={[f.kColumnDiracCommit]}>
          <TextArea
            field={f.columnSubscriptExplain}
            label={
              <Prose>Why is there a subscript on the column vectors?</Prose>
            }
          />

          <Continue
            commit={f.columnSubscriptExplainCommit}
            allowed={isSet(f.columnSubscriptExplain)}
          />
        </Section>
      </Content>
    </Part>
  );
}

const v1v2AxesAllowedChoices = [
  { value: "yes", label: "Yes, that’s fine" },
  { value: "no", label: "No, it’s not OK" },
] as const;

const kColumnDiracChoices = [
  { value: "|v1>", label: <M t="\ket{v_1}" /> },
  { value: "|v2>", label: <M t="\ket{v_2}" /> },
  { value: "<v1|u>", label: <M t="\braket{v_1}{u}" /> },
  { value: "<v2|u>", label: <M t="\braket{v_2}{u}" /> },
  { value: "<i|u>", label: <M t="\braket{i}{u}" /> },
  { value: "<j|u>", label: <M t="\braket{j}{u}" /> },
] as const;

function PlotK() {
  const f = useFields(QuantumBasis);

  const [x, y] = f.kPlotPoint.value || [];

  return (
    <Plot>
      <Axes xLabel="\vb{v1}" yLabel="\vb{v2}" color="darkgreen" />

      {x !== undefined && <Tick x={x} label={x} color="red" />}

      {y !== undefined && <Tick y={y} label={y} color="red" />}

      {x !== undefined && y !== undefined && <Vector x={x} y={y} color="red" />}
    </Plot>
  );
}
