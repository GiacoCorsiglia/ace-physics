import { describe, expect, it } from "vitest";
import { decode } from "./decode";
import { literal } from "./literal";
import {
  assertFailure,
  assertSuccess,
  isFailure,
  isSuccess,
} from "./test-helpers";

describe("literal", () => {
  const type = literal("the value");

  it("accepts and rejects correctly in decode()", () => {
    expect(decode(type, null)).toSatisfy(isFailure);
    expect(decode(type, undefined)).toSatisfy(isFailure);
    expect(decode(type, true)).toSatisfy(isFailure);
    expect(decode(type, false)).toSatisfy(isFailure);
    expect(decode(type, 0)).toSatisfy(isFailure);
    expect(decode(type, 5)).toSatisfy(isFailure);
    expect(decode(type, "")).toSatisfy(isFailure);
    expect(decode(type, "yo")).toSatisfy(isFailure);
    expect(decode(type, [])).toSatisfy(isFailure);
    expect(decode(type, {})).toSatisfy(isFailure);

    expect(decode(type, "the value")).toSatisfy(isSuccess);
  });

  it("decodes successes properly", () => {
    const decoded = decode(type, "the value");
    assertSuccess(decoded);
    expect(decoded.value).toBe("the value");
  });

  it("decodes failures properly", () => {
    const decoded = decode(type, "not the value");
    assertFailure(decoded);
    expect(decoded.error).toHaveLength(1);
    expect(decoded.error[0]).toMatchObject({
      value: "not the value",
      context: [{ index: null, type }],
    });
  });
});
