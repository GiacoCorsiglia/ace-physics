import { act, render } from "@testing-library/react";
import React from "react";
import * as s from "./common/schema";
import { Provider, useFields, useStore, WithFields } from "./state";

type TestSchema = typeof TestSchema["properties"];
const TestSchema = s.record({
  prop1: s.number(),
  // NOTE: These defaults are ignored!
  prop2: s.string().withDefault("initial value"),
  prop3: s.record({
    subProp1: s.string().withDefault("initial sub value"),
    // Records nested in records should work but are not recommended.
    subProp2: s.record({
      subSubProp: s.string().withDefault("initial sub sub value"),
    }),
  }),
  tuple: s.tuple(s.string(), s.tuple(s.number(), s.number())),
  array: s.array(s.optional(s.number())),
} as const);

describe("Provider", () => {
  it("creates Store from schema", () => {
    let store;

    function C() {
      store = useStore();
      return <div></div>;
    }

    render(
      <Provider schema={TestSchema}>
        <C />
      </Provider>
    );

    expect(store).toMatchObject({ schema: TestSchema });
    // The Fields here are incomplete because we can't check method equality.
    expect(store).toMatchObject({
      fields: {
        prop1: {
          schema: TestSchema.properties.prop1,
          value: undefined,
          validity: { valid: true },
        },
        prop2: {
          schema: TestSchema.properties.prop2,
          value: undefined,
          validity: { valid: true },
        },
        prop3: {
          schema: TestSchema.properties.prop3,
          value: undefined,
          validity: { valid: true },
          properties: {
            subProp1: {
              schema: TestSchema.properties.prop3.properties.subProp1,
              value: undefined,
              validity: { valid: true },
            },
            subProp2: {
              schema: TestSchema.properties.prop3.properties.subProp2,
              validity: { valid: true },
              value: undefined,
              properties: {
                subSubProp: {
                  schema:
                    TestSchema.properties.prop3.properties.subProp2.properties
                      .subSubProp,
                  value: undefined,
                  validity: { valid: true },
                },
              },
            },
          },
        },
      },
    });
  });

  it("does not recreate store on re-render", () => {
    let store;

    function C() {
      store = useStore();
      return <div></div>;
    }

    const { rerender } = render(
      <Provider schema={TestSchema}>
        <C />
      </Provider>
    );

    const lastStore = store;

    rerender(
      <Provider schema={TestSchema}>
        <C />
      </Provider>
    );

    expect(lastStore).toBe(store);
  });

  it("respects initial state", () => {
    let store: any;

    function C() {
      store = useStore();
      return <div></div>;
    }

    const { rerender } = render(
      <Provider
        schema={TestSchema}
        initial={{
          prop1: 5,
          prop2: "updated value",
        }}
      >
        <C />
      </Provider>
    );

    expect(store.fields.prop1.value).toBe(5);
    expect(store.fields.prop2.value).toBe("updated value");
    expect(store.fields.prop3.value).toBeUndefined();

    act(() => {
      store.fields.prop1.set(10);
    });

    expect(store.fields.prop1.value).toBe(10);

    // Make sure it doesn't reset the state after the first render.
    rerender(
      <Provider
        schema={TestSchema}
        initial={{
          prop1: 5,
          prop2: "updated value",
        }}
      >
        <C />
      </Provider>
    );

    expect(store.fields.prop1.value).toBe(10);
  });

  it("calls onChange correctly", () => {
    let store: any;

    function C() {
      store = useStore();
      return <div></div>;
    }

    const onChange = jest.fn((updated: any) => undefined);

    render(
      <Provider schema={TestSchema} onChange={onChange}>
        <C />
      </Provider>
    );

    expect(onChange.mock.calls.length).toBe(0);

    act(() => {
      store.fields.prop1.set(5);
    });

    expect(onChange.mock.calls.length).toBe(1);
    expect(onChange.mock.calls[0][0]).toMatchObject({
      prop1: 5,
    });

    act(() => {
      store.fields.prop2.set("updated value");
    });

    expect(onChange.mock.calls.length).toBe(2);
    expect(onChange.mock.calls[1][0]).toMatchObject({
      prop1: 5,
    });
  });
});

