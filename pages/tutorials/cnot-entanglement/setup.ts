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
  id: "CnotEntanglement",
  link: "cnot-entanglement",
  label: "CNOT and Entanglement",
  pretest: false,
  posttest: false,
  pages: [
    {
      link: "1-other-two-qubit-gates",
      label: "Other Two-Qubit Gates",
    },
    {
      link: "2-entanglement",
      label: "Entanglement",
    },
    {
      link: "3-consequences-of-entanglement",
      label: "Consequences of Entanglement",
    },
  ],
});
