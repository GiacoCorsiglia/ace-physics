import * as s from "@/schema/tutorial";

export default s.tutorial({
  pages: {
    otherTwoQubitGates: s.page(),
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
  },
  responses: {
    writtenAsTensorProduct: s.chooseOne(["yes", "no"]),
    outputOfCircuit: s.string(),
    probMeasuringKet0: s.number(),
    probMeasuringKet1: s.number(),
    probMeasuringKet01: s.number(),
  },
  hints: {
    gateIsLinear: s.hint(),
  },
});
