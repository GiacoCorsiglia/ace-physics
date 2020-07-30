import React from "react";
import { QuantumMouse } from "src/common/tutorials";
import { Continue, Prose, Reminder, Section } from "src/components";
import { Select, SelectChoices, TextArea } from "src/components/inputs";
import { Content } from "src/components/layout";
import M from "src/components/M";
import { useField } from "src/state";
import { Part } from "src/tutorials/shared";

export default function IntroToExpectationValue() {
  const weightedAverageCommit = useField(QuantumMouse, "weightedAverageCommit");
  const expValueMeasurabilityCommit = useField(
    QuantumMouse,
    "expValueMeasurabilityCommit"
  );
  const naiveAvgCommit = useField(QuantumMouse, "naiveAvgCommit");
  const weightedAverage = useField(QuantumMouse, "weightedAverage");
  const expValueMeasurability = useField(QuantumMouse, "expValueMeasurability");
  const expValueMeasurabilityExplain = useField(
    QuantumMouse,
    "expValueMeasurabilityExplain"
  );
  const naiveAvg = useField(QuantumMouse, "naiveAvg");
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

          <TextArea
            field={weightedAverage}
            label={
              <Prose>
                <p>
                  Suppose you have a bunch of mice (this is technically a
                  “mischief of mice”!) They have been treated well, we check
                  their M values and sure enough - they are <em>all</em> happy.
                </p>
                <p>
                  If you were to measure the <em>eye-size</em> of all the mice
                  and average the results, what would you get?
                </p>
                <p>
                  <em>
                    Hint: in general, the average of a bunch of measurements
                    that can have two outcomes is (outcome 1)* Prob(outcome 1) +
                    (outcome 2) * Prob(outcome 2)
                  </em>
                </p>
              </Prose>
            }
          />

          <Continue commit={weightedAverageCommit} label="Move on" />
        </Section>

        <Section commits={[weightedAverageCommit]}>
          <Select
            field={expValueMeasurability}
            choices={expValueMeasurabilityChoices}
            label={
              <Prose>
                <p>
                  In QM, the answer above is called the “expectation value of{" "}
                  <M t="\hat{S}" />. In the case above, do you expect to ever
                  measure this particular value, in any individual measurement?
                </p>
              </Prose>
            }
          />
          <TextArea
            field={expValueMeasurabilityExplain}
            label={<Prose>Why or why not?</Prose>}
          />
          {/*why/whynot with a text box in addtion to the boolean*/}
          <Continue commit={expValueMeasurabilityCommit} label="Move on" />
        </Section>

        <Section commits={[weightedAverageCommit, expValueMeasurabilityCommit]}>
          <TextArea
            field={naiveAvg}
            label={
              <Prose>
                <p>
                  The “expectation value of <M t="\hat{S}" />” here is not
                  simply the naïve average, i.e. (value 1 + value 2)/2, of the
                  two possible values you might measure. Why not? Make intuitive
                  sense of the result, given your interpretations of the
                  characters of small-eyed and large-eyed mice.
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
