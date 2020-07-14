import React from "react";
import { QuantumMouse } from "src/common/tutorials";
import { Continue, Prose, Section } from "src/components";
import {
  FieldGroup,
  Select,
  SelectChoices,
  TextArea,
  Toggle,
} from "src/components/inputs";
import { Content } from "src/components/layout";
import M from "src/components/M";
import { isSet, useField } from "src/state";
import { Part } from "src/tutorials/shared";
import { ReactComponent as MouseBigEye } from "./svgs/mouse-big-eye.svg";
import { ReactComponent as MouseSmallEye } from "./svgs/mouse-small-eye.svg";

export default function WhatIsAQuantumMouse() {
  const introCommit = useField(QuantumMouse, "introCommit");

  const sizeEigenvalues = useField(QuantumMouse, "sizeEigenvalues");
  const sizeEigenvectors = useField(QuantumMouse, "sizeEigenvectors");
  const sizeCommit = useField(QuantumMouse, "sizeCommit");

  const hiddenUnits = useField(QuantumMouse, "hiddenUnits");
  const seenHiddenUnits = useField(QuantumMouse, "seenHiddenUnits");
  const unitsCommit = useField(QuantumMouse, "unitsCommit");

  const smallBigInnerProduct = useField(QuantumMouse, "smallBigInnerProduct");
  const smallBigInnerProductExplain = useField(
    QuantumMouse,
    "smallBigInnerProductExplain"
  );

  return (
    <Part
      label={
        <>
          What the heck is a <em>Quantum Mouse?</em>
        </>
      }
    >
      <Content>
        <Section first>
          <Prose>
            <p>
              Consider a quantum object (a <em>quantum mouse</em>) and some new
              properties we can measure. For example, suppose “eye size,”{" "}
              <M t="\hat{S}" />, is a Hermitian (observable) operator. The
              corresponding physical measurement is “measure the diameter of the
              pupil.”
            </p>

            <p>
              Interestingly, the scale reads either 1 mm (tiny eyes) or 2 mm
              (wide-eyed), but nothing else!
            </p>

            <p className="text-center">
              <M t="\hat{S}\large|" />
              <MouseSmallEye />
              <M t="\large\rangle =" />
              <M t="\ 1 \large|" />
              <MouseSmallEye />
              <M t="\large\rangle" />
              &nbsp;&nbsp;but&nbsp;&nbsp;
              <M t="\hat{S}\large|" />
              <MouseBigEye />
              <M t="\large\rangle =" />
              <M t="\ 2 \large|" />
              <MouseBigEye />
              <M t="\large\rangle" />
            </p>

            <p>
              That notation is a bit wacky, but it's allowed! That said, let's
              simplify the kets for smalled-eyed mice and big-eyed mice to{" "}
              <M t="\ket{\cdot}" /> and <M t="\ket{*}" />, respectively.
            </p>

            <p>
              Note: Being either small-eyed or wide-eyed is totally{" "}
              <em>normal</em>. In fact, let us assume it is <em>ortho</em>normal
              (and complete).
            </p>
          </Prose>

          <Continue commit={introCommit} label="Got it" />
        </Section>

        <Section commits={[introCommit]}>
          <Prose>
            <strong>Look at the eigen-equations above</strong>, and make sure
            you understand the notation. Which symbols are the eigenvalue(s),
            and which are the eigenvector(s)?
          </Prose>

          <FieldGroup grid className="margin-top">
            <Select
              field={sizeEigenvalues}
              choices={sizeChoices}
              label="Eigenvalues:"
              placeholder="Select eigenvalues..."
            />

            <Select
              field={sizeEigenvectors}
              choices={sizeChoices}
              label="Eigenvectors:"
              placeholder="Select eigenvectors..."
            />
          </FieldGroup>

          <Continue
            commit={sizeCommit}
            label="Move on"
            allowed={isSet(sizeEigenvalues) && isSet(sizeEigenvectors)}
          />
        </Section>

        <Section commits={[introCommit, sizeCommit]}>
          <FieldGroup grid>
            <Toggle
              field={hiddenUnits}
              label="Do any numbers have “hidden” units?"
            />

            <Toggle
              field={seenHiddenUnits}
              label="Is that ok? Have we ever seen that before?"
            />
          </FieldGroup>

          <Continue
            commit={unitsCommit}
            label="Move on"
            allowed={isSet(hiddenUnits) && isSet(seenHiddenUnits)}
          />
        </Section>

        <Section commits={[introCommit, sizeCommit, unitsCommit]}>
          <Prose>
            What can you say about the numerical value of{" "}
            <M t="\braket{\cdot}{*}" />?
          </Prose>

          <FieldGroup grid className="margin-top">
            <Select
              field={smallBigInnerProduct}
              choices={smallBigInnerProductChoices}
              label={<M t="\braket{\cdot}{*} = " />}
            />

            <TextArea field={smallBigInnerProductExplain} label="Explain:" />
          </FieldGroup>

          <Continue
            link="#todo"
            label="Move on to part 2"
            allowed={
              isSet(smallBigInnerProduct) && isSet(smallBigInnerProductExplain)
            }
          />
        </Section>
      </Content>
    </Part>
  );
}

const sizeChoices: SelectChoices<QuantumMouse["sizeEigenvalues"]> = [
  {
    value: "kets",
    label: (
      <span>
        <M t="\ket{\cdot}" /> and <M t="\ket{*}" />
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

const smallBigInnerProductChoices: SelectChoices<
  QuantumMouse["smallBigInnerProduct"]
> = [
  { value: "0", label: "0" },
  { value: "1", label: "1" },
  { value: "complex", label: "Some complex number, but not enough info" },
];
