import { tutorialSetup } from "@/tutorial";
import schema from "./schema";

export default tutorialSetup({
  schema,
  name: "SpinLab1",
  edition: "Main",
  link: "spin-lab-1",
  label: "Spin Lab 1: Measurement & Probability",
  pretest: false,
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
      link: "6-filtering-spin",
      label: "Filtering Spin",
    },
    {
      link: "7-challenge",
      label: "Challenge",
    },
  ],
});
