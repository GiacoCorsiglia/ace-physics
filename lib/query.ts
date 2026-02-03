import * as db from "@/db";
import { Result, success } from "@/result";
import { tutorialSchemas } from "@pages/tutorials/schemas";
import { sortBy } from "./helpers/server";
import { Course } from "./schema/api";
import * as schema from "./schema/db";

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

export const getTutorialsForUser = async (
  user: {
    email: string;
  },
  courses: Course[],
): Promise<Result<db.DbError, schema.TutorialState[]>> => {
  const tutorialIds = Array.from(tutorialSchemas.keys());

  // Build keys for all possible tutorial states:
  // 1. Standalone tutorials (not associated with a course)
  // 2. Course-based tutorials (one for each course the user is in)
  const keys = [
    // Standalone tutorials
    ...tutorialIds.map((tutorialId) =>
      db.codec.TutorialState.keys.primary({
        userEmail: user.email,
        tutorialId,
        courseId: schema.TUTORIAL_STATE_NO_COURSE,
      }),
    ),
    // Course-based tutorials
    ...courses.flatMap((course) =>
      tutorialIds.map((tutorialId) =>
        db.codec.TutorialState.keys.primary({
          userEmail: user.email,
          tutorialId,
          courseId: course.id,
        }),
      ),
    ),
  ];

  // Bail early if we have no keys to fetch
  if (keys.length === 0) {
    return success([]);
  }

  // BatchGet supports up to 100 items. If a user has many courses, we need to
  // split into multiple batches.
  const BATCH_SIZE = 100;
  const batches: (typeof keys)[] = [];
  for (let i = 0; i < keys.length; i += BATCH_SIZE) {
    batches.push(keys.slice(i, i + BATCH_SIZE));
  }

  const allTutorialStates: schema.TutorialState[] = [];

  for (const batchKeys of batches) {
    const result = await db.client().batchGet({
      RequestItems: {
        [db.tableName()]: {
          Keys: batchKeys,
          // Exclude the heavy 'state' and 'events' fields for better performance
          ProjectionExpression:
            "#courseId, #userEmail, #tutorialId, #createdAt, #updatedAt, #version",
          ExpressionAttributeNames: {
            "#courseId": "courseId",
            "#userEmail": "userEmail",
            "#tutorialId": "tutorialId",
            "#createdAt": "createdAt",
            "#updatedAt": "updatedAt",
            "#version": "version",
          },
        },
      },
    });

    if (result.failed) {
      return result;
    }

    // Add placeholder values for excluded fields so the decoder works
    const items = result.value.Responses?.[db.tableName()] || [];
    const itemsWithPlaceholders = items.map((item) => ({
      ...item,
      state: null, // Placeholder - not transferred from DynamoDB
      events: [], // Placeholder - not transferred from DynamoDB
    }));

    const tutorialStates = await db.codec.TutorialState.decodeList(
      itemsWithPlaceholders,
    );

    allTutorialStates.push(...tutorialStates);
  }

  return success(sortBy(allTutorialStates, "updatedAt").reverse());
};
