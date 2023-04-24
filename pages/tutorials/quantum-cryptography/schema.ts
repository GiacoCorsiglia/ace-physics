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
    // nature thing
    qubitStateEveSendsToBob: s.section(),
    bobsMeasurementAfterEveSends: s.section(),
    // nature thing
    fractionOfMismatchedComparedSampleBits: s.section(),
    fractionOfMismatchedComparedBits: s.section(),
    chanceOfEveBeingDetected: s.section(),
    oddsOfBobAliceFailToNotice: s.section(),
  },
  responses: {
    // Response fields here.
    amountOfBitStringsAgree: s.number(),
    fractionOfBitStringsAgree: s.chooseOne([
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
  },
  hints: {
    // Hints here.
  },
});
