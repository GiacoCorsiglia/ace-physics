import * as f from "@/schema/fields";
import { tutorialSchema } from "@/schema/tutorial";

export default tutorialSchema({
  pages: [
    // Pages here.
    "exploration",
    "refiningYourHypothesis",
  ],
  pretest: {
    whatHappensToSpinInMagneticField: f.chooseOne([
      "nothing",
      "rotates around z",
      "rotates towards z",
      "flips",
      "other",
    ]),
    whatHappensToSpinInMagneticFieldExplain: f.string(),
    orientationOfSpinExitingMagneticField: f.chooseOne([
      "return to original",
      "sticks with final orientation",
      "continues rotating",
      "other",
    ]),
    orientationOfSpinExitingMagneticFieldExplain: f.string(),
  },
  sections: [
    "explorationIntro",
    "simSetup",
    "initialExploration",
    "incrementByOne",
    "initialHypothesis",

    "refiningYourHypothesisIntro",
    "derivedFormula",
    "quantifyMagnetNumber",
    "additionalTests",
  ],
  responses: {
    initialExplorationSummary: f.string(),
    incrementByOneSummary: f.string(),
    initialHypothesis: f.string(),

    derivedFormula: f.string(),
    refinedHypothesis: f.string(),
    quantifyMagnetNumber: f.string(),
    magnetNumberDownXToUpX: f.number(),
    additionalTests: f.string(),
  },
  hints: [
    // Hints here.
    "howToUseSim",

    "derivedFormulaProcedure",
    "whatIsTheHamiltonian",
  ],
});
