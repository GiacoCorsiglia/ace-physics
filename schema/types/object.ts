import { Infer, Type } from ".";
import {
  decode,
  decodeError,
  DecodeError,
  decodeFailure,
  Decoder,
  decodeSuccess,
} from "./decode";
import { optional, OptionalType } from "./optional";

interface Properties {
  readonly [k: string]: Type;
}

/**
 * Type instance representing a (plain) JavaScript object with properties
 * matching the Types in the `properties` property.  Extra properties will be
 * preserved when decoding, unless `exact` is true.
 */
export interface ObjectType<P extends Properties> {
  // The extra map here flattens it into one declaration.
  readonly _: {
    [K in keyof ({
      readonly [K in keyof P as P[K] extends OptionalType<any>
        ? K
        : never]?: null;
    } &
      {
        readonly [K in keyof P as P[K] extends OptionalType<any>
          ? never
          : K]: null;
      })]: K extends keyof P ? Infer<P[K]> : never;
  };
  readonly kind: "object";
  /**
   * An object that holds the Type of each property.
   */
  readonly properties: P;
  /**
   * Whether to discard unrecognized properties when decoding.
   */
  readonly exact: boolean;
}

/**
 * Creates a Type representing a (plain) JavaScript object with properties
 * matching the Types in the `properties` argument.  All properties are required
 * unless they are an `OptionalType` instance.  If all properties are optional,
 * use `partial` instead.
 */
export const object = <P extends Properties>(properties: P): ObjectType<P> =>
  ({ kind: "object", properties, exact: false } as ObjectType<P>);

/**
 * Creates a Type representing a (plain) JavaScript object with properties
 * matching the Types in the `properties` argument.  All properties are made
 * optional.  If some properties are required, use `object` instead,
 */
export const partial = <P extends Properties>(properties: P) =>
  object(
    Object.fromEntries(
      Object.entries(properties).map(([k, p]) => [k, optional(p)])
    ) as { [K in keyof P]: OptionalType<P[K]> }
  );

/**
 * Creates a Type representing a (plain) JavaScript object with properties
 * matching the Types in the `properties` argument.  Unrecognized properties
 * will be discarded when decoding.  All properties are required unless they are
 * an `OptionalType` instance.  If all properties are optional, use `asExact`
 * with `partial` instead.
 */
export const exact = <P extends Properties>(properties: P): ObjectType<P> =>
  ({ kind: "object", properties, exact: true } as ObjectType<P>);

/**
 * Given an ObjectType, converts it to an "exact" ObjectType, meaning
 * unrecognized properties will be discarded when decoding.
 */
export const asExact = <P extends Properties>(
  objectSchema: ObjectType<P>
): ObjectType<P> => ({ ...objectSchema, exact: true });

export const decodeObject: Decoder<ObjectType<Properties>> = (
  type,
  value,
  context
) => {
  if (typeof value !== "object" || value === null) {
    return decodeFailure(decodeError(value, context, "not an object"));
  }

  const properties = type.properties;
  const newObject: any = type.exact ? {} : { ...value };
  const errors: DecodeError[] = [];

  for (const key in properties) {
    const subValue = (value as any)[key];
    const child = properties[key];
    const decoded = decode(
      child,
      subValue,
      context.concat({ index: key, type: child })
    );

    if (decoded.failed) {
      errors.push(...decoded.error);
    } else if (decoded.value !== undefined) {
      newObject[key] = decoded.value;
    }
  }

  return errors.length === 0 ? decodeSuccess(newObject) : decodeFailure(errors);
};
