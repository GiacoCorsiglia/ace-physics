const baseSize = 16; // This is 1rem in px (for normal browsers)
const pxToRem = (px: number) => `${px / baseSize}rem`;

// Families.
const sans =
  "-apple-system, BlinkMacSystemFont, avenir next, avenir, helvetica neue, helvetica, Ubuntu, roboto, noto, segoe ui, arial, sans-serif";
const serif = "'Bitter', serif";

// Weights.
export const regular = 400;
export const bold = 700;

export const uiRegular = "normal";
export const uiBold = "bold";

// Styles.
const textStyle = (
  fontFamily: string,
  fontWeight: number | string,
  fontSize: number,
  lineHeight: number
) =>
  ({
    fontFamily,
    fontWeight,
    fontSize: pxToRem(fontSize),
    lineHeight: pxToRem(lineHeight),
  } as const);

export const heading1 = textStyle(serif, bold, 48, 56);
export const heading2 = textStyle(serif, bold, 36, 44);
export const heading3 = textStyle(serif, bold, 30, 36);
export const heading4 = textStyle(serif, bold, 24, 32);
export const heading5 = textStyle(serif, bold, 20, 28);
export const heading6 = textStyle(serif, bold, 18, 24);
export const body = textStyle(serif, regular, 18, 32);
export const small = textStyle(serif, regular, 16, 24);
export const smallest = textStyle(serif, regular, 14, 20);

export const ui = textStyle(sans, uiRegular, 18, 24);
export const uiSmall = textStyle(sans, uiRegular, 14, 16);
