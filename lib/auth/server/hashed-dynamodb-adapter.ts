/**
 * To avoid storing personally identifiable information in our database, we
 * store SHA256 hashes of user's email addresses (instead of the actual email
 * addresses).  The security of user accounts does NOT rely on this hashing,
 * which is why we can use SHA256 and not something like bcrypt.  This simply
 * alleviates the IRB burden by making it unreasonably difficult for us as
 * researchers to ascertain the identity of students in our database.
 */
import { DynamoDBAdapter } from "@next-auth/dynamodb-adapter";
import { createHash } from "crypto";
import type { Adapter } from "next-auth/adapters";

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

export const HashedDynamoDBAdapter = (
  ...args: Parameters<typeof DynamoDBAdapter>
): Adapter => {
  const ddb = DynamoDBAdapter(...args);

  return {
    // Avoid spreading ...ddb so we are forced to consider every method.
    // We only need to hash inbound data.
    createUser(user) {
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
    useVerificationToken: ddb.useVerificationToken
      ? (params) => {
          params = hashProperty("identifier", params);
          return ddb.useVerificationToken!(params);
        }
      : undefined,
  };
};
