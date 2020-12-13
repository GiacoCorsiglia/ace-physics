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
 * Type instance representing a tuple, which is an array of a fixed length with
 * each element matching a specific Type (that may differ by element).
 */
export interface TupleType<Es extends readonly Type[]> {
  readonly _: {
    // I don't see why the extra conditional is necessary, but it is...
    [I in keyof Es]: Es[I] extends Type ? Infer<Es[I]> : Es[I];
  };
  readonly kind: "tuple";
  /**
   * Tuple of allowed Types.
   */
  readonly elements: Es;
}

/**
 * Creates a Type representing a tuple, which is an array of a fixed length with
 * each element matching a specific Type (that may differ by element).
 */
export const tuple = <Es extends readonly [Type, ...Type[]]>(
  ...elements: Es
): TupleType<Es> => ({ kind: "tuple", elements } as TupleType<Es>);

export const decodeTuple: Decoder<TupleType<readonly Type[]>> = (
  type,
  value,
  context
) => {
  if (!Array.isArray(value)) {
    return decodeFailure(
      decodeError(value, context, "not a tuple (i.e, not an array)")
    );
  }

  const elements = type.elements;

  if (value.length !== elements.length) {
    return decodeFailure(
      decodeError(
        value,
        context,
        `wrong length for tuple: expected (${elements.length}), received (${value.length}) `
      )
    );
  }

  const newTuple: any[] = [...value];
  const errors: DecodeError[] = [];

  for (let i = 0; i < value.length; i++) {
    const decoded = decode(
      elements[i],
      value[i],
      context.concat({ index: i, type: elements[i] })
    );

    if (decoded.failed) {
      errors.push(...decoded.error);
    } else {
      newTuple[i] = decoded.value;
    }
  }

  return errors.length === 0
    ? decodeSuccess(newTuple as any)
    : decodeFailure(errors);
};
