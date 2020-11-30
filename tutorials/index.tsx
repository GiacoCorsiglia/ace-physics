import * as EnergyAndPosition from "./energy-and-position";
import * as EPR from "./EPR";
import * as QuantumBasis from "./quantum-basis";
import * as QuantumMouse from "./quantum-mouse";
import * as ReflectingOnTransmission from "./reflecting-on-transmission";
import * as TimeDependence from "./time-dependence";
import * as VectorsToFunctions from "./vectors-to-functions";

export const routes = [
  QuantumBasis.route,
  QuantumMouse.route,
  EPR.route,
  VectorsToFunctions.route,
  EnergyAndPosition.route,
  TimeDependence.route,
  ReflectingOnTransmission.route,
].flat();
