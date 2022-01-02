import type { Infer, ObjectType, Type } from "@/schema/types";

interface R {
  readonly Response: Type;
}
interface RR {
  readonly Request: Type;
  readonly Response: Type;
}

export interface ApiSpec<
  Query extends ObjectType = ObjectType,
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
}

export const spec = <
  Query extends ObjectType,
  GET extends null | R,
  PUT extends null | RR,
  POST extends null | RR,
  DELETE extends null | R
>(
  o: ApiSpec<Query, GET, PUT, POST, DELETE>
) => o;

export const renderUrl = <S extends ApiSpec>(
  { url }: S,
  query: Infer<S["Query"]>
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
