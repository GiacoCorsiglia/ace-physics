import type { User as NextAuthUser } from "next-auth";
import { Event } from "./events";
import * as t from "./types";

// Users.
// NOTE: This schema doesn't really matter, since it's managed by NextAuth; but
// it's useful to have so we can specify api types.

export type User = t.Infer<typeof User>;
export const User = t.exact({
  id: t.string(),
  email: t.optional(t.nullable(t.string())),
  role: t.optional(
    t.union(t.literal("student"), t.literal("instructor"), t.literal("admin")),
  ),
});

// Enforce that the schema defined above matches NextAuth's User type.
type _isAssignable<T, U extends T> = void;
type _testUserType =
  | _isAssignable<NextAuthUser, User>
  | _isAssignable<User, NextAuthUser>;

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

export const TUTORIAL_STATE_NO_COURSE = "NONE";

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
