export type Data =
  | null
  | boolean
  | string
  | number
  | Data[]
  | { [key: string]: Data };

export interface Field<Value extends Data> {
  readonly required: boolean;
  validate: Validator<Value>;
  default(): Value;
}

export type ExtractFieldValue<F> = F extends Field<infer Value> ? Value : never;

export function Field<Value extends Data>({
  validators = [],
  required = false,
  defaultValue = null,
}: {
  validators?: Validator<Value>[];
  required?: boolean;
  defaultValue?: DefaultValue<Value>;
} = {}): Field<Value> {
  return {
    required,
    default() {
      if (typeof defaultValue === "function") {
        return (defaultValue as any)();
      }
      return defaultValue;
    },
    validate(value) {
      return validators.reduce(
        (validated: Validated<Value>, validator) =>
          isInvalid(validated) ? validated : validator(validated.value),
        Valid(value)
      );
    },
  };
}

// UTILITIES

type DefaultValue<T> = T | (() => T);

type Validated<Value extends Data> = Valid<Value> | Invalid<Value>;

type Validator<Value extends Data> = (value: Value) => Validated<Value>;

const IsValid = Symbol();

interface Valid<Value extends Data> {
  [IsValid]: true;
  value: Value;
}

interface Invalid<Value extends Data> {
  [IsValid]: false;
  value: Value;
  message: string;
}

export function Valid<Value extends Data>(value: Value): Valid<Value> {
  return { [IsValid]: true, value };
}

export function Invalid<Value extends Data>(
  value: Value,
  message: string = ""
): Invalid<Value> {
  return { [IsValid]: false, value, message };
}

export function isValid<Value extends Data>(
  validated: Validated<Value>
): validated is Valid<Value> {
  return validated[IsValid];
}

export function isInvalid<Value extends Data>(
  validated: Validated<Value>
): validated is Invalid<Value> {
  return !validated[IsValid];
}
