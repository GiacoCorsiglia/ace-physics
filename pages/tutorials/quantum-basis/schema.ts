import * as f from "@/schema/fields";
import { tutorialSchema } from "@/schema/tutorial";

const Point2D = f.tuple(f.number(), f.number());

const uColumnDiracChoice = f.chooseOne([
  "|i>",
  "|j>",
  "|u>",
  "<i|u>",
  "<j|u>",
  "<u|i>",
  "<u|j>",
]);

const kColumnDiracChoice = f.chooseOne([
  "|v1>",
  "|v2>",
  "<v1|u>",
  "<v2|u>",
  "<i|u>",
  "<j|u>",
]);

const HeightChoice = f.chooseOne([
  "3/5",
  "-3/5",
  "4/5",
  "-4/5",
  "9/25",
  "-9/25",
  "16/25",
  "-16/25",
]);

const LabelChoice = f.chooseOne([
  "|->",
  "|+>",
  "<-|psi_A>",
  "<+|psi_A>",
  "|<-|psi_A>|^2",
  "|<+|psi_A>|^2",
]);

const PlusMinus = f.object({
  minusHeight: HeightChoice,
  plusHeight: HeightChoice,
  minusLabel: LabelChoice,
  plusLabel: LabelChoice,
});

export default tutorialSchema({
  pages: [
    "probabilityAndProjection",
    "definingBasis",
    "changingBasis",
    "relatingBases",
    "wrapUp",
  ],
  pretest: {
    meaningOfCoefficients: f.string(),
    coBExpression: f.chooseAll([
      "x-subscripts",
      "projection (correct)",
      "probability coefficients",
      "x<+|+> coefficients",
      "just inner products",
    ]),
    changedProbabilities: f.chooseOne(["true", "false"]),
    cantKnowBothProbabilities: f.chooseOne(["true", "false"]),
    createdNewState: f.chooseOne(["true", "false"]),
  },
  sections: [
    "probabilityAndProjectionIntro",
    "meaningOfCoefficients",
    "histogramHeights",
    "histogramLabels",
    "relationshipProbAmp",

    "definingBasisIntro",
    "iAndJFormBasis",
    "iAndJSpan",
    "iAndJFeedback",
    "uColumn",
    "uColumnDirac",
    "uColumnDiracKet",
    "uColumnDiracCorrect",
    "uColumnDiracConjugate",
    "uColumnDiracReversed",
    "uColumnDiracRepeated",
    "uColumnDiracGeneralIncorrect",
    "innerProductMeaning",

    "changingBasisIntro",
    "basisChangeApproach",
    "kColumnDirac",
    "kColumnDiracCorrect",
    "kColumnDiracReversed",
    "kColumnDiracRepeated",
    "kColumnDiracKet",
    "kColumnDiracIorJ",
    "columnSubscriptExplain",
    "basisChange",
    "v1v2AxesAllowed",
    "v1v2AxesAllowedCorrection",
    "kColumn",
    "kColumnIncorrect",
    "kColumnReversed",
    "kColumnCorrect",

    "relatingBasesIntro",
    "uAndKGraph",
    "uAndKRelationship",
    "newNameNecessary",
    "uVsKFeedback",
    "meaningOfCoB",
    "equalityAllowed",
    "whyNoSubscriptNeeded",
    "equalityAllowedFeedback",

    "wrapUpIntro",
    "positionCoord",
    "potentialEnergyCoord",
    "coordEffect",
    "xBasisRewrite",
    "basisChoice",
    "effectOfCoB",
    "whyCoB",
  ],
  responses: {
    meaningOfCoefficients: f.chooseAll([
      "normalized",
      "measurement-outcomes",
      "probabilities-direct",
      "probabilities-squared",
    ]),
    probability: PlusMinus,
    probabilityAmplitude: PlusMinus,
    relationshipProbAmp: f.string(),

    iAndJFormBasis: f.chooseOne(["yes", "no"]),
    iAndJFormBasisExplain: f.string(),
    iAndJSpan: f.chooseOne(["yes", "no"]),
    uColumn: Point2D,
    uColumnDirac: f.tuple(uColumnDiracChoice, uColumnDiracChoice),
    innerProductMeaning: f.string(),

    basisChangeApproach: f.string(),
    kColumnDirac: f.tuple(kColumnDiracChoice, kColumnDiracChoice),
    columnSubscriptExplain: f.string(),
    v1v2AxesAllowed: f.chooseOne(["yes", "no"]),
    v1v2AxesAllowedExplain: f.string(),
    kColumn: Point2D,

    uAndKGraph: f.object({
      ij: f.boolean(),
      u: f.boolean(),
      v1v2: f.chooseOne(["labels", "vectors"]),
      v1v2Axes: f.boolean(),
      k: f.chooseOne(["ij", "v1v2"]),
    }),
    uAndKRelationship: f.chooseOne([
      "same",
      "different-bases",
      "different-coefficients",
    ]),
    newNameNecessary: f.chooseOne(["yes", "no", "no but useful"]),
    newNameNecessaryExplain: f.string(),
    meaningOfCoB: f.string(),
    equalityAllowed: f.chooseOne(["allowed", "not allowed"]),
    whyNoSubscriptNeeded: f.string(),

    positionCoord: f.chooseOne(["standard", "rotated"]),
    positionCoordExplain: f.string(),
    potentialEnergyCoord: f.chooseOne(["standard", "rotated"]),
    potentialEnergyCoordExplain: f.string(),
    coordEffect: f.chooseOne(["has effect", "no effect"]),
    coordEffectExplain: f.string(),
    xBasisRewriteReason: f.string(),
    xBasisRewriteNewInfo: f.string(),
    basisChoiceMeasureZ: f.chooseOne(["x-basis", "z-basis"]),
    basisChoiceMeasureX: f.chooseOne(["x-basis", "z-basis"]),
    basisChoiceExplain: f.string(),
    effectOfCoB: f.chooseOne(["has effect", "no effect"]),
    effectOfCoBExplain: f.string(),
    whyCoB: f.string(),
  },
  hints: [
    // Hints here.
    "uColumn",
    "uColumnDirac",
    "kColumnDirac",
    "columnSubscriptExplain",
    "basisChange",
    "v1v2AxesAllowed",
    "v1v2AxesAllowed2",
    "uAndKRelationship",
  ],
});
