import * as s from "@/schema/tutorial";

export default s.tutorial({
  pages: {
    reviewingGates: s.page(),
    superpositionvmixed: s.page(),
    wrapup: s.page(),
  },
  pretest: {
    designCircuit1: s.string(),
    designCircuit2: s.string(),
    outputOfCircuit: s.string(),
    circuitAsDirac: s.chooseAll([
      "HZZX|1>",
      "XZZH|1>",
      "HX|1>",
      "HIX|1>",
      "XH|1>",
      "XIH|1>",
      "unsure",
    ]),
  },
  posttest: {
    designCircuit1: s.string(),
    designCircuit2: s.string(),
    outputOfCircuit: s.string(),
    circuitAsDirac: s.chooseAll([
      "HZZX|1>",
      "XZZH|1>",
      "HX|1>",
      "HIX|1>",
      "XH|1>",
      "XIH|1>",
    ]),
  },
  sections: {
    reviewingGatesIntro: s.section(),
    output1: s.section({
      messages: ["answer"],
    }),
    output2: s.section({
      messages: ["answer2"],
    }),
    doHandZCommute: s.section(),
    doesZSelfCommute: s.section(),
    circuitDiagramOrder: s.section({ messages: ["answer"] }),

    superpositionvmixedIntro: s.section(),
    aliceVbob1: s.section(),
    aliceVbob2: s.section(),
    aliceVbob3: s.section(),
    aliceVbob4: s.section(),
    aliceVbob5: s.section({ messages: ["finalfeedback"] }),

    wrapupIntro: s.section(),
    wrapup1: s.section(),
    wrapup2: s.section(),
    wrapup3: s.section(),
    wrapup4: s.section(),
    wrapup5: s.section(),

    evaluatingCircuitsIntro: s.section(),
    outputXZ1: s.section(),
    outputZX1: s.section(),
    matrixOrEquationApproach: s.section(),
    inverseOfX: s.section({ messages: ["inverse"] }),

    morePracticeIntro: s.section(),
    outputZHPlus: s.section(),
    outputHZPlus: s.section(),
    doHZCommute: s.section(),

    circuitDiagramsIntro: s.section(),
    doXAndZCommute: s.section({
      messages: ["answer"],
    }),
  },
  responses: {
    output1: s.string(),
    output2: s.string(),
    doHandZcommute: s.chooseOne(["yes", "no"]),

    aliceVbob1: s.string(),
    aliceVbob2: s.string(),
    aliceVbob3: s.string(),
    aliceVbob4: s.string(),
    aliceVbob5: s.string(),

    wrapup1: s.string(),
    wrapup2: s.string(),
    wrapup3: s.string(),
    wrapup4: s.string(),
    wrapup5: s.string(),

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
    finalfeedback: s.hint(),
    inverse: s.hint(),
  },
});
