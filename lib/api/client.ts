import * as globalParams from "@/global-params";
import { asyncResult, failure, Result, success } from "@/helpers/result";
import * as apiTypes from "@/schema/api";
import {
  decode,
  DecodeError,
  Infer,
  literal,
  object,
  Type,
  undefined_,
} from "@/schema/types";

// Index.

export const getIndex = endpoint(
  "",
  "GET",
  undefined_(),
  object({ ok: literal(true) }),
  () => ({ ok: true as const })
);

// Learners.

export const getLearner = endpoint(
  "get-learner",
  "GET",
  apiTypes.GetLearnerRequest,
  apiTypes.GetLearnerResponse,
  ({ learnerId }) => mockLearner({ learnerId })
);

export const createLearner = endpoint(
  "create-learner",
  "POST",
  apiTypes.CreateLearnerRequest,
  apiTypes.CreateLearnerResponse,
  () => mockLearner({})
);

export const createLearners = endpoint(
  "create-learners",
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
  "get-tutorial",
  "GET",
  apiTypes.GetTutorialRequest,
  apiTypes.GetTutorialResponse,
  ({ learnerId, tutorial, edition }) => ({
    learnerId,
    tutorial,
    edition,
    createdAt: now,
    updatedAt: now,
    version: 0,
    state: {},
    events: [],
  })
);

export const updateTutorial = endpoint(
  "update-tutorial",
  "PUT",
  apiTypes.UpdateTutorialRequest,
  apiTypes.UpdateTutorialResponse,
  () => ({ ok: true as const, updated: true })
);

// Endpoint.

function endpoint<T extends Type, U extends Type>(
  path: string,
  method: "GET" | "PUT" | "POST",
  requestSchema: T,
  responseSchema: U,
  mockResponse: (request: Infer<T>) => Infer<U>
) {
  type RequestType = Infer<T>;
  type ResponseType = Infer<U>;

  type AsyncResponse = Result<ResponseError, ResponseType>;
  type Endpoint = undefined extends RequestType
    ? () => Promise<AsyncResponse>
    : (request: RequestType) => Promise<AsyncResponse>;

  // eslint-disable-next-line no-param-reassign
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
    const url = search ? `${path}?${search}` : path;

    console.log("api: sending request", url, request);

    const result = await asyncResult(
      fetch(url, {
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

    const decoded = decode(responseSchema, body);

    if (decoded.failed) {
      console.error("api: invalid response type", path, decoded.error);
      return failure({ type: "RESPONSE_TYPE", body, errors: decoded.error });
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
      errors: readonly DecodeError[];
    }
>;

const mockLearner = ({
  learnerId = (100_000 + 99_999 * Math.random()).toFixed(0),
  institution = "NONE",
  course = "NONE",
}: {
  learnerId?: string;
  institution?: string;
  course?: string;
}) => ({
  learnerId,
  institution,
  course,
  createdAt: now,
});

const now = new Date().toISOString();
