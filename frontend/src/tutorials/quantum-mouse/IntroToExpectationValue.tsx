import React from "react";
import { QuantumMouse } from "src/common/tutorials";
import {
  Continue,
  Help,
  HelpButton,
  Prose,
  Reminder,
  Section,
} from "src/components";
import {
  Decimal,
  FieldGroup,
  SelectChoices,
  TextArea,
  Toggle,
} from "src/components/inputs";
import { Content } from "src/components/layout";
import M from "src/components/M";
import { isSet, needsHelp, useFields } from "src/state";
import { Part } from "src/tutorials/shared";

export default function IntroToExpectationValue() {
  const {
    expValIntroCommit,

    weightedAverage,
    weightedAverageHelp,
    weightedAverageCommit,

    expValueMeasurability,
    expValueMeasurabilityExplain,
    expValueMeasurabilityCommit,

    naiveAvg,
    naiveAvgCommit,
  } = useFields(QuantumMouse);

  return (
    <Part label="Introducing the Expectation Value">
      <Content>
        <Section first>
          <Reminder>
            <Prose>
              <p>
                Small-eyed mice: &nbsp;{" "}
                <M t="\hat{S}\ket{\cdot} = 1 \ket{\cdot}" /> <br />
                Wide-eyed mice: &nbsp; <M t="\hat{S}\ket{*} = 2 \ket{*}" />{" "}
                <br />
                Happy mice: &nbsp; <M t="\hat{M}\ket{😸}=\ket{😸}" /> <br />
                Sad mice: &nbsp; <M t="\hat{M}\ket{😿}= -\ket{😿}" />
              </p>
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
              </Prose>
            </Help>
          )}

          <Continue
            commit={weightedAverageCommit}
            allowed={isSet(weightedAverage)}
            label="Move on"
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

          <TextArea
            field={expValueMeasurabilityExplain}
            label={<Prose>Why or why not?</Prose>}
          />

          <Continue commit={expValueMeasurabilityCommit} label="Move on" />
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
          {/*Maybe a hint with some student discussion/comparisons?*/}
          <Continue commit={naiveAvgCommit} label="Move on" />
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
