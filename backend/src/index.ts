import * as apiTypes from "ace-frontend/src/common/apiTypes";
import * as db from "./db";
import * as response from "./response";
import * as router from "./router";

// NOTE: When adding a route here also add it to template.yaml

// Learners.

router.get("GetLearner", apiTypes.GetLearnerRequest, async (request) => {
  return response.error("GetLearner: Unimplemented");
});

router.post("CreateLearner", apiTypes.CreateLearnerRequest, async (request) => {
  const client = db.client();

  function createLearner(): Promise<response.Response> {
    const digits = 6;
    const randomId = (
      10 * digits +
      Math.random() * 9 * 10 ** (digits - 1)
    ).toFixed(0);

    const learner: apiTypes.Learner = {
      learnerId: db.learnerId(randomId),
      entryId: db.LEARNER_PROFILE,
      institutionId: "NONE",
      courseId: "NONE",
      createdAt: db.date(),
    };

    return client
      .put({
        TableName: db.TableName,
        Item: learner,
        ConditionExpression: "attribute_not_exists(learnerId)",
      })
      .promise()
      .then(
        () => {
          return response.success(learner);
        },
        (e: AWS.AWSError) => {
          if (e.code === "ConditionalCheckFailedException") {
            // This means a learner with this "random" ID already exists, so
            // let's try again and generate another one!
            return createLearner();
          }
          // Otherwise who knows what went wrong!
          return response.error("Put failed", e);
        }
      );
  }

  return createLearner();
});

router.post(
  "CreateLearners",
  apiTypes.CreateLearnersRequest,
  async (request) => {
    return response.error("CreateLearners: Unimplemented");
  }
);

// Tutorials.

router.get("GetTutorial", apiTypes.GetTutorialRequest, async (request) => {
  return response.error("GetTutorial: Unimplemented");
});

router.put(
  "UpdateTutorial",
  apiTypes.UpdateTutorialRequest,
  async (request) => {
    return response.error("UpdateTutorial: Unimplemented");
  }
);

// Lambda function entry point.

export const handler: AWSLambda.APIGatewayProxyHandler = async function handler(
  event,
  context
) {
  const response = await router.route(event);

  // Needed for local CORS
  if (process.env.NODE_ENV === "development") {
    const headers = response.headers || {};
    response.headers = { ...headers, "Access-Control-Allow-Origin": "*" };
  }

  return response;
};
