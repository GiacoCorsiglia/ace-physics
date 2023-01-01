import * as s from "@/schema/tutorial";

const AnalyzerChoice = s.chooseOne(["X", "Y", "Z"]);
const AnalyzerComboChoice = s.chooseAll([
  "XX",
  "XY",
  "XZ",
  "YX",
  "YY",
  "YZ",
  "ZX",
  "ZY",
  "ZZ",
]);

const Vector = s.tuple(s.number(), s.number());

const uDiracChoice = s.chooseOne([
  "|x>",
  "|y>",
  "|u>",
  "<x|u>",
  "<y|u>",
  "<u|x>",
  "<u|y>",
]);

const vDiracChoice = s.chooseOne([
  "|x>",
  "|y>",
  "|v>",
  "<x|v>",
  "<y|v>",
  "<v|x>",
  "<v|y>",
]);

export default s.tutorial({
  pages: {
    threeAnalyzers: s.page(),
    aGivenState: s.page(),
    gettingUsedToDiracNotation: s.page(),
    operatorsAsMatrices: s.page(),
    challenge: s.page(),
  },
  pretest: {
    countDetector1: s.number(),
    countDetector1Explain: s.string(),
    canDeterminePsii: s.chooseOne(["yes", "no"]),
    canDeterminePsiiExplain: s.string(),
    normalizedV: Vector,
    rTimesVExplain: s.string(),
    doesREffectAllVectorsSame: s.chooseOne(["yes", "no"]),
    doesREffectAllVectorsSameExplain: s.string(),
  },
  posttest: {},
  sections: {
    threeAnalyzersIntro: s.section(),
    averageMinsMaxes: s.section(),
    setupForMaxA: s.section(),
    overMaxA: s.section(),
    setupForOtherMinsMaxes: s.section(),
    moreThanOneCombo: s.section(),
    psi2IfDetectorB50: s.section(),
    setupsIfDetectorB50: s.section(),
    setupsWhereABSame: s.section(),

    aGivenStateIntro: s.section(),
    predictionForPsi1Z: s.section(),
    experimentForPsi1Z: s.section(),
    predictionForPsi1X: s.section(),
    predictionForPsi1Y: s.section(),
    reflectPsi1: s.section(),

    gettingUsedToDiracNotationIntro: s.section(),
    normalizeUV: s.section(),
    uVColumns: s.section(),
    uVColumnsDirac: s.section(),

    operatorsAsMatricesIntro: s.section(),
    pTimesU: s.section(),
    pTimesV: s.section(),
    generalRuleP: s.section(),
    operatorQIntro: s.section(),
    qTimesU: s.section(),
    qTimesV: s.section(),
    generalRuleQ: s.section(),
    doPQCommute: s.section(),
    PQdonotcommute: s.section(),
    PQcommute: s.section(),

    challengeIntro: s.section(),
  },
  responses: {
    averageMinA: s.number(),
    averageMaxA: s.number(),
    averageMinB: s.number(),
    averageMaxB: s.number(),
    maxAi: AnalyzerChoice,
    maxAii: AnalyzerChoice,
    maxAExplain: s.string(),
    overMaxA: s.chooseOne(["yes", "no"]),
    overMaxAExplain: s.string(),
    minAi: AnalyzerChoice,
    minAii: AnalyzerChoice,
    maxBi: AnalyzerChoice,
    maxBii: AnalyzerChoice,
    minBi: AnalyzerChoice,
    minBii: AnalyzerChoice,
    moreThanOneCombo: s.chooseOne(["yes", "no"]),
    moreThanOneComboExplain: s.string(),
    psi2IfDetectorB50: s.chooseAll(["+z", "-z", "+x", "-x", "+y", "-y"]),
    setupsIfDetectorB50: AnalyzerComboChoice,
    setupsWhereABSame: AnalyzerComboChoice,
    setupsWhereABSameExplain: s.string(),

    psi1ProbUpZ: s.number(),
    psi1ProbDownZ: s.number(),
    psi1ProbUpX: s.number(),
    psi1ProbDownX: s.number(),
    psi1ProbUpY: s.number(),
    psi1ProbDownY: s.number(),
    reflectPsi1: s.string(),

    uNormalized: Vector,
    vNormalized: Vector,
    uColumn: Vector,
    vColumn: Vector,
    uColumnDirac: s.tuple(uDiracChoice, uDiracChoice),
    vColumnDirac: s.tuple(vDiracChoice, vDiracChoice),

    pTimesU: Vector,
    pTimesV: Vector,
    generalRuleP: s.string(),
    qTimesU: Vector,
    qTimesV: Vector,
    generalRuleQ: s.string(),
    doPQCommute: s.chooseOne(["do commute", "do not commute"]),
    doPQCommuteExplain: s.string(),

    challengeConclusion: s.tuple(s.string(false), s.string(false)),
    challengeProbabilityTable: s.object({
      spinUp: s.object({ x: s.number(), y: s.number(), z: s.number() }),
      spinDown: s.object({ x: s.number(), y: s.number(), z: s.number() }),
    }),
  },
  hints: {
    spinXVersusCartesianX: s.hint(),
  },
});
