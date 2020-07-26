export type Response = AWSLambda.APIGatewayProxyResult;

function response(r: Response) {
  r.headers = r.headers || {};
  r.headers["Content-Type"] = "application/json";
  return r;
}

export function success(json: {}): Response {
  return response({
    statusCode: 200,
    body: JSON.stringify(json),
  });
}

export function notFound(): Response {
  return response({
    statusCode: 404,
    body: JSON.stringify({ error: 404, type: "Not Found" }),
  });
}

export function error(error: string | Error, info: any = undefined): Response {
  const message: string =
    typeof error === "string" ? error : `${error.name}: ${error.message}`;

  return response({
    statusCode: 500,
    body: JSON.stringify({
      error: 500,
      type: "Internal Server Error",
      message,
      info,
    }),
  });
}

export function methodNotAllowed(method: string): Response {
  return response({
    statusCode: 405,
    body: JSON.stringify({
      error: 405,
      type: "Method Not Allowed",
      method,
    }),
  });
}
