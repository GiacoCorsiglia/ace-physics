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
): TupleType<Es> =>
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  ({ kind: "tuple", elements } as TupleType<Es>);

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
  let trailingOptionalElementsCount = 0;
  for (let i = elements.length - 1; i >= 0; i--) {
    const el = elements[i];
    if (el.kind === "optional" || el.kind === "undefined") {
      trailingOptionalElementsCount++;
    } else {
      break;
    }
  }

  const maxLength = elements.length;
  const requiredLength = maxLength - trailingOptionalElementsCount;
  const receivedLength = value.length;

  if (receivedLength < requiredLength || receivedLength > maxLength) {
    return decodeFailure(
      decodeError(
        value,
        context,
        `wrong length for tuple: expected at least (${requiredLength}), at most (${maxLength}), received (${value.length}) `
      )
    );
  }

  const newTuple: any[] = [...value];
  const errors: DecodeError[] = [];

  for (let i = 0; i < receivedLength; i++) {
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