describe("useFields", () => {
  it("provides fields for properties", () => {
    let prop1Field, prop2Field;

    function C() {
      const { prop1, prop2 } = useFields(TestSchema);
      prop1Field = prop1;
      prop2Field = prop2;
      return <div></div>;
    }

    const { rerender } = render(
      <Provider schema={TestSchema}>
        <C />
      </Provider>
    );

    expect(prop1Field).toMatchObject({
      schema: TestSchema.properties.prop1,
    });
    expect(prop2Field).toMatchObject({
      schema: TestSchema.properties.prop2,
    });

    // Also doesn't mutate.
    const lastProp1Field = prop1Field;
    const lastProp2Field = prop2Field;

    rerender(
      <Provider schema={TestSchema}>
        <C />
      </Provider>
    );

    expect(prop1Field).toBe(lastProp1Field);
    expect(prop2Field).toBe(lastProp2Field);
  });

  it("updates with value change", () => {
    let prop1Field: any, prop2Field: any;

    function C() {
      const fields = useFields(TestSchema);
      prop1Field = fields.prop1;
      prop2Field = fields.prop2;
      return (
        <div>
          <span>{prop1Field.value || "()"}</span>
          <span>{prop2Field.value}</span>
        </div>
      );
    }

    const { getByText } = render(
      <Provider schema={TestSchema} initial={{ prop2: "initial value" }}>
        <C />
      </Provider>
    );

    expect(getByText("initial value")).toBeInTheDocument();
    expect(getByText("()")).toBeInTheDocument();

    act(() => {
      prop1Field.set(5);
    });

    expect(getByText("initial value")).toBeInTheDocument();
    expect(getByText("5")).toBeInTheDocument();

    act(() => {
      prop2Field.set("updated value");
    });

    expect(getByText("updated value")).toBeInTheDocument();
    expect(getByText("5")).toBeInTheDocument();
  });

  it("does not update when unaccessed field is updated", () => {
    let store: any;
    let renderCount: number = 0;

    function C() {
      renderCount++;

      store = useStore();

      const fields = useFields(TestSchema);
      return (
        <div>
          <span>{fields.prop1.value || "()"}</span>
          <span>
            {fields.prop1.value === undefined ? "[]" : fields.prop2.value}
          </span>
        </div>
      );
    }

    expect(renderCount).toBe(0);

    const { getByText } = render(
      <Provider schema={TestSchema}>
        <C />
      </Provider>
    );

    expect(renderCount).toBe(1);
    expect(getByText("[]")).toBeInTheDocument();
    expect(getByText("()")).toBeInTheDocument();

    act(() => {
      store.fields.prop2.set("updated value");
    });

    // Nothing should have changed.
    expect(renderCount).toBe(1);
    expect(getByText("[]")).toBeInTheDocument();
    expect(getByText("()")).toBeInTheDocument();

    act(() => {
      store.fields.prop1.set(5);
    });

    // Now we should rerender, because it should be subscribed to prop1.
    expect(renderCount).toBe(2);
    expect(getByText("5")).toBeInTheDocument();
    expect(getByText("updated value")).toBeInTheDocument();

    act(() => {
      store.fields.prop2.set("updated value2");
    });

    // And now it should be subscribed to prop2 as well.
    expect(renderCount).toBe(3);
    expect(getByText("5")).toBeInTheDocument();
    expect(getByText("updated value2")).toBeInTheDocument();
  });

  it("subscribes only once", () => {
    let field: any;

    function C() {
      field = useFields(TestSchema).prop2;
      return <div>{field.value}</div>;
    }

    expect(field).toBe(undefined);

    const { unmount } = render(
      <Provider schema={TestSchema}>
        <C />
      </Provider>
    );

    jest.spyOn(field, "subscribe");

    act(() => {
      field.set("updated value");
    });

    unmount();

    expect(field.subscribe).toHaveBeenCalledTimes(0);
  });

  it("doesn't re-render unnecessarily", () => {
    let field: any;
    let renderCount = 0;
    let parentRenderCount = 0;

    function C() {
      field = useFields(TestSchema).prop2;
      renderCount++;
      return <div>{field.value}</div>;
    }

    expect(renderCount).toBe(0);

    render(
      <Provider schema={TestSchema}>
        {(() => parentRenderCount++)()}
        <C />
      </Provider>
    );

    expect(renderCount).toBe(1);
    expect(parentRenderCount).toBe(1);

    const updatedValue = "updated value";

    act(() => {
      field.set(updatedValue);
    });

    expect(renderCount).toBe(2);
    expect(parentRenderCount).toBe(1);

    act(() => {
      field.set(updatedValue);
    });

    expect(renderCount).toBe(2);
    expect(parentRenderCount).toBe(1);
  });

  it("handles sub-fields for record schema", () => {
    let field: any;
    let subProp1: any;
    let subProp2: any;
    let subSubProp: any;

    function C() {
      field = useFields(TestSchema).prop3;
      subProp1 = field.properties.subProp1;
      subProp2 = field.properties.subProp2;
      subSubProp = subProp2.properties.subSubProp;
      return (
        <div>
          <div>{subProp1.value}</div>
          <div>{subSubProp.value}</div>
        </div>
      );
    }

    const { getByText } = render(
      <Provider
        schema={TestSchema}
        initial={{
          prop3: {
            subProp1: "initial sub value",
            subProp2: {
              subSubProp: "initial sub sub value",
            },
          },
        }}
      >
        <C />
      </Provider>
    );

    expect(getByText("initial sub value")).toBeInTheDocument();
    expect(getByText("initial sub sub value")).toBeInTheDocument();
    expect(field.value).toStrictEqual({
      subProp1: "initial sub value",
      subProp2: {
        subSubProp: "initial sub sub value",
      },
    });
    expect(subProp2.value).toStrictEqual({
      subSubProp: "initial sub sub value",
    });
    expect(subProp2.value).toBe(field.value.subProp2);

    act(() => {
      field.set({
        subProp1: "sub 1",
        subProp2: {
          subSubProp: "sub sub 1",
        },
      });
    });

    expect(getByText("sub 1")).toBeInTheDocument();
    expect(getByText("sub sub 1")).toBeInTheDocument();
    expect(field.value).toStrictEqual({
      subProp1: "sub 1",
      subProp2: {
        subSubProp: "sub sub 1",
      },
    });
    expect(subProp2.value).toStrictEqual({
      subSubProp: "sub sub 1",
    });
    expect(subProp2.value).toBe(field.value.subProp2);

    act(() => {
      subProp1.set("sub 2");
    });

    expect(getByText("sub 2")).toBeInTheDocument();
    expect(getByText("sub sub 1")).toBeInTheDocument();
    expect(field.value).toStrictEqual({
      subProp1: "sub 2",
      subProp2: {
        subSubProp: "sub sub 1",
      },
    });
    expect(subProp2.value).toStrictEqual({
      subSubProp: "sub sub 1",
    });
    expect(subProp2.value).toBe(field.value.subProp2);

    act(() => {
      subProp2.set({ subSubProp: "sub sub 2" });
    });

    expect(getByText("sub 2")).toBeInTheDocument();
    expect(getByText("sub sub 2")).toBeInTheDocument();
    expect(field.value).toStrictEqual({
      subProp1: "sub 2",
      subProp2: {
        subSubProp: "sub sub 2",
      },
    });
    expect(subProp2.value).toStrictEqual({
      subSubProp: "sub sub 2",
    });
    expect(subProp2.value).toBe(field.value.subProp2);

    act(() => {
      subSubProp.set("sub sub 3");
    });

    expect(getByText("sub 2")).toBeInTheDocument();
    expect(getByText("sub sub 3")).toBeInTheDocument();
    expect(field.value).toStrictEqual({
      subProp1: "sub 2",
      subProp2: {
        subSubProp: "sub sub 3",
      },
    });
    expect(subProp2.value).toStrictEqual({
      subSubProp: "sub sub 3",
    });
    expect(subProp2.value).toBe(field.value.subProp2);
  });

  it("handles sub-fields for tuples", () => {
    let field: any;
    let el0: any;
    let el1: any;
    let el10: any;
    let el11: any;

    function C() {
      const tupleField = useFields(TestSchema).tuple;
      field = tupleField;
      el0 = tupleField.elements[0];
      el1 = tupleField.elements[1];
      el10 = tupleField.elements[1].elements[0];
      el11 = tupleField.elements[1].elements[1];
      return (
        <div>
          <div>{el0.value}</div>
          <div>{el10.value}</div>
          <div>{el11.value}</div>
        </div>
      );
    }

    const { getByText } = render(
      <Provider
        schema={TestSchema}
        initial={{
          tuple: ["initial sub value", [5, undefined]],
        }}
      >
        <C />
      </Provider>
    );

    expect(getByText("initial sub value")).toBeInTheDocument();
    expect(getByText("5")).toBeInTheDocument();
    expect(field.value).toStrictEqual(["initial sub value", [5, undefined]]);
    expect(el0.value).toBe("initial sub value");
    expect(el1.value).toStrictEqual([5, undefined]);
    expect(el1.value).toStrictEqual(field.value[1]);
    expect(el10.value).toBe(5);
    expect(el11.value).toBeUndefined();

    act(() => {
      field.set(["sub 1", [6, 7]]);
    });

    expect(getByText("sub 1")).toBeInTheDocument();
    expect(getByText("6")).toBeInTheDocument();
    expect(getByText("7")).toBeInTheDocument();
    expect(field.value).toStrictEqual(["sub 1", [6, 7]]);
    expect(el0.value).toBe("sub 1");
    expect(el1.value).toStrictEqual([6, 7]);
    expect(el1.value).toStrictEqual(field.value[1]);
    expect(el10.value).toBe(6);
    expect(el11.value).toBe(7);

    act(() => {
      el0.set("sub 2");
    });

    expect(getByText("sub 2")).toBeInTheDocument();
    expect(getByText("6")).toBeInTheDocument();
    expect(getByText("7")).toBeInTheDocument();
    expect(field.value).toStrictEqual(["sub 2", [6, 7]]);
    expect(el0.value).toBe("sub 2");
    expect(el1.value).toStrictEqual([6, 7]);
    expect(el1.value).toStrictEqual(field.value[1]);
    expect(el10.value).toBe(6);
    expect(el11.value).toBe(7);

    act(() => {
      el10.set(8);
    });

    expect(getByText("sub 2")).toBeInTheDocument();
    expect(getByText("8")).toBeInTheDocument();
    expect(getByText("7")).toBeInTheDocument();
    expect(field.value).toStrictEqual(["sub 2", [8, 7]]);
    expect(el0.value).toBe("sub 2");
    expect(el1.value).toStrictEqual([8, 7]);
    expect(el1.value).toStrictEqual(field.value[1]);
    expect(el10.value).toBe(8);
    expect(el11.value).toBe(7);
  });
});

