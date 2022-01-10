import { normalize } from "@/helpers/client";

export const uUnnormalized = [-3, 4] as const;
export const vUnnormalized = [3, -1] as const;
export const u = normalize(uUnnormalized);
export const v = normalize(vUnnormalized);
