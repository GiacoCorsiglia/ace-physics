import { Help, Prose, Reminder } from "@/design";
import { Decimal, FieldGroup, TextArea, Toggle } from "@/inputs";
import M from "@/math/M";
import { page } from "@/tutorial";
import setup from "./setup";

export default page(setup, ({ section, sequence, hint }) => ({
  name: "expectation-values",
  label: {
    title: "Introducing the Expectation Value",
    html: (
      <>
        Introducing the <em>Expectation Value</em>
      </>
    ),
  },
  sections: [
    section({
      name: "expValIntro",
      body: (
        <>
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
        </>
      ),
      continue: { label: "Measure the mice" },
    }),

    section({
      name: "weightedAverage",
      body: (m) => (
        <>
          <Prose>
            If you were to measure the <em>eye-size</em> of all the mice and
            average the results, what would you get?
          </Prose>

          <FieldGroup grid className="margin-top-1">
            <Decimal
              model={m.weightedAverage}
              label="Average eye size (in mm):"
            />
          </FieldGroup>
        </>
      ),
      hints: [
        hint({
          name: "weightedAverage",
          body: (
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
          ),
        }),
      ],
    }),

    section({
      name: "expValueMeasurability",
      body: (m) => (
        <>
          <Toggle
            model={m.expValueMeasurability}
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
            choices={[
              ["yes", "Yes"],
              ["no", "No"],
            ]}
          />

          <TextArea
            model={m.expValueMeasurabilityExplain}
            label={<Prose>Why or why not?</Prose>}
          />
        </>
      ),
      hints: [
        hint({
          name: "expValueMeasurability",
          body: (
            <Prose>
              What are the options for measurement of eye size? Is the result to
              your calculation above one of them?
            </Prose>
          ),
        }),
      ],
    }),

    section({
      name: "naiveAvg",
      body: (m) => (
        <TextArea
          model={m.naiveAvg}
          label={
            <Prose>
              <p>
                The “expectation value of <M t="\hat{S}" />” here is not simply
                the naïve average of the two possible values you might measure.
                That is, it’s not
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
      ),
      hints: [
        hint({
          name: "naiveAvg",
          body: (
            <Prose>
              When we do these calculations, we think about many measurements.
              What does the equation above suggest about the likelihood of
              measuring value 1 and value 2? Is this always the case?
            </Prose>
          ),
        }),
      ],
    }),

    section({
      name: "expValMeasurabilityCorrection",
      when: (r) => r.expValueMeasurability?.selected === "yes",
      body: (
        <Help>
          <Prose>
            You may want to scroll up and reconsider the second question on this
            page.
          </Prose>
        </Help>
      ),
    }),
  ],
}));
