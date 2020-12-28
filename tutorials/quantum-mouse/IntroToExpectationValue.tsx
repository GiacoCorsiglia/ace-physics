import { isSet, needsHelp, useFields } from "@/state";
import { QuantumMouse } from "common/tutorials";
import {
  Continue,
  Help,
  HelpButton,
  Prose,
  Reminder,
  Section,
} from "components";
import {
  Decimal,
  FieldGroup,
  SelectChoices,
  TextArea,
  Toggle,
} from "components/inputs";
import { Content } from "components/layout";
import M from "components/M";
import { ContinueToNextPart, Part } from "tutorials/shared";

export default function IntroToExpectationValue() {
  const f = useFields(QuantumMouse);
  const {
    expValIntroCommit,

    weightedAverage,
    weightedAverageHelp,
    weightedAverageCommit,

    expValueMeasurability,
    expValueMeasurabilityExplain,
    expValueMeasurabilityCommit,

    naiveAvg,
  } = f;

  return (
    <Part label="Introducing the Expectation Value">
      <Content>
        <Section first>
          <Reminder>
            <Prose>
              <p>
                Small-eyed mice: &nbsp;{" "}
                <M t="\hat{S}\ket{\smalleye} = 1 \ket{\smalleye}" /> <br />
                Wide-eyed mice: &nbsp;{" "}
                <M t="\hat{S}\ket{\wideye} = 2 \ket{\wideye}" /> <br />
                Happy mice: &nbsp; <M t="\hat{M}\ket{\smiley}=\ket{\smiley}" />
                <br />
                Sad mice: &nbsp;{" "}
                <M t="\hat{M}\ket{\frownie}= -\ket{\frownie}" />
              </p>
              <M
                display
                t="\ket{\smalleye} = \frac{2}{\sqrt{5}} \ket{\smiley} - \frac{1}{\sqrt{5}} \ket{\frownie}"
              />

              <M
                display
                t="\ket{\wideye} = \frac{1}{\sqrt{5}} \ket{\smiley} + \frac{2}{\sqrt{5}} \ket{\frownie}"
              />
            </Prose>
          </Reminder>

          <Prose>
            Suppose you have a bunch of mice (this is technically a “mischief of
            mice”!) They have been treated well, we check their{" "}
            <M t="\hat{M}" /> values and sure enough—they are <em>all</em>{" "}
            happy.
          </Prose>

          <Continue commit={expValIntroCommit} label="Measure the mice" />
        </Section>

        <Section commits={[expValIntroCommit]}>
          <Prose>
            If you were to measure the <em>eye-size</em> of all the mice and
            average the results, what would you get?
          </Prose>

          <FieldGroup grid className="margin-top">
            <Decimal
              field={weightedAverage}
              label="Average eye size (in mm):"
            />
          </FieldGroup>

          {needsHelp(weightedAverageHelp) && (
            <Help>
              <Prose>
                In general, the average of a bunch of measurements that can have
                two outcomes is:
                <M
                  display
                  t="(\text{outcome 1}) \cdot \text{Prob}(outcome 1) + (\text{outcome 2}) \cdot \text{Prob}(outcome 2)"
                />
                because for <em>many</em> measurements the probability is like{" "}
                <M
                  display
                  t="(\text{Number of specific measurements})/(\text{total number})"
                />
              </Prose>
            </Help>
          )}

          <Continue
            commit={weightedAverageCommit}
            allowed={isSet(weightedAverage)}
          >
            <HelpButton help={weightedAverageHelp} />
          </Continue>
        </Section>

        <Section commits={[weightedAverageCommit]}>
          <Toggle
            field={expValueMeasurability}
            choices={expValueMeasurabilityChoices}
            label={
              <Prose>
                <p>
                  In quantum mechanics, the answer above is called the
                  “expectation value of <M t="\hat{S}" />
                  .” In the case above, do you expect to ever measure this
                  particular value, in any individual measurement?
                </p>
              </Prose>
            }
          />

          {/*
          Possible question i've asked in class: Is there ever a time when the EV will be a measured Value?
          */}

          <TextArea
            field={expValueMeasurabilityExplain}
            label={<Prose>Why or why not?</Prose>}
          />

          {needsHelp(f.expValueMeasurabilityHelp) && (
            <Help>
              <Prose>
                What are the options for measurement of eye size? Is the result
                to your calculation above one of them?
              </Prose>
            </Help>
          )}

          <Continue
            commit={expValueMeasurabilityCommit}
            allowed={isSet(f.expValueMeasurability)}
          >
            <HelpButton help={f.expValueMeasurabilityHelp} />
          </Continue>
        </Section>

        <Section commits={[weightedAverageCommit, expValueMeasurabilityCommit]}>
          <TextArea
            field={naiveAvg}
            label={
              <Prose>
                <p>
                  The “expectation value of <M t="\hat{S}" />” here is not
                  simply the naïve average of the two possible values you might
                  measure. That is, it’s not
                  <M t="(\text{value 1} + \text{value 2})/2" />.
                </p>

                <p>Why not?</p>

                <p>
                  Make intuitive sense of the result, given your interpretations
                  of the characters of small-eyed and large-eyed mice. Summarize
                  your thoughts below.
                </p>
              </Prose>
            }
          />
          {/*Maybe a hint with some student discussion/comparisons?
           */}

          {needsHelp(f.naiveAvgHelp) && (
            <Help>
              <Prose>
                When we do these calculations, we think about many measurements.
                What does the equation above suggest about the likelihood of
                measuring value 1 and value 2? Is this always the case?
              </Prose>
            </Help>
          )}

          <Continue
            commit={f.naiveAvgCommit}
            allowed={isSet(f.naiveAvg)}
            onClick={() => {
              if (f.expValueMeasurability.value?.selected === "Yes") {
                f.expValMeasurabilityCorrectionVisible.set(true);
              }
            }}
          >
            <HelpButton help={f.naiveAvgHelp} />
          </Continue>
        </Section>

        <Section
          commits={[f.naiveAvgCommit, f.expValMeasurabilityCorrectionVisible]}
        >
          <Help>
            <Prose>
              You may want to scroll up and reconsider the second question on
              this page.
            </Prose>
          </Help>

          <Continue commit={f.expValMeasurabilityCorrectionCommit} />
        </Section>

        <Section
          commits={[
            f.naiveAvgCommit,
            isSet(f.expValMeasurabilityCorrectionVisible) &&
              f.expValMeasurabilityCorrectionCommit,
          ]}
        >
          <ContinueToNextPart commit={f.expValFinalCommit} />
        </Section>
      </Content>
    </Part>
  );
}

const expValueMeasurabilityChoices: SelectChoices<
  QuantumMouse["expValueMeasurability"]
> = [
  { value: "Yes", label: "Yes" },
  { value: "No", label: "No" },
];
