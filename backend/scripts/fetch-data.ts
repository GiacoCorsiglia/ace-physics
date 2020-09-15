import type { DocumentClient } from "aws-sdk/clients/dynamodb";
import { writeFileSync } from "fs";
import { join } from "path";
import * as db from "../src/db";

const TableName =
  process.env.ACE_TABLE_NAME ||
  (process.env.ACE_LOCAL === "yes" ? "DataTable" : "ACE_production_DataTable");

const client = db.client({
  endpoint:
    process.env.ACE_LOCAL === "yes" ? "http://localhost:8000" : undefined,
});

run();
async function run() {
  console.log("Fetching latest data...");

  const items = [];
  await scan();

  console.log(`Fetched ${items.length} items.`);
  console.log("Writing to file...");

  const now = new Date().toISOString().replace("T", "_").replace(/\..+$/, "");
  const file = `data-${now}.json`;
  const filepath = join(__dirname, "data", file);

  writeFileSync(filepath, JSON.stringify(items));

  console.log(`Wrote items to ${file}`);

  async function scan(LastEvaluatedKey?: DocumentClient.Key) {
    const res = await db.result(
      client.scan({
        TableName,
        ExclusiveStartKey: LastEvaluatedKey,
      })
    );

    if (res.failed === true) {
      console.error("Scan error");
      console.error(res.error);
      process.exit(1);
    }

    items.push(...res.value.Items);
    if (res.value.LastEvaluatedKey) {
      await scan(res.value.LastEvaluatedKey);
    }
  }
}
