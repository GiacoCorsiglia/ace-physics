import * as t from "schema/types";
import type { Field } from ".";

/**
 * A dictionary of Fields representing the properties of an `ObjectField`.
 */
export interface Properties {
  readonly [key: string]: Field;
}

/**
 * A Field for a set of keys associated with nested Fields as given in the
 * `properties` property.  This is a JavaScript object (or "dictionary") of
 * Fields, with preset keys and properties.  Every property is optional.
 */
export interface ObjectField<P extends Properties> {
  readonly kind: "object";
  readonly properties: Readonly<P>;
  readonly type: t.ObjectType<
    {
      readonly [K in keyof P]: t.OptionalType<P[K]["type"]>;
    }
  >;
}

/**
 * Creates a Field for a set of keys associated with nested Fields as given in
 * the `properties` argument.
 *
 * This is a JavaScript object (or "dictionary") of Fields, with preset keys and
 * properties.  Every property is technically optional (although they may be
 * required by the user interface).
 */
export const object = <P extends Properties>(
  properties: P
): ObjectField<P> => ({
  kind: "object",
  properties,
  type: t.partial(
    Object.fromEntries(
      Object.entries(properties).map(([k, f]) => [k, f.type])
    ) as { [K in keyof P]: P[K]["type"] }
  ),
});
