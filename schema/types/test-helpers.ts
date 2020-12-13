import { Failure, Result, Success } from "common/util";
import { Decoded, DecodeError } from "./decode";

export const isFailure = (o: Result<any, any>) => o.failed;

export const isSuccess = (o: Result<any, any>) => !o.failed;

// TypeScript prefers these not be arrow functions:

export function assertSuccess<T>(
  decoded: Decoded<T>
): asserts decoded is Success<T> {
  expect(decoded).toSatisfy(isSuccess);
}

export function assertFailure<T>(
  decoded: Decoded<T>
): asserts decoded is Failure<readonly DecodeError[]> {
  expect(decoded).toSatisfy(isFailure);
}
