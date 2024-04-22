import { Infer, Type } from ".";
import {
  decode,
  decodeError,
  decodeFailure,
  Decoder,
  decodeSuccess,
} from "./decode";

/**
 * Type instance representing a union (logical OR) of any of the Types in the
 * `members` property.
 */
export interface UnionType<Ms extends readonly Type[]> {
  readonly _: Infer<Ms[number]>;
  readonly kind: "union";
  /**
   * Array of Types in the union.
   */
  readonly members: Ms;
}

/**
 * Creates a Type representing a union (logical OR) of any of the Types in the
 * `members` argument.
 */
export const union = <Ms extends readonly [Type, ...Type[]]>(
  ...members: Ms
): UnionType<Ms> =>
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  ({ kind: "union", members }) as UnionType<Ms>;

export const decodeUnion: Decoder<UnionType<readonly Type[]>> = (
  type,
  value,
  context,
) => {
  const members = type.members;

  for (const member of members) {
    const decoded = decode(member, value, context);
    if (!decoded.failed) {
      return decodeSuccess(decoded.value);
    }
  }

  return decodeFailure(
    decodeError(
      value,
      context,
      `not a union(${members.map((m) => m.kind).join("|")})`,
    ),
  );
};
