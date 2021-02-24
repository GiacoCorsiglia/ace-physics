import * as colors from "./colors";

const shadow = (
  shadows: [sizing: string, alpha: number][],
  color: colors.Shade
) =>
  shadows
    .map(([sizing, alpha]) => `${sizing} ${colors.alpha(color, alpha)}`)
    .join(", ");

const shadows = (...shadows: [sizing: string, alpha: number][]) =>
  ({
    neutral: shadow(shadows, colors.neutral.$900),
    green: shadow(shadows, colors.green.$800),
    blue: shadow(shadows, colors.blue.$800),
    yellow: shadow(shadows, colors.yellow.$800),
    red: shadow(shadows, colors.red.$800),
  } as const);

export const light = shadows(["0 1px 8px", 0.1]);
export const button = shadows(
  ["0 2px 4px", 0.17],
  ["0 12px 18px", 0.13],
  ["0 11px 34px", 0.12]
);
export const large = shadows(["0px 4px 30px", 0.1]);

export const input = shadows(["0 1px 3px", 0.05], ["0 3px 11px", 0.04]);

export const inputFocused = `0 3px 4px ${colors.alpha(
  colors.neutral.$900,
  0.08
)},
  0 5px 11px ${colors.alpha(colors.neutral.$900, 0.07)}`;
