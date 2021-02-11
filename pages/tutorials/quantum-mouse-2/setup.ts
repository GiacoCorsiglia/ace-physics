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
  name: "QuantumMouse2",
  edition: "Main",
  link: "quantum-mouse-2",
  label: "Quantum Mouse 2",
  pretest: true,
  pages: [
    {
      link: "1-measurement-and-commutation",
      label: "Measurement & Commutation",
    },
    {
      link: "2-a-mischief-of-mice",
      label: "A Mischief of Mice",
    },
    {
      link: "3-quiet-as-a-mouse",
      label: "Quiet as a Mouse",
    },
    {
      link: "4-back-to-spins",
      label: "Bonus: Back to Spins",
    },
    {
      link: "5-interpreting-operators-in-quantum-mechanics",
      label: "Bonus: Interpreting Operators in Quantum Mechanics",
    },
  ],
});
