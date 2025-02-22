import { Type } from ".";
import { decode, Decoder, decodeSuccess } from "./decode";

/**
 * Type instance representing an optional value.  The Type of the wrapped value
 * is given by the `value` property.
 */
export interface NullableType<V extends Type> {
  readonly _: V["_"] | null;
  readonly kind: "nullable";
  /**
   * The Type of the wrapped value.
   */
  readonly value: V;
}

/**
 * Creates a Type representing an optional value.  The Type of the wrapped value
 * is given by the `value` argument.
 */
export const nullable = <S extends Type>(value: S): NullableType<S> =>
  (value.kind === "nullable"
    ? value
    : { kind: "nullable", value }) as NullableType<S>;

export const decodeNullable: Decoder<NullableType<Type>> = (
  type,
  value,
  context,
) =>
  value === null ? decodeSuccess(null) : decode(type.value, value, context);
