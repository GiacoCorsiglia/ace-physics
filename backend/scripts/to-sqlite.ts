import * as apiTypes from "ace-frontend/src/common/apiTypes";
import * as s from "ace-frontend/src/common/schema";
import { names, tutorialFeedback } from "ace-frontend/src/common/tutorials";
import { existsSync, readdirSync, readFileSync, unlinkSync } from "fs";
import { join } from "path";
import { Database, open } from "sqlite";
import sqlite3 from "sqlite3";
import * as ddb from "../src/db";

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
        FOREIGN KEY(learnerId) REFERENCES Learners(learnerId)
      )
  `);

  await db.exec(`
      CREATE TABLE TutorialFeedback(
        tutorialId NOT NULL,
        ${schemaToColumnsDef(tutorialFeedback)},
        FOREIGN KEY(tutorialId) REFERENCES Tutorials(tutorialId)
      )
  `);

  return Promise.all(
    Object.entries(names).map(([name, schema]) => {
      return db.exec(`
        CREATE TABLE Tutorial_${name}(
          tutorialId NOT NULL,
          ${schemaToColumnsDef(schema)},
          FOREIGN KEY(tutorialId) REFERENCES Tutorials(tutorialId)
        )
      `);
    })
  );
}

function schemaToColumnsDef(schema: s.RecordSchema<s.Properties>) {
  return schemaToColumns(schema)
    .map((c) => c.join(" "))
    .join(",");
}

function schemaToColumns(
  rootSchema: s.RecordSchema<s.Properties>,
  prefix: string = ""
): [string, string][] {
  prefix = prefix ? `${prefix}_` : "";

  return Object.entries(rootSchema.properties).reduce(
    (columns, [key, schema]) => {
      const column = `${prefix}${key}`;

      if (key === "tutorialFeedback") {
        // These all go in their own table
        return columns;
      } else if (s.isRecordSchema(schema)) {
        return columns.concat(schemaToColumns(schema, column));
      } else if (s.isChoiceSchema(schema)) {
        const otherType = schemaToColumnType(schema.other);
        return columns.concat([
          [`${column}_selected`, "TEXT"],
          [`${column}_other`, otherType],
        ]);
      } else {
        return columns.concat([[column, schemaToColumnType(schema)]]);
      }
    },
    [] as [string, string][]
  );
}

function schemaToColumnType(schema: s.Schema): string {
  if (s.isStringSchema(schema)) {
    return "TEXT";
  } else if (s.isNumberSchema(schema)) {
    return "REAL";
  } else if (s.isBooleanSchema(schema)) {
    return "BOOLEAN";
  } else {
    // Otherwise we'll just insert it as JSON
    return "TEXT";
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
    []
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
      if (s.isFailure(decoded)) {
        console.error("Invalid tutorial", decoded.errors);
        return;
      }
      const tutorial = decoded.value;

      tutorial.createdAt;

      const tutorialId = (
        await db.run(
          `
            INSERT INTO Tutorials(learnerId, createdAt, updatedAt, tutorial)
            VALUES (:learnerId, :createdAt, :updatedAt, :tutorial)
          `,
          {
            ":learnerId": parseInt(tutorial.learnerId),
            ":createdAt": tutorial.createdAt,
            ":updatedAt": tutorial.updatedAt,
            ":tutorial": tutorial.tutorial,
          }
        )
      ).lastID;

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
  schema: s.RecordSchema<s.Properties>,
  data: Record<string, any>
) {
  const bindings: Record<string, string | number | boolean | null> = {};
  bind(data);
  function bind(data: Record<string, any>, prefix: string = "") {
    prefix = prefix ? `${prefix}_` : "";

    Object.entries(data).forEach(([key, datum]) => {
      const bindingKey = `${prefix}${key}`;

      if (datum === null || datum === undefined) {
        // Don't bother.
      } else if (Array.isArray(datum)) {
        bindings[bindingKey] = JSON.stringify(datum);
      } else if (typeof datum === "object") {
        bind(datum, bindingKey);
      } else {
        bindings[bindingKey] = datum;
      }
    });
  }

  const columns = schemaToColumns(schema).map((c) => c[0]);
  const bindColumns = columns.map((c) => `:${c}`);
  const realBindings: Record<string, any> = {};
  // Fill any empty bindings, but also delete extraneous ones.
  columns.forEach((c) => {
    realBindings[c] = bindings[c] === undefined ? null : bindings[c];
  });

  realBindings.tutorialId = tutorialId;

  return db.run(
    `
      INSERT INTO ${tableName}(tutorialId, ${columns.join(", ")})
      VALUES (:tutorialId, ${bindColumns.join(", ")})
    `,
    ddb.expressionAttributes(realBindings)
  );
}
