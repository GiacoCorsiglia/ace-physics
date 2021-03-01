import * as t from "@/schema/types";
import type { NumberField, StringField } from "./primitives";

export type Choices = readonly string[];
export type Choice<Cs extends Choices> = Cs[number];
export type OtherChoiceField = NumberField | StringField;

type ChoicesToUnion<Cs extends readonly string[]> = t.UnionType<
  {
    [I in keyof Cs]: Cs[I] extends string ? t.LiteralType<Cs[I]> : never;
  }
>;

/**
 * A Field for a **multiple-choice single-response** question, plus an optional
 * "other" option, stored in a object.
 */
export interface ChooseOneField<
  Cs extends Choices,
  O extends OtherChoiceField | undefined
> {
  readonly kind: "chooseOne";
  readonly choices: Cs;
  readonly other: O;
  readonly type: O extends NumberField | StringField
    ? t.ObjectType<{
        selected: t.OptionalType<ChoicesToUnion<Cs>>;
        other: t.OptionalType<O["type"]>;
      }>
    : t.ObjectType<{
        selected: t.OptionalType<ChoicesToUnion<Cs>>;
      }>;
}

/**
 * Creates a Field for a **multiple-choice single-response** question (e.g.,
 * "Choose ONE answer"), plus an optional "other" option.
 *
 * The strings representing the possible choices are given by the `choices`
 * argument.  These strings are internal; the display of the choices can be
 * customized in the user interface.  **Don't edit the names of choices once a
 * tutorial is live.**  (But it's fine to add more.)
 *
 * The Field can also store an "other" option.  By default, this is undefined,
 * meaning the field does not accept an "other" answer, but it can be made a
 * `StringField` or `NumberField` via the `other` argument.
 */
export const chooseOne = <
  C extends string,
  Cs extends readonly [C, ...C[]],
  O extends OtherChoiceField | undefined = undefined
>(
  choices: Cs,
  other?: O
): ChooseOneField<Cs, O> => {
  const selected = t.union(
    ...(choices.map(t.literal) as any)
  ) as ChoicesToUnion<Cs>;

  const type = t.asExact(
    t.partial(other ? { selected, other: other.type } : { selected })
  );

  return {
    kind: "chooseOne" as const,
    choices,
    other: other as O,
    type: type as any,
  };
};

/**
 * A Field for a **multiple-choice multiple-response** question, plus an
 * optional "other" option, stored in a object.
 */
export interface ChooseAllField<
  Cs extends Choices,
  O extends OtherChoiceField | undefined
> {
  readonly kind: "chooseAll";
  readonly choices: Cs;
  readonly other: O;

  readonly type: O extends NumberField | StringField
    ? t.ObjectType<{
        selected: t.OptionalType<t.ArrayType<ChoicesToUnion<Cs>>>;
        other: t.OptionalType<O["type"]>;
      }>
    : t.ObjectType<{
        selected: t.OptionalType<t.ArrayType<ChoicesToUnion<Cs>>>;
      }>;
}

/**
 * Creates a Field for a **multiple-choice multiple-response** question (e.g.,
 * "Choose ALL that apply"), plus an optional "other" option.
 *
 * The strings representing the possible choices are given by the `choices`
 * argument.  These strings are internal; the display of the choices can be
 * customized in the user interface.  **Don't edit the names of choices once a
 * tutorial is live.**  (But it's fine to add more.)
 *
 * The Field can also store an "other" option.  By default, this is undefined,
 * meaning the field does not accept an "other" answer, but it can be made a
 * `StringField` or `NumberField` via the `other` argument.
 */
export const chooseAll = <
  C extends string,
  Cs extends readonly [C, ...C[]],
  O extends OtherChoiceField | undefined = undefined
>(
  choices: Cs,
  other?: O
): ChooseAllField<Cs, O> => {
  const selected = t.array(
    t.union(...(choices.map(t.literal) as any)) as ChoicesToUnion<Cs>
  );

  const type = t.asExact(
    t.partial(other ? { selected, other: other.type } : { selected })
  ) as any;

  return {
    kind: "chooseAll" as const,
    choices,
    other: other as O,
    type,
  };
};
