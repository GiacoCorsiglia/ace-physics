import * as schema from "@/schema/db";
import * as t from "@/schema/types";
import { codec } from "./codec";

const enum Prefix {
  User = "USER",
  Course = "COURSE",
  Instructor = "INSTRUCTOR",
  Student = "STUDENT",
  TutorialState = "TUTORIAL_STATE",
}

const enum DatabaseType {
  User = "USER",
  Course = "COURSE",
  CourseUser = "COURSE_USER",
  TutorialState = "TUTORIAL_STATE",
}

const key = (...parts: string[]) => parts.join("#");

/**
 * NextAuth User.
 */
export const User = codec(
  DatabaseType.User,
  t.any(), // Allow anything since it's from NextAuth.
  (item: { id: string }) => ({
    pk: key(Prefix.User, item.id),
    sk: key(Prefix.User, item.id),
  }),
  (item: { email: string }) => ({
    GSI1PK: key(Prefix.User, item.email),
    GSI1SK: key(Prefix.User, item.email),
  })
);

/**
 * Configuration for a course.
 */
export const Course = codec(
  DatabaseType.Course,
  schema.Course,
  (item: { id: string }) => ({
    pk: key(Prefix.Course, item.id),
    sk: key(Prefix.Course, item.id),
  })
);

/**
 * Associates a user with a course as a student.
 */
export const CourseUser = codec(
  DatabaseType.CourseUser,
  schema.CourseUser,
  (item: { courseId: string; userEmail: string }) => ({
    pk: key(Prefix.User, item.userEmail),
    sk: key(Prefix.Course, item.courseId),
  }),
  (item: { courseId: string; userEmail: string }) => ({
    GSI1PK: key(Prefix.Course, item.courseId),
    GSI1SK: key(Prefix.User, item.userEmail),
  })
);

/**
 * Tutorial state.  Associated with a user, but may or may not be associated
 * with a course as well.
 */
export const TutorialState = codec(
  DatabaseType.TutorialState,
  schema.TutorialState,
  (item: { courseId: string; userEmail: string; tutorialId: string }) => {
    if (item.courseId === schema.TUTORIAL_STATE_NO_COURSE) {
      return {
        pk: key(Prefix.User, item.userEmail),
        sk: key(Prefix.TutorialState, item.tutorialId),
      };
    }

    return {
      pk: key(Prefix.Course, item.courseId),
      sk: key(Prefix.TutorialState, item.tutorialId, item.userEmail),
    };
  }
);
