import type { TutorialState } from "@/schema/db";
import { TutorialSchema } from "@/schema/tutorial";
import { stringify } from "csv-stringify/sync";
import * as fs from "fs";
import path from "path";
import { latestDataFile } from "./helpers";

export async function run(tutorial: string) {
  const dataFile = latestDataFile();
  const schema: TutorialSchema = (
    await import(path.join("../pages/tutorials/", tutorial, "schema.ts"))
  ).default;
  const pretestProperties = Object.keys(schema.properties.pretest.properties);
  const feedbackProperties = Object.keys(schema.properties.feedback.properties);

  const json: (TutorialState & {
    sk: string;
    pk: string;
  })[] = require(dataFile);

  const coursesByLearner = new Map(
    json
      .filter((item) => item.sk === "Profile")
      .map((learner) => [learner.pk, (learner as any).course])
  );

  const tuts = json.filter(
    (item) => item.sk === `Tutorial#${pascalCase(tutorial)}`
  );

  const data = tuts.map((item) => {
    const course = coursesByLearner.get(item.pk);
    const learner = item.pk.split("#")[1];
    const createdAt = new Date(item.createdAt);
    const updatedAt = new Date(item.updatedAt);
    const pretestData = pretestProperties.map((prop) => {
      const val = item.state?.pretest?.[prop];
      if (val?.selected && !val?.other) {
        // Quick hack for choose fields.
        return stringifyAsJSONIfNecessary(val.selected);
      }
      return stringifyAsJSONIfNecessary(val);
    });
    const feedbackData = feedbackProperties.map((prop) => {
      const val = item.state?.feedback?.[prop];
      if (val?.selected && !val?.other) {
        // Quick hack for choose fields.
        return stringifyAsJSONIfNecessary(val.selected);
      }
      return stringifyAsJSONIfNecessary(val);
    });
    return [
      course,
      learner,
      createdAt.toLocaleString(),
      updatedAt.toLocaleString(),
      ...pretestData,
      ...feedbackData,
    ];
  });

  data.sort(([aCourse, , aCreated], [bCourse, , bCreated]) => {
    return aCourse === bCourse
      ? aCreated.localeCompare(bCreated)
      : aCourse.localeCompare(bCourse);
  });

  const csv = stringify(data, {
    header: true,
    columns: [
      { key: "Course", header: "Course" },
      { key: "Account Code", header: "Account Code" },
      { key: "Time Started", header: "Time Started" },
      { key: "Last Update", header: "Last Update" },
      ...pretestProperties.map((prop) => ({ key: prop, header: prop })),
      ...feedbackProperties.map((prop) => ({
        key: prop,
        header: `Feedback: ${prop}`,
      })),
    ],
  });

  const file = `${dataFile.split(".json")[0]}-PRETESTS.csv`;
  fs.writeFileSync(file, csv);
}

const pascalCase = (s: string) =>
  s
    .replace(/(\w)(\w*)/g, (_, g1, g2) => g1.toUpperCase() + g2.toLowerCase())
    .replace(/-/g, "");

const stringifyAsJSONIfNecessary = (v: any): string | undefined =>
  v === undefined || v === null
    ? undefined
    : typeof v === "string"
    ? v
    : JSON.stringify(v);
