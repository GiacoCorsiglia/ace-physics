interface SuccessResponse<B = {}> {
  statusCode: 200;
  body: B;
  headers?: { readonly [headerName: string]: string | readonly string[] };
}

interface ErrorResponse {
  statusCode: 404 | 405 | 500;
  body: {};
  headers?: { readonly [headerName: string]: string | readonly string[] };
}

export type Response<B = {}> = SuccessResponse<B> | ErrorResponse;

export const success = <B>(body: B): SuccessResponse<B> => ({
  statusCode: 200,
  body,
});

export const notFound = (): ErrorResponse => ({
  statusCode: 404,
  body: { error: 404, type: "Not Found" },
});

export const error = (
  error: string | Error,
  info: any = undefined
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

export const methodNotAllowed = (method: string): ErrorResponse => ({
  statusCode: 405,
  body: {
    error: 405,
    type: "Method Not Allowed",
    method,
  },
});
