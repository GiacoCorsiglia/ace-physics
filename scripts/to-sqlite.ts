import * as ddb from "@/api/db";
import * as apiTypes from "@/schema/api";
import * as f from "@/schema/fields";
import { TutorialFeedback } from "@/schema/tutorial";
import { tutorialSchemas } from "@pages/tutorials/schemas";
import { names, tutorialFeedback } from "common/tutorials";
import { existsSync, readdirSync, readFileSync, unlinkSync } from "fs";
import { join } from "path";
import { Database, open } from "sqlite";
import sqlite3 from "sqlite3";

sqlite3.verbose();

run();
async function run() {
  const dataFile = getLatestFile();

  const dbFile = dataFile.replace(".json", ".sqlite");
  const dbFilepath = join(__dirname, "data", dbFile);
  if (existsSync(dbFilepath)) {
    unlinkSync(dbFilepath);
  }
  const db = await open({
    filename: dbFilepath,
    driver: sqlite3.Database,
  });

  console.log(`Setting up Database: ${dbFile}`);
  await setup(db);

  console.log(`Reading data from: ${dataFile}`);
  const data = JSON.parse(
    readFileSync(join(__dirname, "data", dataFile), "utf-8")
  );

  console.log("Inserting data...");
  insertData(db, data);
  console.log(`Inserted ${data.length} items into ${dataFile}`);
}

function getLatestFile() {
  const regex = /data-.+\.json/;
  const jsonFiles = readdirSync(join(__dirname, "data")).filter((name) =>
    regex.test(name)
  );
  return jsonFiles.sort()[jsonFiles.length - 1];
}

async function setup(db: Database) {
  // NOTE: Institution and course will be null for anonymous accounts.
  await db.exec(`
    CREATE TABLE Learners(
      learnerId INTEGER PRIMARY KEY,
      institution INTEGER,
      course INTEGER,
      createdAt STRING NOT NULL
    )
  `);

  await db.exec(`
      CREATE TABLE Tutorials(
        tutorialId INTEGER PRIMARY KEY,
        learnerId INTEGER NOT NULL,
        createdAt TEXT  NOT NULL,
        updatedAt TEXT NOT NULL,
        tutorial TEXT NOT NULL,
        edition TEXT NOT NULL,
        FOREIGN KEY(learnerId) REFERENCES Learners(learnerId)
      )
  `);

  await db.exec(`
      CREATE TABLE TutorialFeedback(
        tutorialId NOT NULL,
        ${schemaToColumnsDef(TutorialFeedback)},
        FOREIGN KEY(tutorialId) REFERENCES Tutorials(tutorialId)
      )
  `);

  return Promise.all(
    [...tutorialSchemas.entries()].map(([name, schema]) => {
      return Promise.all([
        db.exec(`
          CREATE TABLE Responses_${name}(
            tutorialId NOT NULL,
            ${schemaToColumnsDef(schema.properties.responses)},
            FOREIGN KEY(tutorialId) REFERENCES Tutorials(tutorialId)
          )
        `),

        db.exec(`
          CREATE TABLE Pretest_${name}(
            tutorialId NOT NULL,
            ${schemaToColumnsDef(schema)},
            FOREIGN KEY(tutorialId) REFERENCES Tutorials(tutorialId)
          )
        `),

        // TODO: events, sections, etc.
      ]);
    })
  );
}

const pathSeparator = "$";

function schemaToColumnsDef(schema: f.ObjectField<f.Properties>) {
  return schemaToColumns(schema)
    .map((c) => c.join(" "))
    .join(",");
}

function schemaToColumns(
  rootSchema: f.ObjectField<f.Properties>,
  prefix: string = ""
): [string, string][] {
  // eslint-disable-next-line no-param-reassign
  prefix = prefix ? `${prefix}${pathSeparator}` : "";

  return Object.entries(rootSchema.properties).reduce(
    (columns, [key, schema]) => {
      const column = `${prefix}${key}`;

      if (schema.kind === "object") {
        return columns.concat(schemaToColumns(schema, column));
      } else {
        return columns.concat([[column, schemaToColumnType(schema)]]);
      }
    },
    [] as [string, string][]
  );
}

function schemaToColumnType(schema: f.Field): string {
  switch (schema.kind) {
    case "string":
    case "cases":
      return "TEXT";
    case "number":
      return "REAL";
    case "boolean":
      return "BOOLEAN";
    case "object":
    case "array":
    case "tuple":
    case "chooseOne":
    case "chooseAll":
      return "JSON";
  }
}

