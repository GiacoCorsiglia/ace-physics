import { TutorialSchema } from "@/schema/tutorial";
import CnotEntanglement from "./cnot-entanglement/schema";
import EnergyAndPosition from "./energy-and-position/schema";
import EPR from "./epr/schema";
import IntroductionToQuantumGates from "./introduction-to-quantum-gates/schema";
import QuantumBasisLite from "./quantum-basis-lite/schema";
import QuantumBasisMain from "./quantum-basis/schema";
import QuantumCircuitDiagrams from "./quantum-circuit-diagrams/schema";
import QuantumMouse2 from "./quantum-mouse-2/schema";
import QuantumMouse from "./quantum-mouse/schema";
import ReflectionTransmission from "./reflection-transmission/schema";
import SpinLab1 from "./spin-lab-1/schema";
import SpinLab2 from "./spin-lab-2/schema";
import SpinsAndMagneticFields from "./spins-and-magnetic-fields/schema";
import TensorProducts from "./tensor-products/schema";
import TestTutorial from "./test-tutorial/schema";
import TimeDependence from "./time-dependence/schema";
import VectorsToFunctions from "./vectors-to-functions/schema";

export const tutorialSchemas = new Map<string, TutorialSchema>([
  ["CnotEntanglement", CnotEntanglement],
  ["EnergyAndPosition", EnergyAndPosition],
  ["EPR", EPR],
  ["IntroductionToQuantumGates", IntroductionToQuantumGates],
  ["QuantumBasisLite", QuantumBasisLite],
  ["QuantumBasisMain", QuantumBasisMain],
  ["QuantumCircuitDiagrams", QuantumCircuitDiagrams],
  ["QuantumMouse", QuantumMouse],
  ["QuantumMouse2", QuantumMouse2],
  ["ReflectionTransmission", ReflectionTransmission],
  ["SpinLab1", SpinLab1],
  ["SpinLab2", SpinLab2],
  ["SpinsAndMagneticFields", SpinsAndMagneticFields],
  ["TimeDependence", TimeDependence],
  ["TensorProducts", TensorProducts],
  ["VectorsToFunctions", VectorsToFunctions],
  ["TestTutorial", TestTutorial],
]);
