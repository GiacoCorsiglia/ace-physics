// TODO: This file doesn't work for SSG/SSR
const params = new URLSearchParams(
  typeof window !== "undefined" ? window.location.search : ""
);

const enabled =
  process.env.NEXT_PUBLIC_ACE_ENV === "development" ||
  process.env.NEXT_PUBLIC_ACE_ENV === "staging";

const previewMode = enabled && params.get("preview") !== null;

export const unconditionalMoveOn = enabled && params.get("amo") !== null;
export const showAllSections =
  enabled && (previewMode || params.get("show") !== null);
export const mockApi =
  enabled &&
  (process.env.NEXT_PUBLIC_ACE_API !== "yes" ||
    previewMode ||
    params.get("api") === "no");
