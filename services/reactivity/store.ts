interface Store<T extends object> {
  readonly state: Immutable<T>;

  transaction(
    action: (
      set: <P extends [] | Path<Immutable<T>>>(
        path: P,
        newValue: TypeAtPath<Immutable<T>, P>
      ) => void,
      prevState: Immutable<T>
    ) => void
  ): void;

  subscribe<P extends [] | Path<T>>(
    path: P | string,
    listener: (newValue: TypeAtPath<T, P>) => void
  ): () => void;
}

const pathString = (path: readonly PropertyKey[]) => path.join("/");
const splitPathString = (path: string) => (path === "" ? [] : path.split("/"));

export const store = <T extends object>(initial: Immutable<T>): Store<T> => {
  // All the updates are immutable so it's fine to not clone here.
  let currentState = initial;

  const subscriptions = new Map<string, Set<(newValue: any) => void>>();

  let timeout: number | null = null;
  const enqueueSubscriptionCleanup = () => {
    if (timeout !== null) {
      return;
    }
    timeout = setTimeout(() => {
      subscriptions.forEach((set, key) => {
        if (set.size === 0) {
          subscriptions.delete(key);
        }
      });
      timeout = null;
    });
  };

  return {
    get state() {
      return currentState;
    },

    transaction(action) {
      const changedPaths = new Set<string>();

      let transactionState = currentState;

      const set = <P extends [] | Path<Immutable<T>>>(
        path: P,
        newValue: TypeAtPath<Immutable<T>, P>
      ) => {
        if (get(transactionState, path) === newValue) {
          // No changes!  We could consider checking isShallowEqual() here, too.
          return;
        }

        let last: any = transactionState;
        const valueStack: any[] = [last];
        for (let i = 0; i < path.length - 1; i++) {
          const key = path[i];
          let next = last[key];
          if (!isObject(next)) {
            next = isIndex(key) ? [] : {};
          }
          last = next;
          valueStack.push(last);
        }

        let newState: any = newValue;
        for (let i = path.length - 1; i >= 0; i--) {
          const key = path[i];
          const prev = valueStack.pop();
          if (Array.isArray(prev)) {
            const nextNewState: any = prev.slice();
            nextNewState[key] = newState;
            newState = nextNewState;
          } else {
            newState = { ...prev, [key]: newState };
          }
        }

        transactionState = newState;
        changedPaths.add(pathString(path));
      };

      const flush = () => {
        if (process.env.NODE_ENV !== "production") {
          console.info("New state:", transactionState);
        }

        currentState = transactionState;

        // Surely there's a more efficient implementation here...
        const listenersToFire = new Map<(value: any) => void, any>();

        for (const changedPath of changedPaths) {
          subscriptions.forEach((listeners, listenerPath) => {
            if (
              changedPath.startsWith(listenerPath) ||
              listenerPath.startsWith(changedPath)
            ) {
              const newValue = get(
                currentState,
                splitPathString(listenerPath) as any
              );
              listeners.forEach((listener) => {
                listenersToFire.set(listener, newValue);
              });
            }
          });
        }

        listenersToFire.forEach((newValue, listener) => listener(newValue));

        changedPaths.clear();
      };

      action(set, currentState);
      flush();
    },

    subscribe(path, listener) {
      const str = typeof path === "string" ? path : pathString(path);
      let set = subscriptions.get(str);
      if (!set) {
        set = new Set();
        subscriptions.set(str, set);
      }
      set.add(listener);

      return () => {
        subscriptions.get(str)?.delete(listener);
        enqueueSubscriptionCleanup();
      };
    },
  };
};

const get = <T, P extends [] | Path<T>>(
  value: T,
  path: P
): TypeAtPath<T, P> => {
  let reference: any = value;
  for (const key of path) {
    if (!isObject(reference)) {
      // If we get here, it means we have another key to read, but the reference
      // doesn't hold an object (array or {}), so we can't.
      return undefined as any;
    }
    reference = (reference as any)[key];
  }
  return reference;
};

// Helper functions.

const isObject = (value: unknown): value is object =>
  value !== null && typeof value === "object";

const indexRegEx = /^(?:0|[1-9]\d*)$/;
const isIndex = (i: PropertyKey) =>
  typeof i === "number" ||
  (typeof i !== "symbol" &&
    indexRegEx.test(i) &&
    // JavaScript will "correctly" cast the string to a number for this test.
    ((i as unknown) as number) > -1 &&
    ((i as unknown) as number) % 1 == 0);

// Helper types.

type Path<O> = O extends object
  ? {
      [K in keyof O]-?:
        | readonly [K]
        | (Path<O[K]> extends infer P
            ? P extends readonly any[]
              ? readonly [K, ...P]
              : never
            : never);
    }[keyof O]
  : readonly [];

type TypeAtPath<O, P extends readonly PropertyKey[]> = P extends readonly []
  ? O
  : O extends any // This distributes over unions.
  ? P extends readonly [keyof O, ...infer T]
    ? T extends PropertyKey[]
      ? TypeAtPath<O[P[0]], T>
      : never
    : never
  : never;

// Stolen from Immer:
// https://github.com/immerjs/immer/blob/7faa7b47df78f30fced650c323f6b53b5e62e160/src/types/types-external.ts#L58
type Immutable<T> = T extends
  | Function
  | Promise<any>
  | Date
  | RegExp
  | Boolean
  | Number
  | String
  ? T
  : T extends ReadonlyMap<infer K, infer V>
  ? ReadonlyMap<Immutable<K>, Immutable<V>>
  : T extends ReadonlySet<infer V>
  ? ReadonlySet<Immutable<V>>
  : T extends WeakMap<any, any> | WeakSet<any>
  ? T
  : T extends object
  ? { readonly [K in keyof T]: Immutable<T[K]> }
  : T;
