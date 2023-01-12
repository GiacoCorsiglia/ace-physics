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
  id: "IntroductionToQuantumGates",
  link: "introduction-to-quantum-gates",
  label: "Introduction to Quantum Gates",
  pretest: true,
  posttest: true,
  pages: [
    {
      link: "1-quantum-bits",
      label: "Quantum Bits",
    },
    {
      link: "2-the-x-gate",
      label: "The X Gate",
    },
    {
      link: "3-the-z-gate",
      label: "The Z Gate",
    },
    {
      link: "4-the-hadamard-gate",
      label: "The Hadamard Gate",
    },
    {
      link: "5-the-identity-gate",
      label: "The Identity Gate",
    },
  ],
});
