import DynamoDB from "aws-sdk/clients/dynamodb";

function makeClient() {
  return new DynamoDB.DocumentClient({
    region: process.env.AWS_REGION || "us-west-1",
    endpoint: process.env.AWS_SAM_LOCAL
      ? "http://host.docker.internal:8000"
      : "TODO",
  });
}

let _client: DynamoDB.DocumentClient;
export const client = () => _client || (_client = makeClient());

export const TableName = "DataTable";

export const date = () => new Date().toISOString();

export const learnerProfile = "profile";

export const parseId = (prefixedId: string) => prefixedId.replace(/^\w+#/, "");

export const learnerId = (id: string) => `learner#${parseId(id)}`;
export const tutorialId = (id: string) => `tutorial#${parseId(id)}`;
export const institutionId = (id: string) => `institution#${parseId(id)}`;
export const courseId = (id: string) => `course#${parseId(id)}`;
