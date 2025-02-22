import { endpoint, response, spec } from "@/api/server";
import { HashedDynamoDBAdapter } from "@/auth/server/hashed-dynamodb-adapter";
import * as db from "@/db";
import { getCoursesForUser } from "@/query";
import { Result, success } from "@/result";
import { User as ApiUser } from "@/schema/api";
import { AdapterUser } from "next-auth/adapters";

// Recreate NextAuth's adapter here so we can use its methods to operate on
// users in the database.  (The adapter object should be cheap since we talk to
// DynamoDB via, not some persistent connection.)
const adapter = HashedDynamoDBAdapter(
  db.createDocumentClient({
    marshallOptions: {
      convertEmptyValues: true,
      removeUndefinedValues: true,
      convertClassInstanceToMap: true,
    },
  }),
  {
    tableName: db.tableName(),
  },
);

export default endpoint(
  spec.User,
  {
    async GET(request) {
      // You must be an ACE Physics admin to use this endpoint.
      const { user: actingUser } = request.session;
      if (actingUser.role !== "admin") {
        return response.forbidden();
      }

      // NOTE: We expect this email to be hashed...
      const { hash } = request.query;
      // ...but this function works for both hashed and unhashed emails anyway.
      const user = await loadApiUser(hash);

      // No user with this email address!
      if (!user) {
        return response.notFound();
      }

      if (user.failed) {
        return response.error(user.error);
      }

      return response.success(user.value);
    },

    async PUT(request) {
      // You must be an ACE Physics admin to use this endpoint.
      const { user: actingUser } = request.session;
      if (actingUser.role !== "admin") {
        return response.forbidden();
      }

      const { hash } = request.query;
      // NOTE: This is not atomic.  That's probably possible...but I doubt it
      // will matter here.
      const targetUser = await adapter.getUserByEmail!(hash);

      // You can't change your own privileges.
      if (targetUser?.email === actingUser.email) {
        return response.forbidden();
      }

      let updatedUser: AdapterUser;
      if (targetUser) {
        updatedUser = await adapter.updateUser!({
          id: targetUser.id,
          role: request.body.role,
        });
      } else {
        updatedUser = await adapter.createUser!({
          email: hash,
          role: request.body.role,
          emailVerified: null,
        });
      }

      const apiUser = await toApiUser(updatedUser);

      if (apiUser.failed) {
        return response.error(apiUser.error);
      }

      return response.success(apiUser.value);
    },
  },
  {
    async GET() {
      return response.notFound();
    },

    async PUT() {
      return response.error(
        "Users cannot be edited when database is disabled.",
      );
    },
  },
);

/**
 * Finds a user.  Works for both hashed and unhashed emails.
 */
const loadApiUser = async (
  email: string,
): Promise<Result<db.DbError, ApiUser> | null> => {
  const user = await adapter.getUserByEmail!(email);
  return user ? toApiUser(user) : null;
};

/**
 * Loads additional properties on a user that we get from the NextAuth.
 */
const toApiUser = async (
  user: AdapterUser,
): Promise<Result<db.DbError, ApiUser>> => {
  const coursesResult = await getCoursesForUser(user);

  if (coursesResult.failed) {
    return coursesResult;
  }

  return success({
    ...user,
    courses: coursesResult.value,
    isEmailVerified: Boolean(user.emailVerified),
  });
};
