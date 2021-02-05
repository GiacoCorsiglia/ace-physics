import { decode } from "./decode";
import { optional } from "./optional";
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

  // eslint-disable-next-line jest/expect-expect
  it("rejects empty values", () => {
    const decoded = decode(type, [null, null, undefined]);
    assertFailure(decoded);
  });

  // eslint-disable-next-line jest/expect-expect
  it("requires full length for non-optional elements", () => {
    const type = tuple(number(), number());
    const decoded = decode(type, [1]);
    assertFailure(decoded);
  });

  // eslint-disable-next-line jest/expect-expect
  it("allows shorter length for optional elements", () => {
    const type = tuple(number(), optional(number()));
    const decoded = decode(type, [1]);
    assertSuccess(decoded);
  });

  // eslint-disable-next-line jest/expect-expect
  it("never allows longer length", () => {
    const type = tuple(number(), optional(number()));
    assertFailure(decode(type, [1, 2, 3]));
    assertFailure(decode(type, [1, undefined, 3]));
    assertFailure(decode(type, [1, undefined, undefined]));
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
