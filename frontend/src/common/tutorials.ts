import * as s from "./schema";

export const names: Record<string, s.RecordSchema<{}>> = {};

////////////////////////////////////////////////////////////////////////////////
// Quantum Mouse.
////////////////////////////////////////////////////////////////////////////////

const SizeOrMoodChoice = s.choice(["kets", "value", "operator"] as const);

export type QuantumMouse = s.TypeOf<typeof QuantumMouse>;
export const QuantumMouse = (names["QuantumMouse"] = s.record({
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

  // Moody Mice?

  moodIntroCommit: s.boolean(),

  possibleMoodEigenvalues: s.choice(["1", "-1", "0"] as const, true),
  possibleMoodEigenvaluesCommit: s.boolean(),

  moodEigenvalues: SizeOrMoodChoice,
  moodEigenvectors: SizeOrMoodChoice,
  moodOperators: SizeOrMoodChoice,
  moodEigenCommit: s.boolean(),

  happySadInnerProduct: s.choice(["0", "1", "complex"] as const),
  happySadInnerProductExplain: s.string(),
  happySadInnerProductCommit: s.boolean(),

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
  remeasure1mmHelp: s.boolean(),

  measureUnhappyProbability: s.number(),
  measureUnhappyProbabilityExplain: s.string(),
  measureUnhappyProbabilityHelp: s.boolean(),
  measureUnhappyProbabilityCommit: s.boolean(),

  smallEyedEmotion: s.string(),
  smallEyedEmotionHelp: s.boolean(),
  smallEyedEmotionCommit: s.boolean(),

  // More Measurements.

  moodStartCommit: s.boolean(),
  moodStartAmbiguity: s.string(),
  moodStartState: s.choice([
    "small",
    "large",
    "happy",
    "sad",
    "ambiguous",
  ] as const),

  smallEyeProbCommit: s.boolean(),
  smallEyeProb: s.choice(["0", "1/root5", "1/5", "2/root5", "4/5", "1"]),
  smallEyeProbExplain: s.string(),

  finalMoodCommit: s.boolean(),
  finalMood: s.string(),

  surpriseResultCommit: s.boolean(),
  surpriseResults: s.string(),

  thinkingDeeperCommit: s.boolean(),
  thinkingDeeper: s.string(),

  // Expectation Value.

  weightedAverageCommit: s.boolean(),
  weightedAverage: s.string(),

  expValueMeasurabilityCommit: s.boolean(),
  expValueMeasurability: s.choice(["Yes", "No"]),
  expValueMeasurabilityExplain: s.string(),
  //I know you don't have to do it this way

  naiveAvgCommit: s.boolean(),
  naiveAvg: s.string(),

  // Matrix Representation.

  moodVectorsCommit: s.boolean(),

  eyeSizeVectorCommit: s.boolean(),

  moodEigenequationCommit: s.boolean(),

  moodMatrixCommit: s.boolean(),
}));

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
export const QuantumBasis = (names["QuantumBasis"] = s.record({
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
}));
