import { TutorialSchema } from "@/schema/tutorial";
import QuantumMouse from "./quantum-mouse/schema";
import SpinLab1 from "./spin-lab-1/schema";
import SpinLab2 from "./spin-lab-2/schema";

export const tutorialSchemas = new Map<string, TutorialSchema>([
  ["QuantumMouse", QuantumMouse],
  ["SpinLab1", SpinLab1],
  ["SpinLab2", SpinLab2],
]);
