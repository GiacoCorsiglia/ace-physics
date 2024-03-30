import * as db from "@/db";
import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question(
  `\n\x1b[1mWHOA WHOA DO YOU REALLY WANT TO PURGE TABLE "${db.tableName()}"?\x1b[0m\nType "yes" to proceed: `,
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
      },
    );
  },
);

export async function run() {
  const items: any[] = [];
  await scan();

  const chunkSize = 25; // This is determined by DynamoDB
  const promises = [];
  for (let i = 0; i < items.length; i += chunkSize) {
    promises.push(
      db.client().batchWrite({
        RequestItems: {
          [db.tableName()]: items.slice(i, i + chunkSize).map((Key) => ({
            DeleteRequest: { Key },
          })),
        },
      }),
    );
  }

  try {
    await Promise.all(promises);
  } catch (e) {
    console.error("Delete failed:", e);
    process.exit(1);
  }

  console.log(`Deleted all ${items.length} items`);

  async function scan(LastEvaluatedKey?: {}) {
    const res = await db.client().scan({
      TableName: db.tableName(),
      ExclusiveStartKey: LastEvaluatedKey,
      // We only need the keys.
      ProjectionExpression: "pk, sk",
    });

    if (res.failed === true) {
      console.error("Error", res.error);
      return;
    }

    items.push(...res.value.Items!);
    if (res.value.LastEvaluatedKey) {
      await scan(res.value.LastEvaluatedKey);
    }
  }
}
