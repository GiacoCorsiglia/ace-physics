import { Failure, isFailure, isSuccess, Success } from "@/result";
import { Decoded, DecodeError } from "./decode";

export { isFailure, isSuccess };

// TypeScript prefers these not be arrow functions:

export function assertSuccess<T>(
  decoded: Decoded<T>,
): asserts decoded is Success<T> {
  expect(decoded).toSatisfy(isSuccess);
}

export function assertFailure<T>(
  decoded: Decoded<T>,
): asserts decoded is Failure<readonly DecodeError[]> {
  expect(decoded).toSatisfy(isFailure);
}
