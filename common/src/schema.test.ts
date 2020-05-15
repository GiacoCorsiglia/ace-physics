import * as s from "./schema";

describe("number schema", () => {
  const schema = s.number();
  const required = schema.required();

  it("has null default value", () => {
    expect(schema.default()).toBe(null);
  });

  it("accepts and rejects correctly in decode() and is()", () => {
    expect(schema.decode(true)).toSatisfy(s.isFailure);
    expect(schema.decode(false)).toSatisfy(s.isFailure);

    expect(schema.decode(0)).toSatisfy(s.isOk);
    expect(schema.decode(5)).toSatisfy(s.isOk);

    expect(schema.decode("")).toSatisfy(s.isFailure);
    expect(schema.decode("yo")).toSatisfy(s.isFailure);
    expect(schema.decode([])).toSatisfy(s.isFailure);
    expect(schema.decode({})).toSatisfy(s.isFailure);

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

  it("is nullable by default", () => {
    expect(schema.decode(null)).toSatisfy(s.isOk);
    expect(schema.decode(undefined)).toSatisfy(s.isOk);

    expect(schema.is(null)).toBe(true);
    expect(schema.is(undefined)).toBe(true);
  });

  it("produces a required version", () => {
    expect(required.default()).toBe(null);

    expect(required.decode(null)).toSatisfy(s.isFailure);
    expect(required.decode(undefined)).toSatisfy(s.isFailure);

    expect(required.is(null)).toBe(false);
    expect(required.is(undefined)).toBe(false);
  });
});

describe("required (non-nullable) schema", () => {
  const schema = s.string();
  const required = schema.required();

  it("doesn't affect default", () => {
    expect(required.default()).toBe(schema.default());
  });

  it("rejects Empty but otherwise doesn't affect decode()", () => {
    // No longer nullable.
    expect(s.isFailure(required.decode(null))).toBe(true);
    expect(s.isFailure(required.decode(undefined))).toBe(true);

    // Otherwise undisturbed.
    expect(s.isOk(required.decode(true))).toBe(s.isOk(schema.decode(true)));
    expect(s.isOk(required.decode(false))).toBe(s.isOk(schema.decode(false)));
    expect(s.isOk(required.decode(""))).toBe(s.isOk(schema.decode("")));
    expect(s.isOk(required.decode("yo"))).toBe(s.isOk(schema.decode("yo")));
    expect(s.isOk(required.decode(0))).toBe(s.isOk(schema.decode(0)));
    expect(s.isOk(required.decode(5))).toBe(s.isOk(schema.decode(5)));
    expect(s.isOk(required.decode([]))).toBe(s.isOk(schema.decode([])));
    expect(s.isOk(required.decode({}))).toBe(s.isOk(schema.decode({})));
  });

  it("rejects Empty but otherwise doesn't affect is()", () => {
    // No longer nullable.
    expect(required.is(null)).toBe(false);
    expect(required.is(undefined)).toBe(false);

    // Otherwise undisturbed.
    expect(required.is(true)).toBe(schema.is(true));
    expect(required.is(false)).toBe(schema.is(false));
    expect(required.is("")).toBe(schema.is(""));
    expect(required.is("yo")).toBe(schema.is("yo"));
    expect(required.is(0)).toBe(schema.is(0));
    expect(required.is(5)).toBe(schema.is(5));
    expect(required.is([])).toBe(schema.is([]));
    expect(required.is({})).toBe(schema.is({}));
  });
});

describe("array schema", () => {
  const schema = s.array(s.string());
  const required = schema.required();

  it("has empty array default value", () => {
    expect(schema.default()).toStrictEqual([]);
  });

  it("accepts an empty array in decode() and is()", () => {
    const schema = s.array(s.string().required());
    expect(schema.decode([])).toSatisfy(s.isOk);
    expect(schema.is([])).toBe(true);
  });

  it("accepts matching scalar cases in decode() and is()", () => {
    const schema = s.array(s.string());
    expect(schema.decode(["hello"])).toSatisfy(s.isOk);
    expect(schema.decode(["hello", "there"])).toSatisfy(s.isOk);
    expect(schema.decode(["hello", "there", null])).toSatisfy(s.isOk);

    expect(schema.is(["hello"])).toBe(true);
    expect(schema.is(["hello", "there"])).toBe(true);
    expect(schema.is(["hello", "there", null])).toBe(true);
  });

  it("rejects failing scalar cases in decode() and is()", () => {
    const schema = s.array(s.string());
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
    expect(
      schema.decode([
        ["hi", "bye"],
        ["yo", "yo"],
      ])
    ).toSatisfy(s.isOk);
    expect(schema.decode([["hello"], ["there", null], null])).toSatisfy(s.isOk);

    expect(schema.is([["hello"]])).toBe(true);
    expect(
      schema.is([
        ["hi", "bye"],
        ["yo", "yo"],
      ])
    ).toBe(true);
    expect(schema.is([["hello"], ["there", null], null])).toBe(true);
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
    expect(schema.decode(true)).toSatisfy(s.isFailure);
    expect(schema.decode(false)).toSatisfy(s.isFailure);
    expect(schema.decode(0)).toSatisfy(s.isFailure);
    expect(schema.decode(5)).toSatisfy(s.isFailure);
    expect(schema.decode("")).toSatisfy(s.isFailure);
    expect(schema.decode("yo")).toSatisfy(s.isFailure);
    expect(schema.decode({})).toSatisfy(s.isFailure);

    expect(schema.is(true)).toBe(false);
    expect(schema.is(false)).toBe(false);
    expect(schema.is("")).toBe(false);
    expect(schema.is("yo")).toBe(false);
    expect(schema.is(0)).toBe(false);
    expect(schema.is(5)).toBe(false);
    expect(schema.is({})).toBe(false);
  });

  it("is nullable by default", () => {
    expect(schema.decode(null)).toSatisfy(s.isOk);
    expect(schema.decode(undefined)).toSatisfy(s.isOk);

    expect(schema.is(null)).toBe(true);
    expect(schema.is(undefined)).toBe(true);
  });

  it("produces a required version", () => {
    expect(required.default()).toStrictEqual([]);

    expect(required.decode(null)).toSatisfy(s.isFailure);
    expect(required.decode(undefined)).toSatisfy(s.isFailure);

    expect(required.is(null)).toBe(false);
    expect(required.is(undefined)).toBe(false);
  });
});
