import { describe, expect, it } from "vitest";
import { decode } from "./decode";
import { number } from "./primitives";
import {
  assertFailure,
  assertSuccess,
  isFailure,
  isSuccess,
} from "./test-helpers";

describe("number", () => {
  const type = number();

  it("accepts and rejects correctly in decode()", () => {
    expect(decode(type, null)).toSatisfy(isFailure);
    expect(decode(type, undefined)).toSatisfy(isFailure);
    expect(decode(type, true)).toSatisfy(isFailure);
    expect(decode(type, false)).toSatisfy(isFailure);

    expect(decode(type, 0)).toSatisfy(isSuccess);
    expect(decode(type, 5)).toSatisfy(isSuccess);

    expect(decode(type, "")).toSatisfy(isFailure);
    expect(decode(type, "yo")).toSatisfy(isFailure);
    expect(decode(type, [])).toSatisfy(isFailure);
    expect(decode(type, {})).toSatisfy(isFailure);
  });

  it("decodes successes properly", () => {
    let decoded = decode(type, 0);
    assertSuccess(decoded);
    expect(decoded.value).toBe(0);

    decoded = decode(type, 5);
    assertSuccess(decoded);
    expect(decoded.value).toBe(5);
  });

  it("decodes failures properly", () => {
    const decoded = decode(type, "not a number!");
    assertFailure(decoded);
    expect(decoded.error).toHaveLength(1);
    expect(decoded.error[0]).toMatchObject({
      value: "not a number!",
      context: [{ index: null, type }],
    });
  });
});
