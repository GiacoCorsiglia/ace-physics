import { useLayoutEffect } from "react";
import { Store } from "./store";

// https://medium.com/@zalmoxis/redux-devtools-without-redux-or-how-to-have-a-predictable-state-with-any-architecture-61c5f5a7716f

export const useDevTools = (store: Store<any>, displayName: string) => {
  useLayoutEffect(() => {
    const hasDevTools =
      process.env.NODE_ENV === "development" &&
      typeof window !== "undefined" &&
      window.__REDUX_DEVTOOLS_EXTENSION__;

    if (!hasDevTools) {
      return;
    }

    console.log("Dev tools: connecting");

    // https://github.com/zalmoxisus/redux-devtools-extension/blob/master/docs/API/Arguments.md
    const devTools = window.__REDUX_DEVTOOLS_EXTENSION__.connect({
      name: displayName,
    });

    const initial = store.state;
    devTools.init(initial);

    const thisSource = Symbol();

    const unsubscribeFromStore = store.onTransaction(
      (finalState, updates, updateSource) => {
        if (updateSource === thisSource) {
          return;
        }

        const updateStr = updates
          .map(([path]) => (path.length === 0 ? "[]" : path.join("/")))
          .join(", ");
        const actionName = updates.length === 1 ? updateStr : `[${updateStr}]`;

        devTools.send(
          {
            type: actionName,
            updateCount: updates.length,
            updates: updates.map(([path, value]) => ({
              path: path.join("/"),
              value,
            })),
          },
          finalState
        );
      }
    );

    const setState = (state: any) =>
      store.transaction((set) => set([], state), thisSource);

    // https://github.com/zalmoxisus/mobx-remotedev/blob/2d9ea51d3378e0507cfe8295046491e9f25c4a77/src/monitorActions.js#L46
    devTools.subscribe((message: any) => {
      if (message.type !== "DISPATCH") {
        console.log("Dev tools: unsupported monitor action", message);
        return;
      }

      switch (message.payload.type) {
        case "RESET":
          devTools.init(setState(initial));
          return;
        case "COMMIT":
          devTools.init(store.state);
          return;
        case "ROLLBACK":
          devTools.init(setState(JSON.parse(message.state)));
          return;
        case "JUMP_TO_STATE":
        case "JUMP_TO_ACTION":
          setState(JSON.parse(message.state));
          return;
        default:
          console.log("Dev tools: unsupported monitor action", message);
          return;
      }
    });

    return () => {
      unsubscribeFromStore();
      devTools.unsubscribe();
    };
  }, [store, displayName]);
};
