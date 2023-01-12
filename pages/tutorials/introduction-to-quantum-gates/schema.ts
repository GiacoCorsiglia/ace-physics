import * as s from "@/schema/tutorial";

const ZTimesKetElement = s.chooseOne(["3i/5", "-3i/5", "4/5", "-4/5"]);

export default s.tutorial({
  pages: {
    quantumBits: s.page(),
    xGate: s.page(),
    zGate: s.page(),
    hadamardGate: s.page(),
    identityGate: s.page(),
  },
  pretest: {
    // Pretest fields here.
  },
  posttest: {
    // Posttest fields here.
  },
  sections: {
    quantumBitsIntro: s.section(),
    qubitsAsColumns: s.section(),
    qubitProb0: s.section({
      messages: [
        "correct",
        "negativeCorrect",
        "unsquared",
        "outOfRange",
        "incorrect",
      ],
    }),
    qubitProb1: s.section({
      messages: ["correct", "incorrect"],
    }),

    xGateIntro: s.section(),
    xGate: s.section(),
    xTimesArbitraryKet: s.section({
      messages: ["answer"],
    }),
    xTimesKet: s.section(),
    xTimesPlus: s.section({
      messages: ["answer"],
    }),

    zGateIntro: s.section(),
    zTimesKet: s.section({
      messages: ["correct", "incorrect"],
    }),
    zTimesArbitraryKet: s.section(),
    zTimesPlus: s.section({
      messages: ["answer"],
    }),

    hadamardGateIntro: s.section(),
    hTimes0And1: s.section(),
    hTimes0And1Answer: s.section(),
    plusMinus: s.section(),
    hTimesKet: s.section({
      messages: ["correct", "incorrect"],
    }),
    hTimesHTimesKet: s.section({
      messages: ["correct", "signError", "plus", "incorrect"],
    }),

    identityGateIntro: s.section(),
    identityTimesKet: s.section({
      messages: ["answer"],
    }),
    xAndZSquaredEqualsI: s.section({
      messages: ["answer"],
    }),
  },
  responses: {
    qubitProb0: s.number(),
    qubitProb1: s.number(),

    xTimesArbitraryKet: s.string(),
    xTimesKet: s.tuple(s.string(), s.string()),
    xTimesPlus: s.chooseOne(["yes", "no"]),

    zTimesKet: s.tuple(ZTimesKetElement, ZTimesKetElement),
    zTimesArbitraryKet: s.string(),
    zTimesPlus: s.chooseOne(["yes", "no"]),

    hTimes0: s.string(),
    hTimes1: s.string(),
    hTimesKet: s.tuple(s.string(), s.string()),
    hTimesHTimesKet: s.chooseOne([
      "|0>",
      "|1>",
      "|+>",
      "|->",
      "-|0>",
      "-|1>",
      "-|+>",
      "-|->",
    ]),

    identityTimesKet: s.chooseOne(["yes", "no"]),
    xAndZSquaredEqualsI: s.chooseOne(["true", "false"]),
  },
  hints: {
    probability: s.hint(),
    withoutMatrices: s.hint(),
    actX: s.hint(),
    phase: s.hint(),
  },
});
