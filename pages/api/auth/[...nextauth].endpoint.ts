import { sendVerificationRequest } from "@/auth/email";
import { HashedDynamoDBAdapter } from "@/auth/hashed-dynamodb-adapter";
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
});
