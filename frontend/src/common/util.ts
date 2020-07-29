export type AsyncResult<E, T> =
  | {
      readonly failed: true;
      readonly error: E;
    }
  | {
      readonly failed: false;
      readonly value: T;
    };

export function asyncResult<E = any, T = any>(
  promise: Promise<T>
): Promise<AsyncResult<E, T>> {
  return promise.then(
    (value) => ({ failed: false, value }),
    (error) => ({ failed: true, error })
  );
}
