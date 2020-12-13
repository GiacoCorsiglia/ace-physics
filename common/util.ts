export type Result<E, T> = Failure<E> | Success<T>;

export interface Failure<E> {
  readonly failed: true;
  readonly error: E;
}

export interface Success<T> {
  readonly failed: false;
  readonly value: T;
}

export function result<E = any, T = any>(action: () => T): Result<E, T> {
  try {
    return { failed: false as const, value: action() };
  } catch (error) {
    return { failed: true as const, error };
  }
}

export function asyncResult<E = any, T = any>(
  promise: Promise<T>
): Promise<Result<E, T>> {
  return promise.then(
    (value): Success<T> => ({ failed: false as const, value }),
    (error): Failure<E> => ({ failed: true as const, error })
  );
}

export function failure<E>(error: E): Failure<E> {
  return { failed: true as const, error };
}

export function success<T>(value: T): Success<T> {
  return { failed: false as const, value };
}
