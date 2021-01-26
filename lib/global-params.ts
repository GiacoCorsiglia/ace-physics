// TODO: This file doesn't work for SSG/SSR
const params = new URLSearchParams(
  typeof window !== "undefined" ? window.location.search : ""
);

const enabled =
  process.env.NEXT_PUBLIC_ACE_ENV === "development" ||
  process.env.NEXT_PUBLIC_ACE_ENV === "staging";

const previewMode = enabled && params.get("preview") !== null;

/** @deprecated */
export const unconditionalMoveOn = enabled && params.get("amo") !== null;

export const showAllSections =
  enabled && (previewMode || params.get("show") !== null);

const mockLocalApi =
  process.env.NEXT_PUBLIC_ACE_ENV === "development" &&
  process.env.NEXT_PUBLIC_LOCAL_API !== "yes";

export const mockApi =
  enabled && (mockLocalApi || previewMode || params.get("api") === "no");
