import * as s from "@/schema/tutorial";

export default s.tutorial({
  pages: {
    quantumKeyDistribution: s.page(),
    theEffectsOfAnEavesdropper: s.page(),
  },
  pretest: {
    // Pretest fields here.
  },
  posttest: {
    // Posttest fields here.
  },
  sections: {
    // Section 1
    quantumKeyDistributionIntro: s.section(),
    aliceSendsSeriesOfQubits: s.section(),
    stateAliceHasSentBob: s.section(),
    bobRandomChoiceOnEachQubit: s.section(),
    natureEffectBobBitAfterMeasurement: s.section(),
    amountOfBitStringsAgree: s.section(),
    fractionOfBitStringsAgree: s.section(),
    // feedback for fractionOfBitStringsAgree
    fractionOfBitStringsAgreeCorrect: s.section(),
    fractionOfBitStringsAgreeIncorrect: s.section(),
    isBobResultNotRandomAgreement: s.section(),
    howOftenNeverthelessMatch: s.section(),
    howOftenNeverthelessMatchFeedback: s.section(),
    fractionOfBitStringsAgreeRetry: s.section(),
    fractionOfBitStringsAgreeRetryCorrect: s.section(),
    fractionOfBitStringsAgreeRetryIncorrect: s.section(),

    doesAliceBobShareKeyAtCurrentStage: s.section(),
    // feedback for doesAliceBobShareKeyAtCurrentStage
    doesAliceBobShareKeyAtCurrentStageIncorrect: s.section(),

    fractionOfBitStringsAgreeExplanation: s.section(),
    frequencyTheyDiscardBit: s.section(),
    keepOrDiscardTableRow: s.section(),
    doesAliceBobShareKeyCheckTwo: s.section(),
    whatIsTheSharedKey: s.section(),
    doesPublicInfoGiveInfoAboutBitString: s.section(),
    aliceAndBobPrivateKeyTable: s.section(),
    // Section 2
    theEffectsOfAnEavesdropperIntro: s.section(),
    isPossibleEveMakeMeasurement: s.section(),
    evesBitAfterMeasurement: s.section(),
    natureEffectAfterEveSends: s.section(),
    qubitStateEveSendsToBob: s.section(),
    bobsMeasurementAfterEveSends: s.section(),
    tableValidationAndNatureNotice: s.section(),
    natureEffectToBobMeasurements: s.section(),
    fractionOfMismatchedComparedSampleBits: s.section(),
    fractionOfMismatchedComparedBits: s.section(),
    chanceOfEveBeingDetected: s.section(),
    oddsOfBobAliceFailToNotice: s.section(),
  },
  responses: {
    // Section 1
    amountOfBitStringsAgree: s.number(),
    fractionOfBitStringsAgree: s.chooseOne([
      "0%",
      "25%",
      "50%",
      "75%",
      "100%",
      "other",
    ]),
    // feedback
    howOftenBobResultBeRandom: s.chooseOne([
      "0%",
      "25%",
      "50%",
      "75%",
      "100%",
      "other",
    ]),
    isBobResultNotRandomAgreement: s.chooseOne(["yes", "no"]),
    howOftenWillTheyNeverthelessMatch: s.chooseOne([
      "0%",
      "25%",
      "50%",
      "75%",
      "100%",
      "other",
    ]),
    fractionOfBitStringsAgreeRetry: s.chooseOne([
      "0%",
      "25%",
      "50%",
      "75%",
      "100%",
      "other",
    ]),

    doesAliceBobShareKeyCheckOne: s.chooseOne(["yes", "no"]),
    frequencyTheyDiscardBit: s.chooseOne(["25%", "50%", "75%"]),
    doesAliceBobShareKeyCheckTwo: s.chooseOne(["yes", "no"]),
    whatIsTheSharedKey: s.number(),
    doesPublicInfoGiveInfoAboutBitString: s.chooseOne(["yes", "no"]),
    // Section 2
    isPossibleEveMakeMeasurement: s.chooseOne(["yes", "no"]),
    ipEMMExplanation: s.string(),
    fractionOfMismatchedComparedSampleBits: s.number(),
    fractionOfMismatchedComparedBits: s.number(),
    chanceOfEveBeingDetected: s.number(),
    oddsOfBobAliceFailToNotice: s.string(),
  },
  hints: {
    // Hints here.
  },
});
