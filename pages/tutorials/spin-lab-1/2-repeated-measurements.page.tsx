import { Help, Prose } from "@/design";
import { Decimal, FieldGroup, Text, TextArea } from "@/inputs";
import M from "@/math";
import { page } from "@/tutorial";
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
                break an existing line, click just left of where the line
                originates. To add a line, click and drag to an empty space, let
                go, then select the new element that you want. (We’re not using
                magnets yet.)
              </em>
            </p>

            <p>
              <em>
                To change the spin component you are measuring, click on the
                capital letter (X, Y, Z).
              </em>
            </p>

            <img
              src={repeatedMeasurementsSetupImg}
              alt="Experimental setup described in the above text"
            />
          </Prose>
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
          <Prose>
            What is the probability that an atom entering the second analyzer
            <br /> (state <M t="\ket{\text{𝑖𝑛}} = \ket{+}" />) exits the spin up
            port (state <M t="\ket{\text{out}} = \ket{+}" />) of the second
            analyzer?
          </Prose>

          <FieldGroup grid className="margin-top-1">
            <Decimal model={m.probUpUp} label="Probability =" />
          </FieldGroup>

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

    // Feedback here:
    // .5 for first => clarify what probability we're talking about.
    // 0 for first => (might be swapped) look at your experiment again; clarify again
    // No matter what, clarify experiment and tell them to run it again.
    // 100 => Probabilities are numbers between 0 and 1.
    // Adjust "we haven't checked any of your answers" button.

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

          <FieldGroup grid className="margin-top-1">
            <Text model={m.probUpDownDirac} label="Probability =" maxWidth />
          </FieldGroup>

          <Prose>Also give the numerical result:</Prose>

          <FieldGroup grid className="margin-top-1">
            <Decimal model={m.probUpDown} label="Probability =" />
          </FieldGroup>
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
