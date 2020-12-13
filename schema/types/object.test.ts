import { decode } from "./decode";
import { asExact, exact, object, partial } from "./object";
import { number, string } from "./primitives";
import {
  assertFailure,
  assertSuccess,
  isFailure,
  isSuccess,
} from "./test-helpers";

describe("object", () => {
  const type = object({
    numberProp: number(),
    stringProp1: string(),
    stringProp2: string(),
  });

  const partialType = partial({
    numberProp: number(),
    stringProp1: string(),
    stringProp2: string(),
  });

  it("partial allows some or all properties to be empty in decode()", () => {
    expect(decode(partialType, {})).toSatisfy(isSuccess);
    expect(
      decode(partialType, {
        numberProp: null,
        stringProp1: "foo",
      })
    ).toSatisfy(isSuccess);
  });

  it("accepts matching scalar cases in decode()", () => {
    expect(
      decode(type, {
        numberProp: 5,
        stringProp1: "foo",
        stringProp2: "bar",
      })
    ).toSatisfy(isSuccess);
  });

  it("rejects failing scalar cases in decode()", () => {
    expect(
      decode(type, {
        numberProp: true,
      })
    ).toSatisfy(isFailure);
    expect(
      decode(type, {
        numberProp: false,
        stringProp1: [],
      })
    ).toSatisfy(isFailure);
  });

  it("accepts recursively matching cases in decode()", () => {
    const type = object({
      num: number(),
      rec: object({
        str: string(),
      }),
    });
    expect(
      decode(type, {
        num: 5,
        rec: {
          str: "hi",
        },
      })
    ).toSatisfy(isSuccess);
  });

  it("rejects recursively failing cases in decode()", () => {
    const type = object({
      num: number(),
      rec: object({
        str: string(),
      }),
    });
    expect(
      decode(type, {
        num: 5,
        rec: {
          str: 7,
        },
      })
    ).toSatisfy(isFailure);
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
    expect(decode(type, ["yo"])).toSatisfy(isFailure);
  });

  it("decodes successes properly", () => {
    let decoded = decode(type, {
      numberProp: 5,
      stringProp1: "yo",
      stringProp2: "yo!",
    });
    assertSuccess(decoded);
    expect(decoded.value).toStrictEqual({
      numberProp: 5,
      stringProp1: "yo",
      stringProp2: "yo!",
    });
  });

  it("always returns a clone from decode()", () => {
    const orig = {
      numberProp: 5,
      stringProp1: "yo",
      stringProp2: "yo!",
    };
    let decoded = decode(type, orig);
    assertSuccess(decoded);
    expect(decoded.value).not.toBe(orig);
  });

  it("preserves extra properties in successful decode() by default", () => {
    const o2 = {
      numberProp: 5,
      stringProp1: "yo",
      stringProp2: "yo!",
      extra: "blah",
    };
    let decoded = decode(type, o2);
    assertSuccess(decoded);
    expect(decoded.value).toStrictEqual(o2);
  });

  it("strips extra properties in when exact", () => {
    const orig = { num: 5, extra: "blah" };

    const t1 = asExact(object({ num: number() }));
    let decoded = decode(t1, orig);
    assertSuccess(decoded);
    expect(decoded.value).toStrictEqual({ num: 5 });

    const t2 = exact({ num: number() });
    decoded = decode(t2, orig);
    assertSuccess(decoded);
    expect(decoded.value).toStrictEqual({ num: 5 });
  });

  it("decodes failures properly", () => {
    let decoded = decode(type, {
      numberProp: "string!",
      stringProp1: 5,
      // stringProp2 Missing
    });
    assertFailure(decoded);
    expect(decoded.error).toHaveLength(3);
    // NOTE: This ordering depends on the ordering of the object, which is
    // not really sensible.
    expect(decoded.error[0]).toMatchObject({
      value: "string!",
      context: [
        { index: null, type },
        { index: "numberProp", type: number() },
      ],
    });
    expect(decoded.error[1]).toMatchObject({
      value: 5,
      context: [
        { index: null, type },
        { index: "stringProp1", type: string() },
      ],
    });
  });

  it("decodes recursive failures properly", () => {
    const subType = object({
      num: number(),
    });
    const type = object({
      str: string(),
      rec: subType,
    });
    let decoded = decode(type, {
      str: 5,
      rec: { num: "string!" },
    });
    assertFailure(decoded);
    expect(decoded.error).toHaveLength(2);
    expect(decoded.error[0]).toMatchObject({
      value: 5,
      context: [
        { index: null, type },
        { index: "str", type: string() },
      ],
    });
    expect(decoded.error[1]).toMatchObject({
      value: "string!",
      context: [
        { index: null, type },
        { index: "rec", type: subType },
        { index: "num", type: number() },
      ],
    });
  });
});
