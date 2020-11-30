import type AWS from "aws-sdk";
import DynamoDB from "aws-sdk/clients/dynamodb";
import { asyncResult } from "common/util";

function makeClient(scriptConfig: any) {
  return new DynamoDB.DocumentClient(
    scriptConfig
      ? {
          region: process.env.ACE_LOCAL === "yes" ? "us-east-1" : "us-west-1",
          ...scriptConfig,
        }
      : process.env.NODE_ENV === "development"
      ? {
          region: process.env.AWS_REGION || "us-east-1",
          endpoint: "http://localhost:8000",
        }
      : undefined
  );
}

let _client: DynamoDB.DocumentClient;
export const client = (scriptConfig?: any) =>
  _client || (_client = makeClient(scriptConfig));

export const TableName =
  process.env.NODE_ENV === "development"
    ? "DataTable"
    : process.env.ACE_TABLE_NAME!;

export const now = () => new Date().toISOString();

export const parseId = (prefixedId: string) => prefixedId.replace(/^\w+#/, "");

export const learnerPk = (id: string) => `Learner#${parseId(id)}`;
export const learnerProfileSk = "Profile";

export const tutorialSk = (id: string) => `Tutorial#${parseId(id)}`;

type PromiseType<P extends Promise<any>> = P extends Promise<infer T>
  ? T
  : never;

export function result<D, E>(request: AWS.Request<D, E>) {
  return asyncResult<E, PromiseType<ReturnType<AWS.Request<D, E>["promise"]>>>(
    request.promise()
  );
}

export interface Key {
  pk: string;
  sk: string;
}

/**
 * WARNING: THIS *MUTATES* obj
 */
export function deleteKey(obj: any, pkAs?: string, skAs?: string) {
  if (pkAs) {
    obj[pkAs] = parseId(obj.pk);
  }
  if (skAs) {
    obj[skAs] = parseId(obj.sk);
  }
  delete obj.pk;
  delete obj.sk;
  return obj;
}

export function expressionAttributes(values: Record<string, any>) {
  const obj: any = {};
  for (const key in values) {
    obj[`:${key}`] = values[key];
  }
  return obj;
}
