import { mapDict } from "./util";

interface UnboundSchema {
  [key: string]: Field<any>;
}

export interface Schema {
  [key: string]: BoundField<any>;
}

export interface Field<ValueType> {
  readonly required: boolean;
  validate: Validator<ValueType>;
  default(): ValueType;
}

type ExtractFieldValueType<F> = F extends Field<infer ValueType>
  ? ValueType
  : never;

interface BoundField<ValueType> extends Field<ValueType> {
  schema: Schema;
  schemaKey: keyof Schema;
}

function bindSchema<S extends UnboundSchema>(
  unboundSchema: UnboundSchema
): {
  [K in keyof S]: BoundField<ExtractFieldValueType<S[K]>>;
} {
  return mapDict(unboundSchema, (field, schemaKey, _, schema) => ({
    ...field,
    schema,
    schemaKey
  })) as any;
}

export function Field<ValueType>(
  {
    validators = [],
    required = false,
    defaultValue = undefined
  }: {
    validators: Validator<ValueType>[];
    required: boolean;
    defaultValue?: DefaultValue<ValueType>;
  } = {
    validators: [],
    required: false
  }
): Field<ValueType> {
  return {
    required,
    default() {
      if (typeof defaultValue === "function") {
        return (<any>defaultValue)();
      }
      return defaultValue;
    },
    validate(value) {
      return validators.reduce(
        (validated: Validated<ValueType>, validator) =>
          isInvalid(validated) ? validated : validator(validated.value),
        Valid(value)
      );
    }
  };
}

// UTILITIES

type DefaultValue<T> = T | (() => T);

type Validated<T> = Valid<T> | Invalid<T>;

type Validator<ValueType> = (value: ValueType) => Validated<ValueType>;

const IsValid = Symbol();

interface Valid<T> {
  [IsValid]: true;
  value: T;
}

interface Invalid<T> {
  [IsValid]: false;
  value: T;
  message: string;
}

function Valid<T>(value: T): Valid<T> {
  return { [IsValid]: true, value };
}

function Invalid<T>(value: T, message: string = ""): Invalid<T> {
  return { [IsValid]: false, value, message };
}

export function isValid<T>(validated: Validated<T>): validated is Valid<T> {
  return validated[IsValid];
}

export function isInvalid<T>(validated: Validated<T>): validated is Invalid<T> {
  return !validated[IsValid];
}
