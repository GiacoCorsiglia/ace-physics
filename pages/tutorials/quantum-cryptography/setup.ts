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
  id: "QuantumCryptography",
  link: "quantum-cryptography",
  label: "Quantum Cryptography",
  pretest: false,
  posttest: false,
  pages: [
    {
      link: "1-quantum-key-distribution",
      label: "Quantum Key Distribution",
    },
    {
      link: "2-the-effects-of-an-eavesdropper",
      label: "The Effects of an Eavesdropper",
    },
  ],
});
