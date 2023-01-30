import * as s from "@/schema/tutorial";

const fourDCol = s.tuple(s.string(), s.string(), s.string(), s.string());

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
    arbitrary2QubitState: s.section(),
    plusTimes0: s.section(),
    plusTimes0Probabilities: s.section(),
    plusTimes0SingleProbabilities: s.section(),

    // Section 1.2
    operatorsIntro: s.section(),
    arbitraryOutputZxI: s.section(),
    redrawnZxI: s.section(),
    findIInCircuit: s.section(),

    // Section 1.3
    summaryIntro: s.section(),
    sketchHxIZxXPsi1xPsi2: s.section(),
    selectHxIZxXPsi1xPsi2: s.section(),
    XxIZxXPsi1xPsi2EqualsXZxIXPs1xPsi2: s.section(),
    XxZXxZPsi1xPsi2EqualsXZPsi1xXZPsi2: s.section(),
    equationXHPsixZPhi: s.section(),
    outputXH1xZ1: s.section(),

    // Section 2.1
    twoQubitVectorSpaceIntro: s.section(),
    basisPlacementVectorVisual: s.section(),
    probMeasureTwoQubitState: s.section(),
    twoVectorTensorProductRule: s.section(),
    fourDColumnVector: s.section(),
    circuitOutputAsColumnVector: s.section(),
    probTwoQubitSystem: s.section(),

    // Section 2.2
    twoQubitOperatorsIntro: s.section(),
    representZxX: s.section(),
    twoOperatorsRule: s.section(),
    representZxXAs4x4Matrix: s.section(),
    columnZ0xX1: s.section(),
    circuitAsOperator: s.section(),
  },
  responses: {
    arbitrary2QubitState: s.string(),
    plusTimes0: s.chooseAll([
      "1/root2(|0> + |1>) x |0>",
      "|0> x 1/root2(|0> + |1>)",
      "1/root2(|00> + |10>)",
      "1/root2(|0>|0> + |1>|0>)",
    ]),
    probabilityOfKet10: s.number(),
    probabilityOfKet01: s.number(),
    probabilityKet0FirstQubit: s.number(),
    probabilityKet0SecondQubit: s.number(),

    arbitraryOutputZxI: s.chooseAll([
      "Z(|ψ1⟩ ⊗ |ψ2⟩)",
      "(Z |ψ1⟩) ⊗ |ψ2⟩",
      "(Z ⊗ I)(|ψ1⟩ ⊗ |ψ2⟩)",
      "(I ⊗ Z)(|ψ2⟩ ⊗ |ψ1⟩)",
    ]),
    findIInCircuit: s.chooseOne(["top", "bottom", "ambiguous"]),

    selectHxIZxXPsi1xPsi2: s.chooseAll([
      "(H⊗I) (Z⊗X) (|ψ1>⊗|ψ2>)",
      "(H⊗_) (Z⊗X) (|ψ1>⊗|ψ2>)",
      "(Z⊗X) (H⊗_) (|ψ1>⊗|ψ2>)",
      "(I⊗H) (X⊗Z) (|ψ2>⊗|ψ1>)",
      "(I⊗H) (X⊗Z) (|ψ1>⊗|ψ2>)",
    ]),
    XxIZxXPsi1xPsi2EqualsXZxIXPs1xPsi2: s.chooseOne(["true", "false"]),
    XxZXxZPsi1xPsi2EqualsXZPsi1xXZPsi2: s.chooseOne(["true", "false"]),
    equationXHPsixZPhi: s.string(),
    outputXH1xZ1: s.string(),

    // Section 2.1
    probMeasureTwoQubitState: s.number(),
    fourDColumnVector: fourDCol,
    circuitOutputAsColumnVector: fourDCol,
    probTwoQubitSystem: s.number(),

    // Section 2.2
    representZxX: s.chooseOne(["scalar", "1x4", "4x1", "4x4", "2x2"]),
    representZxXAs4x4Matrix: fourXFourMatrix,
    columnZ0xX1: fourDCol,
    circuitAsOperator: s.chooseAll([
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
