import { response } from "@/api/server";
import { setupDB } from "@/db/test-helpers";
import * as api from "@/schema/api";
import endpoint from "./index.endpoint";

const { GET, POST } = endpoint.handlers;

const { it, describe } = setupDB();

describe("/courses", () => {
  it("GET returns empty array when there are no courses", async () => {
    const res = await GET({
      method: "GET",
      query: {},
      session: {
        expires: "",
        user: { email: "abc123" },
      },
    });

    expect(res).toEqual(response.success([]));
  });

  it("POST rejects course creation for non-instructor/admin", async () => {
    const res = await POST({
      method: "POST",
      query: {},
      body: { displayName: "test" },
      session: {
        expires: "",
        user: { email: "abc123" },
      },
    });

    expect(res).toEqual(response.forbidden());
  });

  it("POST POST GET creates two courses and loads them", async () => {
    const session = {
      expires: "",
      user: { email: "abc123", role: "instructor" as const },
    };

    // First course creation.
    const res1 = await POST({
      method: "POST",
      query: {},
      body: { displayName: "test1" },
      session,
    });
    expect(res1).toMatchObject(
      response.success({
        displayName: "test1",
        userRole: "instructor",
      }),
    );
    // Should have been assigned random ID.
    expect((res1.body as api.Course).id).not.toBeFalsy();

    // Second course creation.
    const res2 = await POST({
      method: "POST",
      query: {},
      body: { displayName: "test2" },
      session,
    });
    expect(res2).toMatchObject(
      response.success({
        displayName: "test2",
        userRole: "instructor",
      }),
    );
    // Should have been assigned different ID.
    expect((res1.body as api.Course).id).not.toBe((res2.body as api.Course).id);

    // Now load them both!
    const res3 = await GET({
      method: "GET",
      query: {},
      session,
    });
    // Check containment; this shouldn't depend on order.
    expect(res3.body).toContainEqual(res1.body);
    expect(res3.body).toContainEqual(res2.body);
  });
});
