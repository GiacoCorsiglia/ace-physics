import * as s from "./schema";

describe("number schema", () => {
  const schema = s.number();

  it("has null default value", () => {
    expect(schema.default()).toBe(null);
  });

  it("accepts and rejects correctly in decode() and is()", () => {
    expect(schema.decode(null)).toSatisfy(s.isFailure);
    expect(schema.decode(undefined)).toSatisfy(s.isFailure);
    expect(schema.decode(true)).toSatisfy(s.isFailure);
    expect(schema.decode(false)).toSatisfy(s.isFailure);

    expect(schema.decode(0)).toSatisfy(s.isOk);
    expect(schema.decode(5)).toSatisfy(s.isOk);

    expect(schema.decode("")).toSatisfy(s.isFailure);
    expect(schema.decode("yo")).toSatisfy(s.isFailure);
    expect(schema.decode([])).toSatisfy(s.isFailure);
    expect(schema.decode({})).toSatisfy(s.isFailure);

    expect(schema.is(null)).toBe(false);
    expect(schema.is(undefined)).toBe(false);
    expect(schema.is(true)).toBe(false);
    expect(schema.is(false)).toBe(false);
    expect(schema.is("")).toBe(false);
    expect(schema.is("yo")).toBe(false);

    expect(schema.is(0)).toBe(true);
    expect(schema.is(5)).toBe(true);

    expect(schema.is([])).toBe(false);
    expect(schema.is({})).toBe(false);
  });

  it("decodes properly", () => {});

  it("is nullable by default", () => {});
});

describe("array schema", () => {
  const schema = s.array(s.string());

  it("has empty array default value", () => {
    expect(schema.default()).toStrictEqual([]);
  });

  it("accepts an empty array in decode() and is()", () => {
    expect(schema.decode([])).toSatisfy(s.isOk);
    expect(schema.is([])).toBe(true);
  });

  it("accepts matching scalar cases in decode() and is()", () => {
    expect(schema.decode(["hello"])).toSatisfy(s.isOk);
    expect(schema.decode(["hello", "there", "hi"])).toSatisfy(s.isOk);

    expect(schema.is(["hello"])).toBe(true);
    expect(schema.is(["hello", "there", "hi"])).toBe(true);
  });

  it("rejects failing scalar cases in decode() and is()", () => {
    expect(schema.decode([5])).toSatisfy(s.isFailure);
    expect(schema.decode(["hello", 5])).toSatisfy(s.isFailure);
    expect(schema.decode(["hello", 5, "null", null])).toSatisfy(s.isFailure);

    expect(schema.is([5])).toBe(false);
    expect(schema.is(["hello", 5])).toBe(false);
    expect(schema.is(["hello", 5, "null", null])).toBe(false);
  });

  it("accepts recursively matching cases in decode() and is()", () => {
    const schema = s.array(s.array(s.string()));
    expect(schema.decode([["hello"]])).toSatisfy(s.isOk);
    expect(schema.decode([["hello"], ["hi", "bye"], ["yo"]])).toSatisfy(s.isOk);

    expect(schema.is([["hello"]])).toBe(true);
    expect(schema.is([["hello"], ["hi", "bye"], ["yo"]])).toBe(true);
  });

  it("rejects recursively failing cases in decode() and is()", () => {
    const schema = s.array(s.array(s.string()));
    expect(schema.decode([["hello", 5]])).toSatisfy(s.isFailure);
    expect(schema.decode([["hi", "bye"], ["yo", "yo"], 5])).toSatisfy(
      s.isFailure
    );
    expect(schema.decode([["hello"], ["there", 5], null])).toSatisfy(
      s.isFailure
    );

    expect(schema.is([["hello", 5]])).toBe(false);
    expect(schema.is([["hi", "bye"], ["yo", "yo"], 5])).toBe(false);
    expect(schema.is([["hello"], ["there", 5], null])).toBe(false);
  });

  it("rejects obvious cases in decode() and is()", () => {
    expect(schema.decode(null)).toSatisfy(s.isFailure);
    expect(schema.decode(undefined)).toSatisfy(s.isFailure);
    expect(schema.decode(true)).toSatisfy(s.isFailure);
    expect(schema.decode(false)).toSatisfy(s.isFailure);
    expect(schema.decode(0)).toSatisfy(s.isFailure);
    expect(schema.decode(5)).toSatisfy(s.isFailure);
    expect(schema.decode("")).toSatisfy(s.isFailure);
    expect(schema.decode("yo")).toSatisfy(s.isFailure);
    expect(schema.decode({})).toSatisfy(s.isFailure);

    expect(schema.is(null)).toBe(false);
    expect(schema.is(undefined)).toBe(false);
    expect(schema.is(true)).toBe(false);
    expect(schema.is(false)).toBe(false);
    expect(schema.is("")).toBe(false);
    expect(schema.is("yo")).toBe(false);
    expect(schema.is(0)).toBe(false);
    expect(schema.is(5)).toBe(false);
    expect(schema.is({})).toBe(false);
  });
});
