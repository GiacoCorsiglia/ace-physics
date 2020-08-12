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
import Matrix, { fieldToMatrix } from "src/components/Matrix";
import { isSet, useFields } from "src/state";
import { Part } from "src/tutorials/shared";

export default function MatrixRepresentation() {
  const {
    /*happyVector,
    sadVector,*/
    moodVectorsCommit,

    smallVector,
    wideVector,
    eyeSizeVectorCommit,

    happyEigenequation,
    sadEigenequation,
    moodEigenequationCommit,

    moodMatrix,
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
                <M t="\hat{S}\ket{\smalleye} = 1 \ket{\smalleye}" /> <br />
                Wide-eyed mice: &nbsp;{" "}
                <M t="\hat{S}\ket{\wideye} = 2 \ket{\wideye}" /> <br />
                Happy mice: &nbsp; <M t="\hat{M}\ket{\smiley}=\ket{\smiley}" />
                <br />
                Sad mice: &nbsp;{" "}
                <M t="\hat{M}\ket{\frownie}= -\ket{\frownie}" />
              </p>
            </Prose>
            <M
              display
              t="\ket{\smalleye} = \frac{2}{\sqrt{5}} \ket{\smiley} - \frac{1}{\sqrt{5}} \ket{\frownie}"
            />

            <M
              display
              t="\ket{\wideye} = \frac{1}{\sqrt{5}} \ket{\smiley} + \frac{2}{\sqrt{5}} \ket{\frownie}"
            />
          </Reminder>

          <Prose>
            <p>
              Let’s choose mood eigenstates to be our “basis.”{" "}
              {/*(We are working
              in the “mood basis” throughout this page and the rest of the
              Tutorial.)*/}
            </p>

            {/*<p>What will these eigenstates look like as column vectors?</p>*/}
            <p>This means we'll be using the folloing column vectors:</p>

            <M
              display
              t="\ket{\smiley} \dot{=}\ \begin{pmatrix} 1 \\ 0 \end{pmatrix}"
            />
            <M
              display
              t="\ket{\frownie} \dot{=}\ \begin{pmatrix} 0 \\ 1 \end{pmatrix}"
            />
          </Prose>

          {/*
          <Matrix
            className="margin-top"
            label="A happy mouse,&nbsp;"
            labelTex="\ket{\smiley}"
            matrix={fieldToMatrix(
              happyVector,
              <Select
                field={happyVector.elements[0]}
                choices={vectorSelectChoices}
              />
            )}
          />

          <Matrix
            className="margin-top"
            label="A sad mouse,&nbsp;"
            labelTex="\ket{\frownie}"
            matrix={fieldToMatrix(
              sadVector,
              <Select
                field={sadVector.elements[0]}
                choices={vectorSelectChoices}
              />
            )}
          />
            */}

          <Continue
            commit={moodVectorsCommit}
            /*allowed={isSet(happyVector) && isSet(sadVector)}*/
            label="Let's go!"
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
            labelTex="\ket{\smalleye}"
            matrix={fieldToMatrix(
              smallVector,
              <Select
                field={smallVector.elements[0]}
                choices={vectorSelectChoices}
              />
            )}
          />

          <Matrix
            className="margin-top"
            label="A wide-eyed mouse,&nbsp;"
            labelTex="\ket{\wideye}"
            column={fieldToMatrix(
              wideVector,
              <Select
                field={wideVector.elements[0]}
                choices={vectorSelectChoices}
              />
            )}
          />

          {/*I think we can forgo hints here. Or you can say something about using our state representations from above*/}
          <Continue
            commit={eyeSizeVectorCommit}
            allowed={isSet(smallVector) && isSet(wideVector)}
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
              label={<M t="\hat{M}\ket{\smiley} =" />}
            />

            <Text
              field={sadEigenequation}
              label={<M t="\hat{M}\ket{\frownie} =" />}
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
          {/*I think we already gave the hint in the directions of using the eigenequations. And since there are zeros, this comes out pretty easy
          Maybe a follow-up: Does the matrix for the mood operator make sense? Why or why not?
          */}

          <Matrix
            className="margin-top"
            labelTex="\hat{M}"
            matrix={fieldToMatrix(
              moodMatrix,
              <Decimal field={moodMatrix.elements[0].elements[0]} />
            )}
          />

          <Continue commit={moodMatrixCommit} allowed={isSet(moodMatrix)} />
        </Section>
      </Content>
    </Part>
  );
}

const vectorSelectChoices: SelectChoices<
  NonNullable<QuantumMouse["happyVector"]>[0]
> = [
  { value: "0", label: <M t="0" /> },
  { value: "1", label: <M t="1" /> },
  { value: "1/root5", label: <M t="1/\sqrt{5}" /> },
  { value: "-1/root5", label: <M t="-1/\sqrt{5}" /> },
  { value: "2/root5", label: <M t="2/\sqrt{5}" /> },
  { value: "-2/root5", label: <M t="-2/\sqrt{5}" /> },
];
