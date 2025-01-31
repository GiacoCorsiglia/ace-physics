import { AsyncResult } from "@/result";
import { Infer, ObjectType, decode } from "@/schema/types";
import { useCallback, useState } from "react";
import useSwr, { SWRConfiguration, useSWRConfig } from "swr";
import { ApiSpec } from "../isomorphic/spec";
import { ResponseError, fetchAndParse } from "./fetch-and-parse";

// URL rendering.

export const renderUrl = <S extends ApiSpec>(
  { url }: S,
  query: Infer<S["Query"]>,
) => {
  for (const k in query) {
    if (Object.prototype.hasOwnProperty.call(query, k)) {
      url = url.replace(`[${k}]`, encodeURIComponent(query[k]));
    }
  }
  if (process.env.NODE_ENV === "development") {
    if (/\[\w+\]/.test(url)) {
      throw new Error(`Incomplete url template:\n${url}`);
    }
  }
  return `/api/${url.replace(/^\/+/, "")}`;
};

// GET.

interface UseGetHookReturn<
  S extends ApiSpec<ApiSpec["Query"], NonNullable<ApiSpec["GET"]>>,
> {
  readonly data?: Infer<S["GET"]["Response"]>;
  readonly error?: ResponseError;
  readonly isLoading?: boolean;
}

type UseGetHook<
  S extends ApiSpec<ApiSpec["Query"], NonNullable<ApiSpec["GET"]>>,
> =
  ObjectType<{}> extends S["Query"] // Query is empty.
    ? (
        swrOptions?: SWRConfiguration<
          Infer<S["GET"]["Response"]>,
          ResponseError
        >,
      ) => UseGetHookReturn<S>
    : (
        query: Infer<S["Query"]> | null,
        swrOptions?: SWRConfiguration<
          Infer<S["GET"]["Response"]>,
          ResponseError
        >,
      ) => UseGetHookReturn<S>;

export const createUseGet = <
  S extends ApiSpec<ApiSpec["Query"], NonNullable<ApiSpec["GET"]>>,
>(
  spec: S,
): UseGetHook<S> => {
  interface ThrownResponseError extends Error {
    responseError: ResponseError;
  }

  const fetcher = async (url: string) => {
    const response = await fetchAndParse(spec.GET, url, "GET");

    if (response.failed) {
      // SWR expects errors to be thrown.
      const error = new Error("") as ThrownResponseError;
      error.responseError = response.error;
      throw error;
    }

    return response.value;
  };

  const needsQuery = Object.keys(spec.Query.properties).length > 0;

  return (
    queryOrOptions?: Infer<S["Query"]> | null,
    options?: SWRConfiguration,
  ) => {
    const query = needsQuery ? queryOrOptions || {} : {};
    const swrOptions = needsQuery ? options : queryOrOptions;

    // Allow postponing SWR fetch by passing `query: null`.
    const url: string | null =
      queryOrOptions === null ? null : renderUrl(spec, query);
    const swr = useSwr(url, fetcher, swrOptions as SWRConfiguration);

    return {
      // SWR avoids rerenders if these properties aren't read.
      get data() {
        return swr.data;
      },
      get error() {
        return swr.error?.responseError;
      },
      get isLoading() {
        return swr.isValidating;
      },
    };
  };
};

// Mutations: PUT|POST|DELETE.

type UseMutationHook<
  S extends ApiSpec,
  M extends "PUT" | "POST" | "DELETE",
> = () => {
  readonly mutate: ObjectType<{}> extends S["Query"] // Query is empty.
    ? M extends "PUT" | "POST"
      ? (
          request: Infer<NonNullable<S[M]>["Request"]>,
        ) => AsyncResult<ResponseError, Infer<NonNullable<S[M]>["Response"]>>
      : () => AsyncResult<ResponseError, Infer<NonNullable<S[M]>["Response"]>>
    : M extends "PUT" | "POST"
      ? (
          query: Infer<S["Query"]>,
          request: Infer<NonNullable<S[M]>["Request"]>,
        ) => AsyncResult<ResponseError, Infer<NonNullable<S[M]>["Response"]>>
      : (
          query: Infer<S["Query"]>,
        ) => AsyncResult<ResponseError, Infer<NonNullable<S[M]>["Response"]>>;

  readonly reset: () => void;

  readonly data?: Infer<NonNullable<S[M]>["Response"]>;
  readonly error?: ResponseError;
  readonly status: Status;
};

type Status = "idle" | "loading" | "error" | "success";

type AllowedMethods<
  S extends ApiSpec,
  M extends "PUT" | "POST" | "DELETE",
> = M extends unknown ? (S[M] extends null ? never : M) : never;

export const createUseMutation = <
  S extends ApiSpec,
  M extends AllowedMethods<S, "PUT" | "POST" | "DELETE">,
>(
  spec: S,
  method: M,
  isText: boolean = false,
): UseMutationHook<S, M> => {
  const needsQuery = Object.keys(spec.Query.properties).length > 0;
  const needsRequest = method !== "DELETE";

  return () => {
    const { mutate: swrMutate } = useSWRConfig();

    const [state, setState] = useState<{
      status: Status;
      data?: Infer<NonNullable<S[M]>["Response"]>;
      error?: ResponseError;
    }>({ status: "idle" });

    const reset = useCallback(
      () =>
        setState((prev) =>
          prev.status === "idle" ? prev : { status: "idle" },
        ),
      [],
    );

    const mutate = useCallback(
      async (queryOrRequestArg?: any, requestArg?: any) => {
        const query = needsQuery ? queryOrRequestArg : {};
        const request = needsRequest
          ? needsQuery
            ? requestArg
            : queryOrRequestArg
          : undefined;

        const url = renderUrl(spec, query);

        setState({ status: "loading" });

        const result = await fetchAndParse(
          spec[method] as any,
          url,
          method as any,
          request,
          isText,
        );

        if (result.failed) {
          setState({
            status: "error",
            error: result.error,
          });
        } else {
          setState({
            status: "success",
            data: result.value,
          });
          // Update the cache for the GET at this URL.
          if (spec.GET && result.value) {
            // If the mutation returns a value and that value matches the shape
            // expected for the GET, we can update the cache with that value.
            const decoded = decode(spec.GET.Response, result.value);
            if (!decoded.failed) {
              swrMutate(url, decoded.value);
            } else {
              swrMutate(url);
            }
          } else {
            swrMutate(url);
          }
        }

        return result;
      },
      [swrMutate],
    );

    return {
      mutate: mutate as any,
      reset,

      ...state,
    };
  };
};
