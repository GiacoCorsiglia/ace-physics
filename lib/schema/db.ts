import { Event } from "./events";
import * as t from "./types";

// Learner.

export type Learner = t.Infer<typeof Learner>;
export const Learner = t.object({
  learnerId: t.string(),

  institution: t.string(),
  course: t.string(),
  createdAt: t.string(),
});

// Tutorial.

export type Tutorial = t.Infer<typeof Tutorial>;
export const Tutorial = t.object({
  learnerId: t.string(),
  tutorial: t.string(),
  edition: t.string(),
  createdAt: t.string(),
  updatedAt: t.string(),
  version: t.number(),
  state: t.any(),
  events: t.array(Event),
});
