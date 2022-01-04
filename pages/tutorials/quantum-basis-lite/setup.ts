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
  id: "QuantumBasisLite",
  link: "quantum-basis-lite",
  label: "Visualizing a Vector in a Different Basis — Lite Edition",
  pretest: true,
  pages: [
    {
      link: "1-defining-basis",
      label: "Defining Basis",
    },
    {
      link: "2-changing-basis",
      label: "Changing Basis",
    },
    {
      link: "3-relating-bases",
      label: "Relating Different Bases",
    },
  ],
});
