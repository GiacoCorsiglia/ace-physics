import * as f from "@/schema/fields";
import { tutorialSchema } from "@/schema/tutorial";

const diracLabelChoice = f.chooseOne([
  "<-4|psi>",
  "<-3|psi>",
  "<-2|psi>",
  "<-1|psi>",
  "<0|psi>",
  "<1|psi>",
  "<2|psi>",
  "<3|psi>",
  "<4|psi>",
]);

export default tutorialSchema({
  pages: [
    // Pages here.
    "aSpin4Particle",
    "aContinuousVariable",
  ],
  pretest: {
    // No pretest.
  },
  sections: [
    // Sections here.
    "aSpin4ParticleIntro",
    "spin4Colum",
    "spin4Histogram",
    "spin4ComponentsFeedback",
    "diracLabels",
    "diracLabelSelects",
    "diracLabelsFeedback",
    "spin4Normalization",
    "spin4Prob",

    "aContinuousVariableIntro",
    "originalPositionPlot",
    "addPoints",
    "halfInteger",
    "halfIntegerDiracNotation",
    "smoothing",
    "xiLabel",
    "xProb0or3",
    "xProbPositiveNegative",
    "waveFunction",
    "psiXasColumn",
  ],
  responses: {
    // A Spin 4 Particle.
    spin4Column: f.array(f.number()),
    spin4BarHeights: f.tuple(
      // 9 elements.
      f.number(),
      f.number(),
      f.number(),
      f.number(),
      f.number(),
      f.number(),
      f.number(),
      f.number(),
      f.number()
    ),
    minus3Dirac: f.string(),
    minus1Dirac: f.string(),
    plus4Dirac: f.string(),
    minus3DiracSelect: diracLabelChoice,
    minus1DiracSelect: diracLabelChoice,
    plus4DiracSelect: diracLabelChoice,
    spin4Normalization: f.string(),
    spin4ProbAsymmetric: f.chooseOne(["0", "2hbar", "equal"]),
    spin4ProbSymmetric: f.chooseOne(["2hbar", "-2hbar", "equal"]),
    spin4ProbPositiveNegative: f.chooseOne(["positive", "negative", "equal"]),

    // A Continuous Variable.
    originalPositionPlotSufficient: f.chooseOne(["yes", "no"]),
    halfIntegerPossibleMeasurements: f.string(),
    halfIntegerColumnElements: f.string(),
    halfIntegerBasisStates: f.string(),
    halfIntegerDiracNotation: f.string(),
    addMorePoints: f.boolean(),
    smooth: f.boolean(),
    smoothPossibleMeasurements: f.string(),
    smoothBasisStates: f.string(),
    xiLabel: f.string(),
    xProb0or3: f.chooseOne(["near 0", "near 3"]),
    xProb0or3Explain: f.string(),
    xProbPositiveNegative: f.chooseOne(["positive", "negative"]),
    xProbPositiveNegativeExplain: f.string(),
    psiXasColumn: f.string(),
  },
  hints: [
    // Hints here.
    "spin4HistogramTechDifficulties",
  ],
});
