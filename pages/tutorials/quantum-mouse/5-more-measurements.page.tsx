import { Prose } from "@/design";
import { page } from "@/tutorial";
import setup from "./setup";

export default page(setup, ({ section, sequence, hint }) => ({
  name: "more-measurements",
  label: "More Measurements",
  sections: [
    section({
      name: "moreMeasurementsIntro",
      body: <Prose>TODO</Prose>,
    }),
  ],
}));
