// We assume 1rem = 16px.
export const $25 = "0.25rem";
export const $50 = "0.5rem";
export const $75 = "0.75rem";
export const $100 = "1rem";
export const $150 = "1.5rem";
export const $200 = "2rem";
export const $300 = "3rem";
export const $400 = "4rem";
export const $600 = "6rem";
export const $800 = "8rem";
export const $1200 = "12rem";
export const $1600 = "16rem";
export const $1400 = "14rem";
export const $3200 = "32rem";
export const $4000 = "40rem";

export const add = (...spaces: string[]) =>
  `${spaces.reduce((sum, val) => sum + parseFloat(val), 0)}rem`;
