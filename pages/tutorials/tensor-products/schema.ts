import * as s from "@/schema/tutorial";

export default s.tutorial({
  pages: {
    addingASecondQubit: s.page(),
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
    firstBoldedI: s.section(),
    twoQubitStateResult: s.section(),
    followingIsTFOne: s.section(),
    followingIsTFTwo: s.section(),
    representCircuitBelow: s.section(),
    outputStateOfCircuit: s.section(),
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
    twoQubitStateFinalResult: s.string(),
    followingIsTFOneChoice: s.chooseOne(["yes", "no"]),
    followingIsTFTwoChoice: s.chooseOne(["yes", "no"]),
    representCircuitBelowText: s.string(),
    outputStateOfCircuitText: s.string(),
  },
  hints: {
    probability: s.hint(),
  },
});
