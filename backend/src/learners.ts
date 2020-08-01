import {
  CreateLearnerRequest,
  CreateLearnersRequest,
  GetLearnerRequest,
  Learner,
} from "ace-frontend/src/common/apiTypes";
import { AsyncResult } from "ace-frontend/src/common/util";
import type AWS from "aws-sdk";
import * as db from "./db";
import * as response from "./response";
import { Handler } from "./router";

async function getNextIdAndReserve(
  blockSize: number
): Promise<AsyncResult<AWS.AWSError, number>> {
  const result = await db.result(
    db.client().update({
      TableName: db.TableName,
      Key: {
        pk: db.learnerPk("ID_COUNTER"),
        sk: "ID_COUNTER",
      },
      UpdateExpression: "ADD lastId :incr",
      ExpressionAttributeValues: {
        ":incr": blockSize,
      },
      ReturnValues: "UPDATED_NEW",
    })
  );

  if (result.failed) {
    return result;
  }

  return {
    failed: false,
    value: 100000 + result.value.Attributes!.lastId - (blockSize - 1),
  };
}

export const get: Handler<GetLearnerRequest> = async (request) => {
  const result = await db.result(
    db.client().get({
      TableName: db.TableName,
      Key: {
        pk: db.learnerPk(request.body.learnerId),
        sk: db.learnerProfileSk,
      },
    })
  );

  if (result.failed) {
    return response.error("Get failed", result.error);
  }

  const item = result.value.Item;
  if (!item) {
    return response.notFound();
  }

  db.deleteKey(item, "learnerId");
  return response.success(item);
};

export const create: Handler<CreateLearnerRequest> = async (request) => {
  const client = db.client();

  let attempts = 0;
  async function createLearner(): Promise<response.Response> {
    if (attempts >= 5) {
      return response.error("Failed to generate a unique Learner ID");
    }
    attempts++;

    const idResult = await getNextIdAndReserve(1);
    if (idResult.failed) {
      return response.error("Failed to get next Learner ID", idResult.error);
    }
    const id = idResult.value.toString();

    const key: db.Key = {
      pk: db.learnerPk(id),
      sk: db.learnerProfileSk,
    };

    const learner: Omit<Learner, "learnerId"> = {
      institution: "NONE",
      course: "NONE",
      createdAt: db.now(),
    };

    const result = await db.result(
      client.put({
        TableName: db.TableName,
        Item: { ...key, ...learner },
        ConditionExpression: "attribute_not_exists(pk)",
      })
    );

    if (!result.failed) {
      return response.success({
        learnerId: id,
        ...learner,
      });
    }

    if (result.error.code === "ConditionalCheckFailedException") {
      // This means a learner with this ID already exists, so let's try
      // again and generate another one!
      return createLearner();
    }
    // Otherwise who knows what went wrong!
    return response.error("Put failed", result.error);
  }

  return createLearner();
};

export const createMany: Handler<CreateLearnersRequest> = async (request) => {
  const number = request.body.number;

  if (number <= 0) {
    return response.error("Cannot generate fewer than 0 learners");
  } else if (number > 500) {
    return response.error(
      "Generating more than 500 learners at once is not permitted"
    );
  }

  const firstIdResult = await getNextIdAndReserve(number);
  if (firstIdResult.failed) {
    return response.error("Failed to get next Learner ID", firstIdResult.error);
  }
  const firstId = firstIdResult.value;

  const createdAt = db.now();
  const writeRequests: {
    PutRequest: { Item: db.Key & Omit<Learner, "learnerId"> };
  }[] = [];
  for (let id = firstId; id < firstId + number; id++) {
    writeRequests.push({
      PutRequest: {
        Item: {
          pk: db.learnerPk(id.toString()),
          sk: db.learnerProfileSk,

          institution: request.body.institution,
          course: request.body.course,
          createdAt,
        },
      },
    });
  }

  const client = db.client();

  const chunkSize = 25; // This is determined by DynamoDB
  const promises = [];
  for (let i = 0; i < writeRequests.length; i += chunkSize) {
    promises.push(
      client
        .batchWrite({
          RequestItems: {
            [db.TableName]: writeRequests.slice(i, i + chunkSize),
          },
        })
        .promise()
    );
  }

  return Promise.all(promises).then(
    () =>
      response.success({
        learners: writeRequests.map((wr) =>
          db.deleteKey(wr.PutRequest.Item, "learnerId")
        ),
      }),
    (e) => response.error("Learner creation failed", e)
  );
};
