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

  introCommit: s.boolean(),

  sizeEigenvalues: SizeOrMoodChoice,
  sizeEigenvectors: SizeOrMoodChoice,
  sizeEigenHelp: s.boolean(),
  sizeCommit: s.boolean(),

  hiddenUnits: s.boolean(),
  hiddenUnitsHelp: s.boolean(),
  hiddenUnitsCommit: s.boolean(),

  smallBigInnerProduct: s.choice(["0", "1", "complex"] as const),
  smallBigInnerProductExplain: s.string(),
  smallBigInnerProductHelp: s.boolean(),
  smallBigInnerProductCommit: s.boolean(),

  sizeEigenvaluesCheckVisible: s.boolean(),
  sizeEigenvaluesCheckCommit: s.boolean(),

  bigBigInnerProductVisible: s.boolean(),
  bigBigInnerProduct: s.choice(["0", "1", "complex"] as const),
  bigBigInnerProductCommit: s.boolean(),

  orthonormalDefinitionVisible: s.boolean(),
  orthonormalDefinition: s.choice(
    ["orthogonal", "90deg", "0 inner product"] as const,
    true
  ),
  orthonormalDefinitionCommit: s.boolean(),

  whatIsAMouseFinalCommit: s.boolean(),

  // Moody Mice?

  moodIntroCommit: s.boolean(),

  possibleMoodEigenvalues: s.choice(
    ["1", "-1", "0", "happyket", "sadket"] as const,
    true
  ),
  possibleMoodEigenvaluesHelp: s.boolean(),
  possibleMoodEigenvaluesCommit: s.boolean(),

  moodEigenvalues: SizeOrMoodChoice,
  moodEigenvectors: SizeOrMoodChoice,
  moodOperators: SizeOrMoodChoice,
  moodEigenUnitsHelp: s.boolean(),
  moodEigenCommit: s.boolean(),

  happySadInnerProduct: s.choice(["0", "1", "complex"] as const),
  happySadInnerProductExplain: s.string(),
  happySadInnerProductHelp: s.boolean(),
  happySadInnerProductCommit: s.boolean(),

  moodDisagreeVisible: s.boolean(),
  moodDisagreeCommit: s.boolean(),

  happySadVsSmallBigVisible: s.boolean(),
  happySadVsSmallBigCommit: s.boolean(),

  happySadCorrectionVisible: s.boolean(),
  happySadCorrectionCommit: s.boolean(),

  moodFinalCommit: s.boolean(),

  // Superpositions.

  superpositionsIntroCommit: s.boolean(),

  whyWideStressed: s.string(),
  whyWideStressedHelp: s.boolean(),
  whyWideStressedCommit: s.boolean(),

  smallEyeA: s.number(),
  smallEyeB: s.number(),
  smallEyeBasisChangeHelp: s.boolean(),
  smallEyeBasisChangeCommit: s.boolean(),

  abUnique: s.choice(["unique", "not unique"] as const),
  abUniqueHelp: s.boolean(),
  abUniqueCommit: s.boolean(),

  abNotNormalizedVisible: s.boolean(),
  abNotNormalizedCommit: s.boolean(),

  abIncorrectVisible: s.boolean(),
  abIncorrectCommit: s.boolean(),

  abAlternativeVisible: s.boolean(),
  abAlternative: s.choice(["negative", "i", "exp", "none"] as const, true),
  abAlternativeCommit: s.boolean(),

  superpositionsFinalCommit: s.boolean(),

  // Measuring Eye Size.

  measuringEyeSizeIntroCommit: s.boolean(),

  collapsed1mmState: s.choice([
    "1mm",
    "2mm",
    "happy",
    "sad",
    "ambiguous",
  ] as const),
  // collapsed1mmStateAmbiguity: s.string(),
  collapsed1mmStateCommit: s.boolean(),
  collapsed1mmStateHelp: s.boolean(),
  collapsed1mmStateHelp2: s.boolean(),

  remeasure1mmResults: s.string(),
  remeasure1mmState: s.choice(["1mm", "2mm", "happy", "sad"] as const),
  remeasure1mmCommit: s.boolean(),
  remeasure1mmHelp1: s.boolean(),
  remeasure1mmHelp2: s.boolean(),

  measureUnhappyProbability: s.number(),
  measureUnhappyProbabilityExplain: s.string(),
  measureUnhappyProbabilityHelp: s.boolean(),
  measureUnhappyProbabilityCommit: s.boolean(),

  smallEyedEmotion: s.string(),
  smallEyedEmotionHelp: s.boolean(),
  smallEyedEmotionCommit: s.boolean(),

  collapsed1mmStateIncorrectVisible: s.boolean(),
  collapsed1mmStateIncorrectCommit: s.boolean(),

  collapsedRemeasuredInconsistentVisible: s.boolean(),
  collapsedRemeasuredEffect: s.choice(["has effect", "no effect"] as const),
  collapsedRemeasuredInconsistentCommit: s.boolean(),

  probabilityNotSquaredVisible: s.boolean(),
  probabilityNotSquaredCommit: s.boolean(),

  probabilityNegativeVisible: s.boolean(),
  probabilityNegativeCommit: s.boolean(),

  measuringEyeSizeFinalCommit: s.boolean(),

  // More Measurements.

  moreMeasurementsIntroCommit: s.boolean(),

  moodStartState: s.choice([
    "small",
    "large",
    "happy",
    "sad",
    "ambiguous",
  ] as const),
  moodStartAmbiguity: s.string(),
  moodStartCommit: s.boolean(),
  moodStartHelp: s.boolean(),

  smallEyeProbCommit: s.boolean(),
  smallEyeProb: s.choice([
    "0",
    "1/root5",
    "1/5",
    "2/root5",
    "4/5",
    "1",
  ] as const),
  smallEyeProbExplain: s.string(),
  smallEyePropHelp: s.boolean(),

  smallEyeProbChallengeVisible: s.boolean(),
  smallEyeProbChallengeCommit: s.boolean(),

  finalMoodCommit: s.boolean(),
  finalMood: s.string(),

  surpriseResultCommit: s.boolean(),
  surpriseResults: s.string(),

  thinkingDeeperCommit: s.boolean(),
  thinkingDeeperAgreement: s.boolean(),
  thinkingDeeperExplain: s.string(),

  // Matrix Representation.

  happyVector: s.tuple(MoodVectorComponentChoice, MoodVectorComponentChoice),
  sadVector: s.tuple(MoodVectorComponentChoice, MoodVectorComponentChoice),
  moodVectorsCommit: s.boolean(),

  smallVector: s.tuple(MoodVectorComponentChoice, MoodVectorComponentChoice),
  wideVector: s.tuple(MoodVectorComponentChoice, MoodVectorComponentChoice),
  eyeSizeVectorCommit: s.boolean(),

  happyEigenequation: s.string(),
  sadEigenequation: s.string(),
  moodEigenequationCommit: s.boolean(),

  moodMatrix: s.tuple(
    s.tuple(s.number(), s.number()),
    s.tuple(s.number(), s.number())
  ),
  moodMatrixCommit: s.boolean(),

  // Expectation Value.

  expValIntroCommit: s.boolean(),

  weightedAverage: s.number(),
  weightedAverageHelp: s.boolean(),
  weightedAverageCommit: s.boolean(),

  expValueMeasurabilityCommit: s.boolean(),
  expValueMeasurability: s.choice(["Yes", "No"] as const),
  expValueMeasurabilityExplain: s.string(),
  //I know you don't have to do it this way

  naiveAvgCommit: s.boolean(),
  naiveAvg: s.string(),
});

