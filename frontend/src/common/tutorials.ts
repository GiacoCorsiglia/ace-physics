import * as s from "./schema";

export const QuantumMouse = s.record({
  // Part 1.
  sizeEigenvalues: s.string(), // TODO Restrict to inputs?
  sizeEigenvectors: s.string(),

  hiddenUnits: s.boolean(),
  seenHiddenUnis: s.boolean(),

  smallBigInnerProduct: s.number(),
  smallBigInnerProductExplain: s.string(),

  possibleMoodMeasurements: s.string(),
  moodEigenvalues: s.string(), // TODO Restrict to inputs?
  moodEigenvectors: s.string(),
  moodOperators: s.string(),

  happySadInnerProduct: s.number(),
  happySadInnerProductExplain: s.string(),

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
