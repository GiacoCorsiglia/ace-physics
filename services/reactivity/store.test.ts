import { store } from "./store";

describe("transaction", () => {
  it("creates an immutable copy", () => {
    const orig = { top: [{ next: "hello" }, { next: "yo" }] };

    const s = store(orig);

    expect(s.state).toStrictEqual(orig);
    const origState = s.state;

    s.transaction((set) => {
      set(["top", 0, "next"], "sup");
    });

    expect(s.state).not.toBe(origState);
    expect(s.state.top).not.toBe(origState.top);
    expect(s.state.top[0]).not.toBe(origState.top[0]);

    expect(s.state.top[1]).toBe(origState.top[1]);

    expect(s.state).toStrictEqual({ top: [{ next: "sup" }, { next: "yo" }] });
  });

  it("respects multiple sets", () => {
    const orig = { top: [{ next: "hello" }, { next: "yo" }] };

    const s = store(orig);

    expect(s.state).toStrictEqual(orig);

    s.transaction((set) => {
      set(["top", 0, "next"], "overwritten");
      set(["top", 1, "next"], "dude");
      set(["top", 0, "next"], "sup!!");
    });

    expect(s.state).not.toBe(orig);
    expect(s.state.top).not.toBe(orig.top);
    expect(s.state.top[0]).not.toBe(orig.top[0]);
    expect(s.state.top[1]).not.toBe(orig.top[1]);

    expect(s.state).toStrictEqual({
      top: [{ next: "sup!!" }, { next: "dude" }],
    });
  });

  it("doesn't update state until complete", () => {
    const orig = { top: "hello" };
    const s = store(orig);
    expect(s.state).toStrictEqual(orig);
    const origState = s.state;
    s.transaction((set) => {
      set(["top"], "wtf mate");
      expect(s.state).toBe(origState);
      expect(s.state).toStrictEqual(orig);
    });
    expect(s.state).not.toBe(origState);
    expect(s.state).toStrictEqual({ top: "wtf mate" });
  });

  it("allows setting the entire state", () => {
    const orig = { top: "hello" };
    const s = store(orig);

    const newState = { top: "hey" };
    s.transaction((set) => {
      set([], newState);
    });

    expect(s.state).toBe(newState);
  });
});

describe("subscriptions", () => {
  const orig = { top: [{ next: "hello" }, { next: "yo" }] };

  it("fires the right listeners", () => {
    const s = store(orig);

    const rootListener = jest.fn();
    const rootUnsub = s.subscribe([], rootListener);
    const topListener = jest.fn();
    const topUnsub = s.subscribe(["top"], topListener);
    const el0Listener = jest.fn();
    const el0Unsub = s.subscribe(["top", 0], el0Listener);
    const el0NextListener = jest.fn();
    const el0NextUnsub = s.subscribe(["top", 0, "next"], el0NextListener);
    const el1Listener = jest.fn();
    const el1Unsub = s.subscribe(["top", 1], el1Listener);

    const mocks = [
      rootListener,
      topListener,
      el0Listener,
      el0NextListener,
      el1Listener,
    ];
    const clearMocks = () => mocks.forEach((m) => m.mockClear());

    // First, no changes.
    s.transaction((set, prevState) => {
      set([], prevState);
    });

    // So nothing should have been called.
    mocks.forEach((m) => expect(m).not.toHaveBeenCalled());

    clearMocks();

    // Now some nested changes.
    s.transaction((set) => {
      set(["top", 0, "next"], "updated 0");
    });

    expect(rootListener).toHaveBeenCalledTimes(1);
    expect(rootListener).toHaveBeenCalledWith(s.state);
    expect(topListener).toHaveBeenCalledTimes(1);
    expect(topListener).toHaveBeenCalledWith(s.state.top);
    expect(el0Listener).toHaveBeenCalledTimes(1);
    expect(el0Listener).toHaveBeenCalledWith(s.state.top[0]);
    expect(el0NextListener).toHaveBeenCalledTimes(1);
    expect(el0NextListener).toHaveBeenCalledWith(s.state.top[0].next);
    expect(el1Listener).not.toHaveBeenCalled();

    clearMocks();

    // A less nested change.
    s.transaction((set) => {
      set(["top"], []);
    });

    expect(rootListener).toHaveBeenCalledTimes(1);
    expect(rootListener).toHaveBeenCalledWith(s.state);
    expect(topListener).toHaveBeenCalledTimes(1);
    expect(topListener).toHaveBeenCalledWith(s.state.top);
    expect(el0Listener).toHaveBeenCalledTimes(1);
    expect(el0Listener).toHaveBeenCalledWith(undefined);
    expect(el0NextListener).toHaveBeenCalledTimes(1);
    expect(el0NextListener).toHaveBeenCalledWith(undefined);
    expect(el1Listener).toHaveBeenCalledTimes(1);
    expect(el1Listener).toHaveBeenCalledWith(undefined);

    clearMocks();

    // Multiple changes.
    s.transaction((set) => {
      set(["top"], []);
      set(["top", 0], { next: "sup homie" });
    });

    expect(rootListener).toHaveBeenCalledTimes(1);
    expect(rootListener).toHaveBeenCalledWith(s.state);
    expect(topListener).toHaveBeenCalledTimes(1);
    expect(topListener).toHaveBeenCalledWith(s.state.top);
    expect(el0Listener).toHaveBeenCalledTimes(1);
    expect(el0Listener).toHaveBeenCalledWith(s.state.top[0]);
    expect(el0NextListener).toHaveBeenCalledTimes(1);
    expect(el0NextListener).toHaveBeenCalledWith(s.state.top[0].next);
    expect(el1Listener).toHaveBeenCalledTimes(1);
    expect(el1Listener).toHaveBeenCalledWith(undefined);
  });
});
