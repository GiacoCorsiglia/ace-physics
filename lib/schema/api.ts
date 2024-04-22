import * as db from "./db";
import * as t from "./types";

export type Course = t.Infer<typeof Course>;
export const Course = t.exact({
  ...db.Course.properties,
  /** The current user's role in this course. */
  userRole: db.CourseUser.properties.role,
});

export type CourseInstructor = t.Infer<typeof CourseInstructor>;
export const CourseInstructor = t.exact({
  ...db.CourseUser.properties,
  role: t.literal("instructor"),
});
export const courseUserIsInstructor = (
  user: db.CourseUser,
): user is CourseInstructor => user.role === "instructor";

export type CourseStudent = t.Infer<typeof CourseStudent>;
export const CourseStudent = t.exact({
  ...db.CourseUser.properties,
  role: t.literal("student"),
});
export const courseUserIsStudent = (
  user: db.CourseUser,
): user is CourseStudent => user.role === "student";

export type TutorialState = t.Infer<typeof TutorialState>;
export const TutorialState = db.TutorialState;
