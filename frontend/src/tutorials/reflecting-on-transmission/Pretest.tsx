import React from "react";
import { ReflectingOnTransmission } from "src/common/tutorials";
import { Continue, Prose, Section } from "src/components";
import { Choice, DisableInputs } from "src/components/inputs";
import { choices } from "src/components/inputs/Select";
import { Content } from "src/components/layout";
import M from "src/components/M";
import { isSet, useFields } from "src/state";
import { PretestReminderSection, PretestSpiel } from "src/tutorials/pretests";
import { Part, useNextPartLink } from "src/tutorials/shared";
import { PretestStepPotential } from "./figures";

export default function Pretest() {
  const {
    pretest,
    pretestCommit,
    part1IntroCommit,
    part2IntroCommit,
    part3IntroCommit,
    part4IntroCommit,
    part5IntroCommit,
  } = useFields(ReflectingOnTransmission);
  const f = pretest.properties;

  const firstPartLink = useNextPartLink();

  const answers = choices(f.reflectWhenEAboveVFromLeft, {
    all: (
      <>
        <b>All</b>: 100% reflection
      </>
    ),
    some: (
      <>
        <b>Some</b>: partial reflection/partial transmision
      </>
    ),
    none: (
      <>
        <b>None</b>: 100% transmission
      </>
    ),
    depends: (
      <>
        <b>Depends</b>: impossible to state without knowing the values of
        <M t="E" /> and <M t="V_0" />
      </>
    ),
  });

  return (
    <Part label="Before You Start">
      <Content>
        <DisableInputs
          when={
            pretestCommit.value === true ||
            part1IntroCommit.value === true ||
            part2IntroCommit.value === true ||
            part3IntroCommit.value === true ||
            part4IntroCommit.value === true ||
            part5IntroCommit.value === true
          }
        >
          <Section first>
            <PretestSpiel />
          </Section>

          <Section noScroll>
            <Prose>
              <p>
                Consider just a single potential “step” (<em>not</em> a well).
                Particles are incident from <M t="+\infty" />,{" "}
                <strong>entering from the right</strong> with positive energy{" "}
                <M t="E > V_0" />, as shown:
              </p>
            </Prose>

            <PretestStepPotential incidentFrom="right" energy="E above V_0" />

            <Prose className="opacity-faded text-center">
              <M t="V=+V_0" /> for any <M t="x > 0" /> (all the way to infinity)
              <br />
              <M t="V=0" /> for any <M t="x < 0" /> (all the way to negative
              infinity)
            </Prose>

            <Choice
              field={f.reflectWhenEAboveVFromRight}
              label={
                <Prose>Will incoming particles “reflect” off this step?</Prose>
              }
              choices={answers}
              allowOther={false}
            />
          </Section>

          <PretestReminderSection />

          <Section noScroll>
            <Prose>
              Exactly as above, but now particles are incident from{" "}
              <M t="-\infty" />, <strong>entering from the left</strong> with
              positive energy <M t="E > V_0" />, as shown:
            </Prose>

            <PretestStepPotential incidentFrom="left" energy="E above V_0" />

            <Choice
              field={f.reflectWhenEAboveVFromLeft}
              label={
                <Prose>Will incoming particles “reflect” off this step?</Prose>
              }
              choices={answers}
              allowOther={false}
            />
          </Section>

          <Section noScroll>
            <Prose>
              Exactly as above, particles are incident from <M t="-\infty" />{" "}
              with positive energy <M t="0 < E <V_0" />, as shown:
            </Prose>

            <PretestStepPotential incidentFrom="left" energy="E below V_0" />

            <Choice
              field={f.reflectWhenEBelowVFromLeft}
              label={
                <Prose>Will incoming particles “reflect” off this step?</Prose>
              }
              choices={answers}
              allowOther={false}
            />
          </Section>
        </DisableInputs>

        <Section noScroll noLabel>
          <Continue
            commit={pretestCommit}
            link={firstPartLink}
            allowed={isSet(pretest)}
            label="Submit and move on"
          />
        </Section>
      </Content>
    </Part>
  );
}
