import { isObject } from "@/helpers";
import { asyncResult } from "@/helpers/result";
import { Learner, Tutorial } from "@/schema/db";
import { decode, Infer, Type } from "@/schema/types";
import type AWS from "aws-sdk";
import DynamoDB from "aws-sdk/clients/dynamodb";

// Table Name.

export const TableName =
  process.env.NODE_ENV === "development"
    ? require("./ddb.json").TableName
    : "TODO";

// Client.

let _client: DynamoDB.DocumentClient;
export const client = () =>
  _client ||
  (_client = new DynamoDB.DocumentClient(
    process.env.NODE_ENV === "development"
      ? {
          region: process.env.AWS_REGION || "us-east-1",
          endpoint: "http://localhost:8000",
        }
      : undefined
  ));

// Helpers.

export const now = () => new Date().toISOString();

export const result = <D, E>(request: AWS.Request<D, E>) =>
  asyncResult<E, PromiseType<ReturnType<AWS.Request<D, E>["promise"]>>>(
    request.promise()
  );

type PromiseType<P extends Promise<any>> = P extends Promise<infer T>
  ? T
  : never;

export const expressionAttributeValues = (values: Record<string, any>) => {
  const obj: any = {};
  for (const key in values) {
    obj[`:${key}`] = values[key];
  }
  return obj;
};

export const expressionAttributeNames = (values: Record<string, any>) => {
  const obj: any = {};
  for (const key in values) {
    obj[`#${key}`] = key;
  }
  return obj;
};

export interface Key {
  pk: string;
  sk: string;
}

// Codecs.

const hashRegEx = /^\w+#/;
const parseKey = (prefixedId: string) => prefixedId.replace(hashRegEx, "");

declare const IsEncoded: unique symbol;
type Encoded<T> = T & { [IsEncoded]: true };

const codec = <
  T extends Type,
  K extends Partial<Record<string, string>>,
  F extends (...args: any) => Key
>(
  type: T,
  fromKeys: (pk: string, sk: string) => K,
  toKeys: (item: Infer<T>) => [pk: string, sk: string],
  key: F
) => ({
  key,

  forDb(item: Infer<T>) {
    const [pk, sk] = toKeys(item);
    const clone = { ...item, pk, sk };
    Object.keys(fromKeys(pk, sk)).forEach((prop) => delete clone[prop]);
    return clone as Encoded<Omit<typeof clone, keyof K>>;
  },

  forClient(item: unknown) {
    if (isObject(item)) {
      item = {
        ...item,
        ...fromKeys(
          parseKey((item as any).pk + ""),
          parseKey((item as any).sk + "")
        ),
      };
      delete (item as any).pk;
      delete (item as any).sk;
    }

    return decode(type, item);
  },
});

export const key = (...parts: string[]) => parts.join("#");

export const learnerPrefix = "Learner";
export const tutorialPrefix = "Tutorial";

export const LearnerCodec = codec(
  Learner,
  (pk) => ({ learnerId: pk }),
  (learner) => [key(learnerPrefix, learner.learnerId), "Profile"],
  (learnerId: string) => ({
    pk: key(learnerPrefix, learnerId),
    sk: "Profile",
  })
);

export const TutorialCodec = codec(
  Tutorial,
  (pk, sk) => ({
    learnerId: pk,
    tutorial: sk.split("#")[0],
    edition: sk.split("#")[1] || "Main",
  }),
  (tutorial) => [
    key(learnerPrefix, tutorial.learnerId),
    key(tutorialPrefix, tutorial.tutorial, tutorial.edition),
  ],
  (learnerId: string, tutorial: string, edition: string) => ({
    pk: key(learnerPrefix, learnerId),
    sk: key(tutorialPrefix, tutorial, edition),
  })
);
