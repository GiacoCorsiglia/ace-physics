import * as s from "@/schema/tutorial";

const Point2D = s.tuple(s.number(), s.number());

const uColumnDiracChoice = s.chooseOne([
  "|i>",
  "|j>",
  "|u>",
  "<i|u>",
  "<j|u>",
  "<u|i>",
  "<u|j>",
]);

const kColumnDiracChoice = s.chooseOne([
  "|v1>",
  "|v2>",
  "<v1|u>",
  "<v2|u>",
  "<i|u>",
  "<j|u>",
]);

const HeightChoice = s.chooseOne([
  "3/5",
  "-3/5",
  "4/5",
  "-4/5",
  "9/25",
  "-9/25",
  "16/25",
  "-16/25",
]);

const LabelChoice = s.chooseOne([
  "|->",
  "|+>",
  "<-|psi_A>",
  "<+|psi_A>",
  "|<-|psi_A>|^2",
  "|<+|psi_A>|^2",
]);

const PlusMinus = s.object({
  minusHeight: HeightChoice,
  plusHeight: HeightChoice,
  minusLabel: LabelChoice,
  plusLabel: LabelChoice,
});

export default s.tutorial({
  pages: {
    probabilityAndProjection: s.page(),
    definingBasis: s.page(),
    changingBasis: s.page(),
    relatingBases: s.page(),
    wrapUp: s.page(),
  },
  pretest: {
    /** @deprecated */
    meaningOfCoefficients: s.string(),
    coBExpression: s.chooseAll(
      [
        "x-subscripts",
        "projection (correct)",
        "probability coefficients",
        "x<+|+> coefficients",
        "just inner products",
      ],
      s.string()
    ),
    changedProbabilities: s.chooseOne(["true", "false"]),
    changedProbabilitiesExplain: s.string(),
    cantKnowBothProbabilities: s.chooseOne(["true", "false"]),
    cantKnowBothProbabilitiesExplain: s.string(),
    createdNewState: s.chooseOne(["true", "false"]),
    createdNewStateExplain: s.string(),
  },
  posttest: {},
  sections: {
    probabilityAndProjectionIntro: s.section(),
    meaningOfCoefficients: s.section(),
    histogramHeights: s.section(),
    histogramLabels: s.section(),
    relationshipProbAmp: s.section(),

    definingBasisIntro: s.section(),
    iAndJFormBasis: s.section(),
    iAndJSpan: s.section(),
    iAndJFeedback: s.section(),
    uColumn: s.section(),
    uColumnDirac: s.section(),
    uColumnDiracKet: s.section(),
    uColumnDiracCorrect: s.section(),
    uColumnDiracConjugate: s.section(),
    uColumnDiracReversed: s.section(),
    uColumnDiracRepeated: s.section(),
    uColumnDiracGeneralIncorrect: s.section(),
    innerProductMeaning: s.section(),

    changingBasisIntro: s.section(),
    basisChangeApproach: s.section(),
    kColumnDirac: s.section(),
    kColumnDiracCorrect: s.section(),
    kColumnDiracReversed: s.section(),
    kColumnDiracRepeated: s.section(),
    kColumnDiracKet: s.section(),
    kColumnDiracIorJ: s.section(),
    columnSubscriptExplain: s.section(),
    basisChange: s.section(),
    v1v2AxesAllowed: s.section(),
    v1v2AxesAllowedCorrection: s.section(),
    kColumn: s.section(),
    kColumnIncorrect: s.section(),
    kColumnReversed: s.section(),
    kColumnCorrect: s.section(),

    relatingBasesIntro: s.section(),
    uAndKGraph: s.section(),
    uAndKRelationship: s.section(),
    newNameNecessary: s.section(),
    uVsKFeedback: s.section(),
    meaningOfCoB: s.section(),
    equalityAllowed: s.section(),
    whyNoSubscriptNeeded: s.section(),
    equalityAllowedFeedback: s.section(),

    wrapUpIntro: s.section(),
    positionCoord: s.section(),
    potentialEnergyCoord: s.section(),
    coordEffect: s.section(),
    xBasisRewrite: s.section(),
    basisChoice: s.section(),
    effectOfCoB: s.section(),
    whyCoB: s.section(),
  },
  responses: {
    meaningOfCoefficients: s.chooseAll(
      [
        "normalized",
        "measurement-outcomes",
        "probabilities-direct",
        "probabilities-squared",
      ],
      s.string()
    ),
    probability: PlusMinus,
    probabilityAmplitude: PlusMinus,
    relationshipProbAmp: s.string(),

    iAndJFormBasis: s.chooseOne(["yes", "no"]),
    iAndJFormBasisExplain: s.string(),
    iAndJSpan: s.chooseOne(["yes", "no"]),
    uColumn: Point2D,
    uColumnDirac: s.tuple(uColumnDiracChoice, uColumnDiracChoice),
    innerProductMeaning: s.string(),

    basisChangeApproach: s.string(),
    kColumnDirac: s.tuple(kColumnDiracChoice, kColumnDiracChoice),
    columnSubscriptExplain: s.string(),
    v1v2AxesAllowed: s.chooseOne(["yes", "no"]),
    v1v2AxesAllowedExplain: s.string(),
    kColumn: Point2D,

    uAndKGraph: s.object({
      ij: s.boolean(),
      u: s.boolean(),
      v1v2: s.chooseOne(["labels", "vectors"]),
      v1v2Axes: s.boolean(),
      k: s.chooseOne(["ij", "v1v2"]),
    }),
    uAndKRelationship: s.chooseOne([
      "same",
      "different-bases",
      "different-coefficients",
    ]),
    newNameNecessary: s.chooseOne(["yes", "no", "no but useful"]),
    newNameNecessaryExplain: s.string(),
    meaningOfCoB: s.string(),
    equalityAllowed: s.chooseOne(["allowed", "not allowed"]),
    whyNoSubscriptNeeded: s.string(),

    positionCoord: s.chooseOne(["standard", "rotated"]),
    positionCoordExplain: s.string(),
    potentialEnergyCoord: s.chooseOne(["standard", "rotated"]),
    potentialEnergyCoordExplain: s.string(),
    coordEffect: s.chooseOne(["has effect", "no effect"]),
    coordEffectExplain: s.string(),
    xBasisRewriteReason: s.string(),
    xBasisRewriteNewInfo: s.string(),
    basisChoiceMeasureZ: s.chooseOne(["x-basis", "z-basis"]),
    basisChoiceMeasureX: s.chooseOne(["x-basis", "z-basis"]),
    basisChoiceExplain: s.string(),
    effectOfCoB: s.chooseOne(["has effect", "no effect"]),
    effectOfCoBExplain: s.string(),
    whyCoB: s.string(),
  },
  hints: {
    uColumn: s.hint(),
    uColumnDirac: s.hint(),
    kColumnDirac: s.hint(),
    columnSubscriptExplain: s.hint(),
    basisChange: s.hint(),
    v1v2AxesAllowed: s.hint(),
    v1v2AxesAllowed2: s.hint(),
    uAndKRelationship: s.hint(),
  },
});
