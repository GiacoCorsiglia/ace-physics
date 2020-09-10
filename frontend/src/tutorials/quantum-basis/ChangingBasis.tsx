import { default as React } from "react";
import { QuantumBasis } from "src/common/tutorials";
import {
  Continue,
  Help,
  HelpButton,
  Prose,
  Reminder,
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

        <Section commits={f.changingBasisIntroCommit}>
          <Prose>
            <p>
              Let’s represent our vector{" "}
              <M t="\ket{u} = \frac{1}{\sqrt{5}} \ket{i} + \frac{2}{\sqrt{5}} \ket{j}" />{" "}
              in this new basis.
            </p>

            <p>
              This means we wish to write our vector in the form{" "}
              <M t="a\ket{v_1} + b\ket{v_2}" />
              . Your task on this page is to find <M t="a" /> and <M t="b" />.
            </p>

            <p>
              First, represent <M t="\ket{u}" /> as a column vector{" "}
              <em>in the new basis</em>. Like before, express each element in
              Dirac notation.
            </p>
          </Prose>

          <Matrix
            className="margin-top"
            labelTex="\begin{pmatrix} a \\ b \end{pmatrix}_v ="
            subscriptTex="v"
            matrix={fieldToMatrix(
              f.kColumnDirac,
              <Select
                choices={kColumnDiracChoices}
                field={f.kColumnDirac.elements[0]}
              />
            )}
          />

          <Continue
            commit={f.kColumnDiracCommit}
            allowed={isSet(f.kColumnDirac)}
          />
        </Section>

        <Section commits={f.kColumnDiracCommit}>
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

        <Section commits={f.columnSubscriptExplainCommit}>
          <Prose>
            <p>
              Change the basis for <M t="\ket{u}" /> to the <M t="\ket{v_1}" />
              -and-
              <M prespace={false} t="\ket{v_2}" /> basis. In other words,
              calculate numerical values for <M t="a" /> and <M t="b" />.
            </p>

            <p>
              <strong>Do this on scrap paper</strong> and click to move on once
              you’re done!
            </p>

            <p>
              You’ll need the values of <M t="a" /> and <M t="b" /> as decimals
              when you move on, and you'll be able to check your answers in a
              moment.
            </p>
          </Prose>

          <Reminder>
            <M
              display
              t="\ket{u} = \frac{1}{\sqrt{5}} \ket{i} + \frac{2}{\sqrt{5}} \ket{j}"
            />
            <M
              display
              t="
                  \ket{v_1} \doteq \mqty( \sqrt{3}/2 \\ 1/2 )
                  \text{ and }
                  \ket{v_2} \doteq \mqty( -1/2 \\ \sqrt{3}/2 )
                "
            />
          </Reminder>

          {needsHelp(f.basisChangeHelp) && (
            <Help>
              <Prose>
                Our goal is to represent our vector in the form
                <M display t="a\ket{v_1} + b\ket{v_2}" />
                How do you represent the coefficients <M t="a" /> and
                <M t="b" /> in Dirac notation? Can you compute those inner
                products?
              </Prose>
            </Help>
          )}

          <Continue
            commit={f.basisChangeCommit}
            label="I’m done changing basis"
          >
            <HelpButton help={f.basisChangeHelp} />
          </Continue>
        </Section>

        <Section commits={f.basisChangeCommit}>
          <Prose>
            <p>
              Sweet. Let’s go ahead and plot the vector in the new basis. You’ll
              need your answers for <M t="a" /> and <M t="b" /> to do this.
            </p>

            <p>But before we get to that, let’s think about our axes.</p>
          </Prose>

          <Toggle
            field={f.v1v2AxesAllowed}
            choices={v1v2AxesAllowedChoices}
            label={
              <Prose>
                Is it OK to label the horizontal axis as <M t="\vb{v_1}" /> and
                the vertical axis as <M t="\vb{v_2}" />?
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
                <M t="\ket{v_1}" /> and <M t="\ket{v_2}" /> form an{" "}
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
              Because <M t="\ket{v_1}" /> and <M t="\ket{v_2}" /> form an{" "}
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
                  coordinates as decimals in the column vector below.
                </p>
              </Prose>

              <Matrix
                className="margin-top"
                labelTex="\begin{pmatrix} a \\ b \end{pmatrix}_v ="
                subscriptTex="v"
                matrix={fieldToMatrix(
                  f.kColumn,
                  <Decimal field={f.kColumn.elements[0]} />
                )}
              />
            </Column>

            <Column>
              <PlotK />
            </Column>
          </Columns>

          <Continue
            commit={f.kColumnCommit}
            allowed={isSet(f.kColumn)}
            label="Let‘s check in"
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

  const [x, y] = f.kColumn.value || [];

  return (
    <Plot width={266} height={266} scale={90}>
      <Axes xLabel="\vb{v_1}" yLabel="\vb{v_2}" color="darkgreen" />

      {x !== undefined && (
        <Tick x={x} label={`\\braket{v_1}{u} = ${x}`} color="red" />
      )}

      {y !== undefined && (
        <Tick y={y} label={`\\braket{v_2}{u} = ${y}`} color="red" />
      )}

      {(x !== undefined || y !== undefined) && (
        <Vector x={x || 0} y={y || 0} color="red" />
      )}
    </Plot>
  );
}
