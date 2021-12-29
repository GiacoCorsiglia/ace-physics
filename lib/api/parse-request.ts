import * as result from "@/helpers/result";
import { decode } from "@/schema/types";
import { NextApiRequest } from "next";
import { getSession } from "next-auth/react";
import * as response from "./response";
import { ApiSpec, isHandlerSession } from "./spec";

type Method = typeof methods[number];
const methods = ["GET", "PUT", "POST", "DELETE"] as const;

export const parseRequest = async <S extends ApiSpec>(
  spec: S,
  req: NextApiRequest
): Promise<result.Result<response.Response, S["_"]["HandlerRequest"]>> => {
  // Method.
  const method = req.method as Method;
  if (!methods.includes(method) || !spec[method]) {
    return result.failure(
      response.methodNotAllowed(
        req.method,
        methods.filter((m) => !!spec[m])
      )
    );
  }

  // Query.
  const decodedQuery = decode(spec.Query, req.query);
  if (decodedQuery.failed) {
    // Invalid queries result in 404s.
    return result.failure(response.notFound());
  }
  const query = decodedQuery.value;

  // Body.
  let body: any = undefined;
  if (method === "PUT" || method === "POST") {
    // Only these methods have a body.
    const bodySchema = spec[method]!.Request;
    const decodedBody = decode(bodySchema, req.body);
    if (decodedBody.failed) {
      return result.failure(
        response.error(
          "Invalid request body",
          decodedBody.error.map((e) => ({
            path: e.path,
            error: e.message,
            received: e.value,
          }))
        )
      );
    }
    body = decodedBody.value;
  }

  const session = await getSession({ req });

  if (!isHandlerSession(session)) {
    return result.failure(response.forbidden());
  }

  return result.success({ method, query, body, session });
};
