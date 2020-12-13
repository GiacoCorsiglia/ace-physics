import { Decoder, decodeSuccess } from "./decode";

/**
 * Type instance representing any value.
 */
export interface AnyType<T = any> {
  readonly _: T;
  readonly kind: "any";
}

/**
 * Creates a Type representing any value.
 */
export const any = <T = any>() =>
  ({
    kind: "any",
  } as AnyType<T>);

export const decodeAny: Decoder<AnyType> = (_, value) => decodeSuccess(value);
