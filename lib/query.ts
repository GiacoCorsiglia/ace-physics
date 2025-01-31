import * as db from "@/db";
import { Result, success } from "@/result";
import { sortBy } from "./helpers/server";
import { Course } from "./schema/api";

export const getCoursesForUser = async (user: {
  email: string;
}): Promise<Result<db.DbError, Course[]>> => {
  const userCoursesResult = await db.fetchAllPages((ExclusiveStartKey) =>
    db.client().query({
      TableName: db.tableName(),
      KeyConditionExpression: `#${db.Keys.pk} = :${db.Keys.pk} and begins_with(#${db.Keys.sk}, :${db.Keys.sk})`,
      ...db.expressionAttributes(
        db.codec.CourseUser.keys.primary({
          userEmail: user.email,
          courseId: "",
        }),
      ),
      ExclusiveStartKey,
    }),
  );

  if (userCoursesResult.failed) {
    return userCoursesResult;
  }

  const userCourses = db.codec.CourseUser.decodeList(userCoursesResult.value);

  // Bail when there are no courses for this user!  DynamoDB doesn't like having
  // an empty set of RequestItems, and it's a wasted call anyway.
  if (userCourses.length === 0) {
    return success([]);
  }

  // This is limited to 100 courses, which should be fine...
  const coursesResult = await db.client().batchGet({
    RequestItems: {
      [db.tableName()]: {
        Keys: userCourses.map((course) =>
          db.codec.Course.keys.primary({ id: course.courseId }),
        ),
      },
    },
  });

  if (coursesResult.failed) {
    return coursesResult;
  }

  const courses = db.codec.Course.decodeList(
    coursesResult.value.Responses?.[db.tableName()],
  );

  const rolesByCourse = new Map(
    userCourses.map((userCourse) => [userCourse.courseId, userCourse.role]),
  );

  return success(
    sortBy(
      courses.map((course) => ({
        ...course,
        userRole: rolesByCourse.get(course.id)!, // Necessarily defined.
      })),
      "createdAt",
    ),
  );
};
