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

  it("supports nested transactions", () => {
    const orig = { a: 0, b: 0, c: 0 };
    const s = store(orig);

    s.transaction((set1) => {
      set1(["a"], 1);
      set1(["c"], 1);

      s.transaction((set2) => {
        set2(["a"], (prevA) => {
          // Nested set calls should follow parent transaction state.
          expect(prevA).toBe(1);
          return 2;
        });
        set2(["b"], 1);
      });

      set1(["b"], (prevB) => {
        // Parent calls should follow nested state when nested transactions have
        // been completed.
        expect(prevB).toBe(1);
        return 2;
      });
    });

    expect(s.state).toMatchObject({ a: 2, b: 2, c: 1 });
  });
});

describe("subscriptions", () => {
  const orig = { top: [{ next: "hello" }, { next: "yo" }] };

  it("fires the right listeners", () => {
    const s = store(orig);

    const arity = (_: any) => {};
    const src = undefined;

    const rootListener = jest.fn(arity);
    const rootUnsub = s.subscribe([], rootListener);
    const topListener = jest.fn(arity);
    const topUnsub = s.subscribe(["top"], topListener);
    const el0Listener = jest.fn(arity);
    const el0Unsub = s.subscribe(["top", 0], el0Listener);
    const el0NextListener = jest.fn(arity);
    const el0NextUnsub = s.subscribe(["top", 0, "next"], el0NextListener);
    const el1Listener = jest.fn(arity);
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
    expect(rootListener).toHaveBeenCalledWith(s.state, src);
    expect(topListener).toHaveBeenCalledTimes(1);
    expect(topListener).toHaveBeenCalledWith(s.state.top, src);
    expect(el0Listener).toHaveBeenCalledTimes(1);
    expect(el0Listener).toHaveBeenCalledWith(s.state.top[0], src);
    expect(el0NextListener).toHaveBeenCalledTimes(1);
    expect(el0NextListener).toHaveBeenCalledWith(s.state.top[0].next, src);
    expect(el1Listener).not.toHaveBeenCalled();

    clearMocks();

    // A less nested change.
    s.transaction((set) => {
      set(["top"], []);
    });

    expect(rootListener).toHaveBeenCalledTimes(1);
    expect(rootListener).toHaveBeenCalledWith(s.state, src);
    expect(topListener).toHaveBeenCalledTimes(1);
    expect(topListener).toHaveBeenCalledWith(s.state.top, src);
    expect(el0Listener).toHaveBeenCalledTimes(1);
    expect(el0Listener).toHaveBeenCalledWith(undefined, src);
    expect(el0NextListener).toHaveBeenCalledTimes(1);
    expect(el0NextListener).toHaveBeenCalledWith(undefined, src);
    expect(el1Listener).toHaveBeenCalledTimes(1);
    expect(el1Listener).toHaveBeenCalledWith(undefined, src);

    clearMocks();

    // Multiple changes.
    s.transaction((set) => {
      set(["top"], []);
      set(["top", 0], { next: "sup homie" });
    });

    expect(rootListener).toHaveBeenCalledTimes(1);
    expect(rootListener).toHaveBeenCalledWith(s.state, src);
    expect(topListener).toHaveBeenCalledTimes(1);
    expect(topListener).toHaveBeenCalledWith(s.state.top, src);
    expect(el0Listener).toHaveBeenCalledTimes(1);
    expect(el0Listener).toHaveBeenCalledWith(s.state.top[0], src);
    expect(el0NextListener).toHaveBeenCalledTimes(1);
    expect(el0NextListener).toHaveBeenCalledWith(s.state.top[0].next, src);
    expect(el1Listener).toHaveBeenCalledTimes(1);
    expect(el1Listener).toHaveBeenCalledWith(undefined, src);

    clearMocks();

    // Now unsubscribe.
    rootUnsub();
    topUnsub();
    el0Unsub();
    el0NextUnsub();
    // Keep el1

    // And reset the whole thing (which would have triggered everything).
    s.transaction((set) => {
      set([], { top: [{ next: "abc" }, { next: "123" }] });
    });

    expect(rootListener).not.toHaveBeenCalled();
    expect(topListener).not.toHaveBeenCalled();
    expect(el0Listener).not.toHaveBeenCalled();
    expect(el0NextListener).not.toHaveBeenCalled();
    expect(el1Listener).toHaveBeenCalledTimes(1);
    expect(el1Listener).toHaveBeenCalledWith(s.state.top[1], src);

    clearMocks();

    // Now unsubscribe el1
    el1Unsub();

    s.transaction((set) => {
      set([], { top: [{ next: "abc" }, { next: "123456" }] });
    });

    expect(rootListener).not.toHaveBeenCalled();
    expect(topListener).not.toHaveBeenCalled();
    expect(el0Listener).not.toHaveBeenCalled();
    expect(el0NextListener).not.toHaveBeenCalled();
    expect(el1Listener).not.toHaveBeenCalled();
  });
});
