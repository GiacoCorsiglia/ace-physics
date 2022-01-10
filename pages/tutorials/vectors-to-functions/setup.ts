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
  id: "VectorsToFunctions",
  link: "vectors-to-functions",
  label: "Vectors to Functions",
  pretest: false,
  pages: [
    {
      link: "1-a-spin-4-particle",
      label: "A Spin-4 Particle",
    },
    {
      link: "2-a-continuous-variable",
      label: "A Continuous Variable",
    },
  ],
});
