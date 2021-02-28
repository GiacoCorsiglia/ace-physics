import { Css } from "@/helpers/frontend";
import { styled } from "linaria/react";

export const visiblyHiddenStyles: Css = {
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: "1px",
  width: "1px",
  overflow: "hidden",
  position: "absolute",
  whiteSpace: "nowrap",
};

export const VisiblyHidden = styled.div`
  &:not(:focus):not(:active) {
    ${visiblyHiddenStyles}
  }
`;
