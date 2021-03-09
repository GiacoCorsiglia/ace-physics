import { fireEvent, render, screen } from "@testing-library/react";
import { ChooseControl } from "./choose";

describe("Choose Control", () => {
  type C = "A" | "B" | "C";
  const choices = [
    ["A", "Choice A"],
    ["B", "Choice B"],
    ["C", "Choice C"],
  ] as const;

  const renderChoose = <M extends boolean, O extends boolean>(
    multi: M,
    other: O
  ) => {
    const state = {
      value: undefined as (M extends true ? C[] : C) | undefined,
      otherValue: undefined as string | undefined,
    };

    const onChange = (reducer: any) => {
      state.value = reducer(state.value);
    };
    const onOtherChange = (o: any) => {
      state.otherValue = o;
    };

    const C = () => (
      <ChooseControl
        multi={multi}
        value={state.value as any}
        onChange={onChange}
        choices={choices}
        other={
          !other
            ? undefined
            : {
                value: state.otherValue,
                onChange: onOtherChange,
              }
        }
      />
    );

    const { rerender } = render(<C />);

    const inputA = screen.getByLabelText("Choice A");
    const inputB = screen.getByLabelText("Choice B");
    const inputC = screen.getByLabelText("Choice C");

    const inputOther = other
      ? screen.getByLabelText("Other")
      : (undefined as any);
    const inputOtherText = other
      ? screen.getByLabelText("Input your other answer here")
      : (undefined as any);

    return {
      state,
      inputA,
      inputB,
      inputC,
      inputOther: inputOther as O extends true ? HTMLElement : undefined,
      inputOtherText: inputOtherText as O extends true
        ? HTMLInputElement
        : undefined,
      renderAgain: () => {
        rerender(<C />);
      },
    };
  };

  it("Handles checked state for Choose One", () => {
    const { state, renderAgain, inputA, inputB, inputC } = renderChoose(
      false,
      false
    );

    expect(state.value).toBeUndefined();

    expect(inputA).not.toBeChecked();
    expect(inputB).not.toBeChecked();
    expect(inputC).not.toBeChecked();

    // Click directly on input.
    fireEvent.click(inputA);

    expect(state.value).toBe("A");

    renderAgain();

    expect(inputA).toBeChecked();
    expect(inputB).not.toBeChecked();
    expect(inputC).not.toBeChecked();

    // Click on label.
    fireEvent.click(screen.getByText("Choice B"));

    expect(state.value).toBe("B");

    renderAgain();

    expect(inputA).not.toBeChecked();
    expect(inputB).toBeChecked();
    expect(inputC).not.toBeChecked();
  });

  it("Handles checked state for Choose All", () => {
    const { state, renderAgain, inputA, inputB, inputC } = renderChoose(
      true,
      false
    );

    expect(state.value).toBeUndefined();

    expect(inputA).not.toBeChecked();
    expect(inputB).not.toBeChecked();
    expect(inputC).not.toBeChecked();

    // Click directly on input.
    fireEvent.click(inputA);

    expect(state.value).toStrictEqual(["A"]);

    renderAgain();

    expect(inputA).toBeChecked();
    expect(inputB).not.toBeChecked();
    expect(inputC).not.toBeChecked();

    // Click on label.
    fireEvent.click(screen.getByText("Choice B"));

    expect(state.value).toStrictEqual(["A", "B"]);

    renderAgain();

    expect(inputA).toBeChecked();
    expect(inputB).toBeChecked();
    expect(inputC).not.toBeChecked();
  });

  it("Distinguishes adjacent choose ones with the same choices", () => {
    let value1: C | undefined;
    const onChange1 = jest.fn((reducer) => {
      value1 = reducer(value1);
    });
    let value2: C | undefined;
    const onChange2 = jest.fn((reducer) => {
      value2 = reducer(value2);
    });

    const C = () => {
      return (
        <>
          <ChooseControl
            multi={false}
            value={value1}
            onChange={onChange1}
            choices={choices}
          />
          <ChooseControl
            multi={false}
            value={value2}
            onChange={onChange2}
            choices={choices}
          />
        </>
      );
    };

    const { rerender } = render(<C />);

    const inputAs = screen.getAllByLabelText("Choice A");
    const inputA1 = inputAs[0];
    const inputA2 = inputAs[1];
    const inputBs = screen.getAllByLabelText("Choice B");
    const inputB1 = inputBs[0];
    const inputB2 = inputBs[1];

    expect(inputA1).not.toBeChecked();
    expect(inputB1).not.toBeChecked();
    expect(inputA2).not.toBeChecked();
    expect(inputB2).not.toBeChecked();

    expect(value1).toBeUndefined();
    expect(value2).toBeUndefined();

    fireEvent.click(inputA1);
    expect(value1).toBe("A");
    expect(value2).toBeUndefined();

    rerender(<C />);

    expect(inputA1).toBeChecked();
    expect(inputB1).not.toBeChecked();
    expect(inputA2).not.toBeChecked();
    expect(inputB2).not.toBeChecked();
  });

  it("Handles other state for choose one", () => {
    const {
      state,
      renderAgain,
      inputA,
      inputB,
      inputC,
      inputOther,
      inputOtherText,
    } = renderChoose(false, true);

    // Everything starts undefined.

    expect(state.value).toBe(undefined);
    expect(state.otherValue).toBe(undefined);

    expect(inputA).not.toBeChecked();
    expect(inputB).not.toBeChecked();
    expect(inputC).not.toBeChecked();
    expect(inputOther).not.toBeChecked();

    // Now select "A".

    fireEvent.click(inputA);

    expect(state.value).toBe("A");
    expect(state.otherValue).toBe(undefined);

    renderAgain();

    expect(inputA).toBeChecked();
    expect(inputB).not.toBeChecked();
    expect(inputC).not.toBeChecked();
    expect(inputOther).not.toBeChecked();

    // Now type in the "Other" box.

    fireEvent.change(inputOtherText, { target: { value: "Yo!" } });
    expect(inputOtherText.value).toBe("Yo!");

    expect(state.value).toBe(undefined);
    expect(state.otherValue).toBe("Yo!");

    renderAgain();

    expect(inputA).not.toBeChecked();
    expect(inputB).not.toBeChecked();
    expect(inputC).not.toBeChecked();
    expect(inputOther).toBeChecked();

    // Now select B.

    fireEvent.click(inputB);

    expect(state.value).toBe("B");
    expect(state.otherValue).toBe(undefined);
    expect(inputOtherText.value).toBe("Yo!");

    renderAgain();

    expect(inputA).not.toBeChecked();
    expect(inputB).toBeChecked();
    expect(inputC).not.toBeChecked();
    expect(inputOther).not.toBeChecked();

    // Now explicitly select "other".

    fireEvent.click(inputOther);

    expect(state.value).toBe(undefined);
    expect(state.otherValue).toBe("Yo!");
    expect(inputOtherText.value).toBe("Yo!");

    renderAgain();

    expect(inputA).not.toBeChecked();
    expect(inputB).not.toBeChecked();
    expect(inputC).not.toBeChecked();
    expect(inputOther).toBeChecked();
  });

  it("Handles other state for choose all", () => {
    const {
      state,
      renderAgain,
      inputA,
      inputB,
      inputC,
      inputOther,
      inputOtherText,
    } = renderChoose(true, true);

    // Everything starts undefined.

    expect(state.value).toBe(undefined);
    expect(state.otherValue).toBe(undefined);

    expect(inputA).not.toBeChecked();
    expect(inputB).not.toBeChecked();
    expect(inputC).not.toBeChecked();
    expect(inputOther).not.toBeChecked();

    // Now select "A".

    fireEvent.click(inputA);

    expect(state.value).toStrictEqual(["A"]);
    expect(state.otherValue).toBe(undefined);

    renderAgain();

    expect(inputA).toBeChecked();
    expect(inputB).not.toBeChecked();
    expect(inputC).not.toBeChecked();
    expect(inputOther).not.toBeChecked();

    // Now type in the "Other" box.

    fireEvent.change(inputOtherText, { target: { value: "Yo!" } });
    expect(inputOtherText.value).toBe("Yo!");

    expect(state.value).toStrictEqual(["A"]); // Unaffected!
    expect(state.otherValue).toBe("Yo!");

    renderAgain();

    expect(inputA).toBeChecked();
    expect(inputB).not.toBeChecked();
    expect(inputC).not.toBeChecked();
    expect(inputOther).toBeChecked();

    // Now select B.

    fireEvent.click(inputB);

    expect(state.value).toStrictEqual(["A", "B"]);
    expect(state.otherValue).toBe("Yo!");
    expect(inputOtherText.value).toBe("Yo!");

    renderAgain();

    expect(inputA).toBeChecked();
    expect(inputB).toBeChecked();
    expect(inputC).not.toBeChecked();
    expect(inputOther).toBeChecked();

    // Now explicitly deselect "other".

    fireEvent.click(inputOther);

    expect(state.value).toStrictEqual(["A", "B"]);
    expect(state.otherValue).toBe(undefined);
    expect(inputOtherText.value).toBe("Yo!");

    renderAgain();

    expect(inputA).toBeChecked();
    expect(inputB).toBeChecked();
    expect(inputC).not.toBeChecked();
    expect(inputOther).not.toBeChecked();

    // Now explicitly select "other" again.

    fireEvent.click(inputOther);

    expect(state.value).toStrictEqual(["A", "B"]);
    expect(state.otherValue).toBe("Yo!");
    expect(inputOtherText.value).toBe("Yo!");

    renderAgain();

    expect(inputA).toBeChecked();
    expect(inputB).toBeChecked();
    expect(inputC).not.toBeChecked();
    expect(inputOther).toBeChecked();
  });
});
