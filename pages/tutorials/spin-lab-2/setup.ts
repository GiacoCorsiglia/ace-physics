import { tutorialSetup } from "@/tutorial";
import schema from "./schema";

export default tutorialSetup({
  schema,
  id: "SpinLab2",
  link: "spin-lab-2",
  label: "Spin Lab 2: Spins & Operators",
  pretest: true,
  posttest: false,
  pages: [
    {
      link: "1-three-analyzers",
      label: "Three Analyzers",
    },
    {
      link: "2-a-given-state",
      label: "A Given State",
    },
    {
      link: "3-getting-used-to-dirac-notation",
      label: "Getting Used to Dirac Notation",
    },
    {
      link: "4-operators-as-matrices",
      label: "Operators as Matrices",
    },
    {
      link: "5-challenge",
      label: "Challenge",
    },
  ],
});
