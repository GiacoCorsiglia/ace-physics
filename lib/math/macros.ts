import { css, cx } from "linaria";

const spacing = (padding: string, verticalShift?: string) => ({
  paddingLeft: padding,
  paddingRight: padding,

  "& > *": verticalShift
    ? {
        position: "relative",
        top: verticalShift,
      }
    : ({} as {}),
});

const circled = css`
  box-shadow: inset 0 0 0 1px currentColor;
  border-radius: 100%;
`;

const smalleye = cx(
  circled,
  css`
    ${spacing("0.45em", "-0.3em")}
  `
);

const wideye = cx(
  circled,
  css`
    ${spacing("0.3em")}
  `
);

const smiley = cx(
  circled,
  css`
    ${spacing("0.18em", "0.05em")}
  `
);

// This removes the need for double backslashes in the macro definitions below.
const t = String.raw;

export const macros = {
  "\\e": t`{\rm e}`,
  // Some exports from the physics package:
  "\\vu": t`\mathbf{\hat{#1}}`,
  "\\vb": t`\mathbf{#1}`,
  // The braces around {#3} here seem to improve the spacing.  An alternative is
  // to use the `\!` command for negative space as in \brasub.
  "\\prescript": t`{}_{#1}^{#2}{#3}`,
  "\\brasub": t`{}_{#1}\!`,
  // From the quantum mouse tutorial:
  "\\smalleye": t`\htmlClass{${smalleye}}{\tiny \bull}`,
  "\\wideye": t`\htmlClass{${wideye}}{\large \ast}`,
  "\\smiley": t`\htmlClass{${smiley}}{\mathbf{\footnotesize \ddot \smile}}`,
  "\\frownie": t`\htmlClass{${smiley}}{\mathbf{\footnotesize \ddot \frown}}`,
};
