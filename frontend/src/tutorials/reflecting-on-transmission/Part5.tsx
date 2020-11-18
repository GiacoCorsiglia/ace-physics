import React from "react";
import { ReflectingOnTransmission } from "src/common/tutorials";
import { Continue, Prose, Section } from "src/components";
import { Content } from "src/components/layout";
import { ContinueToNextPart, Part, sectionComponents } from "../shared";
import {
  BarrierPotential,
  StepPotential,
  SymmetricWellPotential,
  TransmissionReflectionBarrier,
  TransmissionReflectionWell,
  WellPotential,
} from "./figures";

export default function Part5() {
  return (
    <Part label="Summary">
      <Content>{sections}</Content>
    </Part>
  );
}

const sections = sectionComponents(ReflectingOnTransmission, [
  (f) => (
    <Section first>
      <Prose>Ready to wrap things up?</Prose>

      <Continue commit={f.part5IntroCommit} label="I’m ready!" />
    </Section>
  ),

  (f) => (
    <Section commits={f.part5IntroCommit}>
      <StepPotential />
      <SymmetricWellPotential />
      <BarrierPotential />
      <WellPotential />
      <TransmissionReflectionBarrier />
      <TransmissionReflectionWell />
    </Section>
  ),

  (f) => (
    <Section commits={f.tVersusACommit}>
      <ContinueToNextPart commit={f.part5FinalCommit} />
    </Section>
  ),
]);
