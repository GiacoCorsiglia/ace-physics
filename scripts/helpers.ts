import * as fs from "fs";
import * as path from "path";

export const latestDataFile = () => {
  const regex = new RegExp(`${process.env.ACE_ENV}-data-.+\\.json`);
  const jsonFiles = fs
    .readdirSync(path.join(__dirname, "data"))
    .filter((name) => regex.test(name));
  const file = jsonFiles.sort()[jsonFiles.length - 1];

  if (!file) {
    throw "No matching data file";
  }

  return path.join(__dirname, "data", file);
};
