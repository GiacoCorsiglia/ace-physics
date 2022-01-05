#!/usr/bin/env node
// @ts-check
const {
  CreateTableCommand,
  DynamoDB,
  UpdateTimeToLiveCommand,
} = require("@aws-sdk/client-dynamodb");
const { exit } = require("process");
const path = require("path");
const dotenv = require("dotenv");
const tableConfig = require("../lib/db/ddb.json");

dotenv.config({ path: path.resolve(__dirname, "../.env.development") });

const TableName = process.env.ACE_TABLE_NAME;

// Using DynamoDB TTL is suggested by next-auth: https://next-auth.js.org/adapters/dynamodb
const TimeToLiveAttribute = "expires";

run();
async function run() {
  const client = new DynamoDB({
    endpoint: process.env.ACE_AWS_ENDPOINT,
    region: process.env.ACE_AWS_REGION,
    // If we are specifying an endpoint, it's localhost, so disable tls.
    tls: process.env.ACE_AWS_ENDPOINT ? false : undefined,
    credentials: {
      accessKeyId: process.env.ACE_AWS_ACCESS_KEY,
      secretAccessKey: process.env.ACE_AWS_SECRET_KEY,
    },
  });

  const createCommand = new CreateTableCommand({
    ...tableConfig,
    TableName,
  });

  console.log(`Creating table ${TableName}...`);
  try {
    await client.send(createCommand);
  } catch (e) {
    console.error(`Failed to create table ${TableName}`);
    console.error(e);
    exit(1);
  }
  console.log(`Success: Created table ${TableName}`);

  // TTL.

  const ttlCommand = new UpdateTimeToLiveCommand({
    TableName,
    TimeToLiveSpecification: {
      AttributeName: TimeToLiveAttribute,
      Enabled: true,
    },
  });

  console.log(`Enabling TTL...`);
  try {
    await client.send(ttlCommand);
  } catch (e) {
    console.error(`Failed to enable TTL`);
    console.error(e);
    exit(1);
  }
  console.log(`Success: Enabled TTL`);
}
