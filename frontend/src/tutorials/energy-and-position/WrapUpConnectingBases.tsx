import React from "react";
import { EnergyAndPosition } from "src/common/tutorials";
import { Prose, Section } from "src/components";
import { Content } from "src/components/layout";
import { Part, sectionComponents } from "../shared";

export default function WrapUpConnectingBases() {
  return (
    <Part label="Wrap Up: Connecting Bases">
      <Content>{sections}</Content>
    </Part>
  );
}
const sections = sectionComponents(EnergyAndPosition, [
  (f) => (
    <Section first>
      <Prose>INTRODUCTORY STUFF HERE.</Prose>

      {/* <Continue commit={f.positionIntroCommit} label="Sounds good" /> */}
    </Section>
  ),

  (f) => (
    <Section /** TODO: commits={f.positionIntroCommit} */>
      <Prose>FIRST QUESTION HERE</Prose>
    </Section>
  ),
]);
