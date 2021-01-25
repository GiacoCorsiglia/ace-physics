import * as f from "@/schema/fields";
import { tutorialSchema } from "@/schema/tutorial";

export default tutorialSchema({
  pages: [
    "threeAnalyzers",
    "aGivenState",
    "gettingUsedToDiracNotation",
    "challenge",
  ],
  pretest: {},
  sections: ["threeAnalyzersIntro"],
  responses: {
    field: f.string(),
  },
  hints: [],
});
