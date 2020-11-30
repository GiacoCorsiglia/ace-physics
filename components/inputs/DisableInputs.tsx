import { createContext, useContext } from "react";
import { Children } from "services/util";

const Context = createContext(false);

export default function DisableInputs({
  when,
  children,
}: { when: boolean } & Children) {
  return <Context.Provider value={when}>{children}</Context.Provider>;
}

export function useDisabled(disabled: boolean | { disabled?: boolean }) {
  const isGloballyDisabled = useContext(Context);
  disabled = typeof disabled === "boolean" ? disabled : !!disabled.disabled;
  return isGloballyDisabled || disabled;
}
