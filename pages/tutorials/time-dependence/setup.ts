import type { Model } from "@/reactivity";
import type { Infer } from "@/schema/fields";
import { tutorialSetup } from "@/tutorial";
import schema from "./schema";

export type Schema = typeof schema;
export type State = Infer<Schema>;
export type Models = Model<Schema>["properties"];
export type Responses = Infer<Schema["properties"]["responses"]>;
export type ResponseModels = Model<
  Schema["properties"]["responses"]
>["properties"];

export default tutorialSetup({
  schema,
  name: "TimeDependence",
  edition: "Main",
  link: "time-dependence",
  label: "Time Dependence",
  pretest: true,
  pages: [
    {
      link: "1-time-evolution-infinite-square-well-potential",
      label: "Time Evolution in the Infinite Square Well Potential",
    },
    {
      link: "2-an-energy-eigenstate",
      label: "An Energy Eigenstate",
    },
    {
      link: "3-a-superposition-of-eigenstates",
      label: "A Superposition of Eigenstates",
    },
    {
      link: "4-time-evolution",
      label: "Wrap up: Time evolution",
    },
  ],
});
