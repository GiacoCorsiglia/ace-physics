import * as t from "schema/types";

const constant = <T>(c: T) => () => c;

/**
 * A Field for a boolean (yes/no or true/false) value.
 */
export interface BooleanField {
  readonly kind: "boolean";
  readonly type: t.BooleanType;
}

/**
 * Creates a Field for a boolean (yes/no or true/false) value.
 *
 * **Prefer to use a `ChooseOneField`** (or possible a `CasesField`) unless
 * you're absolutely positive that we'll never add another option and that we'll
 * never want to collect an "other" response.  Another benefit of
 * `ChooseOneField` is that the choices are named, so we don't have to guess at
 * what `true` and `false` mean contextually.
 */
export const boolean = constant<BooleanField>({
  kind: "boolean",
  type: t.boolean(),
});

/**
 * A Field for a numerical value (integer or decimal).
 */
export interface NumberField {
  readonly kind: "number";
  readonly type: t.NumberType;
}

/**
 * Creates a Field for a numerical value.
 *
 * JavaScript doesn't distinguish integer and decimal values, so we don't
 * either.  You can, however, choose between the `Decimal` and `Integer` inputs
 * when including the field on a tutorial page.
 */
export const number = constant<NumberField>({
  kind: "number",
  type: t.number(),
});

/**
 * A Field for a string value.
 */
export interface StringField {
  readonly kind: "string";
  readonly type: t.StringType;
}

/**
 * Creates a Field for a string value (any arbitrary text input).
 */
export const string = constant<StringField>({
  kind: "string",
  type: t.string(),
});
