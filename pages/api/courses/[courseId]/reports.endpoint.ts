import { CourseReports } from "@/api/isomorphic/specs";
import { parseRequest, response, sendResponse } from "@/api/server";
import { hashEmail } from "@/auth/server/hashed-dynamodb-adapter";
import * as db from "@/db";
import { TutorialFeedback, TutorialState } from "@/schema/tutorial";
import { QueryCommandInput } from "@aws-sdk/lib-dynamodb";
import { tutorialSchemas } from "@pages/tutorials/schemas";
import { withSentry } from "@sentry/nextjs";
import { stringify } from "csv-stringify/sync";
import { NextApiRequest, NextApiResponse } from "next";

export default withSentry(async (req: NextApiRequest, res: NextApiResponse) => {
  const parsed = await parseRequest(CourseReports, req);

  if (parsed.failed) {
    sendResponse(res, parsed.error);
    return;
  }

  const { query, body, session } = parsed.value;

  const { courseId } = query;
  const {
    tutorialId,
    unhashedStudentEmails,
    locale,
    timeZone,
    includeFeedback,
  } = body;

  const includePretests = body.includePretests && tutorialId !== "";
  const includePosttests = includePretests;

  // Validate tutorialIds.
  if (tutorialId && !tutorialSchemas.has(tutorialId)) {
    sendResponse(res, response.error("Invalid tutorialId"));
    return;
  }

  // Load the courseUser and make sure they have permission.
  const courseUserResult = await db.client().get({
    TableName: db.tableName(),
    Key: db.codec.CourseUser.keys.primary({
      courseId,
      userEmail: session.user.email,
    }),
  });
  if (courseUserResult.failed) {
    sendResponse(res, response.error("Failed to load CourseUser"));
    return;
  }
  const courseUser = db.codec.CourseUser.decode(courseUserResult.value.Item);
  if (courseUser.failed || courseUser.value.role !== "instructor") {
    sendResponse(res, response.forbidden());
    return;
  }

  // OK it's a valid request!

  const queryKey = db.codec.TutorialState.keys.primary({
    courseId,
    tutorialId, // This might be an empty string!
    userEmail: "",
  });

  const queryInput: QueryCommandInput = {
    TableName: db.tableName(),
    KeyConditionExpression: `#${db.Keys.pk} = :${db.Keys.pk} AND begins_with(#${db.Keys.sk}, :${db.Keys.sk})`,
    ...db.expressionAttributes(queryKey),
  };

  const queryResult = await db.fetchAllPages((ExclusiveStartKey) =>
    db.client().query({
      ...queryInput,
      ExclusiveStartKey,
    })
  );

  if (queryResult.failed) {
    sendResponse(res, response.error("Failed to load student responses"));
    return;
  }

  const tutorialStates = db.codec.TutorialState.decodeList(queryResult.value);

  const emailMap = new Map(
    unhashedStudentEmails
      .split("\n")
      .map((email) => email.trim())
      .filter((email) => !!email)
      .map((email) => [hashEmail(email), email])
  );

  interface Row {
    courseId: string;
    tutorialId: string;
    email: string;
    createdAt: string;
    updatedAt: string;
    totalPages: number;
    completedPages: number;
    responsePercentage: number;
  }

  type CompleteRow = Row & Record<string, string | number>;

  const dateFormatter = new Intl.DateTimeFormat(locale, {
    timeZone,
    dateStyle: "short",
    timeStyle: "short",
  });

  const singleSchema = tutorialId ? tutorialSchemas.get(tutorialId) : null;
  const pretestProperties = singleSchema
    ? Object.keys(singleSchema.properties.pretest.properties)
    : [];

  const posttestProperties = singleSchema
    ? Object.keys(
        singleSchema.properties.posttest.properties.responses.properties
      )
    : [];

  const feedbackProperties = Object.keys(TutorialFeedback.properties);

  const objectToRows = (
    properties: string[],
    prefix: string,
    state: Record<string, any> | undefined
  ) => {
    return Object.fromEntries(
      properties.map((prop) => {
        let val: any = state?.[prop];
        if (val?.selected && !val?.other) {
          // Quick hack for choose fields.
          val = val.selected;
        }
        return [`${prefix}.${prop}`, stringifyAsJSONIfNecessary(val)];
      })
    );
  };

  const rows = tutorialStates
    .map((ts): CompleteRow | null => {
      const schema = tutorialSchemas.get(ts.tutorialId);
      if (!schema) {
        return null;
      }

      // Email.
      const email = emailMap.get(ts.userEmail) ?? ts.userEmail;

      // Dates.
      const createdAt = dateFormatter.format(parseISOString(ts.createdAt));
      const updatedAt = dateFormatter.format(parseISOString(ts.updatedAt));

      const state: TutorialState = ts.state;

      // Calculate total and completed pages.
      const totalPages = Object.keys(schema.properties.pages.properties).length;
      const completedPages = Object.values(state.pages || {}).filter(
        (page) => page?.status === "completed"
      ).length;

      // Calculate completed response percentage.
      const responseProperties = Object.keys(
        schema.properties.responses.properties
      );
      const totalResponses = responseProperties.length;
      let completedResponses = 0;
      const responses = state.responses || {};
      for (const prop of responseProperties) {
        if (responses[prop] !== undefined) {
          completedResponses++;
        }
      }
      const responsePercentage = Math.round(
        (completedResponses / totalResponses) * 100
      );

      // Append pretest responses if requested.
      const pretestValues = includePretests
        ? objectToRows(pretestProperties, "pretest", state?.pretest)
        : {};

      const posttestValues = includePosttests
        ? objectToRows(
            posttestProperties,
            "posttest",
            state?.posttest?.responses
          )
        : {};

      // Append feedback responses if requested.
      const feedbackValues = includeFeedback
        ? objectToRows(feedbackProperties, "feedback", state?.feedback)
        : {};

      return {
        courseId,
        tutorialId: ts.tutorialId,
        email,
        createdAt,
        updatedAt,
        totalPages,
        completedPages,
        responsePercentage,
        ...pretestValues,
        ...posttestValues,
        ...feedbackValues,
      };
    })
    .filter((row): row is CompleteRow => !!row);

  const columns: { key: keyof Row; header: string }[] = [
    { key: "courseId", header: "Course ID" },
    { key: "tutorialId", header: "Tutorial" },
    { key: "email", header: "Email" },
    { key: "createdAt", header: "Time Started" },
    { key: "updatedAt", header: "Last Update" },
    { key: "totalPages", header: "Num. Pages" },
    { key: "completedPages", header: "Num. Pages Completed" },
    { key: "responsePercentage", header: "Approx. Response %" },
  ];

  if (includePretests) {
    columns.push(
      ...pretestProperties.map((prop) => ({
        key: `pretest.${prop}` as unknown as keyof Row,
        header: `Pretest: ${prop}`,
      }))
    );
  }

  if (includePosttests) {
    columns.push(
      ...posttestProperties.map((prop) => ({
        key: `posttest.${prop}` as unknown as keyof Row,
        header: `Posttest: ${prop}`,
      }))
    );
  }

  if (includeFeedback) {
    const nonEmptyFeedbackProperties = feedbackProperties.filter((prop) =>
      rows.some((row) => row[`feedback.${prop}`] !== undefined)
    );

    columns.push(
      ...nonEmptyFeedbackProperties.map((prop) => ({
        key: `feedback.${prop}` as unknown as keyof Row,
        header: `Feedback: ${prop}`,
      }))
    );
  }

  const csv = stringify(rows, {
    header: true,
    columns,
  });

  res.setHeader("Content-Type", "text/csv");
  res.setHeader("Content-Disposition", "attachment;filename=responses.csv");
  res.status(200).send(csv);
});

const parseISOString = (s: string) => {
  const b = s.split(/\D+/) as unknown as number[];
  return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
};

const stringifyAsJSONIfNecessary = (v: any): string | undefined =>
  v === undefined || v === null
    ? undefined
    : typeof v === "string"
    ? v
    : JSON.stringify(v);
