import React from "react";
import { QuantumMouse } from "src/common/tutorials";
import { Continue, Help, HelpButton, Prose, Section } from "src/components";
import {
  FieldGroup,
  Select,
  SelectChoices,
  TextArea,
  Toggle,
} from "src/components/inputs";
import { Content } from "src/components/layout";
import M from "src/components/M";
import { isSet, needsHelp, useField } from "src/state";
import { Part } from "src/tutorials/shared";
import { ReactComponent as MouseBigEye } from "./svgs/mouse-big-eye.svg";
import { ReactComponent as MouseSmallEye } from "./svgs/mouse-small-eye.svg";

export default function WhatIsAQuantumMouse() {
  const introCommit = useField(QuantumMouse, "introCommit");

  const sizeEigenvalues = useField(QuantumMouse, "sizeEigenvalues");
  const sizeEigenvectors = useField(QuantumMouse, "sizeEigenvectors");
  const sizeEiegenHelp = useField(QuantumMouse, "sizeEigenHelp");
  const sizeCommit = useField(QuantumMouse, "sizeCommit");

  const hiddenUnits = useField(QuantumMouse, "hiddenUnits");
  const hiddenUnitsHelp = useField(QuantumMouse, "hiddenUnitsHelp");
  const hiddenUnitsCommit = useField(QuantumMouse, "hiddenUnitsCommit");

  const smallBigInnerProduct = useField(QuantumMouse, "smallBigInnerProduct");
  const smallBigInnerProductExplain = useField(
    QuantumMouse,
    "smallBigInnerProductExplain"
  );

  const smallBigInnerProductHelp = useField(
    QuantumMouse,
    "smallBigInnerProductHelp"
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
              <M t="\hat{S}" />
              <SmallEyeMouseKet />
              <M t="=\ 1" />
              <SmallEyeMouseKet />
              &nbsp;&nbsp;but&nbsp;&nbsp;
              <M t="\hat{S}" />
              <BigEyeMouseKet />
              <M t="=\ 2" />
              <BigEyeMouseKet />
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
              placeholder="Select eigenvalues…"
            />

            <Select
              field={sizeEigenvectors}
              choices={sizeChoices}
              label="Eigenvectors:"
              placeholder="Select eigenvectors…"
            />
          </FieldGroup>

          {needsHelp(sizeEiegenHelp) && (
            <Help>
              <Prose>
                Remember, eigen-equations usually look like:
                <M
                  display
                  t="(\text{operator}) (\text{eigenvector}) = (\text{eigenvalue}) \cdot (\text{eigenvector})"
                />
                This is still true even if there are mice involved!
              </Prose>
            </Help>
          )}

          <Continue
            commit={sizeCommit}
            label="Move on"
            allowed={isSet(sizeEigenvalues) && isSet(sizeEigenvectors)}
          >
            <HelpButton help={sizeEiegenHelp} />
          </Continue>
        </Section>

        <Section commits={[introCommit, sizeCommit]}>
          <Prose>Let's think some more about those eigen-equations.</Prose>

          <FieldGroup grid className="margin-top">
            <Toggle
              field={hiddenUnits}
              label="Do any numbers have “hidden” units?"
            />
          </FieldGroup>

          <Prose>
            If so, is that OK? Can you think of times we might have seen that
            before?
          </Prose>

          {needsHelp(hiddenUnitsHelp) && (
            <Help>
              <Prose>
                <p>
                  When we say “hidden units,” we mean are there any numbers in
                  the equations that have units that we haven't written down?
                </p>

                <p>
                  When a number has units, it usually corresponds with something
                  that can be physically measured.
                </p>
              </Prose>
            </Help>
          )}

          <Continue
            commit={hiddenUnitsCommit}
            label="Move on"
            allowed={isSet(hiddenUnits)}
          >
            <HelpButton help={hiddenUnitsHelp} />
          </Continue>
        </Section>

        <Section commits={[introCommit, sizeCommit, hiddenUnitsCommit]}>
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

          {needsHelp(smallBigInnerProductHelp) && (
            <Help>
              <Prose>
                Remember, we said they‘re <em>orthonormal!</em>
              </Prose>
            </Help>
          )}

          <Continue
            link="#todo"
            label="Move on to part 2"
            allowed={
              isSet(smallBigInnerProduct) && isSet(smallBigInnerProductExplain)
            }
          >
            <HelpButton help={smallBigInnerProductHelp} />
          </Continue>
        </Section>
      </Content>
    </Part>
  );
}

const sizeChoices: SelectChoices<QuantumMouse["sizeEigenvalues"]> = [
  {
    value: "kets",
    label: (
      <>
        <SmallEyeMouseKet /> and <BigEyeMouseKet />
      </>
    ),
  },
  {
    value: "value",
    label: (
      <>
        <M t="1" /> and <M t="2" />
      </>
    ),
  },
  {
    value: "operator",
    label: <M t="\hat{S}" />,
  },
];

const smallBigInnerProductChoices: SelectChoices<
  QuantumMouse["smallBigInnerProduct"]
> = [
  { value: "0", label: "0" },
  { value: "1", label: "1" },
  { value: "complex", label: "Some complex number, but not enough info" },
];

function SmallEyeMouseKet() {
  return (
    <>
      <M t="\large|" />
      <MouseSmallEye />
      <M t="\large\rangle" />
    </>
  );
}

function BigEyeMouseKet() {
  return (
    <>
      <M t="\large|" />
      <MouseBigEye />
      <M t="\large\rangle" />
    </>
  );
}
