import * as s from "@/schema/tutorial";

export default s.tutorial({
  pages: {
    intropage: s.page(),
    statepreparation: s.page(),
    buildingteleportation1: s.page(),
    buildingteleportation2: s.page(),
    finaloperations: s.page(),
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
    // measureentangle: s.section(),
    measureentangle: s.section({
      messages: ["dynamicAnswer"],
      // messages: ["a", "nota"],
    }),
    measureentangleFeedback: s.section(),
    statePrepIntro: s.section(),
    writeinitialstate: s.section(),
    whatisxq: s.section({
      messages: ["dynamicAnswer"],
    }),
    whatisyq: s.section({
      messages: ["dynamicAnswer"],
    }),
    howmany: s.section(),

    measure1: s.section({
      messages: ["correct", "two", "one", "incorrect"],
    }),
    equallylikely: s.section(),
    equallylikelyq: s.section({
      messages: ["dynamicAnswer"],
    }),
    alice00whatisbobq: s.section({
      messages: ["dynamicAnswer"],
    }),
    aliceotherq: s.section({
      messages: ["dynamicAnswer"],
    }),
    followupsectionB: s.section(),
    followupsectionBq: s.section({
      messages: ["dynamicAnswer"],
    }),
    building1Intro: s.section(),
    trypsi1: s.section(),
    whatisx2q: s.section({
      messages: ["dynamicAnswer"],
    }),
    whatisy2q: s.section({
      messages: ["dynamicAnswer"],
    }),
    building1Outro: s.section(),
    building2Intro: s.section(),
    ntermsafterH: s.section({
      messages: ["correct", "four", "six", "incorrect"],
    }),
    trypsi2: s.section(),

    // aliceVbob5: s.section({ messages: ["finalfeedback"] }),

    // wrapupIntro: s.section(),
    // wrapup1: s.section(),
    // wrapup2: s.section(),
    // wrapup3: s.section(),
    // wrapup4: s.section(),
    // wrapup5: s.section(),

    // evaluatingCircuitsIntro: s.section(),
    // outputXZ1: s.section(),
    // outputZX1: s.section(),
    // matrixOrEquationApproach: s.section(),
    // inverseOfX: s.section({ messages: ["inverse"] }),

    // Delete the next ones
    // outputZHPlus: s.section(),
    // outputHZPlus: s.section(),

    // circuitDiagramsIntro: s.section(),
    // doXAndZCommute: s.section({
    //   messages: ["answer"],
    // }),
    // doHZCommute: s.section(),
  },
  responses: {
    singlemeasure: s.chooseOne(["yes", "no"]),
    singlemeasureExplain: s.string(),
    singlemeasurestill: s.chooseOne(["yes", "no"]),

    measureentangle: s.chooseOne(["a", "b", "c", "d", "e"]),
    whatisx: s.chooseOne(["0", "1", "else"]),
    whatisy: s.chooseOne([
      "000",
      "001",
      "010",
      "011",
      "100",
      "101",
      "110",
      "111",
    ]),

    alice00whatisbob: s.chooseOne(["0", "1", "plus", "other"]),
    aliceother: s.chooseOne(["01", "10", "11", "none"]),

    measure1: s.number(),

    equallylikely: s.chooseOne(["yes", "no"]),
    equallylikelyExplain: s.string(),

    followupsectionB: s.chooseOne(["yes", "no"]),
    followupsectionBExplain: s.string(),
    whatisx2: s.chooseOne(["0", "1", "else"]),
    whatisy2: s.chooseOne([
      "000",
      "001",
      "010",
      "011",
      "100",
      "101",
      "110",
      "111",
    ]),
    ntermsafterH: s.number(),

    // I think the rest is all old?

    // wrapup1: s.string(),
    // wrapup2: s.string(),
    // wrapup3: s.string(),
    // wrapup4: s.string(),
    // wrapup5: s.string(),

    // outputXZ1: s.string(),
    // outputZX1: s.string(),
    // doHZcommute: s.string(),
    // matrixOrEquationApproach: s.string(),
    // inverseOfX: s.chooseOne(["X", "Z", "H", "I"]),

    // outputZHPlus: s.string(),
    // outputHZPlus: s.string(),
  },
  hints: {
    initialstatehint1: s.hint(),
    trypsi1hint: s.hint(),
    finalfeedback: s.hint(),
    trypsi2hint: s.hint(),
    // inverse: s.hint(),
  },
});
