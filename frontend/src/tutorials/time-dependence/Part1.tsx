import React from "react";
import { TimeDependence } from "src/common/tutorials";
import { Continue, Prose, Section } from "src/components";
import { Content } from "src/components/layout";
import { Part, sectionComponents } from "../shared";

export default function Part1() {
  return (
    <Part label="TODO: NAME OF PART ONE">
      <Content>{sections}</Content>
    </Part>
  );
}

const sections = sectionComponents(TimeDependence, [
  (f) => (
    <Section first>
      <Prose>
        <p>A particle is in an infinite square well...</p>
      </Prose>

      <Continue commit={f.part1IntroCommit} />
    </Section>
  ),

  (f) => (
    <Section commits={f.part1IntroCommit}>
      <Prose>TODO: First question here.</Prose>
    </Section>
  ),
]);
