import * as codecs from "@/db/codecs";
import { round } from "@/helpers/server";
import { Result, unwrap } from "@/result";
import { TutorialSchema, TutorialState } from "@/schema/tutorial";
import { tutorialSchemas } from "@pages/tutorials/schemas";
import { stringify } from "csv-stringify/sync";
import * as fs from "fs";
import { latestDataFile } from "./helpers";

export async function run() {
  const dataFile = latestDataFile();
  const json: any[] = require(dataFile);

  const tutorialStates = codecItems(codecs.TutorialState, json);

  const rows = tutorialStates.map((item) => {
    const tutorial = item.tutorialId;
    const schema = tutorialSchemas.get(tutorial);

    if (!schema) {
      throw new Error(`Missing schema for '${tutorial}'.`);
    }

    return {
      tutorial,
      courseId: item.courseId,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
      updateCount: item.version,
      userEmail: item.userEmail,
      ...analyzeTutorialState(schema, item.state as TutorialState),
    };
  });

  const csv = stringify(rows, {
    header: true,
  });
  const file = `${dataFile.split(".json")[0]}-STATS.csv`;
  console.log("Writing to file:", file);
  fs.writeFileSync(file, csv);
}

const divideToZero = (a: number, b: number) => {
  if (b === 0) {
    if (a !== 0) {
      throw new Error("Unexpected division by zero");
    }
    return 0;
  }
  return a / b;
};

const mean = (
  ns: (number | undefined)[],
  undefinedAs: "zero" | "ignore" = "zero"
): number => {
  if (undefinedAs === "ignore") {
    ns = ns.filter((n) => n !== undefined);
  } else {
    ns = ns.map((n) => (n === undefined ? 0 : n));
  }

  const sum = ns.reduce((sum: number, n) => sum + n!, 0);
  return divideToZero(sum, ns.length);
};

const means = (
  ns: Record<string, number | undefined>[],
  undefinedAs: "zero" | "ignore" = "zero"
) => {
  // Assume all records have the same keys.
  const record = ns[0];
  const keys = Object.keys(record);
  const output: Record<string, number> = {};

  for (const key of keys) {
    output[key] = round(
      mean(
        ns.map((o) => o[key]),
        undefinedAs
      ),
      2
    );
  }

  return output;
};

const groupBy = <T, K extends string>(
  objects: readonly T[],
  fn: (o: T) => K
): Map<K, T[]> => {
  const groups = new Map<K, T[]>();
  objects.forEach((o) => {
    const key = fn(o);
    if (!groups.has(key)) {
      groups.set(key, []);
    }
    groups.get(key)!.push(o);
  });
  return groups;
};

interface Codec<T> {
  type: string;
  decode: (item: unknown) => Result<any, T>;
}

const codecItems = <T>(codec: Codec<T>, json: any[]): T[] =>
  json
    .filter((item) => item.type === codec.type)
    .map((item) => unwrap(codec.decode(item)));

const analyzeTutorialState = (schema: TutorialSchema, state: TutorialState) => {
  const {
    pages: $pages,
    pretest: $pretest,
    responses: $responses,
    sections: $sections,
    hints: $hints,
    feedback: $feedback,
  } = schema.properties;

  const { pages, pretest, responses, sections, hints, feedback } = state;

  return {
    ...analyzePages($pages, pages),
    ...analyzeHints($hints, hints),
    ...analyzeResponses($responses, responses),
  };
};

type Analyzer<K extends keyof TutorialState> = (
  schema: TutorialSchema["properties"][K],
  state: TutorialState[K]
) => Record<string, number>;

const analyzePages: Analyzer<"pages"> = ($pages, pages) => {
  const pageKeys = Object.keys($pages.properties);

  const revealedPages = pageKeys.filter(
    (pk) => pages?.[pk]?.status !== undefined
  ).length;

  const completedPages = pageKeys.filter(
    (pk) =>
      pages?.[pk]?.status !== undefined && pages?.[pk]?.status !== "revealed"
  ).length;

  const answerReflectionLength = mean(
    pageKeys.map((pk) => pages?.[pk]?.answers?.reflection?.length)
  );

  return {
    revealedPages,
    completedPages,
    answerReflectionLength,
  };
};

const analyzeHints: Analyzer<"hints"> = ($hints, hints) => {
  const hintKeys = Object.keys($hints.properties);

  const availableHints = hintKeys.length;

  const revealedHints = hintKeys.filter(
    (hk) => hints?.[hk]?.status === "revealed"
  ).length;

  const hintUsage = divideToZero(revealedHints, availableHints);

  return {
    availableHints,
    revealedHints,
    hintUsage,
  };
};

const analyzeResponses: Analyzer<"responses"> = ($responses, responses) => {
  const keys = Object.keys($responses.properties);

  const stringKeys = keys.filter((k) => {
    const schema = $responses.properties[k];
    // Ignore string fields that are just equation inputs.
    return schema.kind === "string" && schema.isWrittenResponse;
  });

  const textBoxes = stringKeys.length;

  const textBoxResponseLength = mean(
    stringKeys.map((k) => (responses?.[k] as string | undefined)?.trim().length)
  );

  return {
    textBoxes,
    textBoxResponseLength,
  };
};
