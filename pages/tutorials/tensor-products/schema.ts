import * as s from "@/schema/tutorial";

const fourDCol = s.tuple(s.string(), s.string(), s.string(), s.string());

const fourXFourMatrix = s.tuple(fourDCol, fourDCol, fourDCol, fourDCol);

export default s.tutorial({
  pages: {
    addingASecondQubit: s.page(),
    operators: s.page(),
    summaryQuestions: s.page(),
    twoQubitVectorSpace: s.page(),
    twoQubitOperators: s.page(),
    moreThanTwoQubits: s.page(),
  },
  pretest: {
    probQubit1Is1: s.number(),
    outputZxXZxH011: s.string(),
    equivalentOperatorToCircuitDiagram: s.chooseAll([
      "H ⊗ XZ",
      "H ⊗ ZX",
      "HZ ⊗ X",
      "(H ⊗ Z)(I ⊗ X)",
      "(I ⊗ X)(H ⊗ Z)",
      "(H ⊗ X)(I ⊗ Z)",
      "H(Z ⊗ X)",
      "(H ⊗ Z)X",
    ]),
    outputHxXZ00: s.string(),
  },
  posttest: {
    probQubit1Is1: s.number(),
    outputZxXZxH011: s.string(),
    equivalentOperatorToCircuitDiagram: s.chooseAll([
      "H ⊗ XZ",
      "H ⊗ ZX",
      "HZ ⊗ X",
      "(H ⊗ Z)(I ⊗ X)",
      "(I ⊗ X)(H ⊗ Z)",
      "(H ⊗ X)(I ⊗ Z)",
      "H(Z ⊗ X)",
      "(H ⊗ Z)X",
    ]),
    outputHxXZ00: s.string(),
  },
  sections: {
    addingASecondQubitIntro: s.section(),
    arbitrary2QubitState: s.section(),
    plusTimes0: s.section({ messages: ["answer"] }),
    plusTimes0Probabilities: s.section(),
    plusTimes0SingleProbabilities: s.section(),

    // Section 1.2
    operatorsIntro: s.section(),
    arbitraryOutputZxI: s.section({ messages: ["answer"] }),
    redrawnZxI: s.section(),
    findIInCircuit: s.section({ messages: ["answer"] }),

    // Section 1.3
    summaryIntro: s.section(),
    sketchHxIZxXPsi1xPsi2: s.section(),
    selectHxIZxXPsi1xPsi2: s.section({
      messages: ["picked1or5", "picked3", "picked1or5and3", "nowCorrect"],
    }),
    XxIZxXPsi1xPsi2EqualsXZxIXPs1xPsi2: s.section(),
    XxZXxZPsi1xPsi2EqualsXZPsi1xXZPsi2: s.section(),
    equationXHPsixZPhi: s.section(),
    outputXH1xZ1: s.section(),

    // Section 2.1
    twoQubitVectorSpaceIntro: s.section(),
    basisPlacementVectorVisual: s.section(),
    probMeasureTwoQubitState: s.section(),
    twoVectorTensorProductRule: s.section(),
    fourDColumnVector: s.section({ messages: ["ourAnswer"] }),
    circuitOutputAsColumnVector: s.section(),
    circuitOutputAsDiracNotation: s.section(),
    probTwoQubitSystem: s.section(),
    bothExpressionsWork: s.section(),

    // Section 2.2
    twoQubitOperatorsIntro: s.section(),
    representZxX: s.section(),
    twoOperatorsRule: s.section(),
    representZxXAs4x4Matrix: s.section({ messages: ["answer"] }),
    columnZ0xX1: s.section({
      messages: ["tryAgain", "hereYouGo", "nowCorrect"],
    }),
    circuitAsOperator: s.section(),

    moreThanTwoQubitsIntro: s.section(),
    dimension3QubitSpace: s.section(),
    dimensionNQubitSpace: s.section(),
    outputZxXZxI000: s.section(),
    nQubitExample: s.section(),
    nQubitProbAll0: s.section(),
    nQubitProbFirst0: s.section(),
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
      "(I⊗H) (X⊗Z) (|ψ1>⊗|ψ2>)",
      "(_⊗H) (X⊗Z) (|ψ1>⊗|ψ2>)",
    ]),
    XxIZxXPsi1xPsi2EqualsXZxIXPs1xPsi2: s.chooseOne(["true", "false"]),
    XxZXxZPsi1xPsi2EqualsXZPsi1xXZPsi2: s.chooseOne(["true", "false"]),
    equationXHPsixZPhi: s.string(),
    outputXH1xZ1: s.string(),

    // Section 2.1
    probMeasureTwoQubitState: s.number(),
    fourDColumnVector: fourDCol,
    circuitOutputAsColumnVector: fourDCol,
    circuitOutputAsDiracNotation: s.string(),
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

    dimension3QubitSpace: s.number(),
    dimensionNQubitSpace: s.string(),
    outputZxXZxI000: s.string(),
    nQubitProbAll0: s.string(),
    nQubitProbFirst0: s.string(),
  },
  hints: {
    probability: s.hint(),
    diracNotation: s.hint(),
  },
});
