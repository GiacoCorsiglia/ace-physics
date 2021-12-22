#!/usr/bin/env node
// @ts-check
const {
  CreateTableCommand,
  DynamoDB,
  UpdateTimeToLiveCommand,
} = require("@aws-sdk/client-dynamodb");
const { exit } = require("process");

const TableName = "ACE_local_Data"; // Update in db.ts as well.

// Using DynamoDB TTL is suggested by next-auth: https://next-auth.js.org/adapters/dynamodb
const TimeToLiveAttribute = "expires";

run();
async function run() {
  const client = new DynamoDB({
    endpoint: "http://localhost:8000",
    region: "us-east-1",
    tls: false,
    credentials: {
      accessKeyId: "key",
      secretAccessKey: "key",
    },
  });

  const createCommand = new CreateTableCommand({
    TableName,
    AttributeDefinitions: [
      {
        AttributeName: "pk",
        AttributeType: "S",
      },
      {
        AttributeName: "sk",
        AttributeType: "S",
      },
      {
        AttributeName: "GSI1PK",
        AttributeType: "S",
      },
      {
        AttributeName: "GSI1SK",
        AttributeType: "S",
      },
    ],
    KeySchema: [
      {
        AttributeName: "pk",
        KeyType: "HASH",
      },
      {
        AttributeName: "sk",
        KeyType: "RANGE",
      },
    ],
    GlobalSecondaryIndexes: [
      {
        IndexName: "GSI1",
        KeySchema: [
          { AttributeName: "GSI1PK", KeyType: "HASH" },
          { AttributeName: "GSI1SK", KeyType: "RANGE" },
        ],
        Projection: {
          ProjectionType: "ALL",
        },
        ProvisionedThroughput: {
          ReadCapacityUnits: 3,
          WriteCapacityUnits: 3,
        },
      },
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 3,
      WriteCapacityUnits: 3,
    },
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
