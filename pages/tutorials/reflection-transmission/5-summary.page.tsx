import { Dropdown, LabelsLeft, M, Prose, TextBox } from "@/components";
import { cx } from "@/helpers/frontend";
import { page } from "@/tutorial";
import {
  BarrierPotential,
  TransmissionReflectionBarrier,
  TransmissionReflectionWell,
  WellPotential,
} from "./figures";
import setup from "./setup";
import styles from "./styles.module.scss";

export default page(setup, ({ section }) => ({
  name: "summary",
  label: "Summary",
  answers: "none",
  sections: [
    section({
      name: "summaryIntro",
      body: () => (
        <>
          <Prose>Consider these potentials…</Prose>

          <div className={cx(styles.table, styles.maxWidth)}>
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

          <div className={styles.tableStyles}>
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

          <LabelsLeft>
            <Dropdown
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
            />

            <Dropdown
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
            />
          </LabelsLeft>

          <TextBox
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

          <TextBox
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
        <TextBox
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
        <TextBox
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
