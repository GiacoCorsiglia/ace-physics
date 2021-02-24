export type Color =
  | typeof neutral
  | typeof green
  | typeof blue
  | typeof yellow
  | typeof red;

export type Shade = typeof neutral["$50"] | Color[keyof Color];

export const white = "hsl(0, 0%, 100%)";

export const neutral = {
  $50: "hsl(43, 63.6%, 97.8%)",
  $100: "hsl(40, 67.7%, 93.9%)",
  $200: "hsl(39, 68.6%, 90%)", // Also used in global.css
  $300: "hsl(36, 55.6%, 85.9%)",
  $400: "hsl(31, 47.7%, 79%)",
  $500: "hsl(31, 36.7%, 69%)",
  $600: "hsl(30, 29.3%, 44.9%)",
  $700: "hsl(28, 34.9%, 33.1%)",
  $800: "hsl(29, 54.6%, 19%)",
  $900: "hsl(29, 88.2%, 10%)",
} as const;

export const green = {
  $100: "hsl(92, 72.7%, 87.1%)",
  $200: "hsl(98, 64.7%, 80%)",
  $300: "hsl(109, 60.8%, 72%)",
  $400: "hsl(119, 50%, 56.1%)",
  $500: "hsl(124, 71.1%, 38%)",
  $600: "hsl(124, 77.5%, 27.8%)",
  $700: "hsl(124, 87%, 18%)",
  $800: "hsl(124, 96.1%, 10%)",
  $900: "hsl(126, 88.6%, 6.9%)",
} as const;

export const blue = {
  $100: "hsl(224, 60%, 95.1%)",
  $200: "hsl(220, 78.3%, 91%)",
  $300: "hsl(217, 80.2%, 84.1%)",
  $400: "hsl(221, 84.5%, 72.2%)",
  $500: "hsl(221, 85.4%, 59.8%)",
  $600: "hsl(222, 68.8%, 51%)",
  $700: "hsl(221, 90.4%, 36.9%)",
  $800: "hsl(218, 91.5%, 23.1%)",
  $900: "hsl(217, 95.7%, 9%)",
} as const;

export const yellow = {
  $100: "hsl(39, 100%, 88%)",
  $200: "hsl(40, 100%, 80%)",
  $300: "hsl(40, 95.9%, 71%)",
  $400: "hsl(39, 97%, 61%)",
  $500: "hsl(39, 99.2%, 52%)",
  $600: "hsl(38, 100%, 43.9%)",
  $700: "hsl(38, 98.9%, 36.1%)",
  $800: "hsl(35, 100%, 25.1%)",
  $900: "hsl(42, 100%, 8%)",
} as const;

export const red = {
  $100: "hsl(14, 92.2%, 90%)",
  $200: "hsl(11, 88.9%, 85.9%)",
  $300: "hsl(11, 88.3%, 73.1%)",
  $400: "hsl(11, 81.3%, 62.2%)",
  $500: "hsl(11, 66.3%, 50%)",
  $600: "hsl(11, 70.3%, 41%)",
  $700: "hsl(11, 88.2%, 30%)",
  $800: "hsl(10, 100%, 18%)",
  $900: "hsl(0, 100%, 9%)",
} as const;

// We don't need to do anything fancy since every color is formatted the same.
export const alpha = (shade: Shade, alpha: number) =>
  `hsla(${shade.slice(4, -1)}, ${alpha})`;
