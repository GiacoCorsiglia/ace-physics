import { isObject, isSuccess } from "@/helpers/backend";
import * as t from "@/schema/types";
import { expressionAttributes, updateExpression } from "./helpers";
import { KeyGSI1, KeyPrimary, Keys } from "./keys";

export const codec = <
  T extends string,
  S extends t.Type,
  KP extends (item: t.Infer<S>) => KeyPrimary,
  KGSI1 extends ((item: t.Infer<S>) => KeyGSI1) | undefined
>(
  type: T,
  schema: S,
  keysPrimary: KP,
  keysGS1I?: KGSI1
) => {
  type Item = t.Infer<S>;

  const decode = (item: unknown) => {
    // Remove database-only properties.
    if (isObject(item)) {
      delete (item as any).type;
      for (const k in Keys) {
        delete (item as any)[k];
      }
    }

    return t.decode(schema, item);
  };

  return {
    /** Compute database keys for given item. */
    keys: {
      primary: keysPrimary,
      GSI1: keysGS1I as undefined extends KGSI1
        ? undefined
        : NonNullable<KGSI1>,
    },

    /** The "type" attribute in the database. */
    type,

    /**
     * Generate:
     * { ExpressionAttributeNames, ExpressionAttributeValues  }
     */
    expressionAttributes: expressionAttributes as (
      item: Partial<Item>
    ) => ReturnType<typeof expressionAttributes>,

    /**
     * Generate:
     * { UpdateExpression, ExpressionAttributeNames, ExpressionAttributeValues }
     */
    updateExpression: updateExpression as (
      item: Partial<Item>
    ) => ReturnType<typeof updateExpression>,

    /** Converts item from application object for saving in the database. */
    encode(item: Item) {
      if (process.env.NODE_ENV === "development") {
        for (const p of ["type", ...Object.values(Keys)]) {
          if (p in (item as any)) {
            const json = JSON.stringify(item);
            throw new Error(
              `Property "${p}" conflicts with database-only property:\n${json}`
            );
          }
        }
      }

      const clone = {
        ...item,
        type,
        ...keysPrimary(item),
        ...(keysGS1I && keysGS1I(item)),
      };

      return clone;
    },

    /** Convert item from the database for use in the application. */
    decode,

    decodeList(items: unknown[] | undefined) {
      return items
        ? items
            .map(decode)
            .filter(isSuccess)
            .map((i) => i.value)
        : [];
    },
  } as const;
};
