import { act, render } from "@testing-library/react";
import React from "react";
import { Field } from "./schema";
import { Provider, useModel, useStore, WithModel } from "./state";

type TestSchema = typeof TestSchema;
const TestSchema = {
  field1: Field<number>(),
  field2: Field<string>({ defaultValue: "initial value" }),
} as const;

describe("Provider", () => {
  it("creates Store from schema", () => {
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

    expect(store).toMatchObject({ schema: TestSchema });
    // The Models here are incomplete because we can't check method equality.
    expect(store).toMatchObject({
      models: {
        field1: {
          field: TestSchema.field1,
          value: TestSchema.field1.default(),
          validity: { valid: true },
        },
        field2: {
          field: TestSchema.field2,
          value: TestSchema.field2.default(),
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

describe("useModel", () => {
  it("provides model for field", () => {
    let model;

    function C() {
      model = useModel<TestSchema>("field1");
      return <div></div>;
    }

    const { rerender } = render(
      <Provider schema={TestSchema}>
        <C />
      </Provider>
    );

    expect(model).toMatchObject({
      field: TestSchema.field1,
    });

    const lastModel = model;

    rerender(
      <Provider schema={TestSchema}>
        <C />
      </Provider>
    );

    expect(model).toBe(lastModel);
  });

  it("updates with value change", () => {
    let model: any;

    function C() {
      model = useModel<TestSchema>("field2");
      return <div>{model.value}</div>;
    }

    const { getByText } = render(
      <Provider schema={TestSchema}>
        <C />
      </Provider>
    );

    expect(getByText("initial value")).toBeInTheDocument();

    act(() => {
      model.set("updated value");
    });

    expect(getByText("updated value")).toBeInTheDocument();
  });

  it("subscribes only once", () => {
    let model: any;

    function C() {
      model = useModel<TestSchema>("field2");
      return <div>{model.value}</div>;
    }

    expect(model).toBe(undefined);

    const { unmount } = render(
      <Provider schema={TestSchema}>
        <C />
      </Provider>
    );

    jest.spyOn(model, "subscribe");

    act(() => {
      model.set("updated value");
    });

    unmount();

    expect(model.subscribe).toHaveBeenCalledTimes(0);
  });

  it("doesn't re-render unnecessarily", () => {
    let model: any;
    let renderCount = 0;
    let parentRenderCount = 0;

    function C() {
      model = useModel<TestSchema>("field2");
      renderCount++;
      return <div>{model.value}</div>;
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
      model.set(updatedValue);
    });

    expect(renderCount).toBe(2);
    expect(parentRenderCount).toBe(1);

    act(() => {
      model.set(updatedValue);
    });

    expect(renderCount).toBe(2);
    expect(parentRenderCount).toBe(1);
  });
});

describe("WithModel", () => {
  it("provides model for field", () => {
    let model;

    function C() {
      model = useModel<TestSchema>("field1");
      return <div></div>;
    }

    const { rerender } = render(
      <Provider schema={TestSchema}>
        <WithModel<TestSchema> name="field1">
          {(m) => {
            model = m;
            return <div></div>;
          }}
        </WithModel>
      </Provider>
    );

    expect(model).toMatchObject({
      field: TestSchema.field1,
    });

    const lastModel = model;

    rerender(
      <Provider schema={TestSchema}>
        <C />
      </Provider>
    );

    expect(model).toBe(lastModel);
  });

  it("updates with value change", () => {
    let model: any;

    const { getByText } = render(
      <Provider schema={TestSchema}>
        <WithModel<TestSchema> name="field2">
          {(m) => {
            model = m;
            return <div>{m.value}</div>;
          }}
        </WithModel>
      </Provider>
    );

    expect(getByText("initial value")).toBeInTheDocument();

    act(() => {
      model.set("updated value");
    });

    expect(getByText("updated value")).toBeInTheDocument();
  });
});
