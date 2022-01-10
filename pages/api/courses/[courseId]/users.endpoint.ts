import { endpoint, response, Session, spec } from "@/api/server";
import { hashEmail } from "@/auth/server/hashed-dynamodb-adapter";
import * as db from "@/db";
import { isValidEmail, sortBy } from "@/helpers/server";
import { failure, isFailure, Result, success } from "@/result";
import {
  CourseInstructor,
  CourseStudent,
  courseUserIsInstructor,
  courseUserIsStudent,
} from "@/schema/api";

export default endpoint(spec.CourseUsers, {
  async GET(request) {
    const { user } = request.session;
    const { courseId } = request.query;

    // First make sure the user can even access this course.
    const permissionResult = await userHasPermission(user, courseId);
    if (permissionResult.failed) {
      return response.error(permissionResult.error);
    } else if (!permissionResult.value) {
      return response.notFound();
    }

    // Now fetch all the users.
    const allUsersResult = await fetchAllUsers(courseId);

    if (allUsersResult.failed) {
      return response.error(
        "Unable to fetch CourseUsers",
        allUsersResult.error
      );
    }

    const allUsers = allUsersResult.value;

    return response.success({
      instructors: sortBy(allUsers.filter(courseUserIsInstructor), "createdAt"),
      students: sortBy(allUsers.filter(courseUserIsStudent), "createdAt"),
    });
  },

  async PUT(request) {
    const { user } = request.session;
    const { courseId } = request.query;

    // First make sure the user can even access this course.
    const permissionResult = await userHasPermission(user, courseId);
    if (permissionResult.failed) {
      return response.error(permissionResult.error);
    } else if (!permissionResult.value) {
      return response.forbidden();
    }

    // Now parse the input.
    const [studentEmails, unhashedRejectedStudentEmails] = parseAndHashEmails(
      request.body.unhashedStudentEmails
    );
    const [instructorEmails, unhashedRejectedInstructorEmails] =
      parseAndHashEmails(request.body.unhashedInstructorEmails);

    // Load existing users to avoid overwriting any.  Sadly the BatchWriteItem
    // command doesn't support conditions on Puts, so this is the best way.
    const existingUsersResult = await fetchAllUsers(courseId);
    if (existingUsersResult.failed) {
      return response.error(
        "Unable to load existing users",
        existingUsersResult.error
      );
    }

    const existingUserEmails = new Set(
      existingUsersResult.value.map((user) => user.userEmail)
    );

    // Create new user objects---but filter out any that already exist!
    const createdAt = db.now();
    const newStudents = studentEmails
      .filter((studentEmail) => !existingUserEmails.has(studentEmail))
      .map(
        (studentEmail): CourseStudent => ({
          courseId,
          createdAt,
          userEmail: studentEmail,
          role: "student",
        })
      );
    const newInstructors = instructorEmails
      .filter((instructorEmail) => !existingUserEmails.has(instructorEmail))
      .map(
        (instructorEmail): CourseInstructor => ({
          courseId,
          createdAt,
          userEmail: instructorEmail,
          role: "instructor",
        })
      );

    // Write new user objects to the database.
    const writeRequests = [...newStudents, ...newInstructors].map(
      (courseUser) => ({
        PutRequest: {
          Item: db.codec.CourseUser.encode(courseUser),
        },
      })
    );
    const client = db.client();
    const chunkSize = 25; // This is determined by DynamoDB
    const results = await Promise.all(
      Array.from(
        (function* () {
          for (let i = 0; i < writeRequests.length; i += chunkSize) {
            yield client.batchWrite({
              RequestItems: {
                [db.tableName()]: writeRequests.slice(i, i + chunkSize),
              },
            });
          }
        })()
      )
    );

    if (results.some(isFailure)) {
      return response.error("Course user creation failed");
    }

    return response.success({
      newStudents,
      newInstructors,
      unhashedRejectedEmails: [
        ...unhashedRejectedInstructorEmails,
        ...unhashedRejectedStudentEmails,
      ],
    });
  },
});

const parseAndHashEmails = (
  list: string
): [accepted: string[], rejected: string[]] => {
  const accepted: string[] = [];
  const rejected: string[] = [];

  for (let email of list.split("\n")) {
    email = email.trim();
    if (isValidEmail(email)) {
      accepted.push(hashEmail(email));
    } else if (email) {
      rejected.push(email);
    }
  }

  return [accepted, rejected];
};

const userHasPermission = async (
  user: Session["user"],
  courseId: string
): Promise<Result<any, boolean>> => {
  // They don't need to be a global instructor, just one for this course.

  const courseUserResult = await db.client().get({
    TableName: db.tableName(),
    Key: db.codec.CourseUser.keys.primary({
      courseId,
      userEmail: user.email,
    }),
  });

  if (courseUserResult.failed) {
    return failure(courseUserResult.error);
  }

  const decoded = db.codec.CourseUser.decode(courseUserResult.value.Item);
  if (decoded.failed) {
    return success(false);
  }

  if (decoded.value.role === "instructor") {
    return success(true);
  }

  return success(false);
};

const fetchAllUsers = async (courseId: string) => {
  const usersResult = await db.fetchAllPages((ExclusiveStartKey) =>
    db.client().query({
      TableName: db.tableName(),
      IndexName: db.Indexes.GSI1,
      KeyConditionExpression: `#${db.Keys.GSI1PK} = :${db.Keys.GSI1PK} and begins_with(#${db.Keys.GSI1SK}, :${db.Keys.GSI1SK})`,
      ...db.expressionAttributes(
        db.codec.CourseUser.keys.GSI1({
          courseId,
          userEmail: "",
        })
      ),
      ExclusiveStartKey,
    })
  );

  if (usersResult.failed) {
    return failure(usersResult.error);
  }

  return success(db.codec.CourseUser.decodeList(usersResult.value));
};
