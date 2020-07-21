import * as s from "./schema";

// Quantum Mouse.

export type QuantumMouse = s.TypeOf<typeof QuantumMouse>;

const SizeOrMoodChoice = s.choice(["kets", "value", "operator"] as const);

export const QuantumMouse = s.record({
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
  possibleMoodMeasurements: s.string(),
  moodEigenvalues: SizeOrMoodChoice,
  moodEigenvectors: SizeOrMoodChoice,
  moodOperators: SizeOrMoodChoice,

  happySadInnerProduct: s.number(),
  happySadInnerProductExplain: s.string(),

  possibleMoodEigenvalues: s.choice(["1", "-1", "0"] as const),

  // Part 2.
  whyWideStressed: s.string(),
});

// Quantum Basis.

export type QuantumBasis = s.TypeOf<typeof QuantumBasis>;

const Point2D = s.tuple(s.number(), s.number());
const PointLabel2D = s.tuple(s.string(), s.string());

const PlusMinus = s.record({
  minusHeight: s.number(),
  plusHeight: s.number(),
  minusLabel: s.string(),
  plusLabel: s.string(),
});

export const QuantumBasis = s.record({
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
