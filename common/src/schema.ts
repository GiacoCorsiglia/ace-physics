/**
 * This module provides a mechanism for representing the type, or "shape," of
 * values as "schemas."  Schemas handle both "decoding" and "validation."
 * Decoding ensures an unknown value adheres to the shape defined by the
 * TypeScript type associated with the Schema. Validation ensures that a decoded
 * value adheres to additional constraints---ones that cannot be [easily]
 * represented in the type system.
 *
 * Consider the `number()` schema exported from this module.
 * `number().decode(value)` will check if `value` is a `number,` but
 * `number().validate(value)` might check if `value` is within some range, or is
 * an integer.
 *
 * The schemas exported by this file are nullable by default, meaning `null` or
 * `undefined` are always accepted as valid both in the decoding step and.
 *
 * Heavily inspired by (io-ts)[https://github.com/gcanti/io-ts], but integrates
 * validation logic and is otherwise tailored to the needs of this project.
 */

/**
 * Serializable data types---essentially JSON.
 */
export type Data =
  | undefined
  | null
  | boolean
  | number
  | string
  | Data[]
  | { [key: string]: Data };

/**
 * Runtime representation of a Data type, plus validation logic that doesn't
 * [necessarily] belong in the type layer.
 */
export interface Schema<T extends Data = Data> {
  is(v: unknown): v is T;
  decode(v: unknown, context?: Context): Decoded<T>;
  validate(v: T): Validated<T>;
  default(): T | null;
  // Using `this` here permits a polymorphic fluent API.
  // We never actually return `this`; instead we return clones.
  // These are only used for the field configuration not the type configuration.
  withDefault(default_: Default<T>): this;
  withValidator(validator: Validator<T>): this;
}

type Empty = undefined | null;
type NonEmpty<T> = T extends Empty ? never : T;

const isEmpty = (v: unknown): v is Empty => v === null || v === undefined;

/**
 * A schema that may is allowed to be null or undefined.
 */
type NullableSchema<T extends NonEmpty<Data>, Extra> = Schema<T | null> & {
  required(): Schema<T> & Extra;
} & Extra;

/**
 * Extracts the TypeScript type represented by the Schema S.
 */
export type TypeOf<S extends Schema> = S extends NullableSchema<infer T, {}>
  ? T
  : S extends Schema<infer T>
  ? T
  : never;

/**
 * Schema constructor, that also tacks on extra properties.
 */
function schema<T extends Data, Extra extends {}>(
  {
    is,
    decode: decode_,
    default: default_, // `default` is a keyword
    validators = [],
  }: {
    is(v: unknown): v is T;
    decode(v: unknown, context: Context): Decoded<T>;
    default: Default<T>;
    validators?: Validator<T>[];
  },
  extra: Extra
): Schema<T> & Extra {
  const self = {
    is,
    decode(v: unknown, context?: Context) {
      if (!context) {
        context = [{ key: "", schema: this }];
      }
      return decode_(v, context);
    },
    default: createDefault(default_),
    validate: createValidate(validators),
    // Modifiers.
    withValidator(validator: Validator<T>) {
      return {
        ...this,
        validate: createValidate(validators.concat([validator])),
      };
    },
    withDefault(default_: Default<T>) {
      return {
        ...this,
        default: createDefault(default_),
      };
    },
    // Add the extra properties/methods.
    ...extra,
  };

  return self;
}

function createDefault<T>(default_: Default<T>): () => T | null {
  return typeof default_ === "function" ? (default_ as any) : () => default_;
}

function createValidate<T>(validators: Validator<T>[]) {
  return function validate(value: T) {
    if (isEmpty(value)) {
      return Ok(value);
    }

    return validators.reduce(
      (validated: Validated<T>, validator) =>
        isFailure(validated) ? validated : validator(validated.value),
      Ok(value)
    );
  };
}

/**
 * Converts a Schema to a NullableSchema.
 */
function nullable<T extends NonNullable<Data>, Extra = {}>(
  schema: Schema<T> & Extra
): NullableSchema<T, Extra> {
  const self: NullableSchema<T, Extra> = {
    ...schema, // This will include extra properties!
    is(v: unknown): v is T | null {
      if (isEmpty(v)) {
        return true;
      }
      return schema.is(v);
    },
    decode(v: unknown, context?: Context) {
      if (!context) {
        context = [{ key: "", schema: self }];
      }
      if (isEmpty(v)) {
        // Always return `null`, never `undefined`.
        return Ok(null);
      }
      return schema.decode(v, context);
    },
    required() {
      return schema;
    },
  };

  return self;
}

////////////////////////////////////////////////////////////////////////////////

const decodeFromIs = <T>(is: (v: unknown) => v is T, type: string) => (
  v: unknown,
  context: Context
): Decoded<T> => (is(v) ? Ok(v) : Failure(v, context, `not a ${type}`));

const isFromDecode = <T>(
  decode: (v: unknown, context: Context) => Decoded<T>
) => (v: unknown): v is T => (isOk(decode(v, [])) ? true : false);

////////////////////////////////////////////////////////////////////////////////

function memoize<T>(create: () => T): () => T {
  let memo: T;
  return () => memo || (memo = create());
}

/**
 * Creates a schema representing a boolean value.
 */
