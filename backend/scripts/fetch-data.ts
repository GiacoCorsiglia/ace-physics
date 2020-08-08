import type { DocumentClient } from "aws-sdk/clients/dynamodb";
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
  const items = [];
  await scan();
  console.log(items.filter((item) => item.sk !== db.learnerProfileSk));
  console.log("items fetched:", items.length);

  async function scan(LastEvaluatedKey?: DocumentClient.Key) {
    const res = await db.result(
      client.scan({
        TableName,
        ExclusiveStartKey: LastEvaluatedKey,
      })
    );

    if (res.failed === true) {
      console.error("Error", res.error);
      return;
    }

    items.push(...res.value.Items);
    if (res.value.LastEvaluatedKey) {
      await scan(res.value.LastEvaluatedKey);
    }
  }
}
