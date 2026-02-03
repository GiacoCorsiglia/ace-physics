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
  id: "QuantumTeleportation",
  link: "quantum-teleportation",
  label: "Quantum Teleportation",
  excludeFromList: true,
  pretest: true,
  posttest: true,
  pages: [
    { link: "1-setup", label: "Setup" },
    { link: "2-statepreparation", label: "State Preparation" },
    {
      link: "3-1-buildingteleportation",
      label: "Building a teleportation circuit (Part 1)",
    },
    {
      link: "3-2-buildingteleportation",
      label: "Building a teleportation circuit (Part 2)",
    },
    {
      link: "3-3-buildingteleportation",
      label: "Building a teleportation circuit (Part 3)",
    },
    {
      link: "3-4-buildingteleportation",
      label: "Building a teleportation circuit (Part 4)",
    },
    {
      link: "4-1-finaloperations",
      label: "Final operations (Part 1)",
    },
    {
      link: "4-2-finaloperations",
      label: "Final operations (Part 2)",
    },
    {
      link: "5-partingquestions",
      label: "Parting Questions",
    },
  ],
});
