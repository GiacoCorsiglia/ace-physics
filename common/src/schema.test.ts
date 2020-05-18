import * as s from "./schema";

function assertOk<T>(decoded: s.Decoded<T>): asserts decoded is s.Ok<T> {
  expect(decoded).toSatisfy(s.isOk);
}

function assertFailure<T>(
  decoded: s.Decoded<T>
): asserts decoded is s.Failure<T> {
  expect(decoded).toSatisfy(s.isFailure);
}

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

  it("decodes successes properly", () => {
    let decoded = schema.decode(0);
    assertOk(decoded);
    expect(decoded.value).toBe(0);

    decoded = schema.decode(5);
    assertOk(decoded);
    expect(decoded.value).toBe(5);
  });

  it("decodes failures properly", () => {
    let decoded = schema.decode("not a number");
    assertFailure(decoded);
    expect(decoded.errors).toHaveLength(1);
    expect(decoded.errors[0]).toMatchObject({
      value: "not a number",
      context: [{ index: null, schema }],
    });
  });
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

  it("decodes successes properly", () => {
    let decoded = schema.decode([]);
    assertOk(decoded);
    expect(decoded.value).toStrictEqual([]);

    decoded = schema.decode(["hi", "bi"]);
    assertOk(decoded);
    expect(decoded.value).toStrictEqual(["hi", "bi"]);
  });

  it("decodes failures properly", () => {
    let decoded = schema.decode("not an array");
    assertFailure(decoded);
    expect(decoded.errors).toHaveLength(1);
    expect(decoded.errors[0]).toMatchObject({
      value: "not an array",
      context: [{ index: null, schema }],
    });

    decoded = schema.decode(["hi", 5, 7]);
    assertFailure(decoded);
    expect(decoded.errors).toHaveLength(2);
    expect(decoded.errors[0]).toMatchObject({
      value: 5,
      context: [
        { index: null, schema },
        { index: 1, schema: s.string() },
      ],
    });
    expect(decoded.errors[1]).toMatchObject({
      value: 7,
      context: [
        { index: null, schema },
        { index: 2, schema: s.string() },
      ],
    });
  });

  it("decodes recursive failures properly", () => {
    const subSchema = s.array(s.string());
    const schema = s.array(subSchema);
    let decoded = schema.decode(["a", ["b", null]]);
    assertFailure(decoded);
    expect(decoded.errors).toHaveLength(2);
    expect(decoded.errors[0]).toMatchObject({
      value: "a",
      context: [
        { index: null, schema },
        { index: 0, schema: subSchema },
      ],
    });
    expect(decoded.errors[1]).toMatchObject({
      value: null,
      context: [
        { index: null, schema },
        { index: 1, schema: subSchema },
        { index: 1, schema: s.string() },
      ],
    });
  });
});

