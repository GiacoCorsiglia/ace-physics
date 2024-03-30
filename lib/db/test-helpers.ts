import { _destroyClient } from "@/db/client";
import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { execSync } from "child_process";
import { randomBytes } from "crypto";
import tableConfig from "./ddb.json";

const getCurrentTest = () => expect.getState().currentTestName;

const originalEnv = process.env;
const testEnv = {
  ACE_AWS_ENDPOINT: "http://localhost:8000",
  ACE_AWS_REGION: "local",
  ACE_AWS_ACCESS_KEY: "fake",
  ACE_AWS_SECRET_KEY: "fake",
  // Table name set dynamically below.
};

export const setupDB = () => {
  let skipDbTests = false;

  try {
    execSync("docker ps | grep dynamodb");
  } catch (e: any) {
    skipDbTests = true;
  }

  let client: DynamoDB;
  const tables = new Map<string, string>();

  beforeAll(() => {
    if (skipDbTests) {
      return;
    }

    client = new DynamoDB({
      // We could read these values out of .env.test, but we create and DELETE a
      // bunch of tables here, so let's be extra sure we're not running that
      // with production credentials.
      endpoint: testEnv.ACE_AWS_ENDPOINT,
      region: testEnv.ACE_AWS_REGION,
      tls: false,
      credentials: {
        accessKeyId: "fake",
        secretAccessKey: "fake",
      },
    });
  });

  beforeEach(async () => {
    const currentTest = getCurrentTest();
    if (skipDbTests || !currentTest) {
      return;
    }

    const TableName = `Test_${randomBytes(16).toString("base64url")}`;
    tables.set(currentTest, TableName);
    process.env = {
      ...originalEnv,
      ...testEnv,
      ACE_TABLE_NAME: TableName,
    };

    await client.createTable({ ...(tableConfig as any), TableName });
  });

  afterEach(async () => {
    const currentTest = getCurrentTest();
    if (skipDbTests || !currentTest) {
      return;
    }

    process.env = originalEnv;
    _destroyClient();

    const TableName = tables.get(currentTest);
    if (TableName) {
      await client.deleteTable({ TableName });
    }
  });

  afterAll(() => {
    if (skipDbTests) {
      return;
    }

    client.destroy();
  });

  return {
    it: Object.assign(
      (...args: Parameters<typeof global.it>) =>
        skipDbTests ? global.it.skip(...args) : global.it(...args),
      global.it,
    ),
    describe: Object.assign(
      (...args: Parameters<typeof global.describe>) =>
        skipDbTests ? global.describe.skip(...args) : global.describe(...args),
      global.describe,
    ),
  };
};
