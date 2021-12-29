import * as schema from "@/schema/api";
import { Event } from "@/schema/events";
import * as t from "@/schema/types";
import { spec } from "./spec";

const join = (...s: string[]) => s.join("/");

const Empty = t.exact({});
const Ok = t.exact({ ok: t.literal(true) });

export const TutorialState = spec({
  url: "/tutorial-state?tutorialId={tutorialId}&courseId={courseId}",
  Query: t.exact({
    tutorialId: t.string(),
    courseId: t.string(), // TODO
  }),
  GET: {
    Response: schema.TutorialState,
  },
  PUT: {
    Request: t.exact({
      courseId: t.string(),
      userEmail: t.string(),
      tutorialId: t.string(),
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
  url: join(Courses.url, "{courseId}"),
  Query: t.exact({
    courseId: t.string(),
  }),
  GET: {
    Response: schema.Course,
  },
  PUT: {
    Request: t.exact({
      displayName: t.string(),
      visibleTutorials: t.optional(t.array(t.string())),
    }),
    Response: schema.Course,
  },
  POST: null,
  DELETE: null,
});

export const CourseInstructors = spec({
  url: join(Course.url, "instructors"),
  Query: Course.Query,
  PUT: {
    Request: t.exact({
      emailsList: t.string(),
    }),
    Response: Ok,
  },
  GET: null,
  POST: null,
  DELETE: null,
});

export const CourseStudents = spec({
  url: join(Course.url, "students"),
  Query: Course.Query,
  PUT: {
    Request: t.exact({
      emailsList: t.string(),
    }),
    Response: Ok,
  },
  GET: null,
  POST: null,
  DELETE: null,
});

export const CourseTutorialStates = spec({
  url: join(Course.url, "tutorial-states?tutorialId={tutorialId}"),
  Query: t.exact({
    courseId: t.string(),
    tutorialId: t.string(),
  }),
  GET: {
    Response: t.any(), // It's a CSV
  },
  PUT: null,
  POST: null,
  DELETE: null,
});

export const User = spec({
  url: "/users/{userEmail}",
  Query: t.exact({
    userEmail: t.string(),
  }),
  PUT: {
    Request: t.exact({
      role: t.union(t.literal("instructor"), t.literal("admin")),
    }),
    Response: Ok,
  },
  DELETE: null,
  GET: null,
  POST: null,
});
