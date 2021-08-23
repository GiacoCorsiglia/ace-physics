import * as t from "@/schema/types";

type CasesToUnion<Cs extends readonly string[]> = t.UnionType<
  {
    [I in keyof Cs]: Cs[I] extends string ? t.LiteralType<Cs[I]> : Cs[I];
  }
>;

/**
 * A Field for one of a set of literal string options.  Essentially an "enum."
 */
export interface CasesField<Cs extends readonly string[]> {
  readonly kind: "cases";
  readonly cases: Cs;
  readonly type: CasesToUnion<Cs>;
}

/**
 * Creates a Field for one of a set of literal string options.
 *
 * **Prefer to use a `ChooseOneField` instead,** because it supports collecting
 * an "other" choice.  A `CasesField` will not work with any of the inputs like
 * `Choice`, `Toggle`, or `Dropdown`.  Use a `CasesField` for storing some sort of
 * user interface state, such as which step a student has gotten to when
 * clicking through a visualization.
 */
export const cases = <C extends string, Cs extends readonly [C, ...C[]]>(
  ...cases: Cs
): CasesField<Cs> => ({
  kind: "cases",
  cases,
  type: t.union(...(cases.map(t.literal) as any)) as CasesToUnion<Cs>,
});
