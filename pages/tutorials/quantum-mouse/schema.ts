import * as s from "@/schema/tutorial";

const SizeOrMoodChoice = s.chooseOne(["kets", "value", "operator"]);

const MoodVectorComponentChoice = s.chooseOne([
  "0",
  "1",
  "1/root5",
  "-1/root5",
  "2/root5",
  "-2/root5",
]);

export default s.tutorial({
  pages: {
    // TODO: Convert casing when migrating the DB.
    "what-is-a-quantum-mouse": s.page(),
    "moody-mice": s.page(),
    superpositions: s.page(),
    measurements: s.page(),
    "more-measurements": s.page(),
    "matrix-representation": s.page(),
    "expectation-values": s.page(),
    challenge: s.page(),
  },
  pretest: {
    operatorLabel: s.string(),
    eigenstateLabel: s.string(),
    eigenvalueLabel: s.string(),
    A: s.tuple(
      s.tuple(s.number(), s.number()),
      s.tuple(s.number(), s.number())
    ),
    measureA: s.string(),
    afterMeasureA: s.string(),
  },
  posttest: {},
  sections: {
    whatIsAQuantumMouseIntro: s.section(),
    size: s.section(),
    hiddenUnits: s.section(),
    smallBigInnerProduct: s.section(),
    sizeEigenvaluesCheck: s.section(),
    bigBigInnerProduct: s.section(),
    orthonormalDefinition: s.section(),

    moodIntro: s.section(),
    possibleMoodEigenvalues: s.section(),
    moodEigen: s.section(),
    happySadInnerProduct: s.section(),
    moodDisagree: s.section(),
    happySadVsSmallBig: s.section(),
    happySadCorrection: s.section(),

    superpositionsIntro: s.section(),
    coefficientsVsEigenvalues: s.section({
      messages: [
        "eigenvalue",
        "measurement outcome",
        "probability",
        "probability amplitude",
        "other",
      ],
    }),
    whyWideStressed: s.section(),
    smallEyeBasisChange: s.section({
      messages: ["abNotNormalized", "abIncorrect", "abCorrect"],
    }),
    abUnique: s.section(),
    abNotNormalized: s.section(),
    abIncorrect: s.section(),
    abAlternative: s.section(),

    measurementsIntro: s.section(),
    collapsed1mmState: s.section(),
    remeasure1mm: s.section(),
    measureUnhappyProbability: s.section(),
    smallEyedEmotion: s.section(),
    collapsed1mmStateIncorrect: s.section(),
    collapsedRemeasuredInconsistent: s.section(),
    probabilityNotSquared: s.section(),
    probabilityNegative: s.section(),

    moreMeasurementsIntro: s.section(),
    moodStart: s.section(),
    smallEyeProb: s.section(),
    smallEyeProbChallenge: s.section(),
    finalMood: s.section(),
    finalMoodOtherStudents: s.section(),
    finalMoodCorrection: s.section(),
    surpriseResults: s.section(),
    thinkingDeeper: s.section(),

    matrixRepresentationIntro: s.section(),
    eyeSizeVectors: s.section(),
    moodEigenequations: s.section(),
    moodMatrix: s.section(),
    moodMatrixDiagonal: s.section(),

    expValIntro: s.section(),
    weightedAverage: s.section(),
    expValueMeasurability: s.section(),
    naiveAvg: s.section(),
    expValMeasurabilityCorrection: s.section(),

    challengeIntro: s.section(),
  },
  responses: {
    // What is a quantum mouse?
    sizeEigenvalues: SizeOrMoodChoice,
    sizeEigenvectors: SizeOrMoodChoice,
    hiddenUnits: s.chooseOne(["yes", "no"]),
    smallBigInnerProduct: s.chooseOne(["0", "1", "complex"]),
    smallBigInnerProductExplain: s.string(),
    bigBigInnerProduct: s.chooseOne(["0", "1", "complex"]),
    orthonormalDefinition: s.chooseAll([
      "orthogonal",
      "90deg",
      "0 inner product",
      "normalized",
    ]),

    // Moody Mice?
    possibleMoodEigenvalues: s.chooseAll([
      "1",
      "-1",
      "0",
      "happyket",
      "sadket",
    ]),
    moodEigenvalues: SizeOrMoodChoice,
    moodEigenvectors: SizeOrMoodChoice,
    moodOperators: SizeOrMoodChoice,
    happySadInnerProduct: s.chooseOne(["0", "1", "complex"]),
    happySadInnerProductExplain: s.string(),

    // Superpositions.
    coefficientsVsEigenvalues: s.chooseOne(
      [
        "eigenvalue",
        "measurement outcome",
        "probability",
        "probability amplitude",
      ],
      s.string()
    ),
    whyWideStressed: s.string(),
    smallEyeA: s.number(),
    smallEyeB: s.number(),
    abUnique: s.chooseOne(["unique", "not unique"]),
    abAlternative: s.chooseAll(["negative", "i", "exp", "none"]),

    // Measuring Eye Size.
    collapsed1mmState: s.chooseOne(["1mm", "2mm", "happy", "sad", "ambiguous"]),
    // collapsed1mmStateAmbiguity: f.string(),
    remeasure1mmResults: s.string(),
    remeasure1mmState: s.chooseOne(["1mm", "2mm", "happy", "sad"]),
    measureUnhappyProbability: s.number(),
    measureUnhappyProbabilityExplain: s.string(),
    smallEyedEmotion: s.string(),
    collapsedRemeasuredEffect: s.chooseOne(["has effect", "no effect"]),

    // More Measurements.
    moodStartState: s.chooseOne([
      "small",
      "large",
      "happy",
      "sad",
      "uncertain",
    ]),
    moodStartAmbiguity: s.string(),
    smallEyeProb: s.chooseOne(["0", "1/root5", "1/5", "2/root5", "4/5", "1"]),
    smallEyeProbExplain: s.string(),
    finalMood: s.string(),
    finalMoodCanBeHappy: s.chooseOne(["possible", "impossible"]),
    finalMoodOtherStudents: s.chooseOne([
      "quantum student",
      "classical student",
    ]),
    surpriseResults: s.string(),
    thinkingDeeperAgreement: s.chooseOne(["agree", "disagree"]),
    thinkingDeeperExplain: s.string(),

    // Matrix Representation.
    happyVector: s.tuple(MoodVectorComponentChoice, MoodVectorComponentChoice),
    sadVector: s.tuple(MoodVectorComponentChoice, MoodVectorComponentChoice),
    smallVector: s.tuple(MoodVectorComponentChoice, MoodVectorComponentChoice),
    wideVector: s.tuple(MoodVectorComponentChoice, MoodVectorComponentChoice),
    happyEigenequation: s.string(),
    sadEigenequation: s.string(),
    moodMatrix: s.tuple(
      s.tuple(s.number(), s.number()),
      s.tuple(s.number(), s.number())
    ),

    // Expectation Value.
    weightedAverage: s.number(),
    expValueMeasurability: s.chooseOne(["yes", "no"]),
    expValueMeasurabilityExplain: s.string(),
    naiveAvg: s.string(),
  },
  hints: {
    sizeEigen: s.hint(),
    hiddenUnits: s.hint(),
    smallBigInnerProduct: s.hint(),
    possibleMoodEigenvalues: s.hint(),
    moodEigenUnits: s.hint(),
    happySadInnerProduct: s.hint(),
    whyWideStressed: s.hint(),
    smallEyeBasisChange: s.hint(),
    abUnique: s.hint(),
    collapsed1mmState: s.hint(),
    collapsed1mmState2: s.hint(),
    remeasure1mm: s.hint(),
    remeasure1mm2: s.hint(),
    measureUnhappyProbability: s.hint(),
    smallEyedEmotion: s.hint(),
    moodStart: s.hint(),
    smallEyeProb: s.hint(),
    finalMood: s.hint(),
    thinkingDeeper: s.hint(),
    weightedAverage: s.hint(),
    expValueMeasurability: s.hint(),
    naiveAvg: s.hint(),
  },
});
