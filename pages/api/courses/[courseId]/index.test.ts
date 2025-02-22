import { response } from "@/api/server";
import { hashEmail } from "@/auth/server/hashed-dynamodb-adapter";
import { setupDB } from "@/db/test-helpers";
import * as api from "@/schema/api";
import { expect } from "vitest";
import indexEndpoint from "../index.endpoint";
import endpoint from "./index.endpoint";
import usersEndpoint from "./users.endpoint";

const { GET, PUT } = endpoint.handlers;
const { POST: indexPOST } = indexEndpoint.handlers;
const { PUT: usersPUT } = usersEndpoint.handlers;

const { it, describe } = setupDB();

describe("/courses/{courseId}", () => {
  const session = { expires: "", user: { email: "abc123" } } as const;
  const session2 = { expires: "", user: { email: "zxc455" } } as const;

  it("GET returns 404 for unknown course", async () => {
    const res = await GET({
      method: "GET",
      query: {
        courseId: "xyz789",
      },
      session,
    });

    expect(res).toEqual(response.notFound());
  });

  it("GET returns 404 for other user's course", async () => {
    // Create other course.
    const postRes = await indexPOST({
      method: "POST",
      query: {},
      body: { displayName: "other" },
      session: session2,
    });

    const res = await GET({
      method: "GET",
      query: {
        courseId: (postRes.body as api.Course).id,
      },
      session,
    });

    expect(res).toEqual(response.notFound());
  });

  it("GET returns user's course", async () => {
    // Create course.
    const postRes = await indexPOST({
      method: "POST",
      query: {},
      body: { displayName: "test" },
      session: {
        expires: "",
        user: { ...session.user, role: "instructor" },
      },
    });

    expect(postRes).toMatchObject(
      response.success({
        displayName: "test",
        userRole: "instructor",
      }),
    );

    const res = await GET({
      method: "GET",
      query: {
        courseId: (postRes.body as api.Course).id,
      },
      session,
    });

    expect(res).toMatchObject(
      response.success({
        id: (postRes.body as api.Course).id,
        displayName: "test",
        userRole: "instructor",
      }),
    );
  });

  it("GET returns other user's course for admin", async () => {
    // Create course.
    const postRes = await indexPOST({
      method: "POST",
      query: {},
      body: { displayName: "test" },
      session: {
        expires: "",
        user: { ...session.user, role: "instructor" },
      },
    });

    expect(postRes).toMatchObject(
      response.success({
        displayName: "test",
        userRole: "instructor",
      }),
    );

    const res = await GET({
      method: "GET",
      query: {
        courseId: (postRes.body as api.Course).id,
      },
      session: {
        ...session2,
        user: { ...session2.user, role: "admin" },
      },
    });

    expect(res).toMatchObject(
      response.success({
        id: (postRes.body as api.Course).id,
        displayName: "test",
        userRole: "instructor",
      }),
    );
  });

  it("PUT updates user's course", async () => {
    // Create course.
    const postRes = await indexPOST({
      method: "POST",
      query: {},
      body: { displayName: "test" },
      session: {
        expires: "",
        user: { ...session.user, role: "instructor" },
      },
    });
    expect(postRes).toMatchObject(
      response.success({
        displayName: "test",
        userRole: "instructor",
      }),
    );

    // Now update the course.
    const putRes = await PUT({
      method: "PUT",
      query: {
        courseId: (postRes.body as api.Course).id,
      },
      body: {
        displayName: "test2",
        visibleTutorials: ["vt1", "vt2"],
      },
      session,
    });

    expect(putRes).toMatchObject(
      response.success({
        id: (postRes.body as api.Course).id,
        displayName: "test2",
        visibleTutorials: ["vt1", "vt2"],
        userRole: "instructor",
      }),
    );

    const res = await GET({
      method: "GET",
      query: {
        courseId: (postRes.body as api.Course).id,
      },
      session,
    });

    expect(res).toMatchObject(
      response.success({
        id: (postRes.body as api.Course).id,
        displayName: "test2",
        visibleTutorials: ["vt1", "vt2"],
        userRole: "instructor",
      }),
    );
  });

  it("PUT disallows updating course for which user is not instructor", async () => {
    const session = {
      expires: "",
      user: { email: "email_1", role: "instructor" },
    } as const;

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
      }),
    );

    const courseId = (postRes.body as api.Course).id;

    await usersPUT({
      method: "PUT",
      query: { courseId },
      body: { unhashedInstructorEmails: "", unhashedStudentEmails: "s1@ex.co" },
      session,
    });

    const putRes = await PUT({
      method: "PUT",
      query: { courseId },
      body: { displayName: "Blah" },
      session: { expires: "", user: { email: hashEmail("s1@ex.co") } },
    });

    expect(putRes).toEqual(response.notFound());
  });
});
