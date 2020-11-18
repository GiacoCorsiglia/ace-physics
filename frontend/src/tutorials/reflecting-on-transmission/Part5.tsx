import React from "react";
import { ReflectingOnTransmission } from "src/common/tutorials";
import { Continue, Prose, Section } from "src/components";
import { FieldGroup, Select, TextArea } from "src/components/inputs";
import { choices } from "src/components/inputs/Select";
import { Content } from "src/components/layout";
import M from "src/components/M";
import { isSet } from "src/state";
import { ContinueToNextPart, Part, sectionComponents } from "../shared";
import {
  BarrierPotential,
  TransmissionReflectionBarrier,
  TransmissionReflectionWell,
  WellPotential,
} from "./figures";
import styles from "./Part5.module.scss";

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
      <Prose>Consider these potentials:</Prose>

      <div className={styles.table}>
        <div>
          <b>Well</b>
          <WellPotential />
        </div>
        <div>
          <b>Barrier</b>
          <BarrierPotential />
        </div>
      </div>

      <Prose>and these reflection/transmission graphs:</Prose>

      <div className={styles.table}>
        <div>
          <b>T/R #1</b>
          <TransmissionReflectionBarrier />
        </div>
        <div>
          <b>T/R #2</b>
          <TransmissionReflectionWell />
        </div>
      </div>

      <Continue commit={f.part5IntroCommit} label="Hmm…" />
    </Section>
  ),

  (f) => (
    <Section commits={f.part5IntroCommit}>
      <Prose>
        Using the dropdowns, select the matching reflection/transmission graph
        for each potential.
      </Prose>

      <FieldGroup grid className="margin-top-1">
        <Select
          field={f.wellPotential}
          label={
            <>
              Well potential <M t="\, \leftrightarrow" />
            </>
          }
          placeholder="Select matching reflection/transmission graph…"
          choices={choices(f.wellPotential)}
          allowOther={false}
        />

        <Select
          field={f.barrierPotential}
          label={
            <>
              Barrier potential <M t="\, \leftrightarrow" />
            </>
          }
          placeholder="Select matching reflection/transmission graph…"
          choices={choices(f.barrierPotential)}
          allowOther={false}
        />
      </FieldGroup>

      <TextArea
        field={f.graphMatchingExplain}
        label={<Prose>Explain your choices</Prose>}
      />

      <Continue
        commit={f.graphMatchingCommit}
        allowed={
          isSet(f.wellPotential) &&
          isSet(f.barrierPotential) &&
          isSet(f.graphMatchingExplain)
        }
      />
    </Section>
  ),

  (f) => (
    <Section commits={f.graphMatchingCommit}>
      <Prose>
        Consider the middle region <M t="|x|<a" /> in the “Barrier” graph:
      </Prose>

      <BarrierPotential />

      <TextArea
        field={f.changesInGeneralSolution}
        label={
          <Prose>
            What <strong>changes</strong> in the general form of the solution to
            Schrödinger’s equation if <M t="E < V_0" /> compared to when{" "}
            <M t="E > V_0" />?
          </Prose>
        }
      />

      <Continue
        commit={f.changesInGeneralSolutionCommit}
        allowed={isSet(f.changesInGeneralSolution)}
      />
    </Section>
  ),

  (f) => (
    <Section commits={f.changesInGeneralSolutionCommit}>
      <TextArea
        field={f.physicalScenarios}
        label={
          <Prose>
            Can you think of physical situations (classical and/or quantum) that
            correspond to <em>anything</em> shown above?
          </Prose>
        }
      />

      <Continue
        commit={f.physicalScenariosCommit}
        allowed={isSet(f.physicalScenarios)}
      />
    </Section>
  ),

  (f) => (
    <Section commits={f.physicalScenariosCommit}>
      <ContinueToNextPart commit={f.part5FinalCommit} />
    </Section>
  ),
]);
