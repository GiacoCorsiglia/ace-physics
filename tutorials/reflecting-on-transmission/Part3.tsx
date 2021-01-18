import { Continue, Hint, Prose, Reminder, Section } from "@/design";
import { Content } from "@/design/layout";
import { TextArea, Toggle } from "@/inputs";
import { choices } from "@/inputs/Select";
import M from "@/math";
import { isSet } from "@/state";
import { ReflectingOnTransmission } from "common/tutorials";
import { ContinueToNextPart, Part, sectionComponents } from "tutorials/shared";
import { SymmetricWellPotential } from "./figures";

export default function Part3() {
  return (
    <Part label="Transmission for the Potential Well: Experiment">
      <Content>{sections}</Content>
    </Part>
  );
}

const sections = sectionComponents(ReflectingOnTransmission, [
  (f) => (
    <Section first>
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

      <Continue commit={f.part3IntroCommit} label="I’m considering…" />
    </Section>
  ),

  (f) => (
    <Section commits={f.part3IntroCommit}>
      <TextArea
        model={f.wellPredictionsForT}
        label={
          <Prose>
            Using physical arguments, but without carrying out calculations what
            can you predict qualitatively about <M t="T" />? Don't use the sim
            yet either!
          </Prose>
        }
        minRows={3}
      />

      <Prose>
        <Hint>
          Consider different depths and widths of the well, and different
          energies <M t="E" />. Consider “up” bumps instead of wells, too.
        </Hint>
      </Prose>

      <Continue
        commit={f.wellPredictionsForTCommit}
        allowed={isSet(f.wellPredictionsForT)}
      />
    </Section>
  ),

  (f) => (
    <Section commits={f.wellPredictionsForTCommit}>
      <TextArea
        model={f.wellSimTestPredictions}
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
            to confirm (or challenge) some of your predictions/ideas. Indicate
            anything you tested that surprised you:
          </Prose>
        }
      />

      <Continue
        commit={f.wellSimTestPredictionsCommit}
        allowed={isSet(f.wellSimTestPredictions)}
      />
    </Section>
  ),

  (f) => (
    <Section commits={f.wellSimTestPredictionsCommit}>
      <TextArea
        model={f.wavelengthAfterTunneling}
        label={
          <Prose>
            What happened to the wavelength of a plane wave after tunneling
            through a barrier?
          </Prose>
        }
      />

      <Continue
        commit={f.wavelengthAfterTunnelingCommit}
        allowed={isSet(f.wavelengthAfterTunneling)}
      />
    </Section>
  ),

  (f) => (
    <Section commits={f.wavelengthAfterTunnelingCommit}>
      <Toggle
        model={f.energyAfterTunneling}
        label={<Prose>Is energy lost after tunneling?</Prose>}
        choices={choices(f.energyAfterTunneling, {
          lost: "Yes",
          "not lost": "No",
          depends: "It depends",
        })}
      />

      <TextArea
        model={f.energyAfterTunnelingExplain}
        label={<Prose>Explain:</Prose>}
      />

      <Continue
        commit={f.energyAfterTunnelingCommit}
        allowed={
          isSet(f.energyAfterTunneling) && isSet(f.energyAfterTunnelingExplain)
        }
      />
    </Section>
  ),

  (f) => (
    <Section commits={f.energyAfterTunnelingCommit}>
      <ContinueToNextPart commit={f.part3FinalCommit} />
    </Section>
  ),
]);
