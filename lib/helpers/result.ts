export type Result<E, T> = Failure<E> | Success<T>;

export interface Failure<E> {
  readonly failed: true;
  readonly error: E;
}

export interface Success<T> {
  readonly failed: false;
  readonly value: T;
}

export const failure = <E>(error: E): Failure<E> => ({ failed: true, error });

export const success = <T>(value: T): Success<T> => ({ failed: false, value });

export const isSuccess = <T>(result: Result<any, T>): result is Success<T> =>
  !result.failed;

export const isFailure = <E>(result: Result<E, any>): result is Failure<E> =>
  result.failed;

export const result = <E = Error, T = any>(action: () => T): Result<E, T> => {
  try {
    return { failed: false, value: action() };
  } catch (error: any) {
    return { failed: true, error };
  }
};

/** @throws E */
export const unwrap = <E, T>(r: Result<E, T>): T => {
  if (r.failed) {
    throw r.error;
  }
  return r.value;
};

export interface AsyncResult<E, T> extends Promise<Result<E, T>> {}

export const asyncResult = <E = any, T = any>(
  promise: Promise<T>
): AsyncResult<E, T> =>
  promise.then(
    (value): Success<T> => ({ failed: false, value }),
    (error): Failure<E> => ({ failed: true, error })
  );
