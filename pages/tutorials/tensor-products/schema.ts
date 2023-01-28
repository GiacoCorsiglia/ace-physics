import * as s from "@/schema/tutorial";

const fourDCol = s.tuple(s.number(), s.number(), s.number(), s.number());

const fourXFourMatrix = s.tuple(
  s.tuple(s.number(), s.number(), s.number(), s.number()),
  s.tuple(s.number(), s.number(), s.number(), s.number()),
  s.tuple(s.number(), s.number(), s.number(), s.number()),
  s.tuple(s.number(), s.number(), s.number(), s.number())
);

export default s.tutorial({
  pages: {
    addingASecondQubit: s.page(),
    operators: s.page(),
    summaryQuestions: s.page(),
    twoQubitVectorSpace: s.page(),
    twoQubitOperators: s.page(),
  },
  pretest: {
    // Pretest fields here.
  },
  posttest: {
    // Posttest fields here.
  },
  sections: {
    addingASecondQubitIntro: s.section(),
    write2QubitState: s.section(),
    // make this alphabetical order
    write2QubitStateSelectAll: s.section(),
    full2QubitProbability: s.section(),
    probabilityFirstQubitOnly: s.section(),
    // Section 1.2
    operatorsIntro: s.section(),
    representsOutputState: s.section(),
    differentRedrawnCircuit: s.section(),
    // Section 1.3
    summaryIntro: s.section(),
    firstBoldedI: s.section(),
    twoQubitStateResult: s.section(),
    followingIsTFOne: s.section(),
    followingIsTFTwo: s.section(),
    representCircuitBelow: s.section(),
    outputStateOfCircuit: s.section(),
    // Section 2.1
    twoQubitVectorSpaceIntro: s.section(),
    basisPlacementVectorVisual: s.section(),
    probMeasureTwoQubitState: s.section(),
    twoVectorTensorProductRule: s.section(),
    fourDColumnVector: s.section(),
    outputStatefourDColVector: s.section(),
    probTwoQubitSystem: s.section(),
    // Section 2.2
    twoQubitOperatorsIntro: s.section(),
    representZOTimesX: s.section(),
    twoOperatorsRule: s.section(),
    representAs4x4Matrix: s.section(),
    writeInTwoDifferentWays: s.section(),
    expressionMatchDiagram: s.section(),
  },
  responses: {
    write2QubitState: s.string(),
    write2QubitStateSelectAll: s.chooseAll([
      "1/root2(|0> + |1>) x |0>",
      "|0> x 1/root2(|0> + |1>)",
      "1/root2(|00> + |10>)",
      "1/root2(|0>|0> + |1>|0>)",
    ]),
    probabilityOfKet10: s.number(),
    probabilityOfKet01: s.number(),
    resultIsKet0FirstQubit: s.number(),
    resultIsKet0SecondQubit: s.number(),
    representsOutputStateSelectAll: s.chooseAll([
      "Z(|ψ1⟩ ⊗ |ψ2⟩)",
      "(Z |ψ1⟩) ⊗ |ψ2⟩",
      "(Z ⊗ I)(|ψ1⟩ ⊗ |ψ2⟩)",
      "(I ⊗ Z)(|ψ2⟩ ⊗ |ψ1⟩)",
    ]),
    firstBoldedI: s.chooseOne(["top", "bottom", "ambiguous"]),
    twoQubitStateResult: s.string(),
    followingIsTFOne: s.chooseOne(["yes", "no"]),
    followingIsTFTwo: s.chooseOne(["yes", "no"]),
    representCircuitBelowText: s.string(),
    outputStateOfCircuitText: s.string(),
    // Section 2.1
    probMeasureTwoQubitState: s.number(),
    fourDColumnVector: fourDCol,
    outputStatefourDColVector: fourDCol,
    probTwoQubitSystem: s.number(),
    // Section 2.2
    representZOTimesX: s.chooseOne(["scalar", "1x4", "4x1", "4x4", "2x2"]),
    representAs4x4Matrix: fourXFourMatrix,
    writeInTwoDifferentWaysMatrix: fourXFourMatrix,
    expressionMatchDiagram: s.chooseAll([
      "HX ⊗ Z",
      "XH ⊗ Z",
      "HZ ⊗ X",
      "(H ⊗ Z)(X ⊗ I)",
      "(X ⊗ I)(H ⊗ Z)",
      "(H ⊗ X) Z",
      "X (H ⊗ Z)",
    ]),
  },
  hints: {
    probability: s.hint(),
    diracNotation: s.hint(),
  },
});
