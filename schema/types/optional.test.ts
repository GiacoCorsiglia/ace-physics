import { decode } from "./decode";
import { optional } from "./optional";
import { string } from "./primitives";
import {
  assertFailure,
  assertSuccess,
  isFailure,
  isSuccess,
} from "./test-helpers";

describe("optional", () => {
  const type = optional(string());

  it("accepts and rejects correctly in decode()", () => {
    expect(decode(type, true)).toSatisfy(isFailure);
    expect(decode(type, false)).toSatisfy(isFailure);
    expect(decode(type, 0)).toSatisfy(isFailure);
    expect(decode(type, 5)).toSatisfy(isFailure);
    expect(decode(type, [])).toSatisfy(isFailure);
    expect(decode(type, {})).toSatisfy(isFailure);

    expect(decode(type, null)).toSatisfy(isSuccess);
    expect(decode(type, undefined)).toSatisfy(isSuccess);
    expect(decode(type, "")).toSatisfy(isSuccess);
    expect(decode(type, "yo")).toSatisfy(isSuccess);
  });

  it("decodes wrapped type properly", () => {
    let decoded = decode(type, "some string");
    assertSuccess(decoded);
    expect(decoded.value).toBe("some string");
  });

  it("converts null to undefined", () => {
    let decoded = decode(type, null);
    assertSuccess(decoded);
    expect(decoded.value).toBeUndefined();
  });

  it("decodes failures properly", () => {
    let decoded = decode(type, 5);
    assertFailure(decoded);
    expect(decoded.error).toHaveLength(1);
    expect(decoded.error[0]).toMatchObject({
      value: 5,
      context: [{ index: null, type }],
    });
  });
});
