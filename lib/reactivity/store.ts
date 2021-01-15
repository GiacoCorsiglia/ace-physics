import type { Immutable, Path, TypeAtPath } from "@/helpers";
import { get, set } from "./immutable";

type Source = string | symbol;

export interface Store<T extends object> {
  readonly state: Immutable<T>;

  transaction(
    action: (set: Setter<Immutable<T>>, prevState: Immutable<T>) => void,
    source?: Source
  ): Immutable<T>;

  subscribe<P extends Path<T>>(
    path: P | string,
    listener: (newValue: TypeAtPath<T, P>, source: Source | undefined) => void
  ): () => void;

  onTransaction(watcher: Watcher<T>): () => void;
}

type Watcher<T> = (
  updates: Update<Immutable<T>>[],
  finalState: Immutable<T>,
  transactionSource: Source | undefined
) => void;

type Update<T> = readonly [Path<T>, any];

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

  type Listener = (newValue: any, source: Source | undefined) => void;

  const subscriptions = new Map<string, Set<Listener>>();

  const transactionWatchers = new Set<Watcher<T>>();

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

    transaction(action, source) {
      // Stash the current state at the beginning of the transaction.
      let transactionState = currentState;

      // Keep track of which paths were directly set.
      const updates: [Path<Immutable<T>>, any][] = [];
      const setPaths = new Set<string>();

      // Fire the action with the setter, which mutates transactionState.
      action((path, newValue) => {
        updates.push([path, newValue]);
        const newState = set(transactionState, path, newValue);
        if (newState !== transactionState) {
          // Only record the change if...something actually changed.
          transactionState = newState;
          setPaths.add(pathString(path));
        }
        return newState;
      }, currentState);

      // TODO: Consider making transactions cancelable.  This would be the spot.

      // Now flush the changes, updating the actual state.
      currentState = transactionState;

      // Then fire the appropriate listeners.
      subscriptions.forEach((listeners, listenerPath) => {
        let needsToFire = false;
        setPaths.forEach((setPath) => {
          // This will fire listeners for all parent objects/arrays of a
          // property that was set directly.
          const childWasSet = setPath.startsWith(listenerPath);
          // This  will fire listeners for all descendent properties of an
          // object/array anytime it was set directly, (even if the descendent
          // property wasn't specifically changed).
          const parentWasSet = listenerPath.startsWith(setPath);
          // const selfWasSet = childWasSet && parentWasSet;
          if (childWasSet || parentWasSet) {
            needsToFire = true;
          }
        });

        if (!needsToFire) {
          return;
        }

        const unset = {};
        let newValue: any = unset;
        listeners.forEach((listener) => {
          const needsValue = listener.length > 0;
          if (needsValue && newValue === unset) {
            newValue = get(currentState, splitPathString(listenerPath) as any);
          }
          listener(needsValue ? newValue : undefined, source);
        });
      });

      transactionWatchers.forEach((watcher) =>
        watcher(updates, transactionState, source)
      );

      // Finally, return the new state.
      return currentState;
    },

    subscribe(path, listener) {
      const str = typeof path === "string" ? path : pathString(path);

      let listenerSet = subscriptions.get(str);
      if (!listenerSet) {
        listenerSet = new Set();
        subscriptions.set(str, listenerSet);
      }
      listenerSet.add(listener);

      return () => {
        subscriptions.get(str)?.delete(listener);
        enqueueSubscriptionCleanup();
      };
    },

    onTransaction(watcher) {
      transactionWatchers.add(watcher);
      return () => transactionWatchers.delete(watcher);
    },
  };
};
