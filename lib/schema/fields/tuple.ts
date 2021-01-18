import * as t from "@/schema/types";
import type { Field } from ".";

/**
 * A Field for an n-tuple of Fields, as provided in the `elements` property.
 * All elements are optional.
 */
export interface TupleField<Es extends readonly Field[]> {
  readonly kind: "tuple";
  readonly elements: Es;
  readonly type: t.TupleType<
    [
      ...{
        readonly [I in keyof Es]: Es[I] extends Field
          ? t.OptionalType<Es[I]["type"]>
          : Es[I];
      }
    ]
  >;
}

/**
 * Creates a Field that holds an n-tuple of Fields, as provided in the
 * `elements` argument.
 *
 * All elements are technically optional (although the tutorial interface may
 * still require them).
 */
export const tuple = <Es extends readonly [Field, ...Field[]]>(
  ...elements: Es
): TupleField<Es> => ({
  kind: "tuple",
  elements,
  type: t.tuple(...(elements.map((e) => t.optional(e.type)) as any)),
});
