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

export type User = t.Infer<typeof User>;
export const User = t.exact({
  ...db.User.properties,
  /**
   * A list of courses this user is associated with.
   */
  courses: t.array(Course),
  /**
   * Indicates whether the user has ever logged in themselves.  Users can be
   * created before login because admins can assign a role to any email address.
   */
  isEmailVerified: t.boolean(),
});
