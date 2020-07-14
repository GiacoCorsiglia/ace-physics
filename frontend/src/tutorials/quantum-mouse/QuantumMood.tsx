import React from "react";
import { QuantumMouse } from "src/common/tutorials";
import { Prose, Section } from "src/components";
import { FieldGroup, Select, SelectChoices } from "src/components/inputs";
import { Content } from "src/components/layout";
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
            <p>Turns out mice have feelings too</p>

            <p>What are the eigenvalues of the mood operator</p>
          </Prose>

          <FieldGroup grid className="margin-top">
            <Select
              field={possibleMoodEigenvalues}
              choices={possibleMoodEigenvalueChoices}
              label={"values"}
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
