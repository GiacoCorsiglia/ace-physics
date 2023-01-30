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
  id: "QuantumCircuitDiagrams",
  link: "quantum-circuit-diagrams",
  label: "Quantum Circuit Diagrams",
  pretest: true,
  posttest: true,
  pages: [
    {
      link: "1-circuit-diagrams",
      label: "Circuit Diagrams",
    },
    {
      link: "2-evaluating-circuits",
      label: "Evaluating Circuits",
    },
    {
      link: "3-more-practice",
      label: "More Practice",
    },
  ],
});
