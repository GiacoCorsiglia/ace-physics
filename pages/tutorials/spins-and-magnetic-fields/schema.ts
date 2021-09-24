import * as s from "@/schema/tutorial";

export default s.tutorial({
  pages: {
    exploration: s.page(),
    refiningYourHypothesis: s.page(),
  },
  pretest: {
    whatHappensToSpinInMagneticField: s.chooseOne([
      "nothing",
      "rotates around z",
      "rotates towards z",
      "flips",
      "other",
    ]),
    whatHappensToSpinInMagneticFieldExplain: s.string(),
    orientationOfSpinExitingMagneticField: s.chooseOne([
      "return to original",
      "sticks with final orientation",
      "continues rotating",
      "other",
    ]),
    orientationOfSpinExitingMagneticFieldExplain: s.string(),
  },
  sections: {
    explorationIntro: s.section(),
    simSetup: s.section(),
    initialExploration: s.section(),
    incrementByOne: s.section(),
    initialHypothesis: s.section(),

    refiningYourHypothesisIntro: s.section(),
    derivedFormula: s.section(),
    quantifyMagnetNumber: s.section(),
    additionalTests: s.section(),
  },
  responses: {
    initialExplorationSummary: s.string(),
    incrementByOneSummary: s.string(),
    initialHypothesis: s.string(),

    derivedFormula: s.string(),
    refinedHypothesis: s.string(),
    quantifyMagnetNumber: s.string(),
    magnetNumberDownXToUpX: s.number(),
    additionalTests: s.string(),
  },
  hints: {
    howToUseSim: s.hint(),

    derivedFormulaProcedure: s.hint(),
    whatIsTheHamiltonian: s.hint(),
  },
});
