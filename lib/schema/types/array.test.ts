import { array } from "./array";
import { decode } from "./decode";
import { string } from "./primitives";
import {
  assertFailure,
  assertSuccess,
  isFailure,
  isSuccess,
} from "./test-helpers";

describe("array", () => {
  const type = array(string());

  it("accepts an empty array in decode()", () => {
    expect(decode(type, [])).toSatisfy(isSuccess);
  });

  it("accepts matching scalar cases in decode()", () => {
    expect(decode(type, ["hello"])).toSatisfy(isSuccess);
    expect(decode(type, ["hello", "there", "hi"])).toSatisfy(isSuccess);
  });

  it("rejects failing scalar cases in decode()", () => {
    expect(decode(type, [5])).toSatisfy(isFailure);
    expect(decode(type, ["hello", 5])).toSatisfy(isFailure);
    expect(decode(type, ["hello", 5, "null", null])).toSatisfy(isFailure);
  });

  it("accepts recursively matching cases in decode()", () => {
    const type = array(array(string()));
    expect(decode(type, [["hello"]])).toSatisfy(isSuccess);
    expect(decode(type, [["hello"], ["hi", "bye"], ["yo"]])).toSatisfy(
      isSuccess,
    );
  });

  it("rejects recursively failing cases in decode()", () => {
    const type = array(array(string()));
    expect(decode(type, [["hello", 5]])).toSatisfy(isFailure);
    expect(decode(type, [["hi", "bye"], ["yo", "yo"], 5])).toSatisfy(isFailure);
    expect(decode(type, [["hello"], ["there", 5], null])).toSatisfy(isFailure);
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

  it("decodes successes properly", () => {
    let decoded = decode(type, []);
    assertSuccess(decoded);
    expect(decoded.value).toStrictEqual([]);

    decoded = decode(type, ["hi", "bi"]);
    assertSuccess(decoded);
    expect(decoded.value).toStrictEqual(["hi", "bi"]);
  });

  it("decodes failures properly", () => {
    let decoded = decode(type, "not an array");
    assertFailure(decoded);
    expect(decoded.error).toHaveLength(1);
    expect(decoded.error[0]).toMatchObject({
      value: "not an array",
      context: [{ index: null, type }],
    });

    decoded = decode(type, ["hi", 5, 7]);
    assertFailure(decoded);
    expect(decoded.error).toHaveLength(2);
    expect(decoded.error[0]).toMatchObject({
      value: 5,
      context: [
        { index: null, type },
        { index: 1, type: string() },
      ],
    });
    expect(decoded.error[1]).toMatchObject({
      value: 7,
      context: [
        { index: null, type },
        { index: 2, type: string() },
      ],
    });
  });

  it("decodes recursive failures properly", () => {
    const subType = array(string());
    const type = array(subType);
    const decoded = decode(type, ["a", ["b", null]]);
    assertFailure(decoded);
    expect(decoded.error).toHaveLength(2);
    expect(decoded.error[0]).toMatchObject({
      value: "a",
      context: [
        { index: null, type },
        { index: 0, type: subType },
      ],
    });
    expect(decoded.error[1]).toMatchObject({
      value: null,
      context: [
        { index: null, type },
        { index: 1, type: subType },
        { index: 1, type: string() },
      ],
    });
  });
});
