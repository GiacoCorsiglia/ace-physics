import { Info, Prose } from "@/design";
import { TextArea } from "@/inputs";
import inputStyles from "@/inputs/inputs.module.scss";
import M from "@/math";
import { page } from "@/tutorial";
import { LinkExternalIcon, PencilIcon } from "@primer/octicons-react";
import { cx } from "linaria";
import { HowToUseTheSim } from "../spin-lab-1/shared";
import experimentalSetupImg from "./assets/experimental-setup.png";
import setup from "./setup";

export default page(setup, ({ section, hint }) => ({
  name: "exploration",
  label: "Exploration",
  answers: "none",
  sections: [
    section({
      name: "explorationIntro",
      body: (
        <Prose>
          <p>
            This tutorial is a bit different; it’s more like a lab. Instead of
            working through a set of conceptual questions, you’ll be using a
            simulation to get a sense of how spin-½ particles behave in magnetic
            fields.
          </p>

          <p>The tutorial’s only two pages, so take your time and explore. </p>
        </Prose>
      ),
      continue: { label: "Sounds fun, let’s get going" },
    }),

    section({
      name: "simSetup",
      body: (
        <>
          <Prose>
            <p>
              We’ll be using McIntyre's Spins Lab sim (the same one from the
              Spin Lab tutorials).
            </p>
          </Prose>

          <div className="text-center margin-top">
            <a
              className={cx(inputStyles.secondary, inputStyles.iconLast)}
              href="https://tinyurl.com/spin3220"
              target="_blank"
              rel="noreferrer noopener"
            >
              Open the sim
              <LinkExternalIcon />
            </a>
          </div>
          <Prose>
            <p>
              There is one element we haven’t investigated yet:{" "}
              <strong>a magnet</strong>. To get one to appear, break an existing
              line (click on the output port where the line starts). Start a{" "}
              <em>new</em> line and stop in empty space. Some options appear—
              <strong>add a magnet!</strong>
            </p>

            <p>
              Once on the screen, you can cycle through <M t="X" />, <M t="Y" />
              , <M t="Z" /> or <M t="\hat{n}" /> , or you can increment a
              counter (whose exact meaning we will figure out below).
            </p>

            <p>
              <strong>Start with the counter at 0!</strong>
            </p>
          </Prose>
        </>
      ),
      hints: [
        hint({
          name: "howToUseSim",
          body: <HowToUseTheSim />,
          label: "How do I edit the sim?",
        }),
      ],

      continue: { label: "I added a magnet" },
    }),

    section({
      name: "initialExploration",
      body: (m) => (
        <>
          <Prose>
            <p>Set up your sim to match this screenshot:</p>

            <img
              src={experimentalSetupImg}
              width="1332 "
              height="302"
              alt="Setup with the oven connected to X Stern-Gerlach analyzer, with the down port connected to a magnet oriented along the Z direction, connected to another X Stern-Gerlach analyzer, with both ports connected to counters."
            />

            <p>
              <strong>
                Starting with this experimental setup, play around to study the
                effect of this B-field on spins.
              </strong>{" "}
              You’re welcome to modify your setup as you explore!
            </p>

            <p>
              Be patient, explore carefully. Treat this like you were an
              experimentalist with lab equipment: try to be systematic and
              thoughtful about your initial investigations and data collection.
              Look for interesting patterns.
            </p>

            <Info>
              <Prose>
                <PencilIcon /> &nbsp; Keep notes with your data on a piece of
                paper!
              </Prose>
            </Info>

            <p>
              Hint: Make sure you click the “Reset” button in your sim between
              running different experiments.
            </p>
          </Prose>

          <TextArea
            model={m.initialExplorationSummary}
            label={
              <Prose>
                <strong>Summarize what you did and what you learned.</strong>
              </Prose>
            }
          />
        </>
      ),
    }),

    section({
      name: "incrementByOne",
      body: (m) => (
        <>
          <Prose>
            <p>One useful strategy is to:</p>

            <ol>
              <li>
                Start with the counter under the <M t="Z" /> at 0.
              </li>
              <li>Run 10k particles through the setup.</li>
              <li>Increment the counter by 1, then reset.</li>
              <li>Repeat and observe what changes.</li>
            </ol>
          </Prose>

          <TextArea
            model={m.incrementByOneSummary}
            label={
              <Prose>
                <strong>Summarize what you learn from this strategy.</strong>{" "}
                (If you already did this above, just say so and move on.)
              </Prose>
            }
          />
        </>
      ),
    }),

    section({
      name: "initialHypothesis",
      body: (m) => (
        <>
          <TextArea
            model={m.initialHypothesis}
            label={
              <Prose>
                Develop a descriptive hypothesis about how this field alters
                spin states. <strong>What is going on?</strong>
              </Prose>
            }
          />

          <Prose>
            <i>
              On the next page, you’ll refine your hypothesis and make it
              mathematical!
            </i>
          </Prose>
        </>
      ),
    }),
  ],
}));
