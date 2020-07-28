type AsyncResult<E, T> =
  | {
      readonly failed: true;
      readonly error: E;
    }
  | {
      readonly failed: false;
      readonly result: T;
    };

export function asyncResult<E = any, T = any>(
  promise: Promise<T>
): Promise<AsyncResult<E, T>> {
  return promise.then(
    (result) => ({ failed: false, result }),
    (error) => ({ failed: true, error })
  );
}
