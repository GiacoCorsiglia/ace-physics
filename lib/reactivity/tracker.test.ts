import { tracker } from "./tracker";

describe("Proxy Track", () => {
  const state = {
    top: [{ next: "yo" }, { next: "dude" }],
    other: "other",
  };

  const t = tracker(state);
  const proxy = t.proxy;

  beforeEach(() => {
    t.resetTracking();
  });

  it("logs accessed leaves", () => {
    proxy.top[0].next;
    proxy.other;
    expect(t.resetTracking()).toStrictEqual(new Set(["top/0/next", "other"]));
  });

  it("logs accessed leaves when checked with `in`", () => {
    "next" in proxy.top[0];
    "other" in proxy;
    expect(t.resetTracking()).toStrictEqual(new Set(["top/0/next", "other"]));
  });

  it("it handles leaf after assignment", () => {
    const object = proxy.top[0];
    object.next;
    expect(t.resetTracking()).toStrictEqual(new Set(["top/0/next"]));
  });

  it("it handles leaf after assignment?", () => {
    const object = proxy.top;
    object[0].next;
    expect(t.resetTracking()).toStrictEqual(new Set(["top/0/next"]));
  });
  it("it handles leaf after assignment2?", () => {
    const object = proxy.top;
    object[0].next;
    expect(t.resetTracking()).toStrictEqual(new Set(["top/0/next"]));
  });

  it("it handles Object.keys()", () => {
    const object = proxy.top[0];
    Object.keys(object);
    object.next; // Shouldn't be triggered anymore.
    expect(t.resetTracking()).toStrictEqual(new Set(["top/0"]));
  });

  it("handles hasOwnProperty", () => {
    const object = proxy.top[0];
    object.hasOwnProperty("test");
    object.next; // Shouldn't be triggered anymore.
    expect(t.resetTracking()).toStrictEqual(new Set(["top/0"]));
  });

  it("handles for-in loop", () => {
    const object = proxy.top[0];
    for (const key in object) {
      // Doesn't matter.
    }
    object.next; // Shouldn't be triggered anymore.
    expect(t.resetTracking()).toStrictEqual(new Set(["top/0"]));
  });

  it("handles array length", () => {
    const object = proxy.top;
    object[0].next;
    expect(t.resetTracking()).toStrictEqual(new Set(["top/0/next"]));
  });
});
