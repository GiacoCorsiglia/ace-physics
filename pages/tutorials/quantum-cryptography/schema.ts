import * as s from "@/schema/tutorial";

const tableRow = <T extends s.Field>(cell: T) => s.array(cell);

const chooseState = s.chooseOne(["|0>", "|1>", "|+>", "|->", "other", "unknown"]);
const chooseBit = s.chooseOne(["0", "1", "random","unknown"]);
//                                pages
export default s.tutorial({
  pages: {
    sendingQubits: s.page(),
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
  //                         page 1: Sending Qubits

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
    mismatchExplanationPartOne: s.section(),
    mismatchExplanationPartTwo: s.section(),
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
    aliceAndBobPrivateKeyTable: s.section(),

    //                Page 4: The Effects of An Eavesdropper

    //intro
    theEffectsOfAnEavesdropperIntro: s.section(),
    theEffectsOfAnEavesdropperIntroCircuit: s.section(),
   //question A
    isPossibleEveMakeMeasurement: s.section({
      messages: ["discussion"],
    }),
    //table 1
    natureEffectAfterEveSendsQuestion: s.section(),
    //question B
    qubit2And4EvesBit: s.section(),
    evesBitQubit2:  s.section({
          messages: ["tryAgain", "nowCorrect"],
        }),
    evesBitQubit4:  s.section({
          messages: ["tryAgain", "nowCorrect"],
        }),
    //question C
    qubit5And9EvesBit: s.section(),
      evesBitQubit5:  s.section({
      messages: ["dynamicAnswer"]}),
      evesBitQubit9:  s.section({
      messages: ["dynamicAnswer"]}),
      //measure button
      hitMeasureForRandom: s.section(),
        // table 2
        natureEffectAfterEveSends: s.section(),
        //question D
      circumstancesEveMeasuresR: s.section({ messages: ["ourAnswer"] }),
      //table 3
      natureEffectAfterEveSends2: s.section(),
      //question E
      eveSendsBobQubit2:  s.section({
      messages: ["dynamicAnswer"],
    }),
    //question F
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
    //table 4
    tableWithEveAndNotBobComplete: s.section(),
    //question G
    circumstancesEveSendsSameState: s.section({ messages: ["ourAnswer"] }),
    //table 5
     bobsBitAfterEve1: s.section({
      messages: ["correctBits", "wrongBits", "wrongBits2"],
    }),
    //question H
    bobsMeasurementQubit4: s.section({
      messages: ["dynamicAnswer"],
    }),
    //question I
    qubit5And8BobsMeasurement:s.section(),
    qubit5BobsMeasurement:  s.section({
      messages: ["dynamicAnswer"],
    }),
    qubit8BobsMeasurement:  s.section({
      messages: ["dynamicAnswer"],
    }),
    //table 6
     bobsBitAfterEve3: s.section(),
     //question J
    circumstancesBobCorrectBecomesR: s.section(),
    //question K
     fractionOfMismatchedComparedSampleBits: s.section({
      messages: ["incorrect"],
    }),
    //question L
     fractionOfMismatchedComparedBits:s.section({
      messages: ["correct", "incorrect"],
    }),
    //explanation
    explanationOfMismatchedComparedBits: s.section(),
    //paragraph
    aliceAndBobNeedToCheck: s.section(),
    //question M
    percentOfBobsTest: s.section({
      messages: ["correct", "incorrect"],
    }),
    //question N
    oddsOfBobAliceFailToNotice: s.section({ messages: ["explanation"] }),
    //conclusion
    conclusion: s.section(),

  },
  /////////////////////////////////////////////////////////////////////////////
  //                             responses
  responses: {
    //                RESPONSES: page 1: Sending Qubits
    //question A
    qubit1AliceToBob: s.chooseOne(["+z", "-z", "+x", "-x", "+y", "-y"]),
    //question B
    qubit2AliceToBob: s.chooseOne(["+z", "-z", "+x", "-x", "+y", "-y"]),
    qubit5AliceToBob: s.chooseOne(["+z", "-z", "+x", "-x", "+y", "-y"]),
    //question C
    qubit8ApplyH: s.chooseOne(["yes", "no","unknown"]),
    qubit9ApplyH: s.chooseOne(["yes", "no","unknown"]),
    //question D
    qubit10AlicesBit: s.chooseOne(["0", "1", "impossible"]),
    qubit11AlicesBit: s.chooseOne(["0", "1", "impossible"]),
    //table info
    tableWithoutEve: s.object({
     stateAlice: tableRow(chooseState),
      stateAliceTwo: tableRow(chooseState),
      bitBob:tableRow(chooseBit),
      bitBobTwo: tableRow(chooseBit),
      keepOrDiscard: tableRow(s.chooseOne(["keep", "discard","unknown"])),
    keepOrDiscardTwo: tableRow(s.chooseOne(["keep", "discard","unknown"])),
    }),
    // table info
    tableWithEve: s.object({
      bitEve: tableRow(chooseBit),
      bitEveTwo: tableRow(chooseBit),
      stateEve: tableRow(chooseState),
      stateEveTwo: tableRow(chooseState),
      bitBob: tableRow(chooseBit),
      bitBobTwo: tableRow(chooseBit),
    }),
    //question E
    qubit2BobsBit: s.chooseOne(["0", "1", "random"]),
    //question F
    qubit3BobsBit: s.chooseOne(["0", "1", "random"]),
    qubit4BobsBit: s.chooseOne(["0", "1", "random"]),
    //question G
    qubit6ApplyH: s.chooseOne(["yes", "no","unknown"]),
    //question H
    qubit7ApplyH: s.chooseOne(["yes", "no","unknown"]),
    qubit10ApplyH: s.chooseOne(["yes", "no","unknown"]),
    //question I
    certainOrRandom: s.chooseOne(["yes", "no"]),

    //            RESPONSES: Page 2: dealing with randomness
    //question A
    circumstancesWhenBobAndAlice100Agree: s.string(),
    //question B
    amountOfBitStringsAgree: s.number(),
    //question C
    fractionOfBitStringsAgree: s.chooseOne([
      "0%",
      "25%",
      "50%",
      "75%",
      "100%",
      "other",
    ]),
    //detour section
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
     howOftenBobResultBeRandom: s.chooseOne(["0%", "25%", "50%", "75%", "100%"]),
    isBobResultNotRandomAgreement: s.chooseOne(["yes", "no"]),
    //question D
    doesAliceBobShareKeyCheckOne: s.chooseOne(["yes", "no"]),

//                RESPONSES: Page 3: Sharing a Private Key
    //question A
    qubit6KeepOrDiscard: s.chooseOne(["+z", "-z", "+x", "-x", "+y", "-y"]),
    //question B
    qubit7KeepOrDiscard: s.chooseOne(["+z", "-z", "+x", "-x", "+y", "-y"]),
    qubit8KeepOrDiscard: s.chooseOne(["+z", "-z", "+x", "-x", "+y", "-y"]),
    qubit10KeepOrDiscard: s.chooseOne(["+z", "-z", "+x", "-x", "+y", "-y"]),
   // doesAliceBobShareKeyCheckOne: s.chooseOne(["yes", "no"]),
   //question C
    doesAliceBobShareKeyCheckTwo: s.chooseOne(["yes", "no"]),
    //question D
     whatIsTheSharedKey: s.string(),
     //question E
     doesPublicInfoGiveInfoAboutBitString: s.chooseOne(["yes", "no"]),

     //         RESPONSES: Page 4: The Effects of an Eavesdropper
     //question A
     isPossibleEveMakeMeasurement: s.chooseOne([
      "yesAlways",
      "yesSometimes",
      "no",
    ]),
    ipEMMExplanation: s.string(),
     //question B
  evesBitQubit2: s.chooseOne(["0","1","random"]),
  evesBitQubit4: s.chooseOne(["0","1","random"]),
  //question C
  evesBitQubit5: s.chooseOne(["0","1","random"]),
  evesBitQubit9: s.chooseOne(["0","1","random"]),
  //question D
  circumstancesEveMeasuresR: s.string(),
  howOftenEveMeasuresR: s.number(),
   //question E
   eveSendsBobQubit2: s.chooseOne(["+z", "-z", "+x", "-x", "+y", "-y"]),
   //question F
   eveSendsBobQubit4: s.chooseOne(["+z", "-z", "+x", "-x", "+y", "-y"]),
   eveSendsBobQubit9: s.chooseOne(["+z", "-z", "+x", "-x", "+y", "-y"]),
   eveSendsBobQubit12: s.chooseOne(["+z", "-z", "+x", "-x", "+y", "-y"]),
   //question G
    circumstancesEveSendsSameState: s.string(),
   //question H
   bobsMeasurementQubit4: s.chooseOne(["0", "1", "random"]),
   //question I
    qubit5BobsMeasurement: s.chooseOne(["0", "1", "random"]),
    qubit8BobsMeasurement: s.chooseOne(["0", "1", "random"]),
    //question J
    circumstancesBobCorrectBecomesR: s.string(),
    //question K
    fractionOfMismatchedComparedSampleBits: s.number(),
    //question L
    fractionOfMismatchedComparedBits: s.number(),
    //question M
    percentOfBobsTest: s.number(),
    //question N
    oddsOfBobAliceFailToNotice: s.string(),
  },
//                              hints
  hints: {
    whatIsAKey: s.hint(),
    decisionTreeForMismatch: s.hint(),
    // Hints here.
  },
});
