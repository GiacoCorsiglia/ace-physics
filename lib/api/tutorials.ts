import {
  GetTutorialRequest,
  GetTutorialResponse,
  UpdateTutorialRequest,
  UpdateTutorialResponse,
} from "@/schema/api";
import { Tutorial } from "@/schema/db";
import { decode } from "@/schema/types";
import { tutorialSchemas } from "@pages/tutorials/schemas";
import { Handler } from "./api-route";
import * as db from "./db";
import * as response from "./response";

export const get: Handler<GetTutorialRequest, GetTutorialResponse> = async (
  request
) => {
  const { learnerId, tutorial, edition } = request.body;

  if (!tutorialSchemas.has(tutorial)) {
    return response.error("Invalid Tutorial: ", tutorial);
  }

  const result = await db.result(
    db.client().get({
      TableName: db.TableName,
      Key: db.TutorialCodec.key(learnerId, tutorial, edition),
    })
  );

  if (result.failed) {
    return response.error("GetTutorial Failed", result.error);
  }

  const item = result.value.Item;

  if (!item) {
    return response.notFound();
  }

  const decoded = db.TutorialCodec.forClient(item);
  if (decoded.failed) {
    return response.notFound();
  }

  return response.success(decoded.value);
};

export const update: Handler<
  UpdateTutorialRequest,
  UpdateTutorialResponse
> = async (request) => {
  const { learnerId, tutorial, edition, version, state, events } = request.body;

  // Is this a real tutorial?
  const tutorialSchema = tutorialSchemas.get(tutorial);
  if (!tutorialSchema) {
    return response.error("Invalid tutorial", {
      received: tutorial,
    });
  }

  // Are the types valid?
  const decoded = decode(tutorialSchema.type, state);
  if (decoded.failed) {
    return response.error(
      "Invalid tutorial data",
      decoded.error.map((e) => ({
        path: e.path,
        error: e.message,
        received: e.value,
      }))
    );
  }

  // Does this learner actually exist in the system?
  const learnerResult = await db.result(
    db.client().get({
      TableName: db.TableName,
      Key: db.LearnerCodec.key(learnerId),
    })
  );

  if (learnerResult.failed) {
    return response.error("Get learner failed", learnerResult.error);
  }

  if (!learnerResult.value.Item) {
    return response.error("No such learner");
  }

  // Great, the learner exists, and the tutorial data is valid.  Alright, let's
  // go ahead and save it.

  const UpdateExpression =
    "set " +
    [
      // Only set createdAt the first time.
      "#createdAt = if_not_exists(createdAt, :createdAt)",
      "#updatedAt = :updatedAt",
      "#version = :version",
      "#state = :state",
      "#events = :events",
    ].join(", ");

  const now = db.now();
  const values: Omit<
    Tutorial,
    // These fields constitute the key.
    "learnerId" | "tutorial" | "edition"
  > = {
    createdAt: now,
    updatedAt: now,
    version,
    state: decoded.value,
    events,
  };
  const ExpressionAttributeValues = db.expressionAttributeValues(values);
  const ExpressionAttributeNames = db.expressionAttributeNames(values);

  const result = await db.result(
    db.client().update({
      TableName: db.TableName,
      Key: db.TutorialCodec.key(learnerId, tutorial, edition),
      // Only update if no version number is set (it's a new entry), or the
      // version in the database is less (older) than the incoming version.
      ConditionExpression:
        "attribute_not_exists(version) OR version < :version",
      UpdateExpression,
      ExpressionAttributeValues,
      ExpressionAttributeNames,
    })
  );

  if (result.failed) {
    if (result.error.code === "ConditionalCheckFailedException") {
      return response.success({
        ok: true,
        updated: false,
      } as const);
    }

    return response.error("Tutorial update failed", result.error);
  }

  return response.success({
    ok: true,
    updated: true,
  } as const);
};
