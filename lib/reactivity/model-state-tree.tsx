import { Immutable } from "@/helpers";
import { Html, useUniqueSymbol } from "@/helpers/frontend";
import type * as f from "@/schema/fields";
import type { Infer } from "@/schema/types";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { get } from "./immutable";
import { model, Model } from "./model";
import { stateTree } from "./state-tree";
import { Store, Updates } from "./store";

export interface ModelContext<P extends f.Properties = f.Properties> {
  readonly useStore: () => Store<Infer<f.ObjectField<P>["type"]>>;
  readonly rootField: f.ObjectField<P>;
  readonly rootModel: Model<f.ObjectField<P>>;
}

export const modelStateTree = <P extends f.Properties>(
  rootField: f.ObjectField<P>,
  displayName: string
) => {
  type T = Infer<f.ObjectField<P>["type"]>;

  const {
    Root: TreeRoot,
    useStore,
    useValue,
    useTracked,
    tracked,
  } = stateTree<T>(displayName);

  const Context = createContext<ModelContext<P>>(undefined as any);
  Context.displayName = `ModelStateTreeContext:${displayName}`;

  const Root = ({
    initial,
    overrideRootField,
    onChange,
    children,
  }: {
    initial: T;
    overrideRootField?: f.ObjectField<P>;
    onChange?: (newState: Immutable<T>, updates: Updates<T>) => void;
    children?: Html;
  }) => {
    const ctx = useRef<ModelContext<P>>();

    if (
      ctx.current === undefined ||
      (overrideRootField && ctx.current.rootField !== overrideRootField)
    ) {
      ctx.current = {
        useStore,
        rootField: rootField,
        rootModel: model(
          overrideRootField || rootField,
          [],
          (Context as unknown) as React.Context<ModelContext>
        ),
      };
    }

    return (
      <Context.Provider value={ctx.current}>
        <TreeRoot initial={initial} children={children} onChange={onChange} />
      </Context.Provider>
    );
  };
  (Root as any).displayName = `Root:ModelStateTree:${displayName}`;

  const useRootModel = () => useContext(Context).rootModel;

  return {
    Root,
    useStore,
    useValue,
    useTracked,
    tracked,
    useRootModel,
  };
};

type GetSetTuple<T> = [
  value: T,
  setValue: (next: T | ((prev: T) => T)) => void
];

export const useModel = <F extends f.Field>(
  model: Model<F>,
  onExternalUpdate?: (newValue: Infer<F["type"]> | undefined) => void
): GetSetTuple<Infer<F["type"]> | undefined> => {
  const store = useContext(model.Context).useStore();
  const source = useUniqueSymbol();

  const setValue = useCallback(
    (next) => {
      store.transaction((set) => {
        set(model.path as any, next);
      }, source);
    },
    [model, store, source]
  );

  const [tuple, setTuple] = useState<GetSetTuple<Infer<F["type"]> | undefined>>(
    () => [get(store.state, model.path as any), setValue]
  );

  // Make sure we always have the latest version of the callback in the
  // subscription, but avoid re-triggering the effect on every render (in case
  // the function definition isn't memoized).
  const onExternalUpdateRef = useRef(onExternalUpdate);
  onExternalUpdateRef.current = onExternalUpdate;

  useEffect(
    () =>
      store.subscribe(model.path as any, (newValue, updateSource) => {
        setTuple([newValue, setValue]);

        if (updateSource !== source && onExternalUpdateRef.current) {
          onExternalUpdateRef.current(newValue);
        }
      }),
    [model, store, setValue, source]
  );

  return tuple;
};
