#!/usr/bin/env node
// @ts-check
/**
 * This script waits for the DynamoDB server to actually be initialized in the
 * Docker container.
 */
const { DynamoDB } = require("@aws-sdk/client-dynamodb");
const timers = require("timers/promises");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config({ path: path.resolve(__dirname, "../.env.development") });

const TIMEOUT_MS = 30 * 1000; // 30 seconds.
const RETRY_MS = 500;

const client = new DynamoDB({
  endpoint: process.env.ACE_AWS_ENDPOINT, // Local only.
  region: process.env.ACE_AWS_REGION,
  // If we are specifying an endpoint, it's localhost, so disable tls.
  tls: process.env.ACE_AWS_ENDPOINT ? false : undefined,
  credentials: {
    accessKeyId: /** @type {string} */ (process.env.ACE_AWS_ACCESS_KEY),
    secretAccessKey: /** @type {string} */ (process.env.ACE_AWS_SECRET_KEY),
  },
});

/**
 * @param   {number} time
 * @return  {Promise<void>}
 */
const waitForDynamoDB = async (time) => {
  try {
    await client.listTables();
  } catch (e) {
    if (time > TIMEOUT_MS) {
      throw e;
    }

    console.info(`Waiting for DynamoDB container (${time / 1000}s)...`);
    await timers.setTimeout(RETRY_MS);
    return waitForDynamoDB(time + RETRY_MS);
  }
};

waitForDynamoDB(0)
  .then(() => {
    console.info("Connected to DynamodDB container successfully.");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Unable to connect to DynamodDB container.", error);
    process.exit(1);
  });
