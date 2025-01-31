import { endpoint, response, spec } from "@/api/server";
import * as db from "@/db";
import { Course } from "@/schema/api";
import { TransactGetCommandInput } from "@aws-sdk/lib-dynamodb";

export default endpoint(
  spec.Course,
  {
    async GET(request) {
      const { user } = request.session;

      // We'll load the course, and possibly the CourseUser, in a transaction.
      const TransactItems: NonNullable<
        TransactGetCommandInput["TransactItems"]
      > = [];

      // Definitely load the course itself.
      TransactItems.push({
        Get: {
          TableName: db.tableName(),
          Key: db.codec.Course.keys.primary({ id: request.query.courseId }),
        },
      });

      // If the user is an admin, we don't care about their CourseUser---in
      // fact, we probably won't find one.
      if (user.role !== "admin") {
        // Otherwise, the existence of this item guarantees that the user has
        // permission to view this course.
        TransactItems.push({
          Get: {
            TableName: db.tableName(),
            Key: db.codec.CourseUser.keys.primary({
              courseId: request.query.courseId,
              userEmail: user.email,
            }),
          },
        });
      }

      const result = await db.client().transactGet({
        TransactItems,
      });

      if (result.failed) {
        // If we can't find any of the entities, treat it as a 404.  This
        // *might* mean the course exists but the auth check failed; but 404 is
        // still the right response in that case, to hide the existence of the
        // course from others.
        if (
          result.error.name === "TransactionCanceledException" &&
          result.error.CancellationReasons?.some(
            ({ Code }) => Code === "ConditionalCheckFailed",
          )
        ) {
          return response.notFound();
        }

        return response.error(result.error);
      }

      const courseItem = result.value.Responses![0].Item;
      const course = db.codec.Course.decode(courseItem);
      if (course.failed) {
        return response.notFound();
      }

      let userRole: Course["userRole"];
      if (user.role === "admin") {
        // If the user is an admin, pretend they're a course instructor no
        // matter what!
        userRole = "instructor";
      } else {
        const courseUserItem = result.value.Responses![1].Item;
        const courseUser = db.codec.CourseUser.decode(courseUserItem);

        if (courseUser.failed) {
          return response.notFound();
        }

        userRole = courseUser.value.role;
      }

      return response.success({
        ...course.value,
        userRole,
      });
    },

    async PUT(request) {
      const { user } = request.session;

      const updatedProperties = {
        ...request.body,
        updatedAt: db.now(),
      };

      const result = await db.client().transactWrite({
        TransactItems: [
          // First, make sure this user has permissions.  They must be associated
          // with the course, and have the role instructor.
          {
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
          },

          {
            Update: {
              TableName: db.tableName(),
              Key: db.codec.Course.keys.primary({ id: request.query.courseId }),
              ...db.codec.Course.updateExpression(updatedProperties),
            },
          },
        ],
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
    async GET() {
      return response.notFound();
    },
    async PUT() {
      return response.error(
        "Courses cannot be edited when database is disabled.",
      );
    },
  },
);
