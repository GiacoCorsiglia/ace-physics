import * as s from "./schema";

export const names: Record<string, s.RecordSchema<{}>> = {};

function tutorialSchema<P extends s.Properties>(
  name: string,
  properties: P
): s.RecordSchema<P & CommonTutorialProperties> {
  if (names[name]) {
    throw new Error(`Tutorial schema wih name "${name}" is already defined.`);
  }

  return (names[name] = s.record({
    ...properties,
    // Add the common properties.
    tutorialFeedback,
  }));
}

////////////////////////////////////////////////////////////////////////////////
// Common types.
////////////////////////////////////////////////////////////////////////////////

const Commit = s.boolean();
const Help = s.boolean();
const Visibility = s.boolean();

////////////////////////////////////////////////////////////////////////////////
// Common properties.
////////////////////////////////////////////////////////////////////////////////

type CommonTutorialProperties = {
  tutorialFeedback: typeof tutorialFeedback;
};

const tutorialFeedback = s.record({
  intention: s.string(),
  confidence: s.choice([
    "much less",
    "less",
    "same",
    "more",
    "much more",
  ] as const),
  confidenceExplain: s.string(),
  easyOrChallenging: s.choice([
    "easy/useful",
    "easy/frustrating",
    "challenging/useful",
    "challenging/frustrating",
  ] as const),
  easyOrChallengingExplain: s.string(),
  workedAlone: s.choice(["alone", "partner", "group"] as const),
  usedCourseMaterials: s.choice(["no", "a bit", "repeatedly"] as const),
  usedOtherMaterials: s.choice(["no", "a bit", "repeatedly"] as const),
  usedMaterialsOther: s.string(),
  suggestedImprovements: s.string(),
  technicalDifficulties: s.string(),
  challengingParts: s.string(),
  ratherInPerson: s.string(),
});

////////////////////////////////////////////////////////////////////////////////
// Quantum Mouse.
////////////////////////////////////////////////////////////////////////////////

const SizeOrMoodChoice = s.choice(["kets", "value", "operator"] as const);

const MoodVectorComponentChoice = s.choice([
  "0",
  "1",
  "1/root5",
  "-1/root5",
  "2/root5",
  "-2/root5",
] as const);

