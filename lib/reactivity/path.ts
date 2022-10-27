const sep = "/";

export const pathToString = (path: readonly PropertyKey[]) => path.join(sep);

export const stringToPath = (path: string) =>
  path === "" ? [] : path.split(sep);
