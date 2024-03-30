import * as result from "@/result";
import { decode, Infer } from "@/schema/types";
import { options as authOptions } from "@pages/api/auth/[...nextauth].endpoint";
import { NextApiRequest, NextApiResponse } from "next";
import type { Session } from "next-auth";
import { getServerSession } from "next-auth/next";
import { ApiSpec } from "../isomorphic/spec";
import * as response from "./response";

type Method = (typeof methods)[number];
const methods = ["GET", "PUT", "POST", "DELETE"] as const;

// `parseRequest` enforces that the session have a user with an email.
export type ParsedSession = Session & { user: { email: string } };

const isParsedSession = (s: Session | null | undefined): s is ParsedSession =>
  !!(s && s.user && s.user.email);

export type ParsedRequest<S extends ApiSpec> = {
  query: Infer<S["Query"]>;
  session: ParsedSession;
} & (
  | (S["GET"] extends null ? never : { readonly method: "GET" })
  | (S["PUT"] extends null
      ? never
      : {
          readonly method: "PUT";
          readonly body: Infer<NonNullable<S["PUT"]>["Request"]>;
        })
  | (S["POST"] extends null
      ? never
      : {
          readonly method: "POST";
          readonly body: Infer<NonNullable<S["POST"]>["Request"]>;
        })
  | (S["DELETE"] extends null ? never : { readonly method: "DELETE" })
);

export const parseRequest = async <S extends ApiSpec>(
  spec: S,
  req: NextApiRequest,
  res: NextApiResponse
): Promise<result.Result<response.Response, ParsedRequest<S>>> => {
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

  const session = await getServerSession(req, res, authOptions);

  if (!isParsedSession(session)) {
    return result.failure(response.forbidden());
  }

  return result.success({ method, query, body, session });
};
