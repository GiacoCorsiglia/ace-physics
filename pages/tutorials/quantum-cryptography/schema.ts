import * as s from "@/schema/tutorial";

const tableRow = <T extends s.Field>(cell: T) => s.array(cell);

const chooseState = s.chooseOne(["|0>", "|1>", "|+>", "|->", "other"]);
const chooseBit = s.chooseOne(["0", "1", "random"]);

export default s.tutorial({
  pages: {
    quantumKeyDistribution: s.page(),
    sharingKey: s.page(),
    theEffectsOfAnEavesdropper: s.page(),
  },
  pretest: {
    // Pretest fields here.
  },
  posttest: {
    // Posttest fields here.
  },
  sections: {
    tableWithoutEveStateAlice1: s.section({
      messages: ["correctStates", "wrongStates"],
    }),
    tableWithoutEveStateAlice1Answers: s.section(),

    tableWithoutEveStateAlice2: s.section({
      messages: ["correctStates", "wrongStates"],
    }),
    tableWithoutEveStateAlice2Answers: s.section(),
    tableWithoutEveStateAliceComplete: s.section(),

    // Section 1
    quantumKeyDistributionIntro: s.section(),
    aliceSendsSeriesOfQubits: s.section(),
    bobRandomChoiceOnEachQubit: s.section({
      messages: ["correctBits", "wrongBits", "wrongBits2"],
    }),
    bobRandomChoiceOnEachQubitAnswers: s.section(),
    bobRandomChoiceOnEachQubit2: s.section({
      messages: ["correctBits", "wrongBits", "wrongBits2"],
    }),
    bobRandomChoiceOnEachQubitAnswers2: s.section(),
    natureEffectBobBitAfterMeasurement: s.section(),
    amountOfBitStringsAgree: s.section(),
    fractionOfBitStringsAgree: s.section({
      messages: ["correct", "detour"],
    }),
    // feedback for fractionOfBitStringsAgree
    fractionOfBitStringsAgreeCorrect: s.section(),
    fractionOfBitStringsAgreeIncorrect: s.section({
      messages: ["correct", "incorrect"],
    }),
    isBobResultNotRandomAgreement: s.section({
      messages: ["incorrect"],
    }),
    howOftenNeverthelessMatch: s.section({
      messages: ["correct", "incorrect"],
    }),
    fractionOfBitStringsAgreeRetry: s.section({
      messages: ["correct", "incorrect"],
    }),
    fractionOfBitStringsAgreeRetryCorrect: s.section(),
    fractionOfBitStringsAgreeRetryIncorrect: s.section(),

    doesAliceBobShareKeyAtCurrentStage: s.section({
      messages: ["correct", "incorrect"],
    }),
    // feedback for doesAliceBobShareKeyAtCurrentStage
    doesAliceBobShareKeyAtCurrentStageIncorrect: s.section(),

    doesAliceBobShareKeyCheckTwo: s.section({
      messages: ["incorrect"],
    }),
    whatIsTheSharedKey: s.section(),
    doesPublicInfoGiveInfoAboutBitString: s.section(),
    aliceAndBobPrivateKeyTable: s.section(),
    // Section: "Sharing A Private Key"
    introToSharedKey: s.section(),
    fractionOfBitStringsAgreeExplanationPartOne: s.section(),
    fractionOfBitStringsAgreeExplanationPartTwo: s.section(),
    keepOrDiscardTableRow1: s.section({
      messages: ["incorrect"],
    }),
    keepOrDiscardTableRow1Answers: s.section(),
    keepOrDiscardTableRow2: s.section({
      messages: ["incorrect"],
    }),
    keepOrDiscardTableRow2Answers: s.section(),
    keepOrDiscardTableRowComplete: s.section(),

    frequencyTheyDiscardBit: s.section({
      messages: ["correct", "incorrect"],
    }),

    // Section 3
    theEffectsOfAnEavesdropperIntro: s.section(),
    theEffectsOfAnEavesdropperIntroCircuit: s.section(),
    isPossibleEveMakeMeasurement: s.section({
      messages: ["discussion"],
    }),
    evesBitAfterMeasurement: s.section({
      messages: ["correctBits", "wrongBits", "wrongBits2"],
    }),
    eveRandomChoiceOnEachQubitAnswers: s.section(),
    evesBitAfterMeasurement2: s.section({
      messages: ["correctBits", "wrongBits", "wrongBits2"],
    }),
    eveRandomChoiceOnEachQubitAnswers2: s.section(),
    natureEffectAfterEveSends: s.section(),
    qubitStateEveSendsToBob1: s.section({
      messages: ["correctStates", "wrongStates", "wrongStates2"],
    }),
    qubitStateEveSendsToBob1Answers: s.section(),
    qubitStateEveSendsToBob2: s.section({
      messages: ["correctStates", "wrongStates", "wrongStates2"],
    }),
    qubitStateEveSendsToBob2Answers: s.section(),
    tableWithEveAndNotBobComplete: s.section(),
    bobsBitAfterEve1: s.section({
      messages: ["correctBits", "wrongBits", "wrongBits2"],
    }),
    bobsBitAfterEve1Answers: s.section(),
    bobsBitAfterEve2: s.section({
      messages: ["correctBits", "wrongBits", "wrongBits2"],
    }),
    bobsBitAfterEve2Answers: s.section(),

    bobsMeasurementAfterEveSends: s.section(),
    natureEffectToBobMeasurements: s.section(),
    fractionOfMismatchedComparedSampleBits: s.section(),
    fractionOfMismatchedComparedBits: s.section(),
    chanceOfEveBeingDetected: s.section(),
    oddsOfBobAliceFailToNotice: s.section(),
  },
  responses: {
    tableWithoutEve: s.object({
      stateAlice: tableRow(chooseState),
      bitBob: tableRow(chooseBit),
      keepOrDiscard: tableRow(s.chooseOne(["keep", "discard"])),
    }),

    tableWithEve: s.object({
      bitEve: tableRow(chooseBit),
      stateEve: tableRow(chooseState),
      bitBob: tableRow(chooseBit),
    }),

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
    howOftenBobResultBeRandom: s.chooseOne(["0%", "25%", "50%", "75%", "100%"]),
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
    isPossibleEveMakeMeasurement: s.chooseOne([
      "yesAlways",
      "yesSometimes",
      "no",
    ]),
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
