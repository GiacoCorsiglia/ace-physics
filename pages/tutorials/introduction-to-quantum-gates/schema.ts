import * as s from "@/schema/tutorial";

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
    xTimesArbitraryKet: s.section(),
    xTimesKet: s.section(),
    xTimesPlus: s.section(),

    zGateIntro: s.section(),
    zTimesArbitraryKet: s.section(),
    zTimesKet: s.section(),
    zTimesPlus: s.section(),

    hadamardGateIntro: s.section(),
    hTimes0And1: s.section(),
    hTimes0And1Answer: s.section(),
    hTimesKet: s.section(),
    hTimesHTimesKet: s.section(),

    identityGateIntro: s.section(),
    identityGateTimesKet: s.section(),
    xAndZSquaredEqualsI: s.section(),
  },
  responses: {
    qubitProb0: s.number(),
    qubitProb1: s.number(),

    xTimesArbitraryKet: s.string(),
    xTimesKet: s.tuple(s.string(), s.string()),
    xTimesPlus: s.chooseOne(["yes", "no"]),

    zTimesArbitraryKet: s.string(),
    zTimesKet: s.tuple(s.string(), s.string()),
    zTimesPlus: s.chooseOne(["yes", "no"]),

    hTimes0: s.string(),
    hTimes1: s.string(),
    hTimesKet: s.tuple(s.string(), s.string()),
    hTimesHTimesKet: s.string(),

    identityGateTimesKet: s.chooseOne(["yes", "no"]),
    xAndZSquaredEqualsI: s.chooseOne(["true", "false"]),
  },
  hints: {
    probability: s.hint(),
    withoutMatrices: s.hint(),
    actX: s.hint(),
  },
});
