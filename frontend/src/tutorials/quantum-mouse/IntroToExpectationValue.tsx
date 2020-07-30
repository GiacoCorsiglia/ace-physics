import React from "react";
import { QuantumMouse } from "src/common/tutorials";
import { Continue, Prose, Reminder, Section } from "src/components";
import { Content } from "src/components/layout";
import M from "src/components/M";
import { useField } from "src/state";
import { Part } from "src/tutorials/shared";

export default function IntroToExpectationValue() {
  const weightedAverageCommit = useField(QuantumMouse, "weightedAverageCommit");
  const expValueMeasureabilityCommit = useField(
    QuantumMouse,
    "expValueMeasurabilityCommit"
  );
  const naiveAvgCommit = useField(QuantumMouse, "naiveAvgCommit");

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
            <p>
              Suppose you have a bunch of mice (this is technically a “mischief
              of mice”!) They have been treated well, we check their M values
              and sure enough - they are <em>all</em> happy.
            </p>
            <p>
              If you were to measure the <em>eye-size</em> of all the mice and
              average the results, what would you get?
            </p>
            <p>
              <em>
                Hint: in general, the average of a bunch of measurements that
                can have two outcomes is (outcome 1)* Prob(outcome 1) + (outcome
                2) * Prob(outcome 2)
              </em>
            </p>
          </Prose>

          <Continue commit={weightedAverageCommit} label="Move on" />
        </Section>

        <Section commits={[weightedAverageCommit]}>
          <Prose>
            <p>
              In QM, the answer above is called the “expectation value of{" "}
              <M t="\hat{S}" />. In the case above, do you expect to ever
              measure this particular value, in any individual measurement?
            </p>
          </Prose>
          {/*why/whynot with a text box in addtion to the boolean*/}
          <Continue commit={expValueMeasureabilityCommit} label="Move on" />
        </Section>

        <Section
          commits={[weightedAverageCommit, expValueMeasureabilityCommit]}
        >
          <Prose>
            <p>
              The “expectation value of <M t="\hat{S}" />” here is not simply
              the naïve average, i.e. (value 1 + value 2)/2, of the two possible
              values you might measure. Why not? Make intuitive sense of the
              result, given your interpretations of the characters of small-eyed
              and large-eyed mice.
            </p>
          </Prose>
          {/*textbox. Maybe a hint with some student discussion/comparisons?*/}
          <Continue commit={naiveAvgCommit} label="Move on" />
        </Section>
      </Content>
    </Part>
  );
}
