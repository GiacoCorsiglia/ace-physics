import * as s from "common/schema";
import { NextApiRequest, NextApiResponse } from "next";
import * as response from "./response";

interface Request<T extends s.Data> {
  body: T;
}

export type Handler<T extends s.Data> = (
  request: Request<T>
) => Promise<response.Response>;

type Method = "GET" | "PUT" | "POST";

export const apiRoute = <T extends s.Data>(
  method: Method,
  schema: s.Schema<T>,
  handler: Handler<T>
) => {
  const wrapped = async (req: NextApiRequest): Promise<response.Response> => {
    let payload: unknown = req.method === "GET" ? req.query : req.body;

    const decoded = schema.decode(payload);

    if (s.isFailure(decoded)) {
      return response.error(
        "Invalid payload",
        decoded.errors.map((e) => ({
          path: e.path,
          error: e.message,
          received: e.value,
        }))
      );
    }

    try {
      const request: Request<any> = {
        body: decoded.value,
      };
      return handler(request).catch((e) => {
        if (process.env.NODE_ENV === "development") {
          console.error(e);
        }
        return response.error(e);
      });
    } catch (e) {
      if (process.env.NODE_ENV === "development") {
        console.error(e);
      }
      return response.error(e);
    }
  };

  return async (req: NextApiRequest, res: NextApiResponse) => {
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

    res.status(res_.statusCode).json(res_.body);
  };
};
