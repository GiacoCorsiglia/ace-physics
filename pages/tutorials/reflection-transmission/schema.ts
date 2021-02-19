import * as f from "@/schema/fields";
import { tutorialSchema } from "@/schema/tutorial";

const ReflectionAmountChoice = f.chooseOne(["all", "some", "none", "depends"]);

export default tutorialSchema({
  pages: [
    "symmetricPotentialWell",
    "transmissionCoefficients",
    "transmissionForThePotentialWellExperiment",
    "transmissionForThePotentialWellFormula",
    "summary",
  ],
  pretest: {
    reflectWhenEAboveVFromRight: ReflectionAmountChoice,
    reflectWhenEAboveVFromLeft: ReflectionAmountChoice,
    reflectWhenEBelowVFromLeft: ReflectionAmountChoice,
  },
  sections: [
    "symmetricPotentialWellIntro",
    "unitsOfV0",
    "generalSolution",
    "generalSolutionConstraints",

    "transmissionCoefficientsIntro",
    "qualitativePredictionsForT",
    "simSetup",
    "simPatterns",
    "comparePredictionsWithSim",

    "transmissionForThePotentialWellExperimentIntro",
    "wellPredictionsForT",
    "wellSimTestPredictions",
    "wavelengthAfterTunneling",
    "energyAfterTunneling",

    "transmissionForThePotentialWellFormulaIntro",
    "unitsOflAndT",
    "tVersusEGraph",
    "tVersusA",

    "summaryIntro",
    "graphMatching",
    "changesInGeneralSolution",
    "physicalScenarios",
    "variationsInPhysicsFromSim",
  ],
  responses: {
    unitsOfV0: f.string(),
    generalSolution: f.object({
      regionI: f.string(),
      regionII: f.string(),
      regionIII: f.string(),
    }),
    generalSolutionNewSymbols: f.string(),
    generalSolutionConstraints: f.string(),
    generalSolutionPhysicalInterpretation: f.string(),

    qualitativePredictionsForT: f.string(),
    simPatterns: f.string(),
    comparePredictionsWithSim: f.string(),

    wellPredictionsForT: f.string(),
    wellSimTestPredictions: f.string(),
    wavelengthAfterTunneling: f.string(),
    energyAfterTunneling: f.chooseOne(["lost", "not lost", "depends"]),
    energyAfterTunnelingExplain: f.string(),

    unitsOfT: f.string(),
    unitsOfl: f.string(),
    tVersusALimits: f.string(),
    wellPotential: f.chooseOne(["T/R #1", "T/R #2"]),
    barrierPotential: f.chooseOne(["T/R #1", "T/R #2"]),
    graphMatchingExplain: f.string(),
    changesInGeneralSolution: f.string(),
    physicalScenarios: f.string(),
    variationsInPhysicsFromSim: f.string(),
  },
  hints: [
    // Hints here.
    "qualitativePredictionsForT",
    "simPatterns",
    "tVersusEGraph",
  ],
});
