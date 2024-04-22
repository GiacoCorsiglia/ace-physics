// @vitest-environment jsdom
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ToggleControl } from "./toggle";

describe("Toggle Control", () => {
  type C = "A" | "B" | "C" | undefined;

  const choices = [
    ["A", "Choice A"],
    ["B", "Choice B"],
    ["C", "Choice C"],
  ] as const;

  it("Handles checked state", () => {
    let value: C;
    const onChange = vi.fn((reducer) => {
      value = reducer(value);
    });
    const { rerender } = render(
      <ToggleControl value={value} onChange={onChange} choices={choices} />,
    );

    const inputA = screen.getByLabelText("Choice A");
    const inputB = screen.getByLabelText("Choice B");
    const inputC = screen.getByLabelText("Choice C");

    expect(value).toBeUndefined();

    expect(inputA).not.toBeChecked();
    expect(inputB).not.toBeChecked();
    expect(inputC).not.toBeChecked();

    // Click directly on input.
    fireEvent.click(inputA);

    expect(value).toBe("A");

    rerender(
      <ToggleControl value={value} onChange={onChange} choices={choices} />,
    );

    expect(inputA).toBeChecked();
    expect(inputB).not.toBeChecked();
    expect(inputC).not.toBeChecked();

    // Click on label.
    fireEvent.click(screen.getByText("Choice B"));

    expect(value).toBe("B");

    rerender(
      <ToggleControl value={value} onChange={onChange} choices={choices} />,
    );

    expect(inputA).not.toBeChecked();
    expect(inputB).toBeChecked();
    expect(inputC).not.toBeChecked();
  });

  it("Distinguishes adjacent toggles with the same choices", () => {
    let value1: C;
    const onChange1 = vi.fn((reducer) => {
      value1 = reducer(value1);
    });
    let value2: C;
    const onChange2 = vi.fn((reducer) => {
      value2 = reducer(value2);
    });

    const C = () => {
      return (
        <>
          <ToggleControl
            value={value1}
            onChange={onChange1}
            choices={choices}
          />
          <ToggleControl
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
});
