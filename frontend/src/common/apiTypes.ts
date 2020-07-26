import * as s from "./schema";

// Learners.

export type Learner = s.TypeOf<typeof Learner>;
export const Learner = s.completeRecord({
  learnerId: s.string(),
  entryId: s.string(),
  institutionId: s.string(),
  courseId: s.string(),
  createdAt: s.string(),
});

export type GetLearnerRequest = s.TypeOf<typeof GetLearnerRequest>;
export const GetLearnerRequest = s.completeRecord({
  learnerId: s.string(),
});

export type CreateLearnerRequest = s.TypeOf<typeof CreateLearnerRequest>;
export const CreateLearnerRequest = s.completeRecord({});

export type CreateLearnersRequest = s.TypeOf<typeof CreateLearnersRequest>;
export const CreateLearnersRequest = s.completeRecord({
  institutionId: s.string(),
  courseId: s.string(),
  number: s.number(),
});

// Tutorials.

export type GetTutorialRequest = s.TypeOf<typeof GetTutorialRequest>;
export const GetTutorialRequest = s.completeRecord({
  learnerId: s.string(),
  tutorial: s.string(),
});

export type UpdateTutorialRequest = s.TypeOf<typeof UpdateTutorialRequest>;
export const UpdateTutorialRequest = s.completeRecord({
  learnerId: s.string(),
  tutorial: s.string(),
  tutorialData: s.any(),
});
