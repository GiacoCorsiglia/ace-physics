import type { DocumentClient } from "aws-sdk/clients/dynamodb";
import { existsSync, mkdirSync, writeFileSync } from "fs";
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

  const items: any[] = [];
  await scan();

  console.log(`Fetched ${items.length} items.`);
  console.log("Writing to file...");

  const now = new Date()
    .toISOString()
    .replace("T", "_")
    .replace(/\..+$/, "")
    .replace(/:/g, "-");
  const file = `data-${now}.json`;
  const dir = join(__dirname, "data");
  const filepath = join(dir, file);

  if (!existsSync(dir)) {
    mkdirSync(dir);
  }

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

    items.push(...res.value.Items!);
    if (res.value.LastEvaluatedKey) {
      await scan(res.value.LastEvaluatedKey);
    }
  }
}
