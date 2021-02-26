export function join(...pieces: string[]) {
  return pieces.join("/");
}

export function part(tutorial: { link: string }, partName: string) {
  return join(tutorial.link, partName);
}

export interface URL {
  path: string;
  link: string;
}

export const Login = {
  path: "login",
  link: "/login",
};

export const CreateAccount = {
  path: "create-account",
  link: "/create-account",
};

export const Privacy = {
  path: "privacy",
  link: "/privacy",
};

export const Generate = {
  path: "generate",
  link: "/generate",
};

const SpinLab1 = {
  path: "spin-lab-1",
  link: "/tutorials/spin-lab-1",
};

const SpinLab2 = {
  path: "spin-lab-2",
  link: "/tutorials/spin-lab-2",
};

const QuantumMouse = {
  path: "quantum-mouse",
  link: "/tutorials/quantum-mouse",
};

const QuantumMouse2 = {
  path: "quantum-mouse-2",
  link: "/tutorials/quantum-mouse-2",
};

const SpinsAndMagneticFields = {
  path: "spins-and-magnetic-fields",
  link: "/tutorials/spins-and-magnetic-fields",
};

const QuantumBasis = {
  path: "quantum-basis",
  link: "/tutorials/quantum-basis",
};

const QuantumBasisLite = {
  path: "quantum-basis-lite",
  link: "/tutorials/quantum-basis-lite",
};

const EPR = {
  path: "EPR",
  link: "/tutorials/EPR",
};

const VectorsToFunctions = {
  path: "vectors-to-functions",
  link: "/tutorials/vectors-to-functions",
};

const EnergyAndPosition = {
  path: "energy-and-position",
  link: "/tutorials/energy-and-position",
};

const ReflectionTransmission = {
  path: "reflection-transmission",
  link: "/tutorials/reflection-transmission",
};

const TimeDependence = {
  path: "time-dependence",
  link: "/tutorials/time-dependence",
};

export const Tutorials = {
  path: "tutorials",
  link: "/tutorials",
  SpinLab1,
  SpinLab2,
  QuantumBasis,
  QuantumBasisLite,
  QuantumMouse,
  QuantumMouse2,
  SpinsAndMagneticFields,
  EPR,
  VectorsToFunctions,
  EnergyAndPosition,
  ReflectionTransmission,
  TimeDependence,
};
