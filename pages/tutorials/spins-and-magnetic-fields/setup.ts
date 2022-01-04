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
  id: "SpinsAndMagneticFields",
  link: "spins-and-magnetic-fields",
  label: "Spins & Magnetic Fields",
  pretest: true,
  pages: [
    {
      link: "1-exploration",
      label: "Exploration",
    },
    {
      link: "2-refining-your-hypothesis",
      label: "Refining Your Hypothesis",
    },
  ],
});
