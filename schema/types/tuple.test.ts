import { decode } from "./decode";
import { boolean, number, string } from "./primitives";
import { assertFailure, assertSuccess, isFailure } from "./test-helpers";
import { tuple } from "./tuple";

describe("tuple schema", () => {
  const subType = tuple(string(), string());
  const type = tuple(number(), subType, boolean());

  it("decodes successes properly", () => {
    const decoded = decode(type, [0, ["", "b"], false]);
    assertSuccess(decoded);
    expect(decoded.value).toStrictEqual([0, ["", "b"], false]);
  });

  it("rejects empty values", () => {
    const decoded = decode(type, [null, null, undefined]);
    assertFailure(decoded);
  });

  it("decodes failures properly", () => {
    let decoded = decode(type, [5]);
    assertFailure(decoded);
    expect(decoded.error).toHaveLength(1);
    expect(decoded.error[0]).toMatchObject({
      value: [5],
      context: [{ index: null, type }],
    });

    decoded = decode(type, [5, [5, "yo"], true]);
    assertFailure(decoded);
    expect(decoded.error).toHaveLength(1);
    expect(decoded.error[0]).toMatchObject({
      value: 5,
      context: [
        { index: null, type },
        { index: 1, type: subType },
        { index: 0, type: string() },
      ],
    });
  });

  it("always returns a clone from decode()", () => {
    const input = [5, ["a", "b"], true];
    const decoded = decode(type, input);
    assertSuccess(decoded);
    expect(decoded.value).not.toBe(input);
  });

  it("rejects obvious cases in decode()", () => {
    expect(decode(type, null)).toSatisfy(isFailure);
    expect(decode(type, undefined)).toSatisfy(isFailure);
    expect(decode(type, true)).toSatisfy(isFailure);
    expect(decode(type, false)).toSatisfy(isFailure);
    expect(decode(type, 0)).toSatisfy(isFailure);
    expect(decode(type, 5)).toSatisfy(isFailure);
    expect(decode(type, "")).toSatisfy(isFailure);
    expect(decode(type, "yo")).toSatisfy(isFailure);
    expect(decode(type, {})).toSatisfy(isFailure);
  });
});
