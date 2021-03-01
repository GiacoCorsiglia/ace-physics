import { render, screen } from "@testing-library/react";
import { Prose } from "./typography";

const SomeComponent = () => <span>Test</span>;

describe("Prose", () => {
  it("Renders children", () => {
    render(<Prose>This is a test</Prose>);
    expect(screen.queryByText("This is a test")).toBeInTheDocument();
  });

  it("Wraps children with <p> if children is text", () => {
    const { container } = render(<Prose>This is a test</Prose>);
    expect(container.childElementCount).toBe(1);
    expect(container.firstElementChild!.tagName).toBe("P");
  });

  it("Wraps children with <p> if children doesn't contain block-level elements", () => {
    const { container } = render(
      <Prose>
        This is a test <em>alright</em> <SomeComponent />
      </Prose>
    );
    expect(container.childElementCount).toBe(1);
    expect(container.firstElementChild!.tagName).toBe("P");
  });

  it("Wraps children with <div> if children contains block-level elements", () => {
    const { container } = render(
      <Prose>
        Blah:
        <p>This is a test</p>
      </Prose>
    );
    expect(container.childElementCount).toBe(1);
    expect(container.firstElementChild!.tagName).toBe("DIV");
  });
});
