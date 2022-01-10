import { sendVerificationRequest } from "@/auth/server/email";
import { HashedDynamoDBAdapter } from "@/auth/server/hashed-dynamodb-adapter";
import * as db from "@/db";
import NextAuth from "next-auth";
import EmailProvider from "next-auth/providers/email";

const dynamodb = db.createDocumentClient({
  marshallOptions: {
    convertEmptyValues: true,
    removeUndefinedValues: true,
    convertClassInstanceToMap: true,
  },
});

export default NextAuth({
  secret: process.env.ACE_NEXT_AUTH_SECRET,
  providers: [
    EmailProvider({
      sendVerificationRequest,
    }),
  ],
  adapter: HashedDynamoDBAdapter(dynamodb, {
    tableName: db.tableName(),
  }),
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
    verifyRequest: "/auth/verify-request",
  },
  callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user.role = user.role;
      }
      return session;
    },
  },
});
