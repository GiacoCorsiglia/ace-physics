import * as s from "@/schema/tutorial";

export default s.tutorial({
  pages: {
    addingASecondQubit: s.page(),
  },
  pretest: {
    // Pretest fields here.
  },
  posttest: {
    // Posttest fields here.
  },
  sections: {
    addingASecondQubitIntro: s.section(),
    write2QubitState: s.section(),
  },
  responses: {
    write2QubitState: s.string(),
  },
  hints: {
    // Hints here.
  },
});
