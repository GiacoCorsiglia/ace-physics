import { Prose } from "@/design";
import { Decimal, TextArea, Toggle } from "@/inputs";
import inputStyles from "@/inputs/inputs.module.scss";
import M from "@/math";
import { page } from "@/tutorial";
import { LinkExternalIcon } from "@primer/octicons-react";
import { cx } from "linaria";
import spinZSetupImg from "./assets/spin-z-setup.png";
import setup from "./setup";

export default page(setup, ({ section, hint }) => ({
  name: "spinZExperiment",
  label: "A Spin-Z Experiment",
  sections: [
    section({
      name: "spinZIntro",
      body: (
        <>
          <Prose>
            For this tutorial, we’ll be using an online simulation. Launch it
            using the button below, then return to this tab and click to move
            on.
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
        </>
      ),
      continue: { label: "I opened the sim" },
    }),

    section({
      name: "spinZSetup",
      body: (
        <>
          <Prose>
            <p>
              In the sim, measure the spin projection <M t="S_z" /> along the
              z-axis. Each atom is measured to have spin up or spin down (in the
              z-direction), denoted by the arrows and by the <M t="\ket{+}" />{" "}
              and
              <M t="\ket{-}" /> symbols. The measured spin values for these
              cases are <M t="S_z = \pm \hbar/2" />.
            </p>

            <p>
              Run the experiment by clicking the green <strong>1</strong> button
              above the “Start” button, which sends one atom through the
              apparatus. Do this repeatedly so you can see the inherent
              randomness in the measurement process. Then run the experiment
              continuously by pressing the “Start” button.
            </p>

            <img
              src={spinZSetupImg}
              alt="Experimental setup described in the above text"
            />
          </Prose>
        </>
      ),
      continue: { label: "I’ve run the experiments" },
    }),

    section({
      name: "initialPredictions",
      body: (m) => (
        <>
          <Prose>
            From the above experiments and from what we have said in class…
          </Prose>

          <Toggle
            model={m.predictSingleOutcome}
            label={
              <Prose>
                Can you predict the spin measurement outcome when you sent a
                single atom in?
              </Prose>
            }
            choices={[
              ["yes", "Yes, I can"],
              ["no", "No, I cannot"],
            ]}
          />

          <Toggle
            model={m.predictExactNumbers}
            label={
              <Prose>
                Can you predict exact numbers going into the two output channels
                when you send many through?
              </Prose>
            }
            choices={[
              ["yes", "Yes, I can"],
              ["no", "No, I cannot"],
            ]}
          />

          <Decimal
            model={m.probSpinUp}
            label={
              <Prose>What is the probability for a spin-up measurement?</Prose>
            }
          />

          <Decimal
            model={m.probSpinDown}
            label={<Prose>And for spin-down?</Prose>}
          />

          <Prose>
            <em>To think about:</em> How confident are you in your answers?
          </Prose>
        </>
      ),
    }),

    section({
      name: "tenThousandSpins",
      body: (m) => (
        <>
          <Prose>
            Suppose you ran the Spins sim for 10,000 particles, and you observed
            4,950 “spin-up” and 5,050 “spin-down” counts.
          </Prose>

          <Toggle
            model={m.smallVariationFrom5050}
            label={
              <Prose>
                Would you argue that something funny is going on (perhaps the
                initial state has been prepared in a configuration that is NOT
                “50/50” after all?) Or would you simply call it a statistical
                fluke?
              </Prose>
            }
            choices={[
              ["funny", "Something funny"],
              ["in-between", "On the edge"],
              ["fluke", "Just a fluke"],
            ]}
          />

          <Toggle
            model={m.mediumVariationFrom5050}
            label={<Prose>What if it came out 4,800 “spin up”?</Prose>}
            choices={[
              ["funny", "Something funny"],
              ["in-between", "On the edge"],
              ["fluke", "Just a fluke"],
            ]}
          />

          <Toggle
            model={m.largeVariationFrom5050}
            label={<Prose>How about 4,000?</Prose>}
            choices={[
              ["funny", "Something funny"],
              ["in-between", "On the edge"],
              ["fluke", "Just a fluke"],
            ]}
          />

          <TextArea
            model={m.variationFrom5050Explain}
            label={<Prose>Explain your reasoning:</Prose>}
          />
        </>
      ),
      hints: [
        hint({
          name: "tenThousandSpins",
          label: "I need a hint",
          body: (
            <Prose>
              If you're not sure how to answer these questions, just make your
              best guess and move on! The next section should help you quantify
              your answers, and you can come back to edit this section if you
              want.
            </Prose>
          ),
        }),
      ],
    }),

    section({
      name: "quantitativeStdDev",
      body: (m) => (
        <>
          <Prose>
            <p>
              You may recall (perhaps from labs): when flipping a “fair” coin
              <M t="N" /> times, I expect to get on average <M t="N/2" /> heads,
              with a standard deviation <M t="\sigma" /> of order
              <M t="\sqrt{N}" />.
            </p>

            <p>
              Use this to quantitatively revisit your answers to the previous
              question. (Feel free to go back and edit your responses.)
            </p>
          </Prose>

          <TextArea
            model={m.quantitativeStdDev}
            label={<Prose>Explain if/how you adjusted your answers:</Prose>}
          />
        </>
      ),
    }),
  ],
}));
