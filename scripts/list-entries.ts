import stringify from "csv-stringify/lib/sync";
import * as fs from "fs";
import { latestDataFile } from "./helpers";

export async function run(tutorial: string, edition: string = "Main") {
  const dataFile = latestDataFile();
  const json: any[] = require(dataFile);

  const tuts = json.filter(
    (item) => item.sk === `Tutorial#${tutorial}#${edition}`
  );

  const data = tuts.map((item) => {
    const learner = item.pk.split("#")[1];
    const createdAt = new Date(item.createdAt);
    const updatedAt = new Date(item.updatedAt);
    return [learner, createdAt.toLocaleString(), updatedAt.toLocaleString()];
  });

  const csv = stringify(data, {
    header: true,
    columns: [
      { key: "6-Digit Code", header: "6-Digit Code" },
      { key: "Time Started", header: "Time Started" },
      { key: "Last Update", header: "Last Update" },
    ],
  });

  const file = `${dataFile.split(".json")[0]}-ENTRIES.csv`;
  fs.writeFileSync(file, csv);
}
