import { Event } from "./events";
import * as t from "./types";

// Courses.

export type Course = t.Infer<typeof Course>;
export const Course = t.exact({
  id: t.string(),
  createdAt: t.string(),
  updatedAt: t.string(),
  displayName: t.string(),
  displayMessage: t.optional(t.string()),
  visibleTutorials: t.optional(t.array(t.string())),
});

export type CourseUser = t.Infer<typeof CourseUser>;
export const CourseUser = t.exact({
  courseId: t.string(),
  userEmail: t.string(),
  createdAt: t.string(),
  role: t.union(t.literal("student"), t.literal("instructor")),
});

// TutorialState.

export type TutorialState = t.Infer<typeof TutorialState>;
export const TutorialState = t.exact({
  courseId: t.string(),
  userEmail: t.string(),
  tutorialId: t.string(),
  createdAt: t.string(),
  updatedAt: t.string(),
  version: t.number(),
  state: t.any(),
  events: t.array(Event),
});
