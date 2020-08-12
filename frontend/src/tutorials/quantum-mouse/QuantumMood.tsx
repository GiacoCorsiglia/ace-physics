import React from "react";
import { QuantumMouse } from "src/common/tutorials";
import {
  Continue,
  ContinueToNextPart,
  Help,
  HelpButton,
  Prose,
  Section,
} from "src/components";
import {
  Choice,
  FieldGroup,
  Select,
  SelectChoices,
  TextArea,
} from "src/components/inputs";
import { Content } from "src/components/layout";
import M from "src/components/M";
import { isSet, isVisible, needsHelp, useFields } from "src/state";
import { Part } from "src/tutorials/shared";
import { arraysEqual } from "src/util";

export default function QuantumMood() {
  const f = useFields(QuantumMouse);

  const {
    moodIntroCommit,

    possibleMoodEigenvalues,
    possibleMoodEigenvaluesHelp,
    possibleMoodEigenvaluesCommit,

    moodEigenvalues,
    moodEigenvectors,
    moodOperators,
    moodEigenUnitsHelp,
    moodEigenCommit,

    happySadInnerProduct,
    happySadInnerProductExplain,
    happySadInnerProductHelp,
    happySadInnerProductCommit,
  } = f;

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
              <M t="\hat{M}\ket{\smiley} = \ket{\smiley}" />{" "}
              &nbsp;&nbsp;and&nbsp;&nbsp;{" "}
              <M t="\hat{M}\ket{\frownie} = -\ket{\frownie}" />.
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

          {needsHelp(possibleMoodEigenvaluesHelp) && (
            <Help>
              <Prose>
                <p>Of these options, which are values and which are states?</p>

                <p>
                  The next question might clear this up for you! Consider giving
                  that a try and then returning to this question.
                </p>
              </Prose>
            </Help>
          )}

          <Continue
            commit={possibleMoodEigenvaluesCommit}
            allowed={
              isSet(possibleMoodEigenvalues) ||
              needsHelp(possibleMoodEigenvaluesHelp)
            }
          >
            <HelpButton help={possibleMoodEigenvaluesHelp} />
          </Continue>
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

          {needsHelp(moodEigenUnitsHelp) && (
            <Help>
              <Prose>
                Have we actually defined any units for “mood” above?
              </Prose>
            </Help>
          )}

          <Continue
            commit={moodEigenCommit}
            allowed={
              isSet(moodEigenvalues) &&
              isSet(moodEigenvectors) &&
              isSet(moodOperators)
            }
          >
            <HelpButton help={moodEigenUnitsHelp}>What about units?</HelpButton>
          </Continue>
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
              label={<M t="\braket{\smiley}{\frownie} = " />}
            />

            <TextArea field={happySadInnerProductExplain} label="Explain:" />
          </FieldGroup>

          {needsHelp(happySadInnerProductHelp) && (
            <Help>
              <Prose>
                You answered a similar question on the previous page. Like in
                that case, we defined these two states to be “<em>ortho</em>
                normal.”
              </Prose>
            </Help>
          )}

          <Continue
            commit={happySadInnerProductCommit}
            label="Let’s check in"
            allowed={
              isSet(happySadInnerProduct) && isSet(happySadInnerProductExplain)
            }
            onClick={() => {
              const posCorrect = arraysEqual(
                possibleMoodEigenvalues.value?.selected,
                ["-1", "1"]
              );
              const valuesCorrect = moodEigenvalues.value?.selected === "value";

              if (posCorrect !== valuesCorrect) {
                f.moodDisagreeVisible.set(true);
              }

              if (f.happySadInnerProduct.value?.selected !== "0") {
                if (f.smallBigInnerProduct.value?.selected === "0") {
                  f.happySadVsSmallBigVisible.set(true);
                } else {
                  f.happySadCorrectionVisible.set(true);
                }
              }
            }}
          >
            <HelpButton help={happySadInnerProductHelp} />
          </Continue>
        </Section>

        <Section commits={[happySadInnerProductCommit, f.moodDisagreeVisible]}>
          <Help>
            <Prose>
              <p>
                Your answers to the first two questions on this page seem to
                disagree.
              </p>

              <p>
                What’s the relationship between the possible values of a
                measurement of <M t="\hat{M}" /> and the eigenvalues in the
                eigen-equations at the top of this page?
              </p>
            </Prose>
          </Help>

          <Continue commit={f.moodDisagreeCommit} />
        </Section>

        <Section
          commits={[
            happySadInnerProductCommit,
            f.happySadVsSmallBigVisible,
            isVisible(f.moodDisagreeVisible) && f.moodDisagreeCommit,
          ]}
        >
          <Help>
            <Prose>
              On the previous page, you said
              <M t="\braket{\smalleye}{\wideye} = 0" />. <M t="\ket{\smiley}" />{" "}
              and <M t="\ket{\frownie}" /> are also orthogonal, so consider
              checking your answer for <M t="\braket{\smiley}{\frownie}" />.
            </Prose>
          </Help>

          <Continue commit={f.happySadVsSmallBigCommit} />
        </Section>

        <Section
          commits={[
            happySadInnerProductCommit,
            f.happySadCorrectionVisible,
            isVisible(f.moodDisagreeVisible) && f.moodDisagreeCommit,
          ]}
        >
          <Help>
            <Prose>
              <p>
                <M t="\ket{\smiley}" /> and <M t="\ket{\frownie}" /> are
                orthogonal, so there inner product (
                <M t="\braket{\smiley}{\frownie}" prespace={false} />) is zero.
              </p>

              <p>
                This is also true for <M t="\ket{\smalleye}" /> and{" "}
                <M t="\ket{\wideye}" /> from the previous page.
              </p>
            </Prose>
          </Help>

          <Continue commit={f.happySadCorrectionCommit} />
        </Section>

        <Section
          commits={[
            happySadInnerProductCommit,
            isVisible(f.moodDisagreeVisible) && f.moodDisagreeCommit,
            isVisible(f.happySadVsSmallBigVisible) &&
              f.happySadVsSmallBigCommit,
            isVisible(f.happySadCorrectionVisible) &&
              f.happySadCorrectionCommit,
          ]}
        >
          <ContinueToNextPart
            link="../superpositions"
            commit={f.moodFinalCommit}
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
  { value: "happyket", label: <M t="\ket{\smiley}" /> },
  { value: "sadket", label: <M t="\ket{\frownie}" /> },
];

const moodChoices: SelectChoices<QuantumMouse["moodEigenvalues"]> = [
  {
    value: "kets",
    label: (
      <>
        <M t="\ket{\smiley}" /> and <M t="\ket{\frownie}" />
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
