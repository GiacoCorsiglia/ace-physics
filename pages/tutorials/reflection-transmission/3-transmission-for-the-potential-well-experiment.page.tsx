import { Image, M, Prose, Reminder, TextBox, Toggle } from "@/components";
import { page } from "@/tutorial";
import simBarrierSetupImg from "./assets/sim-barrier-setup.png";
import simPlaneWaveSettingImg from "./assets/sim-plane-wave-setting.png";
import simWellSetupImg from "./assets/sim-well-setup.png";
import { SymmetricWellPotential } from "./figures";
import setup from "./setup";

export default page(setup, ({ section, hint }) => ({
  name: "transmissionForThePotentialWellExperiment",
  label: "Transmission for the Potential Well: Experiment",
  answers: "none",
  sections: [
    section({
      name: "transmissionForThePotentialWellExperimentIntro",
      body: (
        <>
          <Prose>Here’s the symmetric potential well from part 1.</Prose>

          <SymmetricWellPotential />

          <Reminder>
            <M
              display
              t="
          V(x) =
          \begin{cases}
            0 & |x| > a \\
            -V_0 & |x| < a
          \end{cases}
          "
            />
          </Reminder>

          <Prose>
            Consider the transmission coefficient <M t="T" /> for this system.
          </Prose>
        </>
      ),
      continue: { label: "I’m considering…" },
    }),

    section({
      name: "wellPredictionsForT",
      body: (m) => (
        <TextBox
          model={m.wellPredictionsForT}
          label={
            <Prose>
              <p>
                Using physical arguments, but without carrying out calculations
                what can you predict qualitatively about <M t="T" />? Don't use
                the sim yet either!
              </p>

              <p>
                <em>
                  Consider different depths and widths of the well, and
                  different energies <M t="E" />. Consider “up” bumps instead of
                  wells, too.
                </em>
              </p>
            </Prose>
          }
          minRows={3}
        />
      ),
    }),

    section({
      name: "wellSimTestPredictions",
      body: (m) => (
        <>
          <TextBox
            model={m.wellSimTestPredictions}
            label={
              <Prose>
                Use the{" "}
                <a
                  href="https://phet.colorado.edu/sims/cheerpj/quantum-tunneling/latest/quantum-tunneling.html?simulation=quantum-tunneling"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  sim
                </a>{" "}
                to confirm (or challenge) some of your predictions/ideas.
                Indicate anything you tested that surprised you:
              </Prose>
            }
          />

          <Prose>
            <p>
              Your sim should look something like this for the potential well,
              although you’ll want to play around with the configuration!
            </p>

            <Image
              src={simWellSetupImg}
              alt="Sim setup showing a potential well"
            />

            <p>Also make sure you’re working with a plane wave:</p>

            <Image
              src={simPlaneWaveSettingImg}
              alt="Select the “plane wave” setting in the sim."
              maxWidth="204px"
            />
          </Prose>
        </>
      ),
    }),

    section({
      name: "wavelengthAfterTunneling",
      body: (m) => (
        <>
          <TextBox
            model={m.wavelengthAfterTunneling}
            label={
              <Prose>
                <p>
                  Suppose <M t="E \leq -V_0" />, meaning the “dip” is actually a
                  “bump.” This situation is referred to as{" "}
                  <strong>
                    <em>tunneling.</em>
                  </strong>
                </p>

                <p>
                  What happens to the wavelength of a plane wave after tunneling
                  through a barrier?
                </p>
              </Prose>
            }
          />
          <Prose>
            <p>Your sim should look something like this:</p>

            <Image
              src={simBarrierSetupImg}
              alt="Sim setup showing a potential barrier"
            />
          </Prose>
        </>
      ),
    }),

    section({
      name: "energyAfterTunneling",
      body: (m) => (
        <>
          <Toggle
            model={m.energyAfterTunneling}
            label={<Prose>Is energy lost after tunneling?</Prose>}
            choices={[
              ["lost", "Yes"],
              ["not lost", "No"],
              ["depends", "It depends"],
            ]}
          />

          <TextBox
            model={m.energyAfterTunnelingExplain}
            label={<Prose>Explain:</Prose>}
          />
        </>
      ),
    }),
  ],
}));