it("unwraps optional schema for array sub-fields", () => {
  function C() {
    const field = useFields(TestSchema).array;
    expect(field.elements[0].schema).toSatisfy(s.isNumberSchema);
    return null;
  }

  render(
    <Provider
      schema={TestSchema}
      initial={{
        array: [5, 4, 3],
      }}
    >
      <C />
    </Provider>
  );
});

it("handles sub-fields for array", () => {
  let field: any;
  let el0: any;
  let el1: any;
  let el4: any;

  function C() {
    const arrayField = useFields(TestSchema).array;
    field = arrayField;
    el0 = arrayField.elements[0];
    el1 = arrayField.elements[1];
    el4 = arrayField.elements[4];
    return (
      <ul>
        {arrayField.value?.map((n, i) => (
          <li key={`${i}-${n}`}>El {n || "undefined"}</li>
        ))}
      </ul>
    );
  }

  const { getByText } = render(
    <Provider
      schema={TestSchema}
      initial={{
        array: [5, 4, 3],
      }}
    >
      <C />
    </Provider>
  );

  expect(getByText("El 5")).toBeInTheDocument();
  expect(getByText("El 4")).toBeInTheDocument();
  expect(getByText("El 3")).toBeInTheDocument();
  expect(field.value).toStrictEqual([5, 4, 3]);
  expect(el0.value).toBe(5);
  expect(el1.value).toBe(4);
  expect(el4.value).toBe(undefined);

  act(() => {
    field.set([10, 9, 8]);
  });

  expect(getByText("El 10")).toBeInTheDocument();
  expect(getByText("El 9")).toBeInTheDocument();
  expect(getByText("El 8")).toBeInTheDocument();
  expect(field.value).toStrictEqual([10, 9, 8]);
  expect(el0.value).toBe(10);
  expect(el1.value).toBe(9);
  expect(el4.value).toBe(undefined);

  act(() => {
    el0.set(2);
  });

  expect(getByText("El 2")).toBeInTheDocument();
  expect(getByText("El 9")).toBeInTheDocument();
  expect(getByText("El 8")).toBeInTheDocument();
  expect(field.value).toStrictEqual([2, 9, 8]);
  expect(el0.value).toBe(2);
  expect(el1.value).toBe(9);
  expect(el4.value).toBe(undefined);

  act(() => {
    el4.set(25);
  });

  expect(getByText("El 2")).toBeInTheDocument();
  expect(getByText("El 9")).toBeInTheDocument();
  expect(getByText("El 8")).toBeInTheDocument();
  expect(getByText("El undefined")).toBeInTheDocument();
  expect(getByText("El 25")).toBeInTheDocument();
  expect(field.value).toStrictEqual([2, 9, 8, undefined, 25]);
  expect(field.value.length).toBe(5);
  expect(el0.value).toBe(2);
  expect(el1.value).toBe(9);
  expect(el4.value).toBe(25);
});

