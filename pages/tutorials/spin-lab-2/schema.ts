import * as f from "@/schema/fields";
import { tutorialSchema } from "@/schema/tutorial";

const AnalyzerChoice = f.chooseOne(["X", "Y", "Z"]);
const AnalyzerComboChoice = f.chooseAll([
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

const Vector = f.tuple(f.number(), f.number());

const uDiracChoice = f.chooseOne([
  "|x>",
  "|y>",
  "|u>",
  "<x|u>",
  "<y|u>",
  "<u|x>",
  "<u|y>",
]);

const vDiracChoice = f.chooseOne([
  "|x>",
  "|y>",
  "|v>",
  "<x|v>",
  "<y|v>",
  "<v|x>",
  "<v|y>",
]);

export default tutorialSchema({
  pages: [
    "threeAnalyzers",
    "aGivenState",
    "gettingUsedToDiracNotation",
    "operatorsAsMatrices",
    "challenge",
  ],
  pretest: {
    countDetector1: f.number(),
    countDetector1Explain: f.string(),
    canDeterminePsii: f.chooseOne(["yes", "no"]),
    canDeterminePsiiExplain: f.string(),
    normalizedV: Vector,
    rTimesVExplain: f.string(),
    doesREffectAllVectorsSame: f.chooseOne(["yes", "no"]),
    doesREffectAllVectorsSameExplain: f.string(),
  },
  sections: [
    "threeAnalyzersIntro",
    "averageMinsMaxes",
    "setupForMaxA",
    "overMaxA",
    "setupForOtherMinsMaxes",
    "moreThanOneCombo",
    "psi2IfDetectorB50",
    "setupsIfDetectorB50",
    "setupsWhereABSame",

    "aGivenStateIntro",
    "predictionForPsi1Z",
    "experimentForPsi1Z",
    "predictionForPsi1X",
    "predictionForPsi1Y",
    "reflectPsi1",

    "gettingUsedToDiracNotationIntro",
    "normalizeUV",
    "uVColumns",
    "uVColumnsDirac",

    "operatorsAsMatricesIntro",
    "pTimesU",
    "pTimesV",
    "generalRuleP",
    "operatorQIntro",
    "qTimesU",
    "qTimesV",
    "generalRuleQ",
    "doPQCommute",
    "PQdonotcommute",
    "PQcommute",

    "challengeIntro",
  ],
  responses: {
    averageMinA: f.number(),
    averageMaxA: f.number(),
    averageMinB: f.number(),
    averageMaxB: f.number(),
    maxAi: AnalyzerChoice,
    maxAii: AnalyzerChoice,
    maxAExplain: f.string(),
    overMaxA: f.chooseOne(["yes", "no"]),
    overMaxAExplain: f.string(),
    minAi: AnalyzerChoice,
    minAii: AnalyzerChoice,
    maxBi: AnalyzerChoice,
    maxBii: AnalyzerChoice,
    minBi: AnalyzerChoice,
    minBii: AnalyzerChoice,
    moreThanOneCombo: f.chooseOne(["yes", "no"]),
    moreThanOneComboExplain: f.string(),
    psi2IfDetectorB50: f.chooseAll(["+z", "-z", "+x", "-x", "+y", "-y"]),
    setupsIfDetectorB50: AnalyzerComboChoice,
    setupsWhereABSame: AnalyzerComboChoice,
    setupsWhereABSameExplain: f.string(),

    psi1ProbUpZ: f.number(),
    psi1ProbDownZ: f.number(),
    psi1ProbUpX: f.number(),
    psi1ProbDownX: f.number(),
    psi1ProbUpY: f.number(),
    psi1ProbDownY: f.number(),
    reflectPsi1: f.string(),

    uNormalized: Vector,
    vNormalized: Vector,
    uColumn: Vector,
    vColumn: Vector,
    uColumnDirac: f.tuple(uDiracChoice, uDiracChoice),
    vColumnDirac: f.tuple(vDiracChoice, vDiracChoice),

    pTimesU: Vector,
    pTimesV: Vector,
    generalRuleP: f.string(),
    qTimesU: Vector,
    qTimesV: Vector,
    generalRuleQ: f.string(),
    doPQCommute: f.chooseOne(["do commute", "do not commute"]),
    doPQCommuteExplain: f.string(),

    challengeConclusion: f.tuple(f.string(), f.string()),
    challengeProbabilityTable: f.object({
      spinUp: f.object({ x: f.number(), y: f.number(), z: f.number() }),
      spinDown: f.object({ x: f.number(), y: f.number(), z: f.number() }),
    }),
  },
  hints: ["spinXVersusCartesianX"],
});
