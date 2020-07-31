import * as apiTypes from "src/common/apiTypes";
import * as s from "src/common/schema";
import { AsyncResult, asyncResult, failure, success } from "src/common/util";

const protocol = "http";
const domain = "127.0.0.1:4000";

// Index.

export const getIndex = endpoint(
  "",
  "GET",
  apiTypes.GetIndexRequest,
  apiTypes.GetIndexResponse
);

// Learners.

export const getLearner = endpoint(
  "GetLearner",
  "GET",
  apiTypes.GetLearnerRequest,
  apiTypes.GetLearnerResponse
);

export const createLearner = endpoint(
  "CreateLearner",
  "POST",
  apiTypes.CreateLearnerRequest,
  apiTypes.CreateLearnerResponse
);

export const createLearners = endpoint(
  "CreateLearners",
  "POST",
  apiTypes.CreateLearnersRequest,
  apiTypes.CreateLearnersResponse
);

// Tutorials.

export const getTutorial = endpoint(
  "GetTutorial",
  "GET",
  apiTypes.GetTutorialRequest,
  apiTypes.GetTutorialResponse
);

export const updateTutorial = endpoint(
  "UpdateTutorial",
  "GET",
  apiTypes.UpdateTutorialRequest,
  apiTypes.UpdateTutorialResponse
);

// Endpoint.

function endpoint<T extends s.Schema, U extends s.Schema>(
  path: string,
  method: "GET" | "PUT" | "POST",
  requestSchema: T,
  responseSchema: U
) {
  type RequestType = s.TypeOf<T>;
  type ResponseType = s.TypeOf<U>;

  type AsyncResponse = AsyncResult<ResponseError, ResponseType>;
  type Endpoint = RequestType extends undefined
    ? () => Promise<AsyncResponse>
    : (request: RequestType) => Promise<AsyncResponse>;

  const href = `${protocol}://${domain}/${path}`;

  return async function endpoint(request): Promise<AsyncResponse> {
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
      console.error("api: request failed", result.error);
      return failure({ type: "CONNECTION", error: result.error });
    }

    const response = result.value;

    const json = await asyncResult(
      response.bodyUsed ? response.json() : Promise.resolve(null)
    );

    if (json.failed) {
      console.error("api: request with invalid json", json.error);
      return failure({ type: "JSON", error: json.error });
    }

    const body = json.value;

    // Specific error codes.

    if (response.status === 404) {
      console.log("api: not found");
      return failure({ type: 404 });
    }

    if (response.status === 500) {
      console.log("api: server error");
      return failure({ type: 500, body });
    }

    // General error.

    if (!response.ok) {
      console.log("api: request error");
      return failure({ type: "OTHER", status: response.status, body });
    }

    console.log("api: request succeeded");

    const decoded = responseSchema.decode(body);

    if (s.isFailure(decoded)) {
      console.log("api: invalid response type");
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