describe("WithField", () => {
  it("provides fields for properties", () => {
    let prop1Field, prop2Field;

    function C() {
      const { prop1, prop2 } = useFields(TestSchema);
      prop1Field = prop1;
      prop2Field = prop2;
      return <div></div>;
    }

    const { rerender } = render(
      <Provider schema={TestSchema}>
        <WithFields schema={TestSchema}>
          {({ prop1, prop2 }) => {
            prop1Field = prop1;
            prop2Field = prop2;
            return <div></div>;
          }}
        </WithFields>
      </Provider>
    );

    expect(prop1Field).toMatchObject({
      schema: TestSchema.properties.prop1,
    });
    expect(prop2Field).toMatchObject({
      schema: TestSchema.properties.prop2,
    });

    const lastField1 = prop1Field;
    const lastField2 = prop2Field;

    rerender(
      <Provider schema={TestSchema}>
        <C />
      </Provider>
    );

    expect(prop1Field).toBe(lastField1);
    expect(prop2Field).toBe(lastField2);
  });

  it("updates with value change", () => {
    let field: any;

    const { getByText } = render(
      <Provider schema={TestSchema} initial={{ prop2: "initial value" }}>
        <WithFields schema={TestSchema}>
          {(f) => {
            field = f.prop2;
            return <div>{field.value}</div>;
          }}
        </WithFields>
      </Provider>
    );

    expect(getByText("initial value")).toBeInTheDocument();

    act(() => {
      field.set("updated value");
    });

    expect(getByText("updated value")).toBeInTheDocument();
  });
});
