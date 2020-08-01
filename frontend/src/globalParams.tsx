import * as React from "react";
import { Children } from "./util";

export const Context = React.createContext<GlobalParams>({
  unconditionalMoveOn: false,
});

interface GlobalParams {
  unconditionalMoveOn: boolean;
}

export function GlobalParamsProvider({ children }: Children) {
  const ref = React.useRef<GlobalParams>();

  if (ref.current === undefined) {
    const params = new URLSearchParams(window.location.search);

    ref.current = {
      unconditionalMoveOn:
        process.env.NODE_ENV === "development" && params.get("amo") !== null,
    };
  }

  return <Context.Provider value={ref.current}>{children}</Context.Provider>;
}
