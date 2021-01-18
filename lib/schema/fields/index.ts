import { ArrayField } from "./array";
import { CasesField } from "./cases";
import { Choice, Choices, ChooseAllField, ChooseOneField } from "./choose";
import { ObjectField, Properties } from "./object";
import { BooleanField, NumberField, StringField } from "./primitives";
import { TupleField } from "./tuple";

/**
 * A Field is a slot for user input.  The different kinds of Field represent
 * different structures for storing user input.
 *
 * All responses (i.e., object properties and array elements) are technically
 * optional, since (a) fields may represent the state of an incomplete form; (b)
 * we cannot perfectly control whether or not users leave field blank; (c) new
 * fields may be added to forms after some users complete them.
 */
export type Field =
  | ArrayField<any>
  | BooleanField
  | CasesField<readonly [string, ...string[]]>
  | ChooseAllField<Choices, StringField>
  | ChooseOneField<Choices, StringField>
  | NumberField
  | ObjectField<any>
  | StringField
  | TupleField<readonly any[]>;

export { array } from "./array";
export { cases } from "./cases";
export { chooseAll, chooseOne } from "./choose";
export { object } from "./object";
export { boolean, number, string } from "./primitives";
export { tuple } from "./tuple";
export type {
  ArrayField,
  BooleanField,
  CasesField,
  Choice,
  Choices,
  ChooseAllField,
  ChooseOneField,
  NumberField,
  ObjectField,
  Properties,
  StringField,
  TupleField,
};
