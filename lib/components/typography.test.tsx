/**
 * @jest-environment jsdom
 */
import { render, screen } from "@testing-library/react";
import { autoProse, Prose } from "./typography";

const SomeComponent = () => <span>Test</span>;

describe("Prose", () => {
  it("Renders children", () => {
    render(<Prose>This is a test</Prose>);
    expect(screen.queryByText("This is a test")).toBeInTheDocument();
  });

  it("passes props to container", () => {
    const { container } = render(
      <Prose className="test-class" id="test-id">
        This is a test
      </Prose>,
    );
    const element = container.firstElementChild!;
    expect(element).toHaveAttribute("id", "test-id");
    expect(element).toHaveAttribute(
      "class",
      expect.stringContaining("test-class"),
    );
  });

  it("Wraps children with <p> if children is text", () => {
    const { container } = render(<Prose>This is a test</Prose>);
    expect(container.childElementCount).toBe(1);
    expect(container.firstElementChild!.tagName).toBe("P");
  });

  it("Wraps children with <div> if children contains unknown elements", () => {
    const { container } = render(
      <Prose>
        This is a test <em>alright</em> <SomeComponent />
      </Prose>,
    );
    expect(container.childElementCount).toBe(1);
    expect(container.firstElementChild!.tagName).toBe("DIV");
  });

  it("Wraps children with <div> if children contains block-level elements", () => {
    const { container } = render(
      <Prose>
        Blah:
        <p>This is a test</p>
      </Prose>,
    );
    expect(container.childElementCount).toBe(1);
    expect(container.firstElementChild!.tagName).toBe("DIV");
  });
});

describe("autoProse", () => {
  it("Wraps string child with <Prose>", () => {
    const original = "Test";
    const wrapped: any = autoProse(original);
    expect(wrapped.type).toBe(Prose);
    expect(wrapped.props.children).toBe(original);
  });

  it("Wraps prose-safe element child with <Prose>", () => {
    const original = <i>Test</i>;
    const wrapped: any = autoProse(original);
    expect(wrapped.type).toBe(Prose);
    expect(wrapped.props.children).toBe(original);
  });

  it("Wraps string and prose-safe children with <Prose>, including Fragments", () => {
    const original = (
      <>
        <strong>Test 1</strong> Test 2 {3} {false} {true} {undefined} {null}
        <>
          <em>Test 3</em> Test 4
        </>
      </>
    ).props.children;
    const wrapped: any = autoProse(original);
    expect(wrapped.type).toBe(Prose);
    expect(wrapped.props.children).toBe(original);
  });

  it("Does not wrap <Prose> with <Prose>", () => {
    const original = <Prose>Test</Prose>;
    const wrapped: any = autoProse(original);
    expect(wrapped).toBe(original);
  });

  it("Does not wrap mix of prose-safe and unsafe children with <Prose>", () => {
    const original = (
      <>
        <strong>Test 1</strong> Test 2 <SomeComponent /> Test 4
      </>
    ).props.children;
    const wrapped: any = autoProse(original);
    expect(wrapped).toBe(original);
  });

  it("Does not wrap mix of nested prose-safe and unsafe children with <Prose>", () => {
    const original = (
      <>
        <>
          <strong>Test 1</strong> Test 2 <SomeComponent /> Test 4
        </>
      </>
    ).props.children;
    const wrapped: any = autoProse(original);
    expect(wrapped).toBe(original);
  });

  it("Does not wrap empty children with <Prose>", () => {
    expect(autoProse(undefined)).toBe(undefined);
    expect(autoProse(false)).toBe(false);
    expect(autoProse(null)).toBe(null);
  });
});
