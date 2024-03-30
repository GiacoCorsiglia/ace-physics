/**
 * @jest-environment jsdom
 */
import { Html } from "@/helpers/client";
import * as f from "@/schema/fields";
import { act, renderHook } from "@testing-library/react";
import { useEffect } from "react";
import { model } from "./model";
import { modelStateTree, useModel } from "./model-state-tree";

describe("modelStateTree and useModel", () => {
  const rootField = f.object({
    k1: f.string(),
    k2: f.object({
      nested: f.string(),
    }),
  });

  const { Root, useRootModel, useStore } = modelStateTree(
    rootField,
    "DisplayName",
  );

  const wrapper = ({ children }: { children?: Html }) => (
    <Root initial={{ k2: { nested: "nested_1" } }}>{children}</Root>
  );

  const rh = <P, T>(c: (p: P) => T) => renderHook(c, { wrapper });

  describe("useRootModel", () => {
    it("provides root model", () => {
      const { result, rerender } = rh(() => useRootModel());
      expect(result.current).toMatchObject(
        model(rootField, [], result.current.Context),
      );
    });

    it("provides referentially stable root model", () => {
      const { result, rerender } = rh(() => useRootModel());
      const before = result.current;
      rerender();
      const after = result.current;
      expect(after).toBe(before);
    });
  });

  describe("useModel", () => {
    it("returns value in tuple", () => {
      const { result } = rh(() =>
        useModel(useRootModel().properties.k2.properties.nested),
      );
      expect(result.current[0]).toBe("nested_1");
    });

    it("returns referentially stable setter in tuple", () => {
      const { result } = rh(() => useModel(useRootModel().properties.k1));

      const before = result.current[1];
      act(() => {
        result.current[1]("top_1");
      });
      const after = result.current[1];

      expect(after).toBe(before);
    });

    it("setter triggers rerender", () => {
      let renderCount = 0;
      const { result } = rh(
        () => (
          renderCount++,
          useModel(useRootModel().properties.k2.properties.nested)
        ),
      );

      expect(renderCount).toBe(1);
      expect(result.current[0]).toBe("nested_1");

      act(() => {
        result.current[1]("nested_2");
      });

      expect(renderCount).toBe(2);
      expect(result.current[0]).toBe("nested_2");
    });

    it("setter updates store", () => {
      const { result } = rh(
        () =>
          [
            useStore(),
            useModel(useRootModel().properties.k2.properties.nested),
          ] as const,
      );

      expect(result.current[0].state.k2?.nested).toBe("nested_1");

      act(() => {
        result.current[1][1]("nested_2");
      });

      expect(result.current[0].state.k2?.nested).toBe("nested_2");
    });

    it("setter supports functional update", () => {
      const { result } = rh(() =>
        useModel(useRootModel().properties.k2.properties.nested),
      );

      expect(result.current[0]).toBe("nested_1");

      act(() => {
        result.current[1]((prev) => `${prev}_next`);
      });

      expect(result.current[0]).toBe("nested_1_next");
    });

    it("relevant external update triggers rerender", () => {
      let renderCount = 0;
      const { result } = rh(
        () =>
          [
            useStore(),
            useModel(useRootModel().properties.k2.properties.nested),
            renderCount++,
          ] as const,
      );

      expect(renderCount).toBe(1);
      expect(result.current[1][0]).toBe("nested_1");

      act(() => {
        result.current[0].transaction((set) => {
          set(["k2"], { nested: "nested_2" });
        });
      });

      expect(result.current[1][0]).toBe("nested_2");
    });

    it("irrelevant external update does not trigger rerender", () => {
      let renderCount = 0;
      const { result } = rh(
        () =>
          [
            useStore(),
            useModel(useRootModel().properties.k2.properties.nested),
            renderCount++,
          ] as const,
      );

      expect(renderCount).toBe(1);
      expect(result.current[1][0]).toBe("nested_1");

      act(() => {
        result.current[0].transaction((set) => {
          set(["k1"], "top_1");
        });
      });

      expect(renderCount).toBe(1);
      expect(result.current[1][0]).toBe("nested_1");
    });

    it("rerenders after immediate in-line update", () => {
      let renderCount = 0;
      const { result } = rh(() => {
        const store = useStore();
        const tuple = useModel(useRootModel().properties.k2.properties.nested);
        const [, setValue] = tuple;
        if (renderCount === 0) {
          setValue("nested_2");
        }

        return [store, tuple, renderCount++] as const;
      });

      expect(renderCount).toBe(2);
      expect(result.current[1][0]).toBe("nested_2");
    });

    it("rerenders after in-effect update", () => {
      let renderCount = 0;
      const { result } = rh(() => {
        const store = useStore();
        const tuple = useModel(useRootModel().properties.k2.properties.nested);
        const [, setValue] = tuple;

        useEffect(() => {
          setValue("nested_2");
        }, [setValue]);

        return [store, tuple, renderCount++] as const;
      });

      expect(renderCount).toBe(2);
      expect(result.current[1][0]).toBe("nested_2");
    });

    it("fires onExternalUpdate callback only on external updates", () => {
      const onExternal = jest.fn();
      const { result } = rh(
        () =>
          [
            useStore(),
            useModel(
              useRootModel().properties.k2.properties.nested,
              onExternal,
            ),
          ] as const,
      );

      expect(onExternal).not.toHaveBeenCalled();

      act(() => {
        result.current[1][1]("nested_2");
      });
      expect(onExternal).not.toHaveBeenCalled();

      act(() => {
        result.current[0].transaction((set) => {
          set(["k2"], { nested: "nested_3" });
        });
      });
      expect(onExternal).toHaveBeenCalledTimes(1);
      expect(onExternal).toHaveBeenCalledWith("nested_3");
    });
  });
});
