import { LinkExternalIcon } from "@primer/octicons-react";
import React from "react";
import { ReflectingOnTransmission } from "src/common/tutorials";
import { Continue, Hint, Prose, Section } from "src/components";
import { TextArea } from "src/components/inputs";
import inputStyles from "src/components/inputs/inputs.module.scss";
import { Content } from "src/components/layout";
import M from "src/components/M";
import { isSet } from "src/state";
import { classes } from "src/util";
import { ContinueToNextPart, Part, sectionComponents } from "../shared";

export default function Part2() {
  return (
    <Part label="Transmission Coefficients">
      <Content>{sections}</Content>
    </Part>
  );
}

const sections = sectionComponents(ReflectingOnTransmission, [
  (f) => (
    <Section first>
      <Prose>Consider a single “step” (NOT a well), as shown here:</Prose>

      <Prose>TODO: Graph here</Prose>

      <Prose>
        Think about the transmission coefficient <M t="T" /> for this system
        (i.e., the probability that a particle entering from <M t="+\infty" />{" "}
        will travel into the region <M t="x < 0" />
        ).
      </Prose>

      <Continue commit={f.part2IntroCommit} label="I’m thinking…" />
    </Section>
  ),

  (f) => (
    <Section commits={f.part2IntroCommit}>
      <TextArea
        field={f.qualitativePredictionsForT}
        label={
          <Prose>
            <p>
              Using physical arguments,{" "}
              <strong>but without carrying out calculations</strong>, what might
              you predict purely qualitatively about <M t="T" />?
            </p>

            <p>Write down some ideas here:</p>
          </Prose>
        }
        minRows={4}
      />

      <Prose>
        <Hint>
          Consider different depths of the well, or even a “sign-flipped” step,
          and different energies <M t="E" />.
        </Hint>
      </Prose>

      <Continue
        commit={f.qualitativePredictionsForTCommit}
        allowed={isSet(f.qualitativePredictionsForT)}
      />
    </Section>
  ),

  (f) => (
    <Section commits={f.qualitativePredictionsForTCommit}>
      <Prose>
        <p>Let’s explore this scenario using a PhET simulation.</p>
      </Prose>

      <div className="text-center margin-top-1">
        <a
          className={classes(inputStyles.secondary, inputStyles.iconLast)}
          href="https://phet.colorado.edu/sims/cheerpj/quantum-tunneling/latest/quantum-tunneling.html?simulation=quantum-tunneling"
          target="_blank"
          rel="noreferrer noopener"
        >
          Open the “Quantum Tunneling” sim
          <LinkExternalIcon />
        </a>
      </div>

      <Prose>
        <p>Take some time to familiarize yourself with all the controls.</p>

        <p>
          Then, set up the sim so it looks like a singe “downstep,” as shown
          above.
        </p>
      </Prose>

      <Continue commit={f.simSetupCommit} />
    </Section>
  ),

  (f) => (
    <Section>
      <Prose>
        <p>
          The sim can calculate <M t="R" /> and <M t="T" /> for you (find the
          checkbox). Play around a bit, changing the energy and step size
          (depth). Feel free to let the “step” go down as well as up.
        </p>
      </Prose>

      <TextArea
        field={f.simPatterns}
        label={
          <Prose>
            Comment briefly on what patterns/general behavior you see:
          </Prose>
        }
        minRows={3}
      />

      <Prose>
        <Hint>
          How do you make <M t="R" /> smaller or larger? What happens to the{" "}
          wavelength of a plane wave after the “step” in potential?
        </Hint>
      </Prose>

      <Continue commit={f.simPatternsCommit} allowed={isSet(f.simPatterns)} />
    </Section>
  ),

  (f) => (
    <Section commits={f.simPatternsCommit}>
      <TextArea
        field={f.comparePredictionsWithSim}
        label={
          <Prose>
            Compare your initial predictions with the patterns you observed in
            the sim. Did anything “surprising” happen? (Anything you didn’t
            expect?)
          </Prose>
        }
      />

      <Continue
        commit={f.comparePredictionsWithSimCommit}
        allowed={isSet(f.comparePredictionsWithSim)}
      />
    </Section>
  ),

  (f) => (
    <Section commits={f.comparePredictionsWithSimCommit}>
      <ContinueToNextPart commit={f.part2FinalCommit} />
    </Section>
  ),
]);
