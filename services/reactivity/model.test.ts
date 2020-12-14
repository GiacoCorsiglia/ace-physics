import * as f from "schema/fields";
import { model } from "./model";

describe("model", () => {
  it("constructs correctly for simple field", () => {
    const field = f.string();
    const m = model(field, ["path"]);
    expect(m).toMatchObject({ field, path: ["path"] });
  });

  it("constructs correctly for object field", () => {
    const subField = f.string();
    const field = f.object({ p: subField });
    const m = model(field, ["path"]);
    expect(m).toMatchObject({
      field,
      path: ["path"],
      properties: {
        p: {
          field: subField,
          path: ["path", "p"],
        },
      },
    });
  });

  it("constructs correctly for tuple fields", () => {
    const subField1 = f.string();
    const subField2 = f.number();
    const field = f.tuple(subField1, subField2);
    const m = model(field, ["path"]);
    expect(m).toMatchObject({
      field,
      path: ["path"],
      elements: [
        { field: subField1, path: ["path", 0] },
        { field: subField2, path: ["path", 1] },
      ],
    });
  });

  it("constructs correctly for array fields", () => {
    const subField = f.string();
    const field = f.array(subField);
    const m = model(field, ["path"]);
    expect(m).toMatchObject({
      field,
      path: ["path"],
    });
    // Dynamically creates elements.
    expect(m.elements[0]).toMatchObject({
      field: subField,
      path: ["path", 0],
    });
    // Even if they're accessed out of order.
    expect(m.elements[5]).toMatchObject({
      field: subField,
      path: ["path", 5],
    });
    // Caches created elements.
    expect(m.elements[3]).toBe(m.elements[3]);
  });

  it("constructs correctly for choose fields", () => {
    const otherFieldOne = f.number();
    const chooseOne = f.chooseOne(["a", "b"], otherFieldOne);

    const otherFieldAll = f.string();
    const chooseAll = f.chooseAll(["a", "b"], otherFieldAll);

    expect(model(chooseOne, ["path"])).toMatchObject({
      field: chooseOne,
      path: ["path"],
      other: {
        field: otherFieldOne,
        path: ["path", "other"],
      },
    });

    expect(model(chooseAll, ["path"])).toMatchObject({
      field: chooseAll,
      path: ["path"],
      other: {
        field: otherFieldAll,
        path: ["path", "other"],
      },
    });
  });
});
