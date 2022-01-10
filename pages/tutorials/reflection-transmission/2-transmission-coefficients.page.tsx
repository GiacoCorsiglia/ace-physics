import { Button, Image, Justify, M, Prose, TextBox } from "@/components";
import { page } from "@/tutorial";
import simSetupImg from "./assets/sim-setup.png";
import { StepPotential } from "./figures";
import setup from "./setup";

export default page(setup, ({ section, hint }) => ({
  name: "transmissionCoefficients",
  label: "Transmission Coefficients",
  answers: "none",
  sections: [
    section({
      name: "transmissionCoefficientsIntro",
      body: (
        <>
          <Prose>Consider a single “step” (NOT a well), as shown here:</Prose>

          <StepPotential />

          <Prose>
            Think about the transmission coefficient <M t="T" /> for this system
            (i.e., the probability that a quantum particle entering from{" "}
            <M t="+\infty" /> will travel into the region <M t="x < 0" />
            ).
          </Prose>
        </>
      ),
      continue: { label: "I’m thinking…" },
    }),

    section({
      name: "qualitativePredictionsForT",
      body: (m) => (
        <>
          <TextBox
            model={m.qualitativePredictionsForT}
            label={
              <Prose>
                <p>
                  Using physical arguments,{" "}
                  <strong>but without carrying out calculations</strong>, what
                  might you predict purely qualitatively about <M t="T" />?
                </p>

                <p>Write down some ideas here:</p>
              </Prose>
            }
            minRows={4}
          />

          <Prose>
            Consider different depths of the well, or even a “sign-flipped”
            step, and different energies <M t="E" />.
          </Prose>
        </>
      ),
    }),

    section({
      name: "simSetup",
      body: (m) => (
        <>
          <Prose>
            <p>Let’s explore this scenario using a PhET simulation.</p>
          </Prose>

          <Justify center>
            <Button
              link="https://phet.colorado.edu/sims/cheerpj/quantum-tunneling/latest/quantum-tunneling.html?simulation=quantum-tunneling"
              color="blue"
            >
              Open the “Quantum Tunneling” sim
            </Button>
          </Justify>

          <Prose>
            <p>Take some time to familiarize yourself with all the controls.</p>

            <p>
              Then, set up the sim so it looks like a single “downstep,” as
              shown above. It should look like this when you’re done:
            </p>

            <Image src={simSetupImg} alt="Screenshot of sim setup." />

            <p>
              <em>
                The big red arrows indicate which settings you need to change.
              </em>
            </p>
          </Prose>
        </>
      ),
      continue: { label: "I’m done setting up the sim" },
    }),

    section({
      name: "simPatterns",
      body: (m) => (
        <>
          <Prose>
            <p>
              The sim can calculate <M t="R" /> and <M t="T" /> for you (find
              the checkbox). Play around a bit, changing the energy and step
              size (depth). Feel free to let the “step” go down as well as up.
            </p>
          </Prose>

          <TextBox
            model={m.simPatterns}
            label={
              <Prose>
                Comment briefly on what patterns/general behavior you see:
              </Prose>
            }
            minRows={3}
          />
        </>
      ),
      hints: [
        hint({
          name: "simPatterns",
          body: (
            <Prose>
              How do you make <M t="R" /> smaller or larger? What happens to the
              wavelength of a plane wave after the “step” in potential?
            </Prose>
          ),
        }),
      ],
    }),
    section({
      name: "comparePredictionsWithSim",
      body: (m) => (
        <TextBox
          model={m.comparePredictionsWithSim}
          label={
            <Prose>
              Compare your initial predictions with the patterns you observed in
              the sim. Did anything “surprising” happen? (Anything you didn’t
              expect?)
            </Prose>
          }
        />
      ),
    }),
  ],
}));