export type QuantumMouse = s.TypeOf<typeof QuantumMouse>;
export const QuantumMouse = tutorialSchema("QuantumMouse", {
  pretest: s.record({
    operatorLabel: s.string(),
    eigenstateLabel: s.string(),
    eigenvalueLabel: s.string(),
    A0_0: s.number(),
    A0_1: s.number(),
    A1_0: s.number(),
    A1_1: s.number(),
    measureA: s.string(),
    afterMeasureA: s.string(),
  }),

  // What is a quantum mouse?

  introCommit: Commit,

  sizeEigenvalues: SizeOrMoodChoice,
  sizeEigenvectors: SizeOrMoodChoice,
  sizeEigenHelp: Help,
  sizeCommit: Commit,

  hiddenUnits: s.boolean(),
  hiddenUnitsHelp: Help,
  hiddenUnitsCommit: Commit,

  smallBigInnerProduct: s.choice(["0", "1", "complex"] as const),
  smallBigInnerProductExplain: s.string(),
  smallBigInnerProductHelp: Help,
  smallBigInnerProductCommit: Commit,

  sizeEigenvaluesCheckVisible: Visibility,
  sizeEigenvaluesCheckCommit: Commit,

  bigBigInnerProductVisible: Visibility,
  bigBigInnerProduct: s.choice(["0", "1", "complex"] as const),
  bigBigInnerProductCommit: Commit,

  orthonormalDefinitionVisible: Visibility,
  orthonormalDefinition: s.choice(
    ["orthogonal", "90deg", "0 inner product"] as const,
    true
  ),
  orthonormalDefinitionCommit: Commit,

  whatIsAMouseFinalCommit: Commit,

  // Moody Mice?

  moodIntroCommit: Commit,

  possibleMoodEigenvalues: s.choice(
    ["1", "-1", "0", "happyket", "sadket"] as const,
    true
  ),
  possibleMoodEigenvaluesHelp: Help,
  possibleMoodEigenvaluesCommit: Commit,

  moodEigenvalues: SizeOrMoodChoice,
  moodEigenvectors: SizeOrMoodChoice,
  moodOperators: SizeOrMoodChoice,
  moodEigenUnitsHelp: Help,
  moodEigenCommit: Commit,

  happySadInnerProduct: s.choice(["0", "1", "complex"] as const),
  happySadInnerProductExplain: s.string(),
  happySadInnerProductHelp: Help,
  happySadInnerProductCommit: Commit,

  moodDisagreeVisible: Visibility,
  moodDisagreeCommit: Commit,

  happySadVsSmallBigVisible: Visibility,
  happySadVsSmallBigCommit: Commit,

  happySadCorrectionVisible: Visibility,
  happySadCorrectionCommit: Commit,

  moodFinalCommit: Commit,

  // Superpositions.

  superpositionsIntroCommit: Commit,

  whyWideStressed: s.string(),
  whyWideStressedHelp: Help,
  whyWideStressedCommit: Commit,

  smallEyeA: s.number(),
  smallEyeB: s.number(),
  smallEyeBasisChangeHelp: Help,
  smallEyeBasisChangeCommit: Commit,

  abUnique: s.choice(["unique", "not unique"] as const),
  abUniqueHelp: Help,
  abUniqueCommit: Commit,

  abNotNormalizedVisible: Visibility,
  abNotNormalizedCommit: Commit,

  abIncorrectVisible: Visibility,
  abIncorrectCommit: Commit,

  abAlternativeVisible: Visibility,
  abAlternative: s.choice(["negative", "i", "exp", "none"] as const, true),
  abAlternativeCommit: Commit,

  superpositionsFinalCommit: Commit,

  // Measuring Eye Size.

  measuringEyeSizeIntroCommit: Commit,

  collapsed1mmState: s.choice([
    "1mm",
    "2mm",
    "happy",
    "sad",
    "ambiguous",
  ] as const),
  // collapsed1mmStateAmbiguity: s.string(),
  collapsed1mmStateCommit: Commit,
  collapsed1mmStateHelp: Help,
  collapsed1mmStateHelp2: Help,

  remeasure1mmResults: s.string(),
  remeasure1mmState: s.choice(["1mm", "2mm", "happy", "sad"] as const),
  remeasure1mmCommit: Commit,
  remeasure1mmHelp1: Help,
  remeasure1mmHelp2: Help,

  measureUnhappyProbability: s.number(),
  measureUnhappyProbabilityExplain: s.string(),
  measureUnhappyProbabilityHelp: Help,
  measureUnhappyProbabilityCommit: Commit,

  smallEyedEmotion: s.string(),
  smallEyedEmotionHelp: Help,
  smallEyedEmotionCommit: Commit,

  collapsed1mmStateIncorrectVisible: Visibility,
  collapsed1mmStateIncorrectCommit: Commit,

  collapsedRemeasuredInconsistentVisible: Visibility,
  collapsedRemeasuredEffect: s.choice(["has effect", "no effect"] as const),
  collapsedRemeasuredInconsistentCommit: Commit,

  probabilityNotSquaredVisible: Visibility,
  probabilityNotSquaredCommit: Commit,

  probabilityNegativeVisible: Visibility,
  probabilityNegativeCommit: Commit,

  measuringEyeSizeFinalCommit: Commit,

  // More Measurements.

  moreMeasurementsIntroCommit: Commit,

  moodStartState: s.choice([
    "small",
    "large",
    "happy",
    "sad",
    "uncertain",
  ] as const),
  moodStartAmbiguity: s.string(),
  moodStartCommit: Commit,
  moodStartHelp: Help,

  smallEyeProbCommit: Commit,
  smallEyeProb: s.choice([
    "0",
    "1/root5",
    "1/5",
    "2/root5",
    "4/5",
    "1",
  ] as const),
  smallEyeProbExplain: s.string(),
  smallEyeProbHelp: Help,

  smallEyeProbChallengeVisible: Visibility,
  smallEyeProbChallengeCommit: Commit,

  finalMood: s.string(),
  finalMoodCanBeHappy: s.choice(["possible", "impossible"] as const),
  finalMoodHelp: Help,
  finalMoodCommit: Commit,

  finalMoodOtherStudentsVisible: Visibility,
  finalMoodOtherStudents: s.choice([
    "quantum student",
    "classical student",
  ] as const),
  finalMoodOtherStudentsCommit: Commit,

  finalMoodCorrectionVisible: Visibility,
  finalMoodCorrectionCommit: Commit,

  surpriseResultCommit: Commit,
  surpriseResults: s.string(),

  thinkingDeeperAgreement: s.boolean(),
  thinkingDeeperExplain: s.string(),
  thinkingDeeperHelp: Help,
  thinkingDeeperCommit: Commit,

  moreMeasurementsFinalCommit: Commit,

  // Matrix Representation.

  happyVector: s.tuple(MoodVectorComponentChoice, MoodVectorComponentChoice),
  sadVector: s.tuple(MoodVectorComponentChoice, MoodVectorComponentChoice),
  moodVectorsCommit: Commit,

  smallVector: s.tuple(MoodVectorComponentChoice, MoodVectorComponentChoice),
  wideVector: s.tuple(MoodVectorComponentChoice, MoodVectorComponentChoice),
  eyeSizeVectorCommit: Commit,

  happyEigenequation: s.string(),
  sadEigenequation: s.string(),
  moodEigenequationCommit: Commit,

  moodMatrix: s.tuple(
    s.tuple(s.number(), s.number()),
    s.tuple(s.number(), s.number())
  ),
  moodMatrixCommit: Commit,

  moodMatrixDiagonalVisible: Visibility,
  moodMatrixDiagonalCommit: Commit,

  matrixRepresentationFinalCommit: Commit,

  // Expectation Value.

  expValIntroCommit: Commit,

  weightedAverage: s.number(),
  weightedAverageHelp: Help,
  weightedAverageCommit: Commit,

  expValueMeasurability: s.choice(["Yes", "No"] as const),
  expValueMeasurabilityExplain: s.string(),
  expValueMeasurabilityHelp: Help,
  expValueMeasurabilityCommit: Commit,

  naiveAvg: s.string(),
  naiveAvgHelp: Help,
  naiveAvgCommit: Commit,

  expValMeasurabilityCorrectionVisible: Visibility,
  expValMeasurabilityCorrectionCommit: Commit,

  expValFinalCommit: Commit,
});

