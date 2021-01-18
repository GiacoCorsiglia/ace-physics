import { Help, Prose } from "@/design";
import { Decimal, Text, TextArea } from "@/inputs";
import M from "@/math";
import { page } from "@/tutorial";
import React from "react";
import repeatedMeasurementsSetupImg from "./assets/repeated-measurements-setup.png";
import setup from "./setup";

export default page(setup, ({ section }) => ({
  name: "repeatedMeasurements",
  label: "A Spin-Z Experiment",
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

            <p>
              <em>
                Find icons near the top to add elements to your work space. To
                break a connecting line, hover your mouse near the left end of a
                line until the mouse icon becomes a double-headed arrow, then
                click. To add a line, click &amp; drag that new icon from start
                to end points.
              </em>
            </p>
          </Prose>

          <img
            src={repeatedMeasurementsSetupImg}
            alt="Experimental setup described in the above text"
          />
        </>
      ),
      continue: { label: "I set up the new experiment" },
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
          <Decimal
            model={m.probUpUp}
            label={
              <Prose>
                What is the probability that an atom entering the second
                analyzer (state <M t="\ket{\text{𝑖𝑛}} = \ket{+}" />) exits the
                spin up port (state <M t="\ket{\text{out}} = \ket{+}" />) of the
                second analyzer?
              </Prose>
            }
          />

          <Help>
            <Prose>
              This probability is denoted in general as{" "}
              <M t="P = |\braket{\text{out}|\text{in}}|^2" />, and specifically
              here as{" "}
              <M t="P = |\braket{\text{out}|\text{in}}|^2 = |\braket{+|+}|^2" />
              .
            </Prose>
          </Help>
        </>
      ),
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

          <Text
            model={m.probUpDownDirac}
            label={
              <Prose>Write it in symbolic notation like we did above:</Prose>
            }
            maxWidth
          />

          <Decimal
            model={m.probUpDown}
            label={<Prose>Also give the numerical result:</Prose>}
          />
        </>
      ),
    }),

    section({
      name: "repeatedMeasurementsConclusions",
      body: (m) => (
        <>
          <TextArea
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
