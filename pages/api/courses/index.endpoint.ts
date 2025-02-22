import { endpoint, response, spec } from "@/api/server";
import * as db from "@/db";
import { getCoursesForUser } from "@/query";

export default endpoint(
  spec.Courses,
  {
    async GET(request) {
      const { user } = request.session;

      const coursesResult = await getCoursesForUser(user);

      if (coursesResult.failed) {
        return response.error(coursesResult.error);
      }

      return response.success(coursesResult.value);
    },

    async POST(request) {
      const { user } = request.session;

      if (user.role !== "instructor" && user.role !== "admin") {
        return response.forbidden();
      }

      const displayName = request.body.displayName.trim();
      if (!displayName) {
        return response.error("Bad request: empty displayName");
      }

      const now = db.now();

      const newCourse = {
        id: db.generateRandomId(),
        createdAt: now,
        updatedAt: now,
        displayName,
        visibleTutorials: undefined,
      };

      const newCourseUser = {
        courseId: newCourse.id,
        userEmail: user.email,
        createdAt: now,
        role: "instructor" as const,
      };

      const result = await db.client().transactWrite({
        ClientRequestToken: newCourse.id,
        TransactItems: [
          {
            Put: {
              TableName: db.tableName(),
              Item: db.codec.Course.encode(newCourse),
              ConditionExpression: `attribute_not_exists(#${db.Keys.pk})`,
              ExpressionAttributeNames: db.expressionAttributeNames({
                [db.Keys.pk]: "",
              }),
            },
          },
          {
            Put: {
              TableName: db.tableName(),
              Item: db.codec.CourseUser.encode(newCourseUser),
            },
          },
        ],
      });

      if (result.failed) {
        return response.error(result.error);
      }

      return response.success({
        ...newCourse,
        userRole: "instructor" as const,
      });
    },
  },
  {
    async GET() {
      // Nobody has any courses in Development Mode.
      return response.success([]);
    },

    async POST() {
      return response.error(
        "Courses cannot be created when database is disabled.",
      );
    },
  },
);
