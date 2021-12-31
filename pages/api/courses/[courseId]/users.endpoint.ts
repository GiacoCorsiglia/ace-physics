import { endpoint, response, Session, spec } from "@/api";
import { hashEmail } from "@/auth/hashed-dynamodb-adapter";
import * as db from "@/db";
import { failure, isFailure, Result, success, unwrap } from "@/helpers/result";
import {
  CourseInstructor,
  CourseStudent,
  courseUserIsInstructor,
  courseUserIsStudent,
} from "@/schema/api";

const userHasPermission = async (
  user: Session["user"],
  courseId: string
): Promise<Result<any, boolean>> => {
  // First of all, the user themselves must be an admin or instructor.
  if (user.role !== "instructor" && user.role !== "admin") {
    return success(false);
  }

  const courseUserResult = await db.client().get({
    TableName: db.TableName,
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

export default endpoint(spec.CourseUsers, {
  async GET(request) {
    const { user } = request.session;
    const { courseId } = request.query;

    // First make sure the user can even access this course.
    const permissionResult = await userHasPermission(user, courseId);
    if (permissionResult.failed) {
      return response.error(permissionResult.error);
    } else if (!permissionResult.value) {
      return response.forbidden();
    }

    // Now fetch all the users.
    const usersResult = await db.fetchAllPages((ExclusiveStartKey) =>
      db.client().query({
        TableName: db.TableName,
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
      return response.error(usersResult.error);
    }

    const users = db.codec.CourseUser.decodeList(usersResult.value);

    return response.success({
      instructors: users.filter(courseUserIsInstructor),
      students: users.filter(courseUserIsStudent),
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

    const [studentEmails, rejectedStudentEmails] = parseEmails(
      request.body.unhashedStudentEmails
    );

    const [instructorEmails, rejectedInstructorEmails] = parseEmails(
      request.body.unhashedInstructorEmails
    );

    const createdAt = db.now();
    const instructors = instructorEmails.map((instructorEmail) =>
      db.codec.CourseUser.encode({
        courseId,
        createdAt,
        userEmail: instructorEmail,
        role: "instructor",
      })
    );
    const students = studentEmails.map((studentEmail) =>
      db.codec.CourseUser.encode({
        courseId,
        createdAt,
        userEmail: studentEmail,
        role: "student",
      })
    );

    const writeRequests = instructors.concat(students).map((courseUser) => ({
      PutRequest: {
        Item: courseUser,
      },
    }));

    const client = db.client();
    const chunkSize = 25; // This is determined by DynamoDB
    const results = await Promise.all(
      Array.from(
        (function* () {
          for (let i = 0; i < writeRequests.length; i += chunkSize) {
            yield client.batchWrite({
              RequestItems: {
                [db.TableName]: writeRequests.slice(i, i + chunkSize),
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
      students: students.map(
        (s) => unwrap(db.codec.CourseUser.decode(s)) as CourseStudent
      ),
      instructors: instructors.map(
        (s) => unwrap(db.codec.CourseUser.decode(s)) as CourseInstructor
      ),
      unhashedRejectedEmails: rejectedInstructorEmails.concat(
        rejectedStudentEmails
      ),
    });
  },
});

const emailX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const parseEmails = (
  list: string
): [accepted: string[], rejected: string[]] => {
  const accepted: string[] = [];
  const rejected: string[] = [];

  for (let email of list.split("\n")) {
    email = email.trim();
    if (emailX.test(email)) {
      accepted.push(hashEmail(email));
    } else {
      rejected.push(email);
    }
  }

  return [accepted, rejected];
};
