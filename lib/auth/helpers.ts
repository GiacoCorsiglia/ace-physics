const separatorPattern = / |-|,/;

export const formatId = (id: string) => `${id.slice(0, 3)}-${id.slice(3, 6)}`;

export const unformatId = (id: string) => id.replace(separatorPattern, "");
