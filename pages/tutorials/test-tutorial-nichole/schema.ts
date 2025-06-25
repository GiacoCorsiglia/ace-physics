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
    designCircuit3hint: s.hint(),
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
    outputcircuit1: s.section(),
    outputcircuit2: s.section(),
    doHZCommute: s.section(),
    doesZSelfCommute: s.section(),
    circuitDiagramOrder: s.section({ messages: ["answer"] }),
///////////////////////////////////////////////////////////////////////////////
    superpositionvmixedIntro: s.section(),
    aliceBobQuestion1: s.section(),
    aliceBobIntro2: s.section(),
    aliceBobIntro3: s.section(),
    aliceBobQuestion4: s.section(),
    aliceBobQuestion5: s.section(),
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
    aliceBobQuestion2A: s.string(),
    aliceBobQuestion2B: s.string(),
    aliceBobQuestion2C: s.string(),
    aliceBobQuestion3A: s.string(),
    aliceBobQuestion3B: s.string(),
    aliceBobQuestion3C: s.string(),
    aliceBobQuestion4: s.string(),
    aliceBobQuestion5A: s.string(),
    aliceBobQuestion5B: s.string(),
    aliceBobQuestion5C: s.string(),
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
    designCircuit3hint: s.hint(),
    finalfeedback: s.hint(),
    inverse: s.hint(),
  },
});