type Item = Record<string, any> & {
  pk: string;
  sk: string;
};

async function insertData(db: Database, data: Item[]) {
  const learners = data.filter((item) => item.sk === ddb.learnerProfileSk);
  await insertLearners(db, learners);
  const tutorials = data.filter((item) =>
    item.sk.startsWith(ddb.tutorialSk(""))
  );
  await insertTutorials(db, tutorials);
}

async function insertLearners(db: Database, learners: Item[]) {
  learners.map((_) => "(?, ?, ?, ?)");

  const values = learners.reduce(
    (vals, learner) =>
      vals.concat([
        parseInt(ddb.parseId(learner.pk)),
        parseInt(learner.institution),
        parseInt(learner.course),
        learner.createdAt,
      ]),
    [] as [number, number, number, string][]
  );

  await db.run(
    `
    INSERT INTO Learners(
      learnerId,
      institution,
      course, createdAt
    ) VALUES ${learners.map((_) => "(?, ?, ?, ?)").join(", ")}
    `,
    values
  );
}

async function insertTutorials(db: Database, tutorials: Item[]) {
  return Promise.all(
    tutorials.map(async (tut) => {
      ddb.deleteKey(tut, "learnerId", "tutorial");

      const decoded = apiTypes.Tutorial.decode(tut);
      if (f.isFailure(decoded)) {
        console.error("Invalid tutorial", decoded.errors);
        return;
      }
      const tutorial = decoded.value;

      tutorial.createdAt;

      const tutorialId = (
        await db.run(
          `
            INSERT INTO Tutorials(learnerId, createdAt, updatedAt, updateTimestamps, tutorial)
            VALUES (:learnerId, :createdAt, :updatedAt, :updateTimestamps, :tutorial)
          `,
          {
            ":learnerId": parseInt(tutorial.learnerId),
            ":createdAt": tutorial.createdAt,
            ":updatedAt": tutorial.updatedAt,
            ":updateTimestamps": JSON.stringify(tutorial.updateTimestamps),
            ":tutorial": tutorial.tutorial,
          }
        )
      ).lastID!;

      const tutorialData = tutorial.tutorialData;

      if (!tutorialData) {
        return;
      }

      if (tutorialData.tutorialFeedback) {
        await insertTutorialData(
          db,
          "TutorialFeedback",
          tutorialId,
          tutorialFeedback,
          tutorialData.tutorialFeedback
        );
        delete tutorialData.tutorialFeedback;
      }

      await insertTutorialData(
        db,
        `Tutorial_${tutorial.tutorial}`,
        tutorialId,
        names[tutorial.tutorial],
        tutorialData
      );
    })
  );
}

function insertTutorialData(
  db: Database,
  tableName: string,
  tutorialId: number,
  schema: f.ObjectField<f.Properties>,
  data: Record<string, any>
) {
  const bindings: Record<string, string | number | boolean | null> = {};

  bind(data, schema);
  function bind(
    data: Record<string, any>,
    parentSchema:
      | f.ObjectField<f.Properties>
      | f.CompleteRecordSchema<f.Properties>,
    prefix: string = ""
  ) {
    prefix = prefix ? `${prefix}${pathSeparator}` : "";

    Object.entries(data).forEach(([key, datum]) => {
      const bindingKey = `${prefix}${key}`;

      const subSchema = parentSchema.properties[key];

      if (!subSchema) {
        console.log(`Omitting extraneous field: ${key}`);
        return;
      }

      if (f.isRecordSchema(subSchema) || f.isCompleteRecordSchema(subSchema)) {
        bind(datum, subSchema, bindingKey);
      } else if (
        f.isTupleSchema(subSchema) ||
        f.isArraySchema(subSchema) ||
        f.isChoiceSchema(subSchema)
      ) {
        bindings[bindingKey] = JSON.stringify(datum);
      } else {
        bindings[bindingKey] = datum;
      }
    });
  }

  const columns = schemaToColumns(schema).map((c) => c[0]);
  const bindColumns = columns.map((c) => `:${c}`);
  // Fill any empty bindings, but also delete extraneous ones.
  columns.forEach((c) => {
    if (bindings[c] === undefined) {
      bindings[c] = null;
    }
  });

  bindings.tutorialId = tutorialId;

  return db.run(
    `
      INSERT INTO ${tableName}(tutorialId, ${columns.join(", ")})
      VALUES (:tutorialId, ${bindColumns.join(", ")})
    `,
    ddb.expressionAttributes(bindings)
  );
}
