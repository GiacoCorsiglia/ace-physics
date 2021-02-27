import { normalize } from "@/helpers/frontend";
import { css } from "linaria";

export const uUnnormalized = [-3, 4] as const;
export const vUnnormalized = [3, -1] as const;
export const u = normalize(uUnnormalized);
export const v = normalize(vUnnormalized);

export const equationCss = css`
  margin-top: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;

  & > * + * {
    margin-left: 0.5rem;
  }
`;
