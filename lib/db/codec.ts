import { isObject } from "@/helpers/server";
import { isSuccess } from "@/result";
import * as t from "@/schema/types";
import { Decoded } from "@/schema/types/decode";
import { promisify } from "node:util";
import * as zlib from "node:zlib";
import { expressionAttributes, updateExpression } from "./helpers";
import { KeyGSI1, KeyPrimary, Keys } from "./table";

const brotliCompress = promisify(zlib.brotliCompress);
const brotliDecompress = promisify(zlib.brotliDecompress);

export const codec = <
  T extends string,
  S extends t.Type,
  KP extends (item: t.Infer<S>) => KeyPrimary,
  KGSI1 extends ((item: t.Infer<S>) => KeyGSI1) | undefined,
  CompressedKeys extends (keyof t.Infer<S>)[] | undefined,
>(
  type: T,
  schema: S,
  keysPrimary: KP,
  keysGS1I?: KGSI1,
  compressedKeys?: CompressedKeys,
) => {
  type Item = t.Infer<S>;
  type Encoded = Item & Partial<KeyPrimary> & Partial<KeyGSI1> & { type?: T };

  // Encoding and decoding are async when we introduce compression.
  type MaybePromise<T> = undefined extends CompressedKeys ? T : Promise<T>;

  const decode = (item: unknown): MaybePromise<Decoded<Item>> => {
    if (isObject(item)) {
      // Remove database-only properties.
      delete (item as any).type;
      for (const k in Keys) {
        delete (item as any)[k];
      }

      // Decompress if necessary.
      if (compressedKeys) {
        return Promise.all(
          compressedKeys.map(async (key) => {
            const value = (item as any)[key];

            // Check if the value is compressed and decompress it. We assume
            // binary attributes are compressed.  The DynamoDB document client
            // seems to return a `Uint8Array` for Binary attributes, but I
            // figure it's best to just check more generally.
            if (ArrayBuffer.isView(value) || value instanceof Buffer) {
              const decompressed = await brotliDecompress(value as any);
              const string = decompressed.toString("utf-8");
              // We assume the compressed value is stringified JSON.
              const parsed = JSON.parse(string);
              (item as any)[key] = parsed;
            }
          }),
        ).then(() => {
          // `item` will have been mutated once all the decompression resolves.
          return t.decode(schema, item);
        }) satisfies Promise<Decoded<Item>> as MaybePromise<Decoded<Item>>;
      }
    }

    return t.decode(schema, item) satisfies Decoded<Item> as MaybePromise<
      Decoded<Item>
    >;
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
      item: Partial<Item>,
    ) => ReturnType<typeof expressionAttributes>,

    /**
     * Generate:
     * { UpdateExpression, ExpressionAttributeNames, ExpressionAttributeValues }
     */
    updateExpression: updateExpression as (
      item: Partial<Item>,
    ) => ReturnType<typeof updateExpression>,

    /** Converts item from application object for saving in the database. */
    encode(item: Item, withKeys: boolean = true): MaybePromise<Encoded> {
      if (process.env.NODE_ENV === "development") {
        for (const p of ["type", ...Object.values(Keys)]) {
          if (p in (item as any)) {
            const json = JSON.stringify(item);
            throw new Error(
              `Property "${p}" conflicts with database-only property:\n${json}`,
            );
          }
        }
      }

      const clone = {
        ...item,
        type,
        ...(withKeys && keysPrimary(item)),
        ...(withKeys && keysGS1I && keysGS1I(item)),
      };

      // Compress the values in the keys we're supposed to compress.
      if (compressedKeys) {
        return Promise.all(
          compressedKeys.map(async (key) => {
            if (key in clone) {
              const json = JSON.stringify(clone[key]);
              const compressed = await brotliCompress(json);
              // The DynamoDB DocumentClient stores Buffers as Binary data.
              clone[key] = compressed;
            }
          }),
        ).then(() => {
          // We'll have mutated `clone` once all the compression resolves.
          return clone;
        }) satisfies Promise<Encoded>;
      }

      return clone satisfies Encoded;
    },

    /** Convert item from the database for use in the application. */
    decode,

    decodeList(items: unknown[] | undefined): MaybePromise<Item[]> {
      if (!items || !items.length) {
        return (compressedKeys ? Promise.resolve([]) : []) as any;
      }

      const list: Item[] = [];

      if (compressedKeys) {
        return Promise.all(
          items.map(async (item) => {
            const decoded = await decode(item);
            if (isSuccess(decoded)) {
              list.push(decoded.value);
            }
          }),
        ).then(() => list) satisfies Promise<Item[]> as MaybePromise<Item[]>;
      }

      for (const item of items) {
        const decoded = decode(item) as Decoded<Item>;
        if (isSuccess(decoded)) {
          list.push(decoded.value);
        }
      }

      return list satisfies Item[] as MaybePromise<Item[]>;
    },
  } as const;
};
