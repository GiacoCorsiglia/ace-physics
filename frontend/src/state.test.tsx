import { act, render } from "@testing-library/react";
import React from "react";
import * as s from "./common/schema";
import { Provider, useField, useStore, WithField } from "./state";

type TestSchema = typeof TestSchema["properties"];
const TestSchema = s.record({
  prop1: s.number(),
  prop2: s.string().withDefault("initial value"),
  prop3: s.record({
    subProp1: s.string().withDefault("initial sub value"),
    // Records nested in records should work but are not recommended.
    subProp2: s.record({
      subSubProp: s.string().withDefault("initial sub sub value"),
    }),
  }),
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
          value: TestSchema.properties.prop1.default(),
          validity: { valid: true },
        },
        prop2: {
          schema: TestSchema.properties.prop2,
          value: TestSchema.properties.prop2.default(),
          validity: { valid: true },
        },
        prop3: {
          schema: TestSchema.properties.prop3,
          value: TestSchema.properties.prop3.default(),
          validity: { valid: true },
          properties: {
            subProp1: {
              schema: TestSchema.properties.prop3.properties.subProp1,
              value: TestSchema.properties.prop3.properties.subProp1.default(),
              validity: { valid: true },
            },
            subProp2: {
              schema: TestSchema.properties.prop3.properties.subProp2,
              validity: { valid: true },
              value: TestSchema.properties.prop3.properties.subProp2.default(),
              properties: {
                subSubProp: {
                  schema:
                    TestSchema.properties.prop3.properties.subProp2.properties
                      .subSubProp,
                  value: TestSchema.properties.prop3.properties.subProp2.properties.subSubProp.default(),
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
});

describe("useField", () => {
  it("provides field for property", () => {
    let field;

    function C() {
      field = useField(TestSchema, "prop1");
      return <div></div>;
    }

    const { rerender } = render(
      <Provider schema={TestSchema}>
        <C />
      </Provider>
    );

    expect(field).toMatchObject({
      schema: TestSchema.properties.prop1,
    });

    // Also doesn't mutate.
    const lastField = field;

    rerender(
      <Provider schema={TestSchema}>
        <C />
      </Provider>
    );

    expect(field).toBe(lastField);
  });

  it("updates with value change", () => {
    let field: any;

    function C() {
      field = useField(TestSchema, "prop2");
      return <div>{field.value}</div>;
    }

    const { getByText } = render(
      <Provider schema={TestSchema}>
        <C />
      </Provider>
    );

    expect(getByText("initial value")).toBeInTheDocument();

    act(() => {
      field.set("updated value");
    });

    expect(getByText("updated value")).toBeInTheDocument();
  });

  it("subscribes only once", () => {
    let field: any;

    function C() {
      field = useField(TestSchema, "prop2");
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
      field = useField(TestSchema, "prop2");
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

  it("handles sub-fields", () => {
    let field: any;
    let subProp1: any;
    let subProp2: any;
    let subSubProp: any;

    function C() {
      field = useField(TestSchema, "prop3");
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
      <Provider schema={TestSchema}>
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
});

describe("WithField", () => {
  it("provides field for property", () => {
    let field;

    function C() {
      field = useField(TestSchema, "prop1");
      return <div></div>;
    }

    const { rerender } = render(
      <Provider schema={TestSchema}>
        <WithField schema={TestSchema} name="prop1">
          {(f) => {
            field = f;
            return <div></div>;
          }}
        </WithField>
      </Provider>
    );

    expect(field).toMatchObject({
      schema: TestSchema.properties.prop1,
    });

    const lastField = field;

    rerender(
      <Provider schema={TestSchema}>
        <C />
      </Provider>
    );

    expect(field).toBe(lastField);
  });

  it("updates with value change", () => {
    let field: any;

    const { getByText } = render(
      <Provider schema={TestSchema}>
        <WithField schema={TestSchema} name="prop2">
          {(f) => {
            field = f;
            return <div>{f.value}</div>;
          }}
        </WithField>
      </Provider>
    );

    expect(getByText("initial value")).toBeInTheDocument();

    act(() => {
      field.set("updated value");
    });

    expect(getByText("updated value")).toBeInTheDocument();
  });
});