////////////////////////////////////////////////////////////////////////////////
// Quantum Basis.
////////////////////////////////////////////////////////////////////////////////

const Point2D = s.tuple(s.number(), s.number());
const uColumnDiracChoice = s.choice([
  "|i>",
  "|j>",
  "|u>",
  "<i|u>",
  "<j|u>",
  "<u|i>",
  "<u|j>",
] as const);
const kColumnDiracChoice = s.choice([
  "|v1>",
  "|v2>",
  "<v1|u>",
  "<v2|u>",
  "<i|u>",
  "<j|u>",
] as const);
const PointLabel2D = s.tuple(s.string(), s.string());

const PlusMinus = s.record({
  minusHeight: s.number(),
  plusHeight: s.number(),
  minusLabel: s.string(),
  plusLabel: s.string(),
});

export type QuantumBasis = s.TypeOf<typeof QuantumBasis>;
export const QuantumBasis = tutorialSchema("QuantumBasis", {
  pretest: s.record({
    meaningOfCoefficients: s.string(),
    coBExpression: s.choice(
      [
        "x-subscripts",
        "projection (correct)",
        "probability coefficients",
        "x<+|+> coefficients",
        "just inner products",
      ] as const,
      true
    ),
    changedProbabilities: s.boolean(),
    cantKnowBothProbabilities: s.boolean(),
    createdNewState: s.boolean(),
  }),

  // Part 1.
  probabilityProjectionIntroCommit: Commit,

  meaningOfCoefficients: s.choice(
    [
      "normalized",
      "measurement-outcomes",
      "probabilities-direct",
      "probabilities-squared",
    ] as const,
    true
  ),
  meaningOfCoefficientsCommit: Commit,

  probability: PlusMinus,
  probabilityAmplitude: PlusMinus,

  // Defining a Basis.
  definingBasisIntroCommit: Commit,

  iAndJFormBasis: s.boolean(),
  iAndJFormBasisExplain: s.string(),
  iAndJFormBasisCommit: Commit,

  uColumn: Point2D,
  uColumnCommit: Commit,

  uColumnDirac: s.tuple(uColumnDiracChoice, uColumnDiracChoice),
  uColumnDiracCommit: Commit,

  innerProductMeaning: s.string(),
  innerProductMeaningCommit: Commit,

  // Changing Basis.
  changingBasisIntroCommit: Commit,

  changedBasisHelp: Help,
  changedBasisCommit: Commit,

  v1v2AxesAllowed: s.choice(["yes", "no"] as const),
  v1v2AxesAllowedExplain: s.string(),
  v1v2AxesAllowedHelp: Help,
  v1v2AxesAllowedHelp2: Help,
  v1v2AxesAllowedCommit: Commit,

  v1v2AxesAllowedCorrectionVisible: Visibility,
  v1v2AxesAllowedCorrectionCommit: Commit,

  kPlotPoint: Point2D,
  kPlotCommit: Commit,

  kPlotLabels: PointLabel2D, // TODO: Restrict to inputs?

  kColumn: Point2D,
  kColumnCommit: Commit,

  kColumnDirac: s.tuple(kColumnDiracChoice, kColumnDiracChoice),
  kColumnDiracCommit: Commit,

  columnSubscriptExplain: s.string(),
  columnSubscriptExplainCommit: Commit,

  // Part 4.
  relatingBasesIntroCommit: Commit,

  uAndKGraph: s.record({
    ij: s.boolean(),
    u: s.boolean(),
    v1v2: s.choice(["labels", "vectors"] as const),
    v1v2Axes: s.boolean(),
    k: s.choice(["ij", "v1v2"] as const),
  }),
  uAndKGraphCommit: Commit,

  uAndKRelationship: s.string(),
  uAndKRelationshipC: s.choice([
    "same",
    "different-bases",
    "different-coefficients",
  ] as const),
  uAndKRelationshipHelp: Help,
  uAndKRelationshipCommit: Commit,

  checkInCommit: Commit,

  meaningOfCoB: s.string(),
  meaningOfCoBCommit: Commit,

  newNameNecessary: s.boolean(),
  newNameNecessaryExplain: s.string(),
  newNameNecessaryCommit: Commit,

  equalityAllowed: s.boolean(),
  equalityAllowedCommit: Commit,

  whyNoSubscriptNeeded: s.string(),
  whyNoSubscriptNeededCommit: Commit,

  //Part 5: WrapUp
  positionCoord: s.string(),
  positionCoordExplain: s.string(),
  positionCoordCommit: Commit,

  potentialEnergyCoord: s.string(),
  potentialEnergyCoordExplain: s.string(),
  potentialEnergyCoordCommit: Commit,
  coordChoiceEffect: s.string(),
  coordChoiceCommit: Commit,

  xBaseRewrite: s.string(),
  xBasisRewriteNewInfo: s.string(),
  xBaseRewriteCommit: Commit,

  repX: s.string(),
  repZ: s.string(),
  repExplain: s.string(),
  repCommit: Commit,

  CoBEfect: s.string(),
  whyCoB: s.string(),
  whyCoBCommit: Commit,
});
