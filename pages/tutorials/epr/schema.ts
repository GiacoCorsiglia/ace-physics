import * as s from "@/schema/tutorial";

const PretestAnswer = s.chooseOne(["+hbar/2", "-hbar/2", "either", "not sure"]);

export default s.tutorial({
  pages: {
    classicalMarbleScenario: s.page(),
    entangledStates: s.page(),
    investigatingCorrelation: s.page(),
    quantumCryptography: s.page(),
    eavesdroppingDetection: s.page(),
  },
  pretest: {
    aliceSpinUpX: PretestAnswer,
    aliceSpinUpZ: PretestAnswer,
    aliceSpinUpZAfter: PretestAnswer,
    aliceNoMeasurement: PretestAnswer,
  },
  posttest: {},
  sections: {
    marblesIntro: s.section(),
    compareToEPR: s.section(),

    entangledStatesIntro: s.section(),
    bStateAfterMeasureA: s.section(),
    bUpLikelihood: s.section(),
    howOftenAliceBobSpinUp: s.section(),
    howOftenAliceBobSame: s.section(),
    howOftenAliceSzBobSxSame: s.section(),
    causality: s.section(),

    investigatingCorrelationIntro: s.section(),
    bX1A0: s.section(),
    bX1A1: s.section(),
    aZ0B1Prob: s.section(),
    aZ1B1Prob: s.section(),
    aZbZ: s.section(),
    aZbX: s.section(),
    general: s.section(),

    quantumCryptographyIntro: s.section(),
    bobCertaintyTable: s.section(),
    bobCertaintyTableRule: s.section(),
    bobMeasurementTable: s.section(),
    keyTable: s.section(),
    key: s.section(),

    eavesdroppingDetectionIntro: s.section(),
    eavesdroppingFinal: s.section(),
    eveCertainty: s.section(),
    eveUndetected: s.section(),
    eveVsBob: s.section(),
    probBobUnaffectedEveX: s.section(),
    probBobUnaffectedEveZ: s.section(),
    probEveDetected: s.section(),
    eveDetectionTable: s.section(),
    overallDetectionProb: s.section(),
    whyQuantum: s.section(),
  },
  responses: {
    sameAsEPR: s.string(),
    differentFromEPR: s.string(),

    bStateAfterMeasureA: s.chooseOne([
      "|up_B>X",
      "|down_B>X",
      "|up_B>Z",
      "|down_B>Z",
      "cannot predict",
    ]),
    bStateAfterMeasureAExplain: s.string(),
    bUpLikelihood: s.chooseOne([
      "100%",
      "75%",
      "50%",
      "25%",
      "0%",
      "Not determined",
    ]),
    bUpLikelihoodExplain: s.string(),
    howOftenAliceBobSpinUp: s.string(),
    howOftenAliceBobSame: s.string(),
    howOftenAliceSzBobSxSame: s.string(),
    causality: s.string(),

    bX1A0: s.chooseOne(["X", "Z", "either", "none"]),
    bX1A1: s.chooseOne(["X", "Z", "either", "none"]),
    aZ0B1Prob: s.chooseOne([
      "100% certainty",
      "75% certainty",
      "50% certainty",
      "25% certainty",
      "0% certainty",
    ]),
    aZ1B1Prob: s.chooseOne([
      "100% certainty",
      "75% certainty",
      "50% certainty",
      "25% certainty",
      "0% certainty",
    ]),
    aZbZ: s.chooseAll(["0", "1", "either"]),
    aZbX: s.chooseAll(["0", "1", "either"]),
    general: s.chooseAll(["Bob 1", "Bob 0", "same direction"]),

    bobCertaintyTable: (() => {
      const choice = s.chooseOne(["certain", "uncertain"]);
      return s.object({
        aXbX: choice,
        aXbZ: choice,
        aZbX: choice,
        aZbZ: choice,
      });
    })(),
    bobCertaintyTableRule: s.chooseOne(["always", "sometimes", "never"]),
    bobMeasurementTable: (() => {
      const choice = s.chooseOne(["0", "1", "?"]);
      return s.object({
        a1aXbX: choice,
        a1aXbZ: choice,
        a1aZbX: choice,
        a1aZbZ: choice,
        a0aXbX: choice,
        a0aXbZ: choice,
        a0aZbX: choice,
        a0aZbZ: choice,
      });
    })(),
    keyTable: (() => {
      const choice = s.chooseOne(["0", "1", "-"]);
      return s.tuple(
        // 10 of them.
        choice,
        choice,
        choice,
        choice,
        choice,
        choice,
        choice,
        choice,
        choice,
        choice,
      );
    })(),
    key: s.string(false),

    eveCertainty: s.chooseOne([
      "certain if X",
      "certain if Z",
      "always certain",
      "never certain",
    ]),
    eveUndetected: s.chooseOne([
      "undetected",
      "detected",
      "maybe detected",
      "none",
    ]),
    eveVsBob: s.chooseOne(["same", "opposite", "either", "none"]),
    probBobUnaffectedEveX: s.chooseOne(["100%", "75%", "50%", "25%", "0%"]),
    probBobUnaffectedEveZ: s.chooseOne(["100%", "50%", "25%", "0%"]),
    probEveDetected: s.chooseOne(["75%", "50%", "25%", "0%"]),
    eveDetectionTable: s.object({
      abXeX: s.number(),
      abXeZ: s.number(),
      abZeX: s.number(),
      abZeZ: s.number(),
    }),
    overallDetectionProb: s.number(),
    oddsBobDoesntNoticeEve: s.string(),
    whyQuantum: s.string(),
  },
  hints: {
    // Hints here.
  },
});
