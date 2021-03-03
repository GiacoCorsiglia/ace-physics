import * as f from "@/schema/fields";
import { tutorialSchema } from "@/schema/tutorial";

const PretestAnswer = f.chooseOne(["+hbar/2", "-hbar/2", "either", "not sure"]);

export default tutorialSchema({
  pages: [
    "marbles",
    "entangledStates",
    "investigatingCorrelation",
    "quantumCryptography",
    "eavesdroppingDetection",
  ],
  pretest: {
    aliceSpinUpX: PretestAnswer,
    aliceSpinUpZ: PretestAnswer,
    aliceSpinUpZAfter: PretestAnswer,
    aliceNoMeasurement: PretestAnswer,
  },
  sections: [
    "marblesIntro",
    "compareToEPR",

    "entangledStatesIntro",
    "bStateAfterMeasureA",
    "bUpLikelihood",
    "howOftenAliceBobSpinUp",
    "howOftenAliceBobSame",
    "howOftenAliceSzBobSxSame",
    "causality",

    "investigatingCorrelationIntro",
    "bX1A0",
    "bX1A1",
    "aZ0B1Prob",
    "aZ1B1Prob",
    "aZbZ",
    "aZbX",
    "general",

    "quantumCryptographyIntro",
    "bobCertaintyTable",
    "bobCertaintyTableRule",
    "bobMeasurementTable",
    "keyTable",
    "key",

    "eavesdroppingDetectionIntro",
    "eavesdroppingFinal",
    "eveCertainty",
    "eveUndetected",
    "eveVsBob",
    "probBobUnaffectedEveX",
    "probBobUnaffectedEveZ",
    "probEveDetected",
    "eveDetectionTable",
    "overallDetectionProb",
    "whyQuantum",
  ],
  responses: {
    sameAsEPR: f.string(),
    differentFromEPR: f.string(),

    bStateAfterMeasureA: f.chooseOne([
      "|up_B>X",
      "|down_B>X",
      "|up_B>Z",
      "|down_B>Z",
      "cannot predict",
    ]),
    bStateAfterMeasureAExplain: f.string(),
    bUpLikelihood: f.chooseOne([
      "100%",
      "75%",
      "50%",
      "25%",
      "0%",
      "Not determined",
    ]),
    bUpLikelihoodExplain: f.string(),
    howOftenAliceBobSpinUp: f.string(),
    howOftenAliceBobSame: f.string(),
    howOftenAliceSzBobSxSame: f.string(),
    causality: f.string(),

    bX1A0: f.chooseOne(["X", "Z", "either", "none"]),
    bX1A1: f.chooseOne(["X", "Z", "either", "none"]),
    aZ0B1Prob: f.chooseOne([
      "100% certainty",
      "75% certainty",
      "50% certainty",
      "25% certainty",
      "0% certainty",
    ]),
    aZ1B1Prob: f.chooseOne([
      "100% certainty",
      "75% certainty",
      "50% certainty",
      "25% certainty",
      "0% certainty",
    ]),
    aZbZ: f.chooseAll(["0", "1", "either"]),
    aZbX: f.chooseAll(["0", "1", "either"]),
    general: f.chooseAll(["Bob 1", "Bob 0", "same direction"]),

    bobCertaintyTable: (() => {
      const choice = f.chooseOne(["certain", "uncertain"]);
      return f.object({
        aXbX: choice,
        aXbZ: choice,
        aZbX: choice,
        aZbZ: choice,
      });
    })(),
    bobCertaintyTableRule: f.chooseOne(["always", "sometimes", "never"]),
    bobMeasurementTable: (() => {
      const choice = f.chooseOne(["0", "1", "?"]);
      return f.object({
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
      const choice = f.chooseOne(["0", "1", "-"]);
      return f.tuple(
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
        choice
      );
    })(),
    key: f.string(),

    eveCertainty: f.chooseOne([
      "certain if X",
      "certain if Z",
      "always certain",
      "never certain",
    ]),
    eveUndetected: f.chooseOne([
      "undetected",
      "detected",
      "maybe detected",
      "none",
    ]),
    eveVsBob: f.chooseOne(["same", "opposite", "either", "none"]),
    probBobUnaffectedEveX: f.chooseOne(["100%", "75%", "50%", "25%", "0%"]),
    probBobUnaffectedEveZ: f.chooseOne(["100%", "50%", "25%", "0%"]),
    probEveDetected: f.chooseOne(["75%", "50%", "25%", "0%"]),
    eveDetectionTable: f.object({
      abXeX: f.number(),
      abXeZ: f.number(),
      abZeX: f.number(),
      abZeZ: f.number(),
    }),
    overallDetectionProb: f.number(),
    oddsBobDoesntNoticeEve: f.string(),
    whyQuantum: f.string(),
  },
  hints: [
    // Hints here.
  ],
});
