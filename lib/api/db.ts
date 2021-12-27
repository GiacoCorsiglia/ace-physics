import { isObject } from "@/helpers/backend";
import {
  Course,
  CourseInstructor,
  CourseStudent,
  TutorialState,
} from "@/schema/db";
import { any, decode, Infer, Type } from "@/schema/types";
import { DynamoDB, DynamoDBClientConfig } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocument, TranslateConfig } from "@aws-sdk/lib-dynamodb";

////////////////////////////////////////////////////////////////////////////////
// Database connection.
////////////////////////////////////////////////////////////////////////////////

export const TableName = process.env.ACE_TABLE_NAME;

export const createDocumentClient = (translateConfig: TranslateConfig) => {
  const config: DynamoDBClientConfig = {
    endpoint: process.env.ACE_AWS_ENDPOINT, // Local only.
    region: process.env.ACE_AWS_REGION,
    credentials: {
      accessKeyId: process.env.ACE_AWS_ACCESS_KEY,
      secretAccessKey: process.env.ACE_AWS_SECRET_KEY,
    },
  };

  const documentClient = DynamoDBDocument.from(
    new DynamoDB(config),
    translateConfig
  );

  return documentClient;
};

let _client: DynamoDBDocument;
export const client = () =>
  _client ||
  (_client = createDocumentClient({
    marshallOptions: {
      convertEmptyValues: false,
      removeUndefinedValues: true,
      convertClassInstanceToMap: true,
    },
  }));

////////////////////////////////////////////////////////////////////////////////

// Avoid typing "GSI1PK" everywhere because I'll definitely mess it up.
export enum Keys {
  pk = "pk",
  sk = "sk",
  GSI1PK = "GSI1PK",
  GSI1SK = "GSI1SK",
}

type Key = { readonly pk: string; readonly sk: string } & (
  | { readonly GSI1PK?: never; readonly GSI1SK?: never }
  | { readonly GSI1PK: string; readonly GSI1SK: string }
);

const codec = <
  T extends DatabaseType,
  S extends Type,
  F extends (item: Infer<S>) => Key
>(
  type: T,
  schema: S,
  keys: F
) =>
  ({
    /** Compute database keys for given item. */
    keys,

    /** The "type" attribute in the database. */
    type,

    /** Converts item from application object for saving in the database. */
    encode(item: Infer<S>) {
      if (process.env.NODE_ENV === "development") {
        for (const p of ["type", ...Object.values(Keys)]) {
          if (p in (item as any)) {
            const json = JSON.stringify(item);
            throw new Error(
              `Property "${p}" conflicts with database-only property:\n${json}`
            );
          }
        }
      }

      const clone = {
        ...item,
        type,
        ...keys(item),
      };

      return clone;
    },

    /** Convert item from the database for use in the application. */
    decode(item: unknown) {
      // Remove database-only properties.
      if (isObject(item)) {
        delete (item as any).type;
        for (const k in Keys) {
          delete (item as any)[k];
        }
      }

      return decode(schema, item);
    },
  } as const);

// Codecs.

const enum Prefix {
  User = "USER",
  Course = "COURSE",
  Instructor = "INSTRUCTOR",
  Student = "STUDENT",
  TutorialState = "TUTORIAL_STATE",
}

const enum DatabaseType {
  User = "USER",
  Course = "COURSE",
  CourseStudent = "COURSE_STUDENT",
  CourseInstructor = "COURSE_INSTRUCTOR",
  TutorialState = "TUTORIAL_STATE",
}

const joinKey = (...parts: string[]) => parts.join("#");

/**
 * NextAuth User.
 */
export const UserCodec = codec(
  DatabaseType.User,
  any(), // Allow anything since it's from NextAuth.
  (item: { id: string; email: string }) => ({
    pk: joinKey(Prefix.User, item.id),
    sk: joinKey(Prefix.User, item.id),
    GSI1PK: joinKey(Prefix.User, item.email),
    GSI1SK: joinKey(Prefix.User, item.email),
  })
);

/**
 * Configuration for a course.
 */
export const CourseCodec = codec(
  DatabaseType.Course,
  Course,
  (item: { id: string }) => ({
    pk: joinKey(Prefix.Course, item.id),
    sk: joinKey(Prefix.Course, item.id),
  })
);

/**
 * Associates a user with a course as a student.
 */
export const CourseStudentCodec = codec(
  DatabaseType.CourseStudent,
  CourseStudent,
  (item: { courseId: string; userEmail: string }) => ({
    pk: joinKey(Prefix.Course, item.courseId),
    sk: joinKey(Prefix.Student, item.userEmail),
    GSI1PK: joinKey(Prefix.Student, item.userEmail),
    GSI1SK: joinKey(Prefix.Course, item.courseId),
  })
);

/**
 * Associates a user with a course as an instructor.
 */
export const CourseInstructorCodec = codec(
  DatabaseType.CourseInstructor,
  CourseInstructor,
  (item: { courseId: string; userEmail: string }) => ({
    pk: joinKey(Prefix.Course, item.courseId),
    sk: joinKey(Prefix.Instructor, item.userEmail),
    GSI1PK: joinKey(Prefix.Instructor, item.userEmail),
    GSI1SK: joinKey(Prefix.Course, item.courseId),
  })
);

/**
 * Tutorial state.  Associated with a user, but may or may not be associated
 * with a course as well.
 */
export const TutorialStateCodec = codec(
  DatabaseType.TutorialState,
  TutorialState,
  (item: { courseId: string; userEmail: string; tutorial: string }) => {
    // TODO:
    if (item.courseId === "NONE") {
      return {
        pk: joinKey(Prefix.User, item.userEmail),
        sk: joinKey(Prefix.TutorialState, item.tutorial),
      };
    }

    return {
      pk: joinKey(Prefix.Course, item.courseId),
      sk: joinKey(Prefix.TutorialState, item.tutorial, item.userEmail),
    };
  }
);
