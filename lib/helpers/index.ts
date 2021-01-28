export * from "./deep-equal";

export const htmlTitle = (title: string) => `${title} | ACEPhysics.net`;

export const isObject = (value: unknown): value is object =>
  value !== null && typeof value === "object";

const indexRegEx = /^(?:0|[1-9]\d*)$/;
export const isIndex = (i: PropertyKey) =>
  (typeof i === "number" || (typeof i !== "symbol" && indexRegEx.test(i))) &&
  // JavaScript will "correctly" cast the string to a number for these tests.
  ((i as unknown) as number) > -1 &&
  ((i as unknown) as number) % 1 === 0;

export const asIndex = (i: number | string | symbol): number | null => {
  if (typeof i === "number") {
    return i;
  } else if (typeof i === "symbol") {
    return null;
  }
  const n = Number(i);
  return n !== Infinity && String(n) === i && n >= 0 ? n : null;
};

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

export const arraysEqual = (a1?: any[], a2?: any[]): boolean => {
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
    | (number | undefined)[]
    | ((number | undefined)[] | undefined)[]
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

export const norm = (...ns: (number | undefined)[]): number | undefined => {
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

// Types.

export type Writeable<T> = {
  -readonly [K in keyof T]: T[K];
};

export type Path<O> = readonly [] | Path_<O>;
type Path_<O> = O extends object
  ? {
      [K in keyof O]-?:
        | readonly [K]
        | (Path_<O[K]> extends infer P
            ? P extends readonly any[]
              ? readonly [K, ...P]
              : never
            : never);
    }[keyof O]
  : readonly [];

export type TypeAtPath<
  O,
  P extends readonly PropertyKey[]
> = P extends readonly []
  ? O
  : O extends any // This distributes over unions.
  ? P extends readonly [keyof O, ...infer T]
    ? T extends PropertyKey[]
      ? TypeAtPath<O[P[0]], T>
      : never
    : never
  : never;

// Stolen from Immer:
// https://github.com/immerjs/immer/blob/7faa7b47df78f30fced650c323f6b53b5e62e160/src/types/types-external.ts#L58
export type Immutable<T> = T extends
  | Function
  | Promise<any>
  | Date
  | RegExp
  | Boolean
  | Number
  | String
  ? T
  : T extends ReadonlyMap<infer K, infer V>
  ? ReadonlyMap<Immutable<K>, Immutable<V>>
  : T extends ReadonlySet<infer V>
  ? ReadonlySet<Immutable<V>>
  : T extends WeakMap<any, any> | WeakSet<any>
  ? T
  : T extends object
  ? { readonly [K in keyof T]: Immutable<T[K]> }
  : T;
