import * as schema from "@/schema/api";
import { Event } from "@/schema/events";
import * as t from "@/schema/types";
import { spec } from "./spec";

const join = (...s: string[]) => s.join("/");

const Empty = t.exact({});
const Ok = t.exact({ ok: t.literal(true) });

export const TutorialState = spec({
  url: "/tutorial-state?tutorialId=[tutorialId]&courseId=[courseId]",
  Query: t.exact({
    tutorialId: t.string(),
    courseId: t.string(),
  }),
  GET: {
    Response: schema.TutorialState,
  },
  PUT: {
    Request: t.exact({
      version: t.number(),
      state: t.any(),
      events: t.array(Event),
    }),
    Response: t.object({
      ok: t.literal(true),
      updated: t.boolean(),
    }),
  },
  POST: null,
  DELETE: null,
});

export const Courses = spec({
  url: "/courses",
  Query: Empty,
  GET: {
    Response: t.array(schema.Course),
  },
  POST: {
    Request: t.exact({
      displayName: t.string(),
    }),
    Response: schema.Course,
  },
  PUT: null,
  DELETE: null,
});

export const Course = spec({
  url: join(Courses.url, "[courseId]"),
  Query: t.exact({
    courseId: t.string(),
  }),
  GET: {
    Response: schema.Course,
  },
  PUT: {
    Request: t.exact({
      displayName: t.string(),
      displayMessage: t.optional(t.string()),
      visibleTutorials: t.optional(t.array(t.string())),
    }),
    Response: schema.Course,
  },
  POST: null,
  DELETE: null,
});

export const CourseUsers = spec({
  url: join(Course.url, "users"),
  Query: Course.Query,
  GET: {
    Response: t.exact({
      instructors: t.array(schema.CourseInstructor),
      students: t.array(schema.CourseStudent),
    }),
  },
  PUT: {
    Request: t.exact({
      unhashedInstructorEmails: t.string(),
      unhashedStudentEmails: t.string(),
    }),
    Response: t.exact({
      newInstructors: t.array(schema.CourseInstructor),
      newStudents: t.array(schema.CourseStudent),
      unhashedRejectedEmails: t.array(t.string()),
    }),
  },
  POST: null,
  DELETE: null,
});

export const CourseReports = spec({
  url: join(Course.url, "reports"),
  Query: Course.Query,
  GET: null,
  PUT: null,
  POST: {
    Request: t.exact({
      tutorialId: t.string(),
      unhashedStudentEmails: t.string(),
      locale: t.string(),
      timeZone: t.string(),
      includePretests: t.boolean(),
      includeFeedback: t.boolean(),
    }),
    Response: t.string(), // It's a CSV
  },
  DELETE: null,
});

export const User = spec({
  url: "/users/[hash]",
  Query: t.exact({
    hash: t.string(),
  }),
  GET: {
    Response: schema.User,
  },
  POST: null,
  PUT: {
    Request: t.exact({
      role: schema.User.properties.role.value,
    }),
    Response: schema.User,
  },
  DELETE: null,
});
