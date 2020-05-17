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
 * Extracts the TypeScript type represented by the Schema S.
 */
export type TypeOf<S extends Schema> = S["T"];

/**
 * Runtime representation of a Data type, plus validation logic that doesn't
 * [necessarily] belong in the type layer.
 */
export abstract class Schema<T extends Data = Data> {
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
  protected readonly _default: Default<T> = null;

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
      context = [{ key: "", schema: this }];
    }
    return this._decode(v, context);
  }

  /**
   * The default value for this field.
   */
  public default(): T | null {
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

/**
 * An empty value.
 */
type Empty = undefined | null;

const isEmpty = (v: unknown): v is Empty => v === null || v === undefined;

const decodeFromIs = <T>(is: (v: unknown) => v is T, type: string) => (
  v: unknown,
  context: Context
): Decoded<T> => (is(v) ? Ok(v) : Failure(v, context, `not a ${type}`));

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
class ArraySchema<T extends Data> extends Schema<T[]> {
  protected readonly _default = () => [];

  constructor(public readonly elements: Schema<T>) {
    super();
  }

  protected _decode(v: unknown, context: Context) {
    if (!Array.isArray(v)) {
      return Failure(v, context, "not an array");
    }

    const out: T[] = [...v];
    const errors: Error<unknown>[] = [];

    for (let i = 0; i < v.length; i++) {
      const decoded = this.elements.decode(
        v[i],
        context.concat([{ key: String(i), schema: this.elements }])
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

  readonly is = isFromDecode(this._decode.bind(this));
}

/**
 * Creates a schema representing an array of arbitrary length with elements
 * matching the schema given in the `elements` argument.
 */
export const array = <T extends Data>(elements: Schema<T>) =>
  new ArraySchema(elements);

/**
 * Schema instance representing a "record" (i.e., a JavaScript object) with
 * properties matching the schemas in the `properties` property.  Note that all
 * properties are considered nullable!
 */
class RecordSchemaC<P extends Properties> extends Schema<
  { [K in keyof P]: TypeOf<P[K]> | Empty }
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
      return Failure(v, context, "not an object");
    }

    const out: any = { ...v };
    const errors: Error<unknown>[] = [];

    for (const key in this.properties) {
      const value = (v as any)[key];

      if (isEmpty(value)) {
        // Empty values are always allowed.
        continue;
      }

      const decoded = this.properties[key].decode(
        value,
        context.concat([{ key, schema: this.properties[key] }])
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

  readonly is = isFromDecode(this._decode.bind(this));
}

/**
 * A dictionary of schemas.
 */
export type Properties = { [k: string]: Schema<any> };

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

////////////////////////////////////////////////////////////////////////////////

type Result<T, E> = Ok<T> | Failure<E>;

type Validated<T> = Result<T, T>;
type Decoded<T> = Result<T, unknown>;

type Validator<T> = (v: T) => Validated<T>;

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
  readonly schema: Schema<any>;
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
