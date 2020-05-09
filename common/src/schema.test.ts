import * as s from "./schema";

describe("string schema", () => {
  it("has empty default value", () => {
    expect(s.string().default()).toBe("");
  });

  it("decodes correctly", () => {
    expect(s.isOk(s.string().decode(""))).toBe(true);
    expect(s.isOk(s.string().decode("yo"))).toBe(true);

    // Nullable.
    expect(s.isOk(s.string().decode(null))).toBe(true);
    expect(s.isOk(s.string().decode(undefined))).toBe(true);

    expect(s.isFailure(s.string().decode(5))).toBe(true);
    expect(s.isFailure(s.string().decode([]))).toBe(true);
    expect(s.isFailure(s.string().decode({}))).toBe(true);
  });
});

describe("required (non-nullable) schema", () => {
  const schema = s.string();
  const required = schema.required();

  it("doesn't affect default", () => {
    expect(required.default()).toBe(schema.default());
  });

  it("rejects Empty but otherwise doesn't affect decode", () => {
    // No longer nullable.
    expect(s.isFailure(required.decode(null))).toBe(true);
    expect(s.isFailure(required.decode(undefined))).toBe(true);

    // Otherwise undisturbed.
    expect(s.isOk(required.decode(""))).toBe(s.isOk(schema.decode("")));
    expect(s.isOk(required.decode("yo"))).toBe(s.isOk(schema.decode("yo")));
    expect(s.isOk(required.decode(5))).toBe(s.isOk(schema.decode(5)));
    expect(s.isOk(required.decode([]))).toBe(s.isOk(schema.decode([])));
    expect(s.isOk(required.decode({}))).toBe(s.isOk(schema.decode({})));
  });

  it("rejects Empty but otherwise doesn't affect is", () => {
    // No longer nullable.
    expect(required.is(null)).toBe(false);
    expect(required.is(undefined)).toBe(false);

    // Otherwise undisturbed.
    expect(required.is("")).toBe(schema.is(""));
    expect(required.is("yo")).toBe(schema.is("yo"));
    expect(required.is(5)).toBe(schema.is(5));
    expect(required.is([])).toBe(schema.is([]));
    expect(required.is({})).toBe(schema.is({}));
  });
});
