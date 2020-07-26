import AWS from "aws-sdk";

function makeClient() {
  return new AWS.DynamoDB.DocumentClient({
    region: process.env.AWS_REGION || "us-west-1",
    endpoint: process.env.AWS_SAM_LOCAL
      ? "http://host.docker.internal:8000"
      : "TODO",
  });
}

let _client: AWS.DynamoDB.DocumentClient;
export const client = () => _client || (_client = makeClient());

export const TableName = "DataTable";

export const date = () => new Date().toISOString();

export const learnerProfile = "profile";

export const learnerId = (id: string) => `learner#${id}`;
export const tutorialId = (id: string) => `tutorial#${id}`;
export const institutionId = (id: string) => `institution#${id}`;
export const courseId = (id: string) => `course#${id}`;

export const parseId = (prefixedId: string) => prefixedId.replace(/^\w+#/, "");
