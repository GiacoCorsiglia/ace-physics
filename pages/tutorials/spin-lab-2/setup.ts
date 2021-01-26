import { tutorialSetup } from "@/tutorial";
import schema from "./schema";

export default tutorialSetup({
  schema,
  name: "SpinLab2",
  edition: "Main",
  link: "spin-lab-2",
  label: "Spin Lab 2: Spins & Operators",
  pretest: false,
  pages: [
    {
      link: "1-three-analyzers",
      label: "Three Analyzers",
    },
    {
      link: "2-a-given-state",
      label: "A Given State",
    },
  ],
});
