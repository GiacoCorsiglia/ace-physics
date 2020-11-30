export interface Response {
  headers?: { readonly [headerName: string]: string | readonly string[] };
  statusCode: number;
  body: {};
}

function response(r: Response) {
  return r;
}

export function success(json: {}): Response {
  return response({
    statusCode: 200,
    body: json,
  });
}

export function notFound(): Response {
  return response({
    statusCode: 404,
    body: { error: 404, type: "Not Found" },
  });
}

export function error(error: string | Error, info: any = undefined): Response {
  const message: string =
    typeof error === "string" ? error : `${error.name}: ${error.message}`;

  return response({
    statusCode: 500,
    body: {
      error: 500,
      type: "Internal Server Error",
      message,
      info,
    },
  });
}

export function methodNotAllowed(method: string): Response {
  return response({
    statusCode: 405,
    body: {
      error: 405,
      type: "Method Not Allowed",
      method,
    },
  });
}
