import { asyncResult, failure, Result } from "@/result";
import { DynamoDB, DynamoDBClientConfig } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocument, TranslateConfig } from "@aws-sdk/lib-dynamodb";

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
    translateConfig,
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
    }),
  ));

/** @internal Exposed for testing only. */
export const _destroyClient = () => {
  if (_client) {
    _client.destroy();
    _client = undefined as any;
  }
};

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

type AwsError = Error &
  (
    | { name: "ConditionalCheckFailedException" }
    | {
        name: "TransactionCanceledException";
        CancellationReasons?: Array<
          { Code: "None" } | { Code: "ConditionalCheckFailed" }
        >;
      }
  );

const wrapClient = (client: DynamoDBDocument): SafeDynamoDBDocument => {
  const wrapped = {} as SafeDynamoDBDocument;

  wrapped.unsafe = client;

  // We can't just iterate over the object's own keys, we have to walk up the
  // prototype chain.
  const properties = new Set<string | symbol>();
  let obj: any = client;
  do {
    Reflect.ownKeys(obj).forEach((k) => properties.add(k));
  } while ((obj = Reflect.getPrototypeOf(obj)) && obj !== Object.prototype);

  for (const key of properties) {
    const value: any = client[key as keyof DynamoDBDocument];
    if (typeof value !== "function") {
      (wrapped as any)[key] = value;
      continue;
    }

    (wrapped as any)[key] = (...args: any) => {
      let ret: any;
      try {
        // It's a class method, so make sure it knows what `this` is.
        ret = value.apply(client, args);
      } catch (e) {
        return Promise.resolve(failure(e));
      }

      if (ret && "then" in ret && typeof ret.then === "function") {
        return asyncResult(ret);
      }

      return ret;
    };
  }

  return wrapped;
};
