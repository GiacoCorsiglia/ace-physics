import { Prose, Reminder } from "@/design";
import { TextArea, Toggle } from "@/inputs";
import M from "@/math";
import { Axes, Curve, Plot, Tick } from "@/plots";
import { page } from "@/tutorial";
import React from "react";
import setup from "./setup";

const psiB = (x: number) =>
  (1 / Math.sqrt(3)) * Math.sin(x) -
  (1 / Math.sqrt(2)) * Math.sin(2 * x) +
  (1 / Math.sqrt(6)) * Math.sin(4 * x);

export default page(setup, ({ section }) => ({
  name: "positionRepresentationB",
  label: {
    html: (
      <>
        Representing <M t="\ket{\psi_B}" /> in the Position Basis
      </>
    ),
    title: "Representing B in the Position Basis",
  },
  answers: "none",
  sections: [
    section({
      name: "positionRepresentationBIntro",
      body: (
        <>
          <Reminder>
            <M
              display
              t="
              \ket{\psi_B}
              = \frac{\sqrt{2}}{\sqrt{6}} \ket{E_1}
              - \frac{\sqrt{3}}{\sqrt{6}} \ket{E_2}
              + \frac{1}{\sqrt{6}} \ket{E_4}
              "
            />
          </Reminder>

          <Prose>
            The position representation (or wave function) of the state
            <M t="\ket{\psi_B}" /> from page 2 is given here:
          </Prose>

          <Plot
            width={360}
            height={320}
            scale={[360 / (Math.PI + 0.3), 320 / 3.2]}
            origin={[0.1, "center"]}
          >
            <Axes xLabel="x" yLabel="\psi_B(x)" />

            <Tick x={Math.PI} length={20} />

            <Curve f={psiB} from={0} to={Math.PI} />
          </Plot>
        </>
      ),
      continue: { label: "Looks Good" },
    }),

    section({
      name: "probDensB",
      body: (m) => (
        <>
          <Prose>
            Use Zoom’s “annotate” feature to very roughly sketch the probability
            density associated with <M t="\psi_B(x)" />. (Someone in your group
            should share their screen again.)
          </Prose>

          <Plot
            width={360}
            height={320}
            scale={[360 / (Math.PI + 0.3), 320 / 5]}
            origin={[0.1, "center"]}
          >
            <Axes
              xLabel="x"
              yLabel="|\psi_B(x)|^2,\,{\color{#999} \psi_B(x)}"
            />

            <Tick x={Math.PI} length={20} />

            <Curve f={psiB} stroke={"#ddd"} from={0} to={Math.PI} dotted />
          </Plot>

          <Prose>
            <p>
              <strong>Indicate on your graph</strong> where a particle described
              by <M t="\psi_B(x)" /> would be MOST likely to be found if you
              measured its position, and where it is LEAST likely to be found.
            </p>

            <p>
              <strong>Take a screenshot</strong> of your graph before you move
              on.
            </p>
          </Prose>
        </>
      ),
    }),

    section({
      name: "compareGraphs",
      body: (m) => (
        <>
          <TextArea
            model={m.compareGraphs}
            label={
              <Prose>
                Compare your graph, and the positions where the particle is most
                and least likely to be found, with what you got for{" "}
                <M t="\psi_A(x)" />. (I.e., compare your two screenshots). What
                is different now?
              </Prose>
            }
          />
        </>
      ),
    }),

    section({
      name: "psiBExpVal",
      body: (m) => (
        <>
          <Toggle
            model={m.psiBExpVal}
            label={
              <Prose>
                Where do you think the expectation value of position for state{" "}
                <M t="\psi_B(x)" /> will be?
              </Prose>
            }
            choices={[
              ["left", "Left of center"],
              ["center", "At the center"],
              ["right", "Right of center"],
            ]}
          />

          <TextArea model={m.psiBExpValExplain} label={<Prose>Why?</Prose>} />
        </>
      ),
    }),

    section({
      name: "psiBDifferentFromPsiAReflect",
      body: (m) => (
        <>
          <TextArea
            model={m.psiBDifferentFromPsiAReflect}
            label={
              <Prose>
                Previously, we asked you if the second particle (in state{" "}
                <M t="\ket{\psi_B}" />) was in the SAME state as{" "}
                <M t="\ket{\psi_A}" />, or if was it in a DIFFERENT state. Is
                your answer modified in any way at this point?
              </Prose>
            }
          />
        </>
      ),
    }),
  ],
}));
