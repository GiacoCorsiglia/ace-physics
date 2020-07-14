// import { QuantumMouse } from "ace-common/src/tutorials";
import React from "react";
import { QuantumMouse } from "src/common/tutorials";
import { Part, Prose, Question } from "src/components";
import {
  Integer,
  Select,
  SelectChoices,
  TextArea,
} from "src/components/inputs";
import { Content } from "src/components/layout";
import M from "src/components/M";
import { WithField } from "src/state";

export default function Part1() {
  return (
    <Content>
      <Part number={1}>
        What the Heck is a <em>Quantum Mouse</em>?
      </Part>

      <Prose>
        "Quantum mood", <M t="\hat{M}" />, is also Hermitian. The corresponding
        physical measurement is “look at the mouse's expression”, yielding
        either a smile, <M t="\text{mood} = +1" />, or frown,{" "}
        <M t="\text{mood} = -1" />.
      </Prose>

      <M
        display
        t="\hat{M} \ket{😸} = \ket{😸} \text{, but } \hat{M} \ket{😿} = -\ket{😿}"
      />

      <Prose>
        (Yes, we're using cat emojis here—there are no happy/sad mouse emojis!)
      </Prose>

      <Prose>
        Note: being happy or sad is again, orthonormal, and complete.
      </Prose>

      <Question label="c">
        What are the possible values of a measurement of <M t="\hat{M}" />?
      </Question>

      <WithField schema={QuantumMouse} name="possibleMoodMeasurements">
        {(field) => <TextArea field={field} className="full-text" />}
      </WithField>

      <Prose>
        Which symbols are the eigenvectors here, what are the eigenvalues, what
        are the operators?
      </Prose>

      <div>
        <div style={{ display: "flex" }}>
          <label>Eigenvalues:</label>
          <div style={{ marginLeft: "1rem", flexGrow: 1 }}>
            <WithField schema={QuantumMouse} name="moodEigenvalues">
              {(field) => (
                <Select
                  field={field}
                  choices={moodSelectChoices}
                  placeholder="Select eigenvalues..."
                />
              )}
            </WithField>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "" }}>
          <label>Eigenvectors:</label>
          <div style={{ marginLeft: "1rem", flexGrow: 1 }}>
            <WithField schema={QuantumMouse} name="moodEigenvectors">
              {(field) => (
                <Select
                  field={field}
                  choices={moodSelectChoices}
                  placeholder="Select eigenvectors..."
                />
              )}
            </WithField>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "" }}>
          <label>Operators:</label>
          <div style={{ marginLeft: "1rem", flexGrow: 1 }}>
            <WithField schema={QuantumMouse} name="moodOperators">
              {(field) => (
                <Select
                  field={field}
                  choices={moodSelectChoices}
                  placeholder="Select operators..."
                />
              )}
            </WithField>
          </div>
        </div>
      </div>

      <Question label="d">
        What is <M t="\braket{😸}{😿}" />?
      </Question>

      <div>
        <M t="\braket{😸}{😿} = " />
        &nbsp;
        <WithField schema={QuantumMouse} name="happySadInnerProduct">
          {(field) => <Integer field={field} />}
        </WithField>
      </div>

      <Prose>Why?</Prose>

      <WithField schema={QuantumMouse} name="happySadInnerProductExplain">
        {(field) => <TextArea field={field} className="full-text" />}
      </WithField>
    </Content>
  );
}

const moodSelectChoices: SelectChoices<QuantumMouse["moodEigenvalues"]> = [
  {
    value: "kets",
    label: (
      <span>
        <M t="\ket{😸}" /> and <M t="\ket{😿}" />
      </span>
    ),
  },
  {
    value: "value",
    label: (
      <span>
        <M t="1" /> and <M t="2" />
      </span>
    ),
  },
  {
    value: "operator",
    label: (
      <span>
        <M t="\hat{M}" />
      </span>
    ),
  },
];

const sizeSelectChoices: SelectChoices<QuantumMouse["sizeEigenvalues"]> = [
  {
    value: "kets",
    label: (
      <span>
        <M t="\ket{*}" /> and <M t="\ket{O}" />
      </span>
    ),
  },
  {
    value: "value",
    label: (
      <span>
        <M t="1" /> and <M t="2" />
      </span>
    ),
  },
  {
    value: "operator",
    label: (
      <span>
        <M t="\hat{S}" />
      </span>
    ),
  },
];
