export type Result<E, T> =
  | {
      readonly failed: true;
      readonly error: E;
    }
  | {
      readonly failed: false;
      readonly value: T;
    };

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
    (value) => ({ failed: false, value }),
    (error) => ({ failed: true, error })
  );
}

export function failure<E>(error: E) {
  return { failed: true as const, error };
}

export function success<T>(value: T) {
  return { failed: false as const, value };
}
