import { endpoint, response, spec } from "@/api/server";
import * as db from "@/db";

export default endpoint(spec.Course, {
  async GET(request) {
    const { user } = request.session;

    const result = await db.client().transactGet({
      TransactItems: [
        {
          Get: {
            TableName: db.tableName(),
            Key: db.codec.Course.keys.primary({ id: request.query.courseId }),
          },
        },
        // The existence of this item guarantees that the user has permission to
        // access this course.
        {
          Get: {
            TableName: db.tableName(),
            Key: db.codec.CourseUser.keys.primary({
              courseId: request.query.courseId,
              userEmail: user.email,
            }),
          },
        },
      ],
    });

    if (result.failed) {
      if (
        result.error.name === "TransactionCanceledException" &&
        result.error.CancellationReasons?.some(
          ({ Code }) => Code === "ConditionalCheckFailed"
        )
      ) {
        return response.notFound();
      }

      return response.error(result.error);
    }

    const [{ Item: courseItem }, { Item: courseUserItem }] =
      result.value.Responses!;

    const course = db.codec.Course.decode(courseItem);
    const courseUser = db.codec.CourseUser.decode(courseUserItem);

    if (course.failed || courseUser.failed) {
      return response.notFound();
    }

    return response.success({
      ...course.value,
      userRole: courseUser.value.role,
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
          ({ Code }) => Code === "ConditionalCheckFailed"
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
});
