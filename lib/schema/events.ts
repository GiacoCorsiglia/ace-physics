import { Patch } from "./json-patch";
import * as t from "./types";

const EventBase = {
  timestamp: t.string(),
};

const FieldUpdated = t.exact({
  kind: t.literal("field.updated"),
  patch: Patch,
  ...EventBase,
});

const FieldRevealed = t.exact({
  kind: t.literal("field.revealed"),
  path: t.string(),
  ...EventBase,
});

const HintRevealed = t.exact({
  kind: t.literal("hint.revealed"),
  hint: t.string(),
  ...EventBase,
});

const SectionRevealed = t.exact({
  kind: t.literal("section.revealed"),
  section: t.string(),
  ...EventBase,
});

const SectionCompleted = t.exact({
  kind: t.literal("section.completed"),
  section: t.string(),
  ...EventBase,
});

const SectionUncompleted = t.exact({
  kind: t.literal("section.uncompleted"),
  section: t.string(),
  ...EventBase,
});

const SectionCommitted = t.exact({
  kind: t.literal("section.committed"),
  section: t.string(),
  ...EventBase,
});

const PageRevealed = t.exact({
  kind: t.literal("part.revealed"),
  part: t.string(),
  ...EventBase,
});

const PageCompleted = t.exact({
  kind: t.literal("part.completed"),
  part: t.string(),
  ...EventBase,
});

const SessionStarted = t.exact({
  kind: t.literal("session.started"),
  ...EventBase,
});

const SessionEnded = t.exact({
  kind: t.literal("session.ended"),
  ...EventBase,
});

export type Event = t.Infer<typeof Event>;
export const Event = t.union(
  FieldUpdated,
  FieldRevealed,
  HintRevealed,
  SectionRevealed,
  SectionCompleted,
  SectionUncompleted,
  SectionCommitted,
  PageRevealed,
  PageCompleted,
  SessionStarted,
  SessionEnded,
);
