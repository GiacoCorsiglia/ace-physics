import { Infer, Type } from ".";
import {
  decode,
  decodeError,
  DecodeError,
  decodeFailure,
  Decoder,
  decodeSuccess,
} from "./decode";

/**
 * Type instance representing an array of arbitrary length with elements
 * matching the Type given in the `elements` property.
 */
export interface ArrayType<E extends Type> {
  readonly _: readonly Infer<E>[];
  readonly kind: "array";
  /**
   * The allowed Type of the array's elements.
   */
  readonly elements: E;
}

/**
 * Creates a Type representing an array of arbitrary length with elements
 * matching the Type given in the `elements` argument.
 */
export const array = <E extends Type>(elements: E): ArrayType<E> =>
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  ({ kind: "array", elements }) as ArrayType<E>;

export const decodeArray: Decoder<ArrayType<Type>> = (type, value, context) => {
  if (!Array.isArray(value)) {
    return decodeFailure(decodeError(value, context, "not an array"));
  }

  const elements = type.elements;
  const newArray: any[] = [...value];
  const errors: DecodeError[] = [];

  for (let i = 0; i < value.length; i++) {
    const decoded = decode(
      elements,
      value[i],
      context.concat({ index: i, type: elements }),
    );

    if (decoded.failed) {
      errors.push(...decoded.error);
    } else {
      newArray[i] = decoded.value;
    }
  }

  return errors.length === 0 ? decodeSuccess(newArray) : decodeFailure(errors);
};
