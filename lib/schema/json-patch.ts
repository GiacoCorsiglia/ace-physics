/**
 * Types for JSON patches: http://jsonpatch.com
 */
import * as t from "./types";

type JsonValue =
  | null
  | boolean
  | number
  | string
  | JsonValue[]
  | Partial<{ [key: string]: JsonValue }>;

const JsonValue = t.any<JsonValue>();

const PatchAdd = t.exact({
  op: t.literal("add"),
  path: t.string(),
  value: JsonValue,
});

const PatchRemove = t.exact({
  op: t.literal("remove"),
  path: t.string(),
});

const PatchReplace = t.exact({
  op: t.literal("replace"),
  path: t.string(),
  value: JsonValue,
});

const PatchCopy = t.exact({
  op: t.literal("copy"),
  path: t.string(),
  from: t.string(),
});

const PatchMove = t.exact({
  op: t.literal("move"),
  path: t.string(),
  from: t.string(),
});

const PatchTest = t.exact({
  op: t.literal("test"),
  path: t.string(),
  value: JsonValue,
});

export const Patch = t.union(
  PatchAdd,
  PatchRemove,
  PatchReplace,
  PatchCopy,
  PatchMove,
  PatchTest,
);
