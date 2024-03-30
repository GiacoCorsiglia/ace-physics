interface SuccessResponse<Body = {}> {
  statusCode: 200;
  body: Body;
  headers?: { readonly [headerName: string]: string | readonly string[] };
}

interface ErrorResponse {
  statusCode: 403 | 404 | 405 | 500;
  body: {};
  headers?: { readonly [headerName: string]: string | readonly string[] };
}

export type Response<Body = {}> = SuccessResponse<Body> | ErrorResponse;

export const success = <Body>(body: Body): SuccessResponse<Body> => ({
  statusCode: 200,
  body,
});

export const notFound = (): ErrorResponse => ({
  statusCode: 404,
  body: { error: 404, type: "Not Found" },
});

export const forbidden = (): ErrorResponse => ({
  statusCode: 403,
  body: { error: 403, type: "Forbidden" },
});

export const error = (
  error: string | Error,
  info: any = undefined,
): ErrorResponse => {
  const message: string =
    typeof error === "string" ? error : `${error.name}: ${error.message}`;

  return {
    statusCode: 500,
    body: {
      error: 500,
      type: "Internal Server Error",
      message,
      info,
    },
  };
};

export const methodNotAllowed = (
  method: string | undefined,
  allowedMethods: string[],
): ErrorResponse => ({
  statusCode: 405,
  headers: {
    Allow: allowedMethods,
  },
  body: {
    error: 405,
    type: "Method Not Allowed",
    method,
  },
});
