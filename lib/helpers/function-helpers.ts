export const range = (
  start: number,
  stop?: number,
  step: number = 1
): number[] => {
  if (stop === undefined) {
    stop = start;
    start = 0;
  }

  if (stop < start || step <= 0) {
    return [];
  }

  const out: number[] = [];
  for (let i = start; i < stop; i += step) {
    out.push(i);
  }
  return out;
};

export const isObject = (value: unknown): value is object =>
  value !== null && typeof value === "object";

const indexRegEx = /^(?:0|[1-9]\d*)$/;
export const isIndex = (i: PropertyKey) =>
  (typeof i === "number" || (typeof i !== "symbol" && indexRegEx.test(i))) &&
  // JavaScript will "correctly" cast the string to a number for these tests.
  (i as unknown as number) > -1 &&
  (i as unknown as number) % 1 === 0;

export const asIndex = (i: number | string | symbol): number | null => {
  if (typeof i === "number") {
    return i;
  } else if (typeof i === "symbol") {
    return null;
  }
  const n = Number(i);
  return n !== Infinity && String(n) === i && n >= 0 ? n : null;
};

/** Tests if two arrays contain the same elements in the same order. */
export const arraysEqual = (
  a1?: readonly unknown[],
  a2?: readonly unknown[]
): boolean => {
  if (!a1 || !a2 || a1.length !== a2.length) {
    return false;
  }

  for (let i = 0; i < a1.length; i++) {
    if (a1[i] !== a2[i]) {
      return false;
    }
  }

  return true;
};

/** Tests if two arrays contain the same elements in any order. */
export const arraysSetEqual = (
  a1?: readonly unknown[],
  a2?: readonly unknown[]
): boolean => {
  if (!a1 || !a2 || a1.length !== a2.length) {
    return false;
  }

  a1 = a1.slice().sort();
  a2 = a2.slice().sort();

  for (let i = 0; i < a1.length; i++) {
    if (a1[i] !== a2[i]) {
      return false;
    }
  }

  return true;
};

export const approxEquals = <
  T extends
    | number
    | readonly (number | undefined)[]
    | readonly (readonly (number | undefined)[] | undefined)[]
>(
  n1: T | undefined,
  n2: T | undefined,
  forgiveness: number = 0.02
): boolean => {
  if (n1 === undefined || n2 === undefined) {
    return false;
  }

  if (Array.isArray(n1) && Array.isArray(n2)) {
    if (n1.length !== n2.length) {
      return false;
    }
    for (let i = 0; i < n1.length; i++) {
      if (!approxEquals(n1[i], n2[i])) {
        return false;
      }
    }
    return true;
  }

  if (Number.isNaN(n1) || Number.isNaN(n2)) {
    return false;
  }
  return Math.abs((n1 as number) - (n2 as number)) <= forgiveness;
};

export const norm = (
  ...ns: readonly (number | undefined)[]
): number | undefined => {
  const squared = ns.reduce(
    (norm, n) =>
      norm === undefined || n === undefined ? undefined : norm + n ** 2,
    0
  );
  return squared === undefined ? undefined : Math.sqrt(squared);
};

export function normalize<Ns extends readonly number[]>(
  ns: Ns
): {
  [i in keyof Ns]: number;
};
export function normalize<Ns extends readonly (number | undefined)[]>(
  ns: Ns
): {
  [i in keyof Ns]: number | undefined;
};
export function normalize<Ns extends readonly (number | undefined)[]>(
  ns: Ns
): {
  [i in keyof Ns]: number | undefined;
} {
  const norm_ = norm(...ns);
  if (norm_ === undefined) {
    return ns.map((_) => undefined) as any;
  }
  return ns.map((n) => (n === undefined ? undefined : n / norm_)) as any;
}

export const roundToNearest = (number: number, nearest: number): number =>
  nearest * Math.round(number / nearest);

export const deepEqual = (a: unknown, b: unknown): boolean => {
  if (a === b) {
    return true;
  } else if (typeof a !== "object" || typeof b !== "object") {
    // Check if they're both NaN
    return a !== a && b !== b;
  } else if (!a || !b) {
    return false;
  } else if (Array.isArray(a)) {
    if (!Array.isArray(b)) {
      return false;
    }

    if (a.length !== b.length) {
      return false;
    }

    return a.every((v, i) => deepEqual(v, b[i]));
  } else if (a instanceof Map) {
    if (!(b instanceof Map)) {
      return false;
    }

    if (a.size !== b.size) {
      return false;
    }

    for (const el of a.entries()) {
      if (!b.has(el[0])) {
        return false;
      }
    }

    for (const el of a.entries()) {
      if (!deepEqual(el[1], b.get(el[0]))) {
        return false;
      }
    }

    return true;
  } else if (a instanceof Set) {
    if (!(b instanceof Set)) {
      return false;
    }

    if (a.size !== b.size) {
      return false;
    }

    for (const el of a.entries()) {
      if (!b.has(el[0])) {
        return false;
      }
    }

    return true;
  } else {
    // Treat them as plain objects.

    // We do not distinguish between missing keys and undefined values.  This is
    // unlike most deepEqual functions.

    const aKeys = notUndefinedKeys(a);
    const bKeys = notUndefinedKeys(b);
    if (aKeys.length !== bKeys.length) {
      return false;
    }

    // Compare sorted keys.
    aKeys.sort();
    bKeys.sort();
    for (let i = 0; i < aKeys.length; i++) {
      // eslint-disable-next-line eqeqeq
      if (aKeys[i] != bKeys[i]) {
        return false;
      }
    }

    for (let i = 0; i < aKeys.length; i++) {
      const key = aKeys[i];
      if (!deepEqual((a as any)[key], (b as any)[key])) {
        return false;
      }
    }

    return true;
  }
};

const hasOwnProperty = Object.prototype.hasOwnProperty;

const notUndefinedKeys = (o: any) => {
  const keys = [];
  for (const k in o) {
    if (hasOwnProperty.call(o, k) && o[k] !== undefined) {
      keys.push(k);
    }
  }
  return keys;
};

export const sortBy = <T>(array: T[], property: keyof T) =>
  array
    .slice()
    .sort(
      (a, b) =>
        ((a[property] > b[property]) as any) -
        ((a[property] < b[property]) as any)
    );

const emailX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const isValidEmail = (email: string) => emailX.test(email);

export const isValidEmailList = (emails: string) => {
  for (let email of emails.split("\n")) {
    email = email.trim();
    if (email && !isValidEmail(email)) {
      return false;
    }
  }
  return true;
};
