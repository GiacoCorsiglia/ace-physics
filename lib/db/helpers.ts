import * as result from "@/helpers/result";
import { QueryCommandOutput, ScanCommandOutput } from "@aws-sdk/lib-dynamodb";
import { randomBytes } from "crypto";

export const now = () => new Date().toISOString();

export const expressionAttributeValues = (values: Record<string, any>) => {
  const obj: Record<string, any> = {};
  for (const key in values) {
    obj[`:${key}`] = values[key];
  }
  return obj;
};

export const expressionAttributeNames = (values: Record<string, any>) => {
  const obj: Record<string, any> = {};
  for (const key in values) {
    obj[`#${key}`] = key;
  }
  return obj;
};

export const expressionAttributes = (values: Record<string, any>) => ({
  ExpressionAttributeValues: expressionAttributeValues(values),
  ExpressionAttributeNames: expressionAttributeNames(values),
});

export const updateExpression = <T extends Record<string, any>>(
  values: T,
  functions?: { [K in keyof T]?: (name: string, value: string) => string }
) => {
  const exp = Object.entries(values)
    .map(([key, val]) => {
      const name = `#${key}`;
      const value = `:${key}`;

      const func = functions && functions.hasOwnProperty(key) && functions[key];
      if (func) {
        return `${name} = ${func(name, value)}`;
      }

      return `${name} = ${value}`;
    })
    .join(", ");
  return {
    UpdateExpression: `set ${exp}`,
    ExpressionAttributeValues: expressionAttributeValues(values),
    ExpressionAttributeNames: expressionAttributeNames(values),
  };
};

export const fetchAllPages = async <
  E,
  T extends QueryCommandOutput | ScanCommandOutput
>(
  fetch: (ExclusiveStartKey: {} | undefined) => Promise<result.Result<E, T>>,
  max: number = 20 // That's 500 items.
) => {
  const items: Record<string, any>[] = [];

  let LastEvaluatedKey: {} | undefined = undefined;
  do {
    const res: result.Result<E, T> = await fetch(LastEvaluatedKey);

    if (res.failed) {
      return result.failure(res.error);
    }

    // Deliberately don't check errors here; let caller handle them.
    items.push(...res.value.Items!);
    LastEvaluatedKey = res.value.LastEvaluatedKey;
    max--;
  } while (!!LastEvaluatedKey && max > 0);

  return result.success(items);
};

export const generateRandomId = () => randomBytes(16).toString("base64url");
