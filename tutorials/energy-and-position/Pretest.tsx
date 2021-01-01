import { Continue, Prose, Section } from "@/design";
import { Content } from "@/design/layout";
import { Choice, DisableInputs, TextArea } from "@/inputs";
import { choices } from "@/inputs/Select";
import M from "@/math";
import { isSet, useFields } from "@/state";
import { EnergyAndPosition } from "common/tutorials";
import { PretestReminderSection, PretestSpiel } from "tutorials/pretests";
import { Part, useNextPartLink } from "tutorials/shared";

export default function Pretest() {
  const { pretest, ...c } = useFields(EnergyAndPosition);
  const f = pretest.properties;

  const firstPartLink = useNextPartLink();

  const trueFalse = choices(f.probUpZEqual, {
    true: "True",
    false: "False",
  });

  return (
    <Part label="Before You Start">
      <Content>
        <DisableInputs
          when={
            c.part1IntroCommit.value === true ||
            c.part2IntroCommit.value === true ||
            c.part3IntroCommit.value === true ||
            c.part4IntroCommit.value === true ||
            c.part5IntroCommit.value === true ||
            c.part6IntroCommit.value === true
          }
        >
          <Section first>
            <PretestSpiel />
          </Section>

          <Section noScroll>
            <Prose>
              Consider two spin–½ states. They are the same, except for a
              negative sign on the second term:
              <M
                display
                t="
                \begin{aligned}
                \ket{\psi_1} &= \frac{1}{2}\ket{\uparrow} + \frac{\sqrt{3}}{2}\ket{\downarrow} \\
                \ket{\psi_2} &= \frac{1}{2}\ket{\uparrow} - \frac{\sqrt{3}}{2}\ket{\downarrow}
                \end{aligned}
                "
              />
            </Prose>
            Consider the <em>True/False</em> questions below:
          </Section>

          <Section noScroll>
            <Choice
              field={f.probUpZEqual}
              choices={trueFalse}
              label={
                <Prose>
                  <em>True or false:</em> The probability(measuring <M t="Z" />{" "}
                  component of spin to be <M t="+\hbar/2" /> for state{" "}
                  <M t="\ket{\psi_1}" />) EQUALS the probability(measuring{" "}
                  <M t="Z" /> component of spin to be <M t="+\hbar/2" /> for
                  state <M t="\ket{\psi_2}" />)
                </Prose>
              }
            />
          </Section>

          <PretestReminderSection />

          <Section noScroll>
            <Choice
              field={f.probDownZEqual}
              choices={trueFalse}
              label={
                <Prose>
                  <em>True or false:</em> The probability(measuring <M t="Z" />{" "}
                  component of spin to be <M t="-\hbar/2" /> for state{" "}
                  <M t="\ket{\psi_1}" />) EQUALS the probability(measuring{" "}
                  <M t="Z" /> component of spin to be <M t="-\hbar/2" /> for
                  state <M t="\ket{\psi_2}" />)
                </Prose>
              }
            />
          </Section>

          <Section noScroll>
            <Choice
              field={f.probUpXEqual}
              choices={trueFalse}
              label={
                <Prose>
                  <em>True or false:</em> The probability(measuring <M t="X" />{" "}
                  component of spin to be <M t="+\hbar/2" /> for state{" "}
                  <M t="\ket{\psi_1}" />) EQUALS the probability(measuring{" "}
                  <M t="X" /> component of spin to be <M t="+\hbar/2" /> for
                  state <M t="\ket{\psi_2}" />)
                </Prose>
              }
            />
          </Section>

          <Section noScroll>
            <TextArea
              field={f.howToNormalizeWaveFunction}
              label={
                <Prose>
                  This may be a little tough to “type” in words, but do your
                  best. Briefly, how might you go about normalizing a wave
                  function <M t="\psi(x) = \braket{x|\psi}" />?
                </Prose>
              }
              minRows={4}
            />
          </Section>
        </DisableInputs>

        <Section noScroll>
          Thanks! That’s the end of the pretest, the tutorial starts on the next
          page.
          <Continue
            commit={c.pretestCommit}
            link={firstPartLink}
            allowed={isSet(pretest)}
            label="Submit and move on"
          />
        </Section>
      </Content>
    </Part>
  );
}