export const boolean = memoize(() => {
  const is = (v: unknown): v is boolean => typeof v === "boolean";
  return nullable<boolean, {}>(
    schema(
      {
        is,
        decode: decodeFromIs(is, "boolean"),
        default: null,
      },
      {}
    )
  );
});

interface NumberSchemaOptions {
  withMin(min: number): this;
}

/**
 * Creates a schema representing a numerical value.
 */
export const number = memoize(() => {
  const is = (v: unknown): v is number => typeof v === "number";
  return nullable<number, NumberSchemaOptions>(
    schema(
      {
        is,
        decode: decodeFromIs(is, "number"),
        default: null,
      },
      {
        withMin(this: Schema<number>, min: number): any {
          return this.withValidator((v) =>
            v >= min
              ? Ok(v)
              : Failure(
                  v,
                  {} as any, // TODO
                  `${v} is strictly less than the minimum allowed value ${min}`
                )
          );
        },
      }
    )
  );
});

/**
 * Creates a schema representing a string value.
 */
export const string = memoize(() => {
  const is = (v: unknown): v is string => typeof v === "string";
  return nullable<string, {}>(
    schema(
      {
        is,
        decode: decodeFromIs(is, "string"),
        default: "",
      },
      {}
    )
  );
});

/**
 * Creates a schema representing an array of arbitrary length with elements
 * matching the schema given in the `elements` argument.
 */
export function array<T extends Data>(elements: Schema<T>) {
  function decode(v: unknown, context: Context): Decoded<T[]> {
    if (!Array.isArray(v)) {
      return Failure(v, context, "not an array");
    }

    const out: T[] = [...v];
    const errors: Error<unknown>[] = [];

    for (let i = 0; i < v.length; i++) {
      const decoded = elements.decode(
        v[i],
        context.concat([{ key: String(i), schema: elements }])
      );
      if (isOk(decoded)) {
        out[i] = decoded.value;
      } else {
        errors.push(...decoded.errors);
      }
    }

    return errors.length === 0
      ? Ok(out)
      : Failure(v, context, "one or more incorrect array elements", errors);
  }

  return nullable<T[], { readonly elements: Schema<T> }>(
    schema(
      {
        is: isFromDecode(decode),
        decode,
        default: () => [],
      },
      { elements }
    )
  );
}

export type Properties = { [k: string]: Schema };
export type RecordSchema<P extends Properties> =
  | (Schema<{ [K in keyof P]: TypeOf<P[K]> }> & {
      readonly properties: Readonly<P>;
    })
  | NullableSchema<
      { [K in keyof P]: TypeOf<P[K]> },
      { readonly properties: Readonly<P> }
    >;

/**
 * Creates a schema representing a "record" (i.e., a JavaScript object) with
 * properties matching the schemas in the `properties` argument.
 */
export function record<P extends Properties>(properties: P) {
  type T = { [K in keyof P]: TypeOf<P[K]> };

  function decode(v: unknown, context: Context): Decoded<T> {
    if (typeof v !== "object" || v === null) {
      return Failure(v, context, "not an object");
    }

    const out: any = { ...v };
    const errors: Error<unknown>[] = [];

    for (const key in properties) {
      const decoded = properties[key].decode(
        (v as any)[key],
        context.concat([
          {
            key,
            schema: properties[key],
          },
        ])
      );

      if (isOk(decoded)) {
        out[key] = decoded.value;
      } else {
        errors.push(...decoded.errors);
      }
    }

    return errors.length === 0
      ? Ok(out)
      : Failure(v, context, "one or more incorrect record properties", errors);
  }

  return nullable<T, { readonly properties: Readonly<P> }>(
    schema(
      {
        is: isFromDecode(decode),
        decode,
        default: (): T | null => {
          const o: any = {};
          for (const p in properties) {
            o[p] = properties[p].default();
          }
          return o;
        },
      },
      { properties }
    )
  );
}

////////////////////////////////////////////////////////////////////////////////

type Result<T, E> = Ok<T> | Failure<E>;

type Validated<T> = Result<T, T>;
type Decoded<T> = Result<T, unknown>;

type Validator<T> = (v: NonEmpty<T>) => Validated<NonEmpty<T>>;

type Default<T> = (T | null) | (() => T | null);

const IsOk = Symbol("IsOk");

interface Ok<T> {
  readonly [IsOk]: true;
  readonly value: T;
}

interface Failure<T> {
  readonly [IsOk]: false;
  readonly errors: ReadonlyArray<Error<T>>;
}

interface Error<T> {
  readonly value: T;
  readonly context: Context;
  readonly message: string;
}

type Context = ReadonlyArray<{
  readonly key: string;
  readonly schema: Schema;
}>;

function Ok<T>(value: T): Ok<T> {
  return { [IsOk]: true, value };
}

function Failure<T>(
  value: T,
  context: Context,
  message: string,
  errors: Error<T>[] = []
): Failure<T> {
  return {
    [IsOk]: false,
    errors: [{ value, context, message }, ...errors],
  };
}

/**
 * Determines whether the result of decoding or validation is a success.
 */
export function isOk<T, E>(result: Result<T, E>): result is Ok<T> {
  return result[IsOk];
}

/**
 * Determines whether the result of decoding or validation is a failure.
 */
export function isFailure<T, E>(result: Result<T, E>): result is Failure<E> {
  return !result[IsOk];
}
