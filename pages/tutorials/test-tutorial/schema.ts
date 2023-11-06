import * as s from "@/schema/tutorial";

export default s.tutorial({
  pages: {

  },
  pretest: {
    docTutPretestChooseOneWithOther: s.chooseOne(["test", "secondtest"], s.number()),
    // the array of strings in the argument of s.chooseOne() are not the actual
    // labels.
    docTutPretestChooseOneToggle: s.chooseOne(["test", "secondtest"]),

    docTutPretestText: s.string(),
    docTutPretestDecimal: s.number(),
  },
  posttest: {

  },
  responses: {

  },
  sections: {

  },
  hints: {

  },
});
