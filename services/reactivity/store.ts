import { Immutable, Path, TypeAtPath } from "services/helpers";
import { get, set } from "./immutable";

export interface Store<T extends object> {
  readonly state: Immutable<T>;

  transaction(
    action: (set: Setter<Immutable<T>>, prevState: Immutable<T>) => void
  ): Immutable<T>;

  subscribe<P extends Path<T>>(
    path: P | string,
    listener: (newValue: TypeAtPath<T, P>) => void
  ): () => void;
}

type Setter<T> = <P extends Path<T>>(
  path: P,
  newValue:
    | TypeAtPath<T, P>
    | ((oldValue: TypeAtPath<T, P>) => TypeAtPath<T, P>)
) => T;

const pathString = (path: readonly PropertyKey[]) => path.join("/");
const splitPathString = (path: string) => (path === "" ? [] : path.split("/"));

export const store = <T extends object>(initial: T): Store<T> => {
  // All the updates are immutable so it's fine to not clone here.
  let currentState: Immutable<T> = initial as Immutable<T>;

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

      // Fire the action with the setter, which mutates transactionState.
      action((path, newValue) => {
        const newState = set(transactionState, path, newValue);
        if (newState !== transactionState) {
          transactionState = newState;
          changedPaths.add(pathString(path));
        }
        return newState;
      }, currentState);

      // Now flush the changes.
      currentState = transactionState;

      if (process.env.NODE_ENV !== "production") {
        console.info("New state:", transactionState);
      }

      // And fire the appropriate listeners.
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

      // Finally, return the new state.
      return currentState;
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
