import * as t from "@/schema/types";
import type { Session } from "next-auth";
import type { Response } from "./response";

interface R {
  readonly Response: t.Type;
}
interface RR {
  readonly Request: t.Type;
  readonly Response: t.Type;
}

type HandlerResponse<T extends t.Type> = Promise<Response<t.Infer<T>>>;

// `parseRequest` enforces that the session have a user with an email.
type HandlerSession = Session & { user: { email: string } };

export const isHandlerSession = (
  session: Session | null | undefined
): session is HandlerSession =>
  !!(session && session.user && session.user.email);

export interface ApiSpec<
  Query extends t.ObjectType = t.ObjectType,
  GET extends null | R = null | R,
  PUT extends null | RR = null | RR,
  POST extends null | RR = null | RR,
  DELETE extends null | R = null | R
> {
  readonly url: string;

  readonly Query: Query;
  readonly GET: GET;
  readonly PUT: PUT;
  readonly POST: POST;
  readonly DELETE: DELETE;

  /** @internal */
  readonly _: {
    Query: t.Infer<Query>;

    Handlers: (GET extends null
      ? {}
      : {
          GET(request: {
            readonly method: "GET";
            readonly query: t.Infer<Query>;
            readonly session: HandlerSession;
          }): HandlerResponse<NonNullable<GET>["Response"]>;
        }) &
      (PUT extends null
        ? {}
        : {
            PUT(request: {
              readonly method: "PUT";
              readonly query: t.Infer<Query>;
              readonly body: t.Infer<NonNullable<PUT>["Request"]>;
              readonly session: HandlerSession;
            }): HandlerResponse<NonNullable<PUT>["Response"]>;
          }) &
      (POST extends null
        ? {}
        : {
            POST(request: {
              readonly method: "POST";
              readonly query: t.Infer<Query>;
              readonly body: t.Infer<NonNullable<POST>["Request"]>;
              readonly session: HandlerSession;
            }): HandlerResponse<NonNullable<POST>["Response"]>;
          }) &
      (DELETE extends null
        ? {}
        : {
            DELETE(request: {
              readonly method: "DELETE";
              readonly query: t.Infer<Query>;
              readonly session: HandlerSession;
            }): HandlerResponse<NonNullable<DELETE>["Response"]>;
          });

    HandlerRequest: { query: t.Infer<Query>; session: HandlerSession } & (
      | (GET extends null ? never : { readonly method: "GET" })
      | (PUT extends null
          ? never
          : {
              readonly method: "PUT";
              readonly body: t.Infer<NonNullable<PUT>["Request"]>;
            })
      | (POST extends null
          ? never
          : {
              readonly method: "POST";
              readonly body: t.Infer<NonNullable<POST>["Request"]>;
            })
      | (DELETE extends null ? never : { readonly method: "DELETE" })
    );
  };
}

export const spec = <
  Query extends t.ObjectType,
  GET extends null | R,
  PUT extends null | RR,
  POST extends null | RR,
  DELETE extends null | R
>(
  o: Omit<ApiSpec<Query, GET, PUT, POST, DELETE>, "_">
) => o as ApiSpec<Query, GET, PUT, POST, DELETE>;

export const makeUrl = <S extends ApiSpec>(
  { url }: S,
  query: S["_"]["Query"]
) => {
  for (const k in query) {
    if (Object.prototype.hasOwnProperty.call(query, k)) {
      url = url.replace(`{${k}}`, encodeURIComponent(query[k]));
    }
  }
  if (process.env.NODE_ENV === "development") {
    if (/{\w+}/.test(url)) {
      throw new Error(`Incomplete url template:\n${url}`);
    }
  }
  return url;
};
