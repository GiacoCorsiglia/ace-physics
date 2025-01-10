import * as s from "@/schema/tutorial";

export default s.tutorial({
  pages: { testPage1: s.page(), testPage2: s.page() },
  pretest: {
    docTutPretestChooseOneWithOther: s.chooseOne(
      ["test", "secondtest"],
      s.number(),
    ),
    // the array of strings in the argument of s.chooseOne() are not the actual
    // labels.
    docTutPretestChooseOneToggle: s.chooseOne(["test", "secondtest"]),

    docTutPretestText: s.string(),
    docTutPretestDecimal: s.number(),
    steveTutPretestText1: s.string(),
    steveTutPretestChooseOne: s.chooseOne(["steveopt1", "steveopt2"]),
    GinaStringInput: s.string(),
  },
  posttest: {},
  responses: {},
  sections: { testPage1Section1: s.section(), testPage2Section1: s.section() },
  hints: {},
});
