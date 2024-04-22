import { decodeError, decodeFailure, Decoder, decodeSuccess } from "./decode";

/**
 * Data types that can be sub-typed as literal values.
 */
export type Literal = string | number | boolean;

/**
 * Type instance representing a literal value, which is a value that is
 * constrained to be one just one string, number, or boolean value.
 */
export interface LiteralType<L extends Literal> {
  readonly _: L;
  readonly kind: "literal";
  /**
   * The literal value allowed by this Type.
   */
  readonly value: L;
}

/**
 * Creates a Type representing a literal value, which is a value that is
 * constrained to be one just one string, number, or boolean value.
 */
export const literal = <L extends Literal>(value: L): LiteralType<L> =>
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  ({ kind: "literal", value }) as LiteralType<L>;

export const decodeLiteral: Decoder<LiteralType<any>> = (
  type,
  value,
  context,
) =>
  value === type.value
    ? decodeSuccess(value as any)
    : decodeFailure(
        decodeError(
          value,
          context,
          `${value} is not literally "${type.value}"`,
        ),
      );
