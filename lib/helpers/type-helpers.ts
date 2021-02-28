export type Writeable<T> = T extends readonly (infer V)[]
  ? V[]
  : {
      -readonly [K in keyof T]: T[K];
    };

export const castWriteable = <T>(o: T): Writeable<T> => o as Writeable<T>;

export type Path<O> = readonly [] | Path_<O>;
type Path_<O> = O extends Function
  ? readonly []
  : O extends object
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