describe("record schema", () => {
  const schema = s.record({
    numberProp: s.number(),
    stringProp1: s.string(),
    stringProp2: s.string().withDefault("default"),
  });

  test("has default value with property defaults", () => {
    expect(schema.default()).toStrictEqual<s.TypeOf<typeof schema>>({
      numberProp: null,
      stringProp1: "",
      stringProp2: "default",
    });
  });

  it("allows all properties to be empty in decode() and is()", () => {
    expect(schema.decode({})).toSatisfy(s.isOk);
    expect(schema.is({})).toBe(true);
  });

  it("accepts matching scalar cases in decode() and is()", () => {
    expect(
      schema.decode({
        numberProp: null,
        stringProp1: "foo",
      })
    ).toSatisfy(s.isOk);
    expect(
      schema.decode({
        numberProp: 5,
        stringProp1: "foo",
        stringProp2: "bar",
      })
    ).toSatisfy(s.isOk);

    expect(
      schema.is({
        numberProp: null,
        stringProp1: "foo",
      })
    ).toBe(true);
    expect(
      schema.is({
        numberProp: 5,
        stringProp1: "foo",
        stringProp2: "bar",
      })
    ).toBe(true);
  });

  it("rejects failing scalar cases in decode() and is()", () => {
    expect(
      schema.decode({
        numberProp: true,
      })
    ).toSatisfy(s.isFailure);
    expect(
      schema.decode({
        numberProp: false,
        stringProp1: [],
      })
    ).toSatisfy(s.isFailure);

    expect(
      schema.is({
        numberProp: true,
      })
    ).toBe(false);
    expect(
      schema.is({
        numberProp: false,
        stringProp1: [],
      })
    ).toBe(false);
  });

  it("accepts recursively matching cases in decode() and is()", () => {
    const schema = s.record({
      num: s.number(),
      rec: s.record({
        str: s.string(),
      }),
    });
    expect(
      schema.decode({
        num: 5,
        rec: {
          str: "hi",
        },
      })
    ).toSatisfy(s.isOk);
    expect(
      schema.is({
        num: 5,
        rec: {
          str: "hi",
        },
      })
    ).toBe(true);
  });

  it("rejects recursively failing cases in decode() and is()", () => {
    const schema = s.record({
      num: s.number(),
      rec: s.record({
        str: s.string(),
      }),
    });
    expect(
      schema.decode({
        num: 5,
        rec: {
          str: 7,
        },
      })
    ).toSatisfy(s.isFailure);
    expect(
      schema.is({
        num: 5,
        rec: {
          str: 7,
        },
      })
    ).toBe(false);
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

    expect(schema.is(null)).toBe(false);
    expect(schema.is(undefined)).toBe(false);
    expect(schema.is(true)).toBe(false);
    expect(schema.is(false)).toBe(false);
    expect(schema.is("")).toBe(false);
    expect(schema.is("yo")).toBe(false);
    expect(schema.is(0)).toBe(false);
    expect(schema.is(5)).toBe(false);
  });

  it("decodes successes properly", () => {
    const empty = {};
    let decoded = schema.decode(empty);
    assertOk(decoded);
    expect(decoded.value).toStrictEqual(empty);

    decoded = schema.decode({
      numberProp: 5,
      stringProp1: "yo",
    });
    assertOk(decoded);
    expect(decoded.value).toStrictEqual({
      numberProp: 5,
      stringProp1: "yo",
    });
  });

  it("always returns a clone from decode()", () => {
    const empty = {};
    let decoded = schema.decode(empty);
    assertOk(decoded);
    expect(decoded.value).not.toBe(empty);
  });

  it("preserves extra properties in successful decode()", () => {
    const o2 = {
      numberProp: 5,
      stringProp1: "yo",
      extra: "blah",
    };
    let decoded = schema.decode(o2);
    assertOk(decoded);
    expect(decoded.value).toStrictEqual(o2);
  });

  it("decodes failures properly", () => {
    let decoded = schema.decode({
      numberProp: "string!",
      stringProp1: 5,
    });
    assertFailure(decoded);
    expect(decoded.errors).toHaveLength(2);
    // NOTE: This ordering depends on the ordering of the object, which is
    // not really sensible.
    expect(decoded.errors[0]).toMatchObject({
      value: "string!",
      context: [
        { index: null, schema },
        { index: "numberProp", schema: s.number() },
      ],
    });
    expect(decoded.errors[1]).toMatchObject({
      value: 5,
      context: [
        { index: null, schema },
        { index: "stringProp1", schema: s.string() },
      ],
    });
  });

  it("decodes recursive failures properly", () => {
    const subSchema = s.record({
      num: s.number(),
    });
    const schema = s.record({
      str: s.string(),
      rec: subSchema,
    });
    let decoded = schema.decode({
      str: 5,
      rec: { num: "string!" },
    });
    assertFailure(decoded);
    expect(decoded.errors).toHaveLength(2);
    expect(decoded.errors[0]).toMatchObject({
      value: 5,
      context: [
        { index: null, schema },
        { index: "str", schema: s.string() },
      ],
    });
    expect(decoded.errors[1]).toMatchObject({
      value: "string!",
      context: [
        { index: null, schema },
        { index: "rec", schema: subSchema },
        { index: "num", schema: s.number() },
      ],
    });
  });
});
