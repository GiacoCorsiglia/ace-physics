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
 * `undefined` are always accepted as valid both in the decoding step and the
 * validation step.  `null` is always converted to `undefined`.
 *
 * Heavily inspired by (io-ts)[https://github.com/gcanti/io-ts], but integrates
 * validation logic and is otherwise tailored to the needs of this project.
 */

/**
 * Serializable data types---essentially JSON.  Note that we only use
 * `undefined` and never `null`.  Since we want to include the case of missing
 * object properties, we have to handle `undefined`.  At that point, allowing
 * `null` as well becomes tedious and unnecessary---we can just always use
 * `undefined` to represent a missing value.  Also, the record type allows
 * missing properties by default, and the `undefined` case has a simpler looking
 * TypeScript type (`{ foo?: string }` instead of `{ foo: string | null }`).
 */
export type Data =
  | undefined
  | boolean
  | number
  | string
  | Data[]
  | { [key: string]: Data };

/**
 * Extracts the TypeScript type represented by the Schema S.
 */
export type TypeOf<S extends Schema> = S["T"];

/**
 * Runtime representation of a Data type, plus validation logic that doesn't
 * [necessarily] belong in the type layer.
 */
export abstract class Schema<T extends Data = any> {
  /**
   * The TypeScript type represented by the schema.
   * This is a "phantom property," meaning it only exists on the type level and
   * cannot actually be read (it's never initialized).
   * @internal
   */
  readonly T!: T;

  /**
   * The default field value for this instance.
   */
  protected readonly _default: Default<T> = undefined;

  /**
   * Functions containing validation logic to check constraints on the value of
   * this field in the `validate()` method.
   */
  protected readonly validators: Validator<T>[] = [];

  /**
   * A type guard for the type represented by the schema.
   */
  public abstract is(v: unknown): v is T;

  /**
   * Determines whether the passed value matches the expected type.  If not, it
   * returns a set of errors explaining why not.
   * The `context` parameter is internal.
   */
  public decode(v: unknown, context?: Context): Decoded<T> {
    if (!context) {
      context = [{ index: null, schema: this }];
    }
    return this._decode(v, context);
  }

  /**
   * The default value for this field.
   */
  public default(): T | undefined {
    return typeof this._default === "function"
      ? this._default()
      : this._default;
  }

  /**
   * Checks if the value of this field adheres to logical constraints that are
   * not expressible in the type system (or at least not easily).
   */
  public validate(value: T): Validated<T> {
    return this.validators.reduce(
      (validated: Validated<T>, validator) =>
        isFailure(validated) ? validated : validator(validated.value),
      Ok(value)
    );
  }

  /**
   * Creates a clone of this schema updated to include the new default field
   * value.
   */
  public withDefault(_default: Default<T>): this {
    return this.cloneWith(_default, this.validators);
  }

  /**
   * Creates a clone of this schema updated to include the additional field
   * validator.
   */
  public withValidator(validator: Validator<T>): this {
    return this.cloneWith(this._default, this.validators.concat([validator]));
  }

  /**
   * Internal implementation of the decoder
   */
  protected abstract _decode(v: unknown, context: Context): Decoded<T>;

  /**
   * Creates a clone of this schema updated to include the new default field
   * value and the new validators.  Helper method for the basic `withDefault()`
   * and `withValidator()` methods.
   *
   * The `this` return type is a lie: we return a clone, not actually `this.`
   */
  private cloneWith(_default: Default<T>, validators: Validator<T>[]): this {
    // This technique for cloning allows us to avoid having to implement
    // specific logic for subclasses that may have extra properties or
    // constructor arguments to preserve.  There won't be any issues with `this`
    // unless subclasses implement methods that depend on `this._default` or
    // `this.validators` AND those methods are bound to the specific instance.
    const clone = Object.assign(
      Object.create(this.constructor.prototype),
      this
    );
    clone._default = _default;
    clone.validators = validators;
    return clone;
  }
}

const decodeFromIs = <T>(is: (v: unknown) => v is T, type: string) => (
  v: unknown,
  context: Context
): Decoded<T> => (is(v) ? Ok(v) : Failure(Error(v, context, `not a ${type}`)));

const isFromDecode = <T>(
  decode: (v: unknown, context: Context) => Decoded<T>
) => (v: unknown): v is T => (isOk(decode(v, [])) ? true : false);

function constant<T>(value: T) {
  return () => value;
}

/**
 * Schema instance representing a boolean value.
 */
class BooleanSchema extends Schema<boolean> {
  is(v: unknown): v is boolean {
    return typeof v === "boolean";
  }

  readonly _decode = decodeFromIs(this.is.bind(this), "boolean");
}

/**
 * Creates a schema representing a boolean value.
 */
export const boolean = constant(new BooleanSchema());

/**
 * Schema instance representing a boolean value.
 */
class NumberSchema extends Schema<number> {
  is(v: unknown): v is number {
    return typeof v === "number";
  }

  readonly _decode = decodeFromIs(this.is.bind(this), "number");
}

/**
 * Creates a schema representing a number value.
 */
export const number = constant(new NumberSchema());

/**
 * Schema instance representing a string value.
 */
class StringSchema extends Schema<string> {
  protected readonly _default = "";

  is(v: unknown): v is string {
    return typeof v === "string";
  }

  protected readonly _decode = decodeFromIs(this.is.bind(this), "string");
}

/**
 * Creates a schema representing a string value.
 */
export const string = constant(new StringSchema());

/**
 * Schema instance representing an array of arbitrary length with elements
 * matching the schema given in the `elements` property.
 */
class ArraySchema<S extends Schema> extends Schema<TypeOf<S>[]> {
  protected readonly _default = () => [];

  constructor(public readonly elements: S) {
    super();
  }

  protected _decode(v: unknown, context: Context) {
    if (!Array.isArray(v)) {
      return Failure(Error(v, context, "not an array"));
    }

    const out: TypeOf<S>[] = [...v];
    const errors: Error<unknown>[] = [];

    for (let i = 0; i < v.length; i++) {
      const decoded = this.elements.decode(
        v[i],
        context.concat([{ index: i, schema: this.elements }])
      );
      if (isOk(decoded)) {
        out[i] = decoded.value;
      } else {
        errors.push(...decoded.errors);
      }
    }

    return errors.length === 0 ? Ok(out) : Failure(errors);
  }

  readonly is = isFromDecode(this._decode.bind(this));
}

/**
 * Creates a schema representing an array of arbitrary length with elements
 * matching the schema given in the `elements` argument.
 */
export const array = <T extends Data>(elements: Schema<T>) =>
  new ArraySchema(elements);

type TupleEntry<S extends Schema> = TypeOf<S> | undefined;

/**
 * Schema instance representing a tuple, which is an array of a fixed length
 * with each element matching a specific schema (that may differ by element).
 * Note that all elements are considered nullable!
 */
class TupleSchema<S extends Schema[]> extends Schema<
  S extends { length: 1 }
    ? [TupleEntry<S[0]>]
    : S extends { length: 2 }
    ? [TupleEntry<S[0]>, TupleEntry<S[1]>]
    : S extends { length: 3 }
    ? [TupleEntry<S[0]>, TupleEntry<S[1]>, TupleEntry<S[1]>]
    : S extends { length: 4 }
    ? [TupleEntry<S[0]>, TupleEntry<S[1]>, TupleEntry<S[2]>, TupleEntry<S[3]>]
    : S extends { length: 5 }
    ? [
        TupleEntry<S[0]>,
        TupleEntry<S[1]>,
        TupleEntry<S[2]>,
        TupleEntry<S[3]>,
        TupleEntry<S[4]>
      ]
    : never
> {
  constructor(public readonly elements: S) {
    super();
  }

  protected readonly _default = function (this: TupleSchema<Schema[]>) {
    return this.elements.map((s) => s.default()) as any;
  };

  protected _decode(v: unknown, context: Context): Decoded<this["T"]> {
    if (!Array.isArray(v)) {
      return Failure(Error(v, context, "not a tuple (i.e, not an array)"));
    }

    if (v.length !== this.elements.length) {
      return Failure(
        Error(
          v,
          context,
          `wrong length for tuple: expected (${this.elements.length}), received (${v.length}) `
        )
      );
    }

    const out: this["T"] = [...v] as this["T"];
    const errors: Error<unknown>[] = [];

    for (let i = 0; i < v.length; i++) {
      if (v[i] === undefined || v[i] === null) {
        // Always accept empty entries, but convert them to `undefined`.
        out[i] = undefined;
        continue;
      }

      const decoded = this.elements[i].decode(
        v[i],
        context.concat([{ index: i, schema: this.elements[i] }])
      );
      if (isOk(decoded)) {
        out[i] = decoded.value;
      } else {
        errors.push(...decoded.errors);
      }
    }

    return errors.length === 0 ? Ok(out) : Failure(errors);
  }

  readonly is = isFromDecode(this._decode.bind(this));
}

/**
 * Creates a schema representing a tuple, which is an array of a fixed length
 * with each element matching a specific schema (that may differ by element).
 * Note that all elements are considered nullable!
 */
export function tuple<A extends Schema>(...elements: [A]): TupleSchema<[A]>;
export function tuple<A extends Schema, B extends Schema>(
  ...elements: [A, B]
): TupleSchema<[A, B]>;
export function tuple<A extends Schema, B extends Schema, C extends Schema>(
  ...elements: [A, B, C]
): TupleSchema<[A, B, C]>;
export function tuple<
  A extends Schema,
  B extends Schema,
  C extends Schema,
  D extends Schema
>(...elements: [A, B, C, D]): TupleSchema<[A, B, C, D]>;
export function tuple<
  A extends Schema,
  B extends Schema,
  C extends Schema,
  D extends Schema,
  E extends Schema
>(...elements: [A, B, C, D, E]): TupleSchema<[A, B, C, D, E]>;
export function tuple<S extends Schema[]>(...elements: S) {
  return new TupleSchema(elements);
}

/**
 * Schema instance representing a "record" (i.e., a JavaScript object) with
 * properties matching the schemas in the `properties` property.  Note that all
 * properties are considered nullable!
 */
class RecordSchemaC<P extends Properties> extends Schema<
  { [K in keyof P]?: TypeOf<P[K]> }
> {
  constructor(public readonly properties: P) {
    super();
  }

  protected readonly _default = function (this: RecordSchemaC<any>) {
    const out: any = {};
    for (const key in this.properties) {
      out[key] = this.properties[key].default();
    }
    return out;
  };

  protected _decode(v: unknown, context: Context): Decoded<this["T"]> {
    if (typeof v !== "object" || v === null) {
      return Failure(Error(v, context, "not an object"));
    }

    const out: any = { ...v };
    const errors: Error<unknown>[] = [];

    for (const key in this.properties) {
      const value = (v as any)[key];

      if (value === undefined) {
        // Empty values are always allowed
        continue;
      }
      if (value === null) {
        // Null values are allowed too, but converted to `undefined`.
        delete out[key];
        continue;
      }

      const decoded = this.properties[key].decode(
        value,
        context.concat([{ index: key, schema: this.properties[key] }])
      );

      if (isOk(decoded)) {
        out[key] = decoded.value;
      } else {
        errors.push(...decoded.errors);
      }
    }

    return errors.length === 0 ? Ok(out) : Failure(errors);
  }

  readonly is = isFromDecode(this._decode.bind(this));
}

/**
 * A dictionary of schemas.
 */
export type Properties = { [k: string]: Schema };

/**
 * A schema representing a "record" (i.e., a JavaScript object) with properties
 * matching the schemas in the `properties` argument.  Note that all properties
 * are considered nullable!
 */
export interface RecordSchema<P extends Properties> extends RecordSchemaC<P> {}

/**
 * Creates a schema representing a "record" (i.e., a JavaScript object) with
 * properties matching the schemas in the `properties` argument.  Note that all
 * properties are considered nullable!
 */
export const record = <P extends Properties>(properties: P): RecordSchema<P> =>
  new RecordSchemaC(properties);

/**
 * Determines if the Schema is a RecordSchema.
 */
export const isRecordSchema = (s: Schema): s is RecordSchema<any> =>
  s instanceof RecordSchemaC;

////////////////////////////////////////////////////////////////////////////////

type Result<T, E> = Ok<T> | Failure<E>;

export type Validated<T> = Result<T, T>;
export type Decoded<T> = Result<T, unknown>;

type Validator<T> = (v: T) => Validated<T>;

type Default<T> = (T | undefined) | (() => T | undefined);

const IsOk = Symbol("IsOk");

export interface Ok<T> {
  readonly [IsOk]: true;
  readonly value: T;
}

export interface Failure<T> {
  readonly [IsOk]: false;
  readonly errors: ReadonlyArray<Error<T>>;
}

interface Error<T> {
  readonly value: T;
  readonly context: Context;
  readonly message: string;
}

type Context = ReadonlyArray<{
  readonly index: string | number | null;
  readonly schema: Schema;
}>;

function Ok<T>(value: T): Ok<T> {
  return { [IsOk]: true, value };
}

function Failure<T>(errors: Error<T> | Error<T>[]): Failure<T> {
  return {
    [IsOk]: false,
    errors: Array.isArray(errors) ? errors : [errors],
  };
}

function Error<T>(value: T, context: Context, message: string): Error<T> {
  return { value, context, message };
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
