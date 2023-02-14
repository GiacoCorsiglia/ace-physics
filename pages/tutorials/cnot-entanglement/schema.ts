import * as s from "@/schema/tutorial";

export default s.tutorial({
  pages: {
    otherTwoQubitGates: s.page(),
    entanglement: s.page(),
    consequencesOfEntanglement: s.page(),
  },
  pretest: {
    // Pretest fields here.
  },
  posttest: {
    // Posttest fields here.
  },
  sections: {
    // Section 1
    otherTwoQubitGatesIntro: s.section(),
    writtenAsTensorProduct: s.section(),
    outputOfCircuit: s.section(),
    probMeasuringKet0: s.section(),
    probMeasuringKet1: s.section(),
    probMeasuringKet01: s.section(),
    interestingProbComment: s.section(),
    // Section 2
    entanglementIntro: s.section(),
    isEquationEntangledOne: s.section(),
    isEquationEntangledTwo: s.section(),
    isProbabilityFiftyFiftyOne: s.section(),
    isProbabilityFiftyFiftyTwo: s.section(),
    isProbabilityFiftyFiftyThree: s.section(),
    probabilityMeasuresToKetZero: s.section(),
    resultingStateOfQubitOne: s.section(),
    differenceBetweenQuestionsComment: s.section(),
    probabilityMeasuresToKetOne: s.section(),
    bellBasisContext: s.section(),
    beforeAndAfterEnteringCNOTGate: s.section(),
    circuitEntangled: s.section(),
    // Section 3
    consequencesOfEntanglementIntro: s.section(),
    aliceSentMessageToBob: s.section(),
  },
  responses: {
    // Section 1
    writtenAsTensorProduct: s.chooseOne(["yes", "no"]),
    outputOfCircuit: s.string(),
    probMeasuringKet0: s.number(),
    probMeasuringKet1: s.number(),
    probMeasuringKet01: s.number(),
    // Section 2
    isEquationEntangledOneExplanation: s.string(),
    isEquationEntangledOneTF: s.chooseOne(["yes", "no"]),
    isEquationEntangledTwoExplanation: s.string(),
    isEquationEntangledTwoTF: s.chooseOne(["yes", "no"]),
    isProbabilityFiftyFiftyOne: s.chooseOne(["yes", "no"]),
    isProbabilityFiftyFiftyTwo: s.chooseOne(["yes", "no"]),
    isProbabilityFiftyFiftyThree: s.chooseOne(["yes", "no"]),
    probabilityMeasureKetZeroQubitOne: s.number(),
    probabilityMeasureKetZeroQubitTwo: s.number(),

    resultingStateOfQubitOne: s.number(),
    resultingStateOfQubitOneProbability: s.number(),

    probabilityMeasuresToKetOne: s.number(),
    resultingStateOfParticleOne: s.number(),

    beforeEnteringCNOTGate: s.chooseOne(["yes", "no"]),
    afterEnteringCNOTGate: s.chooseOne(["yes", "no"]),

    circuitStateInputEntangled: s.chooseOne(["yes", "no"]),
    twoQubitStateEntangled: s.chooseOne(["yes", "no"]),
    outputStateOfCircuit: s.string(),
    outputStateOfCircuitEntangled: s.chooseOne(["yes", "no"]),
    // Section 3
    aliceSentMessageToBob: s.string(),
    fasterThanLight: s.string(),
  },
  hints: {
    gateIsLinear: s.hint(),
  },
});
