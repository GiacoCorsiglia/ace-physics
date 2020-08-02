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
