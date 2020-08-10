import * as apiTypes from "src/common/apiTypes";
import * as s from "src/common/schema";
import { AsyncResult, asyncResult, failure, success } from "src/common/util";

const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
const domain =
  process.env.NODE_ENV === "development"
    ? "127.0.0.1:4000"
    : process.env.REACT_APP_ACE_STAGING === "yes"
    ? "9vugrnkufd.execute-api.us-west-1.amazonaws.com/staging"
    : "hkl4dcafa7.execute-api.us-west-1.amazonaws.com/production";

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

  const href = `${protocol}://${domain}/${path}`;

  return async function endpoint(request): Promise<AsyncResponse> {
    ////////////////////////////////////////////////////////////////////////////
    // Mock responses: for development without a server.
    ////////////////////////////////////////////////////////////////////////////
    if (
      process.env.NODE_ENV === "development" &&
      process.env.REACT_APP_ACE_API !== "yes"
    ) {
      console.log("api: sending MOCK request", href, request);
      return new Promise((resolve) => {
        setTimeout(() => {
          const response = mockResponse(request);
          console.log("api: received MOCK response", href, response);
          resolve(success(response));
        }, 1);
      });
    }
    ////////////////////////////////////////////////////////////////////////////

    const url = new URL(href);

    if (method === "GET") {
      for (const key in request) {
        if (request.hasOwnProperty(key)) {
          url.searchParams.append(key, request[key]);
        }
      }
    }

    console.log("api: sending request", href, request);

    const result = await asyncResult(
      fetch(url.href, {
        method,
        body: method === "GET" ? undefined : JSON.stringify(request),
        headers: {
          "Content-Type": "application/json",
        },
      })
    );

    if (result.failed) {
      console.error("api: request failed", href, result.error);
      return failure({ type: "CONNECTION", error: result.error });
    }

    const response = result.value;

    const json = await asyncResult(response.json());

    if (json.failed) {
      console.error("api: request with invalid json", href, json.error);
      return failure({ type: "JSON", error: json.error });
    }

    const body = json.value;

    // Specific error codes.

    if (response.status === 404) {
      console.error("api: 404 not found", href, body);
      return failure({ type: 404 });
    }

    if (response.status === 500) {
      console.error("api: 500 server error", href, body);
      return failure({ type: 500, body });
    }

    // General error.

    if (!response.ok) {
      const error = { type: "OTHER", status: response.status, body } as const;
      console.error("api: request error", error);
      return failure(error);
    }

    console.log("api: request succeeded", href, body);

    const decoded = responseSchema.decode(body);

    if (s.isFailure(decoded)) {
      console.error("api: invalid response type", href, decoded.errors);
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
