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
  id: "interpreting-superpositions",
  link: "interpreting-superpositions",
  label: "Interpreting superposition states",
  excludeFromList: true,
  pretest: true,
  posttest: true,
  pages: [
    { link: "1-reviewing-gates", label: "Reviewing gates" },
    { link: "2-superposition-v-mixed", label: "Superposition vs mixed state" },
    {
      link: "3-furtherExploration",
      label: "Further exploration of superposition states",
    },
  ],
});
