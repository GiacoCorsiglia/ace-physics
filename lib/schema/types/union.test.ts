import { describe, expect, it } from "vitest";
import { decode } from "./decode";
import { number, string } from "./primitives";
import {
  assertFailure,
  assertSuccess,
  isFailure,
  isSuccess,
} from "./test-helpers";
import { union } from "./union";

describe("union", () => {
  const type = union(string(), number());

  it("accepts and rejects correctly in decode()", () => {
    expect(decode(type, null)).toSatisfy(isFailure);
    expect(decode(type, undefined)).toSatisfy(isFailure);
    expect(decode(type, true)).toSatisfy(isFailure);
    expect(decode(type, false)).toSatisfy(isFailure);
    expect(decode(type, [])).toSatisfy(isFailure);
    expect(decode(type, {})).toSatisfy(isFailure);

    expect(decode(type, 0)).toSatisfy(isSuccess);
    expect(decode(type, 5)).toSatisfy(isSuccess);
    expect(decode(type, "")).toSatisfy(isSuccess);
    expect(decode(type, "yo")).toSatisfy(isSuccess);
  });

  it("decodes wrapped types properly", () => {
    let decoded = decode(type, "some string");
    assertSuccess(decoded);
    expect(decoded.value).toBe("some string");

    decoded = decode(type, 5);
    assertSuccess(decoded);
    expect(decoded.value).toBe(5);
  });

  it("decodes failures properly", () => {
    const decoded = decode(type, false);
    assertFailure(decoded);
    expect(decoded.error).toHaveLength(1);
    expect(decoded.error[0]).toMatchObject({
      value: false,
      context: [{ index: null, type }],
    });
  });
});
