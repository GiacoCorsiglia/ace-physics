import dotenv from "dotenv";
import * as fs from "fs";
import * as path from "path";

export const SUCCESS = 0;
export const FAILURE = 1;
export type CommandResult = typeof SUCCESS | typeof FAILURE | void;

const error = (...message: any[]) => message.join(" ");

run().then(
  () => {
    console.info("\n✅ Command succeeded");
  },
  (e) => {
    console.error("\n❌ Error:");
    console.error(e);
    process.exit(1);
  }
);

async function run(): Promise<void> {
  // Parse args.
  // The first two are `ts-node` and `run.ts`
  const args = process.argv.slice(2);

  const script = args[0];
  if (!script) {
    throw error("Usage: run <script> [--<env>]");
  }

  const envArg: string | undefined = args[1];

  // Load correct env.
  const env = (() => {
    switch (envArg) {
      case "--prod":
      case "--production":
        return "production";
      case "--prod-write":
      case "--production-write":
        return "production-write";
      case "--beta-write":
        return "beta-write";
      case "--beta":
        return "beta";
      default:
        return "invalid";
    }
  })();

  if (env === "invalid") {
    throw error("Invalid environment:", envArg);
  }

  const envFile = `.env.${env}`;
  const envPath = path.join(__dirname, envFile);

  if (!fs.existsSync(envPath)) {
    throw error("Missing environment file:", env);
  }

  dotenv.config({ path: envPath });

  process.env.ACE_ENV = env.split("-")[0];
  console.info("⚙️ Loaded environment:", envFile);

  // Load script.

  const scriptFile = script.endsWith(".ts") ? script : `${script}.ts`;

  const command = await import(`./${scriptFile}`);
  console.info("➡️ Running command:", scriptFile, "\n");

  const commandArgs = args.slice(2);

  if (commandArgs.length !== command.run.length) {
    throw error(
      "Missing",
      command.run.length - commandArgs.length,
      "arguments"
    );
  }

  try {
    return await command.run(...commandArgs);
  } catch (e) {
    throw e;
  }
}
