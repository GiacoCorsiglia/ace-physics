import React from "react";
import { QuantumMouse } from "src/common/tutorials";
import { Continue, Prose, Section } from "src/components";
import {
  Choice,
  FieldGroup,
  Select,
  SelectChoices,
  TextArea,
} from "src/components/inputs";
import { Content } from "src/components/layout";
import M from "src/components/M";
import { isSet, useFields } from "src/state";
import { Part } from "src/tutorials/shared";

export default function QuantumMood() {
  const {
    moodIntroCommit,

    possibleMoodEigenvalues,
    possibleMoodEigenvaluesCommit,

    moodEigenvalues,
    moodEigenvectors,
    moodOperators,
    moodEigenCommit,

    happySadInnerProduct,
    happySadInnerProductExplain,
    happySadInnerProductCommit,
  } = useFields(QuantumMouse);

  return (
    <Part label={<>Moody mice</>}>
      <Content>
        <Section first>
          <Prose>
            <p>
              Turns out mice have feelings too. The operator we will use for
              “quantum mood” is <M t="\hat{M}" />. This operator is also
              Hermitian. The corresponding physical measurement is “look at the
              mouse's expression,” yielding either a smile
              <M t="(\text{mood} = +1)" /> or frown
              <M t="(\text{mood} = -1)" />. Yes, we are using cat faces.
            </p>

            <p className="text-center">
              <M t="\hat{M}\ket{😸}=\ket{😸}" /> &nbsp;&nbsp;and&nbsp;&nbsp;{" "}
              <M t="\hat{M}\ket{😿}= -\ket{😿}" />.
            </p>

            <p>Note: Being happy or sad is again, orthonormal and complete.</p>
          </Prose>

          <Continue commit={moodIntroCommit} label="Got it" />
        </Section>

        <Section commits={[moodIntroCommit]}>
          <Choice
            field={possibleMoodEigenvalues}
            choices={possibleMoodEigenvalueChoices}
            label={
              <Prose>
                What are the possible values of a measurement of{" "}
                <M t="\hat{M}" />? (Check all that apply.)
              </Prose>
            }
          />

          <Continue
            commit={possibleMoodEigenvaluesCommit}
            allowed={isSet(possibleMoodEigenvalues)}
            label="Move on"
          />
        </Section>

        <Section commits={[moodIntroCommit, possibleMoodEigenvaluesCommit]}>
          <Prose>
            <p>Let's take some time to check in on these representations.</p>

            <p>
              Which symbols are the eigenvectors here, what are the eigenvalues,
              what are the operators?
            </p>
          </Prose>

          <FieldGroup grid className="margin-top">
            <Select
              field={moodEigenvalues}
              choices={moodChoices}
              label="Eigenvalues:"
              placeholder="Select eigenvalues…"
            />

            <Select
              field={moodEigenvectors}
              choices={moodChoices}
              label="Eigenvectors:"
              placeholder="Select eigenvectors…"
            />

            <Select
              field={moodOperators}
              choices={moodChoices}
              label="Operators:"
              placeholder="Select operators..."
            />
          </FieldGroup>

          <Continue
            commit={moodEigenCommit}
            allowed={
              isSet(moodEigenvalues) &&
              isSet(moodEigenvectors) &&
              isSet(moodOperators)
            }
            label="Move on"
          />
        </Section>

        <Section
          commits={[
            moodIntroCommit,
            possibleMoodEigenvaluesCommit,
            moodEigenCommit,
          ]}
        >
          <FieldGroup grid>
            <Select
              field={happySadInnerProduct}
              choices={happySadInnerProductChoices}
              label={<M t="\braket{😸}{😿} = " />}
            />

            <TextArea field={happySadInnerProductExplain} label="Explain:" />
          </FieldGroup>

          <Continue
            commit={happySadInnerProductCommit}
            allowed={
              isSet(happySadInnerProduct) && isSet(happySadInnerProductExplain)
            }
            label="Move on"
          />
        </Section>
      </Content>
    </Part>
  );
}

const possibleMoodEigenvalueChoices: SelectChoices<
  QuantumMouse["possibleMoodEigenvalues"]
> = [
  { value: "1", label: <M t="1" /> },
  { value: "-1", label: <M t="-1" /> },
  { value: "0", label: <M t="0" /> },
];

const moodChoices: SelectChoices<QuantumMouse["moodEigenvalues"]> = [
  {
    value: "kets",
    label: (
      <>
        <M t="\ket{😸}" /> and <M t="\ket{😿}" />
      </>
    ),
  },
  {
    value: "value",
    label: (
      <>
        <M t="1" /> and <M t="-1" />
      </>
    ),
  },
  {
    value: "operator",
    label: <M t="\hat{M}" />,
  },
];

const happySadInnerProductChoices: SelectChoices<
  QuantumMouse["smallBigInnerProduct"]
> = [
  { value: "0", label: "0" },
  { value: "1", label: "1" },
  { value: "complex", label: "Some complex number, but not enough info" },
];
