import { any } from "./any";
import { decode } from "./decode";
import { assertSuccess, isSuccess } from "./test-helpers";

describe("any", () => {
  const type = any();

  it("accepts everything in decode()", () => {
    expect(decode(type, null)).toSatisfy(isSuccess);
    expect(decode(type, undefined)).toSatisfy(isSuccess);
    expect(decode(type, true)).toSatisfy(isSuccess);
    expect(decode(type, false)).toSatisfy(isSuccess);
    expect(decode(type, 0)).toSatisfy(isSuccess);
    expect(decode(type, 5)).toSatisfy(isSuccess);
    expect(decode(type, "")).toSatisfy(isSuccess);
    expect(decode(type, "yo")).toSatisfy(isSuccess);
    expect(decode(type, [])).toSatisfy(isSuccess);
    expect(decode(type, {})).toSatisfy(isSuccess);
  });

  it("returns value identically in decode()", () => {
    const orig = {};
    const decoded = decode(type, orig);
    assertSuccess(decoded);
    expect(decoded.value).toBe(orig);
  });
});
