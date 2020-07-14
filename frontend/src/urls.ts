function join(...pieces: string[]) {
  return pieces.join("/");
}

export function part(tutorial: { link: string }, partName: string) {
  return join(tutorial.link, partName);
}

export interface URL {
  path: string;
  link: string;
}

const QuantumMouse = {
  path: "quantum-mouse",
  link: "/tutorials/quantum-mouse",
};

const QuantumBasis = {
  path: "quantum-basis",
  link: "/tutorials/quantum-basis",
};

export const Tutorials = {
  path: "tutorials",
  link: "/tutorials",
  QuantumBasis,
  QuantumMouse,
};
