import type { Immutable, Path, TypeAtPath } from "@/helpers/frontend";
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
  finalState: Immutable<T>,
  updates: Updates<T>,
  transactionSource: Source | undefined
) => void;

type Update<T> = readonly [Path<Immutable<T>>, any];
export type Updates<T> = readonly Update<T>[];

export type Setter<T> = <P extends Path<T>>(
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
    timeout = window.setTimeout(() => {
      subscriptions.forEach((set, key) => {
        if (set.size === 0) {
          subscriptions.delete(key);
        }
      });
      timeout = null;
    });
  };

  interface Transaction {
    transactionState: Immutable<T>;
    updates: Update<T>[];
    setPaths: Set<string>;
  }
  const transactionStack: Transaction[] = [];

  return {
    get state() {
      return currentState;
    },

    transaction(action, source) {
      const parent: Transaction | undefined =
        transactionStack[transactionStack.length - 1];

      const startingState = parent ? parent.transactionState : currentState;

      const self: Transaction = {
        transactionState: startingState,
        updates: [],
        setPaths: new Set(),
      };

      // We need to push even though we pop below, for nested transactions.
      transactionStack.push(self);

      // Fire the action with the setter, which mutates transactionState.
      action((path, newValue) => {
        self.updates.push([path, newValue]);
        const newState = set(self.transactionState, path, newValue);
        if (newState !== self.transactionState) {
          // Only record the change if...something actually changed.
          self.transactionState = newState;
          self.setPaths.add(pathString(path));
        }
        return newState;
      }, startingState);

      // TODO: Consider making transactions cancelable.  This would be the spot.

      // Now remove `self` from the transactionStack.
      transactionStack.pop();

      if (parent) {
        // We're in a nested transaction; don't flush yet.  Instead, pass our
        // changes up the stack.  Note the `currentState` isn't updated yet.
        parent.transactionState = self.transactionState;
        self.setPaths.forEach((p) => parent.setPaths.add(p));
        parent.updates.push(...self.updates);
        return self.transactionState;
      }

      // Otherwise, we were in the topmost transaction.

      // So, flush the changes, updating the actual state.  Update before firing
      // listeners in case they themselves depend on the `store.state`.
      currentState = self.transactionState;

      // Then fire the appropriate listeners.
      subscriptions.forEach((listeners, listenerPath) => {
        let needsToFire = false;
        self.setPaths.forEach((setPath) => {
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
        watcher(currentState, self.updates, source)
      );

      // Finally return the latest state.
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
