import {
  Html,
  Immutable,
  JsxElement,
  Path,
  TypeAtPath,
  useForceUpdate,
} from "@/helpers/client";
import {
  createContext,
  memo,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { unstable_batchedUpdates } from "react-dom";
import { useDevTools } from "./dev-tools";
import { get } from "./immutable";
import { Store, store, Updates } from "./store";
import { Tracker, tracker } from "./tracker";

export const stateTree = <T extends object>(displayName: string) => {
  interface Context {
    readonly store: Store<T>;
    tracker?: Tracker<Immutable<T>>;
  }

  const Context = createContext<Context>(undefined as any);
  Context.displayName = `StateTreeContext:${displayName}`;

  const Root = ({
    initial,
    onChange,
    children,
  }: {
    initial: T;
    onChange?: (newState: Immutable<T>, updates: Updates<T>) => void;
    children?: Html;
  }) => {
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

    useDevTools(ctx.current.store, displayName);

    useEffect(() => {
      if (onChange) {
        return ctx.current!.store.onTransaction(onChange);
      }
    }, [onChange]);

    return <Context.Provider value={ctx.current} children={children} />;
  };
  (Root as any).displayName = `Root:StateTree:${displayName}`;

  const useStore = (): Store<T> => useContext(Context).store;

  type NextSetter<T> = T | ((prev: T) => T);

  const useValue = <P extends Path<Immutable<T>>>(path: P) => {
    const store = useStore();

    const setValue = useCallback(
      (next: NextSetter<TypeAtPath<Immutable<T>, P>>) => {
        store.transaction((set) => {
          set(path, next);
        });
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [store, path.join("/")]
    );

    const [tuple, setTuple] = useState(
      () => [get(store.state, path), setValue] as const
    );

    // Subscribe immediately so there's no race condition between subscribing
    // and the state being changed in some async callback elsewhere (including
    // in other effects in this component).
    const unsubscribe = useRef<() => void>();
    const subscriptionPath = useRef<string>();
    if (subscriptionPath.current !== path.join("/")) {
      if (unsubscribe.current) {
        // unsubscribe from old subscription.
        unsubscribe.current();
      }

      subscriptionPath.current = path.join("/");
      unsubscribe.current = store.subscribe(path as Path<T>, (newValue) =>
        setTuple([newValue as TypeAtPath<Immutable<T>, P>, setValue])
      );
    }
    // Unsubscribe from the latest subscription on unmount.
    useEffect(() => () => unsubscribe.current && unsubscribe.current(), []);

    return tuple;
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

  const tracked = <P extends {}>(
    component: (props: P, state: Immutable<T>) => JsxElement
  ) => {
    const memoized = memo((props: P) =>
      useTracked((state) => component(props, state))
    );
    memoized.displayName = (component as any).displayName || component.name;
    return memoized;
  };

  return {
    Root,
    useStore,
    useValue,
    useTracked,
    tracked,
  };
};
