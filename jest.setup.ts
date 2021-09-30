import "@testing-library/jest-dom";
import type { ImageProps } from "next/image";

expect.extend({
  toSatisfy(received, predicate) {
    const pass = predicate(received);
    return {
      pass,
      message: () =>
        (pass
          ? `Expected ${predicate.name}(...) to be false.`
          : `Expected ${predicate.name}(...) to be true.`) +
        `\nReceived: ${this.utils.printReceived(received)}}`,
    };
  },
});

declare global {
  namespace jest {
    interface Matchers<R, T = {}> {
      toSatisfy(predicate: (arg: T) => boolean): R;
    }
  }
}

// Mock the Next.js Image component.
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: ImageProps) =>
    `Image stub for "${
      typeof props.src === "string"
        ? props.src
        : "default" in props.src
        ? props.src.default.src
        : props.src.src
    }"`,
}));
