import { decode, Infer, Type } from "@/schema/types";
import { withSentry } from "@sentry/nextjs";
import { NextApiRequest, NextApiResponse } from "next";
import * as response from "./response";

interface Request<T> {
  body: T;
}

export type Handler<T, B> = (
  request: Request<T>
) => Promise<response.Response<B>>;

type Method = "GET" | "PUT" | "POST";

export const apiRoute = <T extends Type>(
  method: Method,
  schema: T,
  handler: Handler<Infer<T>, any>
) => {
  const wrapped = async (req: NextApiRequest): Promise<response.Response> => {
    const payload: unknown = req.method === "GET" ? req.query : req.body;

    const decoded = decode(schema, payload);

    if (decoded.failed) {
      return response.error(
        "Invalid payload",
        decoded.error.map((e) => ({
          path: e.path,
          error: e.message,
          received: e.value,
        }))
      );
    }

    try {
      return handler({
        body: decoded.value,
      }).catch((e) => {
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

  return withSentry(async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== method) {
      res.setHeader("Allow", [method]);
      res.status(405).json({
        error: 405,
        type: "Method Not Allowed",
        method: req.method,
      });
      return;
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

    res.status(res_.statusCode).json(res_.body);
  });
};
