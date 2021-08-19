import { Html } from "@/helpers/frontend";
import { createContext, useContext } from "react";
import { Callout } from "./callouts";

const AnswerVisibilityContext = createContext(false);
AnswerVisibilityContext.displayName = "AnswerVisibilityContext";

export const AnswerVisibility = ({
  visible,
  children,
}: {
  visible: boolean;
  children?: Html;
}) => (
  <AnswerVisibilityContext.Provider value={visible}>
    {children}
  </AnswerVisibilityContext.Provider>
);

export const Answer = ({
  correct,
  children,
  ...props
}: { correct?: boolean | "undetermined" } & JSX.IntrinsicElements["div"]) => {
  if (!useContext(AnswerVisibilityContext)) {
    return null;
  }

  // Explicitly check `true` or `false` to default to "undetermined"
  const color = correct === true ? "green" : correct === false ? "red" : "blue";

  return (
    <Callout {...(props as any)} color={color} title="Our Answer:">
      {children}
    </Callout>
  );
};
