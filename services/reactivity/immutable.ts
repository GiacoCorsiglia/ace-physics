/**
 * Safely get the value in `o` at `path`.
 */
export const get = <T, P extends [] | Path<T>>(
  o: T,
  path: P
): TypeAtPath<T, P> => {
  for (const key of path) {
    if (!isObject(o)) {
      // If we get here, it means we have another key to read, but o doesn't
      // hold an object (array or {}), so we can't.
      return undefined as any;
    }
    o = (o as any)[key];
  }
  return o as any;
};

/**
 * Immutably "set" the value in `o` at `path` to `newValue`.
 *
 * Returns a clone of `o` with every value at `path[0:-1]` cloned as well, but
 * returns `o` identically if no update was needed.
 */
export const set = <T, P extends Path<T>>(
  o: T,
  path: P,
  newValue:
    | TypeAtPath<T, P>
    | ((oldValue: TypeAtPath<T, P>) => TypeAtPath<T, P>)
): T => {
  // The implementation here is essentially recursion in two loops.  First, we
  // iterate through the path forwards to (a) find the old value at `path`; and
  // (b) build a stack of references to the values in `o` at `path[0:i-1]`
  // (including `o` itself at index `0`).  Then we iterate through the path
  // backward, cloning and updating the values in the stack of references to
  // include the new values, until we back out to cloning `o` itself.

  const pathLength = path.length;
  const referenceStack: any[] = [];
  let last: any = o;

  for (let i = 0; i < pathLength; i++) {
    const key = path[i];
    last = isObject(last) ? last : isIndex(key) ? [] : {};
    referenceStack.push(last);
    last = last[key];
  }

  // Now `last` holds the old value at `path`.

  if (typeof newValue === "function") {
    newValue = (newValue as any)(last);
  }

  if (newValue === last) {
    // Nothing needs to be updated, so no reason to make a clone.
    // TODO: Consider checking isShallowEqual (or even isDeepEqual) here.
    return o;
  }

  for (let i = pathLength - 1; i >= 0; i--) {
    last = referenceStack[i];
    if (Array.isArray(last)) {
      const newArray: any = last.slice();
      newArray[path[i]] = newValue;
      newValue = newArray;
    } else {
      newValue = { ...last, [path[i]]: newValue };
    }
  }

  return (newValue as unknown) as T;
};

// Helpers.

const isObject = (value: unknown): value is object =>
  value !== null && typeof value === "object";

const indexRegEx = /^(?:0|[1-9]\d*)$/;
const isIndex = (i: PropertyKey) =>
  (typeof i === "number" || (typeof i !== "symbol" && indexRegEx.test(i))) &&
  // JavaScript will "correctly" cast the string to a number for these tests.
  ((i as unknown) as number) > -1 &&
  ((i as unknown) as number) % 1 === 0;

// Types.

export type Path<O> = [] | Path_<O>;
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
