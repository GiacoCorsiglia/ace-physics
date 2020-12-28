import { isSet, useFields } from "@/state";
import { EPR } from "common/tutorials";
import { Continue, Prose, Section } from "components";
import { Choice, DisableInputs } from "components/inputs";
import { choices } from "components/inputs/Select";
import { Content } from "components/layout";
import M from "components/M";
import { PretestReminderSection, PretestSpiel } from "tutorials/pretests";
import { Part, useNextPartLink } from "tutorials/shared";
import Diagram from "./svgs/entangled-states.svg";

export default function Pretest() {
  const {
    pretest,
    pretestCommit,
    marbleIntroCommit,
    entangledIntroCommit,
    correlationIntroCommit,
    cryptographyIntroCommit,
    eavesdroppingIntroCommit,
  } = useFields(EPR);
  const f = pretest.properties;

  const firstPartLink = useNextPartLink();

  const answers = choices(f.aliceSpinUpX, {
    "+hbar/2": <M t="+\hbar/2" />,
    "-hbar/2": <M t="-\hbar/2" />,
    either: (
      <>
        Could be either <M t="\pm\hbar/2" />
      </>
    ),
    "not sure": "I’m not sure",
  });

  return (
    <Part label="Before You Start">
      <Content>
        <DisableInputs
          when={
            pretestCommit.value === true ||
            marbleIntroCommit.value === true ||
            entangledIntroCommit.value === true ||
            correlationIntroCommit.value === true ||
            cryptographyIntroCommit.value === true ||
            eavesdroppingIntroCommit.value === true
          }
        >
          <Section first>
            <PretestSpiel />
          </Section>

          <Section first>
            <Diagram className="svg-img" />

            <Prose>
              <p>
                Suppose we have two entangled spin-½ particles (A and B)
                described by the state:
                <M
                  display
                  t="\ket{\psi} = \frac{1}{\sqrt{2}} (\ket{\uparrow\downarrow} - \ket{\downarrow\uparrow})"
                />
              </p>

              <p>
                <strong>Every question asks the same thing:</strong> What was
                the outcome of Bob’s measurement?
              </p>

              <p>
                <strong>
                  For ALL questions, Bob orients his analyzer along the{" "}
                  <em>Z</em>-direction.
                </strong>
              </p>
            </Prose>
          </Section>

          <Section noScroll>
            <Choice
              field={f.aliceSpinUpX}
              choices={answers}
              label={
                <Prose>
                  GIVEN that Alice measured FIRST, oriented her analyzer along
                  the X-direction (Note: X, not Z), and measured{" "}
                  <M t="+\hbar/2" />, what did Bob measure?
                </Prose>
              }
            />
          </Section>

          <PretestReminderSection />

          <Section noScroll>
            <Choice
              field={f.aliceSpinUpZ}
              choices={answers}
              label={
                <Prose>
                  GIVEN that Alice measured FIRST, oriented her analyzer along
                  the Z-direction, and measured <M t="+\hbar/2" />, what did Bob
                  measure?
                </Prose>
              }
            />
          </Section>

          <Section noScroll>
            <Choice
              field={f.aliceSpinUpZAfter}
              choices={answers}
              label={
                <Prose>
                  GIVEN that Alice measured <strong>AFTER</strong> Bob, oriented
                  her analyzer along the Z-direction, and measured{" "}
                  <M t="+\hbar/2" />, what did Bob measure?
                </Prose>
              }
            />
          </Section>

          <Section noScroll>
            <Choice
              field={f.aliceNoMeasurement}
              choices={answers}
              label={
                <Prose>
                  GIVEN that Alice did not make any measurement at all, what did
                  Bob measure?
                </Prose>
              }
            />
          </Section>
        </DisableInputs>

        <Section noScroll>
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
