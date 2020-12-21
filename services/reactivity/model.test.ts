import * as f from "schema/fields";
import { model } from "./model";

describe("model", () => {
  const id = Symbol();

  it("constructs correctly for simple field", () => {
    const field = f.string();
    const m = model(field, ["path"], id);
    expect(m).toMatchObject({ field, path: ["path"], contextId: id });
  });

  it("constructs correctly for object field", () => {
    const subField = f.string();
    const field = f.object({ p: subField });
    const m = model(field, ["path"], id);
    expect(m).toMatchObject({
      field,
      path: ["path"],
      contextId: id,
      properties: {
        p: {
          field: subField,
          path: ["path", "p"],
          contextId: id,
        },
      },
    });
  });

  it("constructs correctly for tuple fields", () => {
    const subField1 = f.string();
    const subField2 = f.number();
    const field = f.tuple(subField1, subField2);
    const m = model(field, ["path"], id);
    expect(m).toMatchObject({
      field,
      path: ["path"],
      contextId: id,
      elements: [
        { field: subField1, path: ["path", 0], contextId: id },
        { field: subField2, path: ["path", 1], contextId: id },
      ],
    });
  });

  it("constructs correctly for array fields", () => {
    const subField = f.string();
    const field = f.array(subField);
    const m = model(field, ["path"], id);
    expect(m).toMatchObject({
      field,
      path: ["path"],
      contextId: id,
    });
    // Dynamically creates elements.
    expect(m.elements[0]).toMatchObject({
      field: subField,
      path: ["path", 0],
      contextId: id,
    });
    // Even if they're accessed out of order.
    expect(m.elements[5]).toMatchObject({
      field: subField,
      path: ["path", 5],
      contextId: id,
    });
    // Caches created elements.
    expect(m.elements[3]).toBe(m.elements[3]);
  });

  it("constructs correctly for choose fields", () => {
    const otherFieldOne = f.number();
    const chooseOne = f.chooseOne(["a", "b"], otherFieldOne);

    const otherFieldAll = f.string();
    const chooseAll = f.chooseAll(["a", "b"], otherFieldAll);

    expect(model(chooseOne, ["path"], id)).toMatchObject({
      field: chooseOne,
      path: ["path"],
      contextId: id,
      other: {
        field: otherFieldOne,
        path: ["path", "other"],
        contextId: id,
      },
    });

    expect(model(chooseAll, ["path"], id)).toMatchObject({
      field: chooseAll,
      path: ["path"],
      contextId: id,
      other: {
        field: otherFieldAll,
        path: ["path", "other"],
        contextId: id,
      },
    });
  });
});
