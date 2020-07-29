import { asyncResult } from "ace-frontend/src/common/util";
import type AWS from "aws-sdk";
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

export const now = () => new Date().toISOString();

const parseId = (prefixedId: string) => prefixedId.replace(/^\w+#/, "");

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
