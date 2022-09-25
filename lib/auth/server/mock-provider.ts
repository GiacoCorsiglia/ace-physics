import { generateRandomId } from "@/db";
import { User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

/**
 * A provider for Next Auth that lets you log in as a test user by just clicking
 * a button.  For development with the database disabled.
 */
export const MockProvider = () => {
  if (process.env.NODE_ENV === "production") {
    throw new Error("MockProvider is not intended for use in production.");
  }

  return CredentialsProvider({
    name: "MockProvider",
    credentials: {},
    async authorize() {
      const user: User = {
        id: generateRandomId(),
        email: "test.user@acephysics.net",
        // Our test user should be an instructor so we can use Instructor Mode
        // when developing tutorials.
        role: "instructor",
      };

      return user;
    },
  });
};
