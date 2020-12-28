import * as f from "schema/fields";
import { model } from "./model";

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
    const otherFieldOne = f.number();
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
