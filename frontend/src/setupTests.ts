// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom/extend-expect";

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
    interface Matchers<R> {
      toSatisfy<E extends any>(predicate: (arg: E) => boolean): R;
    }
  }
}
