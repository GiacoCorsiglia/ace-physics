import { Immutable, Path, TypeAtPath } from "@/helpers";
import { Html, useForceUpdate } from "@/helpers/frontend";
import { createContext, useContext, useEffect, useRef } from "react";
import { unstable_batchedUpdates } from "react-dom";
import { get } from "./immutable";
import { Store, store } from "./store";
import { Tracker, tracker } from "./tracker";

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

  const useValue = <P extends Path<Immutable<T>>>(
    path: P
  ): TypeAtPath<Immutable<T>, P> => {
    const store = useStore();
    const forceUpdate = useForceUpdate();

    useEffect(
      () => store.subscribe(path as Path<T>, forceUpdate),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [store, forceUpdate, ...path]
    );

    return get(store.state, path);
  };

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
    useValue,
    useTracked,
  };
};
