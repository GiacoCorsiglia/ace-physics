import { TutorialSchema } from "@/schema/tutorial";
import EPR from "./epr/schema";
import QuantumBasis from "./quantum-basis/schema";
import QuantumMouse2 from "./quantum-mouse-2/schema";
import QuantumMouse from "./quantum-mouse/schema";
import ReflectionTransmission from "./reflection-transmission/schema";
import SpinLab1 from "./spin-lab-1/schema";
import SpinLab2 from "./spin-lab-2/schema";
import SpinsAndMagneticFields from "./spins-and-magnetic-fields/schema";

export const tutorialSchemas = new Map<string, TutorialSchema>([
  ["QuantumBasis", QuantumBasis],
  ["QuantumMouse2", QuantumMouse2],
  ["QuantumMouse", QuantumMouse],
  ["ReflectionTransmission", ReflectionTransmission],
  ["SpinLab1", SpinLab1],
  ["SpinLab2", SpinLab2],
  ["SpinsAndMagneticFields", SpinsAndMagneticFields],
  ["Epr", EPR],
]);
