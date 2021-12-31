import { withSentry } from "@sentry/nextjs";
import { NextApiRequest, NextApiResponse } from "next";
import { parseRequest } from "./parse-request";
import * as response from "./response";
import { ApiSpec } from "./spec";

export const endpoint = <S extends ApiSpec>(
  spec: S,
  handlers: S["_"]["Handlers"]
): ReturnType<typeof withSentry> & { handlers: S["_"]["Handlers"] } => {
  const wrapped = async (req: NextApiRequest): Promise<response.Response> => {
    const parsedRequest = await parseRequest(spec, req);
    if (parsedRequest.failed) {
      return parsedRequest.error;
    }
    const request = parsedRequest.value;

    const handler = handlers[
      request.method as keyof S["_"]["Handlers"]
    ] as unknown as (r: S["_"]["HandlerRequest"]) => Promise<response.Response>;

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

    const res_ = await wrapped(req);

    if (res_.headers) {
      Object.entries(res_.headers).forEach(([header, value]) => {
        res.setHeader(header, value);
      });
    }

    if (res_.statusCode === 500) {
      console.error(res_.body);
    }

    res.status(res_.statusCode);
    if (!isHead) {
      res.json(res_.body);
    }
  });

  return Object.assign(ret, { handlers });
};
