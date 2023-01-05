import * as s from "@/schema/tutorial";

export default s.tutorial({
  pages: {
    quantumBits: s.page(),
    xGate: s.page(),
    zGate: s.page(),
    hadamardGate: s.page(),
    identityGate: s.page(),
    circuitDiagrams: s.page(),
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
    qubitProb0: s.section(),
    qubitProb1: s.section(),

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
    isOperatorIdentity: s.section(),
    xAndZSquaredEqualsI: s.section(),

    circuitDiagramsIntro: s.section(),
    doXAndZCommute: s.section({
      messages: ["answer"],
    }),
    doesZSelfCommute: s.section(),
    circuitDiagramOrder: s.section(),
    outputXZ1: s.section(),
    outputZX1: s.section(),
    matrixOrEquationApproach: s.section(),
    inverseOfX: s.section(),
    outputZHPlus: s.section(),
    outputHZPlus: s.section(),
    doHZCommute: s.section(),
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
    isOperatorIdentity: s.string(),
    xAndZSquaredEqualsI: s.chooseOne(["true", "false"]),

    doXAndZCommute: s.chooseOne(["yes", "no"]),
    doesZSelfCommute: s.chooseOne(["yes", "no"]),
    circuitDiagramOrder: s.chooseOne(["xz", "zx", "either order"]),
    outputXZ1: s.string(),
    outputZX1: s.string(),
    matrixOrEquationApproach: s.string(),
    inverseOfX: s.chooseOne(["X", "Z", "H", "I"]),
    outputZHPlus: s.string(),
    outputHZPlus: s.string(),
    doHZCommute: s.string(),
  },
  hints: {
    withoutMatrices: s.hint(),
    actX: s.hint(),
  },
});
