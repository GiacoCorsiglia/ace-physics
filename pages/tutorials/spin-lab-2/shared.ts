import { normalize } from "@/helpers/frontend";

export const uUnnormalized = [-3, 4] as const;
export const vUnnormalized = [3, -1] as const;
export const u = normalize(uUnnormalized);
export const v = normalize(vUnnormalized);
