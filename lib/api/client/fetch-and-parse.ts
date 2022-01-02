import { asyncResult, failure, Result, success } from "@/helpers/result";
import { decode, DecodeError, Infer, Type } from "@/schema/types";

export const fetchAndParse: {
  <Res extends Type>(
    spec: {
      Response: Res;
    },
    url: string,
    method: "GET" | "DELETE"
  ): Promise<Result<ResponseError, Infer<Res>>>;
  <Res extends Type, Req extends Type>(
    spec: {
      Request: Req;
      Response: Res;
    },
    url: string,
    method: "PUT" | "POST",
    requestBody: Infer<Req>
  ): Promise<Result<ResponseError, Infer<Res>>>;
} = async <Res extends Type>(
  spec: { Response: Res },
  url: string,
  method: "GET" | "PUT" | "POST" | "DELETE",
  requestBody?: unknown
): Promise<Result<ResponseError, Infer<Res>>> => {
  const responseSchema = spec.Response;

  const result = await asyncResult(
    fetch(url, {
      method,
      body: method === "GET" ? undefined : JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
      },
    })
  );

  if (result.failed) {
    console.error("api: request failed", url, result.error);
    return failure({ type: "CONNECTION", error: result.error });
  }

  const response = result.value;

  const json = await asyncResult(response.json());

  if (json.failed) {
    console.error("api: request with invalid json", url, json.error);
    return failure({ type: "JSON", error: json.error });
  }

  const body = json.value;

  // Specific error codes.

  if (response.status === 403) {
    console.error("api: 403 forbidden", url, body);
    return failure({ type: "403 FORBIDDEN" });
  }

  if (response.status === 404) {
    console.error("api: 404 not found", url, body);
    return failure({ type: "404 NOT FOUND" });
  }

  if (response.status === 500) {
    console.error("api: 500 server error", url, body);
    return failure({ type: "500 SERVER ERROR", body });
  }

  // General error.

  if (!response.ok) {
    const error = { type: "OTHER", status: response.status, body } as const;
    console.error("api: request error", error);
    return failure(error);
  }

  console.log("api: request succeeded", url, body);

  const decoded = decode(responseSchema, body);

  if (decoded.failed) {
    console.error("api: invalid response type", url, decoded.error);
    return failure({ type: "RESPONSE TYPE", body, errors: decoded.error });
  }

  return success(decoded.value);
};

export type ResponseError = Readonly<
  | { type: "CONNECTION"; error: any }
  | { type: "JSON"; error: any }
  | { type: "403 FORBIDDEN" }
  | { type: "404 NOT FOUND" }
  | { type: "500 SERVER ERROR"; body: any }
  | { type: "OTHER"; status: number; body: any }
  | {
      type: "RESPONSE TYPE";
      body: any;
      errors: readonly DecodeError[];
    }
>;
