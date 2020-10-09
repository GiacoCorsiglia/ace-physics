import React from "react";
import { VectorsToFunctions } from "src/common/tutorials";
import { Continue, Prose, Section } from "src/components";
import { Decimal } from "src/components/inputs";
import { Content } from "src/components/layout";
import M from "src/components/M";
import VariableLengthColumn from "src/components/VariableLengthColumn";
import { isSet } from "src/state";
import { Part, sectionComponents } from "../shared";

export default function Spin4() {
  return (
    <Part label="Spin 4">
      <Content>{sections}</Content>
    </Part>
  );
}

const sections = sectionComponents(VectorsToFunctions, [
  (f) => (
    <Section first>
      <Prose>
        <p>Consider a spin-4 particle.</p>

        <p>
          The eigenstates of <M t="S_z" /> are written as{" "}
          <M t="\ket{4}\!,\ \ket{3}\!,\ \dots,\ \ket{-3}\!,\ \ket{-4}" />
        </p>
      </Prose>

      <Continue commit={f.spin4IntroCommit} label="Ok, got it" />
    </Section>
  ),
  (f) => (
    <Section commits={f.spin4IntroCommit}>
      <Prose>
        Suppose the spin-4 particle is in the state <M t="\ket{\psi_D}" />,
        which satisfies the following relationships:
        <M
          display
          t="\braket{4|\psi_D} = 0,\ \braket{3|\psi_D} = 7,\ \braket{n|\psi_D} = (16 - n^2)"
        />
        Write <M t="\ket{\psi_D}" /> as a column vector with numbers. (Don’t
        worry about normalization yet.)
      </Prose>

      <VariableLengthColumn
        field={f.spin4Column}
        inputEl={<Decimal field={f.spin4Column.elements[0]} />}
        labelTex="\ket{\psi_D}"
      />

      <Continue commit={f.spin4ColumCommit} allowed={isSet(f.spin4Column)} />
    </Section>
  ),
]);
