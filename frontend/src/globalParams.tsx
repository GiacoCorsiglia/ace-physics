const params = new URLSearchParams(window.location.search);

const enabled =
  process.env.REACT_APP_ACE_ENV === "development" ||
  process.env.REACT_APP_ACE_ENV === "staging";

const previewMode = enabled && params.get("preview") !== null;

export const unconditionalMoveOn = enabled && params.get("amo") !== null;
export const showAllSections =
  enabled && (previewMode || params.get("show") !== null);
export const mockApi =
  enabled &&
  (process.env.REACT_APP_ACE_API !== "yes" ||
    previewMode ||
    params.get("api") === "no");
