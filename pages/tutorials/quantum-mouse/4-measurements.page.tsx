import { Prose } from "@/design";
import { page } from "@/tutorial";
import setup from "./setup";

export default page(setup, ({ section, sequence, hint }) => ({
  name: "measurements",
  label: "Measurements",
  sections: [
    section({
      name: "measurementsIntro",
      body: <Prose>TODO</Prose>,
    }),
  ],
}));
