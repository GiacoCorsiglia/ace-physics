import { sendVerificationRequest } from "@/auth/server/email";
import { HashedDynamoDBAdapter } from "@/auth/server/hashed-dynamodb-adapter";
import { MockProvider } from "@/auth/server/mock-provider";
import * as db from "@/db";
import NextAuth, { NextAuthOptions } from "next-auth";
import EmailProvider from "next-auth/providers/email";

const options: NextAuthOptions = {
  secret: process.env.ACE_NEXT_AUTH_SECRET,
  providers: [],
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
    verifyRequest: "/auth/verify-request",
  },
  callbacks: {
    session({ session, user, token }) {
      // Augment the `session` object, which dictates what data the client has
      // access to.

      // We'll have `user` when we're using the DB, and `token` otherwise.
      const userData = user ?? token;

      if (session.user) {
        session.user.role = userData.role;
      }
      return session;
    },
  },
};

if (db.DATABASE_ENABLED) {
  // Provider.
  options.providers.push(
    EmailProvider({
      sendVerificationRequest,
    })
  );

  // Adapter.
  const dynamodb = db.createDocumentClient({
    marshallOptions: {
      convertEmptyValues: true,
      removeUndefinedValues: true,
      convertClassInstanceToMap: true,
    },
  });
  options.adapter = HashedDynamoDBAdapter(dynamodb, {
    tableName: db.tableName(),
  });
} else {
  // Provider.
  options.providers.push(MockProvider());

  // Augment JWT.
  options.callbacks!.jwt = ({ token, user }) => {
    if (user) {
      // Attach the User's role to the `token`.  `user` is only defined on sign
      // in, but the `jwt` callback is called more often.
      token.role = user.role;
    }
    return token;
  };
}

export default NextAuth(options);
