import { Help, Info, Prose } from "@/design";
import { Decimal, FieldGroup, Text, TextArea } from "@/inputs";
import M from "@/math";
import { page } from "@/tutorial";
import repeatedMeasurementsSetupImg from "./assets/repeated-measurements-setup.png";
import setup from "./setup";

export default page(setup, ({ section, oneOf }) => ({
  name: "repeatedMeasurements",
  label: "A Spin-Z Experiment",
  answersChecked: "some",
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
                To break an existing line, click just left of where the line
                originates. To add a line to a new element, click and drag to an
                empty space, let go, then select the new element that you want.
                (We’re not using magnets yet.)
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
            <Info>
              <Prose>
                <p>
                  Reminder: Probabilities are numbers between <M t="0" /> and
                  <M t="1" />. (We usually don’t write them as percentages.)
                </p>

                <p>Change your answer above before moving on.</p>
              </Prose>
            </Info>
          ),
        }),

        probUpUpIncorrect: section({
          name: "probUpUpIncorrect",
          body: (
            <Info>
              <Prose>
                <p>
                  You may want to take another look at your experiment and
                  reconsider that probability.
                </p>

                <p>
                  To clarify: we’re asking,{" "}
                  <em>of the atoms entering the second analyzer</em>, what is
                  the probability that it ends up at the topmost counter in the
                  image above.
                </p>
              </Prose>
            </Info>
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
