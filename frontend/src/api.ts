import * as apiTypes from "src/common/apiTypes";
import * as s from "src/common/schema";
import { AsyncResult, asyncResult, failure, success } from "src/common/util";
import * as globalParams from "./globalParams";

// Index.

export const getIndex = endpoint(
  "",
  "GET",
  apiTypes.GetIndexRequest,
  apiTypes.GetIndexResponse,
  () => ({ ok: true as const })
);

// Learners.

export const getLearner = endpoint(
  "GetLearner",
  "GET",
  apiTypes.GetLearnerRequest,
  apiTypes.GetLearnerResponse,
  ({ learnerId }) => mockLearner({ learnerId })
);

export const createLearner = endpoint(
  "CreateLearner",
  "POST",
  apiTypes.CreateLearnerRequest,
  apiTypes.CreateLearnerResponse,
  () => mockLearner({})
);

export const createLearners = endpoint(
  "CreateLearners",
  "POST",
  apiTypes.CreateLearnersRequest,
  apiTypes.CreateLearnersResponse,
  ({ institution, course, number }) => ({
    learners: [...Array(number)].map(() =>
      mockLearner({ institution, course })
    ),
  })
);

// Tutorials.

export const getTutorial = endpoint(
  "GetTutorial",
  "GET",
  apiTypes.GetTutorialRequest,
  apiTypes.GetTutorialResponse,
  ({ learnerId, tutorial }) => ({
    learnerId,
    tutorial,
    institution: "NONE",
    course: "NONE",
    createdAt: now,
    updatedAt: now,
    updateTimestamps: [now],
    version: 0,
    tutorialData: {},
  })
);

export const updateTutorial = endpoint(
  "UpdateTutorial",
  "PUT",
  apiTypes.UpdateTutorialRequest,
  apiTypes.UpdateTutorialResponse,
  () => ({ ok: true as const, updated: true })
);

// Endpoint.

function endpoint<T extends s.Schema, U extends s.Schema>(
  path: string,
  method: "GET" | "PUT" | "POST",
  requestSchema: T,
  responseSchema: U,
  mockResponse: (request: s.TypeOf<T>) => s.TypeOf<U>
) {
  type RequestType = s.TypeOf<T>;
  type ResponseType = s.TypeOf<U>;

  type AsyncResponse = AsyncResult<ResponseError, ResponseType>;
  type Endpoint = RequestType extends undefined
    ? () => Promise<AsyncResponse>
    : (request: RequestType) => Promise<AsyncResponse>;

  path = `/api/${path}`;

  return async function endpoint(request): Promise<AsyncResponse> {
    ////////////////////////////////////////////////////////////////////////////
    // Mock responses: for development without a server.
    ////////////////////////////////////////////////////////////////////////////
    if (globalParams.mockApi) {
      console.log("api: sending MOCK request", path, request);
      return new Promise((resolve) => {
        setTimeout(() => {
          const response = mockResponse(request);
          console.log("api: received MOCK response", path, response);
          resolve(success(response));
        }, 1);
      });
    }
    ////////////////////////////////////////////////////////////////////////////

    const searchParams = new URLSearchParams();

    if (method === "GET") {
      for (const key in request) {
        if (request.hasOwnProperty(key)) {
          searchParams.append(key, request[key]);
        }
      }
    }

    const search = searchParams.toString();
    if (search) {
      path += `?${search}`;
    }

    console.log("api: sending request", path, request);

    const result = await asyncResult(
      fetch(path, {
        method,
        body: method === "GET" ? undefined : JSON.stringify(request),
        headers: {
          "Content-Type": "application/json",
        },
      })
    );

    if (result.failed) {
      console.error("api: request failed", path, result.error);
      return failure({ type: "CONNECTION", error: result.error });
    }

    const response = result.value;

    const json = await asyncResult(response.json());

    if (json.failed) {
      console.error("api: request with invalid json", path, json.error);
      return failure({ type: "JSON", error: json.error });
    }

    const body = json.value;

    // Specific error codes.

    if (response.status === 404) {
      console.error("api: 404 not found", path, body);
      return failure({ type: 404 });
    }

    if (response.status === 500) {
      console.error("api: 500 server error", path, body);
      return failure({ type: 500, body });
    }

    // General error.

    if (!response.ok) {
      const error = { type: "OTHER", status: response.status, body } as const;
      console.error("api: request error", error);
      return failure(error);
    }

    console.log("api: request succeeded", path, body);

    const decoded = responseSchema.decode(body);

    if (s.isFailure(decoded)) {
      console.error("api: invalid response type", path, decoded.errors);
      return failure({ type: "RESPONSE_TYPE", body, errors: decoded.errors });
    }

    return success(decoded.value);
  } as Endpoint;
  // This^ type cast allows endpoints that don't take any params to be called
  // without writing `endpoint(undefined)`.
}

type ResponseError = Readonly<
  | { type: "CONNECTION"; error: any }
  | { type: "JSON"; error: any }
  | { type: 404 }
  | { type: 500; body: any }
  | { type: "OTHER"; status: number; body: any }
  | {
      type: "RESPONSE_TYPE";
      body: any;
      errors: readonly s.Error<any>[];
    }
>;

function mockLearner({
  learnerId = (100_000 + 99_999 * Math.random()).toFixed(0),
  institution = "NONE",
  course = "NONE",
}: {
  learnerId?: string;
  institution?: string;
  course?: string;
}) {
  return {
    learnerId,
    institution,
    course,
    createdAt: now,
  };
}

const now = new Date().toISOString();
