import React from "react";
import { ReflectingOnTransmission } from "src/common/tutorials";
import { Continue, Hint, Prose, Reminder, Section } from "src/components";
import { FieldGroup, Text, TextArea } from "src/components/inputs";
import { Content } from "src/components/layout";
import M from "src/components/M";
import { Axes, Plot } from "src/components/plots";
import { isSet } from "src/state";
import { ContinueToNextPart, Part, sectionComponents } from "../shared";

export default function Part3() {
  return (
    <Part label="Transmission for the Potential Well">
      <Content>{sections}</Content>
    </Part>
  );
}

const sections = sectionComponents(ReflectingOnTransmission, [
  (f) => (
    <Section first>
      <Prose>Here’s the symmetric potential well from part 1.</Prose>

      <Prose>TODO: Graph here</Prose>

      <Reminder>
        <M
          display
          t="
          V(x) =
          \begin{cases}
            0 & |x| > a \\
            -V_0 & |x| < a
          \end{cases}
          "
        />
      </Reminder>

      <Prose>
        Consider the transmission coefficient <M t="T" /> for this system.
      </Prose>

      <Continue commit={f.part3IntroCommit} label="I’m thinking…" />
    </Section>
  ),

  (f) => (
    <Section commits={f.part3IntroCommit}>
      <TextArea
        field={f.wellPredictionsForT}
        label={
          <Prose>
            Using physical arguments, but without carrying out calculations (or
            using the sim, yet!), what can you predict qualitatively about{" "}
            <M t="T" />?
          </Prose>
        }
        minRows={3}
      />

      <Prose>
        <Hint>
          Consider different depths and widths of the well, and different
          energies <M t="E" />. Consider “up” bumps instead of wells, too.
        </Hint>
      </Prose>

      <Continue
        commit={f.wellPredictionsForTCommit}
        allowed={isSet(f.wellPredictionsForT)}
      />
    </Section>
  ),

  (f) => (
    <Section commits={f.wellPredictionsForTCommit}>
      <TextArea
        field={f.wellSimTest}
        label={
          <Prose>
            Use the{" "}
            <a
              href="https://phet.colorado.edu/sims/cheerpj/quantum-tunneling/latest/quantum-tunneling.html?simulation=quantum-tunneling"
              target="_blank"
              rel="noreferrer noopener"
            >
              sim
            </a>{" "}
            to confirm (or challenge) some of your predictions/ideas. Indicate
            anything you tested that surprised you:
          </Prose>
        }
      />

      <TextArea
        field={f.wavelengthAfterTunneling}
        label={
          <Prose>
            What happened to the wavelength of a plane wave after tunneling
            through a barrier? (Is energy lost?)
          </Prose>
        }
      />

      <Continue
        commit={f.wellSimCommit}
        allowed={isSet(f.wellSimTest) && isSet(f.wavelengthAfterTunneling)}
      />
    </Section>
  ),

  (f) => (
    <Section commits={f.wellSimCommit}>
      <Prose>
        <p>
          The transmission coefficient for a (downward) well is equal to:
          <M
            display
            t="T = \frac{
            4 E (E + V_0)
            }{
              4 E (E + V_0) + V_0^2 \sin^2(2 l a)
            }"
          />
          where <M t="l = \sqrt{2 m (E + V_0)/\hbar^2}" />.{" "}
        </p>
        <p>(This is derived in McIntyre, for example.)</p>

        <p>
          What are the dimensions of <M t="T" />? What about <M t="l" />?
        </p>
      </Prose>

      <FieldGroup grid className="margin-top-1">
        <Text
          field={f.unitsOfT}
          label={
            <>
              <M t="T" />:
            </>
          }
        />
        <Text
          field={f.unitsOfl}
          label={
            <>
              <M t="l" />:
            </>
          }
        />
      </FieldGroup>

      <Continue
        commit={f.unitsOflAndTCommit}
        allowed={isSet(f.unitsOfT) && isSet(f.unitsOfl)}
      />
    </Section>
  ),

  (f) => (
    <Section commits={f.unitsOflAndTCommit}>
      <Prose>
        <p>
          Below, sketch the transmission coefficient as a function of energy.
          Use Zoom’s annotation feature.
        </p>

        <p>
          Label the axes, what sets the scales? Label any interesting points?
        </p>
      </Prose>

      <Plot width={560} height={350} scale={100} origin={["center", 3.2]}>
        <Axes yLabel="T" />
      </Plot>

      <Prose>
        <Hint>
          Think about ways to rewrite the equation to make it easier to sketch!
          You do NOT have to reproduce the “McIntyre plot” that we have shown in
          class—try to think of your own way.
        </Hint>
      </Prose>

      <Reminder>
        <Prose>
          <M
            display
            t="T = \frac{
            4 E (E + V_0)
            }{
              4 E (E + V_0) + V_0^2 \sin^2(2 l a)
            }"
          />
          where <M t="l = \sqrt{2 m (E + V_0)/\hbar^2}" />.
        </Prose>
      </Reminder>

      <Continue commit={f.tVersusEGraphCommit} />
    </Section>
  ),

  (f) => (
    <Section commits={f.tVersusEGraphCommit}>
      <Prose>
        <p>
          Now try sketching <M t="T" /> as a function of <M t="a" />, for two
          different values of <M t="E" />:
        </p>

        <ul>
          <li>
            Use <strong style={{ color: "red" }}>red</strong> for{" "}
            <M t="E \ll V_0" />
          </li>
          <li>
            Use <strong style={{ color: "blue" }}>blue</strong> for{" "}
            <M t="E \gg V_0" />
          </li>
        </ul>
      </Prose>

      <Plot width={560} height={350} scale={100} origin={[0.3, 3.2]}>
        <Axes yLabel="T" xLabel="a" />
      </Plot>

      <TextArea
        field={f.tVersusALimits}
        label={
          <Prose>
            Discuss any interesting limits—can you interpret anything
            physically?
          </Prose>
        }
      />

      <Reminder>
        <Prose>
          <M
            display
            t="T = \frac{
            4 E (E + V_0)
            }{
              4 E (E + V_0) + V_0^2 \sin^2(2 l a)
            }"
          />
          where <M t="l = \sqrt{2 m (E + V_0)/\hbar^2}" />.
        </Prose>
      </Reminder>

      <Continue commit={f.tVersusACommit} allowed={isSet(f.tVersusALimits)} />
    </Section>
  ),

  (f) => (
    <Section commits={f.tVersusACommit}>
      <ContinueToNextPart commit={f.part3FinalCommit} />
    </Section>
  ),
]);
