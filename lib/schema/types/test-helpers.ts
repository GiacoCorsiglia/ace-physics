import {
  Failure,
  isFailure as isFailure_,
  isSuccess as isSuccess_,
  Success,
} from "@/result";
import { expect } from "vitest";
import { Decoded, DecodeError } from "./decode";

// These bindings are required for the functions to work with .toSatisfy().
export const isFailure = isFailure_<any>;
export const isSuccess = isSuccess_<any>;

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
