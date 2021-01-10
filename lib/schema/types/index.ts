import { AnyType } from "./any";
import { ArrayType } from "./array";
import { Literal, LiteralType } from "./literal";
import { ObjectType } from "./object";
import { OptionalType } from "./optional";
import {
  BooleanType,
  NumberType,
  StringType,
  UndefinedType,
} from "./primitives";
import { TupleType } from "./tuple";
import { UnionType } from "./union";

/**
 * Runtime representation of a TypeScript type.  Limited to JSON data types (but
 * with `undefined` instead of `null`).
 */
export type Type =
  | AnyType
  | ArrayType<any>
  | BooleanType
  | LiteralType<Literal>
  | NumberType
  | ObjectType<{ readonly [k: string]: Type }>
  | OptionalType<any>
  | StringType
  | TupleType<readonly any[]>
  | UndefinedType
  | UnionType<readonly any[]>;

/**
 * Extracts the TypeScript type represented by the Type T.
 */
export type Infer<T extends Type> = T["_"];

export { any } from "./any";
export { array } from "./array";
export { decode } from "./decode";
export type { DecodeError } from "./decode";
export { literal } from "./literal";
export { asExact, exact, object, partial } from "./object";
export { optional } from "./optional";
export {
  boolean,
  number,
  string,
  undefined_ as undefined,
  undefined_,
} from "./primitives";
export { tuple } from "./tuple";
export { union } from "./union";
export type {
  AnyType,
  ArrayType,
  BooleanType,
  LiteralType,
  NumberType,
  ObjectType,
  OptionalType,
  StringType,
  TupleType,
  UndefinedType,
  UnionType,
};

// This works, but it is too costly for the TypeScript compiler.
type ConditionalInfer<I extends Type> = I extends UndefinedType
  ? undefined
  : I extends StringType
  ? string
  : I extends NumberType
  ? number
  : I extends BooleanType
  ? boolean
  : I extends LiteralType<infer L>
  ? L
  : I extends OptionalType<infer V>
  ? Infer<V> | undefined
  : I extends UnionType<infer Ms>
  ? Infer<Ms[number]>
  : I extends ArrayType<infer Es>
  ? Infer<Es>[]
  : I extends TupleType<infer Es>
  ? {
      readonly [I in keyof Es]: I extends number ? Infer<Es[I]> : Es[I];
    }
  : I extends ObjectType<infer P>
  ? {
      readonly [K in keyof P as OptionalType<any> extends P[K]
        ? K
        : never]?: Infer<P[K]>;
    } &
      {
        readonly [K in keyof P as OptionalType<any> extends P[K]
          ? never
          : K]: Infer<P[K]>;
      }
  : never;
