import {
  Callout,
  Decimal,
  Guidance,
  LabelsLeft,
  M,
  Prose,
  TextBox,
  TextLine,
} from "@/components";
import { page } from "@/tutorial";
import React from "react";
import repeatedMeasurementsSetupImg from "./assets/repeated-measurements-setup.png";
import setup from "./setup";
import { HowToUseTheSim } from "./shared";

export default page(setup, ({ section, oneOf, hint }) => ({
  name: "repeatedMeasurements",
  label: "Repeated Measurements",
  answers: "checked-some",
  sections: [
    section({
      name: "repeatedMeasurementsIntro",
      body: (
        <>
          <Prose>
            <p>
              Now set up an experiment to measure the spin projection{" "}
              <M t="S_z" /> along the z-axis twice in succession, as shown
              below. You need an extra analyzer and counter.
            </p>

            <img
              src={repeatedMeasurementsSetupImg}
              width={665}
              height={268}
              alt="Experimental setup described in the above text"
            />
          </Prose>
        </>
      ),
      continue: { label: "I set up the new experiment" },
      hints: [
        hint({
          name: "howToUseSim",
          body: <HowToUseTheSim />,
          label: "How do I edit the sim?",
        }),
      ],
    }),

    section({
      name: "repeatedMeasurementsRun",
      body: (
        <>
          <Prose>
            Run the new experiment, focusing your attention on the second
            analyzer. The input state is denoted <M t="\ket{+}" /> (do you see
            why?) and there are two possible output states, <M t="\ket{+}" />{" "}
            and <M t="\ket{−}" />.
          </Prose>
        </>
      ),
      continue: { label: "I ran the experiment" },
    }),

    section({
      name: "probUpUp",
      body: (m) => (
        <>
          <Prose>
            What is the probability that an atom entering the second analyzer
            <br /> (state <M t="\ket{\text{𝑖𝑛}} = \ket{+}" />) exits the spin up
            port (state <M t="\ket{\text{out}} = \ket{+}" />) of the second
            analyzer?
          </Prose>

          <LabelsLeft>
            <Decimal model={m.probUpUp} label="Probability =" />
          </LabelsLeft>

          <Callout color="neutral">
            This probability is denoted in general as{" "}
            <M t="P = |\braket{\text{out}|\text{in}}|^2" />, and specifically
            here as{" "}
            <M t="P = |\braket{\text{out}|\text{in}}|^2 = |\braket{+|+}|^2" />.
          </Callout>
        </>
      ),
    }),

    oneOf({
      which: (r) => {
        if (!r.probUpUp) {
          return null;
        } else if (r.probUpUp > 1 || r.probUpUp < 0) {
          return "probUpUpOver1";
        } else if (r.probUpUp !== 1) {
          return "probUpUpIncorrect";
        }
        return null;
      },
      sections: {
        probUpUpOver1: section({
          name: "probUpUpOver1",
          body: (
            <Guidance.Disagree>
              <p>
                Reminder: Probabilities are numbers between <M t="0" /> and
                <M t="1" />. (We usually don’t write them as percentages.)
              </p>

              <p>Change your answer above before moving on.</p>
            </Guidance.Disagree>
          ),
        }),

        probUpUpIncorrect: section({
          name: "probUpUpIncorrect",
          body: (
            <Guidance.Disagree>
              <p>
                You may want to take another look at your experiment and
                reconsider that probability.
              </p>

              <p>
                To clarify: we’re asking,{" "}
                <em>of the atoms entering the second analyzer</em>, what is the
                probability that it ends up at the topmost counter in the image
                above.
              </p>
            </Guidance.Disagree>
          ),
        }),
      },
    }),

    section({
      name: "probUpDown",
      body: (m) => (
        <>
          <Prose>
            What is the probability of exiting the spin down port of the second
            analyzer (state <M t="\ket{-}" />
            )?
          </Prose>

          <Prose>
            Write it <strong>in symbolic notation</strong> like we did above:
          </Prose>

          <LabelsLeft>
            <TextLine
              model={m.probUpDownDirac}
              label="Probability ="
              maxWidth
            />
          </LabelsLeft>

          <Prose>Also give the numerical result:</Prose>

          <LabelsLeft>
            <Decimal model={m.probUpDown} label="Probability =" />
          </LabelsLeft>
        </>
      ),
    }),

    section({
      name: "repeatedMeasurementsConclusions",
      body: (m) => (
        <>
          <TextBox
            model={m.repeatedMeasurementsConclusions}
            label={
              <Prose>
                What conclusions can you draw from the measurements performed in
                this experiment so far?
              </Prose>
            }
          />
        </>
      ),
    }),
  ],
}));
