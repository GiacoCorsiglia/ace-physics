import type { DocumentClient } from "aws-sdk/clients/dynamodb";
import readline from "readline";
import * as db from "../src/db";

const TableName =
  process.env.ACE_TABLE_NAME ||
  (process.env.ACE_LOCAL === "yes" ? "DataTable" : "ACE_production_DataTable");

const client = db.client({
  endpoint:
    process.env.ACE_LOCAL === "yes" ? "http://localhost:8000" : undefined,
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question(
  `\n\x1b[1mWHOA WHOA DO YOU REALLY WANT TO PURGE TABLE "${TableName}"?\x1b[0m\nType "yes" to proceed: `,
  (yes) => {
    if (yes.toLowerCase() !== "yes") {
      rl.close();
      console.log("OK nevermind then.");
      process.exit();
    }

    rl.question(
      `\n\x1b[1mARE YOU SURE?\x1b[0m\nType "i am sure" to proceed: `,
      (sure) => {
        if (sure.toLowerCase() !== "i am sure") {
          rl.close();
          console.log("OK nevermind then.");
          process.exit();
        }

        console.log("OK...");
        run();
        rl.close();
      }
    );
  }
);

async function run() {
  const items = [];
  await scan();

  const chunkSize = 25; // This is determined by DynamoDB
  const promises = [];
  for (let i = 0; i < items.length; i += chunkSize) {
    promises.push(
      client
        .batchWrite({
          RequestItems: {
            [TableName]: items.slice(i, i + chunkSize).map((Key) => ({
              DeleteRequest: { Key },
            })),
          },
        })
        .promise()
    );
  }

  try {
    await Promise.all(promises);
  } catch (e) {
    console.error("Delete failed:", e);
    process.exit(1);
  }

  console.log(`Deleted all ${items.length} items`);

  async function scan(LastEvaluatedKey?: DocumentClient.Key) {
    const res = await db.result(
      client.scan({
        TableName,
        ExclusiveStartKey: LastEvaluatedKey,
        // We only need the keys.
        ProjectionExpression: "pk, sk",
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
