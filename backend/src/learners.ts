import {
  CreateLearnerRequest,
  CreateLearnersRequest,
  GetLearnerRequest,
  Learner,
} from "ace-frontend/src/common/apiTypes";
import AWS from "aws-sdk";
import * as db from "./db";
import * as response from "./response";
import { Handler } from "./router";

async function getNextIdAndReserve(blockSize: number) {
  const result = await db
    .client()
    .update({
      TableName: db.TableName,
      Key: {
        learnerId: "learner#ID_COUNTER",
        entryId: "ID_COUNTER",
      },
      UpdateExpression: "ADD nextId :incr",
      ExpressionAttributeValues: {
        ":incr": blockSize + 2,
      },
      ReturnValues: "UPDATED_NEW",
    })
    .promise();
  return 100000 + result.Attributes?.nextId - blockSize - 1;
}

export const get: Handler<GetLearnerRequest> = async (request) => {
  return db
    .client()
    .get({
      TableName: db.TableName,
      Key: {
        learnerId: db.learnerId(request.body.learnerId),
        entryId: db.learnerProfile,
      },
    })
    .promise()
    .then(
      (result) =>
        result.Item ? response.success(result.Item) : response.notFound(),
      (e) => response.error("Get failed", e)
    );
};

export const create: Handler<CreateLearnerRequest> = async (request) => {
  const client = db.client();

  let attempts = 0;
  async function createLearner(): Promise<response.Response> {
    if (attempts > 5) {
      return response.error("Failed to generate a unique Learner ID");
    }
    attempts++;

    const id = await getNextIdAndReserve(1);

    const learner: Learner = {
      learnerId: db.learnerId(id.toString()),
      entryId: db.learnerProfile,
      institutionId: "NONE",
      courseId: "NONE",
      createdAt: db.date(),
    };

    return client
      .put({
        TableName: db.TableName,
        Item: learner,
        ConditionExpression: "attribute_not_exists(learnerId)",
      })
      .promise()
      .then(
        () => {
          return response.success(learner);
        },
        (e: AWS.AWSError) => {
          if (e.code === "ConditionalCheckFailedException") {
            // This means a learner with this ID already exists, so let's try
            // again and generate another one!
            return createLearner();
          }
          // Otherwise who knows what went wrong!
          return response.error("Put failed", e);
        }
      );
  }

  return createLearner();
};

export const createMany: Handler<CreateLearnersRequest> = async (request) => {
  const number = request.body.number;

  if (number <= 0) {
    return response.error('"number" cannot be <= 0');
  } else if (number > 500) {
    return response.error(
      "Generating more than 500 learners at once is not permitted"
    );
  }

  const firstId = await getNextIdAndReserve(number);

  const createdAt = db.date();
  const writeRequests: { PutRequest: { Item: Learner } }[] = [];
  for (let id = firstId; id < firstId + number; id++) {
    writeRequests.push({
      PutRequest: {
        Item: {
          learnerId: db.learnerId(id.toString()),
          entryId: db.learnerProfile,
          institutionId: request.body.institutionId,
          courseId: request.body.courseId,
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
    () => response.success({}),
    (e) => response.error("Learner creation failed", e)
  );
};
