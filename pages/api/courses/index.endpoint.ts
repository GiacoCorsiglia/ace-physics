import { endpoint, response, spec } from "@/api";
import * as db from "@/db";

export default endpoint(spec.Courses, {
  async GET(request) {
    const { user } = request.session;

    const userCoursesResult = await db.fetchAllPages((ExclusiveStartKey) =>
      db.client().query({
        TableName: db.TableName,
        KeyConditionExpression: `#${db.Keys.GSI1PK} = :${db.Keys.GSI1PK} and begins_with(#${db.Keys.GSI1SK}, :${db.Keys.GSI1SK})`,
        ...db.expressionAttributes(
          db.codec.CourseUser.keys.GSI1({
            courseId: "",
            userEmail: user.email,
          })
        ),
        ExclusiveStartKey,
      })
    );

    if (userCoursesResult.failed) {
      return response.error(userCoursesResult.error);
    }

    const userCourses = db.codec.CourseUser.decodeList(userCoursesResult.value);

    // This is limited to 100 courses, which should be fine...
    const coursesResult = await db.client().batchGet({
      RequestItems: {
        [db.TableName]: {
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
      coursesResult.value.Responses?.[db.TableName]
    );

    const rolesByCourse = new Map(
      userCourses.map((userCourse) => [userCourse.courseId, userCourse.role])
    );

    return response.success(
      courses.map((course) => ({
        ...course,
        userRole: rolesByCourse.get(course.id)!, // Necessarily defined.
      }))
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
            TableName: db.TableName,
            Item: db.codec.Course.encode(newCourse),
            ConditionExpression: `attribute_not_exists(#${db.Keys.pk})`,
            ExpressionAttributeNames: db.expressionAttributeNames({
              [db.Keys.pk]: "",
            }),
          },
        },
        {
          Put: {
            TableName: db.TableName,
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
});
