import * as s from "@/schema/tutorial";

const ReflectionAmountChoice = s.chooseOne(["all", "some", "none", "depends"]);

export default s.tutorial({
  pages: {
    symmetricPotentialWell: s.page(),
    transmissionCoefficients: s.page(),
    transmissionForThePotentialWellExperiment: s.page(),
    transmissionForThePotentialWellFormula: s.page(),
    summary: s.page(),
  },
  pretest: {
    reflectWhenEAboveVFromRight: ReflectionAmountChoice,
    reflectWhenEAboveVFromLeft: ReflectionAmountChoice,
    reflectWhenEBelowVFromLeft: ReflectionAmountChoice,
  },
  posttest: {},
  sections: {
    symmetricPotentialWellIntro: s.section(),
    unitsOfV0: s.section(),
    generalSolution: s.section(),
    generalSolutionConstraints: s.section(),
    fromRightNonzeroTerms: s.section(),
    fromRightNonzeroTermsGuidance: s.section(),

    transmissionCoefficientsIntro: s.section(),
    qualitativePredictionsForT: s.section(),
    simSetup: s.section(),
    simPatterns: s.section(),
    comparePredictionsWithSim: s.section(),

    transmissionForThePotentialWellExperimentIntro: s.section(),
    wellPredictionsForT: s.section(),
    wellSimTestPredictions: s.section(),
    wavelengthAfterTunneling: s.section(),
    energyAfterTunneling: s.section(),

    transmissionForThePotentialWellFormulaIntro: s.section(),
    unitsOflAndT: s.section(),
    tVersusEGraph: s.section(),
    tVersusA: s.section(),

    summaryIntro: s.section(),
    graphMatching: s.section(),
    changesInGeneralSolution: s.section(),
    physicalScenarios: s.section(),
    variationsInPhysicsFromSim: s.section(),
  },
  responses: {
    unitsOfV0: s.string(false),
    generalSolution: s.object({
      regionI: s.string(false),
      regionII: s.string(false),
      regionIII: s.string(false),
    }),
    fromRightNonzeroTerms: s.object({
      regionI: s.chooseAll(["leftward", "rightward"]),
      regionII: s.chooseAll(["leftward", "rightward"]),
      regionIII: s.chooseAll(["leftward", "rightward"]),
    }),
    generalSolutionNewSymbols: s.string(),
    generalSolutionConstraints: s.string(),
    generalSolutionPhysicalInterpretation: s.string(),

    qualitativePredictionsForT: s.string(),
    simPatterns: s.string(),
    comparePredictionsWithSim: s.string(),

    wellPredictionsForT: s.string(),
    wellSimTestPredictions: s.string(),
    wavelengthAfterTunneling: s.string(),
    energyAfterTunneling: s.chooseOne(["lost", "not lost", "depends"]),
    energyAfterTunnelingExplain: s.string(),

    unitsOfT: s.string(false),
    unitsOfl: s.string(false),
    tVersusALimits: s.string(),
    wellPotential: s.chooseOne(["T/R #1", "T/R #2"]),
    barrierPotential: s.chooseOne(["T/R #1", "T/R #2"]),
    graphMatchingExplain: s.string(),
    changesInGeneralSolution: s.string(),
    physicalScenarios: s.string(),
    variationsInPhysicsFromSim: s.string(),
  },
  hints: {
    qualitativePredictionsForT: s.hint(),
    simPatterns: s.hint(),
    tVersusEGraph: s.hint(),
  },
});
