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
    // nature thing
    amountOfBitStringsAgree: s.section(),
    fractionOfBitStringsAgree: s.section(),
    doesAliceBobShareKeyCheckOne: s.section(),
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
  },
  hints: {
    // Hints here.
  },
});
