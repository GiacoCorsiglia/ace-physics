import * as s from "./schema";

//
// Index.
//

export type GetIndexRequest = s.TypeOf<typeof GetIndexRequest>;
export const GetIndexRequest = s.undefined_();

export type GetIndexResponse = s.TypeOf<typeof GetIndexResponse>;
export const GetIndexResponse = s.completeRecord({
  ok: s.literal([true] as const),
});

//
// Learners.
//

export type Learner = s.TypeOf<typeof Learner>;
export const Learner = s.completeRecord({
  learnerId: s.string(),

  institution: s.string(),
  course: s.string(),

  createdAt: s.string(),
});

// GetLearner.

export type GetLearnerRequest = s.TypeOf<typeof GetLearnerRequest>;
export const GetLearnerRequest = s.completeRecord({
  learnerId: s.string(),
});

export type GetLearnerResponse = s.TypeOf<typeof GetLearnerResponse>;
export const GetLearnerResponse = Learner;

// CreateLearner.

export type CreateLearnerRequest = s.TypeOf<typeof CreateLearnerRequest>;
export const CreateLearnerRequest = s.undefined_();

export type CreateLearnerResponse = s.TypeOf<typeof CreateLearnerResponse>;
export const CreateLearnerResponse = Learner;

// CreateLearners.

export type CreateLearnersRequest = s.TypeOf<typeof CreateLearnersRequest>;
export const CreateLearnersRequest = s.completeRecord({
  institution: s.string(),
  course: s.string(),
  number: s.number(),
});

export type CreateLearnersResponse = s.TypeOf<typeof CreateLearnersResponse>;
export const CreateLearnersResponse = s.completeRecord({
  learners: s.array(Learner),
});

//
// Tutorials.
//

export type Tutorial = s.TypeOf<typeof Tutorial>;
export const Tutorial = s.completeRecord({
  learnerId: s.string(),

  institution: s.string(),
  course: s.string(),

  createdAt: s.string(),
  updatedAt: s.string(),

  version: s.number(),

  tutorial: s.string(),
  tutorialData: s.any(),
});

// GetTutorial.

export type GetTutorialRequest = s.TypeOf<typeof GetTutorialRequest>;
export const GetTutorialRequest = s.completeRecord({
  learnerId: s.string(),
  tutorial: s.string(),
});

export type GetTutorialResponse = s.TypeOf<typeof GetTutorialResponse>;
export const GetTutorialResponse = Tutorial;

// UpdateTutorial

export type UpdateTutorialRequest = s.TypeOf<typeof UpdateTutorialRequest>;
export const UpdateTutorialRequest = s.completeRecord({
  learnerId: s.string(),
  tutorial: s.string(),
  version: s.number(),
  tutorialData: s.any(),
});

export type UpdateTutorialResponse = s.TypeOf<typeof UpdateTutorialResponse>;
export const UpdateTutorialResponse = s.completeRecord({
  ok: s.literal([true] as const),
  updated: s.boolean(),
});
