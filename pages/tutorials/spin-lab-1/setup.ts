import { tutorialSetup } from "@/tutorial";
import schema from "./schema";

export default tutorialSetup({
  schema,
  id: "SpinLab1",
  link: "spin-lab-1",
  label: "Spin Lab 1: Measurement & Probability",
  pretest: true,
  pages: [
    {
      link: "1-spin-z-experiment",
      label: "A Spin-Z Experiment",
    },
    {
      link: "2-repeated-measurements",
      label: "Repeated Measurements",
    },
    {
      link: "3-spin-along-other-axes",
      label: "Spin Along Other Axes",
    },
    {
      link: "4-determining-an-unknown-state",
      label: "Determining an Unknown State",
    },
    {
      link: "5-another-unknown-state",
      label: "Another Unknown State",
    },
    {
      link: "6-rotating-spin",
      label: "Rotating Spin Challenge",
    },
  ],
});
