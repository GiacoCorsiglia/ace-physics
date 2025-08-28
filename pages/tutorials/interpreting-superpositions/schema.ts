import * as s from "@/schema/tutorial";

export default s.tutorial({
  pages: {
    reviewingGates: s.page(),
    superpositionvmixed: s.page(),
    furtherExploration: s.page(),
  },
  //                        I. Before-You-Start page

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
    warmupQuestion3: s.chooseOne(["yes", "no"]),
    warmupQuestion3Explain: s.string(),
  },

  //                           II. Review page

  posttest: {
    postActivityQuestion1: s.string(),
    postActivityQuestion2: s.string(),
    postActivityQuestion3: s.chooseOne(["yes", "no"]),
    postActivityQuestion3Explain: s.string(),
  },

  //                          III. List of Sections

  sections: {
    //                      1. Reviewing Gates page

    reviewingGatesIntro: s.section(),
    gatesQuestion1: s.section({
      messages: ["dynamicAnswer"],
    }),
    gatesQuestion2: s.section({
      messages: ["dynamicAnswer"],
    }),
    gatesQuestion3: s.section({
      messages: ["dynamicAnswer"],
    }),

    //                     2. Superposition Vs. Mixed page

    superpositionvmixed: s.section(),
    aliceBobQuestion1: s.section({
      messages: ["answer"],
    }),
    aliceBobQuestion2: s.section({
      messages: ["correct", "incorrect"],
    }),
    aliceBobQuestion2A: s.section({
      messages: ["correct", "incorrect"],
    }),
    aliceBobQuestion2B: s.section({
      messages: ["correct", "incorrect"],
    }),
    aliceBobQuestion2C: s.section({
      messages: ["dynamicAnswer"],
    }),
    aliceBobQuestion3A: s.section({
      messages: ["correct", "incorrect"],
    }),
    aliceBobQuestion3B: s.section({
      messages: ["correct", "incorrect"],
    }),
    aliceBobQuestion3C: s.section({
      messages: ["dynamicAnswer"],
    }),
    aliceBobQuestion4: s.section({
      messages: ["dynamicAnswer"],
    }),
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

    //                            3. Wrapup page

    morePracticeIntro: s.section(),
    furtherQuestion1: s.section({
      messages: ["dynamicAnswer"],
    }),
    furtherQuestion2: s.section({
      messages: ["dynamicAnswer"],
    }),
    furtherQuestion3: s.section({
      messages: ["dynamicAnswer"],
    }),
    furtherQuestion4: s.section({
      messages: ["dynamicAnswer"],
    }),
    furtherQuestion5: s.section({
      messages: ["dynamicAnswer"],
    }),
  },

  //                         IV. Responses and Hints:

  //                      1. Reviewing Gates Responses

  responses: {
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

    //                    2. Superposition Vs. Mixed Responses

    aliceBobQuestion1: s.chooseOne(["one", "two", "more"]),

    aliceBob1Explain: s.string(),

    aliceBobQuestion2A: s.number(),

    aliceBobQuestion2B: s.number(),

    aliceBobQuestion2C: s.chooseOne(["yes", "no"]),

    aliceBobQuestion2Cexplain: s.string(),

    aliceBobQuestion3A: s.number(),

    aliceBobQuestion3B: s.number(),

    aliceBobQuestion3C: s.chooseOne(["yes", "no"]),

    aliceBobQuestion3Cexplain: s.string(),

    aliceBobQuestion4: s.chooseOne(["yes", "no"]),

    aliceBobQuestion4explain: s.string(),

    aliceBobQuestion5A: s.number(),

    aliceBobQuestion5B: s.number(),

    aliceBobQuestion5C: s.chooseOne(["yes", "no"]),

    aliceBobQuestion5Cexplain: s.string(),

    //                        3. Wrap-up Responses

    furtherQuestion1: s.chooseOne(["yes", "no"]),

    furtherQuestion1Explain: s.string(),

    furtherQuestion2: s.chooseOne(["yes", "no"]),

    furtherQuestion2Explain: s.string(),

    furtherQuestion3: s.chooseOne(["yes", "no"]),

    furtherQuestion3Explain: s.string(),

    furtherQuestion4: s.chooseOne(["yes", "no"]),

    furtherQuestion4Explain: s.string(),

    furtherQuestion5: s.chooseOne(["yes", "no"]),

    furtherQuestion5Explain: s.string(),
  },

  //                          V. Hints

  hints: {
    gatesHintQuestion3: s.hint(),
    distinguishableHint: s.hint(),
  },
});
