import React from "react";
import { QuantumMouse } from "src/common/tutorials";
import { Continue, Prose, Section } from "src/components";
import {
  Choice,
  FieldGroup,
  Select,
  SelectChoices,
} from "src/components/inputs";
import { Content } from "src/components/layout";
import M from "src/components/M";
import { useField } from "src/state";
import { Part } from "src/tutorials/shared";

export default function QuantumMood() {
  const possibleMoodEigenvalues = useField(
    QuantumMouse,
    "possibleMoodEigenvalues"
  );
  const moodEigenvaluesCommit = useField(QuantumMouse, "moodEigenvaluesCommit");
  const moodEigenvalues = useField(QuantumMouse, "moodEigenvalues");
  const moodEigenvectors = useField(QuantumMouse, "moodEigenvectors");
  const moodOperator = useField(QuantumMouse, "moodOperators");

  return (
    <Part label={<>Moody mice</>}>
      <Content>
        <Section first>
          <Prose>
            <p>
              Turns out mice have feelings too. The operator we will use for
              "quantum mood" is <M t="\hat{M}" />. This operator is also
              Hermitian. The corresponding physical measurement is "look at the
              mouse's expression," yielding either a smile (mood=+1) or frown
              (mood=-1). [Yes, we are using cat faces.]
            </p>

            <p className="text-center">
              <M display t="\hat{M}\ket{😸}=\ket{😸}" />{" "}
              &nbsp;&nbsp;and&nbsp;&nbsp;{" "}
              <M display t="\hat{M}\ket{😿}= -\ket{😿}" />.
            </p>

            <p>Note: Being happy or sad is again, orthonormal and complete.</p>

            <p>
              What are the possible values of a measurement of <M t="\hat{M}" />
              ?
            </p>
          </Prose>

          <FieldGroup grid className="margin-top">
            <Choice
              field={possibleMoodEigenvalues}
              choices={possibleMoodEigenvalueChoices}
              label={""}
            />
          </FieldGroup>

          <Continue commit={moodEigenvaluesCommit} label="Move on" />
        </Section>

        <Section commits={[moodEigenvaluesCommit]}>
          <Prose>
            Let's take some time to check in on the understanding of the
            representations.
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
              field={moodOperator}
              choices={moodChoices}
              label="Operator(s):"
              placeholder="Select operator..."
            />
          </FieldGroup>
        </Section>
      </Content>
    </Part>
  );
}

const possibleMoodEigenvalueChoices: SelectChoices<
  QuantumMouse["possibleMoodEigenvalues"]
> = [
  { value: "1", label: "1" },
  { value: "-1", label: "-1" },
  { value: "0", label: "Zero" },
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
