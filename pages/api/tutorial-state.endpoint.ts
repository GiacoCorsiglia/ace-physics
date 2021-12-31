import { endpoint, response, spec } from "@/api";
import * as db from "@/db";
import { decode } from "@/schema/types";
import { tutorialSchemas } from "@pages/tutorials/schemas";

export default endpoint(spec.TutorialState, {
  async GET(request) {
    const { user } = request.session;

    const result = await db.client().get({
      TableName: db.TableName,
      Key: db.codec.TutorialState.keys.primary({
        userEmail: user.email,
        tutorialId: request.query.tutorialId,
        courseId: request.query.courseId,
      }),
    });

    if (result.failed) {
      return response.error("TutorialState:Get failed", result.error);
    }

    const item = result.value.Item;
    if (!item) {
      return response.notFound();
    }

    const decoded = db.codec.TutorialState.decode(item);
    if (decoded.failed) {
      return response.notFound();
    }

    return response.success(decoded.value);
  },

  async PUT(request) {
    const { user } = request.session;

    const { courseId, tutorialId } = request.query;
    const { version, state, events } = request.body;

    // Is this a real tutorial?
    const tutorialSchema = tutorialSchemas.get(tutorialId);
    if (!tutorialSchema) {
      return response.error("Invalid tutorial", {
        received: tutorialId,
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

    const now = db.now();
    const item = db.codec.TutorialState.encode(
      {
        courseId,
        tutorialId,
        userEmail: user.email,
        createdAt: now,
        updatedAt: now,
        version,
        state: decoded.value,
        events,
      },
      false
    );

    const result = await db.client().update({
      TableName: db.TableName,
      Key: db.codec.TutorialState.keys.primary(item),
      // Only update if no version number is set (it's a new entry), or the
      // version in the database is less (older) than the incoming version.
      ConditionExpression:
        "attribute_not_exists(#version) OR #version < :version",
      ...db.updateExpression(item, {
        // Only set createdAt the first time.
        createdAt: (name, value) => `if_not_exists(${name}, ${value})`,
      }),
    });

    if (result.failed) {
      if (result.error.name === "ConditionalCheckFailedException") {
        // It's fine, just a stale request.
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
  },
});
