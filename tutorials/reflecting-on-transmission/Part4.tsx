import { Continue, Hint, Prose, Reminder, Section } from "@/design";
import { Content } from "@/design/layout";
import { FieldGroup, Text, TextArea } from "@/inputs";
import M from "@/math";
import { Axes, Plot } from "@/plots";
import { isSet } from "@/state";
import { ReflectingOnTransmission } from "common/tutorials";
import { ContinueToNextPart, Part, sectionComponents } from "tutorials/shared";

export default function Part4() {
  return (
    <Part label="Transmission for the Potential Well: Formula">
      <Content>{sections}</Content>
    </Part>
  );
}

const sections = sectionComponents(ReflectingOnTransmission, [
  (f) => (
    <Section first>
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
      </Prose>

      <Continue commit={f.part4IntroCommit} />
    </Section>
  ),

  (f) => (
    <Section commits={f.part4IntroCommit}>
      <Prose>
        What are the dimensions of <M t="T" />? What about <M t="l" />?
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
        </p>

        <p>
          <strong>Use Zoom’s annotation feature</strong> (or just sketch on
          paper if you’re working alone).
        </p>

        <p>
          Label the axes, what sets the scales? Label any interesting points.
        </p>
      </Prose>

      <Plot width={560} height={350} scale={100} origin={[0.5, 3.2]}>
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

      <Continue commit={f.tVersusEGraphCommit} label="I’m done sketching" />
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
            <M t="0 \leq E \ll V_0" />
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
      <ContinueToNextPart commit={f.part4FinalCommit} />
    </Section>
  ),
]);
