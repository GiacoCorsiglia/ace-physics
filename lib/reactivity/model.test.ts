import * as f from "@/schema/fields";
import { isSet, model } from "./model";

describe("model", () => {
  // Just use a symbol here to make sure the same value is passed down.
  const Context = Symbol() as any;

  it("constructs correctly for simple field", () => {
    const field = f.string();
    const m = model(field, ["path"], Context);
    expect(m).toMatchObject({ field, path: ["path"], Context });
  });

  it("constructs correctly for object field", () => {
    const subField = f.string();
    const field = f.object({ p: subField });
    const m = model(field, ["path"], Context);
    expect(m).toMatchObject({
      field,
      path: ["path"],
      Context,
      properties: {
        p: {
          field: subField,
          path: ["path", "p"],
          Context,
        },
      },
    });
  });

  it("constructs correctly for tuple fields", () => {
    const subField1 = f.string();
    const subField2 = f.number();
    const field = f.tuple(subField1, subField2);
    const m = model(field, ["path"], Context);
    expect(m).toMatchObject({
      field,
      path: ["path"],
      Context,
      elements: [
        { field: subField1, path: ["path", 0], Context },
        { field: subField2, path: ["path", 1], Context },
      ],
    });
  });

  it("constructs correctly for array fields", () => {
    const subField = f.string();
    const field = f.array(subField);
    const m = model(field, ["path"], Context);
    expect(m).toMatchObject({
      field,
      path: ["path"],
      Context,
    });
    // Dynamically creates elements.
    expect(m.elements[0]).toMatchObject({
      field: subField,
      path: ["path", 0],
      Context,
    });
    // Even if they're accessed out of order.
    expect(m.elements[5]).toMatchObject({
      field: subField,
      path: ["path", 5],
      Context,
    });
    // Caches created elements.
    expect(m.elements[3]).toBe(m.elements[3]);
  });

  it("constructs correctly for choose fields", () => {
    const otherFieldOne = f.string();
    const chooseOne = f.chooseOne(["a", "b"], otherFieldOne);

    const otherFieldAll = f.string();
    const chooseAll = f.chooseAll(["a", "b"], otherFieldAll);

    expect(model(chooseOne, ["path"], Context)).toMatchObject({
      field: chooseOne,
      path: ["path"],
      Context,
      other: {
        field: otherFieldOne,
        path: ["path", "other"],
        Context,
      },
    });

    expect(model(chooseAll, ["path"], Context)).toMatchObject({
      field: chooseAll,
      path: ["path"],
      Context,
      other: {
        field: otherFieldAll,
        path: ["path", "other"],
        Context,
      },
    });
  });
});

describe("isSet", () => {
  const C = {} as any;

  it("works for booleans", () => {
    const m = model(f.boolean(), [], C);
    expect(isSet(m, false)).toBe(true);
    expect(isSet(m, true)).toBe(true);
    expect(isSet(m, undefined)).toBe(false);
  });

  it("works for numbers", () => {
    const m = model(f.number(), [], C);
    expect(isSet(m, 0)).toBe(true);
    expect(isSet(m, 1)).toBe(true);
    expect(isSet(m, -1)).toBe(true);
    expect(isSet(m, undefined)).toBe(false);
  });

  it("works for strings", () => {
    const m = model(f.string(), [], C);
    expect(isSet(m, "hello")).toBe(true);
    expect(isSet(m, "")).toBe(false);
    expect(isSet(m, undefined)).toBe(false);
  });

  it("works for cases", () => {
    const m = model(f.cases("case 1", "case 2"), [], C);
    expect(isSet(m, "case 1")).toBe(true);
    expect(isSet(m, "case 1")).toBe(true);
    expect(isSet(m, undefined)).toBe(false);
  });

  it("works for chooseOne", () => {
    const m = model(f.chooseOne(["choice 1", "choice 2"], f.string()), [], C);
    expect(isSet(m, { selected: "choice 1" })).toBe(true);
    expect(isSet(m, { selected: "choice 1", other: "other" })).toBe(true);
    expect(isSet(m, { other: "other" })).toBe(true);

    expect(isSet(m, {})).toBe(false);
    expect(isSet(m, { selected: undefined, other: undefined })).toBe(false);
    expect(isSet(m, { other: "" })).toBe(false);
    expect(isSet(m, { selected: undefined, other: undefined })).toBe(false);
    expect(isSet(m, undefined)).toBe(false);
  });

  it("works for chooseAll", () => {
    const m = model(f.chooseAll(["choice 1", "choice 2"], f.string()), [], C);
    expect(isSet(m, { selected: ["choice 1"] })).toBe(true);
    expect(isSet(m, { selected: ["choice 1", "choice 2"] })).toBe(true);
    expect(isSet(m, { selected: ["choice 1"], other: "other" })).toBe(true);
    expect(isSet(m, { other: "other" })).toBe(true);
    expect(isSet(m, { selected: [], other: "other" })).toBe(true);

    expect(isSet(m, {})).toBe(false);
    expect(isSet(m, { selected: undefined, other: undefined })).toBe(false);
    expect(isSet(m, { other: "" })).toBe(false);
    expect(isSet(m, { selected: [], other: "" })).toBe(false);
    expect(isSet(m, { selected: [] })).toBe(false);
    expect(isSet(m, undefined)).toBe(false);
  });

  it("works for tuple", () => {
    const m = model(f.tuple(f.boolean(), f.string()), [], C);
    expect(isSet(m, [false, "str"])).toBe(true);

    expect(isSet(m, [false, ""])).toBe(false);
    expect(isSet(m, [undefined, "str"])).toBe(false);
    // eslint-disable-next-line no-sparse-arrays
    expect(isSet(m, [, "str"])).toBe(false);
    expect(isSet(m, [true, undefined])).toBe(false);
    expect(isSet(m, undefined)).toBe(false);
  });

  it("works for array", () => {
    const m = model(f.array(f.string()), [], C);
    expect(isSet(m, ["yo"])).toBe(true);
    expect(isSet(m, ["yo", "dude"])).toBe(true);

    expect(isSet(m, ["yo", ""])).toBe(false);
    expect(isSet(m, ["yo", undefined])).toBe(false);
    expect(isSet(m, ["yo", undefined, "dude"])).toBe(false);
    expect(isSet(m, [])).toBe(false);
    expect(isSet(m, undefined)).toBe(false);
  });

  it("works for object", () => {
    const m = model(f.object({ a: f.string(), b: f.boolean() }), [], C);
    expect(isSet(m, { a: "str", b: true })).toBe(true);
    expect(isSet(m, { a: "str", b: false })).toBe(true);

    expect(isSet(m, { a: "str", b: undefined })).toBe(false);
    expect(isSet(m, { a: "str" })).toBe(false);
    expect(isSet(m, { a: "", b: true })).toBe(false);
    expect(isSet(m, {})).toBe(false);
    expect(isSet(m, undefined)).toBe(false);
  });
});
