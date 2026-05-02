import * as s from "@/schema/tutorial";

export default s.tutorial({
  pages: {
    circuitDiagrams: s.page(),
    evaluatingCircuits: s.page(),
    morePractice: s.page(),
  },
  pretest: {
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
    circuitDiagramsIntro: s.section(),
    doXAndZCommute: s.section({
          messages: ["dynamicAnswer"],
        }),
    doesZSelfCommute: s.section({
          messages: ["dynamicAnswer"],
        }),
    circuitDiagramOrder: s.section({
          messages: ["dynamicAnswer"],
        }),

    evaluatingCircuitsIntro: s.section(),
    outputXZ1: s.section({
      messages: ["answer"],
    }),

    outputZX1: s.section({
      messages: ["answer"],
    }
),
    matrixOrEquationApproach: s.section({
      messages: ["answer"],
    }),
    inverseOfX: s.section({ messages: ["inverse"] }),

    morePracticeIntro: s.section(),
    outputZHPlus: s.section(),
    outputHZPlus: s.section(),
    doHZCommute: s.section(),
  },
  responses: {
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
    inverse: s.hint(),
    commute: s.hint()
  },
});
