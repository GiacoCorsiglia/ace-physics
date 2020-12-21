import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from "react";
import { unstable_batchedUpdates } from "react-dom";
import * as f from "schema/fields";
import type { Infer } from "schema/types";
import { Immutable } from "services/helpers";
import { Html, useForceUpdate } from "services/helpers/frontend";
import { get } from "./immutable";
import { model, Model } from "./model";
import { store, Store } from "./store";
import { tracker, Tracker } from "./tracker";

export const stateTree = <T extends object>(displayName: string) => {
  interface Context {
    readonly store: Store<T>;
    tracker?: Tracker<Immutable<T>>;
  }

  const Context = createContext<Context>(undefined as any);
  Context.displayName = `StateTreeContext:${displayName}`;

  const Root = ({ initial, children }: { initial: T; children?: Html }) => {
    const ctx = useRef<Context>();

    if (ctx.current === undefined) {
      const s = store(initial);
      const origTransaction = s.transaction;
      s.transaction = (...args) => {
        let ret!: Immutable<T>;
        unstable_batchedUpdates(() => {
          ret = origTransaction(...args);
        });
        return ret;
      };
      ctx.current = {
        store: s,
      };
    }

    return <Context.Provider value={ctx.current} children={children} />;
  };

  const useStore = () => useContext(Context).store;

  const useTracked = <R extends any>(func: (state: Immutable<T>) => R): R => {
    const forceUpdate = useForceUpdate();
    const ctx = useContext(Context);
    const store = ctx.store;

    const unsubscribersRef = useRef<Map<string, () => void>>();
    if (!unsubscribersRef.current) {
      unsubscribersRef.current = new Map();
    }
    const unsubscribers = unsubscribersRef.current;

    if (ctx.tracker === undefined || ctx.tracker.original !== store.state) {
      ctx.tracker = tracker(store.state);
    }
    const trk = ctx.tracker;
    trk.resetTracking();
    const ret = func(trk.proxy);
    const paths = trk.resetTracking();

    unsubscribers.forEach((unsubscribe, path) => {
      if (!paths.has(path)) {
        unsubscribe();
        unsubscribers.delete(path);
      }
    });

    paths.forEach((path) => {
      if (!unsubscribers.has(path)) {
        unsubscribers.set(path, store.subscribe(path + "", forceUpdate));
      }
    });

    useEffect(
      () => () =>
        unsubscribersRef.current!.forEach((unsubscribe) => unsubscribe()),
      []
    );

    return ret;
  };

  return {
    Root,
    useStore,
    useTracked,
  };
};

export const modelStateTree = <P extends f.Properties>(
  rootField: f.ObjectField<P>,
  displayName: string
) => {
  type T = Infer<f.ObjectField<P>["type"]>;

  const { Root: TreeRoot, useStore, useTracked } = stateTree<T>(displayName);

  interface ModelContext {
    readonly id: symbol;
    readonly rootModel: Model<f.ObjectField<P>>;
  }

  const Context = createContext<ModelContext>(undefined as any);
  Context.displayName = `ModelStateTreeContext:${displayName}`;

  const Root = ({ initial, children }: { initial: T; children: Html }) => {
    const ctx = useRef<ModelContext>();

    if (ctx.current === undefined) {
      const id = Symbol();
      ctx.current = {
        id,
        rootModel: model(rootField, [], id),
      };
    }

    return (
      <Context.Provider value={ctx.current}>
        <TreeRoot initial={initial} children={children} />
      </Context.Provider>
    );
  };

  const useRootModel = () => useContext(Context).rootModel;

  type GetSetTuple<T> = [
    value: Immutable<T>,
    setValue: (next: T | ((prev: Immutable<T>) => T)) => void
  ];

  const useModel = <F extends f.Field, M extends Model<F>>(
    model: M
  ): GetSetTuple<Infer<F["type"]>> => {
    if (process.env.NODE_ENV === "development") {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      if (model.contextId !== useContext(Context).id) {
        throw new Error(
          `Using model (${model.path.join("/")}) outside of proper context`
        );
      }
    }

    const store = useStore();
    const forceUpdate = useForceUpdate();
    const tuple = useRef<GetSetTuple<Infer<F["type"]>>>();

    const setValue = useCallback(
      (next) => {
        store.transaction((set) => {
          set(model.path as any, next);
        });
      },
      [model, store]
    );

    useEffect(
      () =>
        store.subscribe(model.path as any, (newValue) => {
          tuple.current = [newValue as Immutable<Infer<F["type"]>>, setValue];
          forceUpdate();
        }),
      [model, store, forceUpdate, setValue]
    );

    return (
      tuple.current ||
      (tuple.current = [get(store.state, model.path as any), setValue])
    );
  };

  return {
    Root,
    useStore,
    useTracked,
    useModel,
    useRootModel,
  };
};
