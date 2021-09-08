import { tutorialSetup } from "@/tutorial";
import schema from "./schema";

export default tutorialSetup({
  schema,
  name: "QuantumMouse",
  edition: "Main",
  link: "quantum-mouse",
  label: "Quantum Mouse Lab",
  pretest: true,
  pages: [
    {
      link: "1-what-is-a-quantum-mouse",
      label: "What is a quantum mouse?",
    },
    {
      link: "2-moody-mice",
      label: "Moody mice",
    },
    {
      link: "3-superpositions",
      label: "Superpositions",
    },
    {
      link: "4-measurements",
      label: "Measurements",
    },
    {
      link: "5-more-measurements",
      label: "More Measurements",
    },
    {
      link: "6-matrix-representation",
      label: "Matrix Representation",
    },
    {
      link: "7-expectation-values",
      label: "Challenge: Expectation Values",
    },
    {
      link: "8-challenge",
      label: "Bonus Challenge",
    },
  ],
});
