import * as apiTypes from "common/apiTypes";
import * as s from "common/schema";
import { names } from "common/tutorials";
import { Handler } from "./api-route";
import * as db from "./db";
import * as response from "./response";

export const get: Handler<apiTypes.GetTutorialRequest> = async (request) => {
  const { learnerId, tutorial } = request.body;

  if (!names[tutorial]) {
    return response.error("Invalid Tutorial");
  }

  const result = await db.result(
    db.client().get({
      TableName: db.TableName,
      Key: {
        pk: db.learnerPk(learnerId),
        sk: db.tutorialSk(tutorial),
      } as db.Key,
    })
  );

  if (result.failed) {
    return response.error("GetTutorial Failed", result.error);
  }

  const item = result.value.Item;

  if (!item) {
    return response.notFound();
  }

  db.deleteKey(item, "learnerId", "tutorial");
  return response.success(item);
};

export const update: Handler<apiTypes.UpdateTutorialRequest> = async (
  request
) => {
  const { learnerId, tutorial, version, tutorialData } = request.body;

  // Is this a real tutorial?
  const tutorialSchema = names[tutorial];
  if (!tutorialSchema) {
    return response.error("Invalid tutorial", {
      received: tutorial,
    });
  }

  // Are the types valid?
  const decoded = tutorialSchema.decode(tutorialData);
  if (s.isFailure(decoded)) {
    return response.error(
      "Invalid tutorial data",
      decoded.errors.map((e) => ({
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
      Key: {
        pk: db.learnerPk(learnerId),
        sk: db.learnerProfileSk,
      } as db.Key,
    })
  );

  if (learnerResult.failed) {
    return response.error("Get learner failed", learnerResult.error);
  }

  const learner = learnerResult.value.Item as apiTypes.Learner | undefined;
  if (!learner) {
    return response.error("No such learner");
  }

  // Great, the learner exists, and the tutorial data is valid.  Alright, let's
  // go ahead and save it.

  const UpdateExpression =
    "set " +
    [
      "institution = :institution",
      "course = :course",

      // Only set createdAt the first time.
      "createdAt = if_not_exists(createdAt, :createdAt)",
      "updatedAt = :updatedAt",
      "updateTimestamps = list_append(if_not_exists(updateTimestamps, :EmptyList), :updateTimestamps)",

      "version = :version",

      "tutorialData = :tutorialData",
    ].join(", ");

  const now = db.now();
  const values: Omit<
    apiTypes.Tutorial,
    // These two fields constitute the key.
    "learnerId" | "tutorial"
  > = {
    institution: learner.institution,
    course: learner.course,

    createdAt: now,
    updatedAt: now,
    updateTimestamps: [now],

    version,

    tutorialData: decoded.value,
  };
  const ExpressionAttributeValues = db.expressionAttributes(values);
  ExpressionAttributeValues[":EmptyList"] = [];

  const result = await db.result(
    db.client().update({
      TableName: db.TableName,
      Key: {
        pk: db.learnerPk(learnerId),
        sk: db.tutorialSk(tutorial),
      },
      // Only update if no version number is set (it's a new entry), or the
      // version in the database is less (older) than the incoming version.
      ConditionExpression:
        "attribute_not_exists(version) OR version < :version",
      UpdateExpression,
      ExpressionAttributeValues,
    })
  );

  if (result.failed) {
    if (result.error.code === "ConditionalCheckFailedException") {
      return response.success({
        ok: true,
        updated: false,
      });
    }

    return response.error("Tutorial update failed", result.error);
  }

  return response.success({
    ok: true,
    updated: true,
  });
};
