import { act, render } from "@testing-library/react";
import * as s from "ace-common/src/schema";
import React from "react";
import { Provider, useField, useStore, WithField } from "./state";

type TestSchema = typeof TestSchema["properties"];
const TestSchema = s.record({
  prop1: s.number(),
  prop2: s.string({ default: "initial value" }),
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
        <WithField<TestSchema> schema={TestSchema} name="prop2">
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
