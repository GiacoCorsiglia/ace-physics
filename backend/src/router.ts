import * as s from "ace-frontend/src/common/schema";
import * as response from "./response";

const actions: Record<string, Action<any>> = {};

export async function route(
  event: AWSLambda.APIGatewayProxyEvent
): Promise<response.Response> {
  const requestMethod = event.httpMethod === "HEAD" ? "GET" : event.httpMethod;

  if (event.path === "/") {
    return response.success({ ok: true });
  }

  const actionName = event.path.replace(/^\/+|\/+$/g, "");
  const action = actions[actionName];
  if (!action) {
    return response.notFound();
  }

  if (requestMethod !== action.method) {
    return response.methodNotAllowed(event.httpMethod);
  }

  let payload: unknown = null;
  if (requestMethod === "GET") {
    payload = event.queryStringParameters || {};
  } else if (event.body) {
    try {
      payload = JSON.parse(
        event.isBase64Encoded
          ? Buffer.from(event.body, "base64").toString("utf-8")
          : event.body
      );
    } catch (e) {
      return response.error(e);
    }
  }
  const decoded = action.schema.decode(payload);

  if (s.isFailure(decoded)) {
    return response.error("Invalid payload", decoded.errors);
  }

  try {
    const request: Request<any> = {
      body: decoded.value,
    };
    return action.handler(request).catch((e) => response.error(e));
  } catch (e) {
    return response.error(e);
  }
}

type Method = "GET" | "PUT" | "POST";

interface Action<T extends s.Data> {
  method: Method;
  schema: s.Schema<T>;
  handler: Handler<T>;
}

export type Handler<T extends s.Data> = (
  request: Request<T>
) => Promise<response.Response>;

interface Request<T extends s.Data> {
  body: T;
}

export function get<S extends s.Schema>(
  name: string,
  schema: S,
  handler: Handler<s.TypeOf<S>>
) {
  actions[name] = { method: "GET", schema, handler };
}

export function post<S extends s.Schema>(
  name: string,
  schema: S,
  handler: Handler<s.TypeOf<S>>
) {
  actions[name] = { method: "POST", schema, handler };
}

export function put<S extends s.Schema>(
  name: string,
  schema: S,
  handler: Handler<s.TypeOf<S>>
) {
  actions[name] = { method: "PUT", schema, handler };
}
