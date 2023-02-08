/**
 * To avoid storing personally identifiable information in our database, we
 * store SHA256 hashes of user's email addresses (instead of the actual email
 * addresses).  The security of user accounts does NOT rely on this hashing,
 * which is why we can use SHA256 and not something like bcrypt.  This simply
 * alleviates the IRB burden by making it unreasonably difficult for us as
 * researchers to ascertain the identity of students in our database.
 */
import { DynamoDBAdapter, format } from "@next-auth/dynamodb-adapter";
import { createHash } from "crypto";
import { Adapter, VerificationToken } from "next-auth/adapters";

export const hashEmail = (email: string): string => {
  if (!email.includes("@")) {
    // It appears to be hashed already!
    return email;
  }

  //////////////////////////////////////////////////////////////////////////////
  // !! WARNING !!
  // !! DO NOT CHANGE THE HASHING STRATEGY !!
  // User accounts are exclusively identified by `hashEmail(userEmail)` in the
  // database.  If we change the `hashEmail()` function, no existing user will
  // be able to log in (unless we implement a gradual migration strategy, which
  // would still have to rely on the original implementation of `hashEmail`).
  // !! THIS STRATEGY IS REPEATED IN use-unhashed-email.ts !!
  //////////////////////////////////////////////////////////////////////////////
  email = email.toLowerCase(); // Emails should not be case sensitive.
  const hash = createHash("sha256");
  hash.update(email);
  return hash.digest("base64url");
  //////////////////////////////////////////////////////////////////////////////
};

const hashProperty = <T>(p: keyof T, o: T): T => {
  const value = o[p];
  if (typeof value === "string") {
    return { ...o, [p]: hashEmail(value) };
  }
  return o;
};

const acephysicsEmailX = /^[a-zA-Z0-9\.\+]+@acephysics\.net$/;

export const HashedDynamoDBAdapter = (
  ...args: Parameters<typeof DynamoDBAdapter>
): Adapter => {
  const ddb = DynamoDBAdapter(...args);

  const [client, options] = args;
  const TableName = options?.tableName || "next-auth";

  return {
    // Avoid spreading ...ddb so we are forced to consider every method.
    // We only need to hash inbound data.
    createUser(user) {
      if (user.email && acephysicsEmailX.test(user.email)) {
        // Special case: automatically make users with acephysics emails admins.
        user = { ...user, role: "admin" };
      }

      user = hashProperty("email", user);
      return ddb.createUser(user);
    },
    getUser: ddb.getUser.bind(ddb),
    getUserByEmail(email) {
      email = hashEmail(email);
      return ddb.getUserByEmail(email);
    },
    getUserByAccount: ddb.getUserByAccount.bind(ddb),
    updateUser(user) {
      user = hashProperty("email", user);
      return ddb.updateUser(user);
    },
    deleteUser: ddb.deleteUser?.bind(ddb),
    linkAccount: ddb.linkAccount.bind(ddb),
    unlinkAccount: ddb.unlinkAccount?.bind(ddb),
    createSession: ddb.createSession.bind(ddb),
    getSessionAndUser: ddb.getSessionAndUser.bind(ddb),
    updateSession: ddb.updateSession.bind(ddb),
    deleteSession: ddb.deleteSession.bind(ddb),
    createVerificationToken: ddb.createVerificationToken
      ? (verificationToken) => {
          verificationToken = hashProperty("identifier", verificationToken);
          return ddb.createVerificationToken!(verificationToken);
        }
      : undefined,
    // HACK: We have encountered issues where verification tokens are marked as
    // used even before the user clicks the sign in link.  My guess is that spam
    // filters in university are preloading the link which is invalidating it?
    // Maybe?  Not sure.  But security on ACE Physics isn't particularly
    // important, so I'm hacking this function to be a no-op so that
    // verification tokens are never marked as used (i.e., never deleted),
    // meaning sign in links can be used more than once.  They should still
    // expire and be removed from the database (thanks to DynamoDB TTL) after 24
    // hours, so I think this is fine.
    async useVerificationToken(params) {
      params = hashProperty("identifier", params);

      const { identifier, token } = params;

      const data = await client.get({
        TableName,
        Key: {
          // https://github.com/nextauthjs/next-auth/blob/v4/packages/adapter-dynamodb/src/index.ts#L307
          pk: `VT#${identifier}`,
          sk: `VT#${token}`,
        },
      });

      return format.from<VerificationToken>(data.Item);
    },
  };
};
