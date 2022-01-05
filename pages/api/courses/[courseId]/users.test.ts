import { response } from "@/api/server";
import { hashEmail } from "@/auth/server/hashed-dynamodb-adapter";
import * as db from "@/db";
import { setupDB } from "@/db/test-helpers";
import * as api from "@/schema/api";
import indexEndpoint from "../index.endpoint";
import endpoint from "./users.endpoint";

const { GET, PUT } = endpoint.handlers;
const { POST: indexPOST } = indexEndpoint.handlers;

db;

const { it, describe } = setupDB();

describe("/courses/{courseId}/users", () => {
  const session = {
    expires: "",
    user: {
      email: "abc123",
      role: "instructor" as const,
    },
  };

  const createCourse = async () => {
    // Create course.
    const postRes = await indexPOST({
      method: "POST",
      query: {},
      body: { displayName: "test" },
      session,
    });
    expect(postRes).toMatchObject(
      response.success({
        displayName: "test",
        userRole: "instructor",
      })
    );
    return [
      postRes.body as api.Course,
      (postRes.body as api.Course).id,
    ] as const;
  };

  it("GET returns instructor when no other users have been added", async () => {
    const [, courseId] = await createCourse();

    const res = await GET({
      method: "GET",
      query: { courseId },
      session,
    });

    expect(res).toMatchObject(
      response.success({
        instructors: [
          {
            courseId,
            userEmail: session.user.email,
            role: "instructor",
          },
        ],
        students: [],
      })
    );
  });

  it("GET returns 404 when user is unassociated with course", async () => {
    const [, courseId] = await createCourse();

    const res = await GET({
      method: "GET",
      query: { courseId },
      session: {
        expires: "",
        user: { email: "someone_else", role: "admin" },
      },
    });

    expect(res).toEqual(response.notFound());
  });

  it("GET returns 404 when course doesn't exist", async () => {
    const res = await GET({
      method: "GET",
      query: { courseId: "something_random" },
      session,
    });
    expect(res).toEqual(response.notFound());
  });

  it("PUT allows course instructors to add users", async () => {
    const [, courseId] = await createCourse();

    const putRes = await PUT({
      method: "PUT",
      query: { courseId },
      body: {
        unhashedInstructorEmails: "i1@ex.co\ni2@ex.co",
        unhashedStudentEmails: "s1@ex.co\ns2@ex.co",
      },
      session,
    });

    const expected = {
      newInstructors: [
        expect.objectContaining({
          courseId,
          userEmail: hashEmail("i1@ex.co"),
          role: "instructor",
        }),
        expect.objectContaining({
          courseId,
          userEmail: hashEmail("i2@ex.co"),
          role: "instructor",
        }),
      ],
      newStudents: [
        expect.objectContaining({
          courseId,
          userEmail: hashEmail("s1@ex.co"),
          role: "student",
        }),
        expect.objectContaining({
          courseId,
          userEmail: hashEmail("s2@ex.co"),
          role: "student",
        }),
      ],
    };

    expect(putRes).toMatchObject(
      response.success({
        ...expected,
        unhashedRejectedEmails: [],
      })
    );

    const getRes = await GET({
      method: "GET",
      query: { courseId },
      session,
    });

    expect(getRes).toMatchObject(
      response.success({
        instructors: [
          expect.objectContaining({
            courseId,
            userEmail: session.user.email,
            role: "instructor",
          }),
          ...expected.newInstructors,
        ],
        students: expected.newStudents,
      })
    );

    // Now new instructors should be able to add users too!

    const putRes2 = await PUT({
      method: "PUT",
      query: { courseId },
      body: {
        unhashedInstructorEmails: "i3@ex.co",
        unhashedStudentEmails: "s3@ex.co",
      },
      session: { expires: "", user: { email: hashEmail("i1@ex.co") } },
    });

    const expected2 = {
      newInstructors: [
        expect.objectContaining({
          courseId,
          userEmail: hashEmail("i3@ex.co"),
          role: "instructor",
        }),
      ],
      newStudents: [
        expect.objectContaining({
          courseId,
          userEmail: hashEmail("s3@ex.co"),
          role: "student",
        }),
      ],
    };

    expect(putRes2).toMatchObject(
      response.success({
        ...expected2,
        unhashedRejectedEmails: [],
      })
    );
  });
});
