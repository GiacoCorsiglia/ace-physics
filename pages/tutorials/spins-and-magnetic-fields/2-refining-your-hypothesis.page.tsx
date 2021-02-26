import { Info, Prose } from "@/design";
import { FieldGroup, Integer, TextArea } from "@/inputs";
import M from "@/math";
import { page } from "@/tutorial";
import { PencilIcon } from "@primer/octicons-react";
import setup from "./setup";

export default page(setup, ({ section, hint }) => ({
  name: "refiningYourHypothesis",
  label: "Refining Your Hypothesis",
  answersChecked: "none",
  sections: [
    section({
      name: "refiningYourHypothesisIntro",
      body: (
        <Prose>
          <p>
            On this page you'll refine and quantify your hypothesis from the
            previous page and make it mathematical.
          </p>

          <p>
            Let’s refer to the number on the magnet element as <M t="M" />.
          </p>
        </Prose>
      ),
      continue: { label: "Let’s do it" },
    }),

    section({
      name: "derivedFormula",
      body: (m) => (
        <>
          <Info>
            <Prose>
              <PencilIcon /> &nbsp; You definitely want scrap paper for this
              part.
            </Prose>
          </Info>

          <TextArea
            model={m.derivedFormula}
            label={
              <Prose>
                <p>
                  Derive (from scratch) a formula predicting the probabilities
                  of whatever measurement you are doing, and then test it out
                  with the sim. Your formula should depend on <M t="M" />
                  somehow.
                </p>

                <p>Summarize your formula and thoughts here.</p>
              </Prose>
            }
          />

          <Prose>
            Make sure your formula matches the behavior you observed in the sim
            on the previous page.
          </Prose>
        </>
      ),
      hints: [
        [
          hint({
            name: "derivedFormulaProcedure",
            body: (
              <Prose>
                <p>Follow the procedures you recently learned in class.</p>

                <ol>
                  <li>What is the Hamiltonian?</li>
                  <li>What are the eigenstates of the Hamiltonian?</li>
                  <li>What is your starting state?</li>
                  <li>
                    What is your “ending” state after traveling for some time T
                    through a uniform magnetic field?
                  </li>
                  <li>
                    Given that ending state, compute the particular probability
                    you are interested in measuring!
                  </li>
                </ol>
              </Prose>
            ),
          }),

          hint({
            name: "whatIsTheHamiltonian",
            label: "The Hamiltonian?",
            body: (
              <Prose>
                To find the Hamiltonian, refer to your textbook’s sections on
                time dependence and spin precession.
              </Prose>
            ),
          }),
        ],
      ],
    }),

    section({
      name: "quantifyMagnetNumber",
      body: (m) => (
        <>
          <TextArea
            model={m.quantifyMagnetNumber}
            label={
              <Prose>
                Your hypothesis should quantify <M t="M" />, the number on the
                magnet element. What is <M t="M" /> telling us? What are the
                scale and units of this number?
              </Prose>
            }
          />

          <Prose>
            Use your hypothesis to calculate a value for <M t="M" /> that will
            convert spin down particles to be 100% spin up.
          </Prose>

          <FieldGroup grid className="margin-top-1">
            <Integer
              model={m.magnetNumberDownXToUpX}
              label={<M t="M_{\text{down} \to {up}} = " />}
            />
          </FieldGroup>

          <Prose>Test it out in the sim!</Prose>
        </>
      ),
    }),

    section({
      name: "additionalTests",
      body: (m) => (
        <>
          <TextArea
            model={m.additionalTests}
            label={
              <Prose>
                <p>
                  Further test your hypothesis by running a different
                  experiment.
                </p>
                <p>
                  Make a quantitative prediction first! This means use the 4th
                  postulate to predict some experiment, get a formula, run the
                  numbers, test it out.
                </p>

                <p>Describe the different setup and your prediction.</p>
              </Prose>
            }
          />

          <Prose>
            Does your formula work for this new experiment? If not, improve it!
          </Prose>
        </>
      ),
    }),
  ],
}));
