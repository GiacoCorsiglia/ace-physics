import { TutorialSchema } from "@/schema/tutorial";
import QuantumMouse from "./quantum-mouse/schema";

export const tutorialSchemas = new Map<string, TutorialSchema>([
  ["QuantumMouse", QuantumMouse],
]);
