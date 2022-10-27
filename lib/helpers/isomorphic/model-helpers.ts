import type { User as CompleteUser } from "next-auth";

interface User {
  role?: CompleteUser["role"];
}

export const isAdmin = (user: User): boolean => user.role === "admin";

export const isInstructor = (user: User): boolean =>
  user.role === "instructor" || isAdmin(user);
