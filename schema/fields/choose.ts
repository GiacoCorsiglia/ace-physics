import * as t from "schema/types";
import { NumberField, string, StringField } from "./primitives";

type ChoicesToUnion<Cs extends readonly string[]> = t.UnionType<
  {
    [I in keyof Cs]: Cs[I] extends string ? t.LiteralType<Cs[I]> : Cs[I];
  }
>;

/**
 * A Field for a **multiple-choice single-response** question, plus an "other"
 * option, stored in a object.
 */
export interface ChooseOneField<
  Cs extends readonly string[],
  O extends StringField | NumberField = StringField
> {
  readonly kind: "chooseOne";
  readonly choices: Cs;
  readonly other: O;
  readonly type: t.ObjectType<{
    selected: t.OptionalType<ChoicesToUnion<Cs>>;
    other: t.OptionalType<O["type"]>;
  }>;
}

/**
 * Creates a Field for a **multiple-choice single-response** question (e.g.,
 * "Choose ONE answer"), plus an "other" option.
 *
 * The strings representing the possible choices are given by the `choices`
 * argument.  These strings are internal; the display of the choices can be
 * customized in the user interface.  **Don't edit the names of choices once a
 * tutorial is live.**  (But it's fine to add more.)
 *
 * The Field also stores an "other" option, which defaults to a `StringField`,
 * but can be made a `NumberField` via the `other` argument.
 */
export const chooseOne: {
  <C extends string, Cs extends readonly [C, ...C[]]>(
    choices: Cs
  ): ChooseOneField<Cs, StringField>;
  <
    C extends string,
    Cs extends [C, ...C[]],
    O extends StringField | NumberField
  >(
    choices: Cs,
    other: O
  ): ChooseOneField<Cs, O>;
} = <C extends string, Cs extends [C, ...C[]]>(
  choices: Cs,
  other: any = string()
) => ({
  kind: "chooseOne" as const,
  choices,
  other,
  type: t.asExact(
    t.partial({
      selected: t.union(
        ...(choices.map(t.literal) as any)
      ) as ChoicesToUnion<Cs>,
      other: other.type,
    })
  ),
});

/**
 * A Field for a **multiple-choice multiple-response** question, plus an "other"
 * option, stored in a object.
 */
export interface ChooseAllField<
  Cs extends readonly string[],
  O extends StringField | NumberField = StringField
> {
  readonly kind: "chooseAll";
  readonly choices: Cs;
  readonly other: O;
  readonly type: t.ObjectType<{
    selected: t.OptionalType<t.ArrayType<ChoicesToUnion<Cs>>>;
    other: t.OptionalType<O["type"]>;
  }>;
}

/**
 * Creates a Field for a **multiple-choice multiple-response** question (e.g.,
 * "Choose ALL that apply"), plus an "other" option.
 *
 * The strings representing the possible choices are given by the `choices`
 * argument.  These strings are internal; the display of the choices can be
 * customized in the user interface.  **Don't edit the names of choices once a
 * tutorial is live.**  (But it's fine to add more.)
 *
 * The Field also stores an "other" option, which defaults to a `StringField`,
 * but can be made a `NumberField` via the `other` argument.
 */
export const chooseAll: {
  <C extends string, Cs extends readonly [C, ...C[]]>(
    choices: Cs
  ): ChooseAllField<Cs, StringField>;
  <
    C extends string,
    Cs extends [C, ...C[]],
    O extends StringField | NumberField
  >(
    choices: Cs,
    other: O
  ): ChooseAllField<Cs, O>;
} = <C extends string, Cs extends [C, ...C[]]>(
  choices: Cs,
  other: any = string()
) => ({
  kind: "chooseAll" as const,
  choices,
  other,
  type: t.asExact(
    t.partial({
      selected: t.array(
        t.union(...(choices.map(t.literal) as any)) as ChoicesToUnion<Cs>
      ),
      other: other.type,
    })
  ),
});
