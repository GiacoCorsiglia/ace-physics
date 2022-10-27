import { DATABASE_ENABLED } from "@/db";
import { Infer, Type } from "@/schema/types";
import { withSentry } from "@sentry/nextjs";
import { NextApiRequest, NextApiResponse } from "next";
import { sendResponse } from ".";
import { ApiSpec } from "../isomorphic/spec";
import { ParsedRequest, ParsedSession, parseRequest } from "./parse-request";
import * as response from "./response";

type HandlerResponse<T extends Type> = Promise<response.Response<Infer<T>>>;

type Handlers<S extends ApiSpec> = (S["GET"] extends null
  ? {}
  : {
      GET(request: {
        readonly method: "GET";
        readonly query: Infer<S["Query"]>;
        readonly session: ParsedSession;
      }): HandlerResponse<NonNullable<S["GET"]>["Response"]>;
    }) &
  (S["PUT"] extends null
    ? {}
    : {
        PUT(request: {
          readonly method: "PUT";
          readonly query: Infer<S["Query"]>;
          readonly body: Infer<NonNullable<S["PUT"]>["Request"]>;
          readonly session: ParsedSession;
        }): HandlerResponse<NonNullable<S["PUT"]>["Response"]>;
      }) &
  (S["POST"] extends null
    ? {}
    : {
        POST(request: {
          readonly method: "POST";
          readonly query: Infer<S["Query"]>;
          readonly body: Infer<NonNullable<S["POST"]>["Request"]>;
          readonly session: ParsedSession;
        }): HandlerResponse<NonNullable<S["POST"]>["Response"]>;
      }) &
  (S["DELETE"] extends null
    ? {}
    : {
        DELETE(request: {
          readonly method: "DELETE";
          readonly query: Infer<S["Query"]>;
          readonly session: ParsedSession;
        }): HandlerResponse<NonNullable<S["DELETE"]>["Response"]>;
      });

export const endpoint = <S extends ApiSpec>(
  spec: S,
  databaseEnabledHandlers: Handlers<S>,
  databaseDisabledHandlers: Handlers<S>
): ReturnType<typeof withSentry> & { handlers: Handlers<S> } => {
  const handlers = DATABASE_ENABLED
    ? databaseEnabledHandlers
    : databaseDisabledHandlers;

  const wrapped = async (req: NextApiRequest): Promise<response.Response> => {
    const parsedRequest = await parseRequest(spec, req);
    if (parsedRequest.failed) {
      return parsedRequest.error;
    }
    const request = parsedRequest.value;

    const handler = handlers[
      request.method as keyof Handlers<S>
    ] as unknown as (r: ParsedRequest<S>) => Promise<response.Response>;

    try {
      return handler(request).catch((e) => {
        if (process.env.NODE_ENV === "development") {
          console.error(e);
        }
        return response.error(e);
      });
    } catch (e: any) {
      if (process.env.NODE_ENV === "development") {
        console.error(e);
      }
      return response.error(e);
    }
  };

  const ret = withSentry(async (req: NextApiRequest, res: NextApiResponse) => {
    const isHead = req.method === "HEAD";
    if (isHead) {
      req.method = "GET";
    }

    const responseObject = await wrapped(req);

    sendResponse(res, responseObject, isHead);
  });

  return Object.assign(ret, { handlers });
};
