import * as db from "./db";
import { Event } from "./events";
import * as t from "./types";

////////////////////////////////////////////////////////////////////////////////
// Setup.
////////////////////////////////////////////////////////////////////////////////

const join = (...s: string[]) => s.join("/");

const Empty = t.exact({});
const Ok = t.exact({ ok: t.literal(true) });

interface Response<Type extends t.Type> {
  readonly Response: Type;
}
interface RequestResponse<ReqType extends t.Type, ResType extends t.Type> {
  readonly Request: ReqType;
  readonly Response: ResType;
}

export interface ApiEndpointSchema<
  Query extends t.ObjectType = t.ObjectType,
  GetResponse extends t.Type = t.Type,
  PutRequest extends t.Type = t.Type,
  PutResponse extends t.Type = t.Type,
  PostRequest extends t.Type = t.Type,
  PostResponse extends t.Type = t.Type,
  DeleteResponse extends t.Type = t.Type,
  GET extends null | Response<GetResponse> = any,
  PUT extends null | RequestResponse<PutRequest, PutResponse> = any,
  POST extends null | RequestResponse<PostRequest, PostResponse> = any,
  DELETE extends null | Response<DeleteResponse> = any
> {
  readonly url: string;
  readonly Query: Query;
  readonly GET: GET;
  readonly PUT: PUT;
  readonly POST: POST;
  readonly DELETE: DELETE;
}

const endpoint = <
  Query extends t.ObjectType,
  GetResponse extends t.Type,
  PostRequest extends t.Type,
  PutRequest extends t.Type,
  PutResponse extends t.Type,
  PostResponse extends t.Type,
  DeleteResponse extends t.Type,
  GET extends null | Response<GetResponse>,
  PUT extends null | RequestResponse<PutRequest, PutResponse>,
  POST extends null | RequestResponse<PostRequest, PostResponse>,
  DELETE extends null | Response<DeleteResponse>
>(
  o: ApiEndpointSchema<
    Query,
    GetResponse,
    PutRequest,
    PutResponse,
    PostRequest,
    PostResponse,
    DeleteResponse,
    GET,
    PUT,
    POST,
    DELETE
  >
) => o;

export const makeUrl = <Q extends t.ObjectType>(
  { url }: ApiEndpointSchema<Q>,
  query: t.Infer<Q>
) => {
  for (const k in query) {
    if (Object.prototype.hasOwnProperty.call(query, k)) {
      url = url.replace(`{${k}}`, encodeURIComponent(query[k]));
    }
  }
  if (process.env.NODE_ENV === "development") {
    if (/{\w+}/.test(url)) {
      throw new Error(`Incomplete url template:\n${url}`);
    }
  }
  return url;
};

////////////////////////////////////////////////////////////////////////////////
// Endpoint schema definitions.
////////////////////////////////////////////////////////////////////////////////

export const TutorialState = endpoint({
  url: "/tutorial-state?tutorialId={tutorialId}&courseId={courseId}",
  Query: t.exact({
    tutorialId: t.string(),
    courseId: t.string(), // TODO
  }),
  GET: {
    Response: db.TutorialState,
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

export const Courses = endpoint({
  url: "/courses",
  Query: Empty,
  GET: {
    Response: t.array(db.Course),
  },
  POST: {
    Request: t.exact({
      displayName: t.string(),
    }),
    Response: db.Course,
  },
  PUT: null,
  DELETE: null,
});

export const Course = endpoint({
  url: join(Courses.url, "{courseId}"),
  Query: t.exact({
    courseId: t.string(),
  }),
  GET: {
    Response: db.Course,
  },
  PUT: {
    Request: t.exact({
      displayName: t.string(),
      visibleTutorials: t.optional(t.array(t.string())),
    }),
    Response: db.Course,
  },
  POST: null,
  DELETE: null,
});

export const CourseInstructors = endpoint({
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

export const CourseStudents = endpoint({
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

export const CourseTutorialStates = endpoint({
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

export const Instructor = endpoint({
  url: "/instructors/{email}",
  Query: t.exact({
    email: t.string(),
  }),
  PUT: {
    Request: Empty,
    Response: Ok,
  },
  DELETE: {
    Response: Ok,
  },
  GET: null,
  POST: null,
});

export const Admin = endpoint({
  url: "/admins/{email}",
  Query: t.exact({
    email: t.string(),
  }),
  PUT: {
    Request: Empty,
    Response: Ok,
  },
  DELETE: {
    Response: Ok,
  },
  GET: null,
  POST: null,
});

////////////////////////////////////////////////////////////////////////////////
// OLD
////////////////////////////////////////////////////////////////////////////////

// Get Learner.

export type GetLearnerRequest = t.Infer<typeof GetLearnerRequest>;
export const GetLearnerRequest = t.object({
  learnerId: t.string(),
});

export type GetLearnerResponse = t.Infer<typeof GetLearnerResponse>;
export const GetLearnerResponse = db.Learner;

// Create Learner.

export type CreateLearnerRequest = t.Infer<typeof CreateLearnerRequest>;
export const CreateLearnerRequest = t.optional(t.object({}));

export type CreateLearnerResponse = t.Infer<typeof CreateLearnerResponse>;
export const CreateLearnerResponse = db.Learner;

// Create Learners.

export type CreateLearnersRequest = t.Infer<typeof CreateLearnersRequest>;
export const CreateLearnersRequest = t.object({
  institution: t.string(),
  course: t.string(),
  number: t.number(),
});

export type CreateLearnersResponse = t.Infer<typeof CreateLearnersResponse>;
export const CreateLearnersResponse = t.object({
  learners: t.array(db.Learner),
});

// Get Tutorial.

export type GetTutorialRequest = t.Infer<typeof GetTutorialRequest>;
export const GetTutorialRequest = t.object({
  learnerId: t.string(),
  tutorial: t.string(),
  edition: t.string(),
});

export type GetTutorialResponse = t.Infer<typeof GetTutorialResponse>;
export const GetTutorialResponse = db.Tutorial;

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
