import { decodeError, decodeFailure, Decoder, decodeSuccess } from "./decode";

const constant = <T>(c: T) => () => c;

/**
 * Type instance representing an undefined value.
 */
export interface UndefinedType {
  readonly _: undefined;
  readonly kind: "undefined";
}

/**
 * Creates a Type representing an undefined value.
 */
export const undefined_ = constant<UndefinedType>({
  kind: "undefined",
} as UndefinedType);

/**
 * Type instance representing a boolean value.
 */
export interface BooleanType {
  readonly _: boolean;
  readonly kind: "boolean";
}

/**
 * Creates a Type representing a boolean value.
 */
export const boolean = constant<BooleanType>({
  kind: "boolean",
} as BooleanType);

/**
 * Type instance representing a number value.
 */
export interface NumberType {
  readonly _: number;
  readonly kind: "number";
}

/**
 * Creates a Type representing a number value.
 */
export const number = constant<NumberType>({ kind: "number" } as NumberType);

/**
 * Type instance representing a string value.
 */
export interface StringType {
  readonly _: string;
  readonly kind: "string";
}

/**
 * Creates a Type representing a string value.
 */
export const string = constant<StringType>({ kind: "string" } as StringType);

// Decode.

type PrimitiveType = UndefinedType | BooleanType | NumberType | StringType;

export const decodePrimitive: Decoder<PrimitiveType> = (
  type,
  value,
  context
) => {
  if (type.kind === "undefined" && value === null) {
    return decodeSuccess(undefined);
  }

  return typeof value === type.kind
    ? decodeSuccess(value as any)
    : decodeFailure(decodeError(value, context, `not a ${type.kind}`));
};
