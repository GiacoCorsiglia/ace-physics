import { endpoint, response, spec } from "@/api/server";
import * as db from "@/db";
import {
  TransactGetCommandInput,
  TransactWriteCommandInput,
} from "@aws-sdk/lib-dynamodb";

type GetTransactItems = NonNullable<TransactGetCommandInput["TransactItems"]>;
type WriteTransactItems = NonNullable<
  TransactWriteCommandInput["TransactItems"]
>;

export default endpoint(
  spec.CourseArchive,
  {
    async POST(request) {
      const { user } = request.session;
      const { archived } = request.body;

      const now = db.now();

      const TransactItems: WriteTransactItems = [];

      // First, make sure this user has permissions.  They must be associated
      // with the course, and have the role instructor.  UNLESS the user is an
      // ACE Physics admin, then we don't care.
      if (user.role !== "admin") {
        TransactItems.push({
          ConditionCheck: {
            TableName: db.tableName(),
            Key: db.codec.CourseUser.keys.primary({
              courseId: request.query.courseId,
              userEmail: user.email,
            }),
            ConditionExpression: "#role = :role",
            ...db.codec.CourseUser.expressionAttributes({
              role: "instructor",
            }),
          },
        });
      }

      // Build the update expression based on whether we're archiving or unarchiving
      let updateExpression: string;
      const expressionAttributeNames: Record<string, string> = {
        "#updatedAt": "updatedAt",
        "#archivedAt": "archivedAt",
      };
      const expressionAttributeValues: Record<string, any> = {
        ":updatedAt": now,
      };

      if (archived) {
        // Archiving: SET both updatedAt and archivedAt
        updateExpression =
          "SET #updatedAt = :updatedAt, #archivedAt = :archivedAt";
        expressionAttributeValues[":archivedAt"] = now;
      } else {
        // Unarchiving: SET updatedAt and REMOVE archivedAt
        updateExpression = "SET #updatedAt = :updatedAt REMOVE #archivedAt";
      }

      // We'll make this update if the first part of the transaction passes.
      TransactItems.push({
        Update: {
          TableName: db.tableName(),
          Key: db.codec.Course.keys.primary({ id: request.query.courseId }),
          UpdateExpression: updateExpression,
          ExpressionAttributeNames: expressionAttributeNames,
          ExpressionAttributeValues: expressionAttributeValues,
        },
      });

      const result = await db.client().transactWrite({
        TransactItems,
      });

      if (result.failed) {
        if (
          result.error.name === "TransactionCanceledException" &&
          result.error.CancellationReasons?.some(
            ({ Code }) => Code === "ConditionalCheckFailed",
          )
        ) {
          // User does not have permission to modify this course.
          return response.notFound();
        }
        return response.error(result.error);
      }

      const courseResult = await db.client().get({
        TableName: db.tableName(),
        Key: db.codec.Course.keys.primary({ id: request.query.courseId }),
      });

      if (courseResult.failed) {
        return response.error(courseResult.error);
      }

      const course = db.codec.Course.decode(courseResult.value.Item);
      if (course.failed) {
        return response.error("Failed to decode Course", course.error);
      }

      return response.success({
        ...course.value,
        userRole: "instructor" as const, // We've already confirmed this above.
      });
    },
  },
  {
    async POST() {
      return response.error(
        "Courses cannot be archived when database is disabled.",
      );
    },
  },
);
