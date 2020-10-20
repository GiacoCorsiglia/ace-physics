import React from "react";
import { EnergyAndPosition } from "src/common/tutorials";
import { Continue, Prose, Section } from "src/components";
import { Content } from "src/components/layout";
import M from "src/components/M";
import { Axes, Bar, Plot, Tick } from "src/components/plots";
import { ContinueToNextPart, Part, sectionComponents } from "../shared";

export default function Part2() {
  return (
    <Part label="Energy Histogram">
      <Content>{sections}</Content>
    </Part>
  );
}
const sections = sectionComponents(EnergyAndPosition, [
  (f) => (
    <Section first>
      <Prose>
        The graph below is a particular visual representation of the the state{" "}
        <M t="\ket{\psi_A}" /> from the previous page. It shows information
        about the state <em>in the energy basis</em>.
      </Prose>

      <Plot
        width={560}
        height={320}
        scale={[560 / 6, 320 / 1.25]}
        origin={[1, 1]}
      >
        <Axes xLabel="E" />

        <Tick x={1} label="E_1" />
        <Tick x={2} label="E_2" />
        <Tick x={3} label="E_3" />
        <Tick x={4} label="E_4" />

        <Tick y={1 / Math.sqrt(2)} label="1/\sqrt{2}" />
        <Tick y={1 / Math.sqrt(3)} label="1/\sqrt{3}" />
        <Tick y={1 / Math.sqrt(6)} label="1/\sqrt{6}" />

        <Bar x={1} height={1 / Math.sqrt(2)} width={0.7} />
        <Bar x={2} height={1 / Math.sqrt(3)} width={0.7} />
        <Bar x={4} height={1 / Math.sqrt(6)} width={0.7} />
      </Plot>

      <Continue commit={f.part2IntroCommit} label="Got it" />
    </Section>
  ),

  (f) => (
    <Section commits={f.dotDotDotMeaningCommit}>
      <ContinueToNextPart commit={f.part1FinalCommit} />
    </Section>
  ),
]);
