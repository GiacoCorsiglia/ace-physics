import * as s from "@/schema/tutorial";

export default s.tutorial({
  pages: {
    reviewingGates: s.page(),
    superpositionvmixed: s.page(),
    wrapup: s.page(),
  },
  pretest: {
    designCircuit1chooseone: s.chooseOne([
      "one",
      "two",
      "more",
      "impossible",
      "unsure",
    ]),

    designCircuit1explain: s.string(),
    designCircuit2chooseone: s.chooseOne([
      "one",
      "two",
      "more",
      "impossible",
      "unsure",
    ]),
    designCircuit2explain: s.string(),
    outputOfCircuit: s.string(),
    designCircuit3boolean: s.chooseOne([
      "yes",
      "no",
    ]),

    designCircuit3explain: s.string()
  },
  ////////////////////////////////////////////////////////////////////
  posttest: {

    postActivity1: s.string(),
    postActivity2: s.string(),
    postActivity3Boolean: s.chooseOne([
      "yes",
      "no",
    ]),

    postActivity4: s.string(),
  },
  /////////////////////////////////////////////////////////////////////////////
  sections: {
    reviewingGatesIntro: s.section(),
    output1: s.section(),
    output2: s.section(),
     outputcircuit1: s.section({
          messages: ["dynamicAnswer"],
        }),

    outputcircuit2: s.section({
      messages: ["dynamicAnswer"],
    }),

    doHZCommute: s.section({
      messages: ["dynamicAnswer"],
    }),

    doesZSelfCommute: s.section(),
    circuitDiagramOrder: s.section({ messages: ["answer"] }),
///////////////////////////////////////////////////////////////////////////////
    superpositionvmixedIntro: s.section(),
    aliceBobQuestion1: s.section({
      messages: ["dynamicAnswer"],
    }),
    aliceBobIntro2: s.section(),
    aliceBobQuestion2A: s.section({
      messages: ["correct", "two", "one", "incorrect"],
    }),
    aliceBobQuestion2B: s.section({
      messages: ["correct", "two", "one", "incorrect"],
    }),
    aliceBobQuestion2C: s.section({
      messages: ["dynamicAnswer"],
    }),
    aliceBobIntro3: s.section(),
    aliceBobQuestion3A: s.section({
      messages: ["correct", "two", "one", "incorrect"],
    }),
    aliceBobQuestion3B: s.section({
      messages: ["correct", "two", "one", "incorrect"],
    }),
    aliceBobQuestion3C: s.section({
      messages: ["dynamicAnswer"],
    }),
    aliceBobQuestion4: s.section({
      messages: ["dynamicAnswer"],
    }),
    aliceBobQuestion5: s.section(),
    aliceBobQuestion5A: s.section({
      messages: ["correct", "two", "one", "incorrect"],
    }),
    aliceBobQuestion5B: s.section({
      messages: ["correct", "two", "one", "incorrect"],
    }),
    aliceBobQuestion5C: s.section({
      messages: ["dynamicAnswer"],
    }),
    superpositionvmixedConclusion: s.section(),
///////////////////////////////////////////////////////////////////////////////
    wrapupIntro: s.section(),
    wrapup1: s.section(),
    wrapup2: s.section(),
    wrapup3: s.section(),
    wrapup4: s.section(),
    wrapup5: s.section(),
///////////////////////////////////////////////////////////////////////////////


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
  //////////////////////////////////////////////////////////////////////////
  responses: {
    output1: s.string(),
    output2: s.string(),
    outputcircuit1: s.chooseOne([
      "0",
      "minus0",
      "1",
      "minus1",
      "plus",
      "minus",
      "other",
    ]),
    outputcircuit2: s.chooseOne([
      "0",
      "minus0",
      "1",
      "minus1",
      "plus",
      "minus",
      "other",
    ]),
    doHZCommute: s.chooseOne(["yes", "no"]),

    doHZCommuteExplain: s.string(),

    aliceBobQuestion1: s.chooseOne([
      "one",
      "two",
      "more",
    ]),
    aliceBob1Explain: s.string(),
    aliceBobQuestion2A: s.number(),
    aliceBobQuestion2B: s.number(),
    aliceBobQuestion2C: s.chooseOne(["yes","no"]),
    aliceBobQuestion2Cexplain: s.string(),
    aliceBobQuestion3A: s.number(),
    aliceBobQuestion3B: s.number(),
    aliceBobQuestion3C: s.chooseOne(["yes","no"]),
    aliceBobQuestion3Cexplain: s.string(),
    aliceBobQuestion4: s.chooseOne(["yes","no"]),
    aliceBobQuestion4explain: s.string(),
    aliceBobQuestion5A: s.number(),
    aliceBobQuestion5B: s.number(),
    aliceBobQuestion5C: s.chooseOne(["yes","no"]),
    aliceBobQuestion5Cexplain: s.string(),
///////////////////////////////////////////////////////////////////////////////
    wrapup1: s.string(),
    wrapup2: s.string(),
    wrapup3: s.string(),
    wrapup4: s.string(),
    wrapup5: s.string(),
//////////////////////////////////////////////////////////////////////////////

    doesZSelfCommute: s.chooseOne(["yes", "no"]),
    circuitDiagramOrder: s.chooseOne(["xz", "zx", "either order"]),

    outputXZ1: s.string(),
    outputZX1: s.string(),
    matrixOrEquationApproach: s.string(),
    inverseOfX: s.chooseOne(["X", "Z", "H", "I"]),

    outputZHPlus: s.string(),
    outputHZPlus: s.string(),
  },
  ///////////////////////////////////////////////////////////////////
  hints: {
    gatesHintQuestionC: s.hint(),
    finalfeedback: s.hint(),
    inverse: s.hint(),
  },
});
