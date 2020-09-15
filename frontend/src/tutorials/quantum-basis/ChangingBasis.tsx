import { default as React } from "react";
import { QuantumBasis } from "src/common/tutorials";
import {
  Continue,
  ContinueToNextPart,
  Help,
  HelpButton,
  Info,
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
import { approxEquals } from "src/util";

export default function ChangingBasis() {
  const f = useFields(QuantumBasis);

  const kColumnDiracCheck = () => {
    const [v1_, v2_] = f.kColumnDirac.elements;
    const v1 = v1_.value?.selected;
    const v2 = v2_.value?.selected;

    if (!v1 || !v2) {
      // Shouldn't get here...
      return;
    }

    const v1Correct = v1 === "<v1|u>";
    const v2Correct = v2 === "<v2|u>";

    const v1Reversed = v1 === "<v2|u>";
    const v2Reversed = v2 === "<v1|u>";

    const v1iOrJ = v1 === "<i|u>" || v1 === "<j|u>";
    const v2iOrJ = v2 === "<i|u>" || v2 === "<j|u>";

    const v1Ket = v1 === "|v1>" || v1 === "|v2>";
    const v2Ket = v2 === "|v1>" || v2 === "|v2>";

    // There are 6*6 = 36 total options

    if (v1Ket || v2Ket) {
      // (20) Really wrong.
      f.kColumnDiracKetVisible.set(true);
    } else if (v1Correct && v2Correct) {
      // (1) Totally correct.
      f.kColumnDiracCorrectVisible.set(true);
    } else if (v1Reversed && v2Reversed) {
      // (1) Just reversed.
      f.kColumnDiracReversedVisible.set(true);
    } else if ((v1Correct && v2Reversed) || (v1Reversed && v2Correct)) {
      // (2) Duplicated correct answer.
      f.kColumnDiracRepeatedVisible.set(true);
    } else if (v1iOrJ || v2iOrJ) {
      // (12) Wrong basis (or guessing).
      f.kColumnDiracIorJVisible.set(true);
    }
    // This should be all the possibilities.
  };

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
              We want to write our vector in the form
              <M t="a\ket{v_1} + b\ket{v_2}" />.
            </p>

            <p>
              In the box below, explain how you might find <M t="a" /> and{" "}
              <M t="b" />. Don't calculate yet, just explain how you would. List
              all the methods you can think of!
            </p>
          </Prose>

          <TextArea field={f.basisChangeApproach} label={<Prose></Prose>} />

          <Continue
            commit={f.basisChangeApproachCommit}
            allowed={isSet(f.basisChangeApproach)}
          />
        </Section>

        <Section commits={f.basisChangeApproachCommit}>
          <Prose>
            <p>
              Awesome, thanks for taking the time to think about that. Here’s
              one way you can do it. It’s usually the most efficient way, but
              there are other valid approaches too!
            </p>

            <p>
              Thinking back to the previous page, if we represent our ket as a
              column vector in the new basis, it will look like
              <M
                display
                t="a \ket{v_1} + b \ket{v_2} \doteq \begin{pmatrix} a \\ b \end{pmatrix}_v"
              />
            </p>

            <p>
              Now, express each element in Dirac notation. This is similar to
              what we did on the previous page, but remember we’re working in
              the new basis now.
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
                allowOther={false}
              />
            )}
          />

          {needsHelp(f.kColumnDiracHelp) && (
            <Help>
              <Prose>
                On the previous page, we could think of <M t="\braket{i}{u}" />{" "}
                as the <M t="\ket{i}" /> component. Can you describe the
                coefficient <M t="a" /> in similar terms?
              </Prose>
            </Help>
          )}

          <Continue
            commit={f.kColumnDiracCommit}
            allowed={isSet(f.kColumnDirac)}
            onClick={kColumnDiracCheck}
          >
            <HelpButton help={f.kColumnDiracHelp} />
          </Continue>
        </Section>

        <Section commits={f.kColumnDiracCommit}>
          <TextArea
            field={f.columnSubscriptExplain}
            label={
              <Prose>Why is there a subscript on the column vectors?</Prose>
            }
          />

          {needsHelp(f.columnSubscriptExplainHelp) && (
            <Help>
              <Prose>
                We didn’t have subscripts on our column vectors on the previous
                page. What’s the big change we made on this page?
              </Prose>
            </Help>
          )}

          <Continue
            commit={f.columnSubscriptExplainCommit}
            allowed={isSet(f.columnSubscriptExplain)}
            label="Let‘s check in"
          >
            <HelpButton help={f.columnSubscriptExplainHelp} />
          </Continue>
        </Section>

        <Section
          commits={[f.columnSubscriptExplainCommit, f.kColumnDiracKetVisible]}
        >
          <Info>
            <Prose>
              <p>
                You’ve inserted a <strong>ket</strong> (
                <M prespace={false} t="\ket{v_1}" /> or
                <M t="\ket{v_2}" />) into your column vector. This is kind of
                like writing vector
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
            commit={f.kColumnDiracKetCommit}
            onClick={kColumnDiracCheck}
            label="Check in again"
          />
        </Section>

        <Section
          commits={[f.columnSubscriptExplainCommit, f.kColumnDiracIorJVisible]}
        >
          <Info>
            <Prose>
              <p>
                Looks like you have <M t="\braket{i}{u}" /> or{" "}
                <M t="\braket{j}{u}" /> in your column vector again. This was
                right on the previous page, but the <M t="v" /> subscript on the
                column tells you that now we’re working in a different basis!
              </p>

              <p>Which basis is that? What are the basis vectors?</p>

              <p>Adjust your answers, then check in again.</p>
            </Prose>
          </Info>

          <Continue
            commit={f.kColumnDiracIorJCommit}
            onClick={kColumnDiracCheck}
            label="Check in again"
          />
        </Section>

        <Section
          commits={[
            f.columnSubscriptExplainCommit,
            f.kColumnDiracRepeatedVisible,
          ]}
        >
          <Info>
            <Prose>
              <p>
                Looks like you repeated the same answer for both components in
                the column vector. You should have a different expression for
                both elements.
              </p>

              <p>Adjust your answers, then check in again.</p>
            </Prose>
          </Info>

          <Continue
            commit={f.kColumnDiracRepeatedCommit}
            onClick={kColumnDiracCheck}
            label="Check in again"
          />
        </Section>

        <Section
          commits={[
            f.columnSubscriptExplainCommit,
            f.kColumnDiracReversedVisible,
          ]}
        >
          <Info>
            <Prose>
              <p>
                Looks like you may have swapped <M t="a" /> and <M t="b" />{" "}
                (i.e., written the elements in your column vector in the wrong
                order).
              </p>

              <p>Adjust your answers, then check in again.</p>
            </Prose>
          </Info>

          <Continue
            commit={f.kColumnDiracReversedCommit}
            onClick={kColumnDiracCheck}
            label="Check in again"
          />
        </Section>

        <Section
          commits={[
            f.columnSubscriptExplainCommit,
            f.kColumnDiracCorrectVisible,
          ]}
        >
          <Help>
            <Prose>
              <p>Your column vector looks good to us! Nice work.</p>

              <p>
                The <M t="v" /> subscript is how we indicate that the column
                vector is expressed in the basis of <M t="\ket{v_1}" />
                and
                <M t="\ket{v_2}" /> (as opposed to the standard basis of
                <M t="\ket{i}" />
                and
                <M t="\ket{j}" />, which doesn't require a subscript).
              </p>
            </Prose>
          </Help>

          <Continue
            commit={f.kColumnDiracCorrectCommit}
            label="Keep on going"
          />
        </Section>

        <Section
          commits={[
            f.columnSubscriptExplainCommit,
            isVisible(f.kColumnDiracCorrectVisible) &&
              f.kColumnDiracCorrectCommit,
            isVisible(f.kColumnDiracReversedVisible) &&
              f.kColumnDiracReversedCommit,
            isVisible(f.kColumnDiracRepeatedVisible) &&
              f.kColumnDiracRepeatedCommit,
            isVisible(f.kColumnDiracKetVisible) && f.kColumnDiracKetCommit,
            isVisible(f.kColumnDiracIorJVisible) && f.kColumnDiracIorJCommit,
          ]}
        >
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
              t="\ket{i} \doteq \mqty(1 \\ 0) \text{ and } \ket{j} \doteq \mqty(0 \\ 1)"
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
                <M t="b" /> in Dirac notation? (Hint: You did it above!) Can you
                compute those inner products?
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
              <Prose noMargin>
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
            onClick={() => {
              if (approxEquals(f.kColumn.value, [0.835, 0.551])) {
                f.kColumnCorrectVisible.set(true);
              } else if (approxEquals(f.kColumn.value, [0.551, 0.835])) {
                f.kColumnReversedVisible.set(true);
              } else {
                f.kColumnIncorrectVisible.set(true);
              }
            }}
          />
        </Section>

        <Section commits={[f.kColumnCommit, f.kColumnIncorrectVisible]}>
          <Info>
            <Prose>
              {approxEquals(f.kColumn.value, [0.835, 0.551]) ? (
                <p>
                  Hey! Looks like you changed your answers to the correct ones.
                  Nice job! Feel free to move on.
                </p>
              ) : (
                <>
                  <p>
                    {approxEquals(f.kColumn.elements[0].value, 0.835) ? (
                      <>
                        Looks like your <M t="b" /> is somewhat off.
                      </>
                    ) : approxEquals(f.kColumn.elements[1].value, 0.551) ? (
                      <>
                        Looks like your <M t="a" /> is somewhat off.
                      </>
                    ) : (
                      <>Looks like your calculation is somewhat off.</>
                    )}{" "}
                    If you’re using inner products to calculate, make sure
                    you’re using these equations:
                    <M
                      display
                      t="a = \braket{v_1}{u} \text{ and } b = \braket{v_2}{u}"
                    />
                  </p>

                  <p>
                    The answers are revealed on the top of the next page. Keep
                    trying (if you want), and you can double check yourself
                    there. Move on when you decide you’re ready.
                  </p>
                </>
              )}
            </Prose>
          </Info>

          <Continue commit={f.kColumnIncorrectCommit} />
        </Section>

        <Section commits={[f.kColumnCommit, f.kColumnReversedVisible]}>
          <Help>
            <Prose>
              <p>
                You’re really close! Looks like you reversed <M t="a" /> and{" "}
                <M t="b" /> though. If you’re using inner products to calculate,
                make sure you’re using these equations:
                <M
                  display
                  t="a = \braket{v_1}{u} \text{ and } b = \braket{v_2}{u}"
                />
              </p>

              <p>
                You can fix this above if you’d like (it will help you visualize
                the vector). Otherwise, you’re ready to move on.
              </p>
            </Prose>
          </Help>

          <Continue commit={f.kColumnReversedCommit} />
        </Section>

        <Section commits={[f.kColumnCommit, f.kColumnCorrectVisible]}>
          <Help>
            <Prose>Looks good to us! Wonderful job.</Prose>
          </Help>

          <Continue
            commit={f.kColumnCorrectCommit}
            label="Awesome, let’s keep going"
          />
        </Section>

        <Section
          commits={[
            f.kColumnCommit,
            isVisible(f.kColumnIncorrectVisible) && f.kColumnIncorrectCommit,
            isVisible(f.kColumnReversedVisible) && f.kColumnReversedCommit,
            isVisible(f.kColumnCorrectVisible) && f.kColumnCorrectCommit,
          ]}
        >
          <ContinueToNextPart
            link="../relating-different-bases"
            commit={f.changingBasisFinalCommit}
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
