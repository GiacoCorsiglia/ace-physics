import { Learner, Tutorial } from "./db";
import { Event } from "./events";
import * as t from "./types";

// Get Learner.

export type GetLearnerRequest = t.Infer<typeof GetLearnerRequest>;
export const GetLearnerRequest = t.object({
  learnerId: t.string(),
});

export type GetLearnerResponse = t.Infer<typeof GetLearnerResponse>;
export const GetLearnerResponse = Learner;

// Create Learner.

export type CreateLearnerRequest = t.Infer<typeof CreateLearnerRequest>;
export const CreateLearnerRequest = t.optional(t.object({}));

export type CreateLearnerResponse = t.Infer<typeof CreateLearnerResponse>;
export const CreateLearnerResponse = Learner;

// Create Learners.

export type CreateLearnersRequest = t.Infer<typeof CreateLearnersRequest>;
export const CreateLearnersRequest = t.object({
  institution: t.string(),
  course: t.string(),
  number: t.number(),
});

export type CreateLearnersResponse = t.Infer<typeof CreateLearnersResponse>;
export const CreateLearnersResponse = t.object({
  learners: t.array(Learner),
});

// Get Tutorial.

export type GetTutorialRequest = t.Infer<typeof GetTutorialRequest>;
export const GetTutorialRequest = t.object({
  learnerId: t.string(),
  tutorial: t.string(),
  edition: t.string(),
});

export type GetTutorialResponse = t.Infer<typeof GetTutorialResponse>;
export const GetTutorialResponse = Tutorial;

// Update Tutorial

export type UpdateTutorialRequest = t.Infer<typeof UpdateTutorialRequest>;
export const UpdateTutorialRequest = t.object({
  learnerId: t.string(),
  tutorial: t.string(),
  edition: t.string(),
  version: t.number(),
  state: t.any(),
  events: t.array(Event),
});

export type UpdateTutorialResponse = t.Infer<typeof UpdateTutorialResponse>;
export const UpdateTutorialResponse = t.object({
  ok: t.literal(true),
  updated: t.boolean(),
});
