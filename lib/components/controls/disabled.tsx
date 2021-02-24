import { Html } from "@/helpers/frontend";
import { createContext, useContext } from "react";

const Context = createContext(false);

export const DisableInputs = ({
  when,
  children,
}: {
  when: boolean;
  children?: Html;
}) => <Context.Provider value={when}>{children}</Context.Provider>;

export const useDisabled = (disabled: boolean | { disabled?: boolean }) => {
  const isGloballyDisabled = useContext(Context);
  const isLocallyDisabled =
    typeof disabled === "boolean" ? disabled : !!disabled.disabled;
  return isGloballyDisabled || isLocallyDisabled;
};
