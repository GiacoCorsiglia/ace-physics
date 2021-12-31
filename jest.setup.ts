import "@testing-library/jest-dom";

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
