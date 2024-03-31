// @vitest-environment jsdom
import { Html } from "@/helpers/client";
import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { stateTree } from "./state-tree";

describe("state tree", () => {
  interface T {
    top1: {
      nested: string;
    };
    top2: string;
    top3?: {
      nested3: { nestedNested3: string };
    };
  }

  const { Root, useStore, useValue, useTracked } = stateTree<T>("Name");

  const initial: T = { top1: { nested: "initial1" }, top2: "initial2" };

  const wrapper = ({ children }: { children?: Html }) => (
    <Root initial={initial}>{children}</Root>
  );

  const rh = <P, T>(c: (p: P) => T) => renderHook(c, { wrapper });

  describe("useStore", () => {
    it("respects initial value", () => {
      const { result } = rh(() => useStore());
      expect(result.current.state).toMatchObject(initial);
    });

    it("respects updates", () => {
      const { result } = rh(() => useStore());
      expect(result.current.state).toMatchObject(initial);

      act(() => {
        result.current.transaction((set) => set(["top2"], "updated2"));
      });

      expect(result.current.state).toMatchObject({
        top1: { nested: "initial1" },
        top2: "updated2",
      });
    });

    it("returns identical store object", () => {
      const { result, rerender } = rh(() => useStore());

      const before = result.current;
      act(() => {
        result.current.transaction((set) => set(["top2"], "updated2"));
      });
      rerender();
      const after = result.current;

      expect(after).toBe(before);
    });

    it("does not trigger re-renders", () => {
      let renderCount = 0;
      const { result } = rh(() => (renderCount++, useStore()));

      expect(renderCount).toBe(1);
      act(() => {
        result.current.transaction((set) => set(["top2"], "updated2"));
      });
      expect(renderCount).toBe(1);
    });
  });

  describe("useValue", () => {
    it("gets initial value", () => {
      const { result } = rh(() => useValue(["top1"]));
      expect(result.current[0].nested).toBe("initial1");
    });

    it("triggers rerender", () => {
      let renderCount = 0;
      const { result } = rh(
        () => [useStore(), useValue(["top1"]), renderCount++] as const,
      );

      expect(renderCount).toBe(1);
      expect(result.current[1][0].nested).toBe("initial1");

      act(() => {
        result.current[0].transaction((set) =>
          set(["top1", "nested"], "updated1"),
        );
      });

      expect(result.current[1][0].nested).toBe("updated1");
      expect(renderCount).toBe(2);
    });

    it("works for root value", () => {
      let renderCount = 0;
      const { result } = rh(
        () => [useStore(), useValue([]), renderCount++] as const,
      );

      expect(renderCount).toBe(1);
      expect(result.current[1][0]).toMatchObject(initial);

      act(() => {
        result.current[0].transaction((set) =>
          set(["top1", "nested"], "updated1"),
        );
      });

      expect(renderCount).toBe(2);
      expect(result.current[1][0].top1.nested).toBe("updated1");

      act(() => {
        result.current[0].transaction((set) =>
          set([], { top1: { nested: "updated2" }, top2: "updated-top-2" }),
        );
      });

      expect(renderCount).toBe(3);
      expect(result.current[1][0].top1.nested).toBe("updated2");

      act(() => {
        result.current[1][1]({
          top1: { nested: "updated3" },
          top2: "updated-top-3",
        });
      });

      expect(renderCount).toBe(4);
      expect(result.current[1][0].top1.nested).toBe("updated3");
    });

    it("does not trigger rerender when irrelevant values change", () => {
      let renderCount = 0;
      const { result } = rh(
        () => [useStore(), useValue(["top1"]), renderCount++] as const,
      );

      expect(renderCount).toBe(1);
      expect(result.current[1][0].nested).toBe("initial1");

      act(() => {
        result.current[0].transaction((set) => set(["top2"], "updated2"));
      });

      expect(renderCount).toBe(1);
      expect(result.current[1][0].nested).toBe("initial1");
    });

    it("provides setter which triggers rerender", () => {
      let renderCount = 0;
      const { result } = rh(
        () => [useStore(), useValue(["top1"]), renderCount++] as const,
      );

      expect(renderCount).toBe(1);
      expect(result.current[1][0].nested).toBe("initial1");

      act(() => {
        result.current[1][1]({ nested: "updated1" });
      });

      expect(result.current[1][0].nested).toBe("updated1");
      expect(renderCount).toBe(2);
    });
  });

  describe("useTracked", () => {
    it("provides state to callback synchronously and returns result of callback", () => {
      const { result } = rh(() => useTracked((state) => state));
      expect(result.current).toMatchObject(initial);
    });

    it("re-renders when dependency changes", () => {
      let renderCount = 0;
      const { result } = rh(
        () =>
          [
            useStore(),
            useTracked((state) => state.top1.nested.toUpperCase()),
            renderCount++,
          ] as const,
      );

      expect(renderCount).toBe(1);
      expect(result.current[1]).toBe("INITIAL1");

      act(() => {
        result.current[0].transaction((set) =>
          set(["top1", "nested"], "updated1"),
        );
      });

      expect(renderCount).toBe(2);
      expect(result.current[1]).toBe("UPDATED1");
    });

    it("does not re-render when non-dependency changes", () => {
      let renderCount = 0;
      const { result } = rh(
        () =>
          [
            useStore(),
            useTracked((state) => state.top1.nested.toUpperCase()),
            renderCount++,
          ] as const,
      );

      expect(renderCount).toBe(1);
      expect(result.current[1]).toBe("INITIAL1");

      act(() => {
        result.current[0].transaction((set) => set(["top2"], "updated2"));
      });

      expect(renderCount).toBe(1);
      expect(result.current[1]).toBe("INITIAL1");
    });

    it("changes subscriptions when dependencies change", () => {
      let renderCount = 0;
      let step = 0;
      const { result, rerender } = rh(
        () =>
          [
            useStore(),
            useTracked((state) => {
              return step === 0
                ? state.top2
                : `${state.top1.nested} ${state.top3?.nested3.nestedNested3}`;
            }),
            renderCount++,
          ] as const,
      );

      expect(renderCount).toBe(1);
      expect(result.current[1]).toBe("initial2");

      // Irrelevant subscriptions not fired.
      act(() => {
        result.current[0].transaction((set) =>
          set(["top3", "nested3", "nestedNested3"], "initial3"),
        );
      });
      expect(renderCount).toBe(1);
      expect(result.current[1]).toBe("initial2");

      // Relevant subscriptions fired.
      act(() => {
        result.current[0].transaction((set) => set(["top2"], "updated2"));
      });
      expect(renderCount).toBe(2);
      expect(result.current[1]).toBe("updated2");

      step = 1;
      rerender();

      // New state returned.
      expect(renderCount).toBe(3);
      expect(result.current[1]).toBe("initial1 initial3");

      // Now-irrelevant subscriptions not fired.
      act(() => {
        result.current[0].transaction((set) => set(["top2"], "updated2_2"));
      });
      expect(renderCount).toBe(3);
      expect(result.current[1]).toBe("initial1 initial3");

      // Now-relevant subscriptions fired.
      act(() => {
        result.current[0].transaction((set) =>
          set(["top3", "nested3", "nestedNested3"], "updated3"),
        );
      });
      expect(renderCount).toBe(4);
      expect(result.current[1]).toBe("initial1 updated3");
    });
  });
});
