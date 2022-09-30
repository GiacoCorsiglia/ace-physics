import { endpoint, response, spec } from "@/api/server";
import * as db from "@/db";
import { sortBy } from "@/helpers/server";

export default endpoint(
  spec.Courses,
  {
    async GET(request) {
      const { user } = request.session;

      const userCoursesResult = await db.fetchAllPages((ExclusiveStartKey) =>
        db.client().query({
          TableName: db.tableName(),
          KeyConditionExpression: `#${db.Keys.pk} = :${db.Keys.pk} and begins_with(#${db.Keys.sk}, :${db.Keys.sk})`,
          ...db.expressionAttributes(
            db.codec.CourseUser.keys.primary({
              userEmail: user.email,
              courseId: "",
            })
          ),
          ExclusiveStartKey,
        })
      );

      if (userCoursesResult.failed) {
        return response.error(userCoursesResult.error);
      }

      const userCourses = db.codec.CourseUser.decodeList(
        userCoursesResult.value
      );

      if (userCourses.length === 0) {
        // Bail when there are no courses for this user!  DynamoDB doesn't like
        // having an empty set of RequestItems, and it's a wasted call anyway.
        return response.success([]);
      }

      // This is limited to 100 courses, which should be fine...
      const coursesResult = await db.client().batchGet({
        RequestItems: {
          [db.tableName()]: {
            Keys: userCourses.map((course) =>
              db.codec.Course.keys.primary({ id: course.courseId })
            ),
          },
        },
      });

      if (coursesResult.failed) {
        return response.error(coursesResult.error);
      }

      const courses = db.codec.Course.decodeList(
        coursesResult.value.Responses?.[db.tableName()]
      );

      const rolesByCourse = new Map(
        userCourses.map((userCourse) => [userCourse.courseId, userCourse.role])
      );

      return response.success(
        sortBy(
          courses.map((course) => ({
            ...course,
            userRole: rolesByCourse.get(course.id)!, // Necessarily defined.
          })),
          "createdAt"
        )
      );
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
        "Courses cannot be created when database is disabled."
      );
    },
  }
);
