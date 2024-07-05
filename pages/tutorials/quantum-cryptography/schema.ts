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
    whenBobMeasuresCorrectly: s.chooseAll([
      "sendMeasure",
      "HsendMeasure",
      "sendHMeasure",
      "HsendHMeasure",
    ]),
    probOfMeasuringCorrectly: s.number(),
    whenStateRemainsSame: s.chooseAll([
      "minusMeasure",
      "plusHMeasureH",
      "zeroMeasure",
      "oneHMeasureH",
    ]),
    probOfStateSame: s.number(),
  },
  posttest: {
    whenBobMeasuresCorrectly: s.chooseAll([
      "sendMeasure",
      "HsendMeasure",
      "sendHMeasure",
      "HsendHMeasure",
    ]),
    probOfMeasuringCorrectly: s.number(),
    whenStateRemainsSame: s.chooseAll([
      "minusMeasure",
      "plusHMeasureH",
      "zeroMeasure",
      "oneHMeasureH",
    ]),
    probOfStateSame: s.number(),
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
    circumstancesWhenBobAndAlice100Agree: s.section(),
    amountOfBitStringsAgree: s.section({
      messages: ["incorrect"],
    }),
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

    // Section 2: "Sharing A Private Key"
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

    doesAliceBobShareKeyAtCurrentStageIncorrect: s.section(),

    doesAliceBobShareKeyCheckTwo: s.section({
      messages: ["incorrect"],
    }),
    whatIsTheSharedKey: s.section({
      messages: ["incorrect"],
    }),
    doesPublicInfoGiveInfoAboutBitString: s.section({
      messages: ["incorrect"],
    }),
    aliceAndBobPrivateKeyTable: s.section(),

    // Section 3: "The Effects of an Eavesdropper"
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
    circumstancesEveMeasuresR: s.section({ messages: ["ourAnswer"] }),
    qubitStateEveSendsToBob1: s.section({
      messages: ["correctStates", "wrongStates", "wrongStates2"],
    }),
    qubitStateEveSendsToBob1Answers: s.section(),
    qubitStateEveSendsToBob2: s.section({
      messages: ["correctStates", "wrongStates", "wrongStates2"],
    }),
    qubitStateEveSendsToBob2Answers: s.section(),
    tableWithEveAndNotBobComplete: s.section(),
    circumstancesEveSendsSameState: s.section({ messages: ["ourAnswer"] }),
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
    circumstancesBobCorrectBecomesR: s.section(),
    fractionOfMismatchedComparedSampleBits: s.section({
      messages: ["incorrect"],
    }),
    fractionOfMismatchedComparedBits: s.section({
      messages: ["incorrect", "correct", "didYouWriteMismatch"],
    }),
    explanationOfMismatchedComparedBits: s.section(),
    chanceOfEveBeingUndetected: s.section({ messages: ["incorrect"] }),
    oddsOfBobAliceFailToNotice: s.section({ messages: ["explanation"] }),
    conclusion: s.section(),
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

    circumstancesWhenBobAndAlice100Agree: s.string(),
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
    circumstancesEveMeasuresR: s.string(),
    howOftenEveMeasuresR: s.number(),
    circumstancesEveSendsSameState: s.string(),
    circumstancesBobCorrectBecomesR: s.string(),
    fractionOfMismatchedComparedSampleBits: s.number(),
    fractionOfMismatchedComparedBits: s.number(),
    chanceOfEveBeingUndetected: s.number(),
    oddsOfBobAliceFailToNotice: s.string(),
  },
  hints: {
    whatIsAKey: s.hint(),
    decisionTreeForMismatch: s.hint(),
    // Hints here.
  },
});
