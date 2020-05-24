import * as s from "ace-frontend/src/common/schema";
import * as response from "./response";

const routes: Route<any>[] = [];

export function route(
  event: AWSLambda.APIGatewayProxyEvent
): response.Response {
  const requestMethod = event.httpMethod === "HEAD" ? "GET" : event.httpMethod;

  let methodNotAllowed = false;

  for (const route of routes) {
    const match = route.pattern.exec(event.path);

    if (match === null) {
      // Definitely not a match, continue.
      continue;
    }

    if (requestMethod !== route.method) {
      // It's a match on path, but not on method.
      methodNotAllowed = true;
      // Continue to look for matches in case another route handles this
      // method at this path.  Otherwise we'll return Method Not Allowed below.
      continue;
    }

    // It's a match on both method and path.  Hooray!

    // Parse the body, which might fail.
    let body = null;
    if (event.body) {
      try {
        body = JSON.parse(event.body);
      } catch (e) {
        return response.error(e);
      }
    }

    const decoded = route.schema.decode(body);

    if (s.isFailure(decoded)) {
      return response.error("Invalid input type");
    }

    try {
      return route.handler(decoded.value);
    } catch (e) {
      return response.error(e);
    }
  }

  if (methodNotAllowed) {
    return response.methodNotAllowed(event.httpMethod);
  }

  return response.notFound();
}

type Method = "GET" | "PUT" | "POST";

interface Route<T extends s.Data> {
  method: Method;
  pattern: RegExp;
  schema: s.Schema<T>;
  handler: Handler<T>;
}

type Handler<T extends s.Data> = (request: Request<T>) => response.Response;

interface Request<T extends s.Data> {
  body: T;
}

export function get<T extends s.Data>(
  pattern: RegExp,
  schema: s.Schema<T>,
  handler: Handler<T>
) {
  routes.push({ method: "GET", pattern, schema, handler });
}

export function post<T extends s.Data>(
  pattern: RegExp,
  schema: s.Schema<T>,
  handler: Handler<T>
) {
  routes.push({ method: "POST", pattern, schema, handler });
}

export function put<T extends s.Data>(
  pattern: RegExp,
  schema: s.Schema<T>,
  handler: Handler<T>
) {
  routes.push({ method: "PUT", pattern, schema, handler });
}
