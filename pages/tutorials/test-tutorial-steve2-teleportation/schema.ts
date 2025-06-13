import * as s from "@/schema/tutorial";

export default s.tutorial({
  pages: {
    intropage: s.page(),
    statepreparation: s.page(),
    wrapup: s.page(),
  },
  pretest: {
    warmup1select1: s.chooseOne([
      "i",
      "ii",
      "iii",
      "iv",
      "v",
      "vi",
      "vii",
      "viii",
      "ix",
      "x",
    ]),
    warmup2select1: s.chooseOne([
      "i",
      "ii",
      "iii",
      "iv",
      "v",
      "vi",
      "vii",
      "viii",
      "ix",
      "x",
    ]),
    warmup3select1: s.chooseOne([
      "i",
      "ii",
      "iii",
      "iv",
      "v",
      "vi",
      "vii",
      "viii",
    ]),
    warmup4select1: s.chooseOne(["true", "false", "notsure"]),
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
    setupIntro: s.section(),
    singlemeasure: s.section(),
    singlemeasurestill: s.section({
      messages: ["yes", "no"],
    }),
    singlemeasurestillFeedback: s.section(),
    setupresponse: s.section(),
    setupsolve: s.section(),
    measureentangle: s.section(),
    statePrepIntro: s.section(),
    fillinstate: s.section(),

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

    circuitDiagramsIntro: s.section(),
    doXAndZCommute: s.section({
      messages: ["answer"],
    }),
  },
  responses: {
    singlemeasure: s.chooseOne(["yes", "no"]),
    singlemeasureExplain: s.string(),
    singlemeasurestill: s.chooseOne(["yes", "no"]),

    measureentangle: s.chooseOne(["a", "b", "c", "d", "e"]),
    fillinstate: s.string(),

    wrapup1: s.string(),
    wrapup2: s.string(),
    wrapup3: s.string(),
    wrapup4: s.string(),
    wrapup5: s.string(),

    doesZSelfCommute: s.chooseOne(["yes", "no"]),
    circuitDiagramOrder: s.chooseOne(["xz", "zx", "either order"]),

    outputXZ1: s.string(),
    outputZX1: s.string(),
    matrixOrEquationApproach: s.string(),
    inverseOfX: s.chooseOne(["X", "Z", "H", "I"]),

    outputZHPlus: s.string(),
    outputHZPlus: s.string(),
  },
  hints: {
    finalfeedback: s.hint(),
    inverse: s.hint(),
  },
});
