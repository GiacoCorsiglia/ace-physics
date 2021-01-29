import * as f from "@/schema/fields";
import { tutorialSchema } from "@/schema/tutorial";

const SizeOrMoodChoice = f.chooseOne(["kets", "value", "operator"]);

const MoodVectorComponentChoice = f.chooseOne([
  "0",
  "1",
  "1/root5",
  "-1/root5",
  "2/root5",
  "-2/root5",
]);

export default tutorialSchema({
  pages: [
    "what-is-a-quantum-mouse",
    "moody-mice",
    "superpositions",
    "measurements",
    "more-measurements",
    "matrix-representation",
    "expectation-values",
    "challenge",
  ],
  pretest: {
    operatorLabel: f.string(),
    eigenstateLabel: f.string(),
    eigenvalueLabel: f.string(),
    A: f.tuple(
      f.tuple(f.number(), f.number()),
      f.tuple(f.number(), f.number())
    ),
    measureA: f.string(),
    afterMeasureA: f.string(),
  },
  sections: [
    "whatIsAQuantumMouseIntro",
    "size",
    "hiddenUnits",
    "smallBigInnerProduct",
    "sizeEigenvaluesCheck",
    "bigBigInnerProduct",
    "orthonormalDefinition",

    "moodIntro",
    "possibleMoodEigenvalues",
    "moodEigen",
    "happySadInnerProduct",
    "moodDisagree",
    "happySadVsSmallBig",
    "happySadCorrection",

    "superpositionsIntro",
    "whyWideStressed",
    "smallEyeBasisChange",
    "abUnique",
    "abNotNormalized",
    "abIncorrect",
    "abAlternative",

    "measurementsIntro",
    "collapsed1mmState",
    "remeasure1mm",
    "measureUnhappyProbability",
    "smallEyedEmotion",
    "collapsed1mmStateIncorrect",
    "collapsedRemeasuredInconsistent",
    "probabilityNotSquared",
    "probabilityNegative",

    "moreMeasurementsIntro",
    "moodStart",
    "smallEyeProb",
    "smallEyeProbChallenge",
    "finalMood",
    "finalMoodOtherStudents",
    "finalMoodCorrection",
    "surpriseResults",
    "thinkingDeeper",

    "matrixRepresentationIntro",
    "eyeSizeVectors",
    "moodEigenequations",
    "moodMatrix",
    "moodMatrixDiagonal",

    "expValIntro",
    "weightedAverage",
    "expValueMeasurability",
    "naiveAvg",
    "expValMeasurabilityCorrection",

    "challengeIntro",
  ],
  responses: {
    // What is a quantum mouse?
    sizeEigenvalues: SizeOrMoodChoice,
    sizeEigenvectors: SizeOrMoodChoice,
    hiddenUnits: f.chooseOne(["yes", "no"]),
    smallBigInnerProduct: f.chooseOne(["0", "1", "complex"]),
    smallBigInnerProductExplain: f.string(),
    bigBigInnerProduct: f.chooseOne(["0", "1", "complex"]),
    orthonormalDefinition: f.chooseAll([
      "orthogonal",
      "90deg",
      "0 inner product",
    ]),

    // Moody Mice?
    possibleMoodEigenvalues: f.chooseAll([
      "1",
      "-1",
      "0",
      "happyket",
      "sadket",
    ]),
    moodEigenvalues: SizeOrMoodChoice,
    moodEigenvectors: SizeOrMoodChoice,
    moodOperators: SizeOrMoodChoice,
    happySadInnerProduct: f.chooseOne(["0", "1", "complex"]),
    happySadInnerProductExplain: f.string(),

    // Superpositions.
    whyWideStressed: f.string(),
    smallEyeA: f.number(),
    smallEyeB: f.number(),
    abUnique: f.chooseOne(["unique", "not unique"]),
    abAlternative: f.chooseAll(["negative", "i", "exp", "none"]),

    // Measuring Eye Size.
    collapsed1mmState: f.chooseOne(["1mm", "2mm", "happy", "sad", "ambiguous"]),
    // collapsed1mmStateAmbiguity: f.string(),
    remeasure1mmResults: f.string(),
    remeasure1mmState: f.chooseOne(["1mm", "2mm", "happy", "sad"]),
    measureUnhappyProbability: f.number(),
    measureUnhappyProbabilityExplain: f.string(),
    smallEyedEmotion: f.string(),
    collapsedRemeasuredEffect: f.chooseOne(["has effect", "no effect"]),

    // More Measurements.
    moodStartState: f.chooseOne([
      "small",
      "large",
      "happy",
      "sad",
      "uncertain",
    ]),
    moodStartAmbiguity: f.string(),
    smallEyeProb: f.chooseOne(["0", "1/root5", "1/5", "2/root5", "4/5", "1"]),
    smallEyeProbExplain: f.string(),
    finalMood: f.string(),
    finalMoodCanBeHappy: f.chooseOne(["possible", "impossible"]),
    finalMoodOtherStudents: f.chooseOne([
      "quantum student",
      "classical student",
    ]),
    surpriseResults: f.string(),
    thinkingDeeperAgreement: f.chooseOne(["agree", "disagree"]),
    thinkingDeeperExplain: f.string(),

    // Matrix Representation.
    happyVector: f.tuple(MoodVectorComponentChoice, MoodVectorComponentChoice),
    sadVector: f.tuple(MoodVectorComponentChoice, MoodVectorComponentChoice),
    smallVector: f.tuple(MoodVectorComponentChoice, MoodVectorComponentChoice),
    wideVector: f.tuple(MoodVectorComponentChoice, MoodVectorComponentChoice),
    happyEigenequation: f.string(),
    sadEigenequation: f.string(),
    moodMatrix: f.tuple(
      f.tuple(f.number(), f.number()),
      f.tuple(f.number(), f.number())
    ),

    // Expectation Value.
    weightedAverage: f.number(),
    expValueMeasurability: f.chooseOne(["yes", "no"]),
    expValueMeasurabilityExplain: f.string(),
    naiveAvg: f.string(),
  },
  hints: [
    "sizeEigen",
    "hiddenUnits",
    "smallBigInnerProduct",
    "possibleMoodEigenvalues",
    "moodEigenUnits",
    "happySadInnerProduct",
    "whyWideStressed",
    "smallEyeBasisChange",
    "abUnique",
    "collapsed1mmState",
    "collapsed1mmState2",
    "remeasure1mm",
    "remeasure1mm2",
    "measureUnhappyProbability",
    "smallEyedEmotion",
    "moodStart",
    "smallEyeProb",
    "finalMood",
    "thinkingDeeper",
    "weightedAverage",
    "expValueMeasurability",
    "naiveAvg",
  ],
});
