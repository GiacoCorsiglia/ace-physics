import * as s from "@/schema/tutorial";

export default s.tutorial({
  pages: {
    measurementAndCommutation: s.page(),
    aMischiefOfMice: s.page(),
    quietAsAMouse: s.page(),
    backToSpins: s.page(),
    interpretingOperatorsInQuantumMechanics: s.page(),
  },
  pretest: {
    SzTimesPsi: s.string(false),
    interpretSzTimesPsi: s.chooseOne([
      "experimental value",
      "resulting state",
      "mathematical relation",
    ]),
    possibleCMeasurementResults: s.string(),
    doAAndCCommute: s.chooseOne(["yes", "no"]),
    doAAndCCommuteExplain: s.string(),
  },
  posttest: {},
  sections: {
    measurementAndCommutationIntro: s.section(),
    eyeSizeMeasAffectsHappinessPredict: s.section({
      messages: ["correct", "incorrectHint", "incorrectStrong"],
    }),
    mAndSCompatibility: s.section({
      messages: ["commutationIncorrect", "simultaneousEigenvectorsIncorrect"],
    }),
    canKnowEyeSizeHappinessSimultaneous: s.section(),

    aMischiefOfMiceIntro: s.section(),
    expValUncertaintyS: s.section(),
    signExpValM: s.section({
      messages: ["encouragement"],
    }),
    extremaMagnitudeExpValM: s.section(),
    extremaUncertaintyM: s.section(),
    expValUncertaintyM: s.section({
      messages: [
        // Right now we're just checking expectation value.
        "expValCorrectSignPredictionIncorrect",
        "expValCorrectBoundsIncorrect",
        "expValIncorrectPredictionsCorrect",
        "expValSomePredictionsIncorrect",
        "allCorrect",
      ],
    }),

    quietAsAMouseIntro: s.section(),
    representationNStates: s.section(),
    representationNOperator: s.section(),
    doNAndMCommute: s.section(),
    simultaneousEigenstatesNMS: s.section(),
    quietMiceExpValUncertaintyNM: s.section(),
    quietMiceCanUncertaintySBeZero: s.section(),

    backToSpinsIntro: s.section(),
    interpretSzEigenequation: s.section(),
    SzTimesArbitraryKetKindOfObject: s.section(),
    SzTimesPlusX: s.section(),
    SzTimesPlusXIsKindOfObject: s.section(),
    SzTimesPlusXIsNormalized: s.section(),

    interpretingOperatorsInQuantumMechanicsIntro: s.section(),
    SzTimesPlusXIsEigenequation: s.section(),
    doesSzTimesPlusXConnectToMeasurement: s.section(),
    canPredictSz: s.section(),
    SzTimesArbitraryKet: s.section(),
    studentInterpretationsOfSzTimesPsi: s.section(),
    whyOperatorTimesStateIsNotMeasurement: s.section(),
  },
  responses: {
    eyeSizeMeasAffectsHappinessPredict: s.chooseOne(["yes", "no"]),
    eyeSizeMeasAffectsHappinessPredictExplain: s.string(),
    mAndSCommute: s.chooseOne(["yes", "no"]),
    mAndSSimultaneousEigenvectors: s.chooseOne(["yes", "no"]),
    mAndSCommuteAffectsChainedMeasurements: s.string(),
    canKnowEyeSizeHappinessSimultaneous: s.chooseOne(["yes", "no"]),
    canKnowEyeSizeHappinessSimultaneousExplain: s.string(),

    expValS: s.number(),
    expValSUnits: s.chooseOne(["none", "mm", "eV"]),
    uncertaintyS: s.number(),
    uncertaintySUnits: s.chooseOne(["none", "mm", "eV"]),

    signExpValM: s.chooseOne(["negative", "positive", "zero"]),
    signExpValMExplain: s.string(),
    smallestMagnitudeExpValM: s.number(),
    largestMagnitudeExpValM: s.number(),
    smallestUncertaintyM: s.number(),
    largestUncertaintyM: s.number(),
    expValM: s.number(),
    uncertaintyM: s.number(),

    notationNoisyState: s.string(false),
    notationQuietState: s.string(false),
    noisyStateHappinessBasis: s.string(false),
    quietStateHappinessBasis: s.string(false),
    representationNOperator: s.tuple(
      s.tuple(s.number(), s.number()),
      s.tuple(s.number(), s.number())
    ),
    doNAndMCommute: s.chooseOne(["yes", "no"]),
    simultaneousEigenstatesNM: s.chooseOne(["yes", "no"]),
    simultaneousEigenstatesNS: s.chooseOne(["yes", "no"]),
    simultaneousEigenstatesNMSExplain: s.string(),
    quietMiceExpValN: s.number(),
    quietMiceUncertaintyN: s.number(),
    quietMiceExpValM: s.number(),
    quietMiceUncertaintyM: s.number(),
    quietMiceCanUncertaintySBeZero: s.chooseOne(["yes", "no"]),
    quietMiceCanUncertaintySBeZeroExplain: s.string(),

    interpretSz: s.string(),
    interpretPlusZ: s.string(),
    interpretHBarOver2: s.string(),
    SzTimesArbitraryKetKindOfObject: s.chooseOne(
      ["bra", "ket", "operator", "number"],
      s.string()
    ),
    SzTimesPlusXKindOfObject: s.chooseOne(["bra", "ket", "operator", "number"]),
    SzTimesPlusXIsNormalized: s.chooseOne(["yes", "no"]),

    SzTimesPlusXIsEigenequation: s.chooseOne(["yes", "no"]),
    doesSzTimesPlusXConnectToMeasurement: s.chooseOne(["yes", "no"]),
    doesSzTimesPlusXConnectToMeasurementExplain: s.string(),
    canPredictSzForPlusX: s.chooseOne(["yes", "no"]),
    canPredictFinalState: s.chooseOne(["yes", "no"]),
    SzTimesArbitraryKet: s.string(false),
    studentInterpretationsOfSzTimesPsi: s.string(),
    whyOperatorTimesStateIsNotMeasurement: s.string(),
  },
  hints: {
    eyeSizeMeasAffectsHappinessPredict: s.hint(),
    expValUncertaintyS: s.hint(),
  },
});
