import { Prose } from "@/design";
import { FieldGroup, Select, TextArea } from "@/inputs";
import M from "@/math/M";
import { page } from "@/tutorial";
import { css, cx } from "linaria";
import React from "react";
import {
  BarrierPotential,
  TransmissionReflectionBarrier,
  TransmissionReflectionWell,
  WellPotential,
} from "./figures";
import setup from "./setup";

export default page(setup, ({ section }) => ({
  name: "summary",
  label: "Summary",
  answersChecked: "none",
  sections: [
    section({
      name: "summaryIntro",
      body: () => (
        <>
          <Prose>Consider these potentials…</Prose>

          <div className={cx(tableStyles, maxWidth)}>
            <div>
              <b>Well</b>
              <WellPotential />
            </div>

            <div>
              <b>Barrier</b>
              <BarrierPotential />
            </div>
          </div>

          <Prose>…and these reflection/transmission graphs:</Prose>

          <div className={tableStyles}>
            <div>
              <b>T/R #1</b>
              <TransmissionReflectionBarrier />
            </div>

            <div>
              <b>T/R #2</b>
              <TransmissionReflectionWell />
            </div>
          </div>
        </>
      ),
    }),

    section({
      name: "graphMatching",
      body: (m) => (
        <>
          <Prose>
            Using the dropdowns, select the matching reflection/transmission
            graph for each potential.
          </Prose>

          <FieldGroup grid className="margin-top-1">
            <Select
              model={m.wellPotential}
              label={
                <>
                  Well potential <M t="\, \leftrightarrow" />
                </>
              }
              placeholder="Select matching reflection/transmission graph…"
              choices={[
                ["T/R #1", "T/R #1"],
                ["T/R #2", "T/R #2"],
              ]}
              allowOther={false}
            />

            <Select
              model={m.barrierPotential}
              label={
                <>
                  Barrier potential <M t="\, \leftrightarrow" />
                </>
              }
              placeholder="Select matching reflection/transmission graph…"
              choices={[
                ["T/R #1", "T/R #1"],
                ["T/R #2", "T/R #2"],
              ]}
              allowOther={false}
            />
          </FieldGroup>

          <TextArea
            model={m.graphMatchingExplain}
            label={<Prose>Explain your choices</Prose>}
          />
        </>
      ),
    }),

    section({
      name: "changesInGeneralSolution",
      body: (m) => (
        <>
          <Prose>
            Consider the middle region <M t="|x|<a" /> in the “Barrier” graph:
          </Prose>

          <BarrierPotential />

          <TextArea
            model={m.changesInGeneralSolution}
            label={
              <Prose>
                What <strong>changes</strong> in the general form of the
                solution to Schrödinger’s equation if <M t="E < V_0" /> compared
                to when <M t="E > V_0" />?
              </Prose>
            }
          />
        </>
      ),
    }),

    section({
      name: "physicalScenarios",
      body: (m) => (
        <TextArea
          model={m.physicalScenarios}
          label={
            <Prose>
              Can you think of physical situations (classical and/or quantum)
              that correspond to <em>anything</em> shown above?
            </Prose>
          }
        />
      ),
    }),

    section({
      name: "variationsInPhysicsFromSim",
      body: (m) => (
        <TextArea
          model={m.variationsInPhysicsFromSim}
          label={
            <Prose>
              If you have time, go back to the sim and make some more
              interesting wells (e.g., a “double well”). Can you find any
              variations in the physics?
            </Prose>
          }
        />
      ),
      continue: { allowed: () => true },
    }),
  ],
}));

const tableStyles = css`
  margin-top: 1rem;
  margin-bottom: 2rem;

  display: flex;
  justify-content: space-around;

  text-align: center;

  > :first-child {
    margin-right: 1rem;
  }

  svg {
    display: block;
    margin-top: 0 !important;
  }

  p {
    font-weight: $bold;
  }
`;

const maxWidth = css`
  svg {
    max-width: 16rem;
  }
`;
