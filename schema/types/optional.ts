import { Type } from ".";
import { decode, Decoder, decodeSuccess } from "./decode";

/**
 * Type instance representing an optional value.  The Type of the wrapped value
 * is given by the `value` property.
 */
export interface OptionalType<V extends Type> {
  readonly _: V["_"] | undefined;
  readonly kind: "optional";
  /**
   * The Type of the wrapped value.
   */
  readonly value: V;
}

/**
 * Creates a Type representing an optional value.  The Type of the wrapped value
 * is given by the `value` argument.
 */
export const optional = <S extends Type>(value: S): OptionalType<S> =>
  (value.kind === "optional"
    ? value
    : { kind: "optional", value }) as OptionalType<S>;

export const decodeOptional: Decoder<OptionalType<Type>> = (
  type,
  value,
  context
) =>
  value === undefined || value === null
    ? decodeSuccess(undefined)
    : decode(type.value, value, context);
