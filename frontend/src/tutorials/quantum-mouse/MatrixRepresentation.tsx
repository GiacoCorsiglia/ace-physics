import React from "react";
import { QuantumMouse } from "src/common/tutorials";
import { Continue, Prose, Reminder, Section } from "src/components";
import {
  Decimal,
  FieldGroup,
  Select,
  SelectChoices,
  Text,
} from "src/components/inputs";
import { Content } from "src/components/layout";
import M from "src/components/M";
import Matrix from "src/components/Matrix";
import { isSet, useFields } from "src/state";
import { Part } from "src/tutorials/shared";

export default function MatrixRepresentation() {
  const {
    happyVector0,
    happyVector1,
    sadVector0,
    sadVector1,
    moodVectorsCommit,

    smallVector0,
    smallVector1,
    wideVector0,
    wideVector1,
    eyeSizeVectorCommit,

    happyEigenequation,
    sadEigenequation,
    moodEigenequationCommit,

    moodMatrix0_0,
    moodMatrix0_1,
    moodMatrix1_0,
    moodMatrix1_1,
    moodMatrixCommit,
  } = useFields(QuantumMouse);

  return (
    <Part label="Connecting to Matrix Representation">
      <Content>
        <Section first>
          <Reminder>
            <Prose>
              <p>
                Small-eyed mice: &nbsp;{" "}
                <M t="\hat{S}\ket{\cdot} = 1 \ket{\cdot}" /> <br />
                Wide-eyed mice: &nbsp; <M t="\hat{S}\ket{*} = 2 \ket{*}" />{" "}
                <br />
                Happy mice: &nbsp; <M t="\hat{M}\ket{😸}=\ket{😸}" /> <br />
                Sad mice: &nbsp; <M t="\hat{M}\ket{😿}= -\ket{😿}" />
              </p>
            </Prose>
            <M
              display
              t="\ket{\cdot} = \frac{2}{\sqrt{5}} \ket{😸} - \frac{1}{\sqrt{5}} \ket{😿}"
            />

            <M
              display
              t="\ket{*} = \frac{1}{\sqrt{5}} \ket{😸} + \frac{2}{\sqrt{5}} \ket{😿}"
            />
          </Reminder>

          <Prose>
            <p>
              Let’s choose mood eigenstates to be our “basis.” (We are working
              in the “mood basis” throughout this page and the rest of the
              Tutorial.)
            </p>

            <p>What will these eigenstates look like as column vectors?</p>
          </Prose>

          <Matrix
            className="margin-top"
            label="A happy mouse,&nbsp;"
            labelTex="\ket{😸}"
            column={[
              <Select field={happyVector0} choices={vectorSelectChoices} />,
              <Select field={happyVector1} choices={vectorSelectChoices} />,
            ]}
          />

          <Matrix
            className="margin-top"
            label="A sad mouse,&nbsp;"
            labelTex="\ket{😿}"
            column={[
              <Select field={sadVector0} choices={vectorSelectChoices} />,
              <Select field={sadVector1} choices={vectorSelectChoices} />,
            ]}
          />

          <Continue
            commit={moodVectorsCommit}
            allowed={
              isSet(happyVector0) &&
              isSet(happyVector1) &&
              isSet(sadVector0) &&
              isSet(sadVector1)
            }
          />
        </Section>

        <Section commits={[moodVectorsCommit]}>
          <Prose>
            <p>
              Now that we've defined the mood basis states, how would the
              following be represented?
            </p>
          </Prose>

          <Matrix
            className="margin-top"
            label="A small-eyed mouse,&nbsp;"
            labelTex="\ket{\cdot}"
            column={[
              <Select field={smallVector0} choices={vectorSelectChoices} />,
              <Select field={smallVector1} choices={vectorSelectChoices} />,
            ]}
          />

          <Matrix
            className="margin-top"
            label="A wide-eyed mouse,&nbsp;"
            labelTex="\ket{*}"
            column={[
              <Select field={wideVector0} choices={vectorSelectChoices} />,
              <Select field={wideVector1} choices={vectorSelectChoices} />,
            ]}
          />

          <Continue
            commit={eyeSizeVectorCommit}
            allowed={
              isSet(smallVector0) &&
              isSet(smallVector1) &&
              isSet(wideVector0) &&
              isSet(wideVector1)
            }
          />
        </Section>

        <Section commits={[moodVectorsCommit, eyeSizeVectorCommit]}>
          <Prose>
            <p>
              Now we want to find the representation for the <M t="\hat{M}" />{" "}
              operator. Take some time to work the following out on scrap paper
              using matrix notation.
            </p>

            <p>But first, let's remind ourselves of some things.</p>
          </Prose>

          <FieldGroup grid className="margin-top">
            <Text
              field={happyEigenequation}
              label={<M t="\hat{M}\ket{😸} =" />}
            />

            <Text
              field={sadEigenequation}
              label={<M t="\hat{M}\ket{😿} =" />}
            />
          </FieldGroup>

          <Continue
            commit={moodEigenequationCommit}
            allowed={isSet(happyEigenequation) && isSet(sadEigenequation)}
          />
        </Section>

        <Section
          commits={[
            moodVectorsCommit,
            eyeSizeVectorCommit,
            moodEigenequationCommit,
          ]}
        >
          <Prose>
            <p>
              Let <M t="\hat{M}" /> be a matrix with unknown elements:
              <M
                display
                t="\hat{M}\ \dot{=}\ \begin{pmatrix} a & b \\ c & d \end{pmatrix}"
              />
              Act <M t="\hat{M}" /> on the mood basis vectors to solve for{" "}
              <M t="a" />, <M t="b" />,
              <M t="c" />, and <M t="d" />.
            </p>

            <p>
              Do this on scrap paper, but input your results here (as decimals):
            </p>
          </Prose>
          {/*we can have this be drop down menus with a, b, c, and d as the
          labels. Unless you can rig up something fancier where they can type
          numbers in to box in a matrix format on screen. Don't do that if it
          would take a lot of time*/}

          <Matrix
            className="margin-top"
            labelTex="\hat{M}"
            matrix={[
              [
                <Decimal field={moodMatrix0_0} />,
                <Decimal field={moodMatrix0_1} />,
              ],
              [
                <Decimal field={moodMatrix1_0} />,
                <Decimal field={moodMatrix1_1} />,
              ],
            ]}
          />

          <Continue
            commit={moodMatrixCommit}
            allowed={
              isSet(moodMatrix0_0) &&
              isSet(moodMatrix0_1) &&
              isSet(moodMatrix1_0) &&
              isSet(moodMatrix1_1)
            }
          />
        </Section>
      </Content>
    </Part>
  );
}

const vectorSelectChoices: SelectChoices<QuantumMouse["happyVector0"]> = [
  { value: "0", label: <M t="0" /> },
  { value: "1", label: <M t="1" /> },
  { value: "1/root5", label: <M t="1/\sqrt{5}" /> },
  { value: "-1/root5", label: <M t="-1/\sqrt{5}" /> },
  { value: "2/root5", label: <M t="2/\sqrt{5}" /> },
  { value: "-2/root5", label: <M t="-2/\sqrt{5}" /> },
];
