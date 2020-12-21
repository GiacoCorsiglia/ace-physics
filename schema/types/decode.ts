import { failure, Result, success } from "services/helpers/result";
import type { Infer, Type } from ".";
import { decodeAny } from "./any";
import { decodeArray } from "./array";
import { decodeLiteral } from "./literal";
import { decodeObject } from "./object";
import { decodeOptional } from "./optional";
import { decodePrimitive } from "./primitives";
import { decodeTuple } from "./tuple";
import { decodeUnion } from "./union";

/**
 * Determines whether the passed value matches the given type.  If not, it
 * returns a set of errors explaining why not.
 * The `context` parameter is internal.
 */
export const decode = <T extends Type>(
  type: T,
  value: unknown,
  context?: Context
): Decoded<Infer<T>> => {
  if (!context) {
    context = [{ index: null, type }];
  }

  // Doing this enables the discriminated union to work in the switch despite
  // having a generic <T>.
  const t: Type = type;

  switch (t.kind) {
    case "undefined":
    case "boolean":
    case "number":
    case "string":
      return decodePrimitive(t, value, context);
    case "optional":
      return decodeOptional(t, value, context);
    case "literal":
      return decodeLiteral(t, value, context);
    case "union":
      return decodeUnion(t, value, context);
    case "array":
      return decodeArray(t, value, context);
    case "tuple":
      return decodeTuple(t, value, context);
    case "object":
      return decodeObject(t, value, context);
    case "any":
      return decodeAny(t, value, context);
  }
};

export type Decoder<T extends Type> = (
  type: T,
  value: unknown,
  context: Context
) => Decoded<Infer<T>>;

export type Decoded<T> = Result<readonly DecodeError[], T>;

export interface DecodeError {
  readonly value: unknown;
  readonly context: Context;
  readonly message: string;
  readonly path: string;
}

interface Context
  extends ReadonlyArray<{
    readonly index: string | number | null;
    readonly type: Type;
  }> {}

export const decodeFailure = <T>(
  errors: DecodeError | readonly DecodeError[]
) => failure(Array.isArray(errors) ? errors : [errors]);

export const decodeSuccess = success;

export const decodeError = <T>(
  value: T,
  context: Context,
  message: string
): DecodeError => ({
  value,
  context,
  message,
  path: context.reduce((path, ctx) => {
    if (ctx.index === null) {
      return path;
    }
    if (typeof ctx.index === "number") {
      return `${path}[${ctx}]`;
    }
    if (path) {
      path += ".";
    }
    return path + ctx.index;
  }, ""),
});
