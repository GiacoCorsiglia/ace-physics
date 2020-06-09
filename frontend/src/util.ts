import { useRef } from "react";

export type Dictionary<T> = {
  [key: string]: T;
};

type ExtractDictType<D> = D extends Dictionary<infer T> ? T : never;

export function mapDict<D extends Dictionary<any>, T>(
  dict: D,
  iteratee: (
    value: ExtractDictType<D>,
    key: keyof D,
    originalDict: D,
    newDict: Dictionary<T>
  ) => T
): Dictionary<T> {
  const o: Dictionary<T> = {};
  for (const key in dict) {
    if (dict.hasOwnProperty(key)) {
      o[key] = iteratee(dict[key], key, dict, o);
    }
  }
  return o;
}

///

export type Writeable<T> = {
  -readonly [K in keyof T]: T[K];
};

///

export function classes(
  ...classes: (string | undefined | [string | undefined, boolean | undefined])[]
) {
  return classes
    .filter((c) => (Array.isArray(c) ? c[1] && !!c[0] : !!c))
    .map((c) => (Array.isArray(c) ? c[0] : c))
    .join(" ");
}

///

export interface Children<T = React.ReactNode> {
  children: T;
}

export interface OptionalChildren<T = React.ReactNode> {
  children?: T;
}

export type Props<T extends React.Component> = T extends React.Component<
  infer P
>
  ? P
  : never;

///

let uniqueId = 1;
/**
 * Creates a unique ID that's self-contained to the lifetime of this component
 * but otherwise doesn't matter.
 */
export function useUniqueId() {
  const idRef = useRef<number>();
  return idRef.current || (idRef.current = ++uniqueId);
}
