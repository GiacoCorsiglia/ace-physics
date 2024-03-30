import {
  Html,
  Immutable,
  JsxElement,
  Path,
  TypeAtPath,
  useIsomorphicInsertionEffect,
} from "@/helpers/client";
import {
  createContext,
  memo,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useSyncExternalStore,
} from "react";
import { useDevTools } from "./dev-tools";
import { get } from "./immutable";
import { pathToString, stringToPath } from "./path";
import { Store, store, Updates } from "./store";
import { tracker } from "./tracker";

export const stateTree = <T extends object>(displayName: string) => {
  interface Context {
    readonly store: Store<T>;
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
      ctx.current = {
        store: store(initial),
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

  const useValue = <P extends Path<Immutable<T>>>(
    path: P,
  ): readonly [
    TypeAtPath<Immutable<T>, P>,
    (setter: NextSetter<TypeAtPath<Immutable<T>, P>>) => void,
  ] => {
    const store = useStore();

    const getValue = () => get(store.state, path);

    const pathString = pathToString(path);

    const setValue = useCallback(
      (next: NextSetter<TypeAtPath<Immutable<T>, P>>) => {
        store.transaction((set) => {
          set(path, next);
        });
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [store, pathString],
    );

    const subscribe = useCallback(
      (onStoreChange: () => void) =>
        store.subscribe(path as Path<T>, () => onStoreChange()),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [store, pathString],
    );

    const value = useSyncExternalStore(subscribe, getValue, getValue);

    return [value, setValue] as const;
  };

  const useTracked = <R extends any>(func: (state: Immutable<T>) => R): R => {
    const store = useStore();

    const lastPaths = useRef<Set<string>>();

    const trk = tracker(store.state);
    const ret = func(trk.proxy);
    const nextPaths = trk.currentAccessed;

    // We use `useSyncExternalStore` as a subscription mechanism but we don't
    // actually need it to get the state for us.

    // Sadly we can't do targeted subscriptions here; we target in the snapshot
    // instead b/c that's what React requires.
    const subscribe = useCallback(
      (onStoreChange: () => void) =>
        store.subscribe([], () => {
          onStoreChange();
        }),
      [store],
    );
    let inRender = true;
    const getSnapshot = () => {
      const paths = inRender ? nextPaths : lastPaths.current || nextPaths;
      let string = "";
      for (const path of paths) {
        string +=
          path +
          ":" +
          JSON.stringify(get(store.state, stringToPath(path) as any)) +
          ",";
      }
      // We just need a unique string every time the state selection changes.
      return string;
    };
    useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
    inRender = false;
    useIsomorphicInsertionEffect(() => {
      // Only register this if the render actually went through.  This needs to
      // be an insertion effect because `useSyncExternalStore` calls the
      // snapshot function again after the render, and we need to register this
      // update before that happens.
      lastPaths.current = nextPaths;
    });

    return ret;
  };

  const tracked = <P extends {}>(
    component: (props: P, state: Immutable<T>) => JsxElement,
  ) => {
    const memoized = memo((props: P) =>
      useTracked((state) => component(props, state)),
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
