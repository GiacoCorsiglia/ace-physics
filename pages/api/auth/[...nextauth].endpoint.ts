import { sendVerificationRequest } from "@/auth/email";
import { HashedDynamoDBAdapter } from "@/auth/hashed-dynamodb-adapter";
import { DynamoDB, DynamoDBClientConfig } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocument } from "@aws-sdk/lib-dynamodb";
import NextAuth from "next-auth";
import EmailProvider from "next-auth/providers/email";

const dynamodbConfig: DynamoDBClientConfig = {
  endpoint: process.env.ACE_AWS_ENDPOINT,
  region: process.env.ACE_AWS_REGION,
  credentials: {
    accessKeyId: process.env.ACE_AWS_ACCESS_KEY,
    secretAccessKey: process.env.ACE_AWS_SECRET_KEY,
  },
};

const dynamodb = DynamoDBDocument.from(new DynamoDB(dynamodbConfig), {
  marshallOptions: {
    convertEmptyValues: true,
    removeUndefinedValues: true,
    convertClassInstanceToMap: true,
  },
});

export default NextAuth({
  providers: [
    EmailProvider({
      sendVerificationRequest,
    }),
  ],
  adapter: HashedDynamoDBAdapter(dynamodb, {
    tableName: process.env.ACE_TABLE_NAME,
  }),
});
