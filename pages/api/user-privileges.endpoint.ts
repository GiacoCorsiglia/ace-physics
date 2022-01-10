import { endpoint, response, spec } from "@/api/server";
import {
  HashedDynamoDBAdapter,
  hashEmail,
} from "@/auth/server/hashed-dynamodb-adapter";
import * as db from "@/db";
import { isValidEmail } from "@/helpers/server";

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
  }
);

export default endpoint(spec.UserPrivileges, {
  async POST(request) {
    const { user } = request.session;

    if (user.role !== "admin") {
      return response.forbidden();
    }

    if (!isValidEmail(request.body.unhashedUserEmail)) {
      return response.error(
        "Invalid email address",
        request.body.unhashedUserEmail
      );
    }

    if (user.email === hashEmail(request.body.unhashedUserEmail)) {
      return response.error("Cannot change own privileges");
    }

    const targetUser = await adapter.getUserByEmail(
      request.body.unhashedUserEmail
    );

    if (targetUser) {
      await adapter.updateUser({
        id: targetUser.id,
        role: request.body.role,
      });
    } else {
      await adapter.createUser({
        email: request.body.unhashedUserEmail,
        role: request.body.role,
        emailVerified: null,
      });
    }

    return response.success({ ok: true as const });
  },
});
