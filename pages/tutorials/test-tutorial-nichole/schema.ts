import * as s from "@/schema/tutorial";

export default s.tutorial({
  pages: {
    reviewingGates: s.page(),
    superpositionvmixed: s.page(),
    wrapup: s.page(),
  },
  pretest: {
    warmupQuestion1: s.chooseOne([
      "one",
      "two",
      "more",
      "impossible",
      "unsure",
    ]),

    warmupQuestion1Explain: s.string(),
    warmupQuestion2: s.chooseOne([
      "one",
      "two",
      "more",
      "impossible",
      "unsure",
    ]),
    warmupQuestion2Explain: s.string(),
    //outputOfCircuit: s.string(),
    warmupQuestion3: s.chooseOne([
      "yes",
      "no",
    ]),

    warmupQuestion3Explain: s.string()
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
   // output1: s.section(),
    //output2: s.section(),
     gatesQuestion1: s.section({
          messages: ["dynamicAnswer"],
        }),

    gatesQuestion2: s.section({
      messages: ["dynamicAnswer"],
    }),

    gatesQuestion3: s.section({
      messages: ["dynamicAnswer"],
    }),

    //doesZSelfCommute: s.section(),
   // circuitDiagramOrder: s.section({ messages: ["answer"] }),
///////////////////////////////////////////////////////////////////////////////
    superpositionvmixed: s.section(),
    aliceBobQuestion1: s.section({
      messages: ["answer"],
    }),
    //aliceBobIntro2: s.section(),
    aliceBobQuestion2: s.section({
      messages: ["correct", "incorrect"],
    }),
    aliceBobQuestion2A: s.section({
      messages: ["correct", "incorrect"],
    }
),
    aliceBobQuestion2B: s.section({
      messages: ["correct", "incorrect"],
    }
),
    aliceBobQuestion2C: s.section({
      messages: ["answer"],
    }),
   // aliceBobIntro3: s.section(),
    aliceBobQuestion3A: s.section({
      messages: ["correct", "incorrect"],
    }),
    aliceBobQuestion3B: s.section({
      messages: ["correct", "incorrect"],
    }),
    aliceBobQuestion3C: s.section({
      messages: ["answer"],
    }),
    aliceBobQuestion4: s.section({
      messages: ["answer"],
    }),
   // aliceBobQuestion5: s.section(),
    aliceBobQuestion5A: s.section({
      messages: ["correct", "incorrect"],
    }),
    aliceBobQuestion5B: s.section({
      messages: ["correct", "incorrect"],
    }),
    aliceBobQuestion5C: s.section({
      messages: ["dynamicAnswer"],
    }),
    superpositionvmixedConclusion: s.section(),
///////////////////////////////////////////////////////////////////////////////
   // wrapupIntro: s.section(),
    furtherQuestion1:  s.section({
      messages: ["dynamicAnswer"],
    }),
    furtherQuestion2:  s.section({
      messages: ["dynamicAnswer"],
    }),
    furtherQuestion3:  s.section({
      messages: ["dynamicAnswer"],
    }),
    furtherQuestion4:  s.section({
      messages: ["dynamicAnswer"],
    }),
    furtherQuestion5:  s.section({
      messages: ["dynamicAnswer"],
    }),
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
    //output1: s.string(),
   // output2: s.string(),
    gatesQuestion1: s.chooseOne([
      "0",
      "minus0",
      "1",
      "minus1",
      "plus",
      "minus",
      "other",
    ]),
    gatesQuestion2: s.chooseOne([
      "0",
      "minus0",
      "1",
      "minus1",
      "plus",
      "minus",
      "other",
    ]),
    gatesQuestion3: s.chooseOne(["yes", "no"]),

    gatesQuestion3Explain: s.string(),

//////////////////////////////////////////////////////////////////
    aliceBobQuestion1: s.chooseOne([
     "one",
      "two",
      "more",]),

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
furtherQuestion1: s.chooseOne(["yes","no"]),

furtherQuestion1Explain: s.string(),

furtherQuestion2: s.chooseOne(["yes","no"]),

furtherQuestion2Explain: s.string(),

furtherQuestion3: s.chooseOne(["yes","no"]),

furtherQuestion3Explain: s.string(),

furtherQuestion4: s.chooseOne(["yes","no"]),

furtherQuestion4Explain: s.string(),

furtherQuestion5: s.chooseOne(["yes","no"]),

furtherQuestion5Explain: s.string(),
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
    gatesHintQuestion3: s.hint(),
    distinguishableHint: s.hint(),
    finalfeedback: s.hint(),
    inverse: s.hint(),
  },
});
