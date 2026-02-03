import { endpoint, response, spec } from "@/api/server";
import * as db from "@/db";

export default endpoint(
  spec.MoveTutorial,
  {
    async POST(request) {
      // You must be an ACE Physics admin to use this endpoint.
      const { user: actingUser } = request.session;
      if (actingUser.role !== "admin") {
        return response.forbidden();
      }

      const { hash } = request.query;
      const { tutorialId, sourceCourseId, destinationCourseId } = request.body;

      // Read the existing tutorial state
      const getResult = await db.client().get({
        TableName: db.tableName(),
        Key: db.codec.TutorialState.keys.primary({
          userEmail: hash,
          tutorialId,
          courseId: sourceCourseId,
        }),
      });

      if (getResult.failed) {
        return response.error("Failed to read tutorial state", getResult.error);
      }

      const item = getResult.value.Item;
      if (!item) {
        return response.notFound();
      }

      const decoded = await db.codec.TutorialState.decode(item);
      if (decoded.failed) {
        return response.error("Failed to decode tutorial state");
      }

      const tutorialState = decoded.value;

      // Create at destination location first.
      const newItem = await db.codec.TutorialState.encode({
        ...tutorialState,
        courseId: destinationCourseId,
      });

      const putResult = await db.client().put({
        TableName: db.tableName(),
        Item: newItem,
        // Only put if the item doesn't already exist at destination (DynamoDB
        // resolves this based on the key of the write anyway).
        ConditionExpression: `attribute_not_exists(#${db.Keys.pk})`,
        ExpressionAttributeNames: {
          [`#${db.Keys.pk}`]: db.Keys.pk,
        },
      });

      if (putResult.failed) {
        if (putResult.error.name === "ConditionalCheckFailedException") {
          return response.error(
            "Tutorial already exists at destination course. Cannot move.",
          );
        }
        return response.error(
          "Failed to create tutorial at destination",
          putResult.error,
        );
      }

      // Now delete from source location
      const deleteResult = await db.client().delete({
        TableName: db.tableName(),
        Key: db.codec.TutorialState.keys.primary({
          userEmail: hash,
          tutorialId,
          courseId: sourceCourseId,
        }),
      });

      if (deleteResult.failed) {
        return response.error(
          "Failed to delete tutorial from source",
          deleteResult.error,
        );
      }

      return response.success({ ok: true } as const);
    },
  },
  {
    async POST() {
      return response.error(
        "Tutorials cannot be moved when database is disabled.",
      );
    },
  },
);
