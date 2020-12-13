import * as t from "schema/types";
import type { Field } from ".";

/**
 * A Field for an array of arbitrary length holding a nested Field.  Each
 * element is optional (so the array may technically have holes).
 */
export interface ArrayField<E extends Field> {
  readonly kind: "array";
  readonly elements: E;
  readonly type: t.ArrayType<t.OptionalType<E["type"]>>;
}

/**
 * Creates a Field for an array (list) of arbitrary length holding a nested
 * Field.  Each element is technically optional (although the user interface may
 * not enable this).
 */
export const array = <E extends Field>(elements: E): ArrayField<E> => ({
  kind: "array",
  elements,
  type: t.array(t.optional(elements.type)),
});
