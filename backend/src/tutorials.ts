import * as apiTypes from "ace-frontend/src/common/apiTypes";
import { names } from "ace-frontend/src/common/tutorials";
import * as db from "./db";
import * as response from "./response";
import { Handler } from "./router";

export const get: Handler<apiTypes.GetTutorialRequest> = async (request) => {
  const { learnerId, tutorial } = request.body;

  if (!names[tutorial]) {
    return response.error("Invalid Tutorial");
  }

  return db
    .client()
    .get({
      TableName: db.TableName,
      Key: {
        learnerId: db.learnerId(learnerId),
        entryId: db.tutorialId(tutorial),
      },
    })
    .promise()
    .then(
      (result) => {
        if (!result.Item) {
          return response.notFound();
        }

        const item = result.Item;
        const output = {
          learnerId: learnerId,
          tutorial: tutorial,
          institutionId: item.institutionId,
          courseId: item.courseId,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
          tutorialData: item,
        };

        // This will delete these keys from the `tutorialData` field too.
        // We flatten the data model in the database.
        delete item.learnerId;
        delete item.entryId;
        delete item.institutionId;
        delete item.courseId;
        delete item.createdAt;
        delete item.updatedAt;

        return response.success(output);
      },
      (e) => response.error("GetTutorial Failed", e)
    );
};

export const update: Handler<apiTypes.UpdateTutorialRequest> = async (
  request
) => {
  return response.error("UpdateTutorial: Unimplemented");
};
