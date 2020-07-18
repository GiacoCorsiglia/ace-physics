import React from "react";
import { QuantumMouse } from "src/common/tutorials";
import { Prose, Section } from "src/components";
import { Choice, FieldGroup, SelectChoices } from "src/components/inputs";
import { Content } from "src/components/layout";
import M from "src/components/M";
import { useField } from "src/state";
import { Part } from "src/tutorials/shared";

export default function QuantumMood() {
  const possibleMoodEigenvalues = useField(
    QuantumMouse,
    "possibleMoodEigenvalues"
  );

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
