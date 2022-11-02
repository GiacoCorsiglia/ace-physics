import * as s from "@/schema/tutorial";

const diracLabelChoice = s.chooseOne([
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

export default s.tutorial({
  pages: {
    aSpin4Particle: s.page(),
    aContinuousVariable: s.page(),
  },
  pretest: {
    // No pretest.
  },
  posttest: {},
  sections: {
    aSpin4ParticleIntro: s.section(),
    spin4Colum: s.section(),
    spin4Histogram: s.section(),
    spin4ComponentsFeedback: s.section(),
    diracLabels: s.section(),
    diracLabelSelects: s.section(),
    diracLabelsFeedback: s.section(),
    spin4Normalization: s.section(),
    spin4Prob: s.section(),

    aContinuousVariableIntro: s.section(),
    originalPositionPlot: s.section(),
    addPoints: s.section(),
    halfInteger: s.section(),
    halfIntegerDiracNotation: s.section(),
    smoothing: s.section(),
    xiLabel: s.section(),
    xProb0or3: s.section(),
    xProbPositiveNegative: s.section(),
    waveFunction: s.section(),
    psiXasColumn: s.section(),
  },
  responses: {
    // A Spin 4 Particle.
    spin4Column: s.array(s.number()),
    spin4BarHeights: s.tuple(
      // 9 elements.
      s.number(),
      s.number(),
      s.number(),
      s.number(),
      s.number(),
      s.number(),
      s.number(),
      s.number(),
      s.number()
    ),
    minus3Dirac: s.string(),
    minus1Dirac: s.string(),
    plus4Dirac: s.string(),
    minus3DiracSelect: diracLabelChoice,
    minus1DiracSelect: diracLabelChoice,
    plus4DiracSelect: diracLabelChoice,
    spin4Normalization: s.string(),
    spin4ProbAsymmetric: s.chooseOne(["0", "2hbar", "equal"]),
    spin4ProbSymmetric: s.chooseOne(["2hbar", "-2hbar", "equal"]),
    spin4ProbPositiveNegative: s.chooseOne(["positive", "negative", "equal"]),

    // A Continuous Variable.
    originalPositionPlotSufficient: s.chooseOne(["yes", "no"]),
    halfIntegerPossibleMeasurements: s.string(),
    halfIntegerColumnElements: s.string(),
    halfIntegerBasisStates: s.string(),
    halfIntegerDiracNotation: s.string(),
    addMorePoints: s.boolean(),
    smooth: s.boolean(),
    smoothPossibleMeasurements: s.string(),
    smoothBasisStates: s.string(),
    xiLabel: s.string(),
    xProb0or3: s.chooseOne(["near 0", "near 3"]),
    xProb0or3Explain: s.string(),
    xProbPositiveNegative: s.chooseOne(["positive", "negative"]),
    xProbPositiveNegativeExplain: s.string(),
    psiXasColumn: s.string(),
  },
  hints: {
    spin4HistogramTechDifficulties: s.hint(),
  },
});
