import { asyncResult, failure, Result } from "@/helpers/result";
import { DynamoDB, DynamoDBClientConfig } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocument, TranslateConfig } from "@aws-sdk/lib-dynamodb";

export const TableName = process.env.ACE_TABLE_NAME;

export const createDocumentClient = (translateConfig: TranslateConfig) => {
  const config: DynamoDBClientConfig = {
    endpoint: process.env.ACE_AWS_ENDPOINT, // Local only.
    region: process.env.ACE_AWS_REGION,
    credentials: {
      accessKeyId: process.env.ACE_AWS_ACCESS_KEY,
      secretAccessKey: process.env.ACE_AWS_SECRET_KEY,
    },
  };

  const documentClient = DynamoDBDocument.from(
    new DynamoDB(config),
    translateConfig
  );

  return documentClient;
};

let _client: SafeDynamoDBDocument;
export const client = () =>
  _client ||
  (_client = wrapClient(
    createDocumentClient({
      marshallOptions: {
        convertEmptyValues: false,
        removeUndefinedValues: true,
        convertClassInstanceToMap: true,
      },
    })
  ));

type SafeDynamoDBDocument = {
  [K in keyof DynamoDBDocument]: DynamoDBDocument[K] extends {
    (...args: infer Args): Promise<infer Output>;
    (...args: infer Args2): void;
    (...args: infer Args3): void;
  }
    ? {
        (...args: Args): Promise<Result<AwsError, Output>>;
        (...args: Args2): void;
        (...args: Args3): void;
      }
    : DynamoDBDocument[K];
} & { unsafe: DynamoDBDocument };

interface AwsError extends Error {
  name: string;
}

const wrapClient = (client: DynamoDBDocument): SafeDynamoDBDocument => {
  const wrapped = {} as SafeDynamoDBDocument;

  wrapped.unsafe = client;

  for (const key in client) {
    if (Object.prototype.hasOwnProperty.call(client, key)) {
      const value = client[key as keyof DynamoDBDocument];

      if (typeof value === "function") {
        (wrapped as any)[key] = (...args: any) => {
          let ret: any;
          try {
            ret = (value as Function)(...args);
          } catch (e) {
            return Promise.resolve(failure(e));
          }

          if (ret && "then" in ret && typeof ret.then === "function") {
            return asyncResult(ret);
          }

          return ret;
        };
      } else {
        (wrapped as any)[key] = value;
      }
    }
  }

  return wrapped;
};