////////////////////////////////////////////////////////////////////////////////
// Quantum Basis.
////////////////////////////////////////////////////////////////////////////////

const Point2D = s.tuple(s.number(), s.number());
const PointLabel2D = s.tuple(s.string(), s.string());

const PlusMinus = s.record({
  minusHeight: s.number(),
  plusHeight: s.number(),
  minusLabel: s.string(),
  plusLabel: s.string(),
});

export type QuantumBasis = s.TypeOf<typeof QuantumBasis>;
export const QuantumBasis = tutorialSchema("QuantumBasis", {
  // Part 1.
  meaningOfCoefficients: s.string(),

  probability: PlusMinus,
  probabilityAmplitude: PlusMinus,

  // Part 2.
  basisRequirements: s.string(),
  iAndJFormBasis: s.boolean(),
  iAndJFormBasisExplain: s.string(),

  uPlotPoint: Point2D,
  uPlotLabels: PointLabel2D, // TODO: Restrict to inputs?

  uColumn: Point2D,
  uColumnDirac: PointLabel2D,

  innerProductMeaning: s.string(),

  // Part 3.
  kPlotPoint: Point2D,
  kPlotLabels: PointLabel2D, // TODO: Restrict to inputs?

  kColumn: Point2D,
  kColumnDirac: PointLabel2D,

  columnSubscriptExplain: s.string(),

  // Part 4.
  uAndKGraph: s.record({
    // TODO: restrict to literals, these aren't direc input.
    phase: s.string(), // Is this necessary?
    u: s.string(),
    v1v2: s.string(),
    k: s.string(),
  }),

  uAndKRelationship: s.string(),

  meaningOfCoB: s.string(),

  newNameNecessary: s.boolean(),
  newNameNecessaryExplain: s.string(),

  equalityAllowed: s.boolean(),
  whyNoSubscriptNeeded: s.string(),
});
