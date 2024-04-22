import { stringify } from "csv-stringify/sync";
import * as fs from "fs";
import { latestDataFile } from "./helpers";

export async function run(tutorial: string = "") {
  const dataFile = latestDataFile();
  const json: any[] = require(dataFile);

  const tuts = json.filter((item) =>
    tutorial === ""
      ? item.sk.startsWith("Tutorial#")
      : item.sk === `Tutorial#${tutorial}`,
  );

  const data = tuts.map((item) => {
    const learner = item.pk.split("#")[1];
    const tutorial = item.sk.split("#")[1];
    const createdAt = new Date(item.createdAt);
    const updatedAt = new Date(item.updatedAt);
    return [
      learner,
      tutorial,
      createdAt.toLocaleString(),
      updatedAt.toLocaleString(),
    ];
  });

  const csv = stringify(data, {
    header: true,
    columns: [
      { key: "6-Digit Code", header: "6-Digit Code" },
      { key: "Tutorial", header: "Tutorial" },
      { key: "Time Started", header: "Time Started" },
      { key: "Last Update", header: "Last Update" },
    ],
  });

  const file = `${dataFile.split(".json")[0]}-ENTRIES.csv`;
  fs.writeFileSync(file, csv);
}
