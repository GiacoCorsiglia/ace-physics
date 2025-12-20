import * as s from "@/schema/tutorial";

const tableRow = <T extends s.Field>(cell: T) => s.array(cell);

const chooseState = s.chooseOne(["|0>", "|1>", "|+>", "|->", "other", "unknown"]);
const chooseBit = s.chooseOne(["0", "1", "random","unknown"]);
//                                pages
export default s.tutorial({
  pages: {
    quantumKeyDistribution: s.page(),
    dealingWithRandomness: s.page(),
    sharingKey: s.page(),
    theEffectsOfAnEavesdropper: s.page(),
  },
  //                              pretest
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
  //                              posttest
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
  //                  page 1: quantum key distribution

  sections: {
    //intro
    quantumKeyDistributionIntro: s.section(),
     aliceSendsSeriesOfQubits: s.section(),
     //table 1
     tableWithoutEveStateAliceComplete: s.section(),

    //question A
    qubit1AliceToBob: s.section({
      messages: ["dynamicAnswer"],
    }),
    //question B
    qubit2And5AliceToBob: s.section(),
    qubit2AliceToBob: s.section({
      messages: ["dynamicAnswer"],
    }),
    qubit5AliceToBob: s.section({
      messages: ["dynamicAnswer"],
    }),
      //question C
    qubit8And9ApplyH: s.section(),
    qubit8ApplyH: s.section({
      messages: ["dynamicAnswer"],
    }),
    qubit9ApplyH: s.section({
      messages: ["dynamicAnswer"],
    }),
    //question D
    qubit10And11AlicesBit: s.section(),
    qubit10AlicesBit: s.section({
      messages: ["dynamicAnswer"],
    }),
    qubit11AlicesBit: s.section({
      messages: ["dynamicAnswer"],
    }),
    //table 2
    natureEffectBobBitAfterMeasurement: s.section(),
    // question E
    qubit2BobsBit: s.section({
      messages: ["dynamicAnswer"],
    }),
    // question F
    qubit3And4Bits: s.section(),
    qubit3BobsBit:s.section({
      messages: ["dynamicAnswer"],
    }),
    qubit4BobsBit: s.section({
      messages: ["dynamicAnswer"],
    }),

    //didBobApplyHBefore:  s.section({
     // messages: ["dynamicAnswer"],
    //}),
    // question G
    qubit6ApplyH: s.section({
      messages: ["dynamicAnswer"],
    }),
    //question H
    qubit7And10ApplyH: s.section(),
    qubit7ApplyH:  s.section({
      messages: ["dynamicAnswer"],
    }),
    qubit10ApplyH:  s.section({
      messages: ["dynamicAnswer"],
    }),
    // question I
    certainOrRandom:  s.section({
      messages: ["dynamicAnswer"],
    }),
   //                   page 2: dealing with randomness
    dealingWithRandomnessIntro: s.section(),
    // question A
   circumstancesWhenBobAndAlice100Agree: s.section(),
   // question B
    amountOfBitStringsAgree: s.section({
      messages: ["incorrect"],
    }),
    // question C
     fractionOfBitStringsAgree: s.section({
     messages: ["correct", "detour"],
    }),
    fractionOfBitStringsAgreeCorrect: s.section(),
    fractionOfBitStringsAgreeIncorrect: s.section({
      messages: ["correct", "incorrect"],
    }),
    // tableWithoutEveStateAlice2: s.section({
    //  messages: ["correctStates", "wrongStates"],
   // }),
   // tableWithoutEveStateAlice2Answers: s.section(),

    //question 3
    //question 4

    // Section 1


    //bobRandomChoiceOnEachQubit: s.section({
    //  messages: ["correctBits", "wrongBits", "wrongBits2"],
    //}),
    //bobRandomChoiceOnEachQubitAnswers: s.section(),
    //bobRandomChoiceOnEachQubit2: s.section({
      //messages: ["correctBits", "wrongBits", "wrongBits2"],
    //}),
    //bobRandomChoiceOnEachQubitAnswers2: s.section(),

    //circumstancesWhenBobAndAlice100Agree: s.section(),
    //amountOfBitStringsAgree: s.section({
     // messages: ["incorrect"],
   // }),

    // feedback for fractionOfBitStringsAgree
   // detour section
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
    // question D
    doesAliceBobShareKeyAtCurrentStage: s.section({
      messages: ["correct", "incorrect"],
    }),

    //               Page 3: Sharing A Private Key
    introToSharedKey: s.section(),
    //question A
    qubit6KeepOrDiscard: s.section({
      messages: ["dynamicAnswer"],
    }),
    //question B
    aliceAndBobKeepOrDiscard: s.section(),
    qubit7KeepOrDiscard:s.section({
      messages: ["dynamicAnswer"],
    }),
    qubit8KeepOrDiscard:s.section({
      messages: ["dynamicAnswer"],
    }),
    qubit10KeepOrDiscard: s.section({
      messages: ["dynamicAnswer"],
    }),
    //question C
    doesAliceBobShareKeyCheckTwo:  s.section({
      messages: ["dynamicAnswer"],
    }),
    //question D
    whatIsTheSharedKey: s.section({
      messages: ["correct", "incorrect"],
    }),
    //question E
    doesPublicInfoGiveInfoAboutBitString: s.section({
      messages: ["dynamicAnswer"],
    }),
    //          NEW      Page 4: The Effects of An Eavesdropper
    //doesAliceBobShareKeyCheckOne: s.section(),
    ////
    natureEffectAfterEveSendsQuestion: s.section(),
    qubit2And4EvesBit: s.section(),
    evesBitQubit2:  s.section({
      messages: ["dynamicAnswer"],
    }),
    evesBitQubit4:  s.section({
      messages: ["dynamicAnswer"],
    }),
    qubit4And9EvesBit: s.section(),
    ///?????
      evesBitQubit9:  s.section({
      messages: ["dynamicAnswer"]}),
    howOftenEveMeasuresR:s.section({
      messages: ["correct", "incorrect"],
    }),
      eveSendsBobQubit2:  s.section({
      messages: ["dynamicAnswer"],
    }),
    eveSendsBob3Qubits: s.section(),
     eveSendsBobQubit4:  s.section({
      messages: ["dynamicAnswer"],
    }),
     eveSendsBobQubit9:  s.section({
      messages: ["dynamicAnswer"],
    }),
     eveSendsBobQubit12:  s.section({
      messages: ["dynamicAnswer"],
    }),
    bobsMeasurementQubit4: s.section({
      messages: ["dynamicAnswer"],
    }),
    qubit5And8BobsMeasurement:s.section(),
    qubit5BobsMeasurement:  s.section({
      messages: ["dynamicAnswer"],
    }),
    qubit8BobsMeasurement:  s.section({
      messages: ["dynamicAnswer"],
    }),
    aliceAndBobNeedToCheck: s.section(),
    percentOfBobsTest: s.section({
      messages: ["correct", "incorrect"],
    }),

    ////
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
  /////////////////////////////////////////////////////////////////////////////
  //                             responses
  responses: {
    qubit1AliceToBob: s.chooseOne(["+z", "-z", "+x", "-x", "+y", "-y"]),
    qubit2AliceToBob: s.chooseOne(["+z", "-z", "+x", "-x", "+y", "-y"]),
    qubit5AliceToBob: s.chooseOne(["+z", "-z", "+x", "-x", "+y", "-y"]),
    qubit8ApplyH: s.chooseOne(["yes", "no","unknown"]),
    qubit9ApplyH: s.chooseOne(["yes", "no","unknown"]),
    qubit10AlicesBit: s.chooseOne(["0", "1", "impossible"]),
    qubit11AlicesBit: s.chooseOne(["0", "1", "impossible"]),

    tableWithoutEve: s.object({
     stateAlice: tableRow(chooseState),
      stateAliceTwo: tableRow(chooseState),
      bitBob:tableRow(chooseBit),
      bitBobTwo: tableRow(chooseBit),
      keepOrDiscard: tableRow(s.chooseOne(["keep", "discard","unknown"])),
    keepOrDiscardTwo: tableRow(s.chooseOne(["keep", "discard","unknown"])),
    }),

    tableWithEve: s.object({
      bitEve: tableRow(chooseBit),
      bitEveTwo: tableRow(chooseBit),
      stateEve: tableRow(chooseState),
      stateEveTwo: tableRow(chooseState),
      bitBob: tableRow(chooseBit),
       bitBobTwo: tableRow(chooseBit),
    }),
    qubit2BobsBit: s.chooseOne(["0", "1", "random"]),
    qubit3BobsBit: s.chooseOne(["0", "1", "random"]),
    qubit4BobsBit: s.chooseOne(["0", "1", "random"]),
    qubit6ApplyH: s.chooseOne(["yes", "no","unknown"]),
    qubit7ApplyH: s.chooseOne(["yes", "no","unknown"]),
    qubit10ApplyH: s.chooseOne(["yes", "no","unknown"]),
    certainOrRandom: s.chooseOne(["yes", "no"]),
    // Page 2: dealing with randomness

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
    doesAliceBobShareKeyCheckOne: s.chooseOne(["yes", "no"]),
// Page 3: Sharing a Private Key
    qubit6KeepOrDiscard: s.chooseOne(["+z", "-z", "+x", "-x", "+y", "-y"]),
    qubit7KeepOrDiscard: s.chooseOne(["+z", "-z", "+x", "-x", "+y", "-y"]),
    qubit8KeepOrDiscard: s.chooseOne(["+z", "-z", "+x", "-x", "+y", "-y"]),
    qubit10KeepOrDiscard: s.chooseOne(["+z", "-z", "+x", "-x", "+y", "-y"]),
   // doesAliceBobShareKeyCheckOne: s.chooseOne(["yes", "no"]),
    doesAliceBobShareKeyCheckTwo: s.chooseOne(["yes", "no"]),
    doesPublicInfoGiveInfoAboutBitString: s.chooseOne(["yes", "no"]),
     whatIsTheSharedKey: s.number(),
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


    frequencyTheyDiscardBit: s.chooseOne(["25%", "50%", "75%"]),




    // Section 2
    isPossibleEveMakeMeasurement: s.chooseOne([
      "yesAlways",
      "yesSometimes",
      "no",
    ]),
    ipEMMExplanation: s.string(),
    circumstancesEveMeasuresR: s.string(),

    circumstancesEveSendsSameState: s.string(),
    circumstancesBobCorrectBecomesR: s.string(),
    fractionOfMismatchedComparedSampleBits: s.number(),
    fractionOfMismatchedComparedBits: s.number(),
    chanceOfEveBeingUndetected: s.number(),
    oddsOfBobAliceFailToNotice: s.string(),
     // page 4
  evesBitQubit2: s.chooseOne(["yes","no","unknown"]),
  evesBitQubit4: s.chooseOne(["yes","no","unknown"]),
  evesBitQubit9: s.chooseOne(["yes","no","unknown"]),
   howOftenEveMeasuresR: s.number(),
   eveSendsBobQubit2: s.chooseOne(["+z", "-z", "+x", "-x", "+y", "-y"]),
   eveSendsBobQubit4: s.chooseOne(["+z", "-z", "+x", "-x", "+y", "-y"]),
   eveSendsBobQubit9: s.chooseOne(["+z", "-z", "+x", "-x", "+y", "-y"]),
   eveSendsBobQubit12: s.chooseOne(["+z", "-z", "+x", "-x", "+y", "-y"]),
   bobsMeasurementQubit4: s.chooseOne(["0", "1", "random"]),
    qubit5BobsMeasurement: s.chooseOne(["0", "1", "random"]),
    qubit8BobsMeasurement: s.chooseOne(["0", "1", "random"]),
    percentOfBobsTest: s.number(),
  },



  hints: {
    whatIsAKey: s.hint(),
    decisionTreeForMismatch: s.hint(),
    // Hints here.
  },
});
